<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePacienteRequest;
use App\Http\Requests\UpdatePacienteRequest;
use App\Http\Resources\PacienteResource;
use App\Models\Paciente;
use App\Models\User;
use App\Services\PacienteService;
use Inertia\Inertia;

class PacienteController extends Controller
{
    const MAX_PACIENTES_ASSIGNED_PER_USER = 5;

    /**
     * Create a new controller instance.
     */
    public function __construct(
        protected PacienteService $pacienteService,
    )
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var User $user */
        $user = auth()->user();

        if ($user->can('viewAny', Paciente::class)) {
            message('No tienes permisos para ver pacientes', \Type::Info);
            return back();
        }

        if ($user->hasPermission('pacientes-index-all')) {
            $pacientes = Paciente::all();
        } else {
            $pacientes = Paciente::where('assigned_to', $user->id)->get();
        }

        return Inertia::render('Pacientes/Index', [
            'pacientes' => PacienteResource::collection($pacientes)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        /** @var User $user */
        $user = auth()->user();

        if ($user->cannot('create', Paciente::class)) {
            message('No estas autorizado para registrar pacientes', \Type::Info);
            return back();
        }

        if (Paciente::query()->where('assigned_to', $user->id)->count() >= 5) {
            message('Ya tienes 5 o más pacientes asignados. No puedes registrar más pacientes', \Type::Error);
            return back();
        }

        message('Recuerda que solo puedes tener hasta ' . self::MAX_PACIENTES_ASSIGNED_PER_USER . ' pacientes asignados', \Type::Info);
        return Inertia::render('Pacientes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePacienteRequest $request)
    {
        /** @var User $user */
        $user = auth()->user();

        if ($user->cannot('create', Paciente::class)) {
            message('No estas autorizado para registrar pacientes', \Type::Info);
            return back();
        }

        if (Paciente::query()->where('assigned_to', $user->id)->count() >= 5) {
            message('Ya tienes 5 o más pacientes asignados. No puedes registrar más pacientes', \Type::Error);
            return back();
        }

        $validated = $request->validated();
        $newPaciente = $this->pacienteService->storePaciente($validated);
        message('Paciente creado', \Type::Success);
        return to_route('pacientes.show', ['paciente' => $newPaciente->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Paciente $paciente)
    {
        /** @var User $user */
        $user = auth()->user();

        if ($user->cannot('view', $paciente)) {
            message('No tienes permiso para ver este paciente', \Type::Info);
            return back();
        }

        $paciente->load(['medicoTratante', 'historia', 'historiaEndodoncia']);

        return Inertia::render('Pacientes/Show', [
            'paciente' => new PacienteResource($paciente),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paciente $paciente)
    {
        /** @var User $user */
        $user = auth()->user();

        if ($user->cannot('update', $paciente)) {
            message('No estas autorizado para modificar este paciente', \Type::Info);
            return back();
        }

        $paciente->load(['medicoTratante.profile']);
        return Inertia::render('Pacientes/Edit', [
            'paciente' => new PacienteResource($paciente),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePacienteRequest $request, Paciente $paciente)
    {
        /** @var User $user */
        $user = auth()->user();

        if ($user->cannot('update', $paciente)) {
            message('No estas autorizado para modificar este paciente', \Type::Info);
            return back();
        }

        $data = $request->validated();
        $this->pacienteService->updatePaciente($paciente, $data);
        message('Paciente actualizado exitosamente', \Type::Success);
        return response(null, 200);
    }

    public function getFoto(Paciente $paciente, string $id)
    {
        /** @var User $user */
        $user = auth()->user();

        if ($user->cannot('view', $paciente)) {
            return response(null, 404);
        }


        $foto = $paciente->getFirstMedia('foto');

        if ($foto->uuid === $id) return response()->file($foto->getPath());

        return response(null, 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public
    function destroy(Paciente $paciente)
    {
        //
    }
}
