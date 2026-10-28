<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Response to Your Inquiry</title>
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
        .message-section {
            margin-bottom: 30px;
        }
        .message-header {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #2563eb;
        }
        .message-box {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #2563eb;
            margin-bottom: 20px;
        }
        .original-message {
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #666;
            margin-top: 20px;
            font-style: italic;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #666;
            text-align: center;
            border-top: 1px solid #eee;
            padding-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 24px;">Response to Your Inquiry</h1>
        </div>

        <p>Dear {{ $contact->name }},</p>

        <p>Thank you for contacting Alpha Beta Safety Academy. We have received your message and are pleased to provide you with a response.</p>

        <div class="message-section">
            <div class="message-header">Our Response:</div>
            <div class="message-box">
                <p>{{ $contact->admin_reply }}</p>
            </div>

            <div class="message-header">Your Original Message ({{ $contact->created_at->format('F j, Y') }}):</div>
            <div class="original-message">
                <p><strong>Subject:</strong> {{ $contact->subject }}</p>
                <p>{{ $contact->message }}</p>
            </div>
        </div>

        <p>If you have any further questions, please don't hesitate to contact us again.</p>

        <p>Best regards,<br>
        Alpha Beta Safety Academy Team</p>

        <div class="footer">
            <p>This email is in response to your inquiry submitted through our website.</p>
            <p>© {{ date('Y') }} Alpha Beta Safety Academy. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
