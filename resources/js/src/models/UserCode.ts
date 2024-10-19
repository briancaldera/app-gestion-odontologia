import {Role} from "@/src/models/Role.ts";

type UserCode = {
    id: number
    code: string
    role: Role
    user_id: string
    created_at: string
    updated_at: string
}

export {type UserCode}
