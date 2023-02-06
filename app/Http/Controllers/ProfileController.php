<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
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
            $data = PicCompany::with(['user', 'user.status', 'user.role', 'company', 'company.typeCompany', 'province', 'city', 'district', 'village'])->where('user_id', '=', $request->user()->id)->get()->first();
        } else  {
            $data = Freelance::with(['user', 'user.status', 'user.role', 'university', 'university.majors', 'university.freelances', 'province', 'city', 'district', 'village', 'major', 'skills'])->where('user_id', '=', $request->user()->id)->get()->first();
            // dd($data);
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

    public function freelanceStore(Request $request) {
        $validateFreelance = $request->validate([
			'first_name' => 'required|string|max:255|min:1',
			'last_name' => 'required|string|max:255|min:1',
			'phone' => 'required|string|max:255|min:1|unique:freelances',
			// 'bio' => 'string|max:255|min:1',
			'nik' => 'required|string|max:255|min:1|unique:freelances',
			'full_address' => 'required|string',
			'province_id' => 'required|numeric',
			'city_id' => 'required|numeric',
			'district_id' => 'required|numeric',
			'village_id' => 'required|numeric',
            'email' => 'string',
            'user_id' => 'numeric'
		]);

		if($validateFreelance) {
            $validateFreelance['user_id'] = $request->user_id;
            $validateFreelance['email'] = $request->email;

			Freelance::create($validateFreelance);
            return redirect()->route('profile.edit')->with('status', 'Data freelance berhasil diperbarui.');
		} else {
            return redirect()->route('profile.edit')->with('status', 'error-update');

        }
    }

    public function freelanceUpdateSkills(Request $request) {
        $freelance = Freelance::find($request->freelance_id)->with('skills')->get()->first();
        $freelance->skills()->detach();
        foreach($request->skill as $skill) {
            $freelance->skills()->attach($skill);
        }
    }

    public function freelanceUpdate(Request $request, Freelance $freelance) {
        $rule = $request->validate([
			'nik' => [
				'required',
				'string',
				Rule::unique('freelances')->ignore($freelance->nik, 'nik')
			],
		]);

        if($rule) {
			$validateFreelance = $request->validate([
				'first_name' => 'required|string|max:255|min:1',
                'last_name' => 'required|string|max:255|min:1',
                'phone' => 'required|string|max:255|min:1',
                // 'bio' => 'string|max:255|min:1',
                'nik' => 'required|string|max:255|min:1',
                'full_address' => 'required|string',
                'province_id' => 'required|numeric',
                'city_id' => 'required|numeric',
                'district_id' => 'required|numeric',
                'village_id' => 'required|numeric',
                'user_id' => 'numeric'
			]);

			$freelance->update($validateFreelance);
            return redirect()->route('profile.edit')->with('status', 'Data freelance berhasil diperbarui.');
		}
    }

    public function clientStore(Request $request) {
        $validate = $request->validate([
			'first_name' => 'required|string|max:255|min:1',
			'last_name' => 'required|string|max:255|min:1',
			'phone' => 'required|string|max:255|min:1|unique:pic_companies',
			// 'bio' => 'string|max:255|min:1',
			'nik' => 'required|string|max:255|min:1|unique:pic_companies',
			'full_address' => 'required|string',
			'province_id' => 'required|numeric',
			'city_id' => 'required|numeric',
			'district_id' => 'required|numeric',
			'village_id' => 'required|numeric',
            'email' => 'string',
            'user_id' => 'numeric'
		]);

		if($validate) {
            $validate['user_id'] = $request->user_id;
            $validate['email'] = $request->email;

			PicCompany::create($validate);
		}
        return redirect()->route('profile.edit')->with('status', 'Data PIC berhasil diperbarui.');
    }

    public function clientUpdate(Request $request, PicCompany $client) {

        $rule = $request->validate([
			'nik' => [
				'required',
				'string',
				Rule::unique('pic_companies')->ignore($client->nik, 'nik')
			],
		]);

        if($rule) {
			$validateFreelance = $request->validate([
				'first_name' => 'required|string|max:255|min:1',
                'last_name' => 'required|string|max:255|min:1',
                'phone' => 'required|string|max:255|min:1',
                // 'bio' => 'string|max:255|min:1',
                'nik' => 'required|string|max:255|min:1',
                'full_address' => 'required|string',
                'province_id' => 'required|numeric',
                'city_id' => 'required|numeric',
                'district_id' => 'required|numeric',
                'village_id' => 'required|numeric',
                'user_id' => 'numeric'
			]);

			$client->update($validateFreelance);
            return redirect()->route('profile.edit')->with('status', 'Data freelance berhasil diperbarui.');
		}
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
				'major_code' => 'required',
			]);

            $freelance->universities()->sync($request->pt_code);
            $freelance->majors()->sync($request->major_code);

			$freelance->update($validateFreelance);
            return redirect()->route('profile.edit')->with('status', 'Pendidikan berhasil diperbarui.');
		}
    }

    public function companyUpdate(Request $request, PicCompany $client) {

        // dd($request);
        $rule = $request->validate([
			'nip' => [
				'required',
				'string',
				Rule::unique('pic_companies')->ignore($client->company_id, 'nip')
			],
            'company_id' => [
				'required',
				'numeric',
				Rule::unique('pic_companies')->ignore($client->company_id, 'company_id')
			],
		]);

        if($rule) {
			$validate = $request->validate([
                'nip' => 'required|string|max:255|min:1',
                'title' => 'required',
				'company_id' => 'required',
			]);

            $client->update($validate);
            $client->companyPic()->sync($client->company_id);

            return redirect()->route('profile.edit')->with('status', 'Perusahaan berhasil diperbarui.');
            
		}
    }

    /**
     * Update the user's profile information.
     *
     * @param  \App\Http\Requests\ProfileUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ProfileUpdateRequest $request)
    {

        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
        if($request->role_id === 2) {
            $user = PicCompany::where('user_id', '=', $request->user_id)->get()->first();
        } else {
            $user = Freelance::where('user_id', '=', $request->user_id)->get()->first();
        }

        $user->update(['email' => $request->email]);

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function updateStatus(Request $request, User $user) {
        $d = $user->update(['status_id' => $request->status_id]);
        return redirect()->route('profile.edit');
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
