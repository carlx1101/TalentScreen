<?php

namespace App\Models;

use App\Models\User;
use App\Models\JobListing;
use App\Models\CompanyUser;
use Illuminate\Database\Eloquent\Model;
use Overtrue\LaravelVersionable\Versionable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Company extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'company_registration_number',
        'company_registration_document_path',
        'industry',
        'company_size',
        'company_type',
        'address',
        'logo_path',
        'banner_path',
        'website',
        'facebook',
        'twitter',
        'instagram',
        'youtube',
        'linkedin',
        'invite_token',
    ];

    /**
     * The owner of the company.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'company_user', 'company_id', 'user_id')->using(CompanyUser::class)->withPivot('role')->withTimestamps();
    }

    public function jobListings()
    {
        return $this->hasMany(JobListing::class);
    }
}
