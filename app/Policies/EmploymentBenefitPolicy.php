<?php

namespace App\Policies;

use App\Models\EmploymentBenefit;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class EmploymentBenefitPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, EmploymentBenefit $employmentBenefit): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, EmploymentBenefit $employmentBenefit): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, EmploymentBenefit $employmentBenefit): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, EmploymentBenefit $employmentBenefit): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, EmploymentBenefit $employmentBenefit): bool
    {
        return false;
    }
}
