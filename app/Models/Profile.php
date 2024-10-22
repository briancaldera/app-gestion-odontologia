<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @property string $user_id
 * @property string $nombres
 * @property string $apellidos
 * @property Date $fecha_nacimiento
 * @property string $telefono
 * @property string $direccion
 * @property string $sexo
 * @property string $cedula
 */
class Profile extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    protected $table = 'profiles';
    protected $primaryKey = 'user_id';
    protected $keyType = 'string';
    public $incrementing = false;


    protected function direccion(): Attribute
    {
        return Attribute::set(fn(?string $value) => is_null($value) ? '' : $value);
    }

    protected function telefono(): Attribute
    {
        return Attribute::set(fn(?string $value) => is_null($value) ? '' : $value);
    }

    protected function picture(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getMedia('user-profile-picture')->map(fn(Media $media) => url("profiles/$this->user_id/pictures/$media->uuid"))->first()
        );
    }

    protected $appends = [
        'picture'
    ];

    protected $fillable = [
        'nombres',
        'apellidos',
        'fecha_nacimiento',
        'telefono',
        'direccion',
        'sexo',
        'cedula',
    ];

    protected $casts = [
        'fecha_nacimiento' => 'date'
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
        $this->addMediaCollection('user-profile-picture')->useDisk('users-profiles-pictures')->singleFile();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
