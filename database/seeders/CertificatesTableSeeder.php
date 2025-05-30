<?php

namespace Database\Seeders;

use App\Models\Certificate;
use App\Models\Student;
use App\Models\Training;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class CertificatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = Student::all();
        $trainings = Training::all();
        $statuses = ['active', 'expired', 'revoked'];
        $grades = ['A', 'B', 'C', 'Pass', 'Merit', 'Distinction'];

        $certificateCount = 1;

        foreach ($students as $student) {
            // Each student gets 1-3 certificates randomly
            $certCount = rand(1, 3);

            for ($i = 0; $i < $certCount; $i++) {
                // Get a random training
                $training = $trainings->random();

                // Create issue date in the past
                $issueDate = Carbon::now()->subDays(rand(10, 365));

                // 70% active, 20% expired, 10% revoked
                $statusRand = rand(1, 10);
                $status = $statusRand <= 7 ? 'active' : ($statusRand <= 9 ? 'expired' : 'revoked');

                // Set expiry date based on status
                $expiryDate = null;
                if ($status === 'active') {
                    $expiryDate = Carbon::parse($issueDate)->addYears(2);
                } elseif ($status === 'expired') {
                    $expiryDate = Carbon::now()->subDays(rand(1, 90));
                }

                Certificate::create([
                    'id' => Str::uuid()->toString(),
                    'certificate_number' => 'CERT-' . str_pad($certificateCount, 5, '0', STR_PAD_LEFT),
                    'student_id' => $student->id,
                    'training_id' => $training->id,
                    'issue_date' => $issueDate,
                    'expiry_date' => $expiryDate,
                    'status' => $status,
                    'grade' => $grades[array_rand($grades)],
                    'notes' => $status === 'revoked' ? 'Certificate revoked due to policy violation' : null,
                ]);

                $certificateCount++;
            }
        }
    }
}
