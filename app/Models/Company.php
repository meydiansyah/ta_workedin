<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Province;
use Laravolt\Indonesia\Models\Village;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'logo',
        'fax',
        'phone',
		'type_company_id',
		// 'pic_company_id',
        'rating',
        'full_address',
        'village_id',
        'district_id',
        'city_id',
        'province_id',
    ];

    /**
     * Search Company
    */
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            });
        });
    }

    /**
     * Get Type Company Data
     */
    public function typeCompany()
    {
        return $this->belongsTo(TypeCompany::class, 'type_company_id', 'id');
    }
    
    /**
     * Get Type PICCompany Data
     */
    public function companyPic()
    {
        // return $this->belongsTo(PicCompany::class, 'company_id', 'id');
        return $this->belongsToMany(PicCompany::class, 'company_pic', 'company_id', 'pic_company_id');
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

}
