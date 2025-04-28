<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cupon extends Model
{
    protected $table = 'cupons';

    protected $fillable = [
        'codigo',
        'monto',
        'estado'       
    ];
}
