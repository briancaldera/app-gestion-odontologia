import {z} from 'zod'
import HistoriaOdontologicaSchema from "@/FormSchema/Historia/HistoriaOdontologicaSchema";
import PlanTratamientoSchema from "@/FormSchema/Historia/PlanTratamientoSchema";

type HistoriaOdontologica = z.infer<typeof HistoriaOdontologicaSchema> & {
    plan_tratamiento: any
    modificaciones_plan_tratamiento: any
    secuencia_tratamiento: any
}

export default HistoriaOdontologica
