<?php

namespace App\ValueObjects\Endodoncia;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Collection;
use JsonSerializable;


class FichaEndodoncia implements Arrayable, JsonSerializable
{
    private string $diente;
    private string $semestre;
    private string $sintomas;
    private string $signos;
    private string $interpretacionRadiografica;
    private Collection $etiologia;
    private PruebasDiagnosticas $pruebasDiagnosticas;

    /**
     * @param string $diente
     * @param string $semestre
     * @param string $sintomas
     * @param string $signos
     * @param string $interpretacionRadiografica
     * @param Collection $etiologia
     * @param PruebasDiagnosticas $pruebasDiagnosticas
     */
    public function __construct(string $diente, string $semestre, string $sintomas, string $signos, string $interpretacionRadiografica, Collection $etiologia, PruebasDiagnosticas $pruebasDiagnosticas)
    {
        $this->diente = $diente;
        $this->semestre = $semestre;
        $this->sintomas = $sintomas;
        $this->signos = $signos;
        $this->interpretacionRadiografica = $interpretacionRadiografica;
        $this->etiologia = $etiologia;
        $this->pruebasDiagnosticas = $pruebasDiagnosticas;
    }

    public function getDiente(): string
    {
        return $this->diente;
    }

    public function getSemestre(): string
    {
        return $this->semestre;
    }

    public function getSintomas(): string
    {
        return $this->sintomas;
    }

    public function getSignos(): string
    {
        return $this->signos;
    }

    public function getInterpretacionRadiografica(): string
    {
        return $this->interpretacionRadiografica;
    }

    public function getEtiologia(): Collection
    {
        return $this->etiologia;
    }

    public function getPruebasDiagnosticas(): PruebasDiagnosticas
    {
        return $this->pruebasDiagnosticas;
    }

    public function toArray()
    {
        return [
            'diente' => $this->diente,
            'semestre' => $this->semestre,
            'sintomas' => $this->sintomas,
            'signos' => $this->signos,
            'interpretacionRadiografica' => $this->interpretacionRadiografica,
            'etiologia' => $this->etiologia,
            'pruebasDiagnosticas' => $this->pruebasDiagnosticas,
        ];
    }

    public function jsonSerialize(): mixed
    {
        return $this->toArray();
    }
}
