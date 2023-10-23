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

    // Get account based on bu
    Route::get('buaccount', 'AccountApiController@buaccount');
    Route::get('deptaccount', 'AccountApiController@deptaccount');

    // Dept
    Route::resource('depts', 'DeptApiController');

    // Site
    Route::resource('sites', 'SiteApiController');

    // Accounts
    Route::get('listBu', 'AccountApiController@list')->name('listBu');
    Route::resource('accounts', 'AccountApiController');

    // All Fpd
    Route::get('listFpd','FpdApiController@list')->name('listFpd');
    Route::post('fpds/media', 'FpdApiController@storeMedia')->name('fpds.storeMedia');
    Route::get('calendar', 'FpdApiController@calendar')->name('fpds.calendar');
    Route::resource('fpds', 'FpdApiController');
    Route::resource('fpd-items','FpdItemApiController')->except(['create','edit']);
    Route::resource('status-histories','StatusHistoryApiController')->except(['create','edit']);

    // Fpd Process
    Route::get('listFpdProcess','FpdProcessApiController@list')->name('listFpdProcess');
    Route::post('fpd-processes/media', 'FpdProcessApiController@storeMedia')->name('fpd-processes.storeMedia');
    Route::resource('fpd-processes', 'FpdProcessApiController')->parameters(['fpd-processes' => 'fpd']);

    // Lrd
    Route::get('listLrd','LrdApiController@list')->name('listLrd');
    Route::post('lrds/media', 'LrdApiController@storeMedia')->name('lrds.storeMedia');
    Route::resource('lrds', 'LrdApiController')->parameters(['lrds' => 'fpd']);

    // Fpd Done
    Route::resource('fpd-dones', 'FpdDoneApiController')->parameters(['fpd-dones' => 'fpd'])->only(['index','show', 'delete']);

    // Change password
        Route::get('password/edit', 'ChangePasswordController@edit')->name('password.edit');
        Route::post('password', 'ChangePasswordController@update')->name('password.update');
        Route::post('profile', 'ChangePasswordController@updateProfile')->name('password.updateProfile');
        Route::post('profile/destroy', 'ChangePasswordController@destroy')->name('password.destroyProfile');

});

