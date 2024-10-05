import User from "@/src/models/User";

type Group = {
    id: string
    owner: User
    members?: User[]
    name: string
    assignments: Assignment[]
    created_at: string
    updated_at?: string
}

type Assignment = {
    id: string
    group_id: string
    name: string
    description: string
    homework: Homework[]
    created_at: string
    updated_at: string
}

type Homework = {
    user_id: string
    documents: Document[]
    created_at: string
}

type Document = {
    id: string
    type: string
}

export {type Assignment, type Homework, type Document}
export default Group
