import {z} from "zod";

const MAX_TEXT_LENGTH: number = 1000

const ModificacionPlanTratamientoSchema = z.object({
    fecha: z.coerce.date(),
    diente: z.coerce.number().int().min(18).max(48),
    tratamiento: z.string().max(MAX_TEXT_LENGTH).nullable(),
})

const ModificacionPlanTratamientoDefaults = {
    diente: 0, fecha: new Date(), tratamiento: ''
} satisfies z.infer<typeof ModificacionPlanTratamientoSchema> as const

const ModificacionesPlanTratamientoSchema = z.object({
    modificaciones_plan_tratamiento: z.array(ModificacionPlanTratamientoSchema)
})

const ModificacionesPlanTratamientoDefaults = {
    modificaciones_plan_tratamiento: []
} satisfies z.infer<typeof ModificacionesPlanTratamientoSchema> as const

export {ModificacionesPlanTratamientoDefaults, ModificacionPlanTratamientoSchema, ModificacionPlanTratamientoDefaults}
export default ModificacionesPlanTratamientoSchema
