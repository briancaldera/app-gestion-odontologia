import {z} from 'zod'

const MAX_PICTURE_SIZE = 2 * 1000 * 1000 // 2 MB
const MIN_PICTURE_SIZE = 5 * 1000 // 5 KB
const ACCEPTED_PICTURE_MIME = ['image/jpeg', 'image/jpg', 'image/png']

const PacienteFormSchema = z.object({
    cedula: z
        .string({
            description: 'La cédula de paciente',
        })
        .min(4, 'Mínimo 4 caracteres')
        .max(10, 'Máximo 10 caracteres')
        .regex(/^[VE][\d]{3,9}$/, 'La cédula no corresponde al formato correcto')
        .default('V1234'),
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
        .number()
        .int()
        .positive()
        .min(0)
        .max(150),
    sexo: z
        .enum(['F', 'M', 'NI']),
    peso: z
        .number()
        .min(0)
        .max(300),
    fecha_nacimiento: z
        .date()
        .max(new Date(), {message: 'Fecha de nacimiento inválida'})
        .nullable(),
    ocupacion: z
        .string()
        .min(0)
        .max(50),
    direccion: z
        .string()
        .min(3)
        .max(100)
        .optional(),
    telefono: z
        .string()
        .min(0)
        .max(15)
        .regex(/^[\d]{4}-[\d]{7}$/)
        .optional(),
    foto: z
        .any()
        .refine((file: File) => ACCEPTED_PICTURE_MIME.includes(file?.type), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
        .refine((file: File) => file?.size <= MAX_PICTURE_SIZE, {message: 'Archivo muy grande'})
        .refine((file: File) => file?.size >= MIN_PICTURE_SIZE, {message: 'Archivo muy pequeño'})
        .nullable()
})

export const Paciente: z.infer<typeof PacienteFormSchema> = {
    cedula: '',
    nombre: '',
    apellido: '',
    edad: 0,
    direccion: '',
    peso: 0,
    sexo: 'NI',
    fecha_nacimiento: null,
    ocupacion: '',
    telefono: '',
    foto: null
}

export default PacienteFormSchema
