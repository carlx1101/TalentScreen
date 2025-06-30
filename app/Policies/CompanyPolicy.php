<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Company;
use Illuminate\Auth\Access\HandlesAuthorization;

class CompanyPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'company owner', 'company editor']);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Company $company): bool
    {
        return $user->hasRole('admin') ||
               $user->hasRole('company owner') ||
               $user->hasRole('company editor');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('company owner');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Company $company): bool
    {
        return $user->hasRole('admin') ||
               $user->hasRole('company owner') ||
               $user->hasRole('company editor');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Company $company): bool
    {
        return $user->hasRole('admin') || $user->hasRole('company owner');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Company $company): bool
    {
        return $user->hasRole('admin') || $user->hasRole('company owner');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Company $company): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can invite company editors.
     */
    public function inviteEditor(User $user, Company $company): bool
    {
        return $user->hasRole('admin') || $user->hasRole('company owner');
    }
}
