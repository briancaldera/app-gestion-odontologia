import {z} from 'zod'
import TrastornosSchema, {TrastornosDefaults} from "./TrastornosSchema";

const MAX_TEXT_LENGTH = 1000

const MedicamentoSchema = z.object({
    positivo: z
        .boolean(),
    dosis_diaria: z
        .coerce
        .number()
        .nonnegative()
})
    .transform((schema) => {
        if (!schema.positivo) {
            schema.dosis_diaria = 0
        }
        return schema
    })
    .refine(({positivo, dosis_diaria}) => {
        if (!positivo && dosis_diaria === 0) return true
        if (positivo) return true

        return false
    }, {message: 'El campo dosis no puede contener valor si no aplica', path: ['dosis_diaria']})

const AlergiaSchema = z.boolean()

const AntPersonalesSchema = z.object({
    historia_id: z.string().nullish(),
    trastornos: TrastornosSchema,
    medicamentos: z.object({
        hipertensivos: MedicamentoSchema,
        analgesicos: MedicamentoSchema,
        esteroides: MedicamentoSchema,
        antidepresivos: MedicamentoSchema,
        anticonceptivos: MedicamentoSchema,
        hipogicemiante: MedicamentoSchema,
        anticonvulsivos: MedicamentoSchema,
        sildenafil: MedicamentoSchema,
        acidoacetilicidico: MedicamentoSchema,
        anticoagulante: MedicamentoSchema,
        bifosfanato: MedicamentoSchema,
        otros: z.object({
            positivo: z.boolean(),
            descripcion: z.string().max(MAX_TEXT_LENGTH).nullable()
        })
    }),
    alergias: z.object({
        antibioticos: AlergiaSchema,
        analgesicos: AlergiaSchema,
        anestesicos: AlergiaSchema,
        yodo: AlergiaSchema,
        otros: AlergiaSchema,
        descripcion: z.string().max(MAX_TEXT_LENGTH).nullable(),
    })
})

export const AntPersonalesDefaults = {
    historia_id: null,
    trastornos: TrastornosDefaults,
    medicamentos: {
        hipertensivos: {
            positivo: false,
            dosis_diaria: 0,
        },
        analgesicos: {
            positivo: false,
            dosis_diaria: 0,
        },
        esteroides: {
            positivo: false,
            dosis_diaria: 0,
        },
        antidepresivos: {
            positivo: false,
            dosis_diaria: 0,
        },
        anticonceptivos: {
            positivo: false,
            dosis_diaria: 0,
        },
        hipogicemiante: {
            positivo: false,
            dosis_diaria: 0,
        },
        anticonvulsivos: {
            positivo: false,
            dosis_diaria: 0,
        },
        sildenafil: {
            positivo: false,
            dosis_diaria: 0,
        },
        acidoacetilicidico: {
            positivo: false,
            dosis_diaria: 0,
        },
        anticoagulante: {
            positivo: false,
            dosis_diaria: 0,
        },
        bifosfanato: {
            positivo: false,
            dosis_diaria: 0,
        },
        otros: {
            positivo: false,
            descripcion: ''
        }
    },
    alergias: {
        antibioticos: false,
        analgesicos: false,
        anestesicos: false,
        yodo: false,
        otros: false,
        descripcion: '',
    },
} satisfies z.infer<typeof AntPersonalesSchema> as const

export default AntPersonalesSchema
