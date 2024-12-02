<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAntFamiliaresRequest;
use App\Http\Requests\StoreAntPersonalesRequest;
use App\Http\Requests\StoreControlPlaca;
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
use App\Http\Resources\Group\HomeworkResource;
use App\Http\Resources\Odontologia\HistoriaResource;
use App\Models\Group;
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
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Type;

class HistoriaController extends Controller
{
    const MAX_HRA_PER_USER = 5;

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

        if ($user->cannot('viewAny', Historia::class)) {
            message('No tienes permiso para ver historias', Type::Info);
            return back();
        }

        if ($user->hasPermission('historias-index-all')) {

            $statistics = [
                'created_HCE' => Historia::count(),
            ];

            if (!$request->inertia() and $request->expectsJson()) {
                return response()->json([
                    'statistics' => $statistics
                ]);
            }

            return inertia()->render('Historias/Dashboard', [
                'statistics' => $statistics
            ]);
        } elseif ($user->hasPermission('homeworks-index-all')) {

            $statistics = [];

            if (!$request->inertia() and $request->expectsJson()) {
                return response()->json([
                    'statistics' => $statistics
                ]);
            }

            return Inertia::render('Historias/Dashboard', [
                'statistics' => $statistics
            ]);
        } elseif ($user->hasPermission('historias-read')) {

            $historiasCreadas = Historia::where('autor_id', $user->id)->count();

            $statistics = [
                'historiasCreadas' => $historiasCreadas
            ];

            if (!$request->inertia() and $request->expectsJson()) {
                return response()->json([
                    'statistics' => $statistics
                ]);
            }

            return Inertia::render('Historias/Dashboard', [
                'statistics' => $statistics
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

        if ($user->cannot('viewAny', Historia::class)) {
            message('No tienes permiso para ver historias', Type::Info);
            return back();
        }

        if ($user->hasPermission('historias-index-all')) {

            $historias = Historia::with(['autor.profile', 'paciente'])->get();

            return inertia()->render('Historias/Index', [
                'historias' => HistoriaResource::collection($historias),
            ]);
        } elseif ($user->hasRole('profesor')) {

            /** @var Collection<Group> $groups */
            $groups = Group::whereJsonContains('members', $user->id)->get();

            $homeworks = $groups->map(fn(Group $group) => $group->assignments->map(fn(Group\Assignment $assignment) => $assignment->homeworks->map(fn(Homework $homework) => $homework->documents)));

        } elseif ($user->hasRole('estudiante')) {

            $historias = $user->historias()->with(['paciente'])->get();

            return Inertia::render('Historias/Index', [
                'historias' => HistoriaResource::collection($historias),
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        /** @var User $user */
        $user = request()->user();

        if ($user->cannot('create', Historia::class)) {
            message('No tienes permiso para crear historias', Type::Info);
            return back();
        }

        if (Paciente::where('assigned_to', $user->id)->count() > 0) {
            message('Por favor, selecciona el paciente. Luego, selecciona la pestaña de "historia médica" y crea la historia');
            return to_route('pacientes.index');
        } else {
            message('No tienes ningún paciente asignado❗. Por favor, registra un paciente primero');
            return to_route('pacientes.create');
        }
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
        /** @var User $user */
        $user = $request->user();

        if ($user->cannot('create', Historia::class)) {
            message('No tienes permiso para crear historias', Type::Info);
            return back();
        }

        if ($user->historias()->count() >= self::MAX_HRA_PER_USER) {
            message('Ya has creado 5 historias. No puedes crear más historias.', Type::Error);
            return back();
        }

        $data = $request->validate([
            'paciente_id' => ['required', 'uuid', 'exists:' . Paciente::class . ',id'],
        ]);

        /** @var Paciente $paciente */
        $paciente = Paciente::find($data['paciente_id']);

        if ($paciente->assigned_to !== $user->id) {
            message('No estas autorizado para crear un historia a este paciente', Type::Error);
            message('Debes estar asignado como médico tratante', Type::Info);
            return back();
        }

        if ($user->cannot('update', $paciente)) {
            message('No tienes permiso para modificar este paciente', Type::Info);
            return back();
        }

        $historia = $this->historiaService->addHistoria($paciente, $user);
        $paciente->touch();

        message('Historia creada exitosamente. A continuacion podrá editar la historia asignada');
        return to_route('historias.edit', [
            'historia' => $historia->id
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Historia $historia, Request $request)
    {
        /* @var User $user */
        $user = $request->user();

        if ($user->cannot('view', $historia)) {
            message('No tiene permiso para ver esta historia');
            return back();
        }

        $homework = null;

        if ($request->has('homework')) {
            $homework_id = $request->validate(['homework' => ['ulid', 'exists:' . Homework::class . ',id']]);

            /** @var Homework $homework */
            $homework = Homework::with(['assignment:id,group_id' => ['group:id']])->find($homework_id)->first();

            $document = $homework->documents->firstWhere('id', $historia->id);

            $corrections = $document['corrections'];

        }

        if ($user->hasRole('admin')) {
            $historia->load(['paciente', 'antFamiliares', 'antPersonales', 'trastornos', 'historiaOdontologica',]);

            return Inertia::render('Historias/Show', [
                'historia' => new HistoriaResource($historia),
                'homework' => $homework,
            ]);
        } elseif ($user->hasRole('admision')) {
            $historia->load(['paciente', 'antFamiliares', 'antPersonales', 'trastornos', 'historiaOdontologica',]);

            return Inertia::render('Historias/Show', [
                'historia' => new HistoriaResource($historia),
            ]);
        } elseif ($user->hasRole('profesor')) {
            $historia->load(['paciente', 'antFamiliares', 'antPersonales', 'trastornos', 'historiaOdontologica',]);

            return Inertia::render('Historias/Show', [
                'historia' => new HistoriaResource($historia),
                'homework' => $homework,
            ]);
        } elseif ($user->hasRole('estudiante')) {

            $historia->load(['paciente', 'antFamiliares', 'antPersonales', 'trastornos', 'historiaOdontologica',]);

            return Inertia::render('Historias/Show', [
                'historia' => new HistoriaResource($historia),
                'homework' => $homework ? new HomeworkResource($homework) : null,
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

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

        $homework = null;

        if ($request->has('homework')) {
            $homework_id = $request->validate(['homework' => ['ulid', 'exists:' . Homework::class . ',id']]);

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

            return Inertia::render('Historias/Edit', [
                'historia' => new HistoriaResource($historia),
                'homework' => $homework ? new HomeworkResource($homework) : null,
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHistoriaRequest $request, Historia $historia)
    {
        /* @var User $user */
        $user = $request->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

        $data = $request->validated();
        $this->historiaService->updateHistoria($historia, $data);

        message('Historia actualizada', Type::Success);
        return response(null, 200);
    }

    public function assignID(Request $request, Historia $historia)
    {
        if ($request->user()->cannot('assignID', $historia)) {
            message('No posee permisos para asignar número a esta historia');
            return back();
        }

        $data = $request->validate([
            'numero' => ['sometimes', 'nullable', 'string', 'unique:' . Historia::class . ',numero'],
        ]);

        $historia->numero = $data['numero'];
        $historia->update();

        message('Número asignado', Type::Success);
        return response(null, 200);
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
        /* @var User $user */
        $user = $request->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

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
        /* @var User $user */
        $user = $request->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

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
        /* @var User $user */
        $user = $request->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

        $data = $request->validated();
        $this->historiaService->addHistoriaOdontologica($historia, $data);
        return response(null, 201);
    }

    public function updateHistoriaOdontologica(Historia $historia, UpdateHistoriaOdontologicaRequest $request)
    {
        /* @var User $user */
        $user = $request->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

        $data = $request->validated();
        $this->historiaService->updateHistoriaOdontologica($historia, $data);
        message('Historia odontológica actualizada exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function updateEstudioModelos(Historia $historia, UpdateEstudioModelos $request)
    {
        /* @var User $user */
        $user = $request->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

        $data = $request->validated();
        $this->historiaService->updateEstudioModelos($historia, $data);
        message('Historia odontológica actualizada exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function updatePlanTratamiento(Historia $historia, UpdatePlanTratamiento $request)
    {
        /* @var User $user */
        $user = $request->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

        $data = $request->validated();
        $this->historiaService->updatePlanTratamiento($historia, $data);
        message('Historia odontológica actualizada exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function updateModificacionesPlanTratamiento(Historia $historia, UpdateModificacionesPlanTratamiento $request)
    {
        /* @var User $user */
        $user = $request->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

        $data = $request->validated();
        $this->historiaService->updateModificacionesPlanTratamiento($historia, $data);
        message('Historia odontológica actualizada exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function updateSecuenciaTratamiento(Historia $historia, UpdateSecuenciaTratamiento $request)
    {
        /* @var User $user */
        $user = $request->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

        $data = $request->validated();
        $this->historiaService->updateSecuenciaTratamiento($historia, $data);
        message('Historia odontológica actualizada exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function approveSecuenciaTratamiento(Request $request, Historia $historia, string $id)
    {
        /** @var HistoriaOdontologica $historiaOdontologica */
        $historiaOdontologica = $historia->historiaOdontologica;

        /** @var User $user */
        $user = $request->user();

        if (!$historiaOdontologica->secuencia_tratamiento->some(fn($secuencia) => $secuencia['id'] === $id)) {
            message('Tratamiento no encontrado', Type::Error);
            return response(null, 404);
        }

        $this->historiaService->approveSecuenciaTratamiento($historia, $user, $id);

        message('Tratamiento aprobado', Type::Success);
        return response(null, 200);
    }

    public function updateExamenRadiografico(Historia $historia, UpdateExamenRadiografico $request)
    {
        /* @var User $user */
        $user = $request->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

        /* @var HistoriaOdontologica $historia_odon */
        $historia_odon = $historia->historiaOdontologica;

        if ($request->has('interpretacion_panoramica')) {

            $int_panoramica = $request->safe()->only(['interpretacion_panoramica'])['interpretacion_panoramica'];

            $descripcion = $int_panoramica['descripcion'];

            if (isset($int_panoramica['imagenes']) and count($int_panoramica['imagenes']) !== 0) {
                $imagenes = collect($int_panoramica['imagenes']);
                $imagenes->each(fn(UploadedFile $file) => $historia_odon->addMedia($file)->toMediaCollection('panoramicas'));
            }

            $historia_odon->examen_radiografico->interpretacion_panoramica['nasomaxilar'] = $descripcion['nasomaxilar'];
            $historia_odon->examen_radiografico->interpretacion_panoramica['ATM'] = $descripcion['ATM'];
            $historia_odon->examen_radiografico->interpretacion_panoramica['mandibular'] = $descripcion['mandibular'];
            $historia_odon->examen_radiografico->interpretacion_panoramica['dento_alveolar_sup'] = $descripcion['dento_alveolar_sup'];
            $historia_odon->examen_radiografico->interpretacion_panoramica['dento_alveolar_inf'] = $descripcion['dento_alveolar_inf'];
            $historia_odon->save();
        }

        if ($request->has('interpretacion_coronales')) {

            $int_coronales = $request->safe()->only(['interpretacion_coronales'])['interpretacion_coronales'];

            if (isset($int_coronales['imagenes']) and count($int_coronales['imagenes']) !== 0) {
                $imagenes = collect($int_coronales['imagenes']);
                $imagenes->each(fn(UploadedFile $file) => $historia_odon->addMedia($file)->toMediaCollection('coronales'));
            }

            $historia_odon->examen_radiografico->interpretacion_coronales = $int_coronales['descripcion'] ?? null;
            $historia_odon->save();
        }

        if ($request->has('interpretacion_periapicales')) {

            $int_periapicales = $request->safe()->only(['interpretacion_periapicales'])['interpretacion_periapicales'];

            if (isset($int_periapicales['imagenes']) and count($int_periapicales['imagenes']) !== 0) {
                $imagenes = collect($int_periapicales['imagenes']);
                $imagenes->each(fn(UploadedFile $file) => $historia_odon->addMedia($file)->toMediaCollection('periapicales'));
            }

            $historia_odon->examen_radiografico->interpretacion_periapicales = $int_periapicales['descripcion'] ?? null;
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

// todo move this to service

//        $historia_odon->historia_periodontal->higiene_bucal['frecuencia_cepillado'] = $data['higiene_bucal']['frecuencia_cepillado'];
//        $historia_odon->historia_periodontal->higiene_bucal['tipo_cepillo'] = $data['higiene_bucal']['tipo_cepillo'];
//        $historia_odon->historia_periodontal->higiene_bucal['metodo_cepillado'] = $data['higiene_bucal']['metodo_cepillado'];
//        $historia_odon->historia_periodontal->higiene_bucal['metodo_auxiliar'] = $data['higiene_bucal']['metodo_auxiliar'];
//        $historia_odon->historia_periodontal->higiene_bucal['cepillado_lengua'] = $data['higiene_bucal']['cepillado_lengua'];
//        $historia_odon->historia_periodontal->higiene_bucal['hemorragia_gingival'] = $data['higiene_bucal']['hemorragia_gingival'];
//        $historia_odon->historia_periodontal->higiene_bucal['xerostomia'] = $data['higiene_bucal']['xerostomia'];
//        $historia_odon->historia_periodontal->higiene_bucal['sialorrea'] = $data['higiene_bucal']['sialorrea'];
//
//        $historia_odon->historia_periodontal->control_higiene_bucal['tecnica_cepillado_ensenada'] = $data['control_higiene_bucal']['tecnica_cepillado_ensenada'];
//        $historia_odon->historia_periodontal->control_higiene_bucal['cepillo_recomendado'] = $data['control_higiene_bucal']['cepillo_recomendado'];
//        $historia_odon->historia_periodontal->control_higiene_bucal['metodos_auxiliares_requeridos'] = $data['control_higiene_bucal']['metodos_auxiliares_requeridos'];
//        $historia_odon->historia_periodontal->control_higiene_bucal['placa_bacteriana_lengua'] = $data['control_higiene_bucal']['placa_bacteriana_lengua'];
//        $historia_odon->historia_periodontal->control_higiene_bucal['control_halitosis'] = $data['control_higiene_bucal']['control_halitosis'];
//        $historia_odon->historia_periodontal->control_higiene_bucal['tratamiento'] = $data['control_higiene_bucal']['tratamiento'];

        $historia_odon->historia_periodontal->higiene_bucal = $data['higiene_bucal'];
        $historia_odon->historia_periodontal->control_higiene_bucal = $data['control_higiene_bucal'];
        $historia_odon->update();

        message('Historia periodontal actualizada exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function approvePeriodontalDischarge(Request $request, Historia $historia)
    {
        // todo: use gate

        $data = $request->validate([
            'nota' => ['required', 'string', 'max:30'],
        ]);

        $user = $request->user();
        $historia_odon = $historia->historiaOdontologica;

        $historia_odon->historia_periodontal->approver_id = $user->id;
        $historia_odon->historia_periodontal->approval = $user->id;
        $historia_odon->historia_periodontal->nota = $data['nota'];

        $historia_odon->update();

        message('Historia periodontal actualizada exitosamente', Type::Success);
        return response(null, 200);
    }

    public function updatePeriodontodiagrama(Historia $historia, UpdatePeriodontodiagramaRequest $request)
    {
        /* @var User $user */
        $user = $request->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

        $periodontodiagrama = $request->validated()['periodontodiagrama'];

        /* @var HistoriaOdontologica $historia_odon */
        $historia_odon = $historia->historiaOdontologica;

        $historia_odon->addMedia($periodontodiagrama)->toMediaCollection('periodontodiagrama');

        message('Periodontodiagrama actualizado exitosamente 👍🏻', Type::Success);
        return response(null, 200);
    }

    public function storeOdontologiaMedia(Historia $historia, StoreOdontologiaMediaRequest $request)
    {
        /* @var User $user */
        $user = $request->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

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

    public function updateConsentimiento(Request $request, Historia $historia)
    {
        $user = $request->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

        /** @var HistoriaOdontologica $historia_odon */
        $historia_odon = $historia->historiaOdontologica;

        $prevConse = $historia_odon->getFirstMedia('consentimiento');
        if (isset($prevConse)) {
            message('Ya existe un consentimiento y no puede ser actualizado', Type::Error);
            return back();
        }

        $data = $request->validate([
            'consentimiento' => ['required', 'image', 'dimensions:min_width=100,min_height=100,max_width=4000,max_height=4000', 'min:5', 'max:2000']
        ]);
        $file = $data['consentimiento'];

        $historia_odon->addMedia($file)->toMediaCollection('consentimiento');

        message('Archivo anexado a la historia exitosamente');
        return response(null, '200');
    }

    public function getConsentimiento(Historia $historia, string $id)
    {
        $user = request()->user();

        if ($user->cannot('view', $historia)) {
            return response(null, 404);
        }

        /* @var HistoriaOdontologica $historia_odo */
        $historia_odo = $historia->historiaOdontologica;

        $consentimiento = $historia_odo->getMedia('consentimiento')->first(fn(Media $media) => $media->uuid === $id);

        return response()->file($consentimiento->getPath());
    }

    public function storeControlPlaca(Historia $historia, StoreControlPlaca $storeControlPlaca)
    {
        $user = request()->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

        $data = $storeControlPlaca->validated();

        $new_control_placa = [
            'id' => (string) Str::ulid(),
            'fecha' => now(),
            'modelo' => $data['control_placa'],
            'approver_id' => null,
            'approval' => null,
        ];

        /** @var HistoriaOdontologica $historia_odon */
        $historia_odon = $historia->historiaOdontologica;

        $control_placa_collection = collect($historia_odon->historia_periodontal->control_placa);

        $control_placa_collection->push($new_control_placa);

        $historia_odon->historia_periodontal->control_placa = $control_placa_collection->toArray();

        $historia_odon->save();

        message('Control de placa agregado');
        return response(null, '200');
    }

    public function approveControlPlaca(Request $request, Historia $historia, string $id)
    {
        /** @var HistoriaOdontologica $historiaOdontologica */
        $historiaOdontologica = $historia->historiaOdontologica;

        /** @var User $user */
        $user = $request->user();

        $control_placa = collect($historiaOdontologica->historia_periodontal->control_placa);

        $historiaOdontologica->historia_periodontal->control_placa = $control_placa->map(function ($control) use ($id, $user) {

            if ($control['id'] === $id) {
                $control['approver_id'] = $user->id;
                $control['approval'] = $user->id;
            }

            return $control;
        });

        $historiaOdontologica->update();

        message('Modificacion aprobada', Type::Success);
        return response(null, 200);
    }

    public function getMedia(Historia $historia, string $id)
    {
        /* @var HistoriaOdontologica $historia_odo */
        $historia_odo = $historia->historiaOdontologica;

        $file = $historia_odo->getMedia('anymedia')->firstOrFail(fn(Media $media) => $media->uuid === $id);

        return response()->file($file->getPath());
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

        $this->historiaService->changeStatus($historia, $new_status);

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
        /* @var User $user */
        $user = request()->user();

        if ($user->cannot('view', $historia)) {
            message('No tiene permiso para ver esta historia');
            return back();
        }

        /* @var HistoriaOdontologica $historia_odo */
        $historia_odo = $historia->historiaOdontologica;

        /* @var Media $panoramica */
        $panoramica = $historia_odo->getMedia('panoramicas')->firstOrFail(fn(Media $media) => $media->uuid === $id);

        return response()->file($panoramica->getPath());
    }

    public function getCoronales(Historia $historia, string $id)
    {
        $user = request()->user();

        if ($user->cannot('view', $historia)) {
            message('No tiene permiso para ver esta historia');
            return back();
        }

        /* @var HistoriaOdontologica $historia_odo */
        $historia_odo = $historia->historiaOdontologica;

        /* @var Media $coronales */
        $coronales = $historia_odo->getMedia('coronales')->firstOrFail(fn(Media $media) => $media->uuid === $id);

        return response()->file($coronales->getPath());
    }

    public function getPeriapicales(Historia $historia, string $id)
    {
        $user = request()->user();

        if ($user->cannot('view', $historia)) {
            message('No tiene permiso para ver esta historia');
            return back();
        }

        /* @var HistoriaOdontologica $historia_odo */
        $historia_odo = $historia->historiaOdontologica;

        /* @var Media $periapicales */
        $periapicales = $historia_odo->getMedia('periapicales')->firstOrFail(fn(Media $media) => $media->uuid === $id);

        return response()->file($periapicales->getPath());
    }

    public function getPeriodontodiagrama(Historia $historia, string $id)
    {
        $user = request()->user();

        if ($user->cannot('view', $historia)) {
            message('No tiene permiso para ver esta historia');
            return back();
        }

        /* @var HistoriaOdontologica $historia_odo */
        $historia_odo = $historia->historiaOdontologica;

        $periodontodiagrama = $historia_odo->getMedia('periodontodiagrama')->firstOrFail(fn(Media $media) => $media->uuid === $id);

        return response()->file($periodontodiagrama->getPath());
    }

    public function approveModificacion(Request $request, Historia $historia, string $id)
    {
        /** @var HistoriaOdontologica $historiaOdontologica */
        $historiaOdontologica = $historia->historiaOdontologica;

        /** @var User $user */
        $user = $request->user();

        if (!$historiaOdontologica->modificaciones_plan_tratamiento->some(fn($modificacion) => $modificacion['id'] === $id)) {
            message('Modificación no encontrada', Type::Error);
            return response(null, 404);
        }

        $this->historiaService->approveModificacionTratamiento($historia, $user, $id);

        message('Modificacion aprobada', Type::Success);
        return response(null, 200);
    }

    public function updateModificacionesConsentimiento(Request $request, Historia $historia) {
        $user = $request->user();

        if (!$historia->isOpen()) {
            message('La historia no se encuentra abierta a modificaciones', Type::Info);
            return back();
        }

        if ($user->cannot('update', $historia)) {
            message('No posee permisos para modificar esta historia');
            return back();
        }

        /** @var HistoriaOdontologica $historia_odon */
        $historia_odon = $historia->historiaOdontologica;

        $data = $request->validate([
            'modificaciones_consentimiento' => ['required', 'image', 'dimensions:min_width=100,min_height=100,max_width=4000,max_height=4000', 'min:5', 'max:2000']
        ]);
        $file = $data['modificaciones_consentimiento'];

        $historia_odon->addMedia($file)->toMediaCollection('modificaciones_consentimiento');

        message('Archivo anexado a la historia exitosamente');
        return response(null, '200');
    }

    public function getModificacionesConsentimiento(Historia $historia, string $id)
    {
        $user = request()->user();

        if ($user->cannot('view', $historia)) {
            return response(null, 404);
        }

        /* @var HistoriaOdontologica $historia_odo */
        $historia_odo = $historia->historiaOdontologica;

        $consentimiento = $historia_odo->getMedia('modificaciones_consentimiento')->first(fn(Media $media) => $media->uuid === $id);

        return response()->file($consentimiento->getPath());
    }

    public function downloadHistoria(Request $request, Historia $historia)
    {
        $pdf = Pdf::loadView('print.historia', [
            'historia' => $historia,
        ])->setPaper('letter');

        if ($request->is('*/download')) {
            return $pdf->download(($historia->numero ?? 'HCE-sin-numero') . '.pdf');
        }

        if ($request->is('*/print')) {
            return $pdf->stream(($historia->numero ?? 'HCE-sin-numero') . '.pdf');
        }

        return response(null, 404);
    }

    public function share(Request $request, Historia $historia)
    {

        $data = $request->validate([
            'users' => ['required', 'list',],
            'users.*' => ['uuid',],
        ]);

        $users = collect($data['users']);

        $historia->shared_with = $historia->shared_with->union($users);

        $historia->status = Status::ENTREGADA;
        $historia->update();

        message('Historia compartida exitosamente', Type::Success);
        return response(null, 200);
    }
}
