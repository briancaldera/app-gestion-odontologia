<?php

use App\Http\Controllers\api\v1\NotificationsController;
use App\Http\Controllers\api\v1\ProfileController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'auth'])->prefix('/v1')->name('api.v1.')->group(function () {
    Route::get('/user', function (Request $request) {
        return new UserResource($request->user());
    })->name('user');

    Route::apiResource('profiles', ProfileController::class)->only(['show']);

    Route::get('/notifications', [NotificationsController::class, 'getNotifications'])->name('notifications.index');
    Route::patch('/notifications/{id}', [NotificationsController::class, 'markAsRead'])->name('notifications.markAsRead');
});
