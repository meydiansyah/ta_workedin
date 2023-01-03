<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as rq;
// use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Province;

class UniversityController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		return Inertia::render('Admin/University/Index');
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
		$province = \Indonesia::allProvinces(['cities']);
		$provinceId = rq::only('provinceId');
		// $city = \Indonesia::findCity(11);
		// $city = City::where('province', '=', $provinceId)->get();
		$city = City::all();
		$district = District::all();
		dd(City()->province);
		return Inertia::render('Admin/University/Create', [
			'provinces' => $province,
			'cities' => $city,
			'districts' => $district,
			// 'provinceId' => $provinceId,
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		// $rules = array(

		// );
		// Validator::make($request->input(), $rules);

		// $request->validate([
		//     'kodept' => ['required', 'string', 'max:255'],
		//     'name' => ['required', 'string', 'name', 'max:255', 'unique:universities'],
		//     'email' => ['required', 'string', 'email', 'max:255', 'unique:universities'],
		//     'phone' => ['required', 'string', 'phone', 'max:255', 'unique:universities'],
		//     'fax' => ['required', 'string', 'fax', 'max:255', 'unique:universities'],
		//     'logo' => ['string', 'logo', 'max:255', 'unique:universities'],
		//     'url' => ['string', 'url', 'max:255', 'unique:universities'],
		//     'fullAddress' => ['string', 'full_address', 'max:255', 'unique:universities'],

		// ]);

		$request->validate([
			'kodept' => 'required|string|max:255|min:1',
			'name' => 'required|string|max:255|min:1',
			'email' => 'required|string|max:255|min:1',
			'phone' => 'required|string|max:255|min:1',
			'fax' => 'required|string|max:255|min:1'
		]);

		dd($request);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		//
	}
}
