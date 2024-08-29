import {z} from 'zod'
import TrastornosSchema, {TrastornosDefaults} from "./TrastornosSchema";

const MedicamentoSchema = z.object({
    positivo: z
        .boolean(),
    dosis: z
        .coerce
        .number()
        .nonnegative()
        .transform(value => (value === 0) ? null : value)
        .nullable()
})
//     .transform(schema => {
//     if (!schema.positivo) {
//         schema.dosis = null
//     }
//     return schema
// })
    .refine(({positivo, dosis}) => {
    return !(!positivo && dosis !== null);
}, {message: 'El campo dosis no puede contener valor si no aplica'})

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
            descripcion: z.string().max(255)
        })
    }),
    alergias: z.object({
        antibioticos: AlergiaSchema,
        analgesicos: AlergiaSchema,
        anestesicos: AlergiaSchema,
        yodo: AlergiaSchema,
        otros: AlergiaSchema,
        descripcion: z.string().max(255),
    })
})

export const AntPersonalesDefaults = {
    historia_id: null,
    trastornos: TrastornosDefaults,
    medicamentos: {
        hipertensivos: {
            positivo: false,
            dosis: null,
        },
        analgesicos: {
            positivo: false,
            dosis: null,
        },
        esteroides: {
            positivo: false,
            dosis: null,
        },
        antidepresivos: {
            positivo: false,
            dosis: null,
        },
        anticonceptivos: {
            positivo: false,
            dosis: null,
        },
        hipogicemiante: {
            positivo: false,
            dosis: null,
        },
        anticonvulsivos: {
            positivo: false,
            dosis: null,
        },
        sildenafil: {
            positivo: false,
            dosis: null,
        },
        acidoacetilicidico: {
            positivo: false,
            dosis: null,
        },
        anticoagulante: {
            positivo: false,
            dosis: null,
        },
        bifosfanato: {
            positivo: false,
            dosis: null,
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
} satisfies z.infer<typeof AntPersonalesSchema>

export default AntPersonalesSchema
