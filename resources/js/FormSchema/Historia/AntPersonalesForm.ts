import {z} from 'zod'
import {fa} from "@faker-js/faker";

const medicamentoObject = z.object({
    positivo: z
        .boolean()
        .nullable(),
    dosis: z
        .number()
        .positive()
        .nullable()
})

const alergiaObject = z.boolean().nullable()

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
            positivo: null,
            dosis: null,
        },
        analgesicos: {
            positivo: null,
            dosis: null,
        },
        esteroides: {
            positivo: null,
            dosis: null,
        },
        antidepresivos: {
            positivo: null,
            dosis: null,
        },
        anticonceptivos: {
            positivo: null,
            dosis: null,
        },
        hipogicemiante: {
            positivo: null,
            dosis: null,
        },
        anticonvulsivos: {
            positivo: null,
            dosis: null,
        },
        sildenafil: {
            positivo: null,
            dosis: null,
        },
        acidoacetilicidico: {
            positivo: null,
            dosis: null,
        },
        anticoagulante: {
            positivo: null,
            dosis: null,
        },
        bifosfanato: {
            positivo: null,
            dosis: null,
        },
        otros: {
            positivo: false,
            descripcion: ''
        }
    },
    alergias: {
        antibioticos: null,
        analgesicos: null,
        anestesicos: null,
        yodo: null,
        otros: null,
        descripcion: '',
    },
}

export default AntPersonalesFormSchema
