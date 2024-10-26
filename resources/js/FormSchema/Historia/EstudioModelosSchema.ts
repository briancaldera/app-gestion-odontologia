import {z} from "zod";

const MAX_TEXT_LENGTH: number = 10000
const stringField = z.string().max(MAX_TEXT_LENGTH)

const DiagnosticoSchema = z.string().max(MAX_TEXT_LENGTH).nullable()

const PronosticoSchema = z.string().max(MAX_TEXT_LENGTH).nullable()


const MaxilarSupSchema = z.object({
    tipo_arco: stringField.describe('Tipo de arco'),
    forma_arco: stringField.describe('Forma del arco'),
    simetria_arco: stringField.describe('Simetría del arco'),
    paladar: stringField.describe('Paladar'),
    maloclusion: stringField.describe('Maloclusión dentaria'),
    dientes_ausentes: stringField.describe('Dientes ausentes'),
    facetas_desgaste: stringField.describe('Facetas de desgaste'),
    diastemas: stringField.describe('Diastemas'),
    anomalia: stringField.describe('Anomalía de forma, tamaño y número'),
})

const MaxilarInfSchema = z.object({
    tipo_arco: stringField.describe('Tipo de arco'),
    forma_arco: stringField.describe('Forma del arco'),
    simetria_arco: stringField.describe('Simetría del arco'),
    piso_boca: stringField.describe('Piso de boca'),
    maloclusion: stringField.describe('Maloclusión dentaria'),
    dientes_ausentes: stringField.describe('Dientes ausentes'),
    facetas_desgaste: stringField.describe('Facetas de desgaste'),
    diastemas: stringField.describe('Diastemas'),
    anomalia: stringField.describe('Anomalía de forma, tamaño y número'),
})

const ModelosOclusionSchema = z.object({
    linea_media: stringField.describe('Línea media'),
    sobresalte: stringField.describe('Sobresalte overjet'),
    sobrepase: stringField.describe('Sobrepase overbite'),
    relacion_canina: stringField.describe('Relación canina'),
    relacion_molar: stringField.describe('Relación molar'),
    mordida_anterior: stringField.describe('Mordida anterior'),
    mordida_posterior: stringField.describe('Mordida posterior'),
    curva_compensacion: stringField.describe('Curva de compensación'),
    plano_oclusal: stringField.describe('Plano oclusal'),
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

const estudioModelosSchema = z.object({
    maxilar_sup: MaxilarSupSchema,
    maxilar_inf: MaxilarInfSchema,
    modelos_oclusion: ModelosOclusionSchema,
    examenes_comp: ExamenesComplementariosSchema,
    interconsultas: InterconsultasSchema,
    diagnostico: DiagnosticoSchema,
    pronostico: PronosticoSchema,
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
} satisfies z.infer<typeof EstudioModelosSchema>

export {EstudioModelosDefaults, estudioModelosSchema}
export default EstudioModelosSchema
