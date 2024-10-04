<?php

namespace App\Models\Group;

use App\Models\Group;
use App\ValueObjects\Group\Homework;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;


/**
 * @property string $id
 * @property string $group_id
 * @property string $name
 * @property string $description
 * @property string $homework
 */
class Assignment extends Model
{
    use HasFactory;
    use HasUlids;

    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'assignments';

    protected $attributes = [
        'homework' => '[]',
    ];

    protected $fillable = [
        'name',
        'description',
    ];

    protected function homework(): Attribute
    {
        return Attribute::make(
            get: fn (array $values) => collect($values)->map(fn (array $homework) => new Homework($homework['user_id'], $homework['documents'], $homework['created_at'])),
            set: fn (Collection $values) => $values->map(fn (Homework $homework) => [
                'user_id' => $homework->user_id,
                'documents' => $homework->documents,
                'created_at' => $homework->created_at,
            ])
        );
    }

    protected $casts = [
        'homework' => AsArrayObject::class
    ];

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'group_id', 'id');
    }
}
