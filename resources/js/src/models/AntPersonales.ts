import { z } from 'zod'
import TrastornosSchema from "@/FormSchema/Historia/TrastornosSchema";

type AntPersonales = {
    readonly historia_id: string
    readonly medicamentos: object
    readonly alergias: object
    trastornos: Trastornos
}

export type Trastornos = z.infer<typeof TrastornosSchema>

export default AntPersonales
