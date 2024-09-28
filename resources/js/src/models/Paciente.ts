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
}>

type Sex = 'F' | 'M' | 'NI'

export default Paciente
