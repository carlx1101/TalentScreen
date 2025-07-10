<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function jobSearch()
    {
        return Inertia::render('Applicant/JobSearch');
    }
}
    