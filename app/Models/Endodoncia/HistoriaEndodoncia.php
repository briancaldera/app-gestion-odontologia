<?php

namespace App\Models\Endodoncia;

use Illuminate\Database\Eloquent\Casts\ArrayObject;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property ArrayObject $anamnesis
*/
class HistoriaEndodoncia extends Model
{
    use HasFactory;
    use HasUuids;

    public $incrementing = false;

    protected $attributes = [
        'anamnesis' => /** @lang JSON */
'{
  "visita_medico_ultimos_6_meses": {
    "status": null,
    "descripcion": null
  },
  "bajo_tratamiento_actual": {
    "status": null,
    "descripcion": null
  },
  "alergia_medicamento": {
    "status": null,
    "descripcion": null
  },
  "alergia_material_dental": {
    "status": null,
    "descripcion": null
  },
  "hospitalizado_alguna_vez": {
    "status": null,
    "descripcion": null
  },
  "odontologo_ultimos_6_meses": {
    "status": null,
    "descripcion": null
  },
  "sangrado_al_cepillar": {
    "status": null,
    "descripcion": null
  },
  "abultamiento_diente": {
    "status": null,
    "descripcion": null
  },
  "rechina_aprieta_dientes": {
    "status": null,
    "descripcion": null
  },
  "dolor_CATM": {
    "status": null,
    "descripcion": null
  },
  "sangrado_excesivo_corte": {
    "status": null,
    "descripcion": null
  },
  "dificultad_cicatrizacion": {
    "status": null,
    "descripcion": null
  },
  "cigarrillo_tabaco": {
    "status": null,
    "descripcion": null
  },
  "alergia_alimento": {
    "status": null,
    "descripcion": null
  },
  "alergia_enlatados": {
    "status": null,
    "descripcion": null
  },
  "alergia_yodo": {
    "status": null,
    "descripcion": null
  },
  "reaccion_anestesia": {
    "status": null,
    "descripcion": null
  },
  "embarazo": {
    "status": null,
    "descripcion": null
  },
  "enfermedades": {
    "list": [],
    "resumen_ant_personales": null
  },
  "enfermedades_familiar": {
    "resumen_ant_familiares": null,
    "examen_comp": null
  }
}',
        'evaluacion_dolor' => /** @lang JSON */
            '{
  "dolor_presente": {
    "status": null,
    "descripcion": null
  },
  "diente_dolor": {
    "status": null,
    "descripcion": null
  },
  "primeros_sintomas": null,
  "aparicion_sintomas": null,
  "intensidad_frecuencia_calidad_dolor": {
    "intensidad": null,
    "frecuencia": [],
    "calidad": []
  },
  "alivio_dolor": {
    "status": null,
    "descripcion": null
  },
  "farmaco_alivio_dolor": {
    "status": null,
    "descripcion": null
  },
  "agravo_dolor": {
    "status": null,
    "descripcion": null
  },
  "diente_sensible_al_comer": {
    "sensibilidad": []
  },
  "dolor_al_masticar": {
    "status": null,
    "descripcion": null
  },
  "dolor_momento_dia": null
}',
        'secuencia_tratamiento' => /** @lang JSON */
        '[]',
        'fichas_endodonticas' => /** @lang JSON */ '[
{
  "semestre": null,
  "diente": null,
  "sintomas": null,
  "signos": null,
  "interpretacion_radiografica": null,
  "etiologia": [],
  "pruebas_diagnosticas": {
    "examen_tejidos_periodontales": [],
    "pruebas_vitalidad_pulpar": [],
    "diagnostico_presuntivo": null,
    "diagnostico_definitivo": null,
    "morfologia_conducto": [],
    "tratamiento_conducto": [],
    "metodo_obturacion": [],
    "tecnica_preparacion_biomecanica": null,
    "preparacion_quimica": null,
    "numero_lima_utilizada": null,
    "material_obturacion": null,
    "medicacion_justificacion": null,
    "observaciones": null
  },
  "radiografias_tratamiento": {
  
  }
}
]'
    ];
}
