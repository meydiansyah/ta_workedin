<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminStoreUniversityRequest;
use App\Http\Requests\AdminUpdateUniversityRequest;
use App\Models\Freelance;
use App\Models\Major;
use App\Models\MajorUniversity;
use App\Models\University;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
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
		if (Auth::user() && Auth::user()->role_id === 1) {
			$un = University::with(['majors', 'freelances'])->paginate(7);
			return Inertia::render('Admin/University/Index', [
				'universities'=> $un,
				'status' => session('status'),
			]);
		} else {
			$universities = University::all();
			return Inertia::render('University/Index', [
				'universities' => $universities
			]);
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
	public function store(AdminStoreUniversityRequest $request)
	{
		$validate = $request->validated();
		if($request->hasFile('logo')) {
			$imageName = time() . '.' . $request['logo']->extension(); 
			$path = $request->file('logo')->storeAs('university', $imageName, 'public');
			$validate['logo'] = '/storage/'.$path;
		}

		University::create($validate);
		return redirect()->route('admin.university')->with('status', 'Berhasil menambahkan universitas.');
	}

	public function storeMajor(Request $request)
	{
		$un = University::find($request->validateData['codept']);
		Major::create([
			'code' => $request['code'],
			'name' => $request['name'],
			'level' => $request['level'],
			'accredity' => $request['accredity'],
			'sk' => $request['sk'],
			'website' => $request['website'],
			'date_standing' => $request['dateStanding'],
			'pt_code' => $request->validateData['codept']
		]);
		$un->majors()->attach($request['code']);
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		$un = University::with(['majors', 'freelances', 'province', 'city', 'district','village'])->where('codept', $id)->get()->first();

		if (Auth::user() && Auth::user()->role_id === 1) {
			$mj = Major::with('freelances')->where('pt_code', $id)->paginate(7);
			return Inertia::render('Admin/University/Detail', [
				'university' => $un,
				'majors' => $mj
			]);
		} else {
			$mj = Major::with('freelances')->where('pt_code', $id)->get();
			return Inertia::render('University/Detail', [
				'university' => $un,
				'majors' => $mj
			]);
		}

	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function edit(University $university)
	{
		$province = Province::all();
		$un = University::with(['majors', 'freelances', 'province', 'city', 'district', 'village'])->find($university)->first();

		return Inertia::render('Admin/University/Edit', [
			'data' => $un,
			'provinces' => $province,
		]);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(AdminUpdateUniversityRequest $request, University $university)
	{
		$validate = $request->validated();

		if($request->hasFile('logo')) {
			$imageName = time() . '.' . $request['logo']->extension(); 
			$path = $request->file('logo')->storeAs('university', $imageName, 'public');
			$validate['logo'] = '/storage/'.$path;
		} else {
			$validate['logo'] = $university->logo;
		}

		$university->update($validate);
		return redirect()->route('admin.university')->with('status', 'Universitas berhasil diperbarui');
	}

	public function updateMajor(Request $request, Major $major)
	{
		// dd($major);
		$validate = $request->validate([
			'code' => [
				'required',
				'numeric',
				'min:3',
				Rule::unique('majors')->ignore($major->code, 'code')
			],
			'name' => [
				'required',
				'string',
				'max:255',
				'min:3',
				Rule::unique('majors')->ignore($major->name, 'name')
			],
        ]);

		$major->update($validate);
        return redirect()->back();
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(University $university)
	{
		$university->delete();
        return redirect()->route('admin.university');
	}
}
