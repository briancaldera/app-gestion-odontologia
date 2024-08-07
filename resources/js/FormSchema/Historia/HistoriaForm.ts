import {z} from "zod";

const HistoriaFormSchema = z.object({
    paciente_id: z.string().uuid(),
    numero: z.string().nullable(),
    motivo_consulta: z.string(),
    enfermedad_actual: z.string(),
})

export default HistoriaFormSchema
