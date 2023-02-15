<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Jetstream\HasProfilePhoto;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Province;
use Laravolt\Indonesia\Models\Village;

class Freelance extends Model
{
    use HasFactory;
    use HasProfilePhoto;
    use SoftDeletes;

	public $table = 'freelances';

    protected $appends = [
        'full_name'
    ];

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'image_url',
        'email',
        'phone',
        'nik',
        'bio',
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
    // protected $appends = [
    //     'image_url',
    // ];

    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn ($value, $attributes) => ucfirst($attributes['first_name']). " ". ucfirst($attributes['last_name']),
        );
    }

    /**
     * Get Full Name
     */
    // public function getFullName()
    // {
    //     return $this->first_name . ' ' . $this->last_name;
    // }

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
	public function village()
    {
        return $this->belongsTo(Village::class, 'village_id');
    }

	public function district()
    {
        return $this->belongsTo(District::class, 'district_id');
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id');
    }

    public function province()
    {
        return $this->belongsTo(Province::class, 'province_id');
    }

	/**
     * Get Major Data
     */
    public function major()
    {
        return $this->belongsTo(Major::class, 'major_code', 'code');
    }

    public function majors()
    {
        return $this->belongsToMany(Major::class, 'freelance_majors', 'freelance_id', 'major_code');
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
        return $this->belongsToMany(University::class, 'freelance_universities', 'freelance_id', 'pt_code');
    }

    public function skills() {
        return $this->belongsToMany(Skill::class, 'freelance_skills', 'freelance_id', 'skill_id');
    }

    public function reviews() {
        return $this->belongsToMany(Review::class, 'freelance_reviews', 'freelance_id', 'review_id');
    }
}
