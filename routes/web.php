<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\TwoFactorController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\JobListingController;
use App\Http\Controllers\JobListingConfigurationController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\BrowserSessionController;
use App\Http\Controllers\ProfileSettingsController;
use App\Http\Controllers\CompanyOwner\OnboardingController;
<<<<<<< HEAD
=======
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\PageController;
>>>>>>> frontend

/*
 * Public routes
 *
 * All roles, no authentication required
 *
 */

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// Job Search Page
Route::get('/job-search', [PageController::class, 'jobSearch'])->name('job-search');

// Google OAuth routes
Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('google.redirect');
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback'])->name('google.callback');

// Storage Routes, to return the files as json response for private folder
Route::get('/company-registration-documents/{path}', [StorageController::class, 'companyRegistrationDocuments'])->name('company-registration-documents.show');

<<<<<<< HEAD
=======

>>>>>>> frontend
/*
 * Utility routes
 *
 * Any roles as long as they have the permission:
 *
 */


/*
 * Dashboard and profile related routes
 *
 * Company owner, company editor, admin:
 * - Dashboard
 * - Profile
 */
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    'role:company owner|company editor|admin',
    'ensure_onboarded',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('settings/password', function () {
        return Inertia::render('Profile/Password');
    })->name('password.edit');
    Route::get('settings/appearance', function () {
        return Inertia::render('Profile/Appearance');
    })->name('appearance');
    Route::get('settings/browser-sessions', [ProfileSettingsController::class, 'showBrowserSessions'])->name('browser-sessions');

    // Two-factor authentication route - only if feature is enabled
    if (Features::optionEnabled(Features::twoFactorAuthentication(), 'confirm')) {
        Route::get('settings/two-factor', [ProfileSettingsController::class, 'showTwoFactor'])->name('two-factor');
    }
});

/*
 * Company owner and company editor related routes
 *
 * Company owner:
 * - Onboarding
 * - Company management
 *
 * Company editor:
 * - Company management
 */
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    'role:company owner',
    ])->group(function () {
    // Onboarding Route (without middleware ensure onboarded)
    Route::get('/onboarding', [OnboardingController::class, 'index'])->name('onboarding');
    Route::post('/onboarding', [OnboardingController::class, 'store'])->name('onboarding.store');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    'role:company owner|company editor',
    'ensure_onboarded',
])->group(function () {
    // Company management routes
    Route::get('/company/edit', [CompanyController::class, 'edit'])->name('company.edit');
    Route::put('/company/update', [CompanyController::class, 'update'])->name('company.update');
    Route::resource('/job-listings', JobListingController::class);
});

/*
 * Admin related routes
 *
 * Admin:
 * - Role and Permission Management
 */
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    'role:admin',
])->group(function () {
    // Role and Permission Management Routes (Admin only)
    Route::prefix('admin')->group(function () {
        Route::get('/roles-permissions', [RoleController::class, 'index'])->name('admin.roles-permissions');
        Route::put('/roles/{role}/permissions', [RoleController::class, 'updateRolePermissions'])->name('admin.roles.update-permissions');
        Route::post('/roles', [RoleController::class, 'createRole'])->name('admin.roles.create');
        Route::delete('/roles/{role}', [RoleController::class, 'deleteRole'])->name('admin.roles.delete');
        Route::post('/permissions', [RoleController::class, 'createPermission'])->name('admin.permissions.create');
        Route::delete('/permissions/{permission}', [RoleController::class, 'deletePermission'])->name('admin.permissions.delete');
        Route::get('/job-listing-configuration', [JobListingConfigurationController::class, 'index'])->name('admin.job-listing-configuration');

        // Skills CRUD routes
        Route::post('/skills', [JobListingConfigurationController::class, 'createSkill'])->name('admin.skills.create');
        Route::put('/skills/{skill}', [JobListingConfigurationController::class, 'updateSkill'])->name('admin.skills.update');
        Route::delete('/skills/{skill}', [JobListingConfigurationController::class, 'deleteSkill'])->name('admin.skills.delete');

        // Employment Benefits CRUD routes
        Route::post('/employment-benefits', [JobListingConfigurationController::class, 'createEmploymentBenefit'])->name('admin.employment-benefits.create');
        Route::put('/employment-benefits/{employmentBenefit}', [JobListingConfigurationController::class, 'updateEmploymentBenefit'])->name('admin.employment-benefits.update');
        Route::delete('/employment-benefits/{employmentBenefit}', [JobListingConfigurationController::class, 'deleteEmploymentBenefit'])->name('admin.employment-benefits.delete');
    });
});

/*
 * Jetstream routes
 *
 * Override the jetstream routes to include the ensure_onboarded middleware
 */
require __DIR__.'/jetstream.php';
