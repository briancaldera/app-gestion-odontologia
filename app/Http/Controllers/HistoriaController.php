<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAntFamiliaresRequest;
use App\Http\Requests\StoreAntPersonalesRequest;
use App\Http\Requests\StoreHistoriaOdontologicaRequest;
use App\Http\Requests\StoreHistoriaRequest;
use App\Http\Requests\StorePacienteRequest;
use App\Http\Requests\StoreTrastornosRequest;
use App\Http\Requests\UpdateAntFamiliaresRequest;
use App\Http\Requests\UpdateAntPersonalesRequest;
use App\Http\Requests\UpdateHistoriaOdontologicaRequest;
use App\Http\Requests\UpdateHistoriaRequest;
use App\Http\Requests\UpdatePacienteRequest;
use App\Http\Requests\UpdateTrastornosRequest;
use App\Models\AntFamiliares;
use App\Models\AntPersonales;
use App\Models\Historia;
use App\Models\HistoriaOdontologica;
use App\Models\Paciente;
use App\Models\Trastornos;
use App\Models\User;
use App\Services\CorreccionService;
use App\Services\HistoriaService;
use App\Services\PacienteService;
use App\Services\RadiografiaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoriaController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        protected HistoriaService $historiaService,
        protected RadiografiaService $radiografiaService,
        protected CorreccionService $correccionService
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        /* @var User $user */
        $user = $request->user();

        if ($user->isAdmin()) {

        } elseif ($user->isAdmision()) {

        } elseif ($user->isProfesor()) {

        } elseif ($user->isEstudiante()) {
            return Inertia::render('Estudiante/Historias/Index', [

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
        $this->correccionService->attachCorreccion($historia);
        return to_route('historias.edit', [
            'historia' => $historia->id
        ]);
    }

    public function updatePaciente(Paciente $paciente, UpdatePacienteRequest $request)
    {
        $data = $request->validated();

        $this->historiaService->updatePaciente($paciente, $data);
        message('Paciente actualizado', \Type::Success);
        return response(null, 200);
    }

    public function storeAntFamiliares(StoreAntFamiliaresRequest $request, Historia $historia)
    {
        $data = $request->validated();
        $this->historiaService->addAntFamiliares($historia, $data);
        return response(null, 201);
    }

    public function updateAntFamiliares(UpdateAntFamiliaresRequest $request)
    {
        $data = $request->validated();
        $antFamiliares = AntFamiliares::findOrFail($data['historia_id']);
        $this->historiaService->updateAntFamiliares($antFamiliares, $data);
        return response()->noContent();
    }

    public function storeAntPersonales(StoreAntPersonalesRequest $request, Historia $historia)
    {
        $data = $request->validated();
        $this->historiaService->addAntPersonales($historia, $data);
        return response(null, 201);
    }

    public function updateAntPersonales(UpdateAntPersonalesRequest $request)
    {
        $data = $request->validated();
        $antPersonales = AntPersonales::findOrFail($data['historia_id']);
        $this->historiaService->updateAntPersonales($antPersonales, $data);
        return response()->noContent();
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

    public function updateHistoriaOdontologica(UpdateHistoriaOdontologicaRequest $request)
    {
        $data = $request->validated();
        $historiaOdon = HistoriaOdontologica::findOrFail($data['historia_id']);
        $this->historiaService->updateHistoriaOdontologica($historiaOdon, $data);
        return response()->noContent();
    }



    /**
     * Display the specified resource.
     */
    public function show(Historia $historia, Request $request)
    {
        /* @var User $user*/
        $user = $request->user();

        if ($user->isAdmin()) {

        } elseif ($user->isAdmision()) {

        } elseif ($user->isProfesor()) {

        } elseif ($user->isEstudiante()) {
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
        /* @var User $user*/
        $user = $request->user();

        if ($user->isAdmin()) {

        } elseif ($user->isAdmision()) {

        } elseif ($user->isProfesor()) {

        } elseif ($user->isEstudiante()) {

            $historia->makeVisible(['paciente']);
            $historia->paciente;

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
}
