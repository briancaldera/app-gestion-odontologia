import {z} from "zod";

const HistoriaFormSchema = z.object({
    paciente_id: z.string().uuid(),
    numero: z.string().nullable(),
    motivo_consulta: z.string(),
    enfermedad_actual: z.string(),
})

export const Historia: z.infer<typeof HistoriaFormSchema> = {
    enfermedad_actual: "",
    motivo_consulta: "",
    numero: null,
    paciente_id: "",
}

export default HistoriaFormSchema
