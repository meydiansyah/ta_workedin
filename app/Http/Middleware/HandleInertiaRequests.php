<?php

namespace App\Http\Middleware;

use App\Models\Freelance;
use App\Models\PicCompany;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
	/**
	 * The root template that is loaded on the first page visit.
	 *
	 * @var string
	 */
	protected $rootView = 'app';

	/**
	 * Determine the current asset version.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return string|null
	 */
	public function version(Request $request)
	{
		return parent::version($request);
	}

	/**
	 * Define the props that are shared by default.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return mixed[]
	 */
	public function share(Request $request)
	{
		return array_merge(parent::share($request), [
			'auth' => [
				'user' => $request->user(),
				'dataUser' => function () use ($request) {
						$user = $request->user();
						if($user && $user->role_id !== 1) {
							if($user->role_id === 2) {
								$data = PicCompany::with('company')->where('user_id', $user->id)->get()->first();
							} else {
								$data = Freelance::with(['major', 'university', 'province', 'city', 'user'])
										->where('user_id', $user->id)
										->get()
										->first();
							}
							return $data;
						}
				},
			],
			'is_verified' => function() use ($request) {
				$request = auth()->user();
				if($request && $request->role_id !== 1) {
					$user = User::where('id', $request->id)->get()->first();

					if($request->role_id === 3) {
							$freelance = Freelance::with(['skills', 'university', 'major'])->where('user_id', '=', $request->id)->get()->first();
							$process = new Process(['python3', app_path().'/PythonScript/Validate.py', $freelance->full_name]);
							$process->run();

							if ($process->isSuccessful()) {
								$data = $process->getOutput();
								$data = str_replace("\n", '', $data);
								$data = explode(',', $data);

								$name_verified = strtolower($data[0]) === strtolower($freelance->full_name);
								$nim_verified = str_replace(" ", '', $data[1]) === $freelance->nim;
								$university_verified = str_replace(" ", '', strtolower($data[2])) === str_replace(" ", "", strtolower($freelance->university->name));
								$prodi_verified = str_replace(" ", '', strtolower($data[3])) === str_replace(" ", "", strtolower($freelance->major->name));
								
								$v = $freelance 
									&& $freelance->skills->isNotEmpty() 
									&& $freelance->university 
									&& $request->email_verified_at 
									&& $name_verified 
									&& $nim_verified 
									&& $prodi_verified 
									&& $university_verified;

								$user->update([
									'is_verified' => $v,
								]);

							} else {
								$user->update([
									'is_verified' => false,
								]);
							}

							return $user->is_verified;
					} else {
						$client = PicCompany::with('company')->where('user_id', '=', $request->id)->get()->first();
						if(!$request->is_verified) {
							$v = $client && $client->company && $request->email_verified_at;
							if($v) {
								$user->update([
									'is_verified' => $v,
								]);
							}
							return $request->is_verified;
						} else {
							return $request->is_verified;
						}
					}
				} else {
					return false;
				}
			},
			'is_admin' => function () use ($request) {
				$request = auth()->user();
				return $request && $request->role->id === 1;
			},
			'is_client' => function () use ($request) {
				$request = auth()->user();
				return $request && $request->role->id === 2;
			},
			'is_freelance' => function () use ($request) {
				$request = auth()->user();
				return $request && $request->role->id === 3;
			},
			'is_active' => function() use ($request) {
				$request = auth()->user();
				return $request && $request->status->id === 1;
			},
			'flash' => [
				'success' => fn() => session('success'),
				'error' => fn() => session('error'),
			],
			'ziggy' => function () use ($request) {
				return array_merge((new Ziggy)->toArray(), [
					'location' => $request->url(),
				]);
			},
		]);
	}
}
