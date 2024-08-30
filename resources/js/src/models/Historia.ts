import Paciente from "@/src/models/Paciente";
import AntFamiliares from '@/src/models/AntFamiliares'
import AntPersonales, {Trastornos} from "@/src/models/AntPersonales";

type Historia = {
    readonly id: string,
    readonly paciente_id: string,
    readonly autor_id: string,
    readonly numero: string,
    readonly motivo_consulta?: string,
    readonly enfermedad_actual?: string,
    readonly status?: Status,
    readonly paciente?: Paciente,
    readonly ant_familiares?: AntFamiliares
    readonly ant_personales?: AntPersonales
    readonly trastornos?: Trastornos
}

enum Status {
    ABIERTA = 'abierta',
    ENTREGADA = 'entregada',
    CORRECCION = 'correccion',
    CERRADA = 'cerrada',
}

export default Historia
