import Paciente from "@/src/models/Paciente";

type Historia = {
    readonly id: string,
    readonly paciente_id: string,
    readonly autor_id: string,
    readonly numero: string,
    readonly motivo_consulta?: string,
    readonly enfermedad_actual?: string,
    readonly status?: Status,
    readonly paciente?: Paciente
}

enum Status {
    ABIERTA = 'abierta',
    ENTREGADA = 'entregada',
    CORRECCION = 'correccion',
    CERRADA = 'cerrada',
}

export default Historia
