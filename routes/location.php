<?php

use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;

Route::get('provinces', [LocationController::class, 'provinces'])->name('provinces');
Route::get('cities', [LocationController::class, 'cities'])->name('cities');
Route::get('districts', [LocationController::class, 'districts'])->name('districts');
Route::get('villages', [LocationController::class, 'villages'])->name('villages');
