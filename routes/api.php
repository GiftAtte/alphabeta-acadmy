<?php

use App\Http\Controllers\CertificateController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\SiteVisitController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TrainingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API routes
Route::post('/certificates/verify', [CertificateController::class, 'verify'])->name('api.certificate.verify');
Route::post('/contacts', [ContactController::class, 'store'])->name('api.contacts.store');
Route::post('/leads', [LeadController::class, 'store'])->name('api.leads.store');

// Admin API routes - protected with auth
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    // Students API
    Route::get('/students', [StudentController::class, 'apiIndex'])->name('api.students.index');
    Route::post('/students', [StudentController::class, 'apiStore'])->name('api.students.store');
    Route::get('/students/{student}', [StudentController::class, 'apiShow'])->name('api.students.show');
    Route::put('/students/{student}', [StudentController::class, 'apiUpdate'])->name('api.students.update');
    Route::delete('/students/{student}', [StudentController::class, 'apiDestroy'])->name('api.students.destroy');

    // Trainings API
    Route::get('/trainings', [TrainingController::class, 'apiIndex'])->name('api.trainings.index');
    Route::post('/trainings', [TrainingController::class, 'apiStore'])->name('api.trainings.store');
    Route::get('/trainings/{training}', [TrainingController::class, 'apiShow'])->name('api.trainings.show');
    Route::put('/trainings/{training}', [TrainingController::class, 'apiUpdate'])->name('api.trainings.update');
    Route::delete('/trainings/{training}', [TrainingController::class, 'apiDestroy'])->name('api.trainings.destroy');

    // Certificates API
    Route::get('/certificates', [CertificateController::class, 'apiIndex'])->name('api.certificates.index');
    Route::post('/certificates', [CertificateController::class, 'apiStore'])->name('api.certificates.store');
    Route::get('/certificates/{certificate}', [CertificateController::class, 'apiShow'])->name('api.certificates.show');
    Route::put('/certificates/{certificate}', [CertificateController::class, 'apiUpdate'])->name('api.certificates.update');
    Route::delete('/certificates/{certificate}', [CertificateController::class, 'apiDestroy'])->name('api.certificates.destroy');

    // Enrollments API
    Route::get('/enrollments', [EnrollmentController::class, 'apiIndex'])->name('api.enrollments.index');
    Route::post('/enrollments', [EnrollmentController::class, 'apiStore'])->name('api.enrollments.store');
    Route::get('/enrollments/{id}', [EnrollmentController::class, 'apiShow'])->name('api.enrollments.show');
    Route::put('/enrollments/{id}', [EnrollmentController::class, 'apiUpdate'])->name('api.enrollments.update');
    Route::delete('/enrollments/{id}', [EnrollmentController::class, 'apiDestroy'])->name('api.enrollments.destroy');

    // Analytics API
    Route::get('/analytics/site-visits', [SiteVisitController::class, 'getAnalytics'])->name('api.analytics.site-visits');
});
