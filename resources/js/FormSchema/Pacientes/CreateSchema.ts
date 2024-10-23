import {undefined, z} from 'zod'

const MAX_PICTURE_SIZE = 2 * 1000 * 1000 // 2 MB
const MIN_PICTURE_SIZE = 5 * 1000 // 5 KB
const ACCEPTED_PICTURE_MIME = ['image/jpeg', 'image/jpg', 'image/png']

const PacienteSchema = z.object({
    cedula: z
        .string({
            description: 'La cédula de paciente',
        })
        .min(4, 'Mínimo 4 caracteres')
        .max(10, 'Máximo 10 caracteres')
        .regex(/^[VE][\d]{3,9}$/, 'La cédula no corresponde al formato correcto'),
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
        .max(new Date(), {message: 'Fecha de nacimiento inválida'})
        .nullable(),
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
        // .regex(/^[\d]{4}-[\d]{7}$/, {message: 'El formato debe ser similar a 0414-1234567'})
        .refine(value => {
            if (value.length === 0) return true
            const regexp = /^[\d]{4}-[\d]{7}$/
            return regexp.test(value)
        }, {message: 'El formato debe ser similar a 0414-1234567'})
        .optional(),
    foto: z
        .any()
        .refine((file: File) => ACCEPTED_PICTURE_MIME.includes(file?.type), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
        .refine((file: File) => file?.size <= MAX_PICTURE_SIZE, {message: 'Archivo muy grande'})
        .refine((file: File) => file?.size >= MIN_PICTURE_SIZE, {message: 'Archivo muy pequeño'})
        .nullish(),
    motivo_consulta: z.string().min(1, {message: 'Debe especificar el motivo de la consulta'}),
    enfermedad_actual: z.string().optional(),
})

const PacienteDefaults = {
    cedula: '',
    nombre: '',
    apellido: '',
    edad: 0,
    direccion: '',
    peso: 0,
    sexo: '',
    fecha_nacimiento: null,
    ocupacion: '',
    telefono: '',
    enfermedad_actual: '',
    motivo_consulta: "",
    foto: null
} satisfies z.infer<typeof PacienteSchema>

export {PacienteSchema, PacienteDefaults}
