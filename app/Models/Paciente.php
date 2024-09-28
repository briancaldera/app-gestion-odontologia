<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

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
 * @property string $motivo_consulta
 * @property string $enfermedad_actual
 * @property array $foto the url that points to the picture file.
 * @property string $registered_by the user who registered the patient.
 * @property string $assigned_to the user assigned to treat this patient.
 * @property Date $created_at the datetime when this model was created.
 * @property Date $updated_at the datetime when this model was last updated.
 */
class Paciente extends Model implements HasMedia
{
    use HasFactory;
    use HasUuids;
    use InteractsWithMedia;

    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'pacientes';

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
    ];

    protected $appends = [
        'foto'
    ];

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('foto')->useDisk('pacientes')->singleFile()->acceptsMimeTypes(['image/jpeg', 'image/png']);
    }

    protected function foto(): Attribute
    {
        return new Attribute(
            get: function () {
                $media = $this->getFirstMedia('foto');

                if (isset($media)) return url("pacientes/$this->id/foto/$media->uuid");

                return null;
            }
//            get: () => $this->getFirstMedia('foto')->map(fn(Media $media) => url("pacientes/$this->id/foto/$media->uuid"))
        );
    }

    /**
     * Retrieve the related medical record.
     */
    public function historia(): HasOne
    {
        return $this->hasOne(Historia::class);
    }

    public function medicoTratante(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to', 'id');
    }
}
