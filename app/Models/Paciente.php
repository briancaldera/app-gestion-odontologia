<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Support\Facades\Date;

/**
 * @property string $id the id.
 * @property string $cedula the national id. Unique.
 * @property string $nombre the firstname.
 * @property string $apellido the lastname.
 * @property int $edad the age
 * @property string $sexo the gender. Either M or F.
 * @property float $peso the weight.
 * @property Date $fecha_nacimiento the birthdate.
 * @property string $ocupacion the occupation or job title.
 * @property string $direccion the residential address.
 * @property string $telefono the contact phone.
 * @property ?string $foto_url the url that points to the picture file.
 * @property Date $created_at the datetime when this model was created.
 * @property Date $updated_at the datetime when this model was last updated.
 */
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
        'foto_url',
    ];

    /**
     * Retrieve the related medical record.
     */
    public function historia(): HasOne
    {
        return $this->hasOne(Historia::class);
    }
}
