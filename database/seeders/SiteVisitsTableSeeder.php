<?php

namespace Database\Seeders;

use App\Models\SiteVisit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class SiteVisitsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            '/',
            '/about',
            '/courses',
            '/certifications',
            '/training-methods',
            '/why-choose-us',
            '/contact',
        ];

        $devices = ['desktop', 'mobile', 'tablet'];
        $countries = ['Nigeria', 'Ghana', 'South Africa', 'Kenya', 'United States', 'United Kingdom'];
        $cities = ['Lagos', 'Abuja', 'Accra', 'Johannesburg', 'Nairobi', 'New York', 'London'];

        // Generate 100 site visits over the last 30 days
        for ($i = 0; $i < 100; $i++) {
            $ip = rand(1, 255) . '.' . rand(1, 255) . '.' . rand(1, 255) . '.' . rand(1, 255);
            $visitTime = Carbon::now()->subDays(rand(0, 30))->subHours(rand(0, 23))->subMinutes(rand(0, 59));

            SiteVisit::create([
                'id' => Str::uuid()->toString(),
                'ip_address' => $ip,
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'page_visited' => $pages[array_rand($pages)],
                'referrer' => rand(0, 1) ? 'https://google.com' : (rand(0, 1) ? 'https://facebook.com' : null),
                'visit_time' => $visitTime,
                'country' => $countries[array_rand($countries)],
                'city' => $cities[array_rand($cities)],
                'device_type' => $devices[array_rand($devices)],
            ]);
        }
    }
}
