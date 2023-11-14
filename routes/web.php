<?php

Route::redirect('/', '/login')->name('home');
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
Route::group(['prefix' => 'accurate', 'as' => 'accurate.', 'namespace' => 'Admin', 'middleware' => ['auth']], function () {
    Route::get('/get-token', 'AccurateController@getToken');
    Route::get('/callback', 'AccurateController@callback');
    Route::get('/gl-account/{bu_id}', 'AccurateController@glAccount');
    Route::get('/journal-voucher/{bu_id}', 'AccurateController@journalVoucher');
    Route::get('/detail-voucher/{bu_id}/{id}', 'AccurateController@detailJournal');
});

