<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TestController;
use App\Http\Controllers\TwoFactorController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\BrowserSessionController;
use App\Http\Controllers\ProfileSettingsController;
use App\Http\Controllers\CompanyOwner\OnboardingController;
use App\Http\Controllers\CompanyController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// Google OAuth routes
Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('google.redirect');
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback'])->name('google.callback');

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

    // Company management routes
    Route::get('/company/edit', [CompanyController::class, 'edit'])->name('company.edit');
    Route::put('/company/update', [CompanyController::class, 'update'])->name('company.update');

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

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->prefix('company-owner')->group(function () {
    // Onboarding Route
    Route::get('/onboarding', function () {
        // Return onboarding view or controller
        return Inertia::render('CompanyOwner/Onboarding');
    })->name('onboarding');
    Route::post('/onboarding', [OnboardingController::class, 'store'])->name('onboarding.store');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    // Role and Permission Management Routes (Admin only)
    Route::prefix('admin')->middleware('permission:manage roles')->group(function () {
        Route::get('/roles-permissions', [RoleController::class, 'index'])->name('admin.roles-permissions');
        Route::put('/roles/{role}/permissions', [RoleController::class, 'updateRolePermissions'])->name('admin.roles.update-permissions');
        Route::post('/roles', [RoleController::class, 'createRole'])->name('admin.roles.create');
        Route::delete('/roles/{role}', [RoleController::class, 'deleteRole'])->name('admin.roles.delete');
        Route::post('/permissions', [RoleController::class, 'createPermission'])->name('admin.permissions.create');
        Route::delete('/permissions/{permission}', [RoleController::class, 'deletePermission'])->name('admin.permissions.delete');
    });

    Route::get('/test', [TestController::class, 'test']);
});
