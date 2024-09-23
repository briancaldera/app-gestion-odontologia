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
            $pacientes = $user->historias->map(fn(Historia $historia) => $historia->paciente) ?? [];
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
        return to_route('dashboard');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePacienteRequest $request)
    {
        $validated = $request->validated();
        $this->pacienteService->storePaciente($validated);
        return response('OK', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Paciente $paciente)
    {


        return Inertia::render('Estudiante/Pacientes/Show', [
            'paciente' => new PacienteResource($paciente),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paciente $paciente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePacienteRequest $request, Paciente $paciente): Response
    {
        $data = $request->validated();
        $this->pacienteService->updatePaciente($paciente, $data);
        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paciente $paciente)
    {
        //
    }
}
