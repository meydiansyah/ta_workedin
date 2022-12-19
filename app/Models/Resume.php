<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    use HasFactory;
    use SoftDeletes;


    protected $fillable = [
		'file',
        'job_id',
        'freelance_id',
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
        return $this->belongsToMany(Job::class);
    }

    /**
     * Get Freelance Data
     */
    public function freelance()
    {
        return $this->belongsTo(Freelance::class, 'freelance_id');
    }

    public function freelances()
    {
        return $this->belongsToMany(Freelance::class);
    }
}
