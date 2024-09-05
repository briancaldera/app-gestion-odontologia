import {z} from "zod";

const HistoriaSchema = z.object({
    paciente_id: z.string().uuid().nullish(),
    motivo_consulta: z.string().min(1, {message: 'Debe especificar el motivo de la consulta'}),
    enfermedad_actual: z.string(),
})

const HistoriaDefaults = {
    enfermedad_actual: "",
    motivo_consulta: "",
} satisfies z.infer<typeof HistoriaSchema>

export {HistoriaDefaults}
export default HistoriaSchema
