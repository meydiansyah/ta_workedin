<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Review extends Model
{
    use HasFactory;

	// protected $appends = [
    //     'full_name'
    // ];

	protected $fillable = [
		'rating',
		'content',
		'job_id',
	];

	protected $casts = [
        'rating' => 'double',
        'job_id' => 'integer',
	];

	// protected function fullName(): Attribute
    // {
    //     return Attribute::make(
    //         get: fn ($value, $attributes) => ucfirst($attributes['first_name']). " ". ucfirst($attributes['last_name']),
    //     );
    // }

	public function job()
	{
		return $this->belongsTo(Job::class, 'job_id');
	}

	public function freelances()
	{
		return $this->belongsToMany(Freelance::class, 'freelance_reviews', 'review_id', 'freelance_id');
	}

	public function companies()
	{
		return $this->belongsToMany(Company::class, 'company_reviews', 'review_id', 'company_id');
	}

	public function universities()
	{
		return $this->belongsToMany(University::class, 'university_reviews', 'review_id', 'university_id');
	}
}
