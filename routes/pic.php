<?php

use App\Http\Controllers\PICCompanyController;
use App\Http\Controllers\ResumeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'checkRole:Client'])->prefix('pic')->group(function () {
	Route::get('/company/create', [PICCompanyController::class, 'createCompany'])->name('client.create.company');
	Route::post('/company/create', [PICCompanyController::class, 'storeCompany'])->name('client.store.company');
	Route::get('/company/{company}/edit', [PICCompanyController::class, 'editCompany'])->name('client.edit.company');
	Route::post('/company/{company}', [PICCompanyController::class, 'updateCompany'])->name('client.update.company');

	Route::get('/resume/{resume}/detail', [ResumeController::class, 'show'])->name('client.detail.resume');
	
    Route::get('/job', [PICCompanyController::class, 'indexJob'])->name('client.job');
    Route::get('/job/create', [PICCompanyController::class, 'createJob'])->name('client.create.job');
	Route::patch('/job/create', [PICCompanyController::class, 'storeJob'])->name('client.store.job');
	Route::get('/job/{job}/edit', [PICCompanyController::class, 'editJob'])->name('client.edit.job');
	Route::patch('/job/{job}', [PICCompanyController::class, 'updateJob'])->name('client.update.job');
});