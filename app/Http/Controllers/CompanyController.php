<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminStoreCompanyRequest;
use App\Http\Requests\AdminUpdateCompanyRequest;
use App\Models\Company;
use App\Models\Job;
use App\Models\TypeCompany;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Laravolt\Indonesia\Models\Province;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->user();
        if($user && $user->role_id === 1) {
            $data = Company::with(['typeCompany', 'companyPic', 'province', 'city', 'district', 'village'])->paginate(7);
            return Inertia::render('Admin/Company/Index', [
                'companies' => $data,
                'status' => session('status'),
            ]);
        } else {
            $data = Company::with(['typeCompany', 'companyPic', 'province', 'city', 'district', 'village'])->get();
            return Inertia::render('Company/Index', [
                'companies' => $data,
                'status' => session('status'),
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
        $type = TypeCompany::all();
        $province = Province::all();
        return Inertia::render('Admin/Company/Create', [
            'types' => $type,
            'provinces' => $province,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AdminStoreCompanyRequest $request)
    {
        $validate = $request->validated();
        if($request->file('logo')) {
			$imageName = time() . '.' . $request['logo']->extension(); 
			$path = $request->file('logo')->storeAs('company', $imageName, 'public');
			$validate['logo'] = '/storage/'.$path;
		}

        Company::create($validate);
        return redirect()->route('admin.company');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company)
    {
        if(auth()->user() && auth()->user()->role_id !== 3) {
            $data = Job::where('company_id', '=', $company->id)
                    ->with(['company', 'company.typeCompany', 'company.companyPic', 'company.reviews', 'company.companyPic.user', 'company.province', 'company.city', 'company.district', 'company.village'])
                    ->get();
        } else {
            $data = Job::where('status_id', '=', 1)
            ->where('company_id', '=', $company->id)
            ->with(['company', 'company.typeCompany', 'company.companyPic', 'company.reviews', 'company.companyPic.user', 'company.province', 'company.city', 'company.district', 'company.village'])
            ->get();
            // $data = Company::where('id', $company->id)
            //     ->with(['typeCompany', 'companyPic', 'province', 'city', 'district', 'village', 'jobs'])
            //     ->orWhereRelation('jobs', 'status_id', 'like', 1)
            //     ->get()
            //     ->first();
                // dd($data->first()->company);
        }

        if($data->isEmpty()) {
            $data = Company::with(['typeCompany', 'companyPic', 'companyPic.user', 'province', 'city', 'district', 'village', 'reviews'])
                    ->where('id', $company->id)
                    ->get()
                    ->first();
            return Inertia::render('Company/Detail', [
                'company' => $data,
            ]);
        }
        // dd($data);
        return Inertia::render('Company/Detail', [
            'company' => $data->first()->company,
            'jobs' => $data,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Company $company)
    {
        $provinces = Province::all();
        $type = TypeCompany::all();
        $company = Company::with(['typeCompany', 'companyPic', 'province', 'city', 'district', 'village'])
                            ->where('id', $company->id)
                            ->get()
                            ->first();

        return Inertia::render('Admin/Company/Edit', [
            'company' => $company,
            'provinces' => $provinces,
            'types' => $type
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AdminUpdateCompanyRequest $request, Company $company)
    {
        $validated = $request->validated();
        if($request->file('logo')) {
            $imageName = time() . '.' . $request['logo']->extension(); 
            $path = $request->file('logo')->storeAs('company', $imageName, 'public');
            $validated['logo'] = '/storage/'.$path;
        } else {
            $validated['logo'] = $company->logo;
        }
        $company->update($validated);
        return redirect()->route('admin.company')->with('status', 'Berhasil memperbarui data perusahaan.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company)
    {
        $company->delete();
        return redirect()->route('admin.company');
    }
}
