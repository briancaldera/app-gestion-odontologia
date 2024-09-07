import {z} from "zod";

const MAX_TEXT_LENGTH: number = 1000
const MAX_CAVITY_LENGTH: number = 100
const MAX_TOOTH_LENGTH: number = 100

const CAVIDAD_CLASES: readonly string[] = ['I', 'II', 'III', 'IV', 'V'] as const

const TratamientoSchema = z.object({
    diente: z.string().max(MAX_TOOTH_LENGTH, {message: `Máximo ${MAX_TOOTH_LENGTH} caracteres`}),
    cavidad: z.string().max(MAX_CAVITY_LENGTH, {message: `Máximo ${MAX_CAVITY_LENGTH} caracteres`}),
    tratamiento: z.string().max(MAX_TEXT_LENGTH, {message: `Máximo ${MAX_TEXT_LENGTH} caracteres`}),
})

const TratamientoDefaults = {
    cavidad: '', diente: '', tratamiento: ''
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
