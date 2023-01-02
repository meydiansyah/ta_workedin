<?php

use App\Http\Controllers\FreelanceController;
use App\Http\Controllers\ProfileController;
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
Route::middleware(['auth', 'checkRole:Admin'])->group(function () {
	Route::get('/admin/freelances', [FreelanceController::class, 'index'])->name('admin.freelance');
	Route::get('/admin/freelance/create', [FreelanceController::class, 'create'])->name('freelance.create');
	Route::patch('/admin/freelance/create', [FreelanceController::class, 'store'])->name('freelance.store');
	Route::get('/admin/freelance/edit', [FreelanceController::class, 'edit'])->name('freelance.edit');
	Route::patch('/admin/freelance', [FreelanceController::class, 'update'])->name('freelance.update');
	Route::delete('/admin/freelance', [FreelanceController::class, 'destroy'])->name('freelance.destroy');
});


require __DIR__ . '/auth.php';
