<?php

namespace App\Models;

use App\Models\Company;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Overtrue\LaravelVersionable\Versionable;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobListing extends Model
{
    use SoftDeletes;
    use Versionable;

    protected $fillable = [
        'title',
        'description',
        'employment_type',
        'mode',
        'skills',
        'languages',
        'location',
        'salary_currency',
        'salary_min',
        'salary_max',
        'benefits',
        'is_active',
        'company_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'salary_min' => 'integer',
            'salary_max' => 'integer',
            'mode' => 'array',
            'skills' => 'array',
            'languages' => 'array',
            'benefits' => 'array',
        ];
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
