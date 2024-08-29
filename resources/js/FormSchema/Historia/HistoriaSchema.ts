import {z} from "zod";

const HistoriaSchema = z.object({
    paciente_id: z.string().uuid(),
    numero: z.string().nullable(),
    motivo_consulta: z.string(),
    enfermedad_actual: z.string(),
})

export const HistoriaDefaults: z.infer<typeof HistoriaSchema> = {
    enfermedad_actual: "",
    motivo_consulta: "",
    numero: null,
    paciente_id: "",
}

export default HistoriaSchema
