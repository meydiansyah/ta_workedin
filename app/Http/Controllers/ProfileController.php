<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\StoreFreelanceRequest;
use App\Http\Requests\StorePicRequest;
use App\Http\Requests\UpdateFreelanceRequest;
use App\Http\Requests\UpdatePicRequest;
use App\Models\Company;
use App\Models\Freelance;
use App\Models\FreelanceSkills;
use App\Models\Major;
use App\Models\PicCompany;
use App\Models\Skill;
use App\Models\TypeCompany;
use App\Models\University;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Laravolt\Indonesia\Models\Province;
use Illuminate\Validation\Rule;

use function PHPUnit\Framework\isEmpty;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function edit(Request $request)
    {
        $universities = University::all();
        $majors = Major::all();
        $skills = Skill::all();
        $type = TypeCompany::all();
        $provinces = Province::all();
        $companies = Company::all();
        if($request->user()->role_id === 2) {
            $data = PicCompany::with(['user', 'user.status', 'user.role', 'company', 'company.typeCompany', 'company.province', 'company.city', 'company.district', 'company.village', 'province', 'city', 'district', 'village', 'company.reviews'])->where('user_id', '=', $request->user()->id)->get()->first();
        } else  {
            $data = Freelance::with(['user', 'user.status', 'user.role', 'university', 'university.majors', 'university.freelances', 'province', 'city', 'district', 'village', 'major', 'skills', 'reviews'])->where('user_id', '=', $request->user()->id)->get()->first();
        }
        if(is_null($data)) {
            $data = User::with(['status', 'role'])->findOrFail($request->user()->id);
        }
        $province = Province::all();
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'data' => $data,
            'provinces' => $province,
            'universities' => $universities,
            'majors' => $majors,
            'companies' => $companies,
            'skills' => $skills,
            'types' => $type,
            'provinces' => $provinces
        ]);
    }

    public function freelanceStore(StoreFreelanceRequest $request) {
        $validateFreelance = $request->validated();
        $user = User::where('id', auth()->user()->id)->get()->first();
        
        if($request->file('photo')) {
            // $imageName = time() . '.' . $request['photo']->extension(); 
            // $path = $request->file('photo')->storeAs('profile-photos', $imageName, 'public');
            // $validate['photo'] = '/storage/'.$path;
            $user->updateProfilePhoto($request['photo']);
            // $user->update([
            //     'profile_photo_url' => $validate['photo']
            // ]);
        }  
		if($validateFreelance) {
            // $validateFreelance['user_id'] = $request->user_id;
            // $validateFreelance['email'] = $request->email;

			Freelance::create($validateFreelance);
            return redirect()->route('profile.edit')->with('status', 'Data freelance berhasil diperbarui.');
		} else {
            return redirect()->route('profile.edit')->with('status', 'error-update');

        }
    }

    public function freelanceUpdateSkills(Request $request) {
        $freelance = Freelance::where('id', '=', $request->freelance_id)->with('skills')->get()->first();

        $freelance->skills()->detach();
        
        foreach($request->skill as $skill) {
            $freelance->skills()->attach($skill);
        }

        return redirect()->route('profile.edit')->with('status', 'Kemampuan berhasil diperbarui.');

    }

    public function freelanceUpdate(UpdateFreelanceRequest $request, Freelance $freelance) {
        $validate = $request->validated();
        $user = User::where('id', $freelance->user_id)->get()->first();
        
        if($request->file('photo')) {
            // $imageName = time() . '.' . $request['photo']->extension(); 
            // $path = $request->file('photo')->storeAs('profile-photos', $imageName, 'public');
            // $validate['photo'] = '/storage/'.$path;
            $user->updateProfilePhoto($request['photo']);
        }  

        $freelance->update($validate);
        return redirect()->route('profile.edit')->with('status', 'Data freelance berhasil diperbarui.');
    }

    public function clientStore(StorePicRequest $request) {
        $validate = $request->validated();
        $user = User::where('id', auth()->user()->id)->get()->first();
        
        if($request->file('photo')) {
            $user->updateProfilePhoto($request['photo']);
        }  

        PicCompany::create($validate);
        return redirect()->route('profile.edit')->with('status', 'Data PIC berhasil diperbarui.');
    }

    public function clientUpdate(UpdatePicRequest $request, PicCompany $client) 
    {
        $validate = $request->validated();
        $client->update($validate);
        $user = User::where('id', $client->user_id)->get()->first();
        
        if($request->file('photo')) {
            $user->updateProfilePhoto($request['photo']);
        }  
        return redirect()->route('profile.edit')->with('status', 'Data PIC berhasil diperbarui.');
    }

    public function universityUpdate(Request $request, Freelance $freelance) {

        $rule = $request->validate([
			'nim' => [
				'required',
				'string',
				Rule::unique('freelances')->ignore($freelance->nim, 'nim')
			],
		]);

        if($rule) {
			$validateFreelance = $request->validate([
                'nim' => 'required|string|max:255|min:1',
                'pt_code' => 'required',
				'major_id' => 'required',
			]);

            // $user = User::find('id', $freelance->user_id)->get()->first();

            // if($user->is_verified) {
			$freelance->universities()->sync($request->pt_code);
            $freelance->majors()->sync($request->major_id);
			// }

            // $freelance->universities()->sync($request->pt_code);
            // $freelance->majors()->sync($request->major_id);
            $freelance->update($validateFreelance);

            return redirect()->route('profile.edit')->with('status', 'Pendidikan berhasil diperbarui.');
		}
    }

    // public function companyUpdate(Request $request, PicCompany $client) {

    //     // dd($request);
    //     $rule = $request->validate([
	// 		'nip' => [
	// 			'required',
	// 			'string',
	// 			Rule::unique('pic_companies')->ignore($client->company_id, 'nip')
	// 		],
    //         'company_id' => [
	// 			'required',
	// 			'numeric',
	// 			Rule::unique('pic_companies')->ignore($client->company_id, 'company_id')
	// 		],
	// 	]);

    //     if($rule) {
	// 		$validate = $request->validate([
    //             'nip' => 'required|string|max:255|min:1',
    //             'title' => 'required',
	// 			'company_id' => 'required',
	// 		]);

    //         $client->update($validate);
    //         $client->companyPic()->sync($client->company_id);

    //         return redirect()->route('profile.edit')->with('status', 'Perusahaan berhasil diperbarui.');
            
	// 	}
    // }

    /**
     * Update the user's profile information.
     *
     * @param  \App\Http\Requests\ProfileUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ProfileUpdateRequest $request)
    {
        // dd($request);
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
        if($request->role_id === 2) {
            $user = PicCompany::where('user_id', '=', $request->user_id)->get()->first();
        } else {
            $user = Freelance::where('user_id', '=', $request->user_id)->get()->first();
        }

        if(isset($user)) {
            $user->update(['email' => $request->email]);
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function updateStatus(Request $request, User $user) {
        $user->update(['status_id' => $request->status_id]);
        return redirect()->route('profile.edit')->with('status', 'Berhasil memperbarui status.');
    }

    public function showUser(User $user) 
    {
        // dd($user);
        // $user = User::find($user)->get()->first();
        if($user->role_id === 2) {
            $data = PicCompany::with(['company', 'company.typeCompany', 'province', 'city', 'district', 'village'])
                ->where('user_id', '=', $user->id)->get()->first();
            $isVerified = $data->company && $user->email_verified_at;
        } else  {
            $data = Freelance::with(['university', 'province', 'city', 'district', 'village', 'major', 'skills', 'reviews'])
                ->where('user_id', '=', $user->id)->get()->first();
            $isVerified = $data->skills->isNotEmpty() && $data->university && $user->email_verified_at;
        }
        // dd($isVerified);

        return Inertia::render('User/Detail', [
            'user' => $user,
            'data' => $data,
            'is_verified' => $isVerified
        ]);
    }

    public function showPic()
    {

    }

    /**
     * Delete the user's account.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
