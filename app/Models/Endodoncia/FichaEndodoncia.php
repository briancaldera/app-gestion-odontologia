<?php

namespace App\Models\Endodoncia;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class FichaEndodoncia extends Model implements HasMedia
{
    use HasFactory;
    use HasUuids;
    use InteractsWithMedia;

    protected $table = 'ficha_endodoncias';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'diente',
        'data',
        'pruebas_diagnosticas',
        'radiografias_data'
    ];

    protected $attributes = [
        'data' => <<<'JSON'
{
  "sintomas": null,
  "signos": null,
  "interpretacion_radiografica": null,
  "etiologia": []
}
JSON,
        'pruebas_diagnosticas' => <<<'JSON'
{
  "examen_tejidos_periodontales": [],
  "pruebas_vitalidad_pulpar": [],
  "diagnostico_presuntivo": null,
  "diagnostico_definitivo": null,
  "morfologia_conducto": [],
  "tratamiento_conducto": [],
  "metodos_obturacion": [],
  "tecnica_preparacion_biomecanica": null,
  "preparacion_quimica": null,
  "numero_lima": null,
  "material_obturacion": null,
  "medicacion_justificacion": null,
  "observaciones": null
}
JSON,
        'radiografias_data' => <<<'JSON'
{
  "conductometria": {
    "conducto_unico": null,
    "vestibular": null,
    "palatino": null,
    "mesio_vestibular": null,
    "mesio_lingual": null,
    "distal": null,
    "disto_vestibular": null,
    "disto_lingual": null
  },
  "cono_patron": {
    "conducto_unico": null,
    "vestibular": null,
    "palatino": null,
    "mesio_vestibular": null,
    "mesio_lingual": null,
    "distal": null,
    "disto_vestibular": null,
    "disto_lingual": null
  }
}
JSON,
        ];

    protected function casts()
    {
        return [
            'data' => 'collection',
            'radiografias_data' => 'collection',
            'pruebas_diagnosticas' => 'collection',
        ];
    }

    protected $appends = [
        'radiografias_inicial',
        'radiografias_final',
        'radiografias_conductometria',
        'radiografias_cono',
        'radiografias_penachos',
    ];

    public function historiaEndodoncia(): BelongsTo
    {
        return $this->belongsTo(HistoriaEndodoncia::class, 'historia_endodoncia_id', 'id');
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
        $this->addMediaCollection('inicial')->useDisk('endodoncia-historias-fichas-radiografias-iniciales');
        $this->addMediaCollection('final')->useDisk('endodoncia-historias-fichas-radiografias-finales');
        $this->addMediaCollection('conductometria')->useDisk('endodoncia-historias-fichas-radiografias-conductometrias');
        $this->addMediaCollection('cono')->useDisk('endodoncia-historias-fichas-radiografias-conos');
        $this->addMediaCollection('penachos')->useDisk('endodoncia-historias-fichas-radiografias-penachos');
    }

    protected function radiografiasInicial(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getMedia('inicial')->map(fn(Media $media) => url("endodoncia/historias/$this->historia_endodoncia_id/fichas/$this->id/radiografias/iniciales/$media->uuid"))->first()
        );
    }

    protected function radiografiasFinal(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getMedia('final')->map(fn(Media $media) => url("endodoncia/historias/$this->historia_endodoncia_id/fichas/$this->id/radiografias/finales/$media->uuid"))->first()
        );
    }

    protected function radiografiasConductometria(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getMedia('conductometria')->map(fn(Media $media) => url("endodoncia/historias/$this->historia_endodoncia_id/fichas/$this->id/radiografias/conductometrias/$media->uuid"))
        );
    }

    protected function radiografiasCono(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getMedia('cono')->map(fn(Media $media) => url("endodoncia/historias/$this->historia_endodoncia_id/fichas/$this->id/radiografias/conos/$media->uuid"))
        );
    }

    protected function radiografiasPenachos(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getMedia('penachos')->map(fn(Media $media) => url("endodoncia/historias/$this->historia_endodoncia_id/fichas/$this->id/radiografias/penachos/$media->uuid"))
        );
    }
}
