<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePacienteRequest;
use App\Http\Requests\UpdatePacienteRequest;
use App\Http\Resources\PacienteResource;
use App\Models\Historia;
use App\Models\Paciente;
use App\Models\User;
use App\Services\PacienteService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class PacienteController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        protected PacienteService $pacienteService,
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        /** @var User $user */
        $user = auth()->user();

        $user->can('viewAny', Paciente::class);

        if ($user->hasPermission('pacientes-index-all')) {
            $pacientes = Paciente::all();
        } else {
            $pacientes = Paciente::where('assigned_to', $user->id)->get();
        }

        return Inertia::render('Estudiante/Pacientes/Index', [
            'pacientes' => PacienteResource::collection($pacientes)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();

        if ($user->hasPermission('pacientes-create')) {
            return Inertia::render('Estudiante/Pacientes/Create');
        }

        message('No estas autorizado a registrar pacientes', \Type::Error);
        return to_route('dashboard');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePacienteRequest $request)
    {
        $validated = $request->validated();
        $newPaciente = $this->pacienteService->storePaciente($validated);
        message('Paciente creado.', \Type::Success);
        return to_route('pacientes.show', ['paciente' => $newPaciente->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Paciente $paciente)
    {
        $paciente->load(['medicoTratante', 'historia']);

        return Inertia::render('Estudiante/Pacientes/Show', [
            'paciente' => new PacienteResource($paciente),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paciente $paciente)
    {
        $user = auth()->user();

        if ($user->hasPermission('pacientes-update')) {
            $paciente->load(['medicoTratante.profile']);
            return Inertia::render('Estudiante/Pacientes/Edit', [
                'paciente' => new PacienteResource($paciente),
            ]);
        }

        message('No estas autorizado para actualizar pacientes.', \Type::Error);
        return to_route('pacientes.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePacienteRequest $request, Paciente $paciente): Response
    {
        $data = $request->validated();
        $this->pacienteService->updatePaciente($paciente, $data);
        message('Paciente actualizado exitosamente.', \Type::Success);
        return response(null, 200);
    }

    public function getFoto(Paciente $paciente, string $id)
    {
        /** @var User $user */
        $user = auth()->user();

        if ($user->can('view', $paciente)) {

            $foto = $paciente->getFirstMedia('foto');

            if ($foto->uuid === $id) return response()->file($foto->getPath());
        }

        return response(null, 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paciente $paciente)
    {
        //
    }
}
