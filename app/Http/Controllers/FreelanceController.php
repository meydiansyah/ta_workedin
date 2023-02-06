<?php

namespace App\Http\Controllers;

use App\Models\Freelance;
use App\Models\FreelanceSkills;
use App\Models\Major;
use App\Models\Skill;
use App\Models\Status;
use App\Models\University;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Laravolt\Indonesia\Models\Province;

class FreelanceController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
			$freelances = Freelance::with(['major', 'university', 'user', 'user.status'])->paginate(7);
			return Inertia::render('Admin/Freelance/Index', [
				'freelance'=> $freelances,
			]);
	
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
		$universities = University::all();
		$majors = Major::all();
		$skills = Skill::all();
		$province = Province::all();

		return Inertia::render('Admin/Freelance/Create', [
			'universities' => $universities,
			'skills' => $skills,
			'provinces' => $province,
			'majors' => $majors
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
		$validateFreelance = $request->validate([
			'name' => 'required|string|max:255|min:5|unique:users',
			'email' => 'required|string|max:255|min:5|unique:users',
			'password' => 'required|string|max:255|min:5|unique:users',
			'first_name' => 'required|string|max:255|min:1',
			'last_name' => 'required|string|max:255|min:1',
			'phone' => 'required|string|max:255|min:1|unique:freelances',
			'bio' => 'string|max:255|min:1',
			'nik' => 'required|string|max:255|min:16|max:16|unique:freelances',
			'nim' => 'required|string|max:255|min:1|unique:freelances',
			'status_id' => 'required|numeric',
			'pt_code' => 'required|numeric',
			'major_code' => 'required|numeric',
			'full_address' => 'required|string',
			'province_id' => 'required|numeric',
			'city_id' => 'required|numeric',
			'district_id' => 'required|numeric',
			'village_id' => 'required|numeric',
			'profile_photo_url' => 'image|file|max:10240',

		]);

		if($validateFreelance) {
			$validateFreelance['role_id'] = $request->get('role_id');
			$validateFreelance['password'] = Hash::make($request->password);

			$user = User::create($validateFreelance);
			
			$validateFreelance['user_id'] = $user->id;
			$validateFreelance['email'] = $user->email;

			if($request->file('profile_photo_url')) {
				$imageName = time() . '.' . $request['profile_photo_url']->extension(); 
				$path = $request->file('profile_photo_url')->storeAs('freelance', $imageName, 'public');
				$validateData['profile_photo_url'] = '/storage/'.$path;
			}

			$freelance = Freelance::create($validateFreelance);

			$freelance->majors()->attach($request->major_code);
			$freelance->universities()->attach($request->pt_code);
			
			foreach($request->skill as $skill) {
				$freelance->skills()->attach($skill);
			}
		}
		return redirect()->route('admin.freelance')->with('success', 'Universitas berhasil dibuat.');
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
	public function edit(Freelance $freelance)
	{
		$province = Province::all();
		$data = Freelance::with([ 'university', 'user', 'user.status', 'major', 'skills', 'province', 'city', 'district', 'village'])->find($freelance)->first();
		$universities = University::all();
		$majors = Major::all();
		$skills = Skill::all();
		$statuses = Status::all();
		
		return Inertia::render('Admin/Freelance/Edit', [
			'freelance' => $data,
			'provinces' => $province,
			'universities' => $universities,
			'majors' => $majors,
			'skills' => $skills,
			'statuses' => $statuses
		]);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Freelance $freelance)
	{
        $freelance->skills()->detach();

		$rule = $request->validate([
			'nik' => [
				'required',
				'string',
				Rule::unique('freelances')->ignore($freelance->nik, 'nik')
			],
			'nim' => [
				'required',
				'string',
				Rule::unique('freelances')->ignore($freelance->nim, 'nim')
			],
		]);

		// dd($request->status_id);

		if($rule) {
			$validateFreelance = $request->validate([
				'first_name' => 'required|string|max:255|min:1',
				'last_name' => 'required|string|max:255|min:1',
				'phone' => 'required|string|max:255|min:1',
				// 'bio' => 'string|max:255|min:1',
				'nik' => 'required|string|max:255|min:1',
				'nim' => 'required|string|max:255|min:1',
				'pt_code' => 'required',
				'major_code' => 'required',
				'full_address' => 'required|string',
				'province_id' => 'required|numeric',
				'city_id' => 'required|numeric',
				'district_id' => 'required|numeric',
				'village_id' => 'required|numeric',
			]);

			User::findOrFail($request->user_id)->update([
				'status_id' => $request->status_id
			]);

			if($request->status_id !== 7) {
				$freelance->universities()->sync($request->pt_code);
				$freelance->majors()->sync($request->major_code);
			} else {
				$freelance->majors()->detach();
				$freelance->universities()->detach();
			}

			foreach($request->skill as $skill) {
				$freelance->skills()->attach($skill);
			}

			$freelance->update($validateFreelance);
			return redirect()->route('admin.freelance');

		}
		// return redirect()->route('admin.freelance');

		

	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Freelance $freelance)
	{
		$freelance->delete();
        return redirect()->route('admin.freelance');
	}
}
