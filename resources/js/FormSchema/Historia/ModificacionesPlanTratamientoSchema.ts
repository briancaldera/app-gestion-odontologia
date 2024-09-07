import {z} from "zod";

const MAX_TEXT_LENGTH: number = 1000
const MAX_TOOTH_LENGTH: number = 100

const ModificacionPlanTratamientoSchema = z.object({
    fecha: z.coerce.date(),
    diente: z.string().max(MAX_TOOTH_LENGTH, {message: `Máximo ${MAX_TOOTH_LENGTH} caracteres`}),
    tratamiento: z.string().max(MAX_TEXT_LENGTH, {message: `Máximo ${MAX_TEXT_LENGTH} caracteres`}).nullable(),
})

const ModificacionPlanTratamientoDefaults = {
    diente: '', fecha: new Date(), tratamiento: ''
} satisfies z.infer<typeof ModificacionPlanTratamientoSchema> as const

const ModificacionesPlanTratamientoSchema = z.object({
    historia_id: z.string().nullish(),
    modificaciones_plan_tratamiento: z.array(ModificacionPlanTratamientoSchema)
})

const ModificacionesPlanTratamientoDefaults = {
    historia_id: null,
    modificaciones_plan_tratamiento: []
} satisfies z.infer<typeof ModificacionesPlanTratamientoSchema> as const

export {ModificacionesPlanTratamientoDefaults, ModificacionPlanTratamientoSchema, ModificacionPlanTratamientoDefaults}
export default ModificacionesPlanTratamientoSchema
