<?php

namespace App\Http\Controllers;

use App\Models\Major;
use App\Models\University;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
		if (Auth::user()) {
			return Inertia::render('Admin/University/Index');
		} else {
			return Inertia::render('University/Index');
		}
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
			'codept' => 'required|string|max:255|min:1|unique:universities',
			'name' => 'required|string|max:255|min:1|unique:universities',
			'email' => 'required|string|max:255|min:1|unique:universities',
			'phone' => 'required|string|max:255|min:1|unique:universities',
			'fax' => 'required|string|max:255|min:1|unique:universities',
			'url' => 'required|string|max:255|min:1|unique:universities',
			'full_address' => 'required|string',
			'province_id' => 'required|numeric',
			'city_id' => 'required|numeric',
			'district_id' => 'required|numeric',
			'village_id' => 'required|numeric',
			// 'logo' => 'image|file|max:10240',

		]);

			return Inertia::render('Admin/University/CreateMajor', [
				'validateData' => $validateData
			]);
		
	}

	public function storeMajor(Request $request)
	{
		$un = University::create($request->get('validateData'));

		foreach ($request->get('listData') as $major) {
			Major::create([
				'code' => $major['kode'],
				'name' => $major['name'],
				'level' => $major['level'],
				'accredity' => $major['accredity'],
				'sk' => $major['sk'],
				'website' => $major['website'],
				'date_standing' => $major['dateStanding'],
				'pt_code' => $un->codept
			]);
		}

		return redirect()->route('admin.university')->with('success', 'Universitas berhasil dibuat.');
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
