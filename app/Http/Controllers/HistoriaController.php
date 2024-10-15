<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAntFamiliaresRequest;
use App\Http\Requests\StoreAntPersonalesRequest;
use App\Http\Requests\StoreHistoriaOdontologicaRequest;
use App\Http\Requests\StoreOdontologiaMediaRequest;
use App\Http\Requests\StorePacienteRequest;
use App\Http\Requests\StoreTrastornosRequest;
use App\Http\Requests\UpdateAntFamiliaresRequest;
use App\Http\Requests\UpdateAntPersonalesRequest;
use App\Http\Requests\UpdateEstudioModelos;
use App\Http\Requests\UpdateExamenRadiografico;
use App\Http\Requests\UpdateHistoriaOdontologicaRequest;
use App\Http\Requests\UpdateHistoriaPeriodontalRequest;
use App\Http\Requests\UpdateHistoriaRequest;
use App\Http\Requests\UpdateModificacionesPlanTratamiento;
use App\Http\Requests\UpdatePacienteRequest;
use App\Http\Requests\UpdatePeriodontodiagramaRequest;
use App\Http\Requests\UpdatePlanTratamiento;
use App\Http\Requests\UpdateSecuenciaTratamiento;
use App\Http\Requests\UpdateTrastornosRequest;
use App\Http\Resources\Odontologia\HistoriaResource;
use App\Models\Group\Homework;
use App\Models\Historia;
use App\Models\HistoriaOdontologica;
use App\Models\Paciente;
use App\Models\Trastornos;
use App\Models\User;
use App\Services\CorreccionService;
use App\Services\HistoriaService;
use App\Services\RadiografiaService;
use App\Status;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;
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

        if ($user->hasRole('admin')) {

            $statistics = [
                'created_HCE' => Historia::count(),
            ];

            return inertia()->render('Admin/Historias/Dashboard', [
                'statistics' => $statistics
            ]);
        } elseif ($user->hasRole('admision')) {

        } elseif ($user->hasRole('profesor')) {

        } elseif ($user->hasRole('estudiante')) {
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

        if ($user->hasRole('admin')) {

            $historias = Historia::all();

            return inertia()->render('Admin/Historias/Index', [
                'historias' => HistoriaResource::collection($historias),
            ]);
        } elseif ($user->hasRole('admision')) {

        } elseif ($user->hasRole('profesor')) {

        } elseif ($user->hasRole('estudiante')) {

            $historias = $user->historias()->with(['paciente'])->get();

            return Inertia::render('Estudiante/Historias/Index', [
                'historias' => HistoriaResource::collection($historias),
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

    public function store2(Request $request)
    {
        $data = $request->validate([
            'paciente_id' => ['required', 'uuid', 'exists:'.Paciente::class.',id'],
        ]);

        /** @var Paciente $paciente */
        $paciente = Paciente::find($data['paciente_id']);

        /** @var User $user */
        $user = $request->user();

        if ($paciente->assigned_to !== $user->id) {
            message('No estas autorizado para crear un historia a esta paciente', Type::Error);
            message('Debes estar asignado como medico tratante', Type::Info);
        }

        $historia = $this->historiaService->addHistoria($paciente, $user);
        $paciente->touch();

        message('Historia creada exitosamente. A continuacion podrá editar la historia asignada');
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

    public function updateHistoriaPeriodontal(Historia $historia, UpdateHistoriaPeriodontalRequest $request)
    {
        $data = $request->validated();

        /* @var HistoriaOdontologica $historia_odon */
        $historia_odon = $historia->historiaOdontologica;

        $historia_odon->historia_periodontal->higiene_bucal['frecuencia_cepillado'] = $data['higiene_bucal']['frecuencia_cepillado'];
        $historia_odon->historia_periodontal->higiene_bucal['tipo_cepillo'] = $data['higiene_bucal']['tipo_cepillo'];
        $historia_odon->historia_periodontal->higiene_bucal['metodo_cepillado'] = $data['higiene_bucal']['metodo_cepillado'];
        $historia_odon->historia_periodontal->higiene_bucal['metodo_auxiliar']['hilo_dental'] = $data['higiene_bucal']['metodo_auxiliar']['hilo_dental'];
        $historia_odon->historia_periodontal->higiene_bucal['metodo_auxiliar']['enjuague_bucal'] = $data['higiene_bucal']['metodo_auxiliar']['enjuague_bucal'];
        $historia_odon->historia_periodontal->higiene_bucal['metodo_auxiliar']['hidroterapia'] = $data['higiene_bucal']['metodo_auxiliar']['hidroterapia'];
        $historia_odon->historia_periodontal->higiene_bucal['metodo_auxiliar']['cepillo_interdental'] = $data['higiene_bucal']['metodo_auxiliar']['cepillo_interdental'];
        $historia_odon->historia_periodontal->higiene_bucal['sustancia_reveladora']['descripcion'] = $data['higiene_bucal']['sustancia_reveladora']['descripcion'];
        $historia_odon->historia_periodontal->higiene_bucal['sustancia_reveladora']['otro'] = $data['higiene_bucal']['sustancia_reveladora']['otro'];
        $historia_odon->historia_periodontal->higiene_bucal['cepillado_lengua'] = $data['higiene_bucal']['cepillado_lengua'];

        $historia_odon->historia_periodontal->control_higiene_bucal['tecnica_cepillado_ensenada'] = $data['control_higiene_bucal']['tecnica_cepillado_ensenada'];
        $historia_odon->historia_periodontal->control_higiene_bucal['cepillo_recomendado'] = $data['control_higiene_bucal']['cepillo_recomendado'];
        $historia_odon->historia_periodontal->control_higiene_bucal['metodos_auxiliares_requeridos'] = $data['control_higiene_bucal']['metodos_auxiliares_requeridos'];
        $historia_odon->historia_periodontal->control_higiene_bucal['placa_bacteriana_lengua'] = $data['control_higiene_bucal']['placa_bacteriana_lengua'];
        $historia_odon->historia_periodontal->control_higiene_bucal['control_halitosis'] = $data['control_higiene_bucal']['control_halitosis'];
        $historia_odon->historia_periodontal->control_higiene_bucal['tratamiento'] = $data['control_higiene_bucal']['tratamiento'];

        $historia_odon->saveOrFail();

        message('Historia periodontal actualizada exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function updatePeriodontodiagrama(Historia $historia, UpdatePeriodontodiagramaRequest $request)
    {
        $periodontodiagrama = $request->validated()['periodontodiagrama'];

        /* @var HistoriaOdontologica $historia_odon */
        $historia_odon = $historia->historiaOdontologica;

        $historia_odon->addMedia($periodontodiagrama)->toMediaCollection('periodontodiagrama');

        message('Periodontodiagrama actualizado exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function storeOdontologiaMedia(Historia $historia, StoreOdontologiaMediaRequest $request)
    {
        /* @var HistoriaOdontologica $historia_odon */
        $historia_odon = $historia->historiaOdontologica;
        $data = $request->validated();
        $file = $data['file'];

        $properties = [
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
        ];
        $historia_odon->addMedia($file)->withCustomProperties($properties)->toMediaCollection('anymedia');

        message('Archivos anexados a la historia exitosamente');
        return response(null, '200');
    }

    public function getMedia(Historia $historia, string $id)
    {
        /* @var HistoriaOdontologica $historia_odo */
        $historia_odo = $historia->historiaOdontologica;

        $file = $historia_odo->getMedia('anymedia')->firstOrFail(fn(Media $media) => $media->uuid === $id);

        return response()->file($file->getPath());
    }

    /**
     * Display the specified resource.
     */
    public function show(Historia $historia, Request $request)
    {
        /* @var User $user */
        $user = $request->user();

        $homework = null;

        if ($request->has('homework')) {
            $homework_id = $request->validate(['homework' => ['ulid', 'exists:'.Homework::class.',id']]);

            /** @var Homework $homework */
            $homework = Homework::with(['assignment:id,group_id' => ['group:id']])->find($homework_id)->first();

            $document = $homework->documents->firstWhere('id', $historia->id);

            $corrections = $document['corrections'];

        }

        if ($user->hasRole('admin')) {

        } elseif ($user->hasRole('admision')) {

        } elseif ($user->hasRole('profesor')) {
            $historia->load(['paciente', 'antFamiliares', 'antPersonales', 'trastornos', 'historiaOdontologica',]);

            return Inertia::render('Estudiante/Historias/Show', [
                'historia' => new HistoriaResource($historia),
                'homework' => $homework,
            ]);
        } elseif ($user->hasRole('estudiante')) {

            $historia->load(['paciente', 'antFamiliares', 'antPersonales', 'trastornos', 'historiaOdontologica',]);

            return Inertia::render('Estudiante/Historias/Show', [
                'historia' => new HistoriaResource($historia),
                'homework' => $homework,
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

        $homework = null;

        if ($request->has('homework')) {
            $homework_id = $request->validate(['homework' => ['ulid', 'exists:'.Homework::class.',id']]);

            /** @var Homework $homework */
            $homework = Homework::with(['assignment:id,group_id' => ['group:id']])->find($homework_id)->first();

            $document = $homework->documents->firstWhere('id', $historia->id);

            $corrections = $document['corrections'];

        }

        if ($user->hasRole('admin')) {

        } elseif ($user->hasRole('admision')) {

        } elseif ($user->hasRole('profesor')) {

        } elseif ($user->hasRole('estudiante')) {

            $historia->load(['paciente', 'antFamiliares', 'antPersonales', 'trastornos', 'historiaOdontologica',]);

            return Inertia::render('Estudiante/Historias/Edit', [
                'historia' => new HistoriaResource($historia),
                'homework' => $homework,
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

    public function changeStatus(Historia $historia, Request $request)
    {
        $data = $request->validate([
           'status' => ['required', Rule::enum(Status::class)->except([Status::ENTREGADA])]
        ]);

        if ($historia->status === Status::CERRADA) {
            message('La historia ya se encuentra cerrada y no se puede modificar su estado');
            return response(null, 400);
        }

        switch ($data['status']) {
            case Status::ABIERTA->value:
                $new_status = Status::ABIERTA;
                break;
            case Status::CORRECCION->value:
                $new_status = Status::CORRECCION;
                break;
            case Status::CERRADA->value:
                $new_status = Status::CERRADA;
                break;
        }

        $this->historiaService->changeStatus($historia,$new_status);

        message('Estado de la historia cambiado exitosamente', Type::Success);

        $message = '';

        switch ($data['status']) {
            case Status::ABIERTA->value:
                $message = 'El nuevo estado es "Abierta"';
                break;
            case Status::CORRECCION->value:
                $message = 'El nuevo estado es "Corrección"';
                break;
            case Status::CERRADA->value:
                $message = 'El nuevo estado es "Cerrada"';
                break;
        }

        message($message, Type::Info);

        return response(null, 200);
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
