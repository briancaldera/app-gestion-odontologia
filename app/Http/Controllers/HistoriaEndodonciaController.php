<?php

namespace App\Http\Controllers;

use App\Http\Requests\Odontologia\Endodoncia\UpdateHistoriaEndodonciaRequest;
use App\Http\Requests\UpdateAnamnesisRequest;
use App\Http\Requests\UpdateEvaluacionDolorRequest;
use App\Http\Resources\Odontologia\Endodoncia\HistoriaEndodonciaResource;
use App\Models\Endodoncia\FichaEndodoncia;
use App\Models\Endodoncia\HistoriaEndodoncia;
use App\Models\Group\Homework;
use App\Models\Paciente;
use App\Models\User;
use App\Services\HistoriaEndodonciaService;
use App\ValueObjects\Endodoncia\Anamnesis;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

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

        $historia->load(['paciente', 'fichasEndodonticas']);

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

        $historia->load(['paciente', 'fichasEndodonticas']);

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

    public function updateEvaluacionDolor(UpdateEvaluacionDolorRequest $request, HistoriaEndodoncia $historia)
    {

        $data = $request->validated();

        $evaluacion_dolor = $data['evaluacion_dolor'];

        $historia->evaluacion_dolor = collect($evaluacion_dolor);
        $historia->save();

        message('Evaluación del dolor actualizada exitosamente', \Type::Success);
        return response(null, 200);
    }

    public function storeFicha(Request $request, HistoriaEndodoncia $historia)
    {
        $data = $request->validate([
            'diente' => ['required', 'string', 'max:255'],
            'sintomas' => ['nullable', 'string', 'max:255'],
            'signos' => ['nullable', 'string', 'max:255'],
            'interpretacion_radiografica' => ['nullable', 'string', 'max:255'],
            'etiologia' => ['list'],
            'etiologia.*' => [Rule::in(['caries', 'traumatismo', 'abrasion', 'rest_profunda', 'recidiva_caries', 'otros',])],
            'pruebas_diagnosticas' => ['array:examen_tejidos_periodontales,pruebas_vitalidad_pulpar,diagnostico_presuntivo,diagnostico_definitivo,morfologia_conducto,tratamiento_conducto,metodos_obturacion,tecnica_preparacion_biomecanica,preparacion_quimica,numero_lima,material_obturacion,medicacion_justificacion,observaciones'],
            'pruebas_diagnosticas.*' => ['nullable', 'string', 'max:1000'],
            'pruebas_diagnosticas.examen_tejidos_periodontales' => ['list'],
            'pruebas_diagnosticas.examen_tejidos_periodontales.*' => [Rule::in(['palpacion', 'percusion', 'sondaje', 'grado_movilidad',])],
            'pruebas_diagnosticas.pruebas_vitalidad_pulpar' => ['list'],
            'pruebas_diagnosticas.pruebas_vitalidad_pulpar.*' => [Rule::in(['electrica', 'termica', 'cavitaria',])],
            'pruebas_diagnosticas.morfologia_conducto' => ['list'],
            'pruebas_diagnosticas.morfologia_conducto.*' => [Rule::in(['conducto_abierto', 'foramen_abierto', 'foramen_cerrado', 'calcificacion', 'anomalias',])],
            'pruebas_diagnosticas.tratamiento_conducto' => ['list'],
            'pruebas_diagnosticas.tratamiento_conducto.*' => [Rule::in(['biopulpectomia', 'necropulpectomia', 'retratamiento', 'induccion_cierre_apical', 'apiceptomia',])],
            'pruebas_diagnosticas.metodos_obturacion' => ['list'],
            'pruebas_diagnosticas.metodos_obturacion.*' => [Rule::in(['cond_lateral', 'cond_vertical', 'mixta', 'otros',])],
        ]);

        $ficha = new FichaEndodoncia([
            'diente' => $data['diente'],
            'data' => [
                'sintomas' => $data['sintomas'],
                'signos' => $data['signos'],
                'interpretacion_radiografica' => $data['interpretacion_radiografica'],
                'etiologia' => $data['etiologia'],
            ],
            'pruebas_diagnosticas' => $data['pruebas_diagnosticas'],
        ]);

        $ficha->historia_endodoncia_id = $historia->id;

        $ficha->save();

        message('Ficha de endodoncia agregada a la historia', \Type::Success);
        return response(null, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHistoriaEndodonciaRequest $request, HistoriaEndodoncia $historia)
    {
        $data = $request->validated();

        if (isset($data['periodontodiagrama'])) {
            $periodontodiagrama_file = $data['periodontodiagrama'];
            $historia->addMedia($periodontodiagrama_file)->toMediaCollection('periodontodiagrama');
        }

        if (isset($data['consentimiento'])) {
            $consentimiento_file = $data['consentimiento'];
            $historia->addMedia($consentimiento_file)->toMediaCollection('consentimiento');
        }

        if ($historia->update()) {
            message('Historia actualizada exitosamente', \Type::Success);
            return response(null, 200);
        } else {
            message('Ocurrió un error al intentar actualizar', \Type::Error);
            return response(null, 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HistoriaEndodoncia $historiaEndodoncia)
    {
        //
    }

    public function getFile(Request $request, HistoriaEndodoncia $historia, string $file, string $id) {

        if ($file === 'consentimiento') {
            $consentimiento = $historia->getMedia('consentimiento')->first(fn(Media $media) => $media->uuid === $id);

            return response()->file($consentimiento->getPath());
        }

        if ($file === 'periodontodiagrama') {
            $periodontodiagrama = $historia->getMedia('periodontodiagrama')->first(fn(Media $media) => $media->uuid === $id);

            return response()->file($periodontodiagrama->getPath());
        }

        return response(null, 404);
    }
}
