<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'cedula',
        'nombre',
        'apellido',
        'edad',
        'sexo',
        'peso',
        'fecha_nacimiento',
        'ocupacion',
        'direccion',
        'telefono',
        'foto',
    ];
}
