<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
	public function village()
    {
        return $this->belongsTo(Village::class, 'village_id');
    }

    public function villages()
    {
        return $this->belongsToMany(Village::class);
    }

	public function district()
    {
        return $this->belongsTo(District::class, 'district_id');
    }

    public function districts()
    {
        return $this->belongsToMany(District::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id');
    }

    public function cities()
    {
        return $this->belongsToMany(City::class);
    }

    public function province()
    {
        return $this->belongsTo(Proivnce::class, 'province_id');
    }

    public function proivnces()
    {
        return $this->belongsToMany(Province::class);
    }

}
