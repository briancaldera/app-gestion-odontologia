<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Models\AcademicTerm
 *
 * @property string $id
 * @property string $name
 * @property string $code
 * @property Carbon $start_date
 * @property Carbon $end_date
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class AcademicTerm extends Model
{
    use HasUuids;

    protected $table = 'academic_terms';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'code',
        'start_date',
        'end_date',
    ];

    public static array $actions = [
        'academic-terms' => [
            'full-control' => [
                'name' => 'full-control',
                'display_name' => 'Full control sobre los periodos académicos',
                'description' => 'Full control sobre el modelo de periodos académicos',
            ],
            'create' => [
                'name' => 'create',
                'display_name' => 'Crear periodos académicos',
                'description' => 'Crear periodos académicos',
            ],
            'read' => [
                'name' => 'read',
                'display_name' => 'Ver periodos académicos',
                'description' => 'Ver periodos académicos',
            ],
            'update' => [
                'name' => 'update',
                'display_name' => 'Actualizar periodos académicos',
                'description' => 'Actualizar periodos académicos',
            ],
            'delete' => [
                'name' => 'delete',
                'display_name' => 'Eliminar periodos académicos',
                'description' => 'Eliminar periodos académicos',
            ],
            'index-all' => [
                'name' => 'index-all',
                'display_name' => 'Listar todos los periodos académicos',
                'description' => 'Listar todos los periodos académicos',
            ],
        ]
    ];
}
