<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class StudentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $education_levels = ['High School', 'Bachelor', 'Master', 'PhD', 'Diploma'];
        $genders = ['Male', 'Female', 'Other'];

        for ($i = 1; $i <= 10; $i++) {
            Student::create([
                'id' => Str::uuid()->toString(),
                'first_name' => 'Student',
                'last_name' => 'Name ' . $i,
                'email' => 'student' . $i . '@example.com',
                'phone' => '123-456-78' . str_pad($i, 2, '0', STR_PAD_LEFT),
                'address' => 'Address for student ' . $i . ', Lagos, Nigeria',
                'date_of_birth' => Carbon::now()->subYears(20 + $i)->subDays(rand(0, 365)),
                'gender' => $genders[array_rand($genders)],
                'education_level' => $education_levels[array_rand($education_levels)],
                'registration_date' => Carbon::now()->subDays(rand(1, 90)),
                'status' => 'active',
            ]);
        }
    }
}
