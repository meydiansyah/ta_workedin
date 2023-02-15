<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\FreelanceController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResumeController;
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
	Route::post('/profile/freelance', [ProfileController::class, 'freelanceStore'])->name('profile.freelance.store');
	Route::post('/profile/client', [ProfileController::class, 'clientStore'])->name('profile.client.store');
	Route::post('/profile/{freelance}/freelance', [ProfileController::class, 'freelanceUpdate'])->name('profile.freelance.update');
	Route::post('/profile/{client}/client', [ProfileController::class, 'clientUpdate'])->name('profile.client.update');
	Route::patch('/profile/{client}/company', [ProfileController::class, 'companyUpdate'])->name('profile.company.update');
	Route::patch('/profile/{freelance}/university', [ProfileController::class, 'universityUpdate'])->name('profile.university.update');
	Route::patch('/profile/{user}/status', [ProfileController::class, 'updateStatus'])->name('profile.status.update');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::patch('/profile/skill', [ProfileController::class, 'freelanceUpdateSkills'])->name('freelance.update.skills');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

	Route::post('/detail/{resume}/resume', [ResumeController::class, 'update'])->name('update.resume');
	Route::get('/history', [ResumeController::class, 'index'])->name('history.apply');
	Route::post('/job/apply', [ResumeController::class, 'store'])->name('apply.job');
});

Route::get('/freelances', [FreelanceController::class, 'index'])->name('freelance');
Route::get('/freelances/{freelance}/detail', [FreelanceController::class, 'index'])->name('freelance.detail');
Route::get('/detail/{user}', [ProfileController::class, 'showUser'])->name('detail.user');
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
Route::get('/company', [CompanyController::class, 'index'])->name('company');
Route::get('/company/{company}/detail', [CompanyController::class, 'show'])->name('company.detail');


require __DIR__ . '/admin.php';
require __DIR__ . '/pic.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/location.php';
