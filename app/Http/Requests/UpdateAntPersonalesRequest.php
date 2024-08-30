<?php

namespace App\Http\Requests;

use App\Models\AntPersonales;
use App\Models\Historia;
use App\Models\Trastornos;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAntPersonalesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'historia_id' => ['required', 'uuid', 'exists:' . Historia::class . ',id'],

            'medicamentos' => ['required', 'array:hipertensivos,analgesicos,esteroides,antidepresivos,anticonceptivos,hipogicemiante,anticonvulsivos,sildenafil,acidoacetilicidico,anticoagulante,bifosfanato,otros'],
            'medicamentos.*' => ['array:positivo,dosis_diaria'],
            'medicamentos.*.positivo' => ['boolean'],
            'medicamentos.*.dosis' => ['nullable', 'numeric', 'decimal:0,2'],

            'medicamentos.otros' => ['required', 'array:positivo,descripcion'],
            'medicamentos.otros.positivo' => ['required', 'boolean'],
            'medicamentos.otros.descripcion' => ['sometimes', 'nullable', 'string', 'max:255'],

            'alergias' => ['required', 'array:antibioticos,analgesicos,anestesicos,yodo,otros,descripcion'],
            'alergias.*' => ['boolean'],
            'alergias.descripcion' => ['nullable', 'string', 'max:255'],

            'trastornos' => ['required', 'array:cardiovasculares,hematologicos,respiratorios,endocrinos,gastrointestinales,neurologicos,oseos,ginecologicos,urologicos,infectocontagiosa'],
            'trastornos.cardiovasculares' => ['required', 'array:disnea,cansancio,vertigo,palpitaciones,taquicardia,bradicardia,varices,infarto_miocardio,angina_pecho,hipertension,endocarditis,otros'],
            'trastornos.hematologicos' => ['required', 'array:palidez,ictericia,anemia,hemorragias,hematoma,equimosis,petequias,dengue,hemofilia,otros'],
            'trastornos.respiratorios' => ['required', 'array:ciaonosis,hemoptisis,esputos,enfisema_pulmonar,asma,asfixia,tos_frecuente,rinitis,sonido_anormal,inf_respiratorias,otros'],
            'trastornos.endocrinos' => ['required', 'array:poliuria,polidipsia,polifagia,variacion_peso,irritabilidad,sudoracion_excesiva,diabetes,intolerancia_frio,hipoglicemia,hipertiroidismo,adenopatia,hipotiroidismo,otros'],
            'trastornos.gastrointestinales' => ['required', 'array:diarrea,flatulencia,acidez,nauseas,vomitos,ulceras,dolor_estomacal,gastritis,parasitos,reflujo_gastrico,gastroenteritis,colon_irritable,cirrosis_hepatica,estrenimiento,otros'],
            'trastornos.neurologicos' => ['required', 'array:convulsiones,temblor,tic,epilepsia,cefalea,depresion,dislexia,parkinson,alzheimer,ecv,bulimia,anorexia,sindrome_down,retardo_mental,otros'],
            'trastornos.oseos' => ['required', 'array:deformidades,fracturas,escleroticas_azules,artritis,dificultad_movimiento,osteoporosis,osteomelitis,otros'],
            'trastornos.ginecologicos' => ['required', 'array:embarazo,menstruacion,abortos,menopausia,otros'],
            'trastornos.urologicos' => ['required', 'array:insuficiencia_renal,colico_nefritico,cancer_prostata,andropausia,otros'],
            'trastornos.infectocontagiosa' => ['required', 'array:parotiditis,tuberculosis,vih_sida,blenorragia,sifilis,herpes,hepatitis_abc,influenza,vhp,rubeola,varicela,sarampion,covid,otros'],
            'trastornos.cardiovasculares.*' => ['sometimes', 'required', 'boolean'],
            'trastornos.hematologicos.*' => ['sometimes', 'required', 'boolean'],
            'trastornos.respiratorios.*' => ['sometimes', 'required', 'boolean'],
            'trastornos.endocrinos.*' => ['sometimes', 'required', 'boolean'],
            'trastornos.gastrointestinales.*' => ['sometimes', 'required', 'boolean'],
            'trastornos.neurologicos.*' => ['sometimes', 'required', 'boolean'],
            'trastornos.oseos.*' => ['sometimes', 'required', 'boolean'],
            'trastornos.ginecologicos.*' => ['sometimes', 'required', 'boolean'],
            'trastornos.urologicos.*' => ['sometimes', 'required', 'boolean'],
            'trastornos.infectocontagiosa.*' => ['sometimes', 'required', 'boolean'],
            'trastornos.cardiovasculares.otros' => ['sometimes', 'nullable', 'string', 'max:255'],
            'trastornos.hematologicos.otros' => ['sometimes', 'nullable', 'string', 'max:255'],
            'trastornos.respiratorios.otros' => ['sometimes', 'nullable', 'string', 'max:255'],
            'trastornos.endocrinos.otros' => ['sometimes', 'nullable', 'string', 'max:255'],
            'trastornos.gastrointestinales.otros' => ['sometimes', 'nullable', 'string', 'max:255'],
            'trastornos.neurologicos.otros' => ['sometimes', 'nullable', 'string', 'max:255'],
            'trastornos.oseos.otros' => ['sometimes', 'nullable', 'string', 'max:255'],
            'trastornos.ginecologicos.otros' => ['sometimes', 'nullable', 'string', 'max:255'],
            'trastornos.urologicos.otros' => ['sometimes', 'nullable', 'string', 'max:255'],
            'trastornos.infectocontagiosa.otros' => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
}
