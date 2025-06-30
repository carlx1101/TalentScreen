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

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
