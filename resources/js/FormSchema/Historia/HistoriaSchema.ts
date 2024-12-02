import {z} from "zod";

const historiaSchema = z.object({
    motivo_consulta: z.string(),
    enfermedad_actual: z.string(),
})

const HistoriaDefaults = {
    enfermedad_actual: "",
    motivo_consulta: "",
} satisfies z.infer<typeof historiaSchema>

export {historiaSchema}
