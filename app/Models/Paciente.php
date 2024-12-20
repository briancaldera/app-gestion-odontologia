<?php

namespace App\Models;

use App\Models\Cirugia\HistoriaCirugia;
use App\Models\Endodoncia\HistoriaEndodoncia;
use App\Observers\PacienteObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Casts\ArrayObject;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
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
 * @property ArrayObject $informacion_emergencia emergency information
 * @property string $registered_by the user who registered the patient.
 * @property string $assigned_to the user assigned to treat this patient.
 * @property Date $created_at the datetime when this model was created.
 * @property Date $updated_at the datetime when this model was last updated.
 */
#[ObservedBy([PacienteObserver::class])]
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
        'informacion_emergencia',
    ];

    protected $attributes = [
        'motivo_consulta' => null,
        'enfermedad_actual' => null,
        'informacion_emergencia' => <<<'JSON'
{
  "contacto": null,
  "telefono": null
}
JSON,
    ];

    protected function casts()
    {
        return [
            'informacion_emergencia' => AsArrayObject::class,
        ];
    }

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

    public function historiaEndodoncia(): HasOne
    {
        return $this->hasOne(HistoriaEndodoncia::class);
    }

    public function historiaCirugia(): HasOne
    {
        return $this->hasOne(HistoriaCirugia::class, 'paciente_id');
    }

    public function medicoTratante(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to', 'id');
    }

    public static array $actions = [
        'pacientes' => [
            'index-all' => [
                'name' => 'index-all',
                'display_name' => 'Indexar pacientes',
                'description' => 'Indexar a todos los pacientes del sistema'
            ],
            'create' => [
                'name' => 'create',
                'display_name' => 'Crear pacientes',
                'description' => 'Agregar un nuevo paciente al sistema'
            ],
            'read' => [
                'name' => 'read',
                'display_name' => 'Ver pacientes',
                'description' => 'Ver la información de un paciente'
            ],
            'read-private' => [
                'name' => 'read-private',
                'display_name' => 'Ver información privada',
                'description' => 'Ver la información privada de un usuario'
            ],
            'update' => [
                'name' => 'update',
                'display_name' => 'Actualizar pacientes',
                'description' => 'Actualizar la información de un paciente'
            ],
            'delete' => [
                'name' => 'delete',
                'display_name' => 'Eliminar pacientes',
                'description' => 'Eliminar a un paciente del sistema'
            ],
            'full-control' => [
                'name' => 'full-control',
                'display_name' => 'Full control sobre pacientes',
                'description' => 'Full control sobre el modelo de paciente'
            ],
        ]
    ];
}
