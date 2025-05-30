<?php

namespace Database\Seeders;

use App\Models\Training;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TrainingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trainings = [
            [
                'name' => 'HSE Management Systems',
                'code' => 'HSE-001',
                'description' => 'Comprehensive overview of health, safety, and environmental management systems design and implementation.',
                'duration' => '5 days',
                'level' => 'Advanced',
                'price' => 450.00,
                'category' => 'Management',
                'status' => 'active',
            ],
            [
                'name' => 'Rigging & Lifting Operations',
                'code' => 'RLO-002',
                'description' => 'Rigging training covering lifting operations, load calculations, and safe use of hoisting equipment in industrial environments.',
                'duration' => '4 days',
                'level' => 'Intermediate',
                'price' => 350.00,
                'category' => 'Industrial Safety',
                'status' => 'active',
            ],
            [
                'name' => 'Confined Space Entry',
                'code' => 'CSE-003',
                'description' => 'Safety procedures for working in confined spaces, including hazard assessment, gas testing, and emergency response.',
                'duration' => '3 days',
                'level' => 'Intermediate',
                'price' => 300.00,
                'category' => 'Industrial Safety',
                'status' => 'active',
            ],
            [
                'name' => 'Safety Officer Training',
                'code' => 'SOT-004',
                'description' => 'Comprehensive training for individuals aiming to become certified safety officers, covering risk assessment and hazard control.',
                'duration' => '5 days',
                'level' => 'Advanced',
                'price' => 500.00,
                'category' => 'Occupational Health & Safety',
                'status' => 'active',
            ],
            [
                'name' => 'First Aid & CPR',
                'code' => 'FAC-005',
                'description' => 'Learn vital first aid techniques and CPR to respond effectively during emergencies until medical help arrives.',
                'duration' => '2 days',
                'level' => 'Beginner',
                'price' => 200.00,
                'category' => 'Emergency Response',
                'status' => 'active',
            ],
            [
                'name' => 'Fire Fighting & Prevention',
                'code' => 'FFP-006',
                'description' => 'Training focused on fire prevention, extinguisher use, fire suppression techniques, and evacuation protocols.',
                'duration' => '3 days',
                'level' => 'Intermediate',
                'price' => 300.00,
                'category' => 'Emergency Response',
                'status' => 'active',
            ],
            [
                'name' => 'Forklift Operation & Safety',
                'code' => 'FOS-007',
                'description' => 'Hands-on training in safe forklift operation, inspection, and load handling for warehouse and industrial settings.',
                'duration' => '3 days',
                'level' => 'Beginner',
                'price' => 250.00,
                'category' => 'Equipment Operation',
                'status' => 'active',
            ],
            [
                'name' => 'Crane Operation',
                'code' => 'CRO-008',
                'description' => 'Crane operator certification including load charts, signaling, crane setup, and safety procedures.',
                'duration' => '5 days',
                'level' => 'Advanced',
                'price' => 450.00,
                'category' => 'Equipment Operation',
                'status' => 'active',
            ],
            [
                'name' => 'Offshore Safety & Survival',
                'code' => 'OSS-009',
                'description' => 'Specialized training for offshore workers including helicopter underwater escape training (HUET) and offshore emergency response.',
                'duration' => '5 days',
                'level' => 'Advanced',
                'price' => 550.00,
                'category' => 'Oil & Gas Safety',
                'status' => 'active',
            ],
            [
                'name' => 'Basic Safety Training',
                'code' => 'BST-010',
                'description' => 'Comprehensive basic safety training for all industries',
                'duration' => '3 days',
                'level' => 'Beginner',
                'price' => 150.00,
                'category' => 'General Safety',
                'status' => 'active',
            ],
            [
                'name' => 'Advanced Fire Safety',
                'code' => 'AFS-011',
                'description' => 'Advanced training for fire prevention and management',
                'duration' => '5 days',
                'level' => 'Advanced',
                'price' => 300.00,
                'category' => 'Fire Safety',
                'status' => 'active',
            ],
            [
                'name' => 'Workplace Hazard Identification',
                'code' => 'WHI-012',
                'description' => 'Learn to identify and mitigate workplace hazards',
                'duration' => '2 days',
                'level' => 'Intermediate',
                'price' => 200.00,
                'category' => 'Workplace Safety',
                'status' => 'active',
            ],
            [
                'name' => 'HAZMAT Handling & Response',
                'code' => 'HHR-013',
                'description' => 'Handling, storage, and emergency response for hazardous materials',
                'duration' => '4 days',
                'level' => 'Advanced',
                'price' => 400.00,
                'category' => 'Hazardous Materials',
                'status' => 'active',
            ],
            [
                'name' => 'Scaffold Safety & Inspection',
                'code' => 'SSI-014',
                'description' => 'Safety procedures for erecting, using, and inspecting scaffolding',
                'duration' => '3 days',
                'level' => 'Intermediate',
                'price' => 275.00,
                'category' => 'Construction Safety',
                'status' => 'active',
            ],
            [
                'name' => 'Fall Protection Systems',
                'code' => 'FPS-015',
                'description' => 'Comprehensive training on fall prevention and protection systems',
                'duration' => '2 days',
                'level' => 'Intermediate',
                'price' => 225.00,
                'category' => 'Working at Heights',
                'status' => 'active',
            ],
        ];

        foreach ($trainings as $training) {
            Training::create(array_merge(
                ['id' => Str::uuid()->toString()],
                $training
            ));
        }
    }
}
