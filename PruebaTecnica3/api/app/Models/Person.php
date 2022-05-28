<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{

    protected $table    = 'persons';
    protected $fillable = [
        'name',
        'last_name',
        'identification_type',
        'identification',
        'date_of_birth',
    ];
    use HasFactory;

}
