import User from "@/src/models/User";

type Group = {
    id: string
    owner: User
    members?: User[]
    name: string
    created_at: string
    updated_at?: string
}

export default Group
