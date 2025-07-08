<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        if ($user) {
            $viewPermissions = [];
            if ($user->can('manage all companies')) {
                array_push($viewPermissions, 'manage all companies');
            }
            if ($user->can('view company')) {
                array_push($viewPermissions, 'view company');
            }
            if ($user->can('manage all job listings')) {
                array_push($viewPermissions, 'manage all job listings');
            }
            if ($user->can('manage roles')) {
                array_push($viewPermissions, 'manage roles');
            }
        }

        return [
            ...parent::share($request),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'current_team_id' => $user->current_team_id,
                    'profile_photo_path' => $user->profile_photo_path,
                    'profile_photo_url' => $user->profile_photo_url,
                    'two_factor_enabled' => $user->two_factor_enabled,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                    'roles' => $user->getRoleNames()->toArray(),
                    'permissions' => $viewPermissions,
                ] : null,
            ],
        ];
    }
}
