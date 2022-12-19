<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class University extends Model
{
    use HasFactory;
	use SoftDeletes;

	protected $fillable = [
		'name',
		'email',
		'phone',
		'fax',
		'logo',
		'url',
		'full_address',
		'village_id',
		'district_id',
		'city_id',
		'province_id',
	];


	public function location()
	{
		return $this->belongsTo(Location::class);
	}
}
