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

const AntOdontologicosPersonalesSchema = z.string().max(MAX_TEXT_LENGTH).nullable()

const PortadorSchema = z.object({
    ortodoncia: z.boolean(),
    protesis: z.boolean(),
})

const HabitosSchema = z.object({
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
    descripcion: z.string().max(MAX_TEXT_LENGTH).nullable()
})

const SignosVitalesSchema = z.object({
    tension_arterial: z.object({
        sistole: z.coerce.number().int().min(0),
        diastole: z.coerce.number().int().min(0),
    }),
    pulso: z.coerce.number().int().min(0),
    respiracion: z.coerce.number().int().min(0),
    temperatura: z.coerce.number().min(0)
})

const ExamenExtraoralSchema = z.object({
    cabeza: z.string().max(MAX_TEXT_LENGTH).nullable(),
    cara: z.string().max(MAX_TEXT_LENGTH).nullable(),
    simetria_facial: z.string().max(MAX_TEXT_LENGTH).nullable(),
    piel: z.string().max(MAX_TEXT_LENGTH).nullable(),
    lesiones_extraorales: z.string().max(MAX_TEXT_LENGTH).nullable(),
    palpacion_ganglios: z.string().max(MAX_TEXT_LENGTH).nullable(),
    articulacion_temporomandibular: z.string().max(MAX_TEXT_LENGTH).nullable(),
})

const ExamenIntraoralSchema = z.object({
    labios: z.string().max(MAX_TEXT_LENGTH).nullable(),
    mejillas: z.string().max(MAX_TEXT_LENGTH).nullable(),
    frenillos: z.string().max(MAX_TEXT_LENGTH).nullable(),
    piso_boca: z.string().max(MAX_TEXT_LENGTH).nullable(),
    lengua_tipo: z.string().max(MAX_TEXT_LENGTH).nullable(),
    paladar_duro_blando: z.string().max(MAX_TEXT_LENGTH).nullable(),
    encias: z.string().max(MAX_TEXT_LENGTH).nullable(),
    dientes: z.string().max(MAX_TEXT_LENGTH).nullable(),
    discromias: z.string().max(MAX_TEXT_LENGTH).nullable(),
    maxilares: z.string().max(MAX_TEXT_LENGTH).nullable(),
})

const ExamenFisicoSchema = z.object({
    signos_vitales: SignosVitalesSchema,
    examen_extraoral: ExamenExtraoralSchema,
    examen_intraoral: ExamenIntraoralSchema,
})

const MaxilarSupSchema = z.object({
    tipo_arco: z.string().max(MAX_TEXT_LENGTH).nullable(),
    forma_arco: z.string().max(MAX_TEXT_LENGTH).nullable(),
    simetria_arco: z.string().max(MAX_TEXT_LENGTH).nullable(),
    paladar: z.string().max(MAX_TEXT_LENGTH).nullable(),
    maloclusion: z.string().max(MAX_TEXT_LENGTH).nullable(),
    dientes_ausentes: z.string().max(MAX_TEXT_LENGTH).nullable(),
    facetas_desgaste: z.string().max(MAX_TEXT_LENGTH).nullable(),
    diastemas: z.string().max(MAX_TEXT_LENGTH).nullable(),
    anomalia: z.string().max(MAX_TEXT_LENGTH).nullable(),
})

const MaxilarInfSchema = z.object({
    tipo_arco: z.string().max(MAX_TEXT_LENGTH).nullable(),
    forma_arco: z.string().max(MAX_TEXT_LENGTH).nullable(),
    simetria_arco: z.string().max(MAX_TEXT_LENGTH).nullable(),
    piso_boca: z.string().max(MAX_TEXT_LENGTH).nullable(),
    maloclusion: z.string().max(MAX_TEXT_LENGTH).nullable(),
    dientes_ausentes: z.string().max(MAX_TEXT_LENGTH).nullable(),
    facetas_desgaste: z.string().max(MAX_TEXT_LENGTH).nullable(),
    diastemas: z.string().max(MAX_TEXT_LENGTH).nullable(),
    anomalia: z.string().max(MAX_TEXT_LENGTH).nullable(),
})

const ModelosOclusionSchema = z.object({
    linea_media: z.string().max(MAX_TEXT_LENGTH).nullable(),
    sobresalte: z.string().max(MAX_TEXT_LENGTH).nullable(),
    sobrepase: z.string().max(MAX_TEXT_LENGTH).nullable(),
    relacion_canina: z.string().max(MAX_TEXT_LENGTH).nullable(),
    relacion_molar: z.string().max(MAX_TEXT_LENGTH).nullable(),
    mordida_anterior: z.string().max(MAX_TEXT_LENGTH).nullable(),
    mordida_posterior: z.string().max(MAX_TEXT_LENGTH).nullable(),
    curva_compensacion: z.string().max(MAX_TEXT_LENGTH).nullable(),
    plano_oclusal: z.string().max(MAX_TEXT_LENGTH).nullable(),
})

const ExamenesComplementariosSchema = z.string().max(10000)

const InterconsultasSchema = z.object({
    cirugia: z.boolean(),
    periodoncia: z.boolean(),
    endodoncia: z.boolean(),
    protesis: z.boolean(),
    ortodoncia: z.boolean(),
    descripcion: z.string().max(MAX_TEXT_LENGTH).nullable(),
})

const DiagnosticoSchema = z.string().max(MAX_TEXT_LENGTH).nullable()

const PronosticoSchema = z.string().max(MAX_TEXT_LENGTH).nullable()

const EstudioModelosSchema = z.object({
    maxilar_sup: MaxilarSupSchema,
    maxilar_inf: MaxilarInfSchema,
    modelos_oclusion: ModelosOclusionSchema,
    examenes_comp: ExamenesComplementariosSchema,
    interconsultas: InterconsultasSchema,
    diagnostico: DiagnosticoSchema,
    pronostico: PronosticoSchema,
})

const HistoriaOdontologicaSchema = z.object({
    historia_id: z.string().nullish(),
    ant_personales: AntOdontologicosPersonalesSchema,
    portador: PortadorSchema,
    habitos: HabitosSchema,
    examen_fisico: ExamenFisicoSchema,
    estudio_modelos: EstudioModelosSchema,
})

export const HistoriaOdontologicaDefaults = {
    historia_id: null,
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
        maxilar_sup: {
            tipo_arco: "",
            forma_arco: "",
            simetria_arco: "",
            paladar: "",
            maloclusion: "",
            dientes_ausentes: "",
            facetas_desgaste: "",
            diastemas: "",
            anomalia: "",
        },
        maxilar_inf: {
            tipo_arco: "",
            forma_arco: "",
            simetria_arco: "",
            piso_boca: "",
            maloclusion: "",
            dientes_ausentes: "",
            facetas_desgaste: "",
            diastemas: "",
            anomalia: "",
        },
        modelos_oclusion: {
            linea_media: "",
            sobresalte: "",
            sobrepase: "",
            relacion_canina: "",
            relacion_molar: "",
            mordida_anterior: "",
            mordida_posterior: "",
            curva_compensacion: "",
            plano_oclusal: "",
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
    }
} satisfies z.infer<typeof HistoriaOdontologicaSchema> as const

export default HistoriaOdontologicaSchema
