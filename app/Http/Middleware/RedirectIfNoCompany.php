<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfNoCompany
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        if ($user && !$user->company && !$request->is('onboarding/company')) {
            return redirect()->route('onboarding.company');
        }
        return $next($request);
    }
}
