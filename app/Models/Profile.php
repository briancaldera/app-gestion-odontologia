<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;

/**
 * @property string $user_id
 * @property string $nombres
 * @property string $apellidos
 * @property Date $fecha_nacimiento
 * @property string $telefono
 * @property string $direccion
 * @property string $sexo
 * @property string $cedula
 * @property string $picture_url
 */
class Profile extends Model
{
    use HasFactory;

    protected function direccion(): Attribute
    {
        return Attribute::set(fn(?string $value) => is_null($value) ? '' : $value);
    }

    protected function telefono(): Attribute
    {
        return Attribute::set(fn(?string $value) => is_null($value) ? '' : $value);
    }

    protected function pictureUrl(): Attribute
    {
        return Attribute::get(fn(?string $value) => is_null($value) ? $value : Storage::url($value));
    }

    protected $primaryKey = 'user_id';
    public $incrementing = false;

    protected $fillable = [
        'nombres',
        'apellidos',
        'fecha_nacimiento',
        'telefono',
        'direccion',
        'sexo',
        'cedula',
        'picture_url',
    ];

    protected $casts = [
        'fecha_nacimiento' => 'date'
    ];

    public function getVisible(): array
    {
        /* @var User $user*/
        $user = auth()->user();

        if (!isset($user)) {
            return $this->visible;
        }

        if ($user->id === $this->id) {
            return [];
        }

        if ($user->isAdmin() OR $user->isAdmision()) {
            return [];
        }

        return $this->visible;
    }

    protected $visible = [
        'nombres',
        'apellidos',
        'picture_url',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
