<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\FreelanceController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\PicController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\UniversityController;
use App\Http\Controllers\UsersController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'checkRole:Admin,Client'])->group(function() {
	Route::get('/{job}/jobs/restore', [JobController::class, 'restore'])->name('job.restore');
	Route::get('/{job}/jobs', [JobController::class, 'forceDestroy'])->name('job.force.destroy');
	Route::delete('/{job}/jobs', [JobController::class, 'destroy'])->name('job.destroy');

	Route::get('/history/{resume}/detail', [ResumeController::class, 'show'])->name('apply.detail');
});

Route::middleware(['auth', 'checkRole:Admin'])->prefix('admin')->group(function () {
	Route::get('/users', [UsersController::class, 'index'])->name('admin.user');
	Route::delete('/users/{user}', [UsersController::class, 'destroy'])->name('admin.user.delete');

	Route::get('/freelances', [FreelanceController::class, 'index'])->name('admin.freelance');
	Route::get('/freelance/create', [FreelanceController::class, 'create'])->name('freelance.create');
	Route::patch('/freelance/create', [FreelanceController::class, 'store'])->name('freelance.store');
	Route::get('/freelance/{freelance}/edit', [FreelanceController::class, 'edit'])->name('freelance.edit');
	Route::patch('/{freelance}/freelance', [FreelanceController::class, 'update'])->name('freelance.update');
	Route::delete('/{freelance}/freelance', [FreelanceController::class, 'destroy'])->name('freelance.destroy');

	Route::get('/university', [UniversityController::class, 'index'])->name('admin.university');
	Route::get('/university/create', [UniversityController::class, 'create'])->name('university.create');
	Route::post('/university/{university}/major/create', [UniversityController::class, 'createMajor'])->name('university.createMajor');
	Route::post('/university/major/create', [UniversityController::class, 'storeMajor'])->name('university.storeMajor');
	Route::post('/university/create', [UniversityController::class, 'store'])->name('university.store');
	Route::get('/university/{id}/detail', [UniversityController::class, 'show'])->name('university.detail');
	Route::get('/university/{university}/edit', [UniversityController::class, 'edit'])->name('university.edit');
	Route::post('/{university}/university', [UniversityController::class, 'update'])->name('university.update');
	Route::post('/{major}/major', [UniversityController::class, 'updateMajor'])->name('university.updateMajor');
	Route::delete('/{university}/university', [UniversityController::class, 'destroy'])->name('university.destroy');

	Route::get('/skills', [SkillController::class, 'index'])->name('admin.skills');
	Route::post('/skills', [SkillController::class, 'store'])->name('skill.store');
	Route::patch('/{skill}/skills', [SkillController::class, 'update'])->name('skill.update');
	Route::delete('/{skill}/skills', [SkillController::class, 'destroy'])->name('skill.destroy');

	// Route::resource('client', PicController::class);
	Route::prefix('client')->group(function() {
		Route::get('/pic', [PicController::class, 'index'])->name('admin.pic');
		Route::get('/pic/create', [PicController::class, 'create'])->name('pic.create');
		Route::post('/pic/create', [PicController::class, 'store'])->name('pic.store');
		Route::get('/pic/{pic}/detail', [PicController::class, 'show'])->name('pic.detail');
		Route::get('/pic/{pic}/edit', [PicController::class, 'edit'])->name('pic.edit');
		Route::patch('/{pic}/pic', [PicController::class, 'update'])->name('pic.update');
		Route::delete('/{pic}/pic', [PicController::class, 'destroy'])->name('pic.destroy');


		Route::get('/company', [CompanyController::class, 'index'])->name('admin.company');
		Route::get('/company/create', [CompanyController::class, 'create'])->name('company.create');
		Route::post('/company/create', [CompanyController::class, 'store'])->name('company.store');
		// Route::get('/company/{company}/detail', [CompanyController::class, 'show'])->name('company.detail');
		Route::get('/company/{company}/edit', [CompanyController::class, 'edit'])->name('company.edit');
		Route::post('/{company}/company', [CompanyController::class, 'update'])->name('company.update');
		Route::delete('/{company}/company', [CompanyController::class, 'destroy'])->name('company.destroy');

		Route::get('/jobs', [JobController::class, 'index'])->name('admin.jobs');
		Route::get('/jobs/create', [JobController::class, 'create'])->name('job.create');
		Route::post('/jobs/create', [JobController::class, 'store'])->name('job.store');
		Route::get('/jobs/{job}/detail', [JobController::class, 'show'])->name('admin.job.detail');
		Route::get('/jobs/{job}/edit', [JobController::class, 'edit'])->name('job.edit');
		Route::patch('/{job}/jobs', [JobController::class, 'update'])->name('job.update');
	});

});

