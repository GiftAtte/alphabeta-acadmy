<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('homePage'));
Route::get('/about', fn () => Inertia::render('aboutPage'));
Route::get('/courses', fn () => Inertia::render('coursesPage'));
Route::get('/certifications', fn () => Inertia::render('certificationsPage'));
Route::get('/training-methods', fn () => Inertia::render('trainingMethodsPage'));
Route::get('/why-choose-us', fn () => Inertia::render('whyChooseUsPage'));
Route::get('/contact', fn () => Inertia::render('contactPage'));
Route::fallback(fn () => Inertia::render('notFoundPage'));

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
