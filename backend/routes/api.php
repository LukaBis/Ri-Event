<?php

use Illuminate\Http\Request;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\OrganizationController;
use Laravel\Fortify\Http\Controllers\PasswordController;
use Laravel\Fortify\Http\Controllers\ProfileInformationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {

    Route::get('/csrf-token', function (Request $request) {
        return response()->json(['csrfToken' => csrf_token()]);
    }); 

    Route::get('/user', [UserController::class, 'user']); 

    if (Features::enabled(Features::updateProfileInformation())) {
        Route::put('/user/profile-information', [ProfileInformationController::class, 'update']);
    }

    if (Features::enabled(Features::updatePasswords())) {
        Route::put('/user/password', [PasswordController::class, 'update']);
    }

    Route::resource('events', EventController::class);
    Route::get('myevents', [EventController::class, 'allUserEvents']);
    Route::resource('organizations', OrganizationController::class);
    Route::get('/profile-picture', [UserController::class, 'showPicture']);
    Route::put('/profile-picture', [UserController::class, 'uploadPicture']);
    Route::delete('/profile-picture', [UserController::class, 'deletePicture']);
    Route::post('/attending-event', [EventController::class, 'attendEvent']);
    Route::delete('/not-attending-event', [EventController::class, 'notAttendingEvent']);
});