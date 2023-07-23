<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Major extends Model
{
	use HasFactory;

	public $table = 'majors';

	// protected $primaryKey = 'code';
	// public $incrementing = false;

    // In Laravel 6.0+ make sure to also set $keyType
    // protected $keyType = 'string';


	protected $fillable = [
		'code',
		'name',
		'level',
		'accredity',
		'sk',
		'website',
		'date_standing',
		'pt_code',
	];

	public function university()
	{
		return $this->belongsTo(University::class, 'pt_code', 'codept');
	}

	public function universities()
	{
		return $this->hasMany(University::class);
	}

	public function freelances()
	{
		return $this->belongsToMany(Freelance::class, 'freelance_majors', 'major_id', 'freelance_id');
	}
}
