<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ApplicationController extends Controller
{
    // Applicant: Apply to a job
    public function apply(Request $request, $jobId)
    {
        Log::debug('User ID: ' . $request->user()->id . ' trying to apply for job ID: ' . $jobId);


        $request->validate([
            'message' => 'required|string|min:10',
        ]);
        


        $job = Job::where('status', 'published')->findOrFail($jobId);

        // prevent duplicate applications
        $exists = Application::where('user_id', $request->user()->id)
            ->where('job_id', $job->id)
            ->exists();

        Log::debug('Application exists: ' . ($exists ? 'Yes' : 'No'));


        if ($exists) {
            return response()->json(['message' => 'You have already applied to this job.'], 409);
        }

        $application = Application::create([
            'user_id' => $request->user()->id,
            'job_id' => $job->id,
            'message' => $request->message,
        ]);

        return response()->json(['message' => 'Application submitted successfully', 'application' => $application]);
    }

    // Applicant: View applications list submitted
    public function myApplications(Request $request)
    {
        return Application::where('user_id', $request->user()->id)
            ->with('job') // 👈 so you can access $app.job.title etc
            ->latest()
            ->get();
    }

    // Employer: View applicants for a job
    public function listApplicants(Request $request, $jobId)
    {
        $job = Job::where('user_id', $request->user()->id)->findOrFail($jobId);

        $applications = $job->applications()->with('applicant')->latest()->get();

        return response()->json($applications);
    }
}
