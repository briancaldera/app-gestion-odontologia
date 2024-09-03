import User from "@/src/models/User";

type Group = {
    id: string
    owner: User
    members: User[]
    name: string
    created_at: Date
    updated_at: Date
}

export default Group
