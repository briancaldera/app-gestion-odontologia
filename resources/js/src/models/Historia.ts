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
}>

enum Status {
    ABIERTA = 'abierta',
    ENTREGADA = 'entregada',
    CORRECCION = 'correccion',
    CERRADA = 'cerrada',
}

export {Status}
export default Historia
