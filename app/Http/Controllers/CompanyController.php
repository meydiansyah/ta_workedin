<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminStoreCompanyRequest;
use App\Http\Requests\AdminUpdateCompanyRequest;
use App\Models\Company;
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
        $data = Company::with(['typeCompany', 'companyPic', 'province', 'city', 'district', 'village'])->paginate(7);
        return Inertia::render('Admin/Company/Index', [
            'companies' => $data,
            'status' => session('status'),
        ]);

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
    public function edit(Company $company)
    {
        $provinces = Province::all();
        $type = TypeCompany::all();
        $company = Company::with(['typeCompany', 'companyPic', 'province', 'city', 'district', 'village'])->find($company)->first();

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
