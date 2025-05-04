<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Autor extends Model
{

    use HasFactory;
    
    public function libros ()
    {
        return $this->hasMany(Libro::class);
    }
}


