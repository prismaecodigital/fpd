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
    Route::get('update-user-survey', 'UsersApiController@updateUserSurvey');
    Route::get('auth-bu', 'UsersApiController@home');
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
    Route::get('account/getBalance', 'AccountApiController@getBalance')->name('account.getBalance');
    Route::get('account/getMaxAmount', 'AccountApiController@getMaxAmount')->name('account.getMaxAmount');
    Route::get('account/getMaxAmountLrd', 'AccountApiController@getMaxAmountLrd')->name('account.getMaxAmountLrd');

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
    Route::post('import-journal', 'FpdDoneApiController@importData')->name('importJournal');
    Route::get('listFpdDone','FpdDoneApiController@list')->name('listFpdDone');
    Route::resource('fpd-dones', 'FpdDoneApiController')->parameters(['fpd-dones' => 'fpd'])->only(['index','show', 'destroy']);

    // Change password
        Route::get('password/edit', 'ChangePasswordController@edit')->name('password.edit');
        Route::post('password', 'ChangePasswordController@update')->name('password.update');
        Route::post('profile', 'ChangePasswordController@updateProfile')->name('password.updateProfile');
        Route::post('profile/destroy', 'ChangePasswordController@destroy')->name('password.destroyProfile');

    // Accurate
    Route::get('accurate-token', 'IntegrationApiController@getAccurateToken')->name('accurate.token');
    Route::get('save-journal','IntegrationApiController@saveJournalVoucher')->name('accurate.saveJournal');
    Route::resource('integrations', 'IntegrationApiController'); 

    // Partner
    Route::resource('partners', 'PartnerApiController');

    // Cash In
    Route::resource('cash-ins', 'CashInApiController');

    // Cash In Projections
    Route::resource('cash-in-projections', 'CashInProjectionApiController');

    // Cash Out Projections
    Route::resource('cash-out-projections', 'CashOutProjectionApiController');

    // Additional
    Route::resource('additional-limits', 'AdditionalLimitApiController');

    // Adjustment
    Route::resource('adjustments-period', 'AdjustmentApiController')->parameters(['adjustments-period' => 'adjustment']);
    Route::resource('adjustments-coa', 'AdjustmentApiController')->parameters(['adjustments-coa' => 'adjustment']);

    // Dashboard
    Route::get('dashboard', 'DashboardApiController@index')->name('dashboard');

    // Dompet
    Route::resource('dompet', 'DompetApiController');

    // Weekly Cashflow
    Route::get('cashflow', 'CashflowApiController@index')->name('cashflow');
    Route::get('weekly-cashflow', 'CashflowApiController@weeklyCashflow')->name('weekly-cashflow');

    

});

