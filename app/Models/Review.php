<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

	protected $fillable = [
		'rating',
		'content',
	];

	public function freelances()
	{
		return $this->belongsToMany(Freelance::class);
	}

	public function companies()
	{
		return $this->belongsToMany(Company::class);
	}
}
