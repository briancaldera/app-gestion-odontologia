import {Status} from "@/src/models/Historia.ts";
import User from "@/src/models/User.ts";
import Paciente from "@/src/models/Paciente.ts";
import {z} from "zod";
import {anamnesisSchema} from "@/FormSchema/Odontologia/Endodoncia/HistoriaEndodonciaSchema.ts";

type HistoriaEndodoncia = {
    id: string
    paciente_id: string

    status?: Status
    autor_id?: string
    numero?: string
    autor?: User
    paciente?: Paciente,
    anamnesis?: z.infer<typeof anamnesisSchema>
    evaluacion_dolor?: Object
    secuencia_tratamiento?: Object

    created_at?: string
    updated_at?: string
}

const anamnesis = {
    "visita_medico_ultimos_6_meses": {
        "status": null,
        "descripcion": null
    },
    "bajo_tratamiento_actual": {
        "status": null,
        "descripcion": null
    },
    "alergia_medicamento": {
        "status": null,
        "descripcion": null
    },
    "alergia_material_dental": {
        "status": null,
        "descripcion": null
    },
    "hospitalizado_alguna_vez": {
        "status": null,
        "descripcion": null
    },
    "odontologo_ultimos_6_meses": {
        "status": null,
        "descripcion": null
    },
    "sangrado_al_cepillar": {
        "status": null,
        "descripcion": null
    },
    "abultamiento_diente": {
        "status": null,
        "descripcion": null
    },
    "rechina_aprieta_dientes": {
        "status": null,
        "descripcion": null
    },
    "dolor_CATM": {
        "status": null,
        "descripcion": null
    },
    "sangrado_excesivo_corte": {
        "status": null,
        "descripcion": null
    },
    "dificultad_cicatrizacion": {
        "status": null,
        "descripcion": null
    },
    "cigarrillo_tabaco": {
        "status": null,
        "descripcion": null
    },
    "alergia_alimento": {
        "status": null,
        "descripcion": null
    },
    "alergia_enlatados": {
        "status": null,
        "descripcion": null
    },
    "alergia_yodo": {
        "status": null,
        "descripcion": null
    },
    "reaccion_anestesia": {
        "status": null,
        "descripcion": null
    },
    "embarazo": {
        "status": null,
        "descripcion": null
    },
    "enfermedades": {
        "list": [],
        "resumen_ant_personales": null
    },
    "enfermedades_familiares": {
        "resumen_ant_familiares": null,
        "examen_comp": null
    }
}

export {type HistoriaEndodoncia}
