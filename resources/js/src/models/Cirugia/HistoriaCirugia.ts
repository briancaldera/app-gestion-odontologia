import {Status} from "@/src/models/Historia.ts";
import User from "@/src/models/User.ts";
import Paciente from "@/src/models/Paciente.ts";
import {z} from 'zod'
import {anamnesisSchema} from "@/FormSchema/Odontologia/Cirugia/HistoriaCirugiaSchema.ts";

type HistoriaCirugia = {
    id: string

    status: Status
    paciente_id: string
    paciente?: Paciente,
    autor_id: string
    autor?: User

    anamnesis: z.infer<typeof anamnesisSchema>

    created_at: string
    updated_at: string
}

export {type HistoriaCirugia}
