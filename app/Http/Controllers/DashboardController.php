<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\SiteVisit;
use App\Models\Student;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard with statistics.
     */
    public function index()
    {
        // Get total counts
        $totalStudents = Student::count();
        $totalTrainings = Training::count();
        $totalCertificates = Certificate::count();
        $totalVisits = SiteVisit::count();
        $uniqueVisitors = SiteVisit::distinct('ip_address')->count('ip_address');

        // Recent enrollments - first try using created_at
        $recentEnrollments = DB::table('student_training')
            ->join('students', 'student_training.student_id', '=', 'students.id')
            ->join('trainings', 'student_training.training_id', '=', 'trainings.id')
            ->select(
                'student_training.id',
                'students.first_name',
                'students.last_name',
                'trainings.name as training_name',
                'student_training.enrollment_date',
                'student_training.status'
            )
            ->orderBy('student_training.created_at', 'desc')
            ->limit(5)
            ->get();

        // If no enrollments were found or if created_at values are missing/null, try using enrollment_date
        if ($recentEnrollments->isEmpty() || $recentEnrollments->count() < 5) {
            // Get by enrollment_date and exclude already fetched IDs
            $additionalQuery = DB::table('student_training')
                ->join('students', 'student_training.student_id', '=', 'students.id')
                ->join('trainings', 'student_training.training_id', '=', 'trainings.id')
                ->select(
                    'student_training.id',
                    'students.first_name',
                    'students.last_name',
                    'trainings.name as training_name',
                    'student_training.enrollment_date',
                    'student_training.status'
                );
                
            if (!$recentEnrollments->isEmpty()) {
                $existingIds = $recentEnrollments->pluck('id')->toArray();
                $additionalQuery->whereNotIn('student_training.id', $existingIds);
            }
                
            $additionalEnrollments = $additionalQuery
                ->orderBy('student_training.enrollment_date', 'desc')
                ->limit(5 - $recentEnrollments->count())
                ->get();
                
            // Merge and re-sort the results
            if (!$additionalEnrollments->isEmpty()) {
                $recentEnrollments = $recentEnrollments->concat($additionalEnrollments)
                    ->sortByDesc(function($enrollment) {
                        return $enrollment->enrollment_date;
                    })
                    ->take(5)
                    ->values();
            }
        }

        // Recent certificates (last 7 days)
        $recentCertificates = Certificate::with(['student:id,first_name,last_name', 'training:id,name,code'])
            ->select('id', 'certificate_number', 'issue_date', 'student_id', 'training_id')
            ->orderBy('issue_date', 'desc')
            ->limit(5)
            ->get();

        // Trainings by category
        $trainingsByCategory = Training::select(
                DB::raw('COALESCE(category, "Uncategorized") as category'), 
                DB::raw('count(*) as count')
            )
            ->groupBy('category')
            ->orderBy('count', 'desc')
            ->limit(6) // Limit to prevent chart crowding
            ->get();

        // Students by gender
        $studentsByGender = Student::select('gender', DB::raw('count(*) as count'))
            ->groupBy('gender')
            ->get();

        // Certificates by status
        $certificatesByStatus = Certificate::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get();

        // Site visits by date (last 7 days)
        $visitsByDate = SiteVisit::select(
                DB::raw('DATE(visit_time) as date'),
                DB::raw('count(*) as count')
            )
            ->where('visit_time', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'statistics' => [
                'totalStudents' => $totalStudents,
                'totalCertificates' => $totalCertificates,
                'totalTrainings' => $totalTrainings,
                'totalVisits' => $totalVisits,
                'uniqueVisitors' => $uniqueVisitors,
                'recentEnrollments' => $recentEnrollments,
                'recentCertificates' => $recentCertificates,
                'trainingsByCategory' => $trainingsByCategory,
                'studentsByGender' => $studentsByGender,
                'certificatesByStatus' => $certificatesByStatus,
                'visitsByDate' => $visitsByDate
            ]
        ]);
    }
}
