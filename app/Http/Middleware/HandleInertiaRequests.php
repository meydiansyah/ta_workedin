<?php

namespace App\Http\Middleware;

use App\Models\Freelance;
use App\Models\PicCompany;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
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
						if($user) {
							if($user->role_id === 2) {
								$data = PicCompany::where('user_id', $user->id)->get()->first();
							} else {
								$data = Freelance::with(['major', 'university', 'province', 'city'])->where('user_id', $user->id)->get()->first();
							}
							return $data;
						}
				},
			],
			'is_verified' => function() use ($request) {
				$request = auth()->user();
				if($request) {
					$user = User::where('id', $request->id)->get()->first();

					if($request->role_id === 3) {
						if(!$request->is_verified) {
							$freelance = Freelance::with(['skills', 'university'])->where('user_id', '=', $request->id)->get()->first();

							$v = $freelance && $freelance->skills->isNotEmpty() && $freelance->university && $request->email_verified_at;
							if($v) {
								$user->update([
									'is_verified' => $v,
								]);
							}
							return $request->is_verified;
						} else {
							return $request->is_verified;
						}
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
