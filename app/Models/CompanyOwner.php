<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyOwner extends Model
{
    protected $table = 'company_owners';
    protected $fillable = ['company_id', 'user_id', 'assigned_at'];
    public $timestamps = true;
}
