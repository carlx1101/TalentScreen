<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\JobListing;
use App\Models\Skill;
use App\Models\EmploymentBenefit;

class JobListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', JobListing::class);

        $user = auth()->user();
        $company = $user->companies()->first();

        $jobListings = $company ? $company->jobListings()
            ->select('id', 'title', 'skills', 'benefits', 'languages', 'employment_type', 'mode', 'salary_currency', 'salary_min', 'salary_max', 'is_active')
            ->orderBy('created_at', 'desc')
            ->get() : collect();

            // dd($jobListings[0]);
        return Inertia::render('JobListing/Index', [
            'jobListings' => $jobListings,
            'company' => $company,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', JobListing::class);

        $skills = Skill::all()->map(function ($skill) {
            return [
                'label' => $skill->name,
                'value' => $skill->name,
            ];
        });

        $employmentBenefits = EmploymentBenefit::all()->map(function ($benefit) {
            return [
                'label' => $benefit->name,
                'value' => $benefit->name,
            ];
        });

        return Inertia::render('JobListing/Create', [
            'skills' => $skills,
            'employmentBenefits' => $employmentBenefits,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', JobListing::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'employment_type' => 'required|in:full time,part time,contract,internship,freelance',
            'mode' => 'required|array|min:1',
            'mode.*' => 'in:physical,remote,hybrid,flexible',
            'skills' => 'required|array|min:1',
            'skills.*' => 'exists:skills,name',
            'languages' => 'required|array|min:1',
            'languages.*' => 'string|max:10',
            'location' => 'required|string|max:255',
            'salary_currency' => 'nullable|string|max:3',
            'salary_min' => 'nullable|integer|min:0',
            'salary_max' => 'nullable|integer|min:0|gte:salary_min',
            'benefits' => 'nullable|array',
            'benefits.*' => 'exists:employment_benefits,name',
            'is_active' => 'boolean',
        ]);

        // Validate salary logic
        if (!empty($validated['salary_currency']) && (empty($validated['salary_min']) || empty($validated['salary_max']))) {
            return back()->withErrors(['salary_currency' => 'Salary currency requires both minimum and maximum salary values.']);
        }

        if ((!empty($validated['salary_min']) || !empty($validated['salary_max'])) && empty($validated['salary_currency'])) {
            return back()->withErrors(['salary_currency' => 'Salary values require a currency to be selected.']);
        }

        $user = auth()->user();
        $company = $user->companies()->first();

        if (!$company) {
            return back()->withErrors(['company' => 'No company found for this user.']);
        }

        $jobListing = $company->jobListings()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'employment_type' => $validated['employment_type'],
            'mode' => $validated['mode'],
            'skills' => $validated['skills'],
            'languages' => $validated['languages'],
            'location' => $validated['location'],
            'salary_currency' => $validated['salary_currency'],
            'salary_min' => $validated['salary_min'] ? (int) $validated['salary_min'] : null,
            'salary_max' => $validated['salary_max'] ? (int) $validated['salary_max'] : null,
            'benefits' => $validated['benefits'] ?? [],
            'is_active' => $validated['is_active'] ?? true,
        ]);


        return redirect()->route('job-listings.index')->with('success', 'Job listing created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
