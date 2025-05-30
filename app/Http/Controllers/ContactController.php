<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormSubmission;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Store a new contact message
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // Validate the request
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'subject' => 'required|string|max:255',
                'message' => 'required|string',
                'phone' => 'nullable|string|max:20',
            ]);

            // Store the contact in the database
            $contact = Contact::create($validated);

            // Try to send an email notification if mail is configured
            try {
                Mail::to(config('mail.admin_email', 'admin@alphabetacademy.org'))
                    ->send(new ContactFormSubmission($contact));
            } catch (\Exception $e) {
                // Log the error but don't fail the request
                Log::error('Failed to send contact email notification: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Contact message received successfully!',
                'data' => $contact
            ]);
        } catch (\Exception $e) {
            Log::error('Contact form submission error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'There was an error processing your request. Please try again later.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of contacts for admin.
     */
    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts,
            'statistics' => [
                'totalContacts' => Contact::count(),
                'unrepliedContacts' => Contact::whereNull('replied_at')->count(),
                'repliedContacts' => Contact::whereNotNull('replied_at')->count(),
            ]
        ]);
    }

    /**
     * Show contact details for admin.
     */
    public function show(Contact $contact)
    {
        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $contact
        ]);
    }

    /**
     * Reply to a contact.
     */
    public function reply(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'reply' => 'required|string',
        ]);

        $contact->update([
            'admin_reply' => $validated['reply'],
            'replied_at' => now(),
        ]);

        // Send reply email to the contact
        $this->sendReplyEmail($contact);

        return redirect()->route('admin.contacts.index')
            ->with('success', 'Reply sent successfully!');
    }

    /**
     * Send email notification to admin.
     */
    private function sendAdminNotification(Contact $contact)
    {
        $adminEmail = 'info@alphabetacademy.org';
        
        $data = [
            'contact' => $contact,
            'subject' => "New Contact Form Submission: {$contact->subject}"
        ];

        Mail::send('emails.admin-notification', $data, function($message) use ($data, $adminEmail) {
            $message->to($adminEmail)
                ->subject($data['subject']);
        });
    }

    /**
     * Send reply email to the contact.
     */
    private function sendReplyEmail(Contact $contact)
    {
        $data = [
            'contact' => $contact,
            'subject' => "RE: {$contact->subject}"
        ];

        Mail::send('emails.contact-reply', $data, function($message) use ($data, $contact) {
            $message->to($contact->email)
                ->subject($data['subject']);
        });
    }
} 