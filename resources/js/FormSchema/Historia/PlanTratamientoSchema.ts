import {z} from "zod";

const MAX_TEXT_LENGTH: number = 1000
const MAX_CAVITY_LENGTH: number = 100

const CAVIDAD_CLASES: readonly string[] = ['I', 'II', 'III', 'IV', 'V'] as const

const TratamientoSchema = z.object({
    diente: z.coerce.number({required_error: 'Número de diente requerido', invalid_type_error: 'Campo debe ser numérico'}).int({message: 'No se admiten decimales'}).min(18, { message: 'Valor mínimo es 18'}).max(48, { message: 'Valor máximo es 48'}),
    cavidad: z.string({required_error: 'Campo requerido'}).max(MAX_CAVITY_LENGTH, {message: 'Máximo 100 caracteres'}),
    tratamiento: z.string().max(MAX_TEXT_LENGTH).nullable(),
})

const TratamientoDefaults = {
    cavidad: '', diente: 0, tratamiento: ""
} satisfies z.infer<typeof TratamientoSchema>

const PlanTratamientoSchema = z.object({
    historia_id: z.string().nullish(),
    plan_tratamiento: z.array(TratamientoSchema)
})

const PlanTratamientoDefaults = {
    historia_id: null,
    plan_tratamiento: []
} satisfies z.infer<typeof PlanTratamientoSchema>

export { CAVIDAD_CLASES, TratamientoSchema, TratamientoDefaults, PlanTratamientoDefaults}
export default PlanTratamientoSchema
