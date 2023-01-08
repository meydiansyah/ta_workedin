<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

	protected $fillable = ['name'];

	public function freelances()
	{
		return $this->belongsToMany(Freelance::class);
	}

	public function jobs()
	{
		return $this->belongsToMany(Job::class);
	}
}
