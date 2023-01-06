<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Major extends Model
{
	use HasFactory;

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
		return $this->belongsTo(University::class, 'pt_code');
	}

	public function universities()
	{
		return $this->belongsToMany(University::class);
	}
}
