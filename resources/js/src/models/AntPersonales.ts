import {z} from 'zod'
import {trastornosSchema} from "@/FormSchema/Historia/TrastornosSchema";

type AntPersonales = {
    historia_id: string
    medicamentos: Medicamentos
    alergias: Alergias
    trastornos: Trastornos
}

type Alergias = {
    tipo: readonly string[]
    descripcion: string
}

type Medicamentos = {
    tipo: readonly string[]
    dosis: string
}

export type Trastornos = z.infer<typeof trastornosSchema>

export default AntPersonales
