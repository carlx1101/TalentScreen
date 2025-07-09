<?php

namespace App\Policies;

use App\Models\JobListing;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class JobListingPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view job listings');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, JobListing $jobListing): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create job listings');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, JobListing $jobListing): bool
    {
        return $user->hasPermissionTo('edit job listings') && in_array($jobListing->company_id, $user->companies->pluck('id')->toArray());
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, JobListing $jobListing): bool
    {
        return $user->hasPermissionTo('delete job listings') && in_array($jobListing->company_id, $user->companies->pluck('id')->toArray());
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, JobListing $jobListing): bool
    {
        return $user->hasPermissionTo('restore job listings') && in_array($jobListing->company_id, $user->companies->pluck('id')->toArray());
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, JobListing $jobListing): bool
    {
        return false;
    }
}
