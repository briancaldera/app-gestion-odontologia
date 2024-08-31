import {z} from "zod";

const MAX_TEXT_LENGTH: number = 1000

const TratamientoRealizadoSchema = z.object({
    fecha: z.coerce.date(),
    diente: z.coerce.number().int().min(18).max(48),
    tratamiento: z.string().max(MAX_TEXT_LENGTH).nullable(),
})

const TratamientoRealizadoDefaults = {
    diente: 0, fecha: new Date(), tratamiento: ''
} satisfies z.infer<typeof TratamientoRealizadoSchema>

const SecuenciaTratamientoSchema = z.object({
    secuencia_tratamiento: z.array(TratamientoRealizadoSchema)
})

const SecuenciaTratamientoDefaults = {
    secuencia_tratamiento: []
} satisfies z.infer<typeof SecuenciaTratamientoSchema> as const

export {TratamientoRealizadoSchema, TratamientoRealizadoDefaults, SecuenciaTratamientoDefaults}
export default SecuenciaTratamientoSchema
