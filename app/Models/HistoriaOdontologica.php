<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\ArrayObject;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @property string $historia_id the medical record id
 * @property string $ant_personales the dental history
 * @property ArrayObject $habitos the manners of the patient
 * @property ArrayObject $portador
 * @property ArrayObject $examen_fisico the information about the physical examination
 * @property ArrayObject $estudio_modelos the models examination
 * @property ArrayObject $plan_tratamiento the treatment plan
 * @property ArrayObject $modificaciones_plan_tratamiento the modifications to the treatment plan
 * @property ArrayObject $secuencia_tratamiento the sequence of treatments undergone by the patient
 * @property ArrayObject $examen_radiografico
 * @property ArrayObject $historia_periodontal
 * @property Collection<string> $panoramicas
 */
class HistoriaOdontologica extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    public $timestamps = false;

    protected $attributes = [
        'ant_personales' => null,
        'habitos' => <<<'JSON'
{
        "alcohol": false,
        "bruxismo": false,
        "bruxomania": false,
        "deglusion_atip": false,
        "drogas": false,
        "fumar": false,
        "onicofagia": false,
        "otros": false,
        "palillos": false,
        "queilofagia": false,
        "respirador_bucal": false,
        "succion_digital": false,
        "descripcion": ""
    }
JSON,
        'portador' => <<<'JSON'
{
        "ortodoncia": false,
        "protesis": false
    }
JSON,
        'examen_fisico' => <<<'JSON'
{
        "examen_extraoral": {
            "articulacion_temporomandibular": "",
            "cabeza": "",
            "cara": "",
            "lesiones_extraorales": "",
            "palpacion_ganglios": "",
            "piel": "",
            "simetria_facial": ""
        },
        "examen_intraoral": {
            "dientes": "",
            "discromias": "",
            "encias": "",
            "frenillos": "",
            "labios": "",
            "lengua_tipo": "",
            "maxilares": "",
            "mejillas": "",
            "paladar_duro_blando": "",
            "piso_boca": ""
        },
        "signos_vitales": {
            "pulso": 0,
            "respiracion": 0,
            "temperatura": 0,
            "tension_arterial": {
                "diastole": 0,
                "sistole": 0
            }
        }
    }
JSON,
        'estudio_modelos' => <<<'JSON'
{
        "examenes_comp": "",
        "interconsultas": {
            "cirugia": false, "endodoncia": false, "ortodoncia": false, "periodoncia": false, "protesis": false, "descripcion": ""
        },
        "maxilar_sup": {
            "tipo_arco": "",
            "forma_arco": "",
            "simetria_arco": "",
            "paladar": "",
            "maloclusion": "",
            "dientes_ausentes": "",
            "facetas_desgaste": "",
            "diastemas": "",
            "anomalia": ""
        },
        "maxilar_inf": {
            "tipo_arco": "",
            "forma_arco": "",
            "simetria_arco": "",
            "piso_boca": "",
            "maloclusion": "",
            "dientes_ausentes": "",
            "facetas_desgaste": "",
            "diastemas": "",
            "anomalia": ""
        },
        "modelos_oclusion": {
            "linea_media": "",
            "sobresalte": "",
            "sobrepase": "",
            "relacion_canina": "",
            "relacion_molar": "",
            "mordida_anterior": "",
            "mordida_posterior": "",
            "curva_compensacion": "",
            "plano_oclusal": ""
        },
        "diagnostico": "",
        "pronostico": ""
    }
JSON,
        'plan_tratamiento' => '[]',
        'modificaciones_plan_tratamiento' => '[]',
        'secuencia_tratamiento' => '[]',
        'examen_radiografico' => <<<'JSON'
{
  "interpretacion_panoramica": {
    "nasomaxilar": null,
    "ATM": null,
    "mandibular": null,
    "dento_alveolar_sup": null,
    "dento_alveolar_inf": null
  },
  "interpretacion_periapicales":  null,
  "interpretacion_coronales": null
}
JSON,
        'historia_periodontal' => /* @lang JSON */
            '{
"higiene_bucal": {
  "frecuencia_cepillado": null,
  "tipo_cepillo": null,
  "metodo_cepillado": null,
  "metodo_auxiliar": {
    "hilo_dental": false,
    "enjuague_bucal": false,
    "hidroterapia": false,
    "cepillo_interdental": false
  },
  "sustancia_reveladora": {
    "descripcion": null,
    "otro": null
  },
  "cepillado_lengua": null
},
"control_higiene_bucal": {
  "tecnica_cepillado_ensenada": null,
  "cepillo_recomendado": null,
  "metodos_auxiliares_requeridos": null,
  "placa_bacteriana_lengua": false,
  "control_halitosis": null,
  "tratamiento": null
}
}'
    ];

    protected $fillable = [
        'habitos',
        'portador',
        'examen_fisico',
        'estudio_modelos',
        'plan_tratamiento',
        'modificaciones_plan_tratamiento',
        'secuencia_tratamiento',
        'examen_radiografico',
    ];

    protected $appends = [
        'panoramicas',
        'coronales',
        'periapicales',
        'periodontodiagrama',
        'anymedia'
    ];

    protected function casts()
    {
        return [
            'habitos' => AsArrayObject::class,
            'portador' => AsArrayObject::class,
            'examen_fisico' => AsArrayObject::class,
            'estudio_modelos' => AsArrayObject::class,
            'plan_tratamiento' => AsArrayObject::class,
            'modificaciones_plan_tratamiento' => AsArrayObject::class,
            'secuencia_tratamiento' => AsArrayObject::class,
            'examen_radiografico' => AsArrayObject::class,
            'historia_periodontal' => AsArrayObject::class,
        ];
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('panoramicas')->useDisk('panoramicas');
        $this->addMediaCollection('coronales')->useDisk('coronales');
        $this->addMediaCollection('periapicales')->useDisk('periapicales');
        $this->addMediaCollection('periodontodiagrama')->useDisk('periodontodiagramas')->singleFile();
        $this->addMediaCollection('anymedia')->useDisk('odontologica-media');
    }

    public function historia(): BelongsTo
    {
        return $this->belongsTo(Historia::class);
    }

    protected function panoramicas(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getMedia('panoramicas')->map(fn(Media $media) => url("historias/$this->historia_id/odontologica/panoramicas/$media->uuid"))
        );
    }

    protected function coronales(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getMedia('coronales')->map(fn(Media $media) => url("historias/$this->historia_id/odontologica/coronales/$media->uuid"))
        );
    }

    protected function periapicales(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getMedia('periapicales')->map(fn(Media $media) => url("historias/$this->historia_id/odontologica/periapicales/$media->uuid"))
        );
    }

    protected function periodontodiagrama(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getMedia('periodontodiagrama')->map(fn(Media $media) => url("historias/$this->historia_id/odontologica/periodontodiagrama/$media->uuid"))
        );
    }

    protected function anymedia(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getMedia('anymedia')->map(fn(Media $media) => url("historias/$this->historia_id/odontologica/media/$media->uuid"))
        );
    }
}
