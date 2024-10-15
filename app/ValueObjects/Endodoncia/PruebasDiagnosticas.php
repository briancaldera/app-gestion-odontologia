<?php

namespace App\ValueObjects\Endodoncia;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Collection;
use JsonSerializable;

class PruebasDiagnosticas implements Arrayable, JsonSerializable
{
    private Collection $examenTejidosPeriodontales;
    private Collection $pruebasVitalidadPulpar;
    private string $diagnosticoPresuntivo;
    private string $diagnosticoDefinitivo;
    private string $morfologiaConducto;
    private string $tratamientoConducto;
    private string $metodoObturacion;
    private string $tecnicaPreparacionBiomecanica;
    private string $preparacionQuimica;
    private string $numeroLimaUtilizada;
    private string $materialObturacion;
    private string $medicacionJustificacion;
    private string $observaciones;

    /**
     * @param Collection $examenTejidosPeriodontales
     * @param Collection $pruebasVitalidadPulpar
     * @param string $diagnosticoPresuntivo
     * @param string $diagnosticoDefinitivo
     * @param string $morfologiaConducto
     * @param string $tratamientoConducto
     * @param string $metodoObturacion
     * @param string $tecnicaPreparacionBiomecanica
     * @param string $preparacionQuimica
     * @param string $numeroLimaUtilizada
     * @param string $materialObturacion
     * @param string $medicacionJustificacion
     * @param string $observaciones
     */
    public function __construct(Collection $examenTejidosPeriodontales, Collection $pruebasVitalidadPulpar, string $diagnosticoPresuntivo, string $diagnosticoDefinitivo, string $morfologiaConducto, string $tratamientoConducto, string $metodoObturacion, string $tecnicaPreparacionBiomecanica, string $preparacionQuimica, string $numeroLimaUtilizada, string $materialObturacion, string $medicacionJustificacion, string $observaciones)
    {
        $this->examenTejidosPeriodontales = $examenTejidosPeriodontales;
        $this->pruebasVitalidadPulpar = $pruebasVitalidadPulpar;
        $this->diagnosticoPresuntivo = $diagnosticoPresuntivo;
        $this->diagnosticoDefinitivo = $diagnosticoDefinitivo;
        $this->morfologiaConducto = $morfologiaConducto;
        $this->tratamientoConducto = $tratamientoConducto;
        $this->metodoObturacion = $metodoObturacion;
        $this->tecnicaPreparacionBiomecanica = $tecnicaPreparacionBiomecanica;
        $this->preparacionQuimica = $preparacionQuimica;
        $this->numeroLimaUtilizada = $numeroLimaUtilizada;
        $this->materialObturacion = $materialObturacion;
        $this->medicacionJustificacion = $medicacionJustificacion;
        $this->observaciones = $observaciones;
    }

    public function getExamenTejidosPeriodontales(): Collection
    {
        return $this->examenTejidosPeriodontales;
    }

    public function setExamenTejidosPeriodontales(Collection $examenTejidosPeriodontales): void
    {
        $this->examenTejidosPeriodontales = $examenTejidosPeriodontales;
    }

    public function getPruebasVitalidadPulpar(): Collection
    {
        return $this->pruebasVitalidadPulpar;
    }

    public function setPruebasVitalidadPulpar(Collection $pruebasVitalidadPulpar): void
    {
        $this->pruebasVitalidadPulpar = $pruebasVitalidadPulpar;
    }

    public function getDiagnosticoPresuntivo(): string
    {
        return $this->diagnosticoPresuntivo;
    }

    public function setDiagnosticoPresuntivo(string $diagnosticoPresuntivo): void
    {
        $this->diagnosticoPresuntivo = $diagnosticoPresuntivo;
    }

    public function getDiagnosticoDefinitivo(): string
    {
        return $this->diagnosticoDefinitivo;
    }

    public function setDiagnosticoDefinitivo(string $diagnosticoDefinitivo): void
    {
        $this->diagnosticoDefinitivo = $diagnosticoDefinitivo;
    }

    public function getMorfologiaConducto(): string
    {
        return $this->morfologiaConducto;
    }

    public function setMorfologiaConducto(string $morfologiaConducto): void
    {
        $this->morfologiaConducto = $morfologiaConducto;
    }

    public function getTratamientoConducto(): string
    {
        return $this->tratamientoConducto;
    }

    public function setTratamientoConducto(string $tratamientoConducto): void
    {
        $this->tratamientoConducto = $tratamientoConducto;
    }

    public function getMetodoObturacion(): string
    {
        return $this->metodoObturacion;
    }

    public function setMetodoObturacion(string $metodoObturacion): void
    {
        $this->metodoObturacion = $metodoObturacion;
    }

    public function getTecnicaPreparacionBiomecanica(): string
    {
        return $this->tecnicaPreparacionBiomecanica;
    }

    public function setTecnicaPreparacionBiomecanica(string $tecnicaPreparacionBiomecanica): void
    {
        $this->tecnicaPreparacionBiomecanica = $tecnicaPreparacionBiomecanica;
    }

    public function getPreparacionQuimica(): string
    {
        return $this->preparacionQuimica;
    }

    public function setPreparacionQuimica(string $preparacionQuimica): void
    {
        $this->preparacionQuimica = $preparacionQuimica;
    }

    public function getNumeroLimaUtilizada(): string
    {
        return $this->numeroLimaUtilizada;
    }

    public function setNumeroLimaUtilizada(string $numeroLimaUtilizada): void
    {
        $this->numeroLimaUtilizada = $numeroLimaUtilizada;
    }

    public function getMaterialObturacion(): string
    {
        return $this->materialObturacion;
    }

    public function setMaterialObturacion(string $materialObturacion): void
    {
        $this->materialObturacion = $materialObturacion;
    }

    public function getMedicacionJustificacion(): string
    {
        return $this->medicacionJustificacion;
    }

    public function setMedicacionJustificacion(string $medicacionJustificacion): void
    {
        $this->medicacionJustificacion = $medicacionJustificacion;
    }

    public function getObservaciones(): string
    {
        return $this->observaciones;
    }

    public function setObservaciones(string $observaciones): void
    {
        $this->observaciones = $observaciones;
    }

    public function toArray(): array
    {
        return [
            'examen_tejidos_periodontales' => $this->examenTejidosPeriodontales,
            'pruebas_vitalidad_pulpar' => $this->pruebasVitalidadPulpar,
            'diagnostico_presuntivo' => $this->diagnosticoPresuntivo,
            'diagnostico_definitivo' => $this->diagnosticoDefinitivo,
            'morfologia_conducto' => $this->morfologiaConducto,
            'tratamiento_conducto' => $this->tratamientoConducto,
            'metodo_obturacion' => $this->metodoObturacion,
            'tecnica_preparacion_biomecanica' => $this->tecnicaPreparacionBiomecanica,
            'preparacion_quimica' => $this->preparacionQuimica,
            'numero_lima_utilizada' => $this->numeroLimaUtilizada,
            'material_obturacion' => $this->materialObturacion,
            'medicacion_justificacion' => $this->medicacionJustificacion,
            'observaciones' => $this->observaciones,
        ];
    }

    public function jsonSerialize(): mixed
    {
        return $this->toArray();
    }
}
