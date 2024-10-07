<?php

namespace App\Models\Group;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

/**
 * @property string $id
 * @property string $user_id
 * @property string $assignment_id
 * @property Collection $documents
 */
class Homework extends Model
{
    use HasFactory;
    use HasUlids;

    protected $primaryKey = 'id';
    protected $table = 'homeworks';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'documents',
    ];

    protected $attributes = [
        'documents' => '[]'
    ];

    protected $casts = [
        'documents' => 'collection'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function assignment(): BelongsTo
    {
        return $this->belongsTo(Assignment::class, 'assignment_id', 'id');
    }
}
