<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'name',
        'ssm_number',
        'ssm_document_path',
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
    ];

    /**
     * The owner of the company.
     */
    public function owner()
    {
        return $this->belongsToMany(User::class, 'company_owners', 'company_id', 'user_id')->withTimestamps();
    }

    /**
     * The editors of the company.
     */
    public function editors()
    {
        return $this->belongsToMany(User::class, 'company_editors', 'company_id', 'user_id')->withTimestamps();
    }
}
