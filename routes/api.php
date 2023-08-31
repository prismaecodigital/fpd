<?php

Route::group(['prefix' => 'v1', 'as' => 'api.', 'namespace' => 'Api\V1\Admin', 'middleware' => ['auth:sanctum']], function () {
    // Abilities
    Route::apiResource('abilities', 'AbilitiesController', ['only' => ['index']]);

    // Locales
    Route::get('locales/languages', 'LocalesController@languages')->name('locales.languages');
    Route::get('locales/messages', 'LocalesController@messages')->name('locales.messages');

    // Permissions
    Route::resource('permissions', 'PermissionsApiController');

    // Roles
    Route::resource('roles', 'RolesApiController');

    // Users
    Route::resource('users', 'UsersApiController');

    // Bu
    Route::resource('bus', 'BuApiController');

    // Get dept based on bu
    Route::get('budept','DeptApiController@budept');
    Route::get('budept-all','DeptApiController@budeptAll');

    // Get site based on bu
    Route::get('busite', 'SiteApiController@busite');;

    // Dept
    Route::resource('depts', 'DeptApiController');

    // Site
    Route::resource('sites', 'SiteApiController');

    // Accounts
    Route::get('listBu', 'AccountApiController@list')->name('listBu');
    Route::resource('accounts', 'AccountApiController');

    // Fpd
    Route::resource('fpds', 'FpdApiController');
    Route::resource('fpd-items','FpdItemApiController')->except(['create','edit']);
    Route::resource('status-histories','StatusHistoryApiController')->except(['create','edit']);

    // Change password
        Route::get('password/edit', 'ChangePasswordController@edit')->name('password.edit');
        Route::post('password', 'ChangePasswordController@update')->name('password.update');
        Route::post('profile', 'ChangePasswordController@updateProfile')->name('password.updateProfile');
        Route::post('profile/destroy', 'ChangePasswordController@destroy')->name('password.destroyProfile');

});

