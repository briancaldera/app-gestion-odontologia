<?php

namespace App\Models\Endodoncia;

use App\Casts\Endodoncia\Anamnesis;
use App\HasStatus;
use App\Models\Paciente;
use App\Models\User;
use App\Status;
use App\StatusHolder;
use App\ValueObjects\Endodoncia\Anamnesis as AnamnesisValueObject;
use Illuminate\Database\Eloquent\Casts\ArrayObject;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property AnamnesisValueObject $anamnesis
 * @property Collection $evaluacion_dolor
*/
class HistoriaEndodoncia extends Model implements StatusHolder, HasMedia
{
    use HasFactory;
    use HasUuids;
    use HasStatus;
    use InteractsWithMedia;

    protected $table = 'historia_endodoncias';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'status',
        'autor_id'
    ];

    protected $attributes = [
        'anamnesis' => <<<'JSON'
{
  "visita_medico_ultimos_6_meses": {
    "status": null,
    "description": null
  },
  "bajo_tratamiento_actual": {
    "status": null,
    "description": null
  },
  "alergia_medicamento": {
    "status": null,
    "description": null
  },
  "alergia_material_dental": {
    "status": null,
    "description": null
  },
  "hospitalizado_alguna_vez": {
    "status": null,
    "description": null
  },
  "odontologo_ultimos_6_meses": {
    "status": null,
    "description": null
  },
  "sangrado_al_cepillar": {
    "status": null,
    "description": null
  },
  "abultamiento_diente": {
    "status": null,
    "description": null
  },
  "rechina_aprieta_dientes": {
    "status": null,
    "description": null
  },
  "dolor_CATM": {
    "status": null,
    "description": null
  },
  "sangrado_excesivo_corte": {
    "status": null,
    "description": null
  },
  "dificultad_cicatrizacion": {
    "status": null,
    "description": null
  },
  "cigarrillo_tabaco": {
    "status": null,
    "description": null
  },
  "alergia_alimento": {
    "status": null,
    "description": null
  },
  "alergia_enlatados": {
    "status": null,
    "description": null
  },
  "alergia_yodo": {
    "status": null,
    "description": null
  },
  "reaccion_anestesia": {
    "status": null,
    "description": null
  },
  "embarazo": {
    "status": null,
    "description": null
  },
  "enfermedades": {
    "list": [],
    "resumen_ant_personales": null
  },
  "enfermedades_familiares": {
    "resumen_ant_familiares": null,
    "examen_comp": null
  }
}
JSON,
        'evaluacion_dolor' => <<<'JSON'
{
  "dolor_presente": {
    "status": null,
    "description": null
  },
  "diente_dolor": {
    "status": null,
    "description": null
  },
  "primeros_sintomas": null,
  "aparicion_sintomas": null,
  "intensidad_frecuencia_calidad_dolor": {
    "intensidad": null,
    "frecuencia": null,
    "calidad": null
  },
  "alivio_dolor": {
    "status": null,
    "description": null
  },
  "farmaco_alivio_dolor": {
    "status": null,
    "description": null
  },
  "agravo_dolor": {
    "status": null,
    "description": null
  },
  "diente_sensible_al_comer": [],
  "dolor_al_masticar": {
    "status": null,
    "description": null
  },
  "dolor_momento_dia": null
}
JSON,
        'secuencia_tratamiento' => /** @lang JSON */
        '[]',
    ];

    protected function casts()
    {
        return [
            'status' => Status::class,
            'anamnesis' => Anamnesis::class,
            'evaluacion_dolor' => 'collection',
            'secuencia_tratamiento' => 'collection',
        ];
    }

    protected $appends = [
        'consentimiento',
        'periodontodiagrama',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('consentimiento')->useDisk('endodoncia-historias-consentimientos')->singleFile();
        $this->addMediaCollection('periodontodiagrama')->useDisk('endodoncia-historias-periodontodiagramas')->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    protected function consentimiento(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getMedia('consentimiento')->map(fn(Media $media) => url("/endodoncia/historias/$this->id/consentimiento/$media->uuid"))->first()
        );
    }

    protected function periodontodiagrama(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getMedia('periodontodiagrama')->map(fn(Media $media) => url("/endodoncia/historias/$this->id/periodontodiagrama/$media->uuid"))->first()
        );
    }

    public function autor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'autor_id', 'id');
    }

    public function paciente(): BelongsTo
    {
        return $this->belongsTo(Paciente::class);
    }

    public function fichasEndodonticas(): HasMany
    {
        return $this->hasMany(FichaEndodoncia::class, 'historia_endodoncia_id', 'id');
    }

    public static array $actions = [
        'historias-endodoncia' => [
            'full-control' => [
                'name' => 'full-control',
                'display_name' => 'Full control sobre las historias de endodoncia',
                'description' => 'Full control sobre el modelo de historia de endodoncia'
            ],
            'index-all' => [
                'name' => 'index-all',
                'display_name' => 'Indexar todas las HE',
                'description' => 'Indexar todas las historias de endodoncia de todos los usuarios'
            ],
            'create' => [
                'name' => 'create',
                'display_name' => 'Crear HE',
                'description' => 'Crear historias de endodoncia'
            ],
            'read' => [
                'name' => 'read',
                'display_name' => 'Ver HE',
                'description' => 'Ver una historia de endodoncia en particular'
            ],
            'read-private' => [
                'name' => 'read-private',
                'display_name' => 'Ver información privada',
                'description' => 'Ver información privada sobre una historia de endodoncia'
            ],
            'update' => [
                'name' => 'update',
                'display_name' => 'Actualizar HE',
                'description' => 'Actualizar una historia de endodoncia'
            ],
            'delete' => [
                'name' => 'delete',
                'display_name' => 'Eliminar HE',
                'description' => 'Eliminar una historia de endodoncia'
            ],
            'update-status' => [
                'name' => 'update-status',
                'display_name' => 'Actualizar el estado',
                'description' => 'Actualizar el estado de una historia de endodoncia'
            ],
            'assign-id' => [
                'name' => 'assign-id',
                'display_name' => 'Asignar número de HE',
                'description' => 'Asignar número a una historia de endodoncia'
            ],
            'assign-semester' => [
                'name' => 'assign-semester',
                'display_name' => 'Asignar semestre',
                'description' => 'Asignar semestre a la HE'
            ],
            'approve-treatment' => [
                'name' => 'approve-treatment',
                'display_name' => 'Aprobar tratamiento',
                'description' => 'Aprobar tratamiento en la secuencia de tratamiento'
            ],
        ]
    ];
}
