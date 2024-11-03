<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAnamnesisRequest;
use App\Http\Requests\UpdateEvaluacionDolorRequest;
use App\Http\Resources\Odontologia\Endodoncia\HistoriaEndodonciaResource;
use App\Models\Endodoncia\HistoriaEndodoncia;
use App\Models\Group\Homework;
use App\Models\Paciente;
use App\Models\User;
use App\Services\HistoriaEndodonciaService;
use App\ValueObjects\Endodoncia\Anamnesis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoriaEndodonciaController extends Controller
{
    public function __construct(protected HistoriaEndodonciaService $historiaEndodonciaService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
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

        return Inertia::render('Odontologia/Endodoncia/Historias/Show', [
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

        return Inertia::render('Odontologia/Endodoncia/Historias/Edit', [
            'historia' => new HistoriaEndodonciaResource($historia),
        ]);
    }

    public function updateAnamnesis(UpdateAnamnesisRequest $request, HistoriaEndodoncia $historia)
    {
        // todo check policy

        $data = $request->validated();

        $anamnesis = $data['anamnesis'];

        $anamnesisValueObject = new Anamnesis(
            visita_medico_ultimos_6_meses: $anamnesis['visita_medico_ultimos_6_meses'],
            bajo_tratamiento_actual: $anamnesis['bajo_tratamiento_actual'],
            alergia_medicamento: $anamnesis['alergia_medicamento'],
            alergia_material_dental: $anamnesis['alergia_material_dental'],
            hospitalizado_alguna_vez: $anamnesis['hospitalizado_alguna_vez'],
            odontologo_ultimos_6_meses: $anamnesis['odontologo_ultimos_6_meses'],
            sangrado_al_cepillar: $anamnesis['sangrado_al_cepillar'],
            abultamiento_diente: $anamnesis['abultamiento_diente'],
            rechina_aprieta_dientes: $anamnesis['rechina_aprieta_dientes'],
            dolor_CATM: $anamnesis['dolor_CATM'],
            sangrado_excesivo_corte: $anamnesis['sangrado_excesivo_corte'],
            dificultad_cicatrizacion: $anamnesis['dificultad_cicatrizacion'],
            cigarrillo_tabaco: $anamnesis['cigarrillo_tabaco'],
            alergia_alimento: $anamnesis['alergia_alimento'],
            alergia_enlatados: $anamnesis['alergia_enlatados'],
            alergia_yodo: $anamnesis['alergia_yodo'],
            reaccion_anestesia: $anamnesis['reaccion_anestesia'],
            embarazo: $anamnesis['embarazo'],
            enfermedades: $anamnesis['enfermedades'],
            enfermedades_familiares: $anamnesis['enfermedades_familiares'],
        );

        $historia->anamnesis->visita_medico_ultimos_6_meses = $anamnesis['visita_medico_ultimos_6_meses'];
        $historia->anamnesis->bajo_tratamiento_actual = $anamnesis['bajo_tratamiento_actual'];
        $historia->anamnesis->alergia_medicamento = $anamnesis['alergia_medicamento'];
        $historia->anamnesis->alergia_material_dental = $anamnesis['alergia_material_dental'];
        $historia->anamnesis->hospitalizado_alguna_vez = $anamnesis['hospitalizado_alguna_vez'];
        $historia->anamnesis->odontologo_ultimos_6_meses = $anamnesis['odontologo_ultimos_6_meses'];
        $historia->anamnesis->sangrado_al_cepillar = $anamnesis['sangrado_al_cepillar'];
        $historia->anamnesis->abultamiento_diente = $anamnesis['abultamiento_diente'];
        $historia->anamnesis->rechina_aprieta_dientes = $anamnesis['rechina_aprieta_dientes'];
        $historia->anamnesis->dolor_CATM = $anamnesis['dolor_CATM'];
        $historia->anamnesis->sangrado_excesivo_corte = $anamnesis['sangrado_excesivo_corte'];
        $historia->anamnesis->dificultad_cicatrizacion = $anamnesis['dificultad_cicatrizacion'];
        $historia->anamnesis->cigarrillo_tabaco = $anamnesis['cigarrillo_tabaco'];
        $historia->anamnesis->alergia_alimento = $anamnesis['alergia_alimento'];
        $historia->anamnesis->alergia_enlatados = $anamnesis['alergia_enlatados'];
        $historia->anamnesis->alergia_yodo = $anamnesis['alergia_yodo'];
        $historia->anamnesis->reaccion_anestesia = $anamnesis['reaccion_anestesia'];
        $historia->anamnesis->embarazo = $anamnesis['embarazo'];
        $historia->anamnesis->enfermedades = $anamnesis['enfermedades'];
        $historia->anamnesis->enfermedades_familiares = $anamnesis['enfermedades_familiares'];

        $historia->save();

        message('Anamnesis actualizada exitosamente', \Type::Success);
        return response(null, 200);
    }

    public function updateEvaluacionDolor(UpdateEvaluacionDolorRequest $request, HistoriaEndodoncia $historia){

        $data = $request->validated();

        $evaluacion_dolor = $data['evaluacion_dolor'];

        $historia->evaluacion_dolor = collect($evaluacion_dolor);
        $historia->save();

        message('Evaluación del dolor actualizada exitosamente', \Type::Success);
        return response(null, 200);
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
