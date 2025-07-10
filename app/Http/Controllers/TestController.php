<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class TestController extends Controller
{
    public function test()
    {
        // $user = User::create([
        //     'name' => 'Test User',
        //     'email' => 'ff2@example.com',
        //     'password' => Hash::make('password'),
        // ]);
        // dd($user->getAllPermissions()->pluck('name')->toArray());
        // // dd(auth()->user()->roles->first()->permissions->pluck('name'));
        // dd('test');
        return Inertia::render('Test');
    }
}
