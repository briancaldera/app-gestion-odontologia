import {z} from "zod";

const MAX_TEXT_LENGTH: number = 1000
const MAX_TOOTH_LENGTH: number = 100

const modificacionPlanTratamientoSchema = z.object({
    fecha: z.date(),
    diente: z.string().max(MAX_TOOTH_LENGTH, {message: `Máximo ${MAX_TOOTH_LENGTH} caracteres`}),
    tratamiento: z.string().max(MAX_TEXT_LENGTH, {message: `Máximo ${MAX_TEXT_LENGTH} caracteres`}).nullable(),
})

const modificacionesPlanTratamientoSchema = z.object({
    modificaciones_plan_tratamiento: z.array(modificacionPlanTratamientoSchema)
})

export {modificacionesPlanTratamientoSchema, modificacionPlanTratamientoSchema}
