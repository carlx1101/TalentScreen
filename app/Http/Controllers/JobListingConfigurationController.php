<?php

namespace App\Http\Controllers;

use App\Models\EmploymentBenefit;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JobListingConfigurationController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Skill::class);
        $this->authorize('viewAny', EmploymentBenefit::class);

        $skills = Skill::all()->map(function ($skill) {
            return [
                'id' => $skill->id,
                'name' => $skill->name,
                'can' => [
                    'update_skill' => auth()->user()->can('update', $skill),
                    'delete_skill' => auth()->user()->can('delete', $skill),
                ],
            ];
        });

        $employmentBenefits = EmploymentBenefit::all()->map(function ($benefit) {
            return [
                'id' => $benefit->id,
                'name' => $benefit->name,
                'icon_path' => $benefit->icon_path ? Storage::url($benefit->icon_path) : null,
                'can' => [
                    'update_employment_benefit' => auth()->user()->can('update', $benefit),
                    'delete_employment_benefit' => auth()->user()->can('delete', $benefit),
                ],
            ];
        });

        return Inertia::render('Admin/JobListingConfiguration', [
            'skills' => $skills,
            'employmentBenefits' => $employmentBenefits,
            'can' => [
                'create_skill' => auth()->user()->can('create', Skill::class),
                'create_employment_benefit' => auth()->user()->can('create', EmploymentBenefit::class),
            ],
        ]);
    }

    // Skills CRUD
    public function createSkill(Request $request)
    {
        $this->authorize('create', Skill::class);

        $request->validate([
            'name' => 'required|string|max:255|unique:skills,name',
        ]);

        $skill = Skill::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'skill' => [
                'id' => $skill->id,
                'name' => $skill->name,
                'can' => [
                    'update_skill' => auth()->user()->can('update', $skill),
                    'delete_skill' => auth()->user()->can('delete', $skill),
                ],
            ],
        ]);
    }

    public function updateSkill(Request $request, Skill $skill)
    {
        $this->authorize('update', $skill);

        $request->validate([
            'name' => 'required|string|max:255|unique:skills,name,' . $skill->id,
        ]);

        $skill->update([
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'Skill updated successfully']);
    }

    public function deleteSkill(Skill $skill)
    {
        $this->authorize('delete', $skill);

        $skill->delete();

        return response()->json(['message' => 'Skill deleted successfully']);
    }

    // Employment Benefits CRUD
    public function createEmploymentBenefit(Request $request)
    {
        $this->authorize('create', EmploymentBenefit::class);

        $request->validate([
            'name' => 'required|string|max:255|unique:employment_benefits,name',
            'icon' => 'required|file|mimes:svg|max:1024', // 1MB max
        ]);

        $iconPath = $request->file('icon')->store('employment-benefits', 'public');

        $employmentBenefit = EmploymentBenefit::create([
            'name' => $request->name,
            'icon_path' => $iconPath,
        ]);

        return response()->json([
            'employment_benefit' => [
                'id' => $employmentBenefit->id,
                'name' => $employmentBenefit->name,
                'icon_path' => Storage::url($employmentBenefit->icon_path),
                'can' => [
                    'update_employment_benefit' => auth()->user()->can('update', $employmentBenefit),
                    'delete_employment_benefit' => auth()->user()->can('delete', $employmentBenefit),
                ],
            ],
        ]);
    }

    public function updateEmploymentBenefit(Request $request, EmploymentBenefit $employmentBenefit)
    {
        $this->authorize('update', $employmentBenefit);

        $request->validate([
            'name' => 'required|string|max:255|unique:employment_benefits,name,' . $employmentBenefit->id,
            'icon' => 'nullable|file|mimes:svg|max:1024', // 1MB max
        ]);

        $data = ['name' => $request->name];

        if ($request->hasFile('icon')) {
            // Delete old icon
            if ($employmentBenefit->icon_path) {
                Storage::disk('public')->delete($employmentBenefit->icon_path);
            }

            // Store new icon
            $data['icon_path'] = $request->file('icon')->store('employment-benefits', 'public');
        }

        $employmentBenefit->update($data);

        return response()->json(['message' => 'Employment benefit updated successfully']);
    }

    public function deleteEmploymentBenefit(EmploymentBenefit $employmentBenefit)
    {
        $this->authorize('delete', $employmentBenefit);

        // Delete icon file
        if ($employmentBenefit->icon_path) {
            Storage::disk('public')->delete($employmentBenefit->icon_path);
        }

        $employmentBenefit->delete();

        return response()->json(['message' => 'Employment benefit deleted successfully']);
    }
}
