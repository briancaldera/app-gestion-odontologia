<?php

namespace App\ValueObjects\Endodoncia;

use App\ValueObjects\BooleanWithDescriptionField;

class Anamnesis
{
    public array $visita_medico_ultimos_6_meses;
    public array $bajo_tratamiento_actual;
    public array $alergia_medicamento;
    public array $alergia_material_dental;
    public array $hospitalizado_alguna_vez;
    public array $odontologo_ultimos_6_meses;
    public array $sangrado_al_cepillar;
    public array $abultamiento_diente;
    public array $rechina_aprieta_dientes;
    public array $dolor_CATM;
    public array $sangrado_excesivo_corte;
    public array $dificultad_cicatrizacion;
    public array $cigarrillo_tabaco;
    public array $alergia_alimento;
    public array $alergia_enlatados;
    public array $alergia_yodo;
    public array $reaccion_anestesia;
    public array $embarazo;
    public array $enfermedades;
    public array $enfermedades_familiares;

    /**
     * @param array $visita_medico_ultimos_6_meses
     * @param array $bajo_tratamiento_actual
     * @param array $alergia_medicamento
     * @param array $alergia_material_dental
     * @param array $hospitalizado_alguna_vez
     * @param array $odontologo_ultimos_6_meses
     * @param array $sangrado_al_cepillar
     * @param array $abultamiento_diente
     * @param array $rechina_aprieta_dientes
     * @param array $dolor_CATM
     * @param array $sangrado_excesivo_corte
     * @param array $dificultad_cicatrizacion
     * @param array $cigarrillo_tabaco
     * @param array $alergia_alimento
     * @param array $alergia_enlatados
     * @param array $alergia_yodo
     * @param array $reaccion_anestesia
     * @param array $embarazo
     * @param array $enfermedades
     * @param array $enfermedades_familiares
     */
    public function __construct(array $visita_medico_ultimos_6_meses, array $bajo_tratamiento_actual, array $alergia_medicamento, array $alergia_material_dental, array $hospitalizado_alguna_vez, array $odontologo_ultimos_6_meses, array $sangrado_al_cepillar, array $abultamiento_diente, array $rechina_aprieta_dientes, array $dolor_CATM, array $sangrado_excesivo_corte, array $dificultad_cicatrizacion, array $cigarrillo_tabaco, array $alergia_alimento, array $alergia_enlatados, array $alergia_yodo, array $reaccion_anestesia, array $embarazo, array $enfermedades, array $enfermedades_familiares)
    {
        $this->visita_medico_ultimos_6_meses = $visita_medico_ultimos_6_meses;
        $this->bajo_tratamiento_actual = $bajo_tratamiento_actual;
        $this->alergia_medicamento = $alergia_medicamento;
        $this->alergia_material_dental = $alergia_material_dental;
        $this->hospitalizado_alguna_vez = $hospitalizado_alguna_vez;
        $this->odontologo_ultimos_6_meses = $odontologo_ultimos_6_meses;
        $this->sangrado_al_cepillar = $sangrado_al_cepillar;
        $this->abultamiento_diente = $abultamiento_diente;
        $this->rechina_aprieta_dientes = $rechina_aprieta_dientes;
        $this->dolor_CATM = $dolor_CATM;
        $this->sangrado_excesivo_corte = $sangrado_excesivo_corte;
        $this->dificultad_cicatrizacion = $dificultad_cicatrizacion;
        $this->cigarrillo_tabaco = $cigarrillo_tabaco;
        $this->alergia_alimento = $alergia_alimento;
        $this->alergia_enlatados = $alergia_enlatados;
        $this->alergia_yodo = $alergia_yodo;
        $this->reaccion_anestesia = $reaccion_anestesia;
        $this->embarazo = $embarazo;
        $this->enfermedades = $enfermedades;
        $this->enfermedades_familiares = $enfermedades_familiares;
    }
}
