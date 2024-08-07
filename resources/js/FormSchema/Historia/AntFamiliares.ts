import {z} from 'zod'

const AntFamiliaresFormSchema = z.object({
    historia_id: z.string(),
    madre: z.string().max(255),
    padre: z.string().max(255),
    hermanos: z.string().max(255),
    abuelos_maternos: z.string().max(255),
    abuelos_paternos: z.string().max(255),
})

export default AntFamiliaresFormSchema
