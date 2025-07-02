<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyEditor extends Model
{
    protected $table = 'company_editors';
    protected $fillable = ['company_id', 'user_id', 'assigned_at'];
    public $timestamps = true;
}
