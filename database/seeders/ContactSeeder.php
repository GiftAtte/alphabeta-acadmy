<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contacts = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'phone' => '+2348033404197',
                'subject' => 'Course Inquiry',
                'message' => 'I would like to know more about your programming courses.',
                'admin_reply' => 'Thank you for your interest. Our programming courses start next month.',
                'replied_at' => Carbon::now()->subDays(2),
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'phone' => '+2349157452720',
                'subject' => 'Training Schedule',
                'message' => 'When is the next batch of web development training starting?',
                'admin_reply' => 'The next batch starts on the 15th of next month.',
                'replied_at' => Carbon::now()->subDay(),
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDay(),
            ],
            [
                'name' => 'Mike Johnson',
                'email' => 'mike@example.com',
                'phone' => '+2349027660870',
                'subject' => 'Certificate Verification',
                'message' => 'How can I verify my certificate?',
                'admin_reply' => 'Please provide your certificate number and we will verify it for you.',
                'replied_at' => Carbon::now()->subDay(),
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDay(),
            ],
            [
                'name' => 'Sarah Williams',
                'email' => 'sarah@example.com',
                'phone' => '+2348033404197',
                'subject' => 'Payment Issue',
                'message' => 'I am having trouble with the payment process.',
                'admin_reply' => 'Please try using a different payment method or contact our support.',
                'replied_at' => Carbon::now()->subHours(12),
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subHours(12),
            ],
            [
                'name' => 'David Brown',
                'email' => 'david@example.com',
                'phone' => '+2349157452720',
                'subject' => 'Course Materials',
                'message' => 'When will I receive the course materials?',
                'created_at' => Carbon::now()->subHour(),
                'updated_at' => Carbon::now()->subHour(),
            ],
        ];

        foreach ($contacts as $contact) {
            Contact::create($contact);
        }
    }
}
