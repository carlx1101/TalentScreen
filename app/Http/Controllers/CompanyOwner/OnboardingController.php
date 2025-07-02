<?php

namespace App\Http\Controllers\CompanyOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Models\Company;
use App\Models\User;
use App\Models\CompanyOwner;
use App\Models\CompanyEditor;

class OnboardingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            // Required fields (NOT NULL in migration)
            'company_name' => 'required|string|max:255', // name
            'ssm_number' => 'required|string|max:255',
            'ssm_document' => 'required|file|mimes:pdf|max:5120',
            'industry' => 'required|string|max:255',
            // Optional fields (nullable in migration)
            'company_size' => 'nullable|string|max:255',
            'company_type' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'logo' => 'nullable|file|image|max:3072', // logo_path
            'banner' => 'nullable|file|image|max:5120', // banner_path
            'website' => 'nullable|url|max:255',
            'social_media' => 'nullable|url|max:255',
            // Step 5
            'team_members' => 'nullable|array',
            'team_members.*' => 'nullable|email',
        ]);

        $user = $request->user();

        DB::transaction(function () use ($request, $validated, $user) {
            // Handle file uploads
            $ssmDocumentPath = $request->file('ssm_document')->store('ssm_documents', 'public');
            $logoPath = $request->hasFile('logo') ? $request->file('logo')->store('company_logos', 'public') : null;
            $bannerPath = $request->hasFile('banner') ? $request->file('banner')->store('company_banners', 'public') : null;

            // Create the company
            $company = Company::create([
                'owner_id' => $user->id,
                'name' => $validated['company_name'],
                'ssm_number' => $validated['ssm_number'],
                'ssm_document_path' => $ssmDocumentPath,
                'industry' => $validated['industry'],
                'company_size' => $validated['company_size'] ?? null,
                'company_type' => $validated['company_type'] ?? null,
                'address' => $validated['address'] ?? null,
                'logo_path' => $logoPath,
                'banner_path' => $bannerPath,
                'website' => $validated['website'] ?? null,
                // Social links: parse from social_media (e.g. LinkedIn, Facebook, etc.)
                'facebook' => str_contains($validated['social_media'] ?? '', 'facebook.com') ? $validated['social_media'] : null,
                'twitter' => str_contains($validated['social_media'] ?? '', 'twitter.com') ? $validated['social_media'] : null,
                'instagram' => str_contains($validated['social_media'] ?? '', 'instagram.com') ? $validated['social_media'] : null,
                'youtube' => str_contains($validated['social_media'] ?? '', 'youtube.com') ? $validated['social_media'] : null,
            ]);

            // Attach owner to company_owners pivot
            CompanyOwner::create([
                'company_id' => $company->id,
                'user_id' => $user->id,
                'assigned_at' => now(),
            ]);

            // Invite team members as editors
            $emails = $validated['team_members'] ?? [];
            foreach ($emails as $email) {
                if (!$email) continue;
                $editor = User::firstOrCreate(['email' => $email], [
                    'name' => '', // You may want to send an invite to set name
                    'password' => '', // Set a random password or send invite
                ]);
                // Don't add if already owner or editor
                $isOwner = CompanyOwner::where('company_id', $company->id)->where('user_id', $editor->id)->exists();
                $isEditor = CompanyEditor::where('company_id', $company->id)->where('user_id', $editor->id)->exists();
                if (!$isOwner && !$isEditor) {
                    CompanyEditor::create([
                        'company_id' => $company->id,
                        'user_id' => $editor->id,
                        'assigned_at' => now(),
                    ]);
                }
            }
        });

        return redirect()->route('dashboard');
    }
}
