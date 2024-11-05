import {Status} from "@/src/models/Historia.ts";
import User from "@/src/models/User.ts";
import Paciente from "@/src/models/Paciente.ts";

type HistoriaCirugia = {
    id: string

    status: Status
    paciente_id: string
    paciente?: Paciente,
    autor_id: string
    autor?: User

    created_at: string
    updated_at: string
}
