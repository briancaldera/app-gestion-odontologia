import {z} from "zod";

const HabitoSchema = z.boolean()

const MAX_TEXT_LENGTH: number = 10000

const AntOdontologicosPersonalesSchema = z.string().max(MAX_TEXT_LENGTH).nullable()

const PortadorSchema = z.object({
    ortodoncia: z.boolean().describe('Ortodoncia'),
    protesis: z.boolean().describe('Prótesis'),
})

// todo refactor this to array
const HabitosSchema = z.object({
    fumar: HabitoSchema.describe('Fuma'),
    alcohol: HabitoSchema.describe('Consume alcohol'),
    drogas: HabitoSchema.describe('Consume drogas'),
    onicofagia: HabitoSchema.describe('Onicogafia'),
    deglusion_atip: HabitoSchema.describe('Deglusión atípica'),
    bruxismo: HabitoSchema.describe('Bruxismo'),
    bruxomania: HabitoSchema.describe('Bruxomania'),
    queilofagia: HabitoSchema.describe('Queilofagia'),
    palillos: HabitoSchema.describe('Uso de palillos'),
    respirador_bucal: HabitoSchema.describe('Respirador bucal'),
    succion_digital: HabitoSchema.describe('Succión digital'),
    otros: HabitoSchema.describe('Otros'),
    descripcion: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Descripción')
})

const SignosVitalesSchema = z.object({
    tension_arterial: z.object({
        sistole: z.coerce.number().int().min(0).describe('Sistólica'),
        diastole: z.coerce.number().int().min(0).describe('Diastólica'),
    }),
    pulso: z.coerce.number().int().min(0).describe('Pulso'),
    respiracion: z.coerce.number().int().min(0).describe('Respiración'),
    temperatura: z.coerce.number().min(0).describe('Temperatura')
})

const ExamenExtraoralSchema = z.object({
    cabeza: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Cabeza'),
    cara: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Cara'),
    simetria_facial: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Simetría Facial'),
    piel: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Piel'),
    lesiones_extraorales: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Lesiones Extraorales'),
    palpacion_ganglios: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Palpación de ganglios'),
    articulacion_temporomandibular: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Articulación Temporomandibular'),
})

const ExamenIntraoralSchema = z.object({
    labios: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Labios'),
    mejillas: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Mejillas'),
    frenillos: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Frenillos'),
    piso_boca: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Piso de la boca'),
    lengua_tipo: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Lengua (tipo)'),
    paladar_duro_blando: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Paladar duro y blanco'),
    encias: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Encías'),
    dientes: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Dientes'),
    discromias: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Discromías dentarias'),
    maxilares: z.string().max(MAX_TEXT_LENGTH).nullable().describe('Maxilares'),
})

const ExamenFisicoSchema = z.object({
    signos_vitales: SignosVitalesSchema,
    examen_extraoral: ExamenExtraoralSchema,
    examen_intraoral: ExamenIntraoralSchema,
})

const HistoriaOdontologicaSchema = z.object({
    historia_id: z.string().nullish(),
    ant_personales: AntOdontologicosPersonalesSchema,
    portador: PortadorSchema,
    habitos: HabitosSchema,
    examen_fisico: ExamenFisicoSchema,
})

const HistoriaOdontologicaDefaults = {
    historia_id: null,
    ant_personales: "",
    portador: {
        ortodoncia: false,
        protesis: false,
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

export {HistoriaOdontologicaDefaults, ExamenFisicoSchema, AntOdontologicosPersonalesSchema, HabitosSchema, PortadorSchema}
export default HistoriaOdontologicaSchema
