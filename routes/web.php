<?php

use App\Http\Controllers\FreelanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UniversityController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
	return Inertia::render('Welcome', [
		'canLogin' => Route::has('login'),
		'canRegister' => Route::has('register'),
		'laravelVersion' => Application::VERSION,
		'phpVersion' => PHP_VERSION,
	]);
})->name('home');


Route::get('/admin/dashboard', function () {
	return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'checkRole:Admin'])->name('dashboard');

Route::middleware('auth')->group(function () {
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/freelances', [FreelanceController::class, 'index'])->name('freelance');
Route::get('/university', [UniversityController::class, 'index'])->name('university');

Route::middleware(['auth', 'checkRole:Admin'])->group(function () {
	Route::get('/admin/freelances', [FreelanceController::class, 'index'])->name('admin.freelance');
	Route::get('/admin/freelance/create', [FreelanceController::class, 'create'])->name('freelance.create');
	Route::patch('/admin/freelance/create', [FreelanceController::class, 'store'])->name('freelance.store');
	Route::get('/admin/freelance/edit', [FreelanceController::class, 'edit'])->name('freelance.edit');
	Route::patch('/admin/freelance', [FreelanceController::class, 'update'])->name('freelance.update');
	Route::delete('/admin/freelance', [FreelanceController::class, 'destroy'])->name('freelance.destroy');

	Route::get('/admin/university', [UniversityController::class, 'index'])->name('admin.university');
	Route::get('/admin/university/create', [UniversityController::class, 'create'])->name('university.create');
	Route::get('/admin/university/major/create', [UniversityController::class, 'createMajor'])->name('university.createMajor');
	Route::patch('/admin/university/major/create', [UniversityController::class, 'storeMajor'])->name('university.storeMajor');
	Route::patch('/admin/university/create', [UniversityController::class, 'store'])->name('university.store');
	Route::get('/admin/university/edit', [UniversityController::class, 'edit'])->name('university.edit');
	Route::patch('/admin/university', [UniversityController::class, 'update'])->name('university.update');
	Route::delete('/admin/university', [UniversityController::class, 'destroy'])->name('university.destroy');

});



require __DIR__ . '/auth.php';
require __DIR__ . '/location.php';
