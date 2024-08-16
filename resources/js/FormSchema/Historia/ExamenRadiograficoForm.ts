import {z} from 'zod'

const MAX_PICTURE_SIZE: number = 2 * 1000 * 1000 // 2 MB
const MIN_PICTURE_SIZE: number = 5 * 1000 // 5 KB
const ACCEPTED_PICTURE_MIME: readonly string[] = ['image/jpeg', 'image/jpg', 'image/png']
export const MAX_PICTURES_PER_RADIOGRAFIA: number = 5
const MIN_ANALISIS_LENGTH: number = 1
const MAX_ANALISIS_LENGTH: number = 1000

export const RadiografiaSchema = z.object({
    radiografias: z
        .any({})
        .array().max(MAX_PICTURES_PER_RADIOGRAFIA, {message: `No puede seleccionar más de ${MAX_PICTURES_PER_RADIOGRAFIA} archivos`})
        .nonempty({message: 'Debe seleccionar al menos 1 archivo'})
        .refine((files: File[]) => files.every(file => ACCEPTED_PICTURE_MIME.includes(file?.type)), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
        .refine((files: File[]) => files.every(file => file.size >= MIN_PICTURE_SIZE), {message: 'Archivo muy pequeño'})
        .refine((files: File[]) => files.every(file => file?.size <= MAX_PICTURE_SIZE), {message: 'Archivo muy grande'})
    ,
    descripcion: z.string({required_error: 'Descripción es requerida'}).min(MIN_ANALISIS_LENGTH, {message: 'Debe escribir un análisis'}).max(MAX_ANALISIS_LENGTH, {message: 'Máximo 1000 caracteres'}),
}, )

const ExamenRadiograficoSchema = z
    .object({
        historia_id: z.string().uuid(),
        interpretacion_panoramica: z.object({
            nasomaxilar: RadiografiaSchema,
            ATM: RadiografiaSchema,
            mandibular: RadiografiaSchema,
            dento_alveolar_sup: RadiografiaSchema,
            dento_alveolar_inf: RadiografiaSchema,
        }),
        interpretacion_radiografica_periapicales: RadiografiaSchema,
        interpretacion_radiografica_coronales: RadiografiaSchema,
    })

export const ExamenRadiografico: z.infer<typeof ExamenRadiograficoSchema> = {
    historia_id: "",
    interpretacion_panoramica: {
        ATM: {descripcion: "", radiografias: []},
        dento_alveolar_inf: {descripcion: "", radiografias: []},
        dento_alveolar_sup: {descripcion: "", radiografias: []},
        mandibular: {descripcion: "", radiografias: []},
        nasomaxilar: {descripcion: "", radiografias: []}
    },
    interpretacion_radiografica_coronales: {
        descripcion: "", radiografias: []
    },
    interpretacion_radiografica_periapicales: {
        descripcion: "", radiografias: []
    }
}

export default ExamenRadiograficoSchema




