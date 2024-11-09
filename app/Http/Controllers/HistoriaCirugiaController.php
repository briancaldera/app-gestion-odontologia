<?php

namespace App\Http\Controllers;

use App\Http\Requests\Odontologia\Cirugia\UpdateHistoriaCirugiaRequest;
use App\Http\Resources\Odontologia\Cirugia\HistoriaCirugiaResource;
use App\Models\Cirugia\HistoriaCirugia;
use App\Models\Paciente;
use App\Models\User;
use App\Services\HistoriaCirugiaService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class HistoriaCirugiaController extends Controller
{
    public function __construct(protected HistoriaCirugiaService $historiaCirugiaService)
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
        /** @var User $user */
        $user = $request->user();

        $data = $request->validate([
            'paciente_id' => ['required', 'uuid', 'exists:' . Paciente::class . ',id'],
        ]);

        /** @var Paciente $paciente */
        $paciente = Paciente::find($data['paciente_id']);

        if ($paciente->assigned_to !== $user->id) {
            message('No estas autorizado para crear un historia a este paciente', \Type::Error);
            message('Debes estar asignado como médico tratante', \Type::Info);
            return back();
        }

        if ($user->cannot('update', $paciente)) {
            message('No tienes permiso para modificar este paciente', \Type::Info);
            return back();
        }

        $historia = $this->historiaCirugiaService->createHistoria($paciente, $user);

        message('Historia de cirugia creada exitosamente. A continuacion podrá editar la historia asignada');
        return to_route('cirugia.historias.edit', [
            'historia' => $historia->id
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(HistoriaCirugia $historia)
    {
        return Inertia::render('Odontologia/Cirugia/Historias/Show', [
            'historia' => new HistoriaCirugiaResource($historia),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HistoriaCirugia $historia)
    {
        return Inertia::render('Odontologia/Cirugia/Historias/Edit', [
            'historia' => new HistoriaCirugiaResource($historia),
//            'homework' => $homework,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHistoriaCirugiaRequest $request, HistoriaCirugia $historia)
    {
        $data = $request->validated();

        if (isset($data['anamnesis'])) {
            $anamnesis_data = $data['anamnesis'];
            $historia->anamnesis = collect($anamnesis_data);
        }

        if (isset($data['habitos'])) {
            $habitos_data = $data['habitos'];
            $historia->habitos = collect($habitos_data);
        }

        if (isset($data['femenino'])) {
            $femenino_data = $data['femenino'];
            $historia->femenino = collect($femenino_data);
        }

        if (isset($data['antecedentes'])) {
            $antecedentes_data = $data['antecedentes'];
            $historia->antecedentes = collect($antecedentes_data);
        }

        if (isset($data['examen_fisico'])) {
            $examen_fisico_data = $data['examen_fisico'];
            $historia->examen_fisico = collect($examen_fisico_data);
        }

        if (isset($data['observaciones'])) {
            $observaciones_data = $data['observaciones'];
            $historia->observaciones = $observaciones_data;
        }

        if (isset($data['estudios_radiograficos'])) {
            $estudios_radiograficos_data = $data['estudios_radiograficos'];
            $historia->estudios_radiograficos = $estudios_radiograficos_data;
        }

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
    public function destroy(HistoriaCirugia $historia)
    {
        //
    }

    public function getFile(Request $request, HistoriaCirugia $historia, string $file, string $id) {

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

    public function getConsentimiento(HistoriaCirugia $historia, string $id)
    {
        $user = request()->user();

        $consentimiento = $historia->getMedia('consentimiento')->first(fn(Media $media) => $media->uuid === $id);

        return response()->file($consentimiento->getPath());
    }

    public function getPeriodontodiagrama(HistoriaCirugia $historia, string $id)
    {
        $user = request()->user();

        $periodontodiagrama = $historia->getMedia('periodontodiagrama')->first(fn(Media $media) => $media->uuid === $id);

        return response()->file($periodontodiagrama->getPath());
    }
}
