<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        if ($user->company) {
            return redirect()->route('dashboard');
        }
        return Inertia::render('Onboarding/Company');
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if ($user->company) {
            return redirect()->route('dashboard');
        }
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'ssm_number' => 'required|string|max:255',
            'ssm_document' => 'required|file|mimes:pdf|max:5120',
            'industry' => 'required|string|max:255',
            'company_size' => 'required|string|max:255',
            'company_type' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072|dimensions:width=500,height=500',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'website' => 'nullable|url|max:255',
            'facebook' => 'nullable|url|max:255',
            'twitter' => 'nullable|url|max:255',
            'instagram' => 'nullable|url|max:255',
            'youtube' => 'nullable|url|max:255',
        ]);

        // Handle file uploads
        $ssmDocumentPath = $request->file('ssm_document')->store('ssm_documents', 'public');
        $logoPath = $request->file('logo') ? $request->file('logo')->store('company_logos', 'public') : null;
        $bannerPath = $request->file('banner') ? $request->file('banner')->store('company_banners', 'public') : null;

        $company = Company::create([
            'owner_id' => $user->id,
            'name' => $validated['name'],
            'ssm_number' => $validated['ssm_number'],
            'ssm_document_path' => $ssmDocumentPath,
            'industry' => $validated['industry'],
            'company_size' => $validated['company_size'],
            'company_type' => $validated['company_type'],
            'address' => $validated['address'] ?? null,
            'logo_path' => $logoPath,
            'banner_path' => $bannerPath,
            'website' => $validated['website'] ?? null,
            'facebook' => $validated['facebook'] ?? null,
            'twitter' => $validated['twitter'] ?? null,
            'instagram' => $validated['instagram'] ?? null,
            'youtube' => $validated['youtube'] ?? null,
        ]);

        return redirect()->route('dashboard');
    }
}
