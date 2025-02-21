import {z} from "zod";

const MAX_TEXT_LENGTH: number = 1000
const MAX_TOOTH_LENGTH: number = 100

const MAX_PICTURE_SIZE = 2 * 1000 * 1000 // 2 MB
const MIN_PICTURE_SIZE = 5 * 1000 // 5 KB
const ACCEPTED_PICTURE_MIME = ['image/jpeg', 'image/jpg', 'image/png']

const tratamientoRealizadoSchema = z.object({
    fecha: z.date(),
    diente: z.string().max(MAX_TOOTH_LENGTH, {message: `Máximo ${MAX_TOOTH_LENGTH} caracteres`}),
    tratamiento: z.string().max(MAX_TEXT_LENGTH, {message: `Máximo ${MAX_TEXT_LENGTH} caracteres`}),
})

const secuenciaTratamientoSchema = z.object({
    secuencia_tratamiento: z.array(tratamientoRealizadoSchema)
})

const radiografiasFinalesSchema = z.object({
    radiografias_finales: z
        .any()
        .refine((data: any) => data instanceof File, {message: 'Entrada no válida'})
        .refine((file: File) => ACCEPTED_PICTURE_MIME.includes(file?.type), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
        .refine((file: File) => file.size >= MIN_PICTURE_SIZE, {message: 'Archivo muy pequeño'})
        .refine((file: File) => file?.size <= MAX_PICTURE_SIZE, {message: 'Archivo muy grande'})
})

export {tratamientoRealizadoSchema, radiografiasFinalesSchema, secuenciaTratamientoSchema}
