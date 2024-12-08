import Profile from "@/src/models/Profile";
import Group from "@/src/models/Group.ts";

type User = {
    role: number
    id: string
    name: string
    email: string
    email_verified_at: string
    profile?: Profile
    group: Group
}

export default User
