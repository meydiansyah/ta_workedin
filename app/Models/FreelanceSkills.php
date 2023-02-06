<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreelanceSkills extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'freelance_id',
        'skill_id',
    ];

    public function freelance() {
        return $this->belongsTo(Freelance::class, 'freelance_id');
    }

    public function skill() {
        return $this->belongsTo(Skill::class, 'skill_id');
    }
}
