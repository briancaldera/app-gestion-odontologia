<?php

namespace App\Casts\Endodoncia;

use App\ValueObjects\Endodoncia\Anamnesis as AnamnesisValueObject;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use InvalidArgumentException;

class Anamnesis implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param array<string, mixed> $attributes
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): AnamnesisValueObject
    {

        $visita_medico_ultimos_6_meses = [
            'status' => $attributes['visita_medico_ultimos_6_meses']['status'],
            'description' => $attributes['visita_medico_ultimos_6_meses']['description'],
        ];

        $bajo_tratamiento_actual = [
            'status' => $attributes['bajo_tratamiento_actual']['status'],
            'description' => $attributes['bajo_tratamiento_actual']['description'],
        ];

        $alergia_medicamento = [
            'status' => $attributes['alergia_medicamento']['status'],
            'description' => $attributes['alergia_medicamento']['description'],
        ];

        $alergia_material_dental = [
            'status' => $attributes['alergia_material_dental']['status'],
            'description' => $attributes['alergia_material_dental']['description'],
        ];

        $hospitalizado_alguna_vez = [
            'status' => $attributes['hospitalizado_alguna_vez']['status'],
            'description' => $attributes['hospitalizado_alguna_vez']['description'],
        ];

        $odontologo_ultimos_6_meses = [
            'status' => $attributes['odontologo_ultimos_6_meses']['status'],
            'description' => $attributes['odontologo_ultimos_6_meses']['description'],
        ];

        $sangrado_al_cepillar = [
            'status' => $attributes['sangrado_al_cepillar']['status'],
            'description' => $attributes['sangrado_al_cepillar']['description'],
        ];

        $abultamiento_diente = [
            'status' => $attributes['abultamiento_diente']['status'],
            'description' => $attributes['abultamiento_diente']['description'],
        ];

        $rechina_aprieta_dientes = [
            'status' => $attributes['rechina_aprieta_dientes']['status'],
            'description' => $attributes['rechina_aprieta_dientes']['description'],
        ];

        $dolor_CATM = [
            'status' => $attributes['dolor_CATM']['status'],
            'description' => $attributes['dolor_CATM']['description'],
        ];

        $sangrado_excesivo_corte = [
            'status' => $attributes['sangrado_excesivo_corte']['status'],
            'description' => $attributes['sangrado_excesivo_corte']['description'],
        ];

        $dificultad_cicatrizacion = [
            'status' => $attributes['dificultad_cicatrizacion']['status'],
            'description' => $attributes['dificultad_cicatrizacion']['description'],
        ];

        $cigarrillo_tabaco = [
            'status' => $attributes['cigarrillo_tabaco']['status'],
            'description' => $attributes['cigarrillo_tabaco']['description'],
        ];

        $alergia_alimento = [
            'status' => $attributes['alergia_alimento']['status'],
            'description' => $attributes['alergia_alimento']['description'],
        ];

        $alergia_enlatados = [
            'status' => $attributes['alergia_enlatados']['status'],
            'description' => $attributes['alergia_enlatados']['description'],
        ];

        $alergia_yodo = [
            'status' => $attributes['alergia_yodo']['status'],
            'description' => $attributes['alergia_yodo']['description'],
        ];

        $reaccion_anestesia = [
            'status' => $attributes['reaccion_anestesia']['status'],
            'description' => $attributes['reaccion_anestesia']['description'],
        ];

        $embarazo = [
            'status' => $attributes['embarazo']['status'],
            'description' => $attributes['embarazo']['description'],
        ];

        $enfermedades = [
            'list' => $attributes['enfermedades']['list'],
            'resumen_ant_personales' => $attributes['enfermedades']['resumen_ant_personales'],
        ];

        $enfermedades_familiares = [
            'resumen_ant_familiares' => $attributes['enfermedades_familiares']['resumen_ant_familiares'],
            'examen_comp' => $attributes['enfermedades_familiares']['examen_comp'],
        ];

        return new AnamnesisValueObject(
            $visita_medico_ultimos_6_meses,
            $bajo_tratamiento_actual,
            $alergia_medicamento,
            $alergia_material_dental,
            $hospitalizado_alguna_vez,
            $odontologo_ultimos_6_meses,
            $sangrado_al_cepillar,
            $abultamiento_diente,
            $rechina_aprieta_dientes,
            $dolor_CATM,
            $sangrado_excesivo_corte,
            $dificultad_cicatrizacion,
            $cigarrillo_tabaco,
            $alergia_alimento,
            $alergia_enlatados,
            $alergia_yodo,
            $reaccion_anestesia,
            $embarazo,
            $enfermedades,
            $enfermedades_familiares,
        );
    }

    /**
     * Prepare the given value for storage.
     *
     * @param array<string, mixed> $attributes
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): array
    {
        if (!$value instanceof AnamnesisValueObject) {
            throw new InvalidArgumentException('The given value is not an Anamnesis instance.');
        }

        $visita_medico_ultimos_6_meses = [
            'status' => $value->visita_medico_ultimos_6_meses['status'],
            'description' => $value->visita_medico_ultimos_6_meses['description'],
        ];
        $bajo_tratamiento_actual = [
            'status' => $value->bajo_tratamiento_actual['status'],
            'description' => $value->bajo_tratamiento_actual['description'],
        ];
        $alergia_medicamento = [
            'status' => $value->alergia_medicamento['status'],
            'description' => $value->alergia_medicamento['description'],
        ];
        $alergia_material_dental = [
            'status' => $value->alergia_material_dental['status'],
            'description' => $value->alergia_material_dental['description'],
        ];
        $hospitalizado_alguna_vez = [
            'status' => $value->hospitalizado_alguna_vez['status'],
            'description' => $value->hospitalizado_alguna_vez['description'],
        ];
        $odontologo_ultimos_6_meses = [
            'status' => $value->odontologo_ultimos_6_meses['status'],
            'description' => $value->odontologo_ultimos_6_meses['description'],
        ];
        $sangrado_al_cepillar = [
            'status' => $value->sangrado_al_cepillar['status'],
            'description' => $value->sangrado_al_cepillar['description'],
        ];
        $abultamiento_diente = [
            'status' => $value->abultamiento_diente['status'],
            'description' => $value->abultamiento_diente['description'],
        ];
        $rechina_aprieta_dientes = [
            'status' => $value->rechina_aprieta_dientes['status'],
            'description' => $value->rechina_aprieta_dientes['description'],
        ];
        $dolor_CATM = [
            'status' => $value->dolor_CATM['status'],
            'description' => $value->dolor_CATM['description'],
        ];
        $sangrado_excesivo_corte = [
            'status' => $value->sangrado_excesivo_corte['status'],
            'description' => $value->sangrado_excesivo_corte['description'],
        ];
        $dificultad_cicatrizacion = [
            'status' => $value->dificultad_cicatrizacion['status'],
            'description' => $value->dificultad_cicatrizacion['description'],
        ];
        $cigarrillo_tabaco = [
            'status' => $value->cigarrillo_tabaco['status'],
            'description' => $value->cigarrillo_tabaco['description'],
        ];
        $alergia_alimento = [
            'status' => $value->alergia_alimento['status'],
            'description' => $value->alergia_alimento['description'],
        ];
        $alergia_enlatados = [
            'status' => $value->alergia_enlatados['status'],
            'description' => $value->alergia_enlatados['description'],
        ];
        $alergia_yodo = [
            'status' => $value->alergia_yodo['status'],
            'description' => $value->alergia_yodo['description'],
        ];
        $reaccion_anestesia = [
            'status' => $value->reaccion_anestesia['status'],
            'description' => $value->reaccion_anestesia['description'],
        ];
        $embarazo = [
            'status' => $value->embarazo['status'],
            'description' => $value->embarazo['description'],
        ];
        $enfermedades = [
            'list' => $value->enfermedades['list'],
            'resumen_ant_personales' => $value->enfermedades['resumen_ant_personales'],
        ];

        $enfermedades_familiares = [
            'resumen_ant_familiares' => $value->enfermedades_familiares['resumen_ant_familiares'],
            'examen_comp' => $value->enfermedades_familiares['examen_comp'],
        ];

        return [
            "visita_medico_ultimos_6_meses" => $visita_medico_ultimos_6_meses,
            "bajo_tratamiento_actual" => $bajo_tratamiento_actual,
            "alergia_medicamento" => $alergia_medicamento,
            "alergia_material_dental" => $alergia_material_dental,
            "hospitalizado_alguna_vez" => $hospitalizado_alguna_vez,
            "odontologo_ultimos_6_meses" => $odontologo_ultimos_6_meses,
            "sangrado_al_cepillar" => $sangrado_al_cepillar,
            "abultamiento_diente" => $abultamiento_diente,
            "rechina_aprieta_dientes" => $rechina_aprieta_dientes,
            "dolor_CATM" => $dolor_CATM,
            "sangrado_excesivo_corte" => $sangrado_excesivo_corte,
            "dificultad_cicatrizacion" => $dificultad_cicatrizacion,
            "cigarrillo_tabaco" => $cigarrillo_tabaco,
            "alergia_alimento" => $alergia_alimento,
            "alergia_enlatados" => $alergia_enlatados,
            "alergia_yodo" => $alergia_yodo,
            "reaccion_anestesia" => $reaccion_anestesia,
            "embarazo" => $embarazo,
            "enfermedades" => $enfermedades,
            "enfermedades_familiares" => $enfermedades_familiares,
        ];
    }
}