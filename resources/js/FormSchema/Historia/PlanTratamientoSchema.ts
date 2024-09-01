import {z} from "zod";

const MAX_TEXT_LENGTH: number = 10000

export const CAVIDAD_CLASES = ['I', 'II', 'III', 'IV', 'V'] as const

export const TratamientoSchema = z.object({
    diente: z.coerce.number({required_error: 'Número de diente requerido', invalid_type_error: 'Campo debe ser numérico'}).int({message: 'No se admiten decimales'}).min(18, { message: 'Valor mínimo es 18'}).max(48, { message: 'Valor máximo es 48'}),
    cavidad: z.enum(CAVIDAD_CLASES, {required_error: 'Campo requerido', invalid_type_error: 'Campo debe ser un letra', message: `Campo debe ser un valor entre ${CAVIDAD_CLASES}`}),
    tratamiento: z.string().max(MAX_TEXT_LENGTH).nullable(),
})

export const TratamientoDefaults = {
    cavidad: '', diente: 0, tratamiento: ""
} satisfies z.infer<typeof TratamientoSchema> as const

const PlanTratamientoSchema = z.object({
    historia_id: z.string().nullish(),
    plan_tratamiento: z.array(TratamientoSchema)
})

export const PlanTratamientoDefaults = {
    historia_id: null,
    plan_tratamiento: []
} satisfies z.infer<typeof PlanTratamientoSchema> as const

export default PlanTratamientoSchema
