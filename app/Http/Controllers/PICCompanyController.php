<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminStoreCompanyRequest;
use App\Models\Company;
use App\Models\Job;
use Illuminate\Http\Request;

class PICCompanyController extends Controller
{
    
    public function indexJob()
    {
        //
    }

    public function createCompany()
    {
        //
    }

    public function createJob()
    {
        //
    }

    public function storeCompany(AdminStoreCompanyRequest $request)
    {
        $validate = $request->validated();
        if($request->file('logo')) {
			$imageName = time() . '.' . $request['logo']->extension(); 
			$path = $request->file('logo')->storeAs('company', $imageName, 'public');
			$validate['logo'] = '/storage/'.$path;
		}
        // dd($request);
        Company::create($validate);
        return redirect()->route('profile.edit')->with('status', 'Berhasil menambahkan perusahaan');
    }

    public function storeJob(Request $request)
    {
        //
    }
   
    public function showCompany(Company $company)
    {
        //
    }

    public function showJob(Job $job)
    {
        //
    }

    public function editCompany(Company $company)
    {
        //
    }

    public function editJob(Job $job)
    {
        //
    }

    public function updateCompany(Request $request, Company $company)
    {
        //
    }

    public function updateJob(Request $request, Job $job)
    {
        //
    }
}
