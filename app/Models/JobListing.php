<?php

namespace App\Models;

use App\Models\Skill;
use App\Models\Company;
use App\Models\EmploymentBenefit;
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

    protected $casts = [
        'mode' => 'array',
        'skills' => 'array',
        'languages' => 'array',
        'benefits' => 'array',
        'is_active' => 'boolean',
        'salary_min' => 'integer',
        'salary_max' => 'integer',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class);
    }

    public function employmentBenefits()
    {
        return $this->belongsToMany(EmploymentBenefit::class);
    }
}
