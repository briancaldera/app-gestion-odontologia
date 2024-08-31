import {z} from 'zod'
import HistoriaOdontologicaSchema from "@/FormSchema/Historia/HistoriaOdontologicaSchema";

type HistoriaOdontologica = z.infer<typeof HistoriaOdontologicaSchema>

export default HistoriaOdontologica
