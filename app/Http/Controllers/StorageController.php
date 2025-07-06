<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StorageController extends Controller
{
    public function companyRegistrationDocuments(Request $request, string $path)
    {
        $company = Company::where('company_registration_document_path', $path)->firstOrFail();
        if (auth()->user()->companies()->where('company_id', $company->id)->exists() || auth()->user()->hasRole('admin')) {
            return Storage::disk('company_registration_documents')->response($path);
        }

        return response()->json([
            'message' => 'Unauthorized',
        ], 403);
    }
}
