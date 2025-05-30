<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Log request for debugging
        Log::info('StudentController::index called');

        // Always return Inertia render for web routes
        $students = Student::latest()
            ->with('trainings')
            ->select('first_name', 'last_name', 'email', 'phone', 'gender', 'status', 'registration_date', 'id', 'education_level')
            ->paginate(10);

        // Gather statistics for dashboard charts
        $totalStudents = Student::count();
        $activeStudents = Student::where('status', 'active')->count();
        $inactiveStudents = Student::whereIn('status', ['inactive', 'suspended'])->count();

        // Students registered this month
        $currentMonth = Carbon::now()->startOfMonth();
        $newStudentsThisMonth = Student::where('registration_date', '>=', $currentMonth)->count();

        // Students by gender
        $studentsByGender = Student::select('gender', DB::raw('count(*) as count'))
            ->groupBy('gender')
            ->get()
            ->map(function ($item) {
                $item->gender = $item->gender ?: 'Not Specified';
                return $item;
            });

        // Students by education level
        $studentsByEducationLevel = Student::select('education_level', DB::raw('count(*) as count'))
            ->groupBy('education_level')
            ->get()
            ->map(function ($item) {
                $item->education_level = $item->education_level ?: 'Not Specified';
                return $item;
            });

        // Students by status
        $studentsByStatus = Student::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get();

        // Students registered by month (last 6 months)
        $sixMonthsAgo = Carbon::now()->subMonths(6)->startOfMonth();
        $studentsByMonth = DB::table('students')
            ->select(DB::raw('DATE_FORMAT(registration_date, "%Y-%m") as month'), DB::raw('count(*) as count'))
            ->where('registration_date', '>=', $sixMonthsAgo)
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                $monthDate = Carbon::createFromFormat('Y-m', $item->month);
                $item->month = $monthDate->format('M Y'); // Format as "Jan 2023"
                return $item;
            });

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
            'statistics' => [
                'totalStudents' => $totalStudents,
                'activeStudents' => $activeStudents,
                'inactiveStudents' => $inactiveStudents,
                'newStudentsThisMonth' => $newStudentsThisMonth,
                'studentsByGender' => $studentsByGender,
                'studentsByEducationLevel' => $studentsByEducationLevel,
                'studentsByStatus' => $studentsByStatus,
                'studentsByMonth' => $studentsByMonth,
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|string|in:male,female,other',
            'education_level' => 'nullable|string|max:255',
            'registration_date' => 'nullable|date',
            'status' => 'nullable|string|in:active,inactive,suspended',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $data = $validator->validated();

        // Ensure registration_date is set
        if (empty($data['registration_date'])) {
            $data['registration_date'] = now();
        }

        // Ensure status is set
        if (empty($data['status'])) {
            $data['status'] = 'active';
        }

        $student = Student::create($data);

        // Inertia requests automatically receive a 303 redirect response
        return redirect()->route('students.index')->with('success', 'Student created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Student $student)
    {
        $student->load('trainings', 'certificates');

        return Inertia::render('Admin/Students/Show', [
            'student' => $student
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,' . $student->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|string|in:male,female,other',
            'education_level' => 'nullable|string|max:255',
            'registration_date' => 'nullable|date',
            'status' => 'nullable|string|in:active,inactive,suspended',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $data = $validator->validated();

        // Ensure registration_date is set
        if (empty($data['registration_date'])) {
            $data['registration_date'] = $student->registration_date ?? now();
        }

        // Ensure status is set
        if (empty($data['status'])) {
            $data['status'] = $student->status ?? 'active';
        }

        $student->update($data);

        return redirect()->route('students.index')->with('success', 'Student updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Student $student)
    {
        $student->delete();

        return redirect()->route('students.index')->with('success', 'Student deleted successfully!');
    }

    /**
     * Display the create form for student.
     */
    public function create()
    {
        return Inertia::render('Admin/Students/Create');
    }

    /**
     * Display the edit form for student.
     */
    public function edit(Student $student)
    {
        return Inertia::render('Admin/Students/Edit', [
            'student' => $student
        ]);
    }

    /**
     * API Methods - For external API calls
     */

    /**
     * API: Get students for API requests
     */
    public function apiGetStudents(Request $request)
    {
        $query = Student::where('status', 'active')
            ->select('id', 'first_name', 'last_name', 'email', 'phone', 'status');

        // Apply limit if specified
        if ($request->has('limit') && is_numeric($request->limit)) {
            $students = $query->limit($request->limit)->get();
        } else {
            $students = $query->get();
        }

        // Format student data with full name
        $formattedStudents = $students->map(function($student) {
            return [
                'id' => $student->id,
                'name' => $student->first_name . ' ' . $student->last_name,
                'email' => $student->email,
                'phone' => $student->phone,
                'status' => $student->status
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $formattedStudents
        ]);
    }

    /**
     * Get all students for dropdown lists (for certificates, enrollments, etc.)
     */
    public function getStudentsForDropdown(Request $request)
    {
        // Return students for dropdown selection
        $students = Student::where('status', 'active')
            ->select('id', 'first_name', 'last_name', 'email')
            ->orderBy('first_name')
            ->orderBy('last_name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $students
        ]);
    }
}
