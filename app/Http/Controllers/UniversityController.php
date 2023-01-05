<?php

namespace App\Http\Controllers;

use App\Models\University;
use Illuminate\Http\Request;
use Inertia\Inertia;
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
		$province = Province::all();
		return Inertia::render('Admin/University/Create', [
			'provinces' => $province
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
		$validateData = $request->validate([
			'kodept' => 'required|string|max:255|min:1|unique:universities',
			'name' => 'required|string|max:255|min:1|unique:universities',
			'email' => 'required|string|max:255|min:1|unique:universities',
			'phone' => 'required|string|max:255|min:1|unique:universities',
			'fax' => 'required|string|max:255|min:1|unique:universities',
			'url' => 'required|string|max:255|min:1|unique:universities',
			'fullAddress' => 'required',
			'provinceId' => 'required',
			'cityId' => 'required',
			'districtId' => 'required',
			'villageId' => 'required',
			'logo' => 'image|file|max:10240',

		]);

		if ($request->file('logo')) {
			$validateData['logo'] = $request->file('logo')->store('logo-university');
		}

		University::create($validateData);

		// University::create([
		// 	'kodept' => $request->get('kodept'),
		// 	'name' => $request->get('name'),
		// 	'email' => $request->get('email'),
		// 	'phone' => $request->get('phone'),
		// 	'fax' => $request->get('fax'),
		// 	'url' => $request->get('url'),
		// 	'full_address' => $request->get('fullAddress'),
		// 	'province_id' => $request->get('provinceId'),
		// 	'city_id' => $request->get('cityId'),
		// 	'district_id' => $request->get('districtId'),
		// 	'village_id' => $request->get('villageId'),
		// 	// 'photo_path' => Request::file('photo') ? Request::file('photo')->store('users') : null,
		// ]);

		return redirect()->route('admin.university')->with('success', 'User created.');
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
