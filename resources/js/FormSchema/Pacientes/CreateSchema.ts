import {z} from 'zod'

const MAX_PICTURE_SIZE = 2 * 1000 * 1000 // 2 MB
const MIN_PICTURE_SIZE = 5 * 1000 // 5 KB
const ACCEPTED_PICTURE_MIME = ['image/jpeg', 'image/jpg', 'image/png']

const pacienteSchema = z.object({
    cedula: z.object({
        cedula_letra: z.enum(['V', 'E']),
        cedula_numero: z.string().min(3).max(9).refine(value => typeof parseInt(value) === 'number'),
    }).transform((values) => {
        const {cedula_letra, cedula_numero} = values

        return `${cedula_letra}${cedula_numero}`
    }),
    nombre: z
        .string()
        .trim()
        .min(2, 'Mínimo 2 caracteres')
        .max(50, 'Máximo 50 caracteres'),
    apellido: z
        .string()
        .trim()
        .min(2, 'Mínimo 2 caracteres')
        .max(50, 'Máximo 50 caracteres'),
    edad: z
        .coerce
        .number()
        .int({message: 'Solo números enteros'})
        .positive({message: 'Solo números positivos'})
        .min(0, {message: 'Mínimo 0'})
        .max(150, {message: 'Máximo 150 años'}),
    sexo: z
        .enum(['F', 'M', 'NI'], {message: 'Debe ser F, M o NI'}),
    peso: z
        .coerce
        .number()
        .min(0, {message: 'Mínimo 0'})
        .max(300, {message: 'Máximo 300 kilos '}),
    fecha_nacimiento: z
        .coerce
        .date()
        .max(new Date(), {message: 'Fecha de nacimiento inválida'}),
    ocupacion: z
        .string()
        .min(1, {message: 'Mínimo 1 caracteres'})
        .max(50, {message: 'Máximo 50 caracteres'}),
    direccion: z
        .string()
        .min(3)
        .max(100),
    telefono: z
        .string()
        .min(0)
        .max(15)
        .regex(/^\d{4}-\d{7}$|^$/, {message: 'El formato debe ser similar a 0414-1234567'})
        .optional(),
    foto: z
        .any()
        .refine((file: File) => ACCEPTED_PICTURE_MIME.includes(file?.type), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
        .refine((file: File) => file?.size <= MAX_PICTURE_SIZE, {message: 'Archivo muy grande'})
        .refine((file: File) => file?.size >= MIN_PICTURE_SIZE, {message: 'Archivo muy pequeño'})
        .nullish(),
    motivo_consulta: z.string().min(1, {message: 'Debe especificar el motivo de la consulta'}),
    enfermedad_actual: z.string().optional(),
    informacion_emergencia: z.object({
        contacto: z.string().max(255).optional(),
        telefono: z.string().regex(/^\d{4}-\d{7}$|^$/, {message: 'El formato debe ser similar a 0414-1234567'}).optional(),
    })
})

export {pacienteSchema}
