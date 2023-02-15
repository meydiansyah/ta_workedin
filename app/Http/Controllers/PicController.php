<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePicRequest;
use App\Models\Company;
use App\Models\PicCompany;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Laravolt\Indonesia\Models\Province;

class PicController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pic = PicCompany::with(['user', 'company', 'user.status'])->paginate(7);
        return Inertia::render('Admin/Company/PIC/Index', [
            'pic' => $pic
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $provinces = Province::all();
        $status = Status::all();
        $company = Company::all();
        // dd($company);
        return Inertia::render('Admin/Company/PIC/Create', [
            'provinces' => $provinces,
            'statuses' => $status,
            'companies' => $company,
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
        $validate = $request->validate([
			'name' => 'required|string|max:255|min:5|unique:users',
			'email' => 'required|string|max:255|min:5|unique:users',
			'password' => 'required|string|max:255|min:5|unique:users',
			'first_name' => 'required|string|max:255|min:1',
			'last_name' => 'required|string|max:255|min:1',
			'phone' => 'required|string|max:255|min:1|unique:pic_companies',
			// 'bio' => 'string|max:255|min:1',
			'nik' => 'required|string|max:255|min:1|unique:pic_companies',
			'nip' => 'string|max:255|min:1|unique:pic_companies',
			'status_id' => 'required|numeric',
			'company_id' => 'required|numeric|unique:pic_companies',
			'title' => 'string',
			'full_address' => 'required|string',
			'province_id' => 'required|numeric',
			'city_id' => 'required|numeric',
			'district_id' => 'required|numeric',
			'village_id' => 'required|numeric',
		]);

		if($validate) {
			$validate['role_id'] = $request->role_id;
			$validate['password'] = Hash::make($request->password);

			$user = User::create($validate);
			
			$validate['user_id'] = $user->id;
			$validate['email'] = $user->email;
            $pic = PicCompany::create($validate);
            $company = Company::findOrFail($pic->company_id);

            $company->companyPic()->sync($pic->id);
		}
		return redirect()->route('admin.pic');
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
    public function edit(PicCompany $pic)
    {
        $provinces = Province::all();
        $status = Status::all();
        $data = PicCompany::with(['user', 'company', 'province', 'city', 'district', 'village'])->find($pic)->first();
        $company = Company::all();
        // dd($data);
        return Inertia::render('Admin/Company/PIC/Edit', [
            'pic' => $data,
            'provinces' => $provinces,
            'statuses' => $status,
            'companies' => $company
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePicRequest $request, PicCompany $pic)
    {
        $validate = $request->validated();
        User::find($request->user_id)->update([
            'status_id' => $request->status_id
        ]);

        $pic->update($validate);
        $pic->companyPic()->sync($pic->company_id);

        return redirect()->route('admin.pic');
        // dd($pic);
        // $rule = $request->validate([
        //     'phone' => [
		// 		'required',
		// 		'string',
		// 		Rule::unique('pic_companies')->ignore($pic->id, 'phone')
		// 	],
		// 	'nik' => [
		// 		'required',
		// 		'string',
		// 		Rule::unique('pic_companies')->ignore($pic->id, 'nik')
		// 	],
		// 	'nip' => [
		// 		'required',
		// 		'string',
		// 		Rule::unique('pic_companies')->ignore($pic->id, 'nip')
		// 	],
        //     'company_id' => [
		// 		'required',
		// 		'numeric',
		// 		Rule::unique('pic_companies')->ignore($pic->id, 'company_id')
		// 	],
            
		// ]);

		// if($rule) {
		// 	$validatePic = $request->validate([
        //         'first_name' => 'required|string|max:255|min:1',
        //         'last_name' => 'required|string|max:255|min:1',
        //         'phone' => 'required|string|max:255|min:1',
        //         // 'bio' => 'string|max:255|min:1',
        //         'nik' => 'required|string|max:255|min:1',
        //         'nip' => 'string|max:255|min:1',
        //         'title' => 'string',
        //         'company_id' => 'required|numeric',
        //         'full_address' => 'required|string',
        //         'province_id' => 'required|numeric',
        //         'city_id' => 'required|numeric',
        //         'district_id' => 'required|numeric',
        //         'village_id' => 'required|numeric',
		// 	]);

		// 	User::find($request->user_id)->update([
		// 		'status_id' => $request->status_id
		// 	]);

		// 	$pic->update($validatePic);
        //     $pic->companyPic()->sync($pic->company_id);

		// 	return redirect()->route('admin.pic');

		// }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(PicCompany $pic)
    {
        $user = User::findOrFail($pic->user_id);
        $user->delete();
        $pic->delete();
        return redirect()->route('admin.pic');
    }
}
