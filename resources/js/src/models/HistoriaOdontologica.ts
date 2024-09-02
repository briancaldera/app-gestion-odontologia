import {z} from 'zod'
import HistoriaOdontologicaSchema from "@/FormSchema/Historia/HistoriaOdontologicaSchema";
import PlanTratamientoSchema from "@/FormSchema/Historia/PlanTratamientoSchema";
import EstudioModelosSchema from "@/FormSchema/Historia/EstudioModelosSchema";

type HistoriaOdontologica = z.infer<typeof HistoriaOdontologicaSchema> & {
    estudio_modelos: z.infer<typeof EstudioModelosSchema>
    plan_tratamiento: any
    modificaciones_plan_tratamiento: any
    secuencia_tratamiento: any
}

export default HistoriaOdontologica
