<?php

namespace App\Models;

use App\Models\JobListing;
use Illuminate\Database\Eloquent\Model;
use Overtrue\LaravelVersionable\Versionable;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmploymentBenefit extends Model
{
    use SoftDeletes;
    use Versionable;

    protected $fillable = [
        'icon_path',
        'name',
    ];

    public function jobListings()
    {
        return $this->belongsToMany(JobListing::class);
    }
}
