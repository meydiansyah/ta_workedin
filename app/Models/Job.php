<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Job extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'salary',
        'image_url',
        'status',
		'status_id',
		'company_id',
    ];
    
    protected $casts = [
        'status_id' => 'integer',
        'company_id' => 'integer',
	];

    /**
     * Search Job
    */
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', '%' . $search . '%')
                    ->orWhere('company.name', '%' . $search. '%');
            });
        });
    }

    /**
     * Get Status Data
     */
    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

    public function statuses()
    {
        return $this->belongsToMany(Status::class, 'job_status', 'job_id', 'id');
    }

    /**
     * Get Company Data
     */
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'job_company', 'job_id', 'company_id');
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'job_skills', 'job_id', 'skill_id');
    }

    public function resumes()
    {
        return $this->belongsToMany(Resume::class, 'job_resume', 'job_id', 'resume_id');
    }
}
