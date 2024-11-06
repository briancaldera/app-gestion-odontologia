<?php

namespace App\Models\Cirugia;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoriaCirugia extends Model
{
    use HasFactory;
    use HasUuids;

    protected $table = 'historia_cirugias';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'status',
        'autor_id',
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
  "hospitalizado_alguna_vez": {
    "status": null,
    "description": null
  },
  "enfermedad_sistemica": {
    "status": null,
    "description": null
  },
  "odontologo_ultimos_6_meses": {
    "status": null,
    "description": null
  },
  "dolor_ATM_levantarse": {
    "status": null,
    "description": null
  },
  "limitaciones_apertura_cierre_bucal": {
    "status": null,
    "description": null
  },
  "rechina_aprieta_dientes": {
    "status": null,
    "description": null
  },
  "sangrado_al_cepillar": {
    "status": null,
    "description": null
  },
  "miccion_nocturna": {
    "status": null,
    "description": null
  },
  "apetito_excesivo": {
    "status": null,
    "description": null
  },
  "depresion": {
    "status": null,
    "description": null
  },
  "agitacion": {
    "status": null,
    "description": null
  },
  "migrana": {
    "status": null,
    "description": null
  },
  "dieta_especial": {
    "status": null,
    "description": null
  },
  "alergia_enlatados": {
    "status": null,
    "description": null
  },
  "reaccion_anestesia": {
    "status": null,
    "description": null
  },
  "diente_dolor": {
    "status": null,
    "description": null
  },
  "dificultad_cicatrizacion": {
    "status": null,
    "description": null
  },
  "reaccion_medicamento": {
    "list": [],
    "status": null,
    "description": null
  },
  "alergia_yodo": {
    "status": null,
    "description": null
  },
  "enfermedades": {
    "list": [],
    "otros": null
  }
}
JSON,
        "habitos" => <<<'JSON'
{
  "muerde_unas_labios": {
    "status": null,
    "description": null
  },
  "cigarrillo_tabaco": {
    "status": null,
    "description": null
  },
  "rechina_aprieta_dientes": {
    "status": null,
    "description": null
  },
  "morder_objetos": {
    "status": null,
    "description": null
  },
  "consumir_carbo_azucares": {
    "status": null,
    "description": null
  }
}
JSON,
        'femenino' => <<<'JSON'
{
    "ginecologo_ultimos_6_meses": {
        "status": null,
        "description": null
      },
     "embarazo": {
        "status": null,
        "description": null
    },
    "menstruacion_regular": {
        "status": null,
        "description": null
    },
    "menstruacion_dolorosa": {
        "status": null,
        "description": null
    },
    "menopausia": {
        "status": null,
        "description": null
    },
    "anticonceptivos": {
        "status": null,
        "description": null
    }
}
JSON,
        'antecedentes' => <<<'JSON'
{
  "ant_personales": null,
  "ant_familiares": null,
  "ant_familiares_enfermedades": []
}
JSON,
        "examen_fisico" => <<<'JSON'
{
  "extraoral": {
    "piel": null,
    "ojos": null,
    "labios": null,
    "cuello": null,
    "orejas": null,
    "cuero_cabelludo": null,
    "otros": null
   },
   "intraoral": {
    "carrillos": null,
    "lengua": null,
    "encias": null,
    "piso_boca": null,
    "paladar_duro": null,
    "paladar_blando": null,
    "frenillos": null,
    "otros": null
   }
}
JSON,
        'observaciones' => null,
        'estudios_radiograficos' => <<<'JSON'
{
  "panoramica": null,
  "periapical": null,
  "tension": {
    "sistole": null,
    "diastole": null,
    "PPM": null
  },
  "exam_comp": null,
  "diagnostico": null,
  "plan_tratamiento": null
}
JSON,
        'secuencia_tratamiento' => '[]'
    ];

    protected function casts()
    {
        return [
            'anamnesis' => 'collection',
            'habitos' => 'collection',
            'femenino' => 'collection',
            'antecedentes' => 'collection',
            'examen_fisico' => 'collection',
            'estudios_radiograficos' => 'collection',
            'secuencia_tratamiento' => 'collection',
        ];
    }
}
