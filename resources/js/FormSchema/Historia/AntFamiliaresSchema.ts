import {z} from 'zod'

const AntFamiliaresSchema = z.object({
    historia_id: z.string().nullish(),
    madre: z.string().max(255),
    padre: z.string().max(255),
    hermanos: z.string().max(255),
    abuelos_maternos: z.string().max(255),
    abuelos_paternos: z.string().max(255),
})

export const AntFamiliaresDefaults = {
    madre: '',
    padre: '',
    hermanos: '',
    abuelos_maternos: '',
    abuelos_paternos: '',
} satisfies z.infer<typeof AntFamiliaresSchema> as const

export default AntFamiliaresSchema
