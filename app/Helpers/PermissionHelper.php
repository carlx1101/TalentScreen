<?php

namespace App\Helpers;

use App\Models\User;

class PermissionHelper
{
    /**
     * Check if user has admin role
     */
    public static function isAdmin(User $user): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Check if user has company owner role
     */
    public static function isCompanyOwner(User $user): bool
    {
        return $user->hasRole('company owner');
    }

    /**
     * Check if user has company editor role
     */
    public static function isCompanyEditor(User $user): bool
    {
        return $user->hasRole('company editor');
    }

    /**
     * Get user's roles as array
     */
    public static function getUserRoles(User $user): array
    {
        return $user->getRoleNames()->toArray();
    }

    /**
     * Get user's permissions as array
     */
    public static function getUserPermissions(User $user): array
    {
        return $user->getAllPermissions()->pluck('name')->toArray();
    }
}
