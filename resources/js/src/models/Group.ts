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
    homeworks: Homework[]
    created_at: string
    updated_at: string
}

type Homework = {
    id: string
    user_id: string
    assignment_id: string
    user?: User
    assignment?: Assignment
    documents: Document[]
    created_at: string
    updated_at: string
}

type Document = {
    id: string
    type: string
}

export {type Assignment, type Homework, type Document}
export default Group
