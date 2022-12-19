<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PicCompany extends Model
{
    use HasFactory;

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

}
