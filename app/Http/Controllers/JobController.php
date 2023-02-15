<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Freelance;
use App\Models\Job;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use function PHPUnit\Framework\isNull;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if(Auth::user()) {
            if (Auth::user()->role_id === 1) {
                $jobs = Job::with(['status', 'company', 'skills', 'company.city', 'company.typeCompany', 'resumes'])
                    ->withTrashed()
                    ->when($request->input('search'),function($query, $search) {
                        $query->where('title','like','%'.$search.'%')
                        ->OrWhereRelation('company', 'name', 'like','%'.$search.'%');
                    })
                    ->latest()
                    ->get();
                    return Inertia::render('Admin/Jobs/Index', [
                        'job' => $jobs,
                        'status' => session('status')
                    ]);
            } else {
                $freelance = Freelance::with('skills')->where('user_id', '=', auth()->user()->id)->get()->first();

                if($freelance){
                    $idFreelance = $freelance->skills->pluck('id');

                    $jobs = Job::whereHas('skills', function($q) use ($idFreelance) {
                            $q->whereIn('skill_id', $idFreelance);
                        })
                        ->with(['status', 'company', 'skills', 'company.city', 'company.typeCompany', 'resumes'])
                        ->when($request->input('search'),function($query, $search) {
                            $query->where('title','like','%'.$search.'%')
                                    ->OrWhereRelation('company', 'name', 'like','%'.$search.'%')
                                    ->OrWhereRelation('skills', 'name', 'like','%'.$search.'%')
                            ;
                        })
                        ->where('status_id', '!=', 2)
                        ->where('status_id', '!=', 8)
                        ->latest()
                        ->get();

                        // dd($jobs);
                    } else {
                        $jobs = Job::with(['status', 'company', 'skills', 'company.city', 'company.typeCompany', 'resumes'])->where('status_id', 1)->when($request->input('search'),function($query, $search) {
                            $query->where('title','like','%'.$search.'%')
                                    ->OrWhereRelation('company', 'name', 'like','%'.$search.'%');
                        })
                        ->latest()
                        ->get();
                    }
                // select js.job_id, j.title from `job_skills` js INNER JOIN `jobs` j ON js.job_id = j.id INNER JOIN `skills` s ON js.skill_id = s.id WHERE js.skill_id IN(1, 5) GROUP BY js.job_id ORDER BY js.job_id
            }
        } else {
            $jobs = Job::with(['status', 'company', 'skills', 'company.city', 'company.typeCompany', 'resumes'])
                    ->where('status_id', 1)
                    ->when($request->input('search'),function($query, $search) {
                        $query->where('title','like','%'.$search.'%')
                            ->OrWhereRelation('company', 'name', 'like','%'.$search.'%');
                    })
                    ->latest()
                    ->get();
        }

        if(!is_null($request->filter)) {
            $jobs = Job::with(['status', 'company', 'skills', 'company.city', 'company.typeCompany', 'resumes'])
            ->where('status_id', 1)
            ->when($request->input('search'),function($query, $search) {
                $query->where('title','like','%'.$search.'%')
                        ->OrWhereRelation('company', 'name','like','%'.$search.'%');
            })
            ->latest()
            ->get();
        }
        // dd(is_null($request->filter));

        
        return Inertia::render('Jobs/Index', [
            'job' => $jobs,
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $company = Company::all();
        $skill = Skill::all();
        return Inertia::render('Admin/Jobs/Create', [
            'companies' => $company,
            'skills' => $skill,
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
        $pic = Company::with('companyPic')->where('id', '=', $request->company_id);
        $pic = $pic->companyPic;
        if($pic->isNotEmpty()) {
            $request['pic_company_id'] = $pic->first()->id;
        }

        $validate = $request->validate([
            'title' => 'required|string|min:3',
            'description' => 'required|string|min:50',
            'salary' => 'required|numeric',
            'company_id' => 'required',
            'skill' => 'required',
            'pic_company_id' => 'required'
        ]);

        $validate['image_url'] = 'empty';
        $validate['status_id'] = $request->status_id;
        $job = Job::create($validate);

        $job->companies()->attach($pic->company_id);

        foreach($request->skill as $skill) {
			$job->skills()->attach($skill);
        }

        return redirect()->route('admin.jobs');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Job $job)
    {
        dd($job);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Job $job)
    {   
        $company = Company::all();
        $skill = Skill::all();
        $data = Job::with(['status', 'company', 'skills', 'company.city', 'company.companyPic'])->withTrashed()->where('id', '=', $job->id)->get()->first();
        return Inertia::render('Admin/Jobs/Edit', [
            'job' => $data,
            'skills' => $skill,
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
    public function update(Request $request, Job $job)
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
            'company_id' => 'required',
            'status_id' => 'required',
            'pic_company_id' => 'required'

        ]);
        foreach($request->skill as $skill) {
			$job->skills()->attach($skill);
        }

        $job->update($validate);
        return redirect()->route('admin.jobs');
		
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Job $job)
    {
        $job->update([
            'status_id' => 7
        ]);
        $job->delete();

        if(auth()->user()->role_id === 1) {
            return redirect()->route('admin.jobs')->with('status', 'Pekerjaan berhasil dihapus');
        } else {
            return redirect()->route('client.job')->with('status', 'Pekerjaan berhasil dihapus');
        }
    }

    public function restore(Job $job)
    {
        $job->restore();
        if(auth()->user()->role_id === 1) {
            return redirect()->route('admin.jobs')->with('status', 'Pekerjaan berhasil dikembalikan.');
        } else {
            return redirect()->route('client.job')->with('status', 'Pekerjaan berhasil dikembalikan.');
        }
    }

    public function forceDestroy(Job $job)
    {
        $job->forceDelete();
        if(auth()->user()->role_id === 1) {
            return redirect()->route('admin.jobs')->with('status', 'Pekerjaan berhasil dikembalikan.');
        } else {
            return redirect()->route('client.job')->with('status', 'Pekerjaan berhasil dikembalikan.');
        }
    }
}
