import {z} from 'zod'

const DocumentSchema = z.object({
    id: z.string().trim().min(1),
    type: z.string().trim().min(0)
})

const CreateHomeworkSchema = z.object({
    documents: z.array(DocumentSchema).nonempty().max(5)
})

const DocumentDefaults = {
    id: "",
    type: ""
} satisfies z.infer<typeof DocumentSchema>

export {DocumentSchema, DocumentDefaults}
export default CreateHomeworkSchema
