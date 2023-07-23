<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Province;
use Laravolt\Indonesia\Models\Village;

class University extends Model
{
	use HasFactory;
	use SoftDeletes;

	public $table = 'universities';

	protected $primaryKey = 'codept';

	protected $casts = [
        'rating' => 'double',
        'village_id' => 'integer',
        'district_id' => 'integer',
        'city_id' => 'integer',
        'province_id' => 'integer',
	];

	protected $fillable = [
		'codept',
		'name',
		'email',
		'phone',
		'fax',
		'logo',
		'url',
		'rating',
		'full_address',
		'village_id',
		'district_id',
		'city_id',
		'province_id',
	];


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

	// public function freelance()
	// {
	// 	return $this->belongsTo(Freelance::class, 'codept', 'pt_code');
	// }

	public function freelances()
	{
		return $this->belongsToMany(Freelance::class, 'freelance_universities', 'pt_code', 'freelance_id');
	}

	public function majors() {
		return $this->belongsToMany(Major::class, 'major_university', 'pt_code', 'major_id',);
	}
}
