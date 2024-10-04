import {z} from 'zod'

const CreateAssignmentSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().max(1000)
})

export default CreateAssignmentSchema
