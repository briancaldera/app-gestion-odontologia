import {z} from 'zod'

const MAX_PICTURE_SIZE: number = 2 * 1000 * 1000 // 2 MB
const MIN_PICTURE_SIZE: number = 5 * 1000 // 5 KB
const ACCEPTED_PICTURE_MIME: readonly string[] = ['image/jpeg', 'image/jpg', 'image/png']

const ImageFileSchema = z
    .any()
    .refine((data: any) => data instanceof File)
    .refine((file: File) => ACCEPTED_PICTURE_MIME.includes(file?.type), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
    .refine((file: File) => file.size >= MIN_PICTURE_SIZE, {message: 'Archivo muy pequeño'})
    .refine((file: File) => file?.size <= MAX_PICTURE_SIZE, {message: 'Archivo muy grande'})

const PeriodontodiagramaSchema = z.object({
    historia_id: z.string().uuid(),
    periodontodiagrama: ImageFileSchema
})

export default PeriodontodiagramaSchema
