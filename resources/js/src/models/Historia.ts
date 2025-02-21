import Paciente from "@/src/models/Paciente";
import AntFamiliares from '@/src/models/AntFamiliares'
import AntPersonales, {Trastornos} from "@/src/models/AntPersonales";
import HistoriaOdontologica from "@/src/models/HistoriaOdontologica";
import User from "@/src/models/User";

type Historia = Readonly<{
    id: string
    paciente_id: string
    autor_id: string
    numero: string | null
    semestre: string | null

    autor?: User
    status?: Status
    paciente?: Paciente,
    ant_familiares?: AntFamiliares
    ant_personales?: AntPersonales
    trastornos?: Trastornos
    historia_odontologica?: HistoriaOdontologica
    motivo_consulta: string | null
    enfermedad_actual: string | null

    created_at: string
    updated_at: string

    extras?: Extras
}>

enum Status {
    ABIERTA = 'abierta',
    ENTREGADA = 'entregada',
    CORRECCION = 'correccion',
    CERRADA = 'cerrada',
}

type Extras = {
    id: string
    historia_id: string
    extras: {
        nota: string | null
        correcciones: {
            secciones: Record<string, Correccion[]>
        }
    }
    updated_at: string
    created_at: string
}

type Correccion = {
    id: string
    content: string
    author_id: string
    created_at: string
}

export {Status, type Correccion}
export default Historia
