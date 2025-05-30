@component('mail::message')
# New Contact Form Submission

**Name:** {{ $name }}  
**Email:** {{ $email }}  
@if($phone)
**Phone:** {{ $phone }}  
@endif
**Subject:** {{ $subject }}  

## Message:
{{ $message }}

@component('mail::button', ['url' => config('app.url')])
Go to Website
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent 