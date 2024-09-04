import Profile from "@/src/models/Profile";

type User = {
    role: number
    id: string
    name: string
    email: string
    email_verified_at: string
    profile?: Profile
}

export default User
