<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $casts = [
        'codept' => 'integer',
        'major_code' => 'integer',
    ];

    protected $fillable = [
        'codept',
        'major_code',
        'nim'
    ];
}
