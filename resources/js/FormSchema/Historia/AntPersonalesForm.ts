import {z} from 'zod'

const medicamentoObject = z.object({
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

const alergiaObject = z.boolean()

const AntPersonalesFormSchema = z.object({
    historia_id: z.string(),
    medicamentos: z.object({
        hipertensivos: medicamentoObject,
        analgesicos: medicamentoObject,
        esteroides: medicamentoObject,
        antidepresivos: medicamentoObject,
        anticonceptivos: medicamentoObject,
        hipogicemiante: medicamentoObject,
        anticonvulsivos: medicamentoObject,
        sildenafil: medicamentoObject,
        acidoacetilicidico: medicamentoObject,
        anticoagulante: medicamentoObject,
        bifosfanato: medicamentoObject,
        otros: z.object({
            positivo: z.boolean(),
            descripcion: z.string().max(255)
        })
    }),
    alergias: z.object({
        antibioticos: alergiaObject,
        analgesicos: alergiaObject,
        anestesicos: alergiaObject,
        yodo: alergiaObject,
        otros: alergiaObject,
        descripcion: z.string().max(255),
    })
})

export const AntPersonalesForm: z.infer<typeof AntPersonalesFormSchema> = {
    historia_id: '',
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
}

export default AntPersonalesFormSchema
