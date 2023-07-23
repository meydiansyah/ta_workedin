<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Resume extends Model
{
    use HasFactory;
    use SoftDeletes;


    protected $fillable = [
		'file',
        'job_id',
        'freelance_id',
    ];

    protected $casts = [
        'job_id' => 'integer',
        'freelance_id' => 'integer',
    ];

    /**
     * Get Job Data
     */
    public function job()
    {
        return $this->belongsTo(Job::class, 'job_id');
    }

    public function jobs()
    {
        return $this->belongsToMany(Job::class, 'job_resume', 'resume_id', 'job_id');
    }

    public function statuses()
    {
        return $this->belongsToMany(Status::class, 'resume_status', 'resume_id', 'status_id');
    }

    /**
     * Get Freelance Data
     */
    public function freelance()
    {
        return $this->belongsTo(Freelance::class, 'freelance_id');
    }

}
