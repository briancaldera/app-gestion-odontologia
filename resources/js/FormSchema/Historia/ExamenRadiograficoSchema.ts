import {undefined, z} from 'zod'

const MAX_PICTURE_SIZE: number = 2 * 1000 * 1000 // 2 MB
const MIN_PICTURE_SIZE: number = 5 * 1000 // 5 KB
const ACCEPTED_PICTURE_MIME: readonly string[] = ['image/jpeg', 'image/jpg', 'image/png']
const MAX_PICTURES_PER_RADIOGRAFIA: number = 10
const MIN_ANALISIS_LENGTH: number = 1
const MAX_ANALISIS_LENGTH: number = 1000

const ImageFileSchema = z
    .any()
    .refine((file: File) => ACCEPTED_PICTURE_MIME.includes(file?.type), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
    .refine((file: File) => file.size >= MIN_PICTURE_SIZE, {message: 'Archivo muy pequeño'})
    .refine((file: File) => file?.size <= MAX_PICTURE_SIZE, {message: 'Archivo muy grande'})

const PanoramicasSchema = z
    .array(ImageFileSchema)
    // .nonempty({message: 'Debe seleccionar al menos 1 archivo'})
    .max(MAX_PICTURES_PER_RADIOGRAFIA, {message: `No puede seleccionar más de ${MAX_PICTURES_PER_RADIOGRAFIA} archivos`})

const PeriapicalesSchema = z
    .array(ImageFileSchema)
    // .nonempty({message: 'Debe seleccionar al menos 1 archivo'})
    .max(MAX_PICTURES_PER_RADIOGRAFIA, {message: `No puede seleccionar más de ${MAX_PICTURES_PER_RADIOGRAFIA} archivos`})

const CoronalesSchema = z
    .array(ImageFileSchema)
    // .nonempty({message: 'Debe seleccionar al menos 1 archivo'})
    .max(MAX_PICTURES_PER_RADIOGRAFIA, {message: `No puede seleccionar más de ${MAX_PICTURES_PER_RADIOGRAFIA} archivos`})

const RadiografiaSchema = z.object({
    radiografias: z
        .any({})
        .array().max(MAX_PICTURES_PER_RADIOGRAFIA, {message: `No puede seleccionar más de ${MAX_PICTURES_PER_RADIOGRAFIA} archivos`})
        .nonempty({message: 'Debe seleccionar al menos 1 archivo'})
        .refine((files: File[]) => files.every(file => ACCEPTED_PICTURE_MIME.includes(file?.type)), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
        .refine((files: File[]) => files.every(file => file.size >= MIN_PICTURE_SIZE), {message: 'Archivo muy pequeño'})
        .refine((files: File[]) => files.every(file => file?.size <= MAX_PICTURE_SIZE), {message: 'Archivo muy grande'})
    ,
    descripcion: z.string({required_error: 'Descripción es requerida'}).max(MAX_ANALISIS_LENGTH, {message: 'Máximo 1000 caracteres'}),
}, )

const DescripcionSchema = z
    .string({required_error: 'Descripción es requerida'})
    .max(MAX_ANALISIS_LENGTH, {message: 'Máximo 1000 caracteres'})
    .optional()

const ExamenRadiograficoSchema = z
    .object({
        historia_id: z.string().uuid(),
        interpretacion_panoramica: z.object({
            descripcion: z.object({
                nasomaxilar: DescripcionSchema,
                ATM: DescripcionSchema,
                mandibular: DescripcionSchema,
                dento_alveolar_sup: DescripcionSchema,
                dento_alveolar_inf: DescripcionSchema,
            }),
            imagenes: PanoramicasSchema
        }),
        interpretacion_periapicales: z.object({
            descripcion: DescripcionSchema,
            imagenes: PeriapicalesSchema,
        }),
        interpretacion_coronales: z.object({
            descripcion: DescripcionSchema,
            imagenes: CoronalesSchema,
        }),
    })

const ExamenRadiograficoDefaults = {
    historia_id: "",
    interpretacion_panoramica: {
        descripcion: {
            ATM: "",
            dento_alveolar_inf: "",
            dento_alveolar_sup: "",
            mandibular: "",
            nasomaxilar: ""
        },
        imagenes: []
    },
    interpretacion_coronales: {
        descripcion: "",
        imagenes: []
    },
    interpretacion_periapicales: {
        descripcion: "",
        imagenes: []
    }
} satisfies z.infer<typeof ExamenRadiograficoSchema>

export {MAX_PICTURES_PER_RADIOGRAFIA, RadiografiaSchema, ExamenRadiograficoDefaults}
export default ExamenRadiograficoSchema




