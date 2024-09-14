import {z} from 'zod'

const HistoriaPeriodontalSchema = z.object({
    "higiene_bucal": z.object({
        "frecuencia_cepillado": z.ostring(),
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
    )})

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

export {HistoriaPeriodontalDefaults}
export default HistoriaPeriodontalSchema
