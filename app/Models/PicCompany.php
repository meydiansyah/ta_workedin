<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Province;
use Laravolt\Indonesia\Models\Village;

class PicCompany extends Model
{
    use HasFactory;

    protected $appends = [
        'full_name'
    ];

	protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
		'phone',
        'email',
        'company_id',
        'title',
        'image_url',
        'nip',
        'nik',
        'full_address',
        'village_id',
        'district_id',
        'city_id',
        'province_id'
    ];

    /**
     * Search PIC Company
    */
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('first_name', 'like', '%' . $search . '%')
                    ->orWhere('last_name', 'like', '%' . $search . '%')
                    ->orWhere('nip', 'like', '%' . $search . '%')
                    ->orWhere('nik', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            });
        });
    }

    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn ($value, $attributes) => ucfirst($attributes['first_name']). " ". ucfirst($attributes['last_name']),
        );
    }

    /**
     * Get User Data
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function company() 
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

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

    public function companyPic()
    {
        return $this->belongsToMany(PicCompany::class, 'company_pic', 'pic_company_id', 'company_id');
    }
}
