<?php

namespace App\Models;

use App\Events\HistoriaCreated;
use App\HasStatus;
use App\Status;
use App\StatusHolder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Support\Facades\Auth;

/**
 * @property string $id the UUID
 * @property string $paciente_id the patient model related to the medical record
 * @property string $numero the id assigned by admision
 * @property string $motivo_consulta the reason for the consultation
 * @property string $enfermedad_actual current disease
 * @property string $autor_id the author for the medical record
 * @property Status $status the status
 * @property Correccion $correcciones
 */
class Historia extends Model implements StatusHolder
{
    use HasFactory;
    use HasUuids;
    use HasStatus;

    const HISTORIA_DIR = 'historias/';

    protected $attributes = [
        'numero' => null,
        'motivo_consulta' => '',
        'enfermedad_actual' => '',
    ];

    protected $fillable = [
        'status',
        'motivo_consulta',
        'enfermedad_actual',
        'autor_id',
    ];

    protected $dispatchesEvents = [
        'created' => HistoriaCreated::class
    ];

    /**
     * @return string[]
     */
    public function getVisible(): array
    {
        /* @var User $user */
        $user = Auth::user();

        if (!isset($user)) {
            return $this->visible;
        }

        if ($this->autor_id === $user->id) {
            return [];
        }

        if ($user->isAdmin() OR $user->isAdmision()) {
            return [];
        }

        return $this->visible;
    }

    protected $visible = [
        'id',
        'paciente_id',
        'autor_id',
        'numero',
    ];

    protected function casts()
    {
        return [
            'status' => Status::class
        ];
    }

    public function autor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'autor_id', 'id');
    }

    public function paciente(): BelongsTo
    {
        return $this->belongsTo(Paciente::class);
    }

    public function antFamiliares(): HasOne
    {
        return $this->hasOne(AntFamiliares::class);
    }

    public function antPersonales(): HasOne
    {
        return $this->hasOne(AntPersonales::class);
    }

    public function trastornos(): HasOne
    {
        return $this->hasOne(Trastornos::class);
    }

    public function historiaOdontologica(): HasOne
    {
        return $this->hasOne(HistoriaOdontologica::class);
    }

    public function correcciones():HasOne
    {
        return $this->hasOne(Correccion::class);
    }
}
