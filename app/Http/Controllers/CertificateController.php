<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Student;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Inertia\Inertia;

class CertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $certificates = Certificate::latest()
            ->with(['student:id,first_name,last_name,email', 'training:id,name,code'])
            ->select('certificate_number', 'issue_date', 'expiry_date', 'status', 'grade', 'student_id', 'training_id', 'id')
            ->paginate(10);

        // Gather statistics for dashboard cards
        $totalCertificates = Certificate::count();
        $activeCertificates = Certificate::where('status', 'active')->count();
        $expiredCertificates = Certificate::where('status', 'expired')->count();
        $revokedCertificates = Certificate::where('status', 'revoked')->count();

        // Certificates issued this month
        $currentMonth = Carbon::now()->startOfMonth();
        $issuedThisMonth = Certificate::where('issue_date', '>=', $currentMonth)->count();

        // Certificates expiring in the next 30 days
        $today = Carbon::now();
        $thirtyDaysLater = Carbon::now()->addDays(30);
        $expiringCertificates = Certificate::whereNotNull('expiry_date')
            ->where('expiry_date', '>=', $today)
            ->where('expiry_date', '<=', $thirtyDaysLater)
            ->count();

        // Top trainings with most certificates
        $topTrainings = DB::table('certificates')
            ->join('trainings', 'certificates.training_id', '=', 'trainings.id')
            ->select('trainings.name', DB::raw('count(*) as count'))
            ->groupBy('trainings.name')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Certificates/Index', [
            'certificates' => $certificates,
            'statistics' => [
                'totalCertificates' => $totalCertificates,
                'activeCertificates' => $activeCertificates,
                'expiredCertificates' => $expiredCertificates,
                'revokedCertificates' => $revokedCertificates,
                'issuedThisMonth' => $issuedThisMonth,
                'expiringCertificates' => $expiringCertificates,
                'topTrainings' => $topTrainings
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'certificate_number' => 'required|string|max:255|unique:certificates,certificate_number',
            'student_id' => 'required|exists:students,id',
            'training_id' => 'required|exists:trainings,id',
            'issue_date' => 'required|date',
            'expiry_date' => 'nullable|date|after:issue_date',
            'status' => 'nullable|string|in:active,expired,revoked',
            'grade' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            if ($request->ajax() || $request->expectsJson()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $data = $validator->validated();

        // Set default status if not provided
        if (empty($data['status'])) {
            $data['status'] = 'active';
        }

        $certificate = Certificate::create($data);

        if ($request->ajax() || $request->expectsJson()) {
            return response()->json([
                'message' => 'Certificate created successfully!',
                'certificate' => $certificate
            ], 201);
        }

        return redirect()->route('certificates.index')->with('success', 'Certificate created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Certificate $certificate)
    {
        $certificate->load('student', 'training');

        if ($request->ajax() || $request->expectsJson()) {
            return response()->json(['certificate' => $certificate]);
        }

        return Inertia::render('Admin/Certificates/Show', [
            'certificate' => $certificate
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Certificate $certificate)
    {
        $validator = Validator::make($request->all(), [
            'certificate_number' => 'required|string|max:255|unique:certificates,certificate_number,' . $certificate->id,
            'student_id' => 'required|exists:students,id',
            'training_id' => 'required|exists:trainings,id',
            'issue_date' => 'required|date',
            'expiry_date' => 'nullable|date|after:issue_date',
            'status' => 'nullable|string|in:active,expired,revoked',
            'grade' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            if ($request->ajax() || $request->expectsJson()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $certificate->update($validator->validated());

        if ($request->ajax() || $request->expectsJson()) {
            return response()->json([
                'message' => 'Certificate updated successfully!',
                'certificate' => $certificate
            ]);
        }

        return redirect()->route('certificates.index')->with('success', 'Certificate updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Certificate $certificate)
    {
        $certificate->delete();

        if ($request->ajax() || $request->expectsJson()) {
            return response()->json([
                'message' => 'Certificate deleted successfully!'
            ]);
        }

        return redirect()->route('certificates.index')->with('success', 'Certificate deleted successfully!');
    }

    /**
     * Verify a certificate by its number.
     */
    public function verify(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'certificate_number' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'isValid' => false,
                'message' => $validator->errors()->first('certificate_number')
            ], 422);
        }

        $certificate = Certificate::where('certificate_number', $request->certificate_number)
            ->with(['student', 'training'])
            ->first();

        if (!$certificate) {
            return response()->json([
                'isValid' => false,
                'message' => 'Certificate not found. Please check the number and try again.'
            ]);
        }

        // Determine certificate status
        $status = $certificate->status;
        if ($status !== 'revoked' && $certificate->expiry_date && $certificate->expiry_date < now()) {
            $status = 'expired';
        }

        $response = [
            'isValid' => ($status === 'valid' || $status === 'active'),
            'certificate' => [
                'certificate_number' => $certificate->certificate_number,
                'issue_date' => $certificate->issue_date,
                'expiry_date' => $certificate->expiry_date,
                'status' => $status,
                'student' => [
                    'first_name' => $certificate->student->first_name,
                    'last_name' => $certificate->student->last_name,
                ],
                'training' => [
                    'name' => $certificate->training->name,
                    'code' => $certificate->training->code,
                    'duration' => $certificate->training->duration ?? 0,
                ]
            ]
        ];

        return response()->json($response);
    }

    /**
     * Display the create form for certificate.
     */
    public function create()
    {
        return Inertia::render('Admin/Certificates/Create');
    }

    /**
     * Display the edit form for certificate.
     */
    public function edit(Certificate $certificate)
    {
        $certificate->load('student', 'training');

        return Inertia::render('Admin/Certificates/Edit', [
            'certificate' => $certificate
        ]);
    }

    /**
     * API Methods
     */

    /**
     * API: Display a listing of the resource.
     */
    public function apiIndex(Request $request)
    {
        // Only respond to explicit API requests
        if (!$request->expectsJson() && !$request->ajax()) {
            abort(406, 'API endpoint requires Accept: application/json header');
        }

        $certificates = Certificate::latest()
            ->with(['student:id,first_name,last_name,email', 'training:id,name,code'])
            ->select('certificate_number', 'issue_date', 'expiry_date', 'status', 'grade', 'student_id', 'training_id', 'id')
            ->paginate(10);

        return response()->json([
            'data' => $certificates
        ]);
    }

    /**
     * API: Store a newly created resource.
     */
    public function apiStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'certificate_number' => 'required|string|max:255|unique:certificates,certificate_number',
            'student_id' => 'required|exists:students,id',
            'training_id' => 'required|exists:trainings,id',
            'issue_date' => 'required|date',
            'expiry_date' => 'nullable|date|after:issue_date',
            'status' => 'nullable|string|in:active,expired,revoked',
            'grade' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        // Set default status if not provided
        if (empty($data['status'])) {
            $data['status'] = 'active';
        }

        $certificate = Certificate::create($data);

        return response()->json([
            'message' => 'Certificate created successfully!',
            'certificate' => $certificate
        ], 201);
    }

    /**
     * API: Display the specified resource.
     */
    public function apiShow(Certificate $certificate)
    {
        $certificate->load('student', 'training');
        return response()->json(['certificate' => $certificate]);
    }

    /**
     * API: Update the specified resource.
     */
    public function apiUpdate(Request $request, Certificate $certificate)
    {
        $validator = Validator::make($request->all(), [
            'certificate_number' => 'required|string|max:255|unique:certificates,certificate_number,' . $certificate->id,
            'student_id' => 'required|exists:students,id',
            'training_id' => 'required|exists:trainings,id',
            'issue_date' => 'required|date',
            'expiry_date' => 'nullable|date|after:issue_date',
            'status' => 'nullable|string|in:active,expired,revoked',
            'grade' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $certificate->update($validator->validated());

        return response()->json([
            'message' => 'Certificate updated successfully!',
            'certificate' => $certificate
        ]);
    }

    /**
     * API: Remove the specified resource.
     */
    public function apiDestroy(Certificate $certificate)
    {
        $certificate->delete();

        return response()->json([
            'message' => 'Certificate deleted successfully!'
        ]);
    }
}
