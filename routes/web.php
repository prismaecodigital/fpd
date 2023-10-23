<?php

Route::redirect('/', '/login');
Route::redirect('/dashboard', '/admin/dashboard');

Auth::routes(['register' => false]);

Route::group([
    'prefix'     => 'admin',
    'as'         => 'admin.',
    'namespace'  => 'Admin',
    'middleware' => ['auth'],
], function () {
    Route::view('/{any?}', 'layouts.admin.app')->name('dashboard')->where('any', '.*');
});
Auth::routes();

Route::middleware(['auth.storage'])->group(function () {
    Route::get('storage/private/{path}', function ($path) {
        $absolutePath = storage_path('app/private/' . $path);
    
        if (file_exists($absolutePath)) {
            $headers = [
                'Content-Type' => mime_content_type($absolutePath),
            ];
    
            return response()->file($absolutePath, $headers);
        } else {
            abort(404); // File not found
        }
    })->where('path', '.*');
});