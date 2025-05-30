<?php

namespace Database\Seeders;

use App\Models\Lead;
use App\Models\Training;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class LeadsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $trainings = Training::all();
        $admin = User::where('role', 'admin')->first();

        // Define statuses with weighted probabilities
        $statuses = [
            'new' => 40,
            'contacted' => 30,
            'qualified' => 15,
            'converted' => 10,
            'closed' => 5,
        ];

        // Create 50 leads
        for ($i = 0; $i < 50; $i++) {
            $status = $this->getRandomWeightedElement($statuses);
            $createdAt = $faker->dateTimeBetween('-6 months', 'now');

            $lead = [
                'id' => Str::uuid()->toString(),
                'name' => $faker->name(),
                'email' => $faker->unique()->safeEmail(),
                'training_id' => $trainings->random()->id,
                'phone' => $faker->boolean(80) ? $faker->phoneNumber() : null,
                'message' => $faker->boolean(70) ? $faker->paragraph(rand(1, 3)) : null,
                'status' => $status,
                'notes' => $status !== 'new' ? $faker->paragraph(rand(1, 2)) : null,
                'updated_by' => $status !== 'new' ? $admin->id : null,
                'created_at' => $createdAt,
                'updated_at' => $status !== 'new' ? $faker->dateTimeBetween($createdAt, 'now') : $createdAt,
            ];

            Lead::create($lead);
        }
    }

    /**
     * Get a random element from an array with weighted probabilities.
     *
     * @param array $weightedValues Array of values with their weights
     * @return mixed A randomly selected value based on weights
     */
    private function getRandomWeightedElement(array $weightedValues)
    {
        $rand = mt_rand(1, array_sum($weightedValues));

        foreach ($weightedValues as $key => $value) {
            $rand -= $value;
            if ($rand <= 0) {
                return $key;
            }
        }

        return array_key_first($weightedValues); // Fallback
    }
}
