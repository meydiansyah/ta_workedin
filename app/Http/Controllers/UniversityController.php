<?php

namespace App\Http\Controllers;

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
        if(Auth::user()) {
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
			'kodept' => 'required|string|max:255|min:1|unique:universities',
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

		// if ($request->file('logo')) {
		// 	$validateData['logo'] = $request->file('logo')->store('logo-university');
		// }

		$un = University::create($validateData);
        // dd($un->kodept);

        return redirect()->route('university.createMajor', [
            'id' => $un->kodept
        ]);

		// return redirect()->route('admin.university')->with('success', 'User created.');
	}

    public function createMajor(Request $request) {
        return Inertia::render('Admin/University/CreateMajor', [
            'id'=> $request->get('id')
        ]);
    }

    public function storeMajor(Request $requst) {

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

