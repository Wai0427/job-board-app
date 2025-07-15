<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ApplicationController;

// Public: Login, Register, and CSRF setup
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrf' => csrf_token()]);
});

// Protected Routes: Requires Sanctum Auth
Route::middleware('auth:sanctum')->group(function () {
    // Shared (any logged-in user)
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);


    // 🧑‍💼 Employers only
    Route::middleware('role:employer')->group(function () {
        Route::post('/jobs', [JobController::class, 'store']);               // Create job
        Route::put('/jobs/{id}', [JobController::class, 'update']);          // Edit job
        Route::delete('/jobs/{id}', [JobController::class, 'destroy']);      // Delete job
        Route::get('/employer/jobs', [JobController::class, 'myJobs']);      // Employer's own jobs for CRUD
        Route::get('/employer/jobs/{id}', [JobController::class, 'showEmployerJob']); // display editing job page
        Route::get('/jobs/{id}/applicants', [ApplicationController::class, 'listApplicants']); // Applicants' message for job
        Route::get('/employer/jobs-with-applicants', [JobController::class, 'publishedJobsWithApplicants']);// Employer for job viewing (Applicant amount)

    });

    // 🙋 Applicants only
    Route::middleware('role:applicant')->group(function () {
        Route::post('/jobs/{id}/apply', [ApplicationController::class, 'apply']); // Apply to job
        Route::get('/applications/my', [ApplicationController::class, 'myApplications']); // View Application list
        Route::get('/jobs', [JobController::class, 'index']);        // View published jobs
        Route::get('/jobs/{id}', [JobController::class, 'show']);    // View job detail
    });
});
