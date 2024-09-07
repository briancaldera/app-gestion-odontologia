import {z} from "zod";

const MAX_TEXT_LENGTH: number = 1000
const MAX_TOOTH_LENGTH: number = 100

const TratamientoRealizadoSchema = z.object({
    fecha: z.coerce.date(),
    diente: z.string().max(MAX_TOOTH_LENGTH, {message: `Máximo ${MAX_TOOTH_LENGTH} caracteres`}),
    tratamiento: z.string().max(MAX_TEXT_LENGTH).nullable(),
})

const TratamientoRealizadoDefaults = {
    diente: '', fecha: new Date(), tratamiento: ''
} satisfies z.infer<typeof TratamientoRealizadoSchema>

const SecuenciaTratamientoSchema = z.object({
    historia_id: z.string().nullish(),
    secuencia_tratamiento: z.array(TratamientoRealizadoSchema)
})

const SecuenciaTratamientoDefaults = {
    historia_id: null,
    secuencia_tratamiento: []
} satisfies z.infer<typeof SecuenciaTratamientoSchema> as const

export {TratamientoRealizadoSchema, TratamientoRealizadoDefaults, SecuenciaTratamientoDefaults}
export default SecuenciaTratamientoSchema
