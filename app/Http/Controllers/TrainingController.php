<?php

namespace App\Http\Controllers;

use App\Models\Training;
use App\Models\Student;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Inertia\Inertia;

class TrainingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Log request for debugging
        Log::info('TrainingController::index called');

        // Always return Inertia render for web routes
        $trainings = Training::latest()
            ->select('name', 'code', 'description', 'duration', 'level', 'price', 'status', 'category', 'id')
            ->paginate(10);

        // Gather statistics for dashboard charts
        $totalTrainings = Training::count();
        $activeTrainings = Training::where('status', 'active')->count();
        $upcomingTrainings = Training::where('status', 'upcoming')->count();

        // Trainings by category
        $trainingsByCategory = Training::select('category', DB::raw('count(*) as count'))
            ->groupBy('category')
            ->get()
            ->map(function ($item) {
                $item->category = $item->category ?: 'Uncategorized';
                return $item;
            });

        // Trainings by level
        $trainingsByLevel = Training::select('level', DB::raw('count(*) as count'))
            ->groupBy('level')
            ->get()
            ->map(function ($item) {
                $item->level = $item->level ?: 'Not Specified';
                return $item;
            });

        // Trainings by status
        $trainingsByStatus = Training::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get();

        // Most popular trainings (by enrollment count)
        $popularTrainings = DB::table('trainings')
            ->leftJoin('student_training', 'trainings.id', '=', 'student_training.training_id')
            ->select('trainings.id', 'trainings.name', DB::raw('COUNT(student_training.student_id) as enrollment_count'))
            ->groupBy('trainings.id', 'trainings.name')
            ->orderByDesc('enrollment_count')
            ->limit(5)
            ->get();

        // Recent enrollment statistics (last 6 months)
        $sixMonthsAgo = Carbon::now()->subMonths(6)->startOfMonth();
        $enrollmentsByMonth = DB::table('student_training')
            ->select(DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'), DB::raw('count(*) as count'))
            ->where('created_at', '>=', $sixMonthsAgo)
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                if ($item->month) {
                    $monthDate = Carbon::createFromFormat('Y-m', $item->month);
                    $item->month = $monthDate->format('M Y'); // Format as "Jan 2023"
                } else {
                    $item->month = 'Unknown';
                }
                return $item;
            });

        return Inertia::render('Admin/Trainings/Index', [
            'trainings' => $trainings,
            'statistics' => [
                'totalTrainings' => $totalTrainings,
                'activeTrainings' => $activeTrainings,
                'upcomingTrainings' => $upcomingTrainings,
                'trainingsByCategory' => $trainingsByCategory,
                'trainingsByLevel' => $trainingsByLevel,
                'trainingsByStatus' => $trainingsByStatus,
                'popularTrainings' => $popularTrainings,
                'enrollmentsByMonth' => $enrollmentsByMonth,
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info('Training store method called', ['request_data' => $request->all()]);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:trainings,code',
            'description' => 'nullable|string',
            'duration' => 'nullable|string|max:50',
            'level' => 'nullable|string|max:50',
            'price' => 'nullable|numeric|min:0',
            'status' => 'nullable|string|in:active,inactive,upcoming',
            'category' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            Log::error('Training validation failed', ['errors' => $validator->errors()->toArray()]);
            if ($request->ajax() || $request->expectsJson()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        try {
            $data = $validator->validated();
            Log::info('Validated data', ['data' => $data]);

            // Set default status if not provided
            if (empty($data['status'])) {
                $data['status'] = 'active';
            }

            $training = Training::create($data);
            Log::info('Training created successfully', ['training_id' => $training->id]);

            if ($request->ajax() || $request->expectsJson()) {
                return response()->json([
                    'message' => 'Training created successfully!',
                    'training' => $training
                ], 201);
            }

            return redirect()->route('admin.trainings.index')->with('success', 'Training created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating training', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            if ($request->ajax() || $request->expectsJson()) {
                return response()->json([
                    'message' => 'Failed to create training. Please try again.'
                ], 500);
            }

            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create training. Please try again.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Training $training)
    {
        $training->load('students', 'certificates');

        return Inertia::render('Admin/Trainings/Show', [
            'training' => $training
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Training $training)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:trainings,code,' . $training->id,
            'description' => 'nullable|string',
            'duration' => 'nullable|string|max:50',
            'level' => 'nullable|string|max:50',
            'price' => 'nullable|numeric|min:0',
            'status' => 'nullable|string|in:active,inactive,upcoming',
            'category' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            if ($request->ajax() || $request->expectsJson()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $training->update($validator->validated());

        if ($request->ajax() || $request->expectsJson()) {
            return response()->json([
                'message' => 'Training updated successfully!',
                'training' => $training
            ]);
        }

        return redirect()->route('admin.trainings.index')->with('success', 'Training updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Training $training)
    {
        try {
            $training->delete();

            if ($request->ajax() || $request->expectsJson()) {
                return response()->json([
                    'message' => 'Training deleted successfully!'
                ]);
            }

            return redirect()->route('admin.trainings.index')->with('success', 'Training deleted successfully!');
        } catch (\Exception $e) {
            if ($request->ajax() || $request->expectsJson()) {
                return response()->json([
                    'message' => 'Failed to delete training. It may be associated with other records.'
                ], 422);
            }

            return redirect()->route('admin.trainings.index')->with('error', 'Failed to delete training. It may be associated with other records.');
        }
    }

    /**
     * Display the create form for training.
     */
    public function create()
    {
        return Inertia::render('Admin/Trainings/Create');
    }

    /**
     * Display the edit form for training.
     */
    public function edit(Training $training)
    {
        return Inertia::render('Admin/Trainings/Edit', [
            'training' => $training
        ]);
    }

    /**
     * API Methods - For external API calls
     */

    /**
     * API: Get trainings for API requests
     */
    public function apiGetTrainings(Request $request)
    {
        $query = Training::where('status', 'active')
            ->orWhere('status', 'upcoming')
            ->select('id', 'name as title', 'description', 'duration', 'price', 'category', 'code');

        // Apply limit if specified
        if ($request->has('limit') && is_numeric($request->limit)) {
            $trainings = $query->limit($request->limit)->get();
        } else {
            $trainings = $query->get();
        }

        return response()->json([
            'success' => true,
            'data' => $trainings
        ]);
    }

    /**
     * Get all trainings for dropdown lists (for certificates, enrollments, etc.)
     */
    public function getTrainingsForDropdown(Request $request)
    {
        // Return trainings for dropdown selection
        $trainings = Training::whereIn('status', ['active', 'upcoming'])
            ->select('id', 'name', 'code')
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $trainings
        ]);
    }
}
