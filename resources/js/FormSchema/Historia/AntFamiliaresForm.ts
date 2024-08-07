import {z} from 'zod'

const AntFamiliaresFormSchema = z.object({
    historia_id: z.string().nullable(),
    madre: z.string().max(255),
    padre: z.string().max(255),
    hermanos: z.string().max(255),
    abuelos_maternos: z.string().max(255),
    abuelos_paternos: z.string().max(255),
})

export const AntFamiliaresForm: z.infer<typeof AntFamiliaresFormSchema> = {
    historia_id: null,
    madre: '',
    padre: '',
    hermanos: '',
    abuelos_maternos: '',
    abuelos_paternos: '',
}

export default AntFamiliaresFormSchema
