<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function landing()
    {
        return Inertia::render('Landing');
    }

    public function verifyPage()
    {
        return Inertia::render('Verify');
    }

    public function verify(Request $request)
    {
        $certificate = Certificate::where('certificate_number', $request->certificate_number)->first();
        return response()->json([
            'found' => $certificate ? true : false,
            'data' => $certificate
        ]);
    }

    public function uploadPage()
    {
        return Inertia::render('UploadCertificate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'certificate_number' => 'required|unique:certificates',
            'name' => 'required|string',
            'course' => 'required|string',
            'issued_date' => 'required|date',
        ]);

        Certificate::create($request->all());

        return redirect()->back()->with('success', 'Certificate uploaded.');
    }
}
