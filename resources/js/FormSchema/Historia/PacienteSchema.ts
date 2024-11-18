import {z} from 'zod'
import {fakerES_MX as faker} from '@faker-js/faker'

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
        .string()
        .date()
        .nullable(),
    ocupacion: z
        .string()
        .min(0, {message: 'Mínimo 0 caracteres'})
        .max(50, {message: 'Máximo 50 caracteres'}),
    direccion: z
        .string()
        .min(3)
        .max(100)
        .optional(),
    telefono: z
        .string()
        .min(0)
        .max(15)
        .regex(/^[\d]{4}-[\d]{7}$/, {message: 'El formato debe ser similar a 0414-1234567'})
        .optional(),
    foto: z
        .any()
        .refine((file: File) => ACCEPTED_PICTURE_MIME.includes(file?.type), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
        .refine((file: File) => file?.size <= MAX_PICTURE_SIZE, {message: 'Archivo muy grande'})
        .refine((file: File) => file?.size >= MIN_PICTURE_SIZE, {message: 'Archivo muy pequeño'})
        .nullish()
})

const PacienteDefaults = {
    cedula: '',
    nombre: '',
    apellido: '',
    edad: 0,
    direccion: '',
    peso: 0,
    sexo: 'NI',
    fecha_nacimiento: '',
    ocupacion: '',
    telefono: '',
    foto: undefined
} satisfies z.infer<typeof PacienteSchema>

const PacienteFake = {
    apellido: faker.person.lastName(),
    cedula: 'V26009495',
    direccion: faker.location.streetAddress(),
    edad: faker.number.int({min: 18, max: 60}),
    fecha_nacimiento: faker.date.birthdate(),
    foto: undefined,
    nombre: faker.person.firstName(),
    ocupacion: faker.person.jobTitle(),
    peso: faker.number.float({min: 50, max: 100, fractionDigits: 2}),
    sexo: faker.string.fromCharacters(['F', 'M', 'NI']),
    telefono: '0414-1234567'
} satisfies z.infer<typeof PacienteSchema>

export {PacienteDefaults, PacienteFake}
export default PacienteSchema
