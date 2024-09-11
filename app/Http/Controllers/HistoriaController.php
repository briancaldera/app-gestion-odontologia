<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAntFamiliaresRequest;
use App\Http\Requests\StoreAntPersonalesRequest;
use App\Http\Requests\StoreHistoriaOdontologicaRequest;
use App\Http\Requests\StorePacienteRequest;
use App\Http\Requests\StoreTrastornosRequest;
use App\Http\Requests\UpdateAntFamiliaresRequest;
use App\Http\Requests\UpdateAntPersonalesRequest;
use App\Http\Requests\UpdateEstudioModelos;
use App\Http\Requests\UpdateExamenRadiografico;
use App\Http\Requests\UpdateHistoriaOdontologicaRequest;
use App\Http\Requests\UpdateHistoriaRequest;
use App\Http\Requests\UpdateModificacionesPlanTratamiento;
use App\Http\Requests\UpdatePacienteRequest;
use App\Http\Requests\UpdatePeriodontodiagramaRequest;
use App\Http\Requests\UpdatePlanTratamiento;
use App\Http\Requests\UpdateSecuenciaTratamiento;
use App\Http\Requests\UpdateTrastornosRequest;
use App\Models\Historia;
use App\Models\HistoriaOdontologica;
use App\Models\Paciente;
use App\Models\Trastornos;
use App\Models\User;
use App\Services\CorreccionService;
use App\Services\HistoriaService;
use App\Services\RadiografiaService;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Type;

class HistoriaController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        protected HistoriaService    $historiaService,
        protected RadiografiaService $radiografiaService,
        protected CorreccionService  $correccionService
    )
    {
    }

    public function dashboard(Request $request)
    {
        /* @var User $user */
        $user = $request->user();

        if ($user->isAdmin()) {

            $statistics = [
                'created_HCE' => Historia::count(),
            ];

            return inertia()->render('Admin/Historias/Dashboard', [
                'statistics' => $statistics
            ]);
        } elseif ($user->isAdmision()) {

        } elseif ($user->isProfesor()) {

        } elseif ($user->isEstudiante()) {
            return Inertia::render('Estudiante/Historias/Dashboard', [

            ]);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        /* @var User $user */
        $user = $request->user();

        if ($user->isAdmin()) {

            $historias = Historia::all();

            return inertia()->render('Admin/Historias/Index', [
                'historias' => $historias,
            ]);
        } elseif ($user->isAdmision()) {

        } elseif ($user->isProfesor()) {

        } elseif ($user->isEstudiante()) {

            $historias = $user->historias()->with(['paciente'])->get();

            return Inertia::render('Estudiante/Historias/Index', [
                'historias' => $historias,
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Estudiante/Historias/Create');
    }

    public function store(StorePacienteRequest $request)
    {
        $data = $request->validated();
        $autor = $request->user();
        $paciente = $this->historiaService->addPaciente($data);
        $historia = $this->historiaService->addHistoria($paciente, $autor);
        $historia->motivo_consulta = $data['motivo_consulta'];
        $historia->enfermedad_actual = $data['enfermedad_actual'];
        $historia->save();
        $this->correccionService->attachCorreccion($historia);
        message('Paciente creado exitosamente. A continuacion podrá editar la historia asignada.');
        return to_route('historias.edit', [
            'historia' => $historia->id
        ]);
    }

    public function updatePaciente(Paciente $paciente, UpdatePacienteRequest $request)
    {
        $data = $request->validated();

        $this->historiaService->updatePaciente($paciente, $data);
        message('Paciente actualizado', Type::Success);
        return response(null, 200);
    }

    public function storeAntFamiliares(StoreAntFamiliaresRequest $request, Historia $historia)
    {
        $data = $request->validated();
        $this->historiaService->addAntFamiliares($historia, $data);
        return response(null, 201);
    }

    public function updateAntFamiliares(Historia $historia, UpdateAntFamiliaresRequest $request)
    {
        $data = $request->validated();
        $this->historiaService->updateAntFamiliares($historia, $data);
        message('Antecedentes médicos familiares actualizados exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function storeAntPersonales(StoreAntPersonalesRequest $request, Historia $historia)
    {
        $data = $request->validated();
        $this->historiaService->addAntPersonales($historia, $data);
        return response(null, 201);
    }

    public function updateAntPersonales(Historia $historia, UpdateAntPersonalesRequest $request)
    {
        $data = $request->validated();
        $this->historiaService->updateAntPersonales($historia, $data);
        message('Antecedentes médicos personales actualizados exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function storeTrastornos(StoreTrastornosRequest $request, Historia $historia)
    {
        $data = $request->validated();
        $this->historiaService->addTrastornos($historia, $data);
        return response(null, 201);
    }

    public function updateTrastornos(UpdateTrastornosRequest $request)
    {
        $data = $request->validated();
        $trastornos = Trastornos::findOrFail($data['historia_id']);
        $this->historiaService->updateTrastornos($trastornos, $data);
        return response()->noContent();
    }

    public function storeHistoriaOdontologica(StoreHistoriaOdontologicaRequest $request, Historia $historia)
    {
        $data = $request->validated();
        $this->historiaService->addHistoriaOdontologica($historia, $data);
        return response(null, 201);
    }

    public function updateHistoriaOdontologica(Historia $historia, UpdateHistoriaOdontologicaRequest $request)
    {
        $data = $request->validated();
        $this->historiaService->updateHistoriaOdontologica($historia, $data);
        message('Historia odontológica actualizada exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function updateEstudioModelos(Historia $historia, UpdateEstudioModelos $request)
    {
        $data = $request->validated();
        $this->historiaService->updateEstudioModelos($historia, $data);
        message('Historia odontológica actualizada exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function updatePlanTratamiento(Historia $historia, UpdatePlanTratamiento $request)
    {
        $data = $request->validated();
        $this->historiaService->updatePlanTratamiento($historia, $data);
        message('Historia odontológica actualizada exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function updateModificacionesPlanTratamiento(Historia $historia, UpdateModificacionesPlanTratamiento $request)
    {
        $data = $request->validated();
        $this->historiaService->updateModificacionesPlanTratamiento($historia, $data);
        message('Historia odontológica actualizada exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function updateSecuenciaTratamiento(Historia $historia, UpdateSecuenciaTratamiento $request)
    {
        $data = $request->validated();
        $this->historiaService->updateSecuenciaTratamiento($historia, $data);
        message('Historia odontológica actualizada exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function updateExamenRadiografico(Historia $historia, UpdateExamenRadiografico $request)
    {
        /* @var HistoriaOdontologica $historia_odon */
        $historia_odon = $historia->historiaOdontologica;

        if ($request->has('interpretacion_panoramica')) {

            $int_panoramica = $request->safe()->only(['interpretacion_panoramica'])['interpretacion_panoramica'];

            $descripcion = $int_panoramica['descripcion'];

            if (isset($int_panoramica['imagenes']) AND count($int_panoramica['imagenes']) !== 0) {
                $imagenes = collect($int_panoramica['imagenes']);
                $imagenes->each(fn(UploadedFile $file) => $historia_odon->addMedia($file)->toMediaCollection('panoramicas'));
            }

            $historia_odon->examen_radiografico->interpretacion_panoramica['nasomaxilar'] = $descripcion['nasomaxilar'] ?? null;
            $historia_odon->examen_radiografico->interpretacion_panoramica['ATM'] = $descripcion['ATM']  ?? null;
            $historia_odon->examen_radiografico->interpretacion_panoramica['mandibular'] = $descripcion['mandibular']  ?? null;
            $historia_odon->examen_radiografico->interpretacion_panoramica['dento_alveolar_sup'] = $descripcion['dento_alveolar_sup']  ?? null;
            $historia_odon->examen_radiografico->interpretacion_panoramica['dento_alveolar_inf'] = $descripcion['dento_alveolar_inf']  ?? null;
            $historia_odon->save();
        }

        if ($request->has('interpretacion_coronales')) {

            $int_coronales = $request->safe()->only(['interpretacion_coronales'])['interpretacion_coronales'];

            if (isset($int_coronales['imagenes']) AND count($int_coronales['imagenes']) !== 0) {
            $imagenes = collect($int_coronales['imagenes']);
            $imagenes->each(fn(UploadedFile $file) => $historia_odon->addMedia($file)->toMediaCollection('coronales'));
            }

            $historia_odon->examen_radiografico->interpretacion_coronales = $int_coronales['descripcion']  ?? null;
            $historia_odon->save();
        }

        if ($request->has('interpretacion_periapicales')) {

            $int_periapicales = $request->safe()->only(['interpretacion_periapicales'])['interpretacion_periapicales'];

            if (isset($int_periapicales['imagenes']) AND count($int_periapicales['imagenes']) !== 0) {
            $imagenes = collect($int_periapicales['imagenes']);
            $imagenes->each(fn(UploadedFile $file) => $historia_odon->addMedia($file)->toMediaCollection('periapicales'));
            }

            $historia_odon->examen_radiografico->interpretacion_periapicales = $int_periapicales['descripcion']  ?? null;
            $historia_odon->save();
        }

        message('Examen radiografico actualizado exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function updatePeriodontodiagrama(Historia $historia, UpdatePeriodontodiagramaRequest $request)
    {
        $periodontodiagrama = $request->validated()['periodontodiagrama'];

        /* @var HistoriaOdontologica $historia_odon */
        $historia_odon = $historia->historiaOdontologica;

        $historia_odon->addMedia($periodontodiagrama)->toMediaCollection('periodontodiagrama');

        message('Examen radiografico actualizado exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Historia $historia, Request $request)
    {
        /* @var User $user */
        $user = $request->user();

        if ($user->isAdmin()) {

        } elseif ($user->isAdmision()) {

        } elseif ($user->isProfesor()) {

        } elseif ($user->isEstudiante()) {

            $historia->makeVisible(['paciente']);
            $historia->paciente;
            $historia->antFamiliares;
            $historia->antPersonales;
            $historia->trastornos;
            $historia->historiaOdontologica;

            return Inertia::render('Estudiante/Historias/Show', [
                'historia' => $historia
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Historia $historia, Request $request)
    {
        /* @var User $user */
        $user = $request->user();

        if ($user->isAdmin()) {

        } elseif ($user->isAdmision()) {

        } elseif ($user->isProfesor()) {

        } elseif ($user->isEstudiante()) {

            $historia->makeVisible(['paciente']);
            $historia->paciente;
            $historia->antFamiliares;
            $historia->antPersonales;
            $historia->trastornos;
            $historia->historiaOdontologica;

            return Inertia::render('Estudiante/Historias/Edit', [
                'historia' => $historia
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHistoriaRequest $request, Historia $historia)
    {
        $data = $request->validated();
        $this->historiaService->updateHistoria($historia, $data);
        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Historia $historia)
    {
        //
    }

    public function getPanoramica(Historia $historia, string $id)
    {
        /* @var HistoriaOdontologica $historia_odo */
        $historia_odo = $historia->historiaOdontologica;

        /* @var Media $panoramica */
        $panoramica = $historia_odo->getMedia('panoramicas')->firstOrFail(fn(Media $media) => $media->uuid === $id);

        return response()->file($panoramica->getPath());
    }

    public function getCoronales(Historia $historia, string $id)
    {
        /* @var HistoriaOdontologica $historia_odo */
        $historia_odo = $historia->historiaOdontologica;

        /* @var Media $coronales */
        $coronales = $historia_odo->getMedia('coronales')->firstOrFail(fn(Media $media) => $media->uuid === $id);

        return response()->file($coronales->getPath());
    }

    public function getPeriapicales(Historia $historia, string $id)
    {
        /* @var HistoriaOdontologica $historia_odo */
        $historia_odo = $historia->historiaOdontologica;

        /* @var Media $periapicales */
        $periapicales = $historia_odo->getMedia('periapicales')->firstOrFail(fn(Media $media) => $media->uuid === $id);

        return response()->file($periapicales->getPath());
    }

    public function getPeriodontodiagrama(Historia $historia, string $id)
    {
        /* @var HistoriaOdontologica $historia_odo */
        $historia_odo = $historia->historiaOdontologica;

        $periodontodiagrama = $historia_odo->getMedia('periodontodiagrama')->firstOrFail(fn(Media $media) => $media->uuid === $id);

        return response()->file($periodontodiagrama->getPath());
    }
}
