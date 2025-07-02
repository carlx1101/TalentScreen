<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Show the form for editing the specified company.
     */
    public function edit(Request $request)
    {
        $user = $request->user();
        $company = $user->ownedCompanies()->first();

        if (!$company) {
            return redirect()->route('dashboard')->with('error', 'No company found.');
        }

        $this->authorize('update', $company);

        return Inertia::render('Company/Edit', [
            'company' => $company,
        ]);
    }

    /**
     * Update the specified company in storage.
     */
    public function update(Request $request)
    {
        $user = $request->user();
        $company = $user->ownedCompanies()->first();

        if (!$company) {
            return redirect()->route('dashboard')->with('error', 'No company found.');
        }

        $this->authorize('update', $company);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'ssm_number' => 'required|string|max:255',
            'industry' => 'required|string|max:255',
            'company_size' => 'nullable|string|max:255',
            'company_type' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'facebook' => 'nullable|url|max:255',
            'twitter' => 'nullable|url|max:255',
            'instagram' => 'nullable|url|max:255',
            'youtube' => 'nullable|url|max:255',
            'ssm_document' => 'nullable|file|mimes:pdf|max:5120',
            'logo' => 'nullable|file|image|max:3072',
            'banner' => 'nullable|file|image|max:5120',
        ]);

        // Handle file uploads
        if ($request->hasFile('ssm_document')) {
            // Delete old file if exists
            if ($company->ssm_document_path) {
                Storage::disk('public')->delete($company->ssm_document_path);
            }
            $validated['ssm_document_path'] = $request->file('ssm_document')->store('ssm_documents', 'public');
        }

        if ($request->hasFile('logo')) {
            // Delete old file if exists
            if ($company->logo_path) {
                Storage::disk('public')->delete($company->logo_path);
            }
            $validated['logo_path'] = $request->file('logo')->store('company_logos', 'public');
        }

        if ($request->hasFile('banner')) {
            // Delete old file if exists
            if ($company->banner_path) {
                Storage::disk('public')->delete($company->banner_path);
            }
            $validated['banner_path'] = $request->file('banner')->store('company_banners', 'public');
        }

        // Remove file fields from validated data as they're handled separately
        unset($validated['ssm_document'], $validated['logo'], $validated['banner']);

        $company->update($validated);

        return redirect()->route('company.edit')->with('success', 'Company information updated successfully.');
    }
}
