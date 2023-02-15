<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminStoreCompanyRequest;
use App\Http\Requests\AdminUpdateCompanyRequest;
use App\Models\Company;
use App\Models\Job;
use App\Models\PicCompany;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PICCompanyController extends Controller
{
    
    public function indexJob(Request $request)
    {
        $pic = PicCompany::where('user_id', '=', auth()->user()->id)->get()->first();
        if(isset($pic)) {
            $jobs = Job::with(['status', 'company', 'skills', 'company.city', 'company.typeCompany', 'resumes'])
                ->where('company_id', '=', $pic->company_id)
                ->when($request->input('search'),function($query, $search) {
                    $query->where('title','like','%'.$search.'%')
                    ->OrWhereRelation('company', 'name', 'like','%'.$search.'%');
                })
                ->withTrashed()
                ->get();
                return Inertia::render('Client/Jobs/Index', [
                    'job' => $jobs,
                    'status' => session('status'),
                    'pic' => $pic,
                ]);
        } else {
            return redirect()->route('profile.edit');
        }
        
    }

    public function createJob()
    {
        $skill = Skill::all();
        return Inertia::render('Client/Jobs/Create', [
            'skills' => $skill,
        ]);
    }

    public function storeCompany(AdminStoreCompanyRequest $request)
    {
        $validate = $request->validated();
        if($request->file('logo')) {
            $imageName = time() . '.' . $request['logo']->extension(); 
            $path = $request->file('logo')->storeAs('company', $imageName, 'public');
            $validate['logo'] = '/storage/'.$path;
        }
        $company = Company::create($validate);

        PicCompany::findOrFail($request->client_id)->companyPic()->sync($company->id);

        PicCompany::findOrFail($request->client_id)->update([
            'title' => $request->title,
            'nip' => $request->nip,
            'company_id' => $company->id,
        ]);
        return redirect()->route('profile.edit')->with('status', 'Berhasil menambahkan perusahaan');

    }

    public function storeJob(Request $request)
    {
        // dd($request);
        $pic = PicCompany::where('user_id', '=', auth()->user()->id)->get()->first();
        // dd($pic);
        $validate = $request->validate([
            'title' => 'required|string|min:3',
            'description' => 'required|string|min:50',
            'salary' => 'required|numeric',
            'skill' => 'required',
            'status_id' => 'numeric'
        ]);

        $validate['image_url'] = 'empty';
        $validate['company_id'] = $pic->company_id;

        $job = Job::create($validate);

        $job->companies()->attach($pic->company_id);

        foreach($request->skill as $skill) {
			$job->skills()->attach($skill);
        }

        return redirect()->route('client.job')->with('status', 'Berhasil menambahkan pekerjaan');

    }

    public function editJob(Job $job)
    {
        $skill = Skill::all();
        $data = Job::with(['status', 'company', 'skills', 'company.city', 'company.companyPic'])->withTrashed()->where('id', '=', $job->id)->get()->first();
        return Inertia::render('Client/Jobs/Edit', [
            'job' => $data,
            'skills' => $skill,
        ]);
    }

    public function updateCompany(AdminUpdateCompanyRequest $request, Company $company)
    {
        $validate = $request->validated();
        if($request->file('logo')) {
            $imageName = time() . '.' . $request['logo']->extension(); 
            $path = $request->file('logo')->storeAs('company', $imageName, 'public');
            $validate['logo'] = '/storage/'.$path;
        }  else {
            $validate['logo'] = $company->logo;
        }

        PicCompany::findOrFail($request->client_id)->update([
            'title' => $request->title,
            'nip' => $request->nip,
        ]);

        $company->update($validate);
        return redirect()->route('profile.edit')->with('status', 'Berhasil memperbarui perusahaan');
    }

    public function updateJob(Request $request, Job $job)
    {
        $job->skills()->detach();
        $pic = Company::with('companyPic')->find($request->company_id);
        $pic = $pic->companyPic;
        if($pic->isNotEmpty()) {
            $request['pic_company_id'] = $pic->first()->id;
        }

        $validate = $request->validate([
            'title' => 'required|string|min:3',
            'description' => 'required|string|min:50',
            'salary' => 'required|numeric',
            'status_id' => 'required',
        ]);
        foreach($request->skill as $skill) {
			$job->skills()->attach($skill);
        }

        $job->update($validate);
        return redirect()->route('client.job')->with('status', 'Berhasil memperbarui pekerjaan.');
    }
}
