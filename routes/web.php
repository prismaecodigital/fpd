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
    Route::get('storage/{path}', function ($path) {
        // Handle the file retrieval logic here, using the $path variable.
        readfile($path);
    })->where('path', '.*');
});
