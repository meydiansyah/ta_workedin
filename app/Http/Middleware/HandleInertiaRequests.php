<?php

namespace App\Http\Middleware;

use App\Models\Freelance;
use App\Models\PicCompany;
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
			],
			'is_verified' => function() use ($request) {
				$request = auth()->user();
				if($request) {
					if($request->role_id === 3) {
						$freelance = Freelance::with(['skills', 'university'])->where('user_id', '=', $request->id)->get()->first();
						return $freelance && $freelance->skills->isNotEmpty() && $freelance->university && $request->email_verified_at;
					} else {
						$client = PicCompany::with('company')->where('user_id', '=', $request->id)->get()->first();
						return $client && $client->company && $request->email_verified_at;
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
