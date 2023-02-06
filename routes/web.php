<?php

use App\Http\Controllers\FreelanceController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UniversityController;
use App\Models\Company;
use App\Models\University;
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
	Route::patch('/profile/freelance', [ProfileController::class, 'freelanceStore'])->name('profile.freelance.store');
	Route::patch('/profile/client', [ProfileController::class, 'clientStore'])->name('profile.client.store');
	Route::patch('/profile/{freelance}/freelance', [ProfileController::class, 'freelanceUpdate'])->name('profile.freelance.update');
	Route::patch('/profile/{client}/client', [ProfileController::class, 'clientUpdate'])->name('profile.client.update');
	Route::patch('/profile/{client}/company', [ProfileController::class, 'companyUpdate'])->name('profile.company.update');
	Route::patch('/profile/{freelance}/university', [ProfileController::class, 'universityUpdate'])->name('profile.university.update');
	Route::patch('/profile/{user}/status', [ProfileController::class, 'updateStatus'])->name('profile.status.update');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::patch('/profile', [ProfileController::class, 'freelanceUpdateSkills'])->name('freelance.update.skills');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/freelances', [FreelanceController::class, 'index'])->name('freelance');
Route::get('/jobs', [JobController::class, 'index'])->name('jobs');
Route::get('/jobs/{job}', [JobController::class, 'show'])->name('job.detail');
Route::get('/university', [UniversityController::class, 'index'])->name('university');
Route::get('/university/{university}/detail', [UniversityController::class, 'show'])->name('detail.university');
// Route::get('/university', function() {
// 	$university = University::all();
// 	return Inertia::render('University/Index', [
// 		'universities' => $university
// 	]);
// })->name('university');
Route::get('/company', function() {
	$company = Company::with('typeCompany')->get();
	return Inertia::render('Company/Index', [
		'companies' => $company
	]);
})->name('company');


require __DIR__ . '/admin.php';
require __DIR__ . '/pic.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/location.php';
