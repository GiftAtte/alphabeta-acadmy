<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EnrollmentController extends Controller
{
    /**
     * Display a listing of enrollments.
     */
    public function index()
    {
        $enrollments = DB::table('student_training')
            ->join('students', 'student_training.student_id', '=', 'students.id')
            ->join('trainings', 'student_training.training_id', '=', 'trainings.id')
            ->select(
                'students.first_name',
                'students.last_name',
                'students.email',
                'trainings.name as training_name',
                'trainings.code as training_code',
                'student_training.enrollment_date',
                'student_training.completion_date',
                'student_training.status',
                'student_training.payment_status',
                'student_training.id'
            )
            ->orderBy('student_training.enrollment_date', 'desc')
            ->paginate(10);

        // Gather statistics for dashboard cards
        $totalEnrollments = DB::table('student_training')->count();

        // Enrollments by status
        $enrollmentsByStatus = DB::table('student_training')
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get();

        $inProgressCount = $enrollmentsByStatus->where('status', 'in_progress')->sum('count');
        $completedCount = $enrollmentsByStatus->where('status', 'completed')->sum('count');
        $droppedCount = $enrollmentsByStatus->where('status', 'dropped')->sum('count');

        // Enrollments by payment status
        $paymentStatusCounts = DB::table('student_training')
            ->select('payment_status', DB::raw('count(*) as count'))
            ->groupBy('payment_status')
            ->get();

        $pendingPaymentsCount = $paymentStatusCounts->where('payment_status', 'pending')->sum('count');
        $paidCount = $paymentStatusCounts->where('payment_status', 'paid')->sum('count');

        // New enrollments this month
        $currentMonth = Carbon::now()->startOfMonth();
        $newEnrollmentsThisMonth = DB::table('student_training')
            ->where('enrollment_date', '>=', $currentMonth)
            ->count();

        // Active students (students with at least one enrollment)
        $activeStudents = DB::table('student_training')
            ->select('student_id')
            ->distinct()
            ->count();

        // Top trainings by enrollment
        $topTrainings = DB::table('student_training')
            ->join('trainings', 'student_training.training_id', '=', 'trainings.id')
            ->select('trainings.name', DB::raw('count(*) as count'))
            ->groupBy('trainings.name')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Enrollments/Index', [
            'enrollments' => $enrollments,
            'statistics' => [
                'totalEnrollments' => $totalEnrollments,
                'inProgressCount' => $inProgressCount,
                'completedCount' => $completedCount,
                'droppedCount' => $droppedCount,
                'pendingPaymentsCount' => $pendingPaymentsCount,
                'paidCount' => $paidCount,
                'newEnrollmentsThisMonth' => $newEnrollmentsThisMonth,
                'activeStudents' => $activeStudents,
                'topTrainings' => $topTrainings
            ]
        ]);
    }

    /**
     * Show the form for creating a new enrollment.
     */
    public function create(Request $request)
    {
        // Check if this is a public enrollment request
        if ($request->route()->getName() === 'student.enroll') {
            // Get active trainings for public enrollment
            $trainings = Training::where('status', 'active')->get();

            return Inertia::render('Public/StudentEnrollment', [
                'trainings' => $trainings,
            ]);
        }

        // Otherwise show the admin enrollment form
        $students = Student::select('id', 'first_name', 'last_name', 'email')->get();
        $trainings = Training::select('id', 'name', 'code')->get();

        return Inertia::render('Admin/Enrollments/Create', [
            'students' => $students,
            'trainings' => $trainings,
        ]);
    }

    /**
     * Store a newly created enrollment in storage.
     */
    public function store(Request $request)
    {
        // Check if this is a public enrollment submission
        if ($request->route()->getName() === 'student.enroll.store') {
            $validator = Validator::make($request->all(), [
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:20',
                'training_id' => 'required|exists:trainings,id',
                'address' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:100',
                'state' => 'nullable|string|max:100',
                'country' => 'nullable|string|max:100',
                'emergency_contact' => 'nullable|string|max:255',
                'emergency_phone' => 'nullable|string|max:20',
            ]);

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            // First create or find the student
            $student = Student::firstOrCreate(
                ['email' => $request->email],
                [
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'city' => $request->city,
                    'state' => $request->state,
                    'country' => $request->country,
                    'emergency_contact' => $request->emergency_contact,
                    'emergency_phone' => $request->emergency_phone,
                    'id' => Str::uuid()->toString(),
                ]
            );

            // Check if student is already enrolled in this training
            if ($student->trainings()->where('training_id', $request->training_id)->exists()) {
                return redirect()->back()->with('error', 'You are already enrolled in this training program.');
            }

            // Enroll the student
            $student->trainings()->attach($request->training_id, [
                'id' => Str::uuid()->toString(),
                'enrollment_date' => now(),
                'status' => 'enrolled',
                'payment_status' => 'pending',
            ]);

            return redirect()->route('home')->with('success', 'Thank you for enrolling! We will contact you shortly with payment and course details.');
        }

        // Existing admin enrollment logic
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|exists:students,id',
            'training_id' => 'required|exists:trainings,id',
            'enrollment_date' => 'required|date',
            'completion_date' => 'nullable|date|after_or_equal:enrollment_date',
            'status' => 'required|string|in:enrolled,in_progress,completed,dropped',
            'payment_status' => 'required|string|in:pending,partial,paid,refunded',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $student = Student::find($request->student_id);
        $training = Training::find($request->training_id);

        // Check if the student is already enrolled in this training
        if ($student->trainings()->where('training_id', $training->id)->exists()) {
            return response()->json([
                'message' => 'Student is already enrolled in this training'
            ], 422);
        }

        // Attach the training to the student with pivot data
        $student->trainings()->attach($training->id, [
            'id' => Str::uuid()->toString(),
            'enrollment_date' => $request->enrollment_date,
            'completion_date' => $request->completion_date,
            'status' => $request->status,
            'payment_status' => $request->payment_status,
        ]);

        return response()->json([
            'message' => 'Student enrolled successfully!'
        ], 201);
    }

    /**
     * Display the specified enrollment.
     */
    public function show(Request $request, $id)
    {
        $enrollment = DB::table('student_training')
            ->join('students', 'student_training.student_id', '=', 'students.id')
            ->join('trainings', 'student_training.training_id', '=', 'trainings.id')
            ->where('student_training.id', $id)
            ->select(
                'student_training.*',
                'students.first_name',
                'students.last_name',
                'students.email',
                'trainings.name as training_name',
                'trainings.code as training_code',
                'trainings.duration',
                'trainings.price'
            )
            ->first();

        if (!$enrollment) {
            if ($request->ajax() || $request->expectsJson()) {
                return response()->json(['message' => 'Enrollment not found'], 404);
            }
            return redirect()->route('enrollments.index')->with('error', 'Enrollment not found');
        }

        if ($request->ajax() || $request->expectsJson()) {
            return response()->json(['enrollment' => $enrollment]);
        }

        return Inertia::render('Admin/Enrollments/Show', [
            'enrollment' => $enrollment
        ]);
    }

    /**
     * Update the specified enrollment in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'completion_date' => 'nullable|date|after_or_equal:enrollment_date',
            'status' => 'required|string|in:enrolled,in_progress,completed,dropped',
            'payment_status' => 'required|string|in:pending,partial,paid,refunded',
        ]);

        if ($validator->fails()) {
            if ($request->ajax() || $request->expectsJson()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $enrollment = DB::table('student_training')->where('id', $id)->first();

        if (!$enrollment) {
            if ($request->ajax() || $request->expectsJson()) {
                return response()->json(['message' => 'Enrollment not found'], 404);
            }
            return redirect()->route('enrollments.index')->with('error', 'Enrollment not found');
        }

        DB::table('student_training')
            ->where('id', $id)
            ->update([
                'completion_date' => $request->completion_date,
                'status' => $request->status,
                'payment_status' => $request->payment_status,
                'updated_at' => now(),
            ]);

        if ($request->ajax() || $request->expectsJson()) {
            return response()->json([
                'message' => 'Enrollment updated successfully!'
            ]);
        }

        return redirect()->route('enrollments.index')->with('success', 'Enrollment updated successfully!');
    }

    /**
     * Remove the specified enrollment from storage.
     */
    public function destroy(Request $request, $id)
    {
        $enrollment = DB::table('student_training')->where('id', $id)->first();

        if (!$enrollment) {
            if ($request->ajax() || $request->expectsJson()) {
                return response()->json(['message' => 'Enrollment not found'], 404);
            }
            return redirect()->route('enrollments.index')->with('error', 'Enrollment not found');
        }

        DB::table('student_training')->where('id', $id)->delete();

        if ($request->ajax() || $request->expectsJson()) {
            return response()->json([
                'message' => 'Enrollment deleted successfully!'
            ]);
        }

        return redirect()->route('enrollments.index')->with('success', 'Enrollment deleted successfully!');
    }

    /**
     * API Methods
     */

    /**
     * API: Display a listing of enrollments.
     */
    public function apiIndex(Request $request)
    {
        // Only respond to explicit API requests
        if (!$request->expectsJson() && !$request->ajax()) {
            abort(406, 'API endpoint requires Accept: application/json header');
        }

        $enrollments = DB::table('student_training')
            ->join('students', 'student_training.student_id', '=', 'students.id')
            ->join('trainings', 'student_training.training_id', '=', 'trainings.id')
            ->select(
                'students.first_name',
                'students.last_name',
                'students.email',
                'trainings.name as training_name',
                'trainings.code as training_code',
                'student_training.enrollment_date',
                'student_training.completion_date',
                'student_training.status',
                'student_training.payment_status',
                'student_training.id'
            )
            ->orderBy('student_training.enrollment_date', 'desc')
            ->paginate(10);

        return response()->json([
            'data' => $enrollments
        ]);
    }

    /**
     * API: Store a newly created enrollment.
     */
    public function apiStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|exists:students,id',
            'training_id' => 'required|exists:trainings,id',
            'enrollment_date' => 'required|date',
            'completion_date' => 'nullable|date|after_or_equal:enrollment_date',
            'status' => 'required|string|in:enrolled,in_progress,completed,dropped',
            'payment_status' => 'required|string|in:pending,partial,paid,refunded',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $student = Student::find($request->student_id);
        $training = Training::find($request->training_id);

        // Check if the student is already enrolled in this training
        if ($student->trainings()->where('training_id', $training->id)->exists()) {
            return response()->json([
                'message' => 'Student is already enrolled in this training'
            ], 422);
        }

        // Attach the training to the student with pivot data
        $student->trainings()->attach($training->id, [
            'id' => Str::uuid()->toString(),
            'enrollment_date' => $request->enrollment_date,
            'completion_date' => $request->completion_date,
            'status' => $request->status,
            'payment_status' => $request->payment_status,
        ]);

        return response()->json([
            'message' => 'Student enrolled successfully!'
        ], 201);
    }

    /**
     * API: Display the specified enrollment.
     */
    public function apiShow($id)
    {
        $enrollment = DB::table('student_training')
            ->join('students', 'student_training.student_id', '=', 'students.id')
            ->join('trainings', 'student_training.training_id', '=', 'trainings.id')
            ->where('student_training.id', $id)
            ->select(
                'student_training.*',
                'students.first_name',
                'students.last_name',
                'students.email',
                'trainings.name as training_name',
                'trainings.code as training_code',
                'trainings.duration',
                'trainings.price'
            )
            ->first();

        if (!$enrollment) {
            return response()->json(['message' => 'Enrollment not found'], 404);
        }

        return response()->json(['enrollment' => $enrollment]);
    }

    /**
     * API: Update the specified enrollment.
     */
    public function apiUpdate(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'completion_date' => 'nullable|date|after_or_equal:enrollment_date',
            'status' => 'required|string|in:enrolled,in_progress,completed,dropped',
            'payment_status' => 'required|string|in:pending,partial,paid,refunded',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $enrollment = DB::table('student_training')->where('id', $id)->first();

        if (!$enrollment) {
            return response()->json(['message' => 'Enrollment not found'], 404);
        }

        DB::table('student_training')
            ->where('id', $id)
            ->update([
                'completion_date' => $request->completion_date,
                'status' => $request->status,
                'payment_status' => $request->payment_status,
                'updated_at' => now(),
            ]);

        return response()->json([
            'message' => 'Enrollment updated successfully!'
        ]);
    }

    /**
     * API: Remove the specified enrollment.
     */
    public function apiDestroy($id)
    {
        $enrollment = DB::table('student_training')->where('id', $id)->first();

        if (!$enrollment) {
            return response()->json(['message' => 'Enrollment not found'], 404);
        }

        DB::table('student_training')->where('id', $id)->delete();

        return response()->json([
            'message' => 'Enrollment deleted successfully!'
        ]);
    }
}
