type Paciente = Readonly<{
    id: string
    nombre: string
    apellido: string
    foto_url: string | null

    cedula?: string
    edad?: number
    sexo?: Sex
    peso?: number
    fecha_nacimiento?: string
    ocupacion?: string
    direccion?: string
    telefono?: string
    created_at?: string
    updated_at?: string
}>

type Sex = 'F' | 'M' | 'NI'

export default Paciente
