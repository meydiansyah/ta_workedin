<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Freelance;
use App\Models\Job;
use App\Models\PicCompany;
use App\Models\Resume;
use App\Models\Review;
use App\Models\University;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResumeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->user();
        if($user) {
            if($user->role_id === 1) {
                $resume = Resume::with(['job', 'job.company', 'job.company.reviews', 'freelance', 'freelance.reviews', 'statuses'])->paginate(7);
                // dd($resume);
            } else if($user->role_id === 2) {
                $resume = Resume::with(['job', 'job.company', 'job.company.reviews', 'job.company.companyPic', 'job.company.companyPic.user', 'job.company.typeCompany', 'freelance', 'freelance.user', 'freelance.reviews', 'statuses'])
                        ->whereRelation('job.company.companyPic', 'user_id', '=', $user->id)
                        ->latest()
                        ->paginate(7);
            } else {
                $freelance = Freelance::where('user_id', $user->id)->get()->first();
                $resume = Resume::with(['job', 'job.company', 'job.company.reviews', 'job.company.companyPic', 'job.company.companyPic.user', 'job.company.typeCompany', 'freelance', 'freelance.user', 'freelance.reviews', 'statuses'])
                        ->whereRelation('freelance', 'freelance_id', '=', $freelance->id)
                        ->latest()
                        ->paginate(7);
                        // return response()->json($resume);
            }
            return Inertia::render('Jobs/History', [
                'resume' => $resume,
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
        //
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
            "file" => "required|mimes:pdf|max:10000",
            'freelance_id' => 'numeric',
            'job_id' => 'numeric'
        ]);

        $freelance = Freelance::where('id', $request->freelance_id)->get()->first();

        if($request->file('file')) {
			$fileName = $freelance->fullName . '_' . time() . '.' . $request['file']->extension(); 
			$path = $request->file('file')->storeAs('resumes', $fileName, 'public');
			$validate['file'] = '/storage/'.$path;
		}

        $resume = Resume::create($validate);

        $resume->jobs()->sync($request->job_id);
        $resume->statuses()->sync(3);

        return redirect()->route('history.apply')->with('status', 'Berhasil mendaftarkan pekerjaan');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Resume $resume)
    {
        $resume = Resume::with(['statuses', 'freelance', 'job', 'job.company', 'job.company.companyPic', 'job.company.typeCompany', 'freelance.user', 'freelance.university', 'freelance.major', 'freelance.province', 'freelance.city', 'freelance.skills',
         'freelance.reviews' => function($q) {
            $q->latest();
         }, 
         'freelance.reviews.job', 'freelance.reviews.job.skills', 'freelance.reviews.job.company', 'freelance.reviews.job.company.typeCompany', 'freelance.reviews.job.company.companyPic', 'freelance.reviews.job.company.companyPic.user'])
                ->where('id', $resume->id)
                ->get()
                ->first();
        // $rating = $resume->freelance->reviews->whereNotNull('rating');
        // if($rating->isNotEmpty()) {
        //     $rating = $rating->avg('rating');
        //     dd($rating);
        // }
        $isVerified = $resume->freelance->skills->isNotEmpty() && $resume->freelance->university && $resume->freelance->user->email_verified_at;
        return Inertia::render('Client/Resumes/Detail', [
            'data' => $resume,
            'status' => $resume->statuses->first(),
            'is_verified' => $isVerified,
            'freelance' => $resume->freelance,
            'university' => $resume->freelance->university,
            'major' => $resume->freelance->major,
            'user' => $resume->freelance->user,
            'skills' => $resume->freelance->skills,
            'company' => $resume->job->company,
            'pic' => $resume->job->company->companyPic->first(),
            'reviews' => $resume->freelance->reviews
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Resume $resume)
    {
        $resume = Resume::with('statuses')->where('id', $resume->id)->get()->first();
        $resume->statuses()->sync($request->status);
        $freelance = Freelance::where('id', $request->freelance_id)->get()->first();

        if($request->status === 7) {
            if(isset($request->freelance_id)){
                $review = Review::create([
                    'rating' => $request->rating,
                    'content' => $request->content,
                    'job_id' => $request->job_id,
                ]);
                $job = Job::where('id', $resume->job_id)->get()->first();
                $job->update([
                    'status_id' => 9
                ]);
                $freelance->reviews()->attach($review->id);
                $f = Freelance::with('reviews')
                                    ->where('id', $request->freelance_id)
                                    ->whereRelation('reviews', 'freelance_id', '=', $request->freelance_id)
                                    ->get()
                                    ->first();
                                    // dd($f);
                $rating = $f->reviews->avg('rating');
                
                // $rating = Review::whereNotNull('rating')->get()->avg('rating');
                $freelance->update([
                    'rating' => $rating,
                ]);
                $university = University::where('codept', $freelance->pt_code)->get()->first();
                $fr = Freelance::where('pt_code', $freelance->pt_code)->get()->avg('rating');
                $university->update([
                    'rating' => $fr
                ]);
            }

            if(isset($request->company_id)) {
                $review = Review::create([
                    'rating' => $request->rating,
                    'content' => $request->content,
                    'job_id' => $request->job_id,
                ]);
                $job = Job::where('id', $resume->job_id)->get()->first();
                $job->update([
                    'status_id' => 9
                ]);
                $company = Company::where('id', $request->company_id)->get()->first();
                $company->reviews()->attach($review->id);                

                $company = Company::with('reviews')
                                    ->where('id', $request->company_id)
                                    ->whereRelation('reviews', 'company_id', '=', $request->company_id)
                                    ->get()
                                    ->first();

                $rating = $company->reviews->avg('rating');
                $company->update([
                    'rating' => $rating,
                ]);
            }
        }

        if($request->status === 6) {
            $review = Review::create([
                'content' => $request->content,
                'job_id' => $request->job_id
            ]);
            $company = Company::where('id', $request->company_id)->get()->first();
            $company->reviews()->attach($review->id); 
        }

        if($request->status === 8) {
            $review = Review::create([
                'content' => $request->content,
                'job_id' => $request->job_id
            ]);
            $freelance->reviews()->attach($review->id);
        }
        return redirect()->route('history.apply');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
