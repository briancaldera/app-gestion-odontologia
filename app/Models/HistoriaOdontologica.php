<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @property string $historia_id the medical record id
 * @property string $ant_personales the dental history
 * @property array|Json $habitos the manners of the patient
 * @property array|Json $examen_fisico the information about the physical examination
 * @property array|Json $estudio_modelos the models examination
 * @property array|Json $plan_tratamiento the treatment plan
 * @property array|Json $modificaciones_plan_tratamiento the modifications to the treatment plan
 * @property array|Json $secuencia_tratamiento the sequence of treatments undergone by the patient
 * @property array $examen_radiografico
 */
class HistoriaOdontologica extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    public $timestamps = false;

    protected $attributes = [
        'ant_personales' => null,
        'habitos' => '{}',
        'portador' => '{}',
        'examen_fisico' => '{}',
        'estudio_modelos' => '{}',
        'plan_tratamiento' => '[]',
        'modificaciones_plan_tratamiento' => '[]',
        'secuencia_tratamiento' => '[]',
        'examen_radiografico' => '{}'
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
        'panoramicas'
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
    }

    public function historia(): BelongsTo
    {
        return $this->belongsTo(Historia::class);
    }

    protected function panoramicas(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getMedia('panoramicas')->map(fn(Media $media) => $media->getFullUrl())
        );
    }
}
