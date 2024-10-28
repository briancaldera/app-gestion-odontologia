import {z} from 'zod'

const MAX_TEXT_LENGTH: number = 10000
const stringField = z.string().max(MAX_TEXT_LENGTH)

type ListItem = {
    id: string
    label: string
}

type TipoCepillo = ListItem

const tipoCepilloItems: readonly TipoCepillo[] = [
    {id: "duro", label: "Duro"},
    {id: "medio", label: "Medio"},
    {id: "suave", label: "Suave"},
] satisfies TipoCepillo[]

type MetodoCepillado = ListItem

const metodoCepilladoItems: readonly MetodoCepillado[] = [
    {id: "horizontal", label: "Horizontal"},
    {id: "vertical", label: "Vertical"},
    {id: "circular", label: "Circular"},
    {id: "otro", label: "Otro"},
] satisfies MetodoCepillado[]

type MetodoAuxHigiene = ListItem

const metodoAuxHigieneItems: readonly MetodoAuxHigiene[] = [
    {id: "hilo", label: "Hilo Dental"},
    {id: "enjuague", label: "Enjuague Bucal"},
    {id: "hidroterapia", label: "Hidroterapia"},
    {id: "cepillo_interdental", label: "Cepillo Interdental"},
    {id: "sustancia_reveladora", label: "Sustancia Reveladora"},
    {id: "otro", label: "Otro"},
] satisfies MetodoAuxHigiene[]

const HistoriaPeriodontalSchema = z.object({
    "higiene_bucal": z.object({
        "frecuencia_cepillado": stringField,
        "tipo_cepillo": z.enum(['D', 'M', 'S']),
        "metodo_cepillado": z.enum(['H', 'V', 'C', 'O']),
        "metodo_auxiliar": z.object({
            "hilo_dental": z.boolean(),
            "enjuague_bucal": z.boolean(),
            "hidroterapia": z.boolean(),
            "cepillo_interdental": z.boolean(),
        }),
        "sustancia_reveladora": z.object({
            "descripcion": z.string(),
            "otro": z.string(),
        }),
        "cepillado_lengua": z.boolean()
    }),
    "control_higiene_bucal": z.object({
            "tecnica_cepillado_ensenada": z.string(),
            "cepillo_recomendado": z.string(),
            "metodos_auxiliares_requeridos": z.string(),
            "placa_bacteriana_lengua": z.boolean(),
            "control_halitosis": z.enum(['S', 'N', 'NR']),
            "tratamiento": z.string()
        }
    )
})

const historiaPeriodontalSchema = z.object({
    higiene_bucal: z.object({
        frecuencia_cepillado: stringField,
        tipo_cepillo: z.array(z.string()),
        metodo_cepillado: z.array(z.string()),
        metodo_auxiliar: z.array(z.string()),
        cepillado_lengua: z.boolean(),
        hemorragia_gingival: z.boolean(),
        xerostomia: z.boolean(),
        sialorrea: z.boolean(),
    }),
    control_higiene_bucal: z.object({
        tecnica_cepillado_ensenada: z.string(),
        cepillo_recomendado: z.string(),
        metodos_auxiliares_requeridos: z.string(),
        placa_bacteriana_lengua: z.boolean(),
        control_halitosis: z.enum(['S', 'N', 'NR']),
        tratamiento: z.string()
    }),
})

const HistoriaPeriodontalDefaults = {
    higiene_bucal: {
        frecuencia_cepillado: '',
        cepillado_lengua: false,
        metodo_auxiliar: {
            cepillo_interdental: false, enjuague_bucal: false, hidroterapia: false, hilo_dental: false
        },
        metodo_cepillado: '',
        sustancia_reveladora: {
            descripcion: "", otro: ""

        },
        tipo_cepillo: ''
    },
    control_higiene_bucal: {
        cepillo_recomendado: "",
        control_halitosis: '',
        metodos_auxiliares_requeridos: "",
        placa_bacteriana_lengua: false,
        tecnica_cepillado_ensenada: "",
        tratamiento: ""
    }
} satisfies z.infer<typeof HistoriaPeriodontalSchema>

export {
    HistoriaPeriodontalDefaults,
    historiaPeriodontalSchema,
    tipoCepilloItems,
    metodoCepilladoItems,
    metodoAuxHigieneItems
}
export default HistoriaPeriodontalSchema
