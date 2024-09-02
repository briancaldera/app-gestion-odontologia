import {z} from "zod";

const MAX_TEXT_LENGTH: number = 10000
const stringField = z.string().max(MAX_TEXT_LENGTH).nullable()

const DiagnosticoSchema = z.string().max(MAX_TEXT_LENGTH).nullable()

const PronosticoSchema = z.string().max(MAX_TEXT_LENGTH).nullable()


const MaxilarSupSchema = z.object({
    tipo_arco: stringField,
    forma_arco: stringField,
    simetria_arco: stringField,
    paladar: stringField,
    maloclusion: stringField,
    dientes_ausentes: stringField,
    facetas_desgaste: stringField,
    diastemas: stringField,
    anomalia: stringField,
})

const MaxilarInfSchema = z.object({
    tipo_arco: stringField,
    forma_arco: stringField,
    simetria_arco: stringField,
    piso_boca: stringField,
    maloclusion: stringField,
    dientes_ausentes: stringField,
    facetas_desgaste: stringField,
    diastemas: stringField,
    anomalia: stringField,
})

const ModelosOclusionSchema = z.object({
    linea_media: stringField,
    sobresalte: stringField,
    sobrepase: stringField,
    relacion_canina: stringField,
    relacion_molar: stringField,
    mordida_anterior: stringField,
    mordida_posterior: stringField,
    curva_compensacion: stringField,
    plano_oclusal: stringField,
})

const ExamenesComplementariosSchema = z.string().max(10000).nullable()

const InterconsultasSchema = z.object({
    cirugia: z.boolean(),
    periodoncia: z.boolean(),
    endodoncia: z.boolean(),
    protesis: z.boolean(),
    ortodoncia: z.boolean(),
    descripcion: stringField,
})

const EstudioModelosSchema = z.object({
    historia_id: z.string().nullish(),
    estudio_modelos: z.object({
        maxilar_sup: MaxilarSupSchema,
        maxilar_inf: MaxilarInfSchema,
        modelos_oclusion: ModelosOclusionSchema,
        examenes_comp: ExamenesComplementariosSchema,
        interconsultas: InterconsultasSchema,
        diagnostico: DiagnosticoSchema,
        pronostico: PronosticoSchema,
    }),
})

const EstudioModelosDefaults = {
    historia_id: null,
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
    }
} satisfies z.infer<typeof EstudioModelosSchema> as const

export {EstudioModelosDefaults}
export default EstudioModelosSchema
