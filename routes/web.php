<?php

use App\Http\Controllers\CertificateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\SiteVisitController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Website Routes
Route::get('/', fn () => Inertia::render('homePage'))->name('home');
Route::get('/about', fn () => Inertia::render('aboutPage'));
Route::get('/courses', fn () => Inertia::render('coursesPage'));
Route::get('/certifications', fn () => Inertia::render('certificationsPage'));
Route::get('/training-methods', fn () => Inertia::render('TrainingMethodsPage'));
Route::get('/why-choose-us', fn () => Inertia::render('WhyChooseUsPage'));
Route::get('/contact', fn () => Inertia::render('contactPage'));

// API endpoints
Route::prefix('api')->group(function () {
    Route::get('/trainings', [TrainingController::class, 'apiGetTrainings'])->name('api.trainings.index');
    Route::post('/leads', [LeadController::class, 'store'])->name('api.leads.store');
    Route::get('/students', [StudentController::class, 'apiGetStudents'])->name('api.students.index');
    Route::post('/contacts', [ContactController::class, 'store'])->name('api.contacts.store');
});

// Student Enrollment
Route::get('/student/enroll', [EnrollmentController::class, 'create'])->name('student.enroll');
Route::post('/student/enroll', [EnrollmentController::class, 'store'])->name('student.enroll.store');

// Certificate Verification
Route::get('/verify', fn () => Inertia::render('verifyPage'));
Route::post('/verify-certificate', [CertificateController::class, 'verify']);

// Redirect to admin dashboard
Route::get('dashboard', function () {
    return redirect(route('admin.dashboard'));
});

// Admin Routes
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    // Leads Management
    Route::get('/leads', [LeadController::class, 'index'])->name('admin.leads.index');
    Route::post('/leads', [LeadController::class, 'store'])->name('admin.leads.store');
    Route::put('/leads/{lead}', [LeadController::class, 'update'])->name('admin.leads.update');
    Route::delete('/leads/{lead}', [LeadController::class, 'destroy'])->name('admin.leads.destroy');

    // Contact Messages Management
    Route::get('/contacts', [ContactController::class, 'index'])->name('admin.contacts.index');
    Route::get('/contacts/{contact}', [ContactController::class, 'show'])->name('admin.contacts.show');
    Route::post('/contacts/{contact}/reply', [ContactController::class, 'reply'])->name('admin.contacts.reply');

    // Users Management - API-like Routes for Modal CRUD
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // Students Management - Inertia Pages
    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
    Route::get('/students/create', [StudentController::class, 'create'])->name('students.create');
    Route::get('/students/{student}/edit', [StudentController::class, 'edit'])->name('students.edit');
    Route::get('/students/{student}', [StudentController::class, 'show'])->name('students.show');
    Route::post('/students', [StudentController::class, 'store'])->name('students.store');
    Route::put('/students/{student}', [StudentController::class, 'update'])->name('students.update');
    Route::delete('/students/{student}', [StudentController::class, 'destroy'])->name('students.destroy');

    // API endpoint for student dropdowns
    Route::get('/students-dropdown', [StudentController::class, 'getStudentsForDropdown'])->name('students.dropdown');

    // Trainings Management - Inertia Pages
    Route::get('/trainings', [TrainingController::class, 'index'])->name('admin.trainings.index');
    Route::get('/trainings/create', [TrainingController::class, 'create'])->name('admin.trainings.create');
    Route::get('/trainings/{training}/edit', [TrainingController::class, 'edit'])->name('admin.trainings.edit');
    Route::get('/trainings/{training}', [TrainingController::class, 'show'])->name('admin.trainings.show');
    Route::post('/trainings', [TrainingController::class, 'store'])->name('admin.trainings.store');
    Route::put('/trainings/{training}', [TrainingController::class, 'update'])->name('admin.trainings.update');
    Route::delete('/trainings/{training}', [TrainingController::class, 'destroy'])->name('admin.trainings.destroy');

    // API endpoint for training dropdowns
    Route::get('/trainings-dropdown', [TrainingController::class, 'getTrainingsForDropdown'])->name('admin.trainings.dropdown');

    // Certificates Management - Inertia Pages
    Route::get('/certificates', [CertificateController::class, 'index'])->name('certificates.index');
    Route::get('/certificates/create', [CertificateController::class, 'create'])->name('certificates.create');
    Route::get('/certificates/{certificate}/edit', [CertificateController::class, 'edit'])->name('certificates.edit');
    Route::get('/certificates/{certificate}', [CertificateController::class, 'show'])->name('certificates.show');
    Route::post('/certificates', [CertificateController::class, 'store'])->name('certificates.store');
    Route::put('/certificates/{certificate}', [CertificateController::class, 'update'])->name('certificates.update');
    Route::delete('/certificates/{certificate}', [CertificateController::class, 'destroy'])->name('certificates.destroy');

    // Enrollments Management - Inertia Pages
    Route::get('/enrollments', [EnrollmentController::class, 'index'])->name('enrollments.index');
    Route::get('/enrollments/create', [EnrollmentController::class, 'create'])->name('enrollments.create');
    Route::get('/enrollments/{id}', [EnrollmentController::class, 'show'])->name('enrollments.show');
    Route::post('/enrollments', [EnrollmentController::class, 'store'])->name('enrollments.store');
    Route::put('/enrollments/{id}', [EnrollmentController::class, 'update'])->name('enrollments.update');
    Route::delete('/enrollments/{id}', [EnrollmentController::class, 'destroy'])->name('enrollments.destroy');

    // Analytics
    Route::get('/analytics/site-visits', [SiteVisitController::class, 'index'])->name('admin.analytics.site-visits');
});

// Auth Routes
require __DIR__.'/auth.php';

// Settings routes
require __DIR__.'/settings.php';

// Fallback route for 404
Route::fallback(fn () => Inertia::render('notFoundPage'));
