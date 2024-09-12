import {z} from "zod";

const MAX_PICTURE_SIZE: number = 10 * 1000 * 1000 // 10 MB
const MIN_PICTURE_SIZE: number = 1000 // 1 KB
const ACCEPTED_PICTURE_MIME: readonly string[] = ['image/jpeg', 'image/jpg', 'image/png']

const ImageFileSchema = z
    .any()
    .refine((data: any) => data instanceof File)
    .refine((file: File) => ACCEPTED_PICTURE_MIME.includes(file?.type), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
    .refine((file: File) => file.size >= MIN_PICTURE_SIZE, {message: 'Archivo muy pequeño'})
    .refine((file: File) => file?.size <= MAX_PICTURE_SIZE, {message: 'Archivo muy grande'})

const MediaSchema = z.object({
    historia_id: z.string().uuid(),
    title: z.string().min(1, {message: 'Debe colocar un nombre'}).max(255, {message: 'Máximo 255 caracteres'}),
    description: z.string().max(1000, {message: 'Máximo 1000 caracteres'}).optional(),
    file: z.array(ImageFileSchema).nonempty().max(1),
})

const MediaSchemaDefault = {
    historia_id: '',
    title: '',
    description: '',
    file: []
} satisfies z.infer<typeof MediaSchema>

export {MediaSchemaDefault}
export default MediaSchema
