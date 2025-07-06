<?php

namespace App\Models;

use App\Models\CompanyUser;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;

class Company extends Model
{
    use HasFactory;

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
}
