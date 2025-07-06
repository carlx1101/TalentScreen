<?php

namespace App\Http\Controllers\CompanyOwner;

use App\Models\User;
use App\Models\Company;
use App\Models\CompanyUser;
use Illuminate\Support\Str;
use App\Models\CompanyOwner;
use Illuminate\Http\Request;
use App\Models\CompanyEditor;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class OnboardingController extends Controller
{
    private function generateInviteToken()
    {
        $token = Str::random(32);
        while (Company::where('invite_token', $token)->exists()) {
            $token = Str::random(32);
        }
        return $token;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            // Required fields (NOT NULL in migration)
            'company_name' => 'required|string|max:255', // name
            'company_registration_number' => 'required|string|max:255',
            'company_registration_document' => 'required|file|mimes:pdf|max:5120',
            'industry' => 'required|string|max:255',
            // Optional fields (nullable in migration)
            'company_size' => 'required|string|max:255',
            'company_type' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'logo' => 'required|file|image|max:3072', // logo_path
            'banner' => 'nullable|file|image|max:5120', // banner_path
            'website' => 'nullable|url|max:255',
            'facebook' => 'nullable|url|max:255',
            'twitter' => 'nullable|url|max:255',
            'instagram' => 'nullable|url|max:255',
            'youtube' => 'nullable|url|max:255',
            'linkedin' => 'nullable|url|max:255',
            // Step 5
            'team_members' => 'nullable|array',
            'team_members.*' => 'nullable|email',
        ]);

        $user = $request->user();

        DB::transaction(function () use ($request, $validated, $user) {
            // Handle file uploads
            $companyRegistrationDocumentPath = Storage::disk('company_registration_documents')->putFile($request->file('company_registration_document'));
            $logoPath = $request->hasFile('logo') ? Storage::disk('public')->putFile('company-logos', $request->file('logo')) : null;
            $bannerPath = $request->hasFile('banner') ? Storage::disk('public')->putFile('company-banners', $request->file('banner')) : null;

            // Create the company
            $company = Company::create([
                'name' => $validated['company_name'],
                'company_registration_number' => $validated['company_registration_number'],
                'company_registration_document_path' => $companyRegistrationDocumentPath,
                'industry' => $validated['industry'],
                'company_size' => $validated['company_size'] ?? null,
                'company_type' => $validated['company_type'] ?? null,
                'address' => $validated['address'] ?? null,
                'logo_path' => $logoPath,
                'banner_path' => $bannerPath,
                'website' => $validated['website'] ?? null,
                'facebook' => $validated['facebook'] ?? null,
                'twitter' => $validated['twitter'] ?? null,
                'instagram' => $validated['instagram'] ?? null,
                'youtube' => $validated['youtube'] ?? null,
                'linkedin' => $validated['linkedin'] ?? null,
                'invite_token' => $this->generateInviteToken(),
            ]);

            // Attach owner to company_owners pivot
            CompanyUser::create([
                'company_id' => $company->id,
                'user_id' => $user->id,
                'role' => 'owner',
            ]);

            // Invite team members as editors
            $emails = $validated['team_members'] ?? [];
            foreach ($emails as $email) {
                if (!$email) continue;
                // $editor = User::firstOrCreate(['email' => $email], [
                //     'name' => '', // You may want to send an invite to set name
                //     'password' => '', // Set a random password or send invite
                // ]);
                // Don't add if already owner or editor
                $alreadyExists = CompanyUser::where('user_id', $editor->id)->exists();
                if (!$alreadyExists) {
                    CompanyUser::create([
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
