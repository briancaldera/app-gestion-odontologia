<?php

namespace App\Http\Requests;

use App\Models\Historia;
use App\Models\Trastornos;
use Illuminate\Foundation\Http\FormRequest;

class StoreTrastornosRequest extends FormRequest
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
            'historia_id' => ['required', 'uuid', 'exists:' . Historia::class . ',id', 'unique:' . Trastornos::class],
            'cardiovasculares' => ['required', 'array:disnea,cansancio,vertigo,palpitaciones,taquicardia,bradicardia,varices,infarto_miocardio,angina_pecho,hipertension,endocarditis,otros'],
            'hematologicos' => ['required', 'array:palidez,ictericia,anemia,hemorragias,hematoma,equimosis,petequias,dengue,hemofilia,otros'],
            'respiratorios' => ['required', 'array:ciaonosis,hemoptisis,esputos,enfisema_pulmonar,asma,asfixia,tos_frecuente,rinitis,sonido_anormal,inf_respiratorias,otros'],
            'endocrinos' => ['required', 'array:poliuria,polidipsia,polifagia,variacion_peso,irritabilidad,sudoracion_excesiva,diabetes,intolerancia_frio,hipoglicemia,hipertiroidismo,adenopatia,hipotiroidismo,otros'],
            'gastrointestinales' => ['required', 'array:diarrea,flatulencia,acidez,nauseas,vomitos,ulceras,dolor_estomacal,gastritis,parasitos,reflujo_gastrico,gastroenteritis,colon_irritable,cirrosis_hepatica,estrenimiento,otros'],
            'neurologicos' => ['required', 'array:convulsiones,temblor,tic,epilepsia,cefalea,depresion,dislexia,parkinson,alzheimer,ecv,bulimia,anorexia,sindrome_down,retardo_mental,otros'],
            'oseos' => ['required', 'array:deformidades,fracturas,escleroticas_azules,artritis,dificultad_movimiento,osteoporosis,osteomelitis,otros'],
            'ginecologicos' => ['required', 'array:embarazo,menstruacion,abortos,menopausia,otros'],
            'urologicos' => ['required', 'array:insuficiencia_renal,colico_nefritico,cancer_prostata,andropausia,otros'],
            'infectocontagiosa' => ['required', 'array:parotiditis,tuberculosis,vih_sida,blenorragia,sifilis,herpes,hepatitis_abc,influenza,vhp,rubeola,varicela,sarampion,covid,otros'],
            'cardiovasculares.*' => ['required', 'boolean'],
            'hematologicos.*' => ['required', 'boolean'],
            'respiratorios.*' => ['required', 'boolean'],
            'endocrinos.*' => ['required', 'boolean'],
            'gastrointestinales.*' => ['required', 'boolean'],
            'neurologicos.*' => ['required', 'boolean'],
            'oseos.*' => ['required', 'boolean'],
            'ginecologicos.*' => ['required', 'boolean'],
            'urologicos.*' => ['required', 'boolean'],
            'infectocontagiosa.*' => ['required', 'boolean'],
            'cardiovasculares.otros' => ['nullable', 'string', 'max:255'],
            'hematologicos.otros' => ['nullable', 'string', 'max:255'],
            'respiratorios.otros' => ['nullable', 'string', 'max:255'],
            'endocrinos.otros' => ['nullable', 'string', 'max:255'],
            'gastrointestinales.otros' => ['nullable', 'string', 'max:255'],
            'neurologicos.otros' => ['nullable', 'string', 'max:255'],
            'oseos.otros' => ['nullable', 'string', 'max:255'],
            'ginecologicos.otros' => ['nullable', 'string', 'max:255'],
            'urologicos.otros' => ['nullable', 'string', 'max:255'],
            'infectocontagiosa.otros' => ['nullable', 'string', 'max:255'],
        ];
    }
}
