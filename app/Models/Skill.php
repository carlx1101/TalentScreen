<?php

namespace App\Models;

use App\Models\JobListing;
use Illuminate\Database\Eloquent\Model;
use Overtrue\LaravelVersionable\Versionable;
use Illuminate\Database\Eloquent\SoftDeletes;

class Skill extends Model
{
    use SoftDeletes;
    use Versionable;

    protected $fillable = [
        'name',
    ];

    public function jobListings()
    {
        return $this->belongsToMany(JobListing::class);
    }
}
