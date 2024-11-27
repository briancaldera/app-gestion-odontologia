<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'auth'])->prefix('/v1')->name('api.v1.')->group(function () {
    Route::get('/actualuser', function (Request $request) {
        return $request->user();
    })->name('user');
});
