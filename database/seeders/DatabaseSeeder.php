<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create an admin user using the AdminUserSeeder
        $this->call([
            AdminUserSeeder::class,
            StudentsTableSeeder::class,
            TrainingsTableSeeder::class,
            EnrollmentsTableSeeder::class,
            CertificatesTableSeeder::class,
            SiteVisitsTableSeeder::class,
            LeadsTableSeeder::class,
        ]);
    }
}
