<?php

namespace App\Http\Controllers;

use App\Http\Resources\Odontologia\Endodoncia\HistoriaEndodonciaResource;
use App\Models\Endodoncia\HistoriaEndodoncia;
use App\Models\Group\Homework;
use App\Models\Paciente;
use App\Models\User;
use App\Services\HistoriaEndodonciaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoriaEndodonciaController extends Controller
{
    public function __construct(protected HistoriaEndodonciaService $historiaEndodonciaService)
    {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        $data = $request->validate([
            'paciente_id' => ['required', 'uuid', 'exists:' . Paciente::class . ',id'],
        ]);

        /** @var Paciente $paciente */
        $paciente = Paciente::find($data['paciente_id']);

        /** @var User $user */
        $user = $request->user();

        if ($paciente->assigned_to !== $user->id) {
            message('No estas autorizado para crear un historia a este paciente', \Type::Error);
            message('Debes estar asignado como médico tratante', \Type::Info);
        }

        $historia = $this->historiaEndodonciaService->addHistoria($paciente, $user);

        message('Historia de endodoncia creada exitosamente. A continuación podrá editar la historia asignada');
        return to_route('endodoncia.historias.edit', [
            'historia' => $historia->id
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(HistoriaEndodoncia $historia, Request $request)
    {
        // todo add policy

        if (!$request->inertia() and $request->expectsJson()) {
            return response()->json([
                'historia' => new HistoriaEndodonciaResource($historia)
            ]);
        }

        $historia->load(['paciente']);

        return Inertia::render('Estudiante/Endodoncia/HistoriasEndodoncia/Show', [
            'historia' => new HistoriaEndodonciaResource($historia)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HistoriaEndodoncia $historia, Request $request)
    {
        /* @var User $user */
        $user = $request->user();

        $homework = null;

        if ($request->has('homework')) {
            $homework_id = $request->validate(['homework' => ['ulid', 'exists:' . Homework::class . ',id']]);

            /** @var Homework $homework */
            $homework = Homework::with(['assignment:id,group_id' => ['group:id']])->find($homework_id)->first();

            $document = $homework->documents->firstWhere('id', $historia->id);

            $corrections = $document['corrections'];
        }

        return Inertia::render('Estudiante/Endodoncia/HistoriasEndodoncia/Edit', [
            'historia' => new HistoriaEndodonciaResource($historia),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HistoriaEndodoncia $historiaEndodoncia)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HistoriaEndodoncia $historiaEndodoncia)
    {
        //
    }
}
