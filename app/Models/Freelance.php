<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Jetstream\HasProfilePhoto;

class Freelance extends Model
{
    use HasFactory;
    use HasProfilePhoto;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'image_url',
        'email',
        'phone',
        'nik',
        'nim',
        'major_code',
        'pt_code',
        'rating',
        'full_address',
        'village_id',
        'district_id',
        'city_id',
        'province_id',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'image_url',
    ];

    /**
     * Get Full Name
     */
    public function getFullName()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    /**
     * Search user
    */
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('first_name', 'like', '%' . $search . '%')
                    ->orWhere('last_name', 'like', '%' . $search . '%')
                    ->orWhere('nim', 'like', '%' . $search . '%')
                    ->orWhere('nik', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            });
        })->when($filters['major'] ?? null, function ($query, $major) {
            $query->whereMajor($major);
        });
    }

    /**
     * Get User Data
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Get Location Data
     */
	public function location() 
	{
		return $this->belongsTo(Location::class);
	}

	/**
     * Get Major Data
     */
    public function major()
    {
        return $this->belongsTo(Major::class, 'major_code');
    }

    public function majors()
    {
        return $this->belongsToMany(Major::class);
    }

	
	/**
     * Get University Data
     */
    public function university()
    {
		return $this->belongsTo(University::class, 'pt_code');
    }

    public function universities()
    {
        return $this->belongsToMany(University::class);
    }
}
