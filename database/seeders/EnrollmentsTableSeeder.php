<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\Training;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EnrollmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all students and trainings
        $students = Student::all();
        $trainings = Training::all();

        if ($students->isEmpty() || $trainings->isEmpty()) {
            return;
        }

        // Create some enrollments with different dates
        $statuses = ['enrolled', 'in_progress', 'completed', 'dropped'];
        $paymentStatuses = ['pending', 'partial', 'paid', 'refunded'];

        // Create 20 random enrollments
        for ($i = 0; $i < 20; $i++) {
            $student = $students->random();
            $training = $trainings->random();
            $enrollmentDate = Carbon::now()->subDays(rand(0, 30));
            
            // 70% chance of having a completion date if the enrollment was more than 7 days ago
            $completionDate = null;
            if ($enrollmentDate->lt(Carbon::now()->subDays(7)) && rand(1, 10) <= 7) {
                $completionDate = Carbon::parse($enrollmentDate)->addDays(rand(1, 60));
            }

            // Create the enrollment
            DB::table('student_training')->insert([
                'id' => Str::uuid()->toString(),
                'student_id' => $student->id,
                'training_id' => $training->id,
                'enrollment_date' => $enrollmentDate->format('Y-m-d'),
                'completion_date' => $completionDate ? $completionDate->format('Y-m-d') : null,
                'status' => $statuses[array_rand($statuses)],
                'payment_status' => $paymentStatuses[array_rand($paymentStatuses)],
                'created_at' => $enrollmentDate,
                'updated_at' => now(),
            ]);
        }

        // Create 5 very recent enrollments for testing the dashboard
        for ($i = 0; $i < 5; $i++) {
            $student = $students->random();
            $training = $trainings->random();
            $enrollmentDate = Carbon::now()->subHours(rand(1, 24));
            
            DB::table('student_training')->insert([
                'id' => Str::uuid()->toString(),
                'student_id' => $student->id,
                'training_id' => $training->id,
                'enrollment_date' => $enrollmentDate->format('Y-m-d'),
                'completion_date' => null,
                'status' => 'enrolled',
                'payment_status' => 'pending',
                'created_at' => $enrollmentDate,
                'updated_at' => now(),
            ]);
        }
    }
} 