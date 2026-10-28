<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
        }
        .container {
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .header {
            background-color: #2563eb;
            color: white;
            padding: 15px;
            border-radius: 5px 5px 0 0;
            margin-bottom: 20px;
        }
        .contact-details {
            margin-bottom: 20px;
        }
        .detail-row {
            margin-bottom: 10px;
        }
        .label {
            font-weight: bold;
            display: inline-block;
            width: 100px;
        }
        .message-box {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #2563eb;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #666;
            text-align: center;
            border-top: 1px solid #eee;
            padding-top: 15px;
        }
        .cta-button {
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>

        <p>You have received a new message from the contact form on your website.</p>

        <div class="contact-details">
            <div class="detail-row">
                <span class="label">Name:</span> {{ $contact->name }}
            </div>
            <div class="detail-row">
                <span class="label">Email:</span> {{ $contact->email }}
            </div>
            @if($contact->phone)
            <div class="detail-row">
                <span class="label">Phone:</span> {{ $contact->phone }}
            </div>
            @endif
            <div class="detail-row">
                <span class="label">Subject:</span> {{ $contact->subject }}
            </div>
            <div class="detail-row">
                <span class="label">Date:</span> {{ $contact->created_at->format('F j, Y, g:i a') }}
            </div>
        </div>

        <h3>Message:</h3>
        <div class="message-box">
            <p>{{ $contact->message }}</p>
        </div>

        <a href="{{ url('/admin/contacts/' . $contact->id) }}" class="cta-button">View in Dashboard</a>

        <div class="footer">
            <p>This is an automated email from Alpha Beta Safety Academy.</p>
        </div>
    </div>
</body>
</html>
