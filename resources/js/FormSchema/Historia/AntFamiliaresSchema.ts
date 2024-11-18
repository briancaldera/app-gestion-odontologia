import {z} from 'zod'

const MAX_TEXT_LENGTH: number = 1000;

const AntFamiliaresSchema = z.object({
    historia_id: z.string().nullish(),
    madre: z.string().max(MAX_TEXT_LENGTH, {message: `Máximo ${MAX_TEXT_LENGTH} caracteres`}).nullable().describe('Madre'),
    padre: z.string().max(MAX_TEXT_LENGTH, {message: `Máximo ${MAX_TEXT_LENGTH} caracteres`}).nullable().describe('Padre'),
    hermanos: z.string().max(MAX_TEXT_LENGTH, {message: `Máximo ${MAX_TEXT_LENGTH} caracteres`}).nullable().describe('Hermanos'),
    abuelos_maternos: z.string().max(MAX_TEXT_LENGTH, {message: `Máximo ${MAX_TEXT_LENGTH} caracteres`}).nullable().describe('Abuelos maternos'),
    abuelos_paternos: z.string().max(MAX_TEXT_LENGTH, {message: `Máximo ${MAX_TEXT_LENGTH} caracteres`}).nullable().describe('Abuelos paternos'),
})

export const AntFamiliaresDefaults = {
    madre: '',
    padre: '',
    hermanos: '',
    abuelos_maternos: '',
    abuelos_paternos: '',
} satisfies z.infer<typeof AntFamiliaresSchema> as const

export default AntFamiliaresSchema
