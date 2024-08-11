import {z} from "zod";

const Habitos: readonly string[] = [
    'fumar',
    'alcohol',
    'drogas',
    'onicofagia',
    'deglusion_atip',
    'bruxismo',
    'bruxomania',
    'queilofagia',
    'palillos',
    'respirador_bucal',
    'succion_digital',
    'otros'
]

const HabitoSchema = z.boolean()

const MAX_TEXT_LENGTH: number = 10000

const AntOdontologicosPersonalesObject = z.string().max(MAX_TEXT_LENGTH)

const PortadorSchema = z.object({
    ortodoncia: z.boolean(),
    protesis: z.boolean(),
})

const HabitosObject = z.object({
    fumar: HabitoSchema,
    alcohol: HabitoSchema,
    drogas: HabitoSchema,
    onicofagia: HabitoSchema,
    deglusion_atip: HabitoSchema,
    bruxismo: HabitoSchema,
    bruxomania: HabitoSchema,
    queilofagia: HabitoSchema,
    palillos: HabitoSchema,
    respirador_bucal: HabitoSchema,
    succion_digital: HabitoSchema,
    otros: HabitoSchema,
    descripcion: z.string().max(MAX_TEXT_LENGTH)
})

const SignosVitalesObject = z.object({
    tension_arterial: z.object({
        sistole: z.number().int().min(0),
        diastole: z.number().int().min(0),
    }),
    pulso: z.number().int().min(0),
    respiracion: z.number().int().min(0),
    temperatura: z.number().min(0)
})

const ExamenExtraoralObject = z.object({
    cabeza: z.string().max(MAX_TEXT_LENGTH),
    cara: z.string().max(MAX_TEXT_LENGTH),
    simetria_facial: z.string().max(MAX_TEXT_LENGTH),
    piel: z.string().max(MAX_TEXT_LENGTH),
    lesiones_extraorales: z.string().max(MAX_TEXT_LENGTH),
    palpacion_ganglios: z.string().max(MAX_TEXT_LENGTH),
    articulacion_temporomandibular: z.string().max(MAX_TEXT_LENGTH),
})

const ExamenIntraoralObject = z.object({
    labios: z.string().max(MAX_TEXT_LENGTH),
    mejillas: z.string().max(MAX_TEXT_LENGTH),
    frenillos: z.string().max(MAX_TEXT_LENGTH),
    piso_boca: z.string().max(MAX_TEXT_LENGTH),
    lengua_tipo: z.string().max(MAX_TEXT_LENGTH),
    paladar_duro_blando: z.string().max(MAX_TEXT_LENGTH),
    encias: z.string().max(MAX_TEXT_LENGTH),
    dientes: z.string().max(MAX_TEXT_LENGTH),
    discromias: z.string().max(MAX_TEXT_LENGTH),
    maxilares: z.string().max(MAX_TEXT_LENGTH),
})

const ExamenFisicoObject = z.object({
    signos_vitales: SignosVitalesObject,
    examen_extraoral: ExamenExtraoralObject,
    examen_intraoral: ExamenIntraoralObject,
})

const MaxilarSupObject = z.object({
    tipo_arco: z.string().max(MAX_TEXT_LENGTH),
    forma_arco: z.string().max(MAX_TEXT_LENGTH),
    simetria_arco: z.string().max(MAX_TEXT_LENGTH),
    paladar: z.string().max(MAX_TEXT_LENGTH),
    maloclusion: z.string().max(MAX_TEXT_LENGTH),
    dientes_ausentes: z.string().max(MAX_TEXT_LENGTH),
    facetas_desgaste: z.string().max(MAX_TEXT_LENGTH),
    diastemas: z.string().max(MAX_TEXT_LENGTH),
    anomalia: z.string().max(MAX_TEXT_LENGTH),
})

const MaxilarInfObject = z.object({
    tipo_arco: z.string().max(MAX_TEXT_LENGTH),
    forma_arco: z.string().max(MAX_TEXT_LENGTH),
    simetria_arco: z.string().max(MAX_TEXT_LENGTH),
    piso_boca: z.string().max(MAX_TEXT_LENGTH),
    maloclusion: z.string().max(MAX_TEXT_LENGTH),
    dientes_ausentes: z.string().max(MAX_TEXT_LENGTH),
    facetas_desgaste: z.string().max(MAX_TEXT_LENGTH),
    diastemas: z.string().max(MAX_TEXT_LENGTH),
    anomalia: z.string().max(MAX_TEXT_LENGTH),
})

const ModelosOclusionObject = z.object({
    linea_media: z.string().max(MAX_TEXT_LENGTH),
    sobresalte: z.string().max(MAX_TEXT_LENGTH),
    sobrepase: z.string().max(MAX_TEXT_LENGTH),
    relacion_canina: z.string().max(MAX_TEXT_LENGTH),
    relacion_molar: z.string().max(MAX_TEXT_LENGTH),
    mordida_anterior: z.string().max(MAX_TEXT_LENGTH),
    mordida_posterior: z.string().max(MAX_TEXT_LENGTH),
    curva_compensacion: z.string().max(MAX_TEXT_LENGTH),
    plano_oclusal: z.string().max(MAX_TEXT_LENGTH),
})

const ExamenesComplementariosObject = z.string().max(10000)

const InterconsultasObject = z.object({
    cirugia: z.boolean(),
    periodoncia: z.boolean(),
    endodoncia: z.boolean(),
    protesis: z.boolean(),
    ortodoncia: z.boolean(),
    descripcion: z.string().max(MAX_TEXT_LENGTH),
})

const DiagnosticoObject = z.string().max(MAX_TEXT_LENGTH)

const PronosticoObject = z.string().max(MAX_TEXT_LENGTH)

const EstudioModelosObject = z.object({
    maxilar_sup: MaxilarSupObject,
    maxilar_inf: MaxilarInfObject,
    modelos_oclusion: ModelosOclusionObject,
    examenes_comp: ExamenesComplementariosObject,
    interconsultas: InterconsultasObject,
    diagnostico: DiagnosticoObject,
    pronostico: PronosticoObject,
})

const TratamientoObject = z.object({
    diente: z.number().int().min(18).max(48),
    cavidad: z.string().max(MAX_TEXT_LENGTH),
    tratamiento: z.string().max(MAX_TEXT_LENGTH),
})

const ModificacionesPlanTratamiento = z.object({
    fecha: z.string().date(),
    diente: z.number().min(18).max(48),
    tratamiento: z.string().max(MAX_TEXT_LENGTH),
    nombre_docente: z.string().max(50),
    aprobacion_docente: z.boolean(),
})

const PlanTratamientoObject = z.array(TratamientoObject)

const ModificacionesPlanTratamientoObject = z.array(ModificacionesPlanTratamiento)

const SecuenciaTratamientoObject = z.array(ModificacionesPlanTratamiento)

const HistoriaOdontologicaFormSchema = z.object({
    ant_personales: AntOdontologicosPersonalesObject,
    portador: PortadorSchema,
    habitos: HabitosObject,
    examen_fisico: ExamenFisicoObject,
    estudio_modelos: EstudioModelosObject,
    plan_tratamiento: PlanTratamientoObject,
    modificaciones_plan_tratamiento: ModificacionesPlanTratamientoObject,
    secuencia_tratamiento: SecuenciaTratamientoObject
})

export const HistoriaOdontologica: z.infer<typeof HistoriaOdontologicaFormSchema> = {
    ant_personales: "",
    portador: {
        ortodoncia: false,
        protesis: false,
    },
    estudio_modelos: {
        diagnostico: "",
        examenes_comp: "",
        interconsultas: {
            cirugia: false, endodoncia: false, ortodoncia: false, periodoncia: false, protesis: false, descripcion: ""
        },
        maxilar_inf: {
            anomalia: "",
            diastemas: "",
            dientes_ausentes: "",
            facetas_desgaste: "",
            forma_arco: "",
            maloclusion: "",
            piso_boca: "",
            simetria_arco: "",
            tipo_arco: ""
        },
        maxilar_sup: {
            anomalia: "",
            diastemas: "",
            dientes_ausentes: "",
            facetas_desgaste: "",
            forma_arco: "",
            maloclusion: "",
            paladar: "",
            simetria_arco: "",
            tipo_arco: ""
        },
        modelos_oclusion: {
            curva_compensacion: "",
            linea_media: "",
            mordida_anterior: "",
            mordida_posterior: "",
            plano_oclusal: "",
            relacion_canina: "",
            relacion_molar: "",
            sobrepase: "",
            sobresalte: ""
        },
        pronostico: ""
    },
    examen_fisico: {
        examen_extraoral: {
            articulacion_temporomandibular: "",
            cabeza: "",
            cara: "",
            lesiones_extraorales: "",
            palpacion_ganglios: "",
            piel: "",
            simetria_facial: ""
        },
        examen_intraoral: {
            dientes: "",
            discromias: "",
            encias: "",
            frenillos: "",
            labios: "",
            lengua_tipo: "",
            maxilares: "",
            mejillas: "",
            paladar_duro_blando: "",
            piso_boca: ""
        },
        signos_vitales: {
            pulso: 0,
            respiracion: 0,
            temperatura: 0,
            tension_arterial: {
                diastole: 0,
                sistole: 0
            }
        }
    },
    habitos: {
        alcohol: false,
        bruxismo: false,
        bruxomania: false,
        deglusion_atip: false,
        descripcion: "",
        drogas: false,
        fumar: false,
        onicofagia: false,
        otros: false,
        palillos: false,
        queilofagia: false,
        respirador_bucal: false,
        succion_digital: false
    },
    modificaciones_plan_tratamiento: [],
    plan_tratamiento: [],
    secuencia_tratamiento: []
}

export default HistoriaOdontologicaFormSchema
