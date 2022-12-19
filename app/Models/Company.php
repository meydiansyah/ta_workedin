<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
     * Get PIC Company Data
     */
    public function typeCompany()
    {
        return $this->belongsTo(TypeCompany::class, 'type_company_id');
    }

    public function typeCompanies()
    {
        return $this->belongsToMany(TypeCompany::class);
    }

     /**
     * Get Location Data
     */
	public function location()
	{
		return $this->belongsTo(Location::class);
	}

}
