import User from "@/src/models/User";

interface Profile {
    user_id?: string
    nombres: string
    apellidos: string
    fecha_nacimiento?: string
    telefono?: string
    direccion?: string
    sexo?: 'F' | 'M' | 'NI'
    cedula?: string
    picture_url: string,
    user?: User
}

export default Profile
