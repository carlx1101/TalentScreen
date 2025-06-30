<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TwoFactorController;
use App\Http\Controllers\BrowserSessionController;
use App\Http\Controllers\ProfileSettingsController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\OnboardingController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/manual-logout', function () {
    Auth::logout();
    return redirect()->route('home');
});

// Google OAuth routes
Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('google.redirect');
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback'])->name('google.callback');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
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

    // Role and Permission Management Routes (Admin only)
    Route::prefix('admin')->group(function () {
        Route::get('/roles-permissions', [RoleController::class, 'index'])->name('admin.roles-permissions');
        Route::put('/roles/{role}/permissions', [RoleController::class, 'updateRolePermissions'])->name('admin.roles.update-permissions');
        Route::post('/roles', [RoleController::class, 'createRole'])->name('admin.roles.create');
        Route::delete('/roles/{role}', [RoleController::class, 'deleteRole'])->name('admin.roles.delete');
        Route::post('/permissions', [RoleController::class, 'createPermission'])->name('admin.permissions.create');
        Route::delete('/permissions/{permission}', [RoleController::class, 'deletePermission'])->name('admin.permissions.delete');
    });

    Route::get('/onboarding/company', [OnboardingController::class, 'show'])->name('onboarding.company');
    Route::post('/onboarding/company', [OnboardingController::class, 'store']);
});
