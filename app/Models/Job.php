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

    /**
     * Search Job
    */
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
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
        return $this->belongsToMany(Status::class);
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
        return $this->belongsToMany(Company::class);
    }
}
