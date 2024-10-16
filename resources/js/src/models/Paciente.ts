import User from "@/src/models/User.ts";
import Historia from "@/src/models/Historia.ts";
import {HistoriaEndodoncia} from "@/src/models/Endodoncia/HistoriaEndodoncia.ts";

type Paciente = Readonly<{
    id: string
    nombre: string
    apellido: string

    cedula?: string
    edad?: number
    sexo?: Sex
    peso?: number
    fecha_nacimiento?: string
    ocupacion?: string
    direccion?: string
    telefono?: string | null
    motivo_consulta?: string
    enfermedad_actual?: string | null
    foto?: string | null
    registered_by?: string
    assigned_to?: string
    created_at?: string
    updated_at?: string
    medico_tratante?: User
    historia?: Historia | null
    historia_endodoncia?: HistoriaEndodoncia | null
}>

type Sex = 'F' | 'M' | 'NI'

export default Paciente
