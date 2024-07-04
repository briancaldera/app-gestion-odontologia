<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePacienteRequest;
use App\Http\Requests\UpdatePacienteRequest;
use App\Models\Paciente;
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

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
        return $paciente;
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
