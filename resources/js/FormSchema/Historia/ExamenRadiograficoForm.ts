import {z} from 'zod'

const MAX_PICTURE_SIZE: number = 2 * 1000 * 1000 // 2 MB
const MIN_PICTURE_SIZE: number = 5 * 1000 // 5 KB
const ACCEPTED_PICTURE_MIME: readonly string[] = ['image/jpeg', 'image/jpg', 'image/png']
const MAX_PICTURES_PER_RADIOGRAFIA: number = 5

const RadiografiaFileSchema = z
    .any()
    .refine((file: File) => ACCEPTED_PICTURE_MIME.includes(file?.type), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
    .refine((file: File) => file?.size <= MAX_PICTURE_SIZE, {message: 'Archivo muy grande'})
    .refine((file: File) => file?.size >= MIN_PICTURE_SIZE, {message: 'Archivo muy pequeño'})
    .nullable()

const RadiografiaSchema = z.object({
    radiografias: z.array(RadiografiaFileSchema).max(MAX_PICTURES_PER_RADIOGRAFIA).nonempty(),
    descripcion: z.string(),
})

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




