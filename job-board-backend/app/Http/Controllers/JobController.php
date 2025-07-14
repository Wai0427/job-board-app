<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    // Applicant: View all published jobs
    public function index()
    {
        return Job::where('status', 'published')->with('employer')->latest()->get();
    }

    // Applicant: View single job
    public function show($id)
    {
        $job = Job::where('status', 'published')->with('employer')->findOrFail($id);
        return response()->json($job);
    }
    

    // Employer: List their own jobs
    public function myJobs(Request $request)
    {
        return $request->user()->jobs()->latest()->get();
    }

    // Employer: Create a job
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required',
            'location' => 'required|string',
            'salary_range' => 'required|string',
            'is_remote' => 'required|boolean',
            'status' => 'required|in:draft,published',
        ]);

        $job = $request->user()->jobs()->create($request->all());

        return response()->json(['message' => 'Job created successfully', 'job' => $job], 201);
    }

    // Show a specific job that belongs to the authenticated employer
    public function showEmployerJob(Request $request, $id)
    {
        $job = Job::where('user_id', $request->user()->id)->findOrFail($id);
        return response()->json($job);
    }

    // Employer: Update a job
    public function update(Request $request, $id)
    {
        $job = Job::where('user_id', $request->user()->id)->findOrFail($id);

        $job->update($request->all());

        return response()->json(['message' => 'Job updated successfully', 'job' => $job]);
    }

    // Employer: Delete a job
    public function destroy(Request $request, $id)
    {
        $job = Job::where('user_id', $request->user()->id)->findOrFail($id);
        $job->delete();

        return response()->json(['message' => 'Job deleted']);
    }

    // Employer: List only published jobs with applicant count
    public function publishedJobsWithApplicants(Request $request)
    {
        return $request->user()->jobs()
            ->where('status', 'published')
            ->withCount('applications')
            ->latest()
            ->get();
    }
}
