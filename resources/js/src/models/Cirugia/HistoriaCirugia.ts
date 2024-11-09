import {Status} from "@/src/models/Historia.ts";
import User from "@/src/models/User.ts";
import Paciente from "@/src/models/Paciente.ts";
import {z} from 'zod'
import {
    anamnesisSchema,
    femeninoSchema,
    habitosSchema,
    antecedentesSchema,
    estudiosRadiograficosSchema,
    examenFisicoSchema
} from "@/FormSchema/Odontologia/Cirugia/HistoriaCirugiaSchema.ts";

type HistoriaCirugia = {
    id: string

    status: Status
    paciente_id: string
    paciente: Paciente,
    autor_id: string
    autor: User

    anamnesis: z.infer<typeof anamnesisSchema>
    habitos: z.infer<typeof habitosSchema>
    femenino: z.infer<typeof femeninoSchema>
    antecedentes: z.infer<typeof antecedentesSchema>
    examen_fisico: z.infer<typeof examenFisicoSchema>
    observaciones: string | null
    estudios_radiograficos: z.infer<typeof estudiosRadiograficosSchema>
    periodontodiagrama: string | null
    consentimiento: string | null

    created_at: string
    updated_at: string
}

export {type HistoriaCirugia}
