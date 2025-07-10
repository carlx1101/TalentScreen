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
        $company = $user->companies()->firstOrFail();

        $this->authorize('update', $company);

        return Inertia::render('Company/Edit', [
            'company' => $company,
            'can' => [
                'edit' => $user->can('edit company'),
            ],
        ]);
    }

    /**
     * Update the specified company in storage.
     */
    public function update(Request $request)
    {
        $user = $request->user();
        $company = $user->companies()->first();

        if (!$company) {
            return redirect()->route('dashboard')->with('error', 'No company found.');
        }

        $this->authorize('update', $company);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company_registration_number' => 'required|string|max:255',
            'industry' => 'required|string|max:255',
            'company_size' => 'required|string|max:255',
            'company_type' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'website' => 'nullable|url|max:255',
            'facebook' => 'nullable|url|max:255',
            'twitter' => 'nullable|url|max:255',
            'instagram' => 'nullable|url|max:255',
            'youtube' => 'nullable|url|max:255',
            'linkedin' => 'nullable|url|max:255',
            'company_registration_document' => 'sometimes|file|mimes:pdf|max:5120',
            'logo' => 'sometimes|file|image|max:3072',
            'banner' => 'nullable|file|image|max:5120',
            'removed_company_registration_document' => 'required|boolean',
            'removed_logo' => 'required|boolean',
            'removed_banner' => 'required|boolean',
        ]);

        // Handle file uploads
        if ($request->hasFile('company_registration_document')) {
            // Delete old file if exists
            if (isset($company->company_registration_document_path) && $validated['removed_company_registration_document']) {
                Storage::disk('company_registration_documents')->delete($company->company_registration_document_path);
            }
            $validated['company_registration_document_path'] = Storage::disk('company_registration_documents')->putFile($request->file('company_registration_document'));
        }

        if ($request->hasFile('logo')) {
            // Delete old file if exists
            if (isset($company->logo_path) && $validated['removed_logo']) {
                Storage::disk('public')->delete($company->logo_path);
            }
            $validated['logo_path'] = Storage::disk('public')->putFile('company-logos', $request->file('logo'));
        }

        if ($request->hasFile('banner')) {
            // Delete old file if exists
            if (isset($company->banner_path) && $validated['removed_banner']) {
                Storage::disk('public')->delete($company->banner_path);
            }
            $validated['banner_path'] = Storage::disk('public')->putFile('company-banners', $request->file('banner'));
        } else if (isset($company->banner_path)) {
            Storage::disk('public')->delete($company->banner_path);
            $validated['banner_path'] = null;
        }

        // Remove file fields from validated data as they're handled separately
        unset($validated['company_registration_document'], $validated['logo'], $validated['banner'], $validated['removed_company_registration_document'], $validated['removed_logo'], $validated['removed_banner']);

        $company->update($validated);

        return redirect()->route('company.edit')->with('success', 'Company information updated successfully.');
    }
}
