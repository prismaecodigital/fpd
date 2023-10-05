<?php
// app/Http/Middleware/AuthenticateStorage.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticateStorage
{
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is authenticated
        if (Auth::check()) {
            return $next($request);
        }

        // Redirect to login page or return a response as needed
        return redirect('/login');
    }
}
