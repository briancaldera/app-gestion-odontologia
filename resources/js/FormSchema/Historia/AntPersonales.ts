import {z} from 'zod'

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
        otros: z.object({
            positivo: z.boolean(),
            descripcion: z.string().max(255)
        })
    })
})

export default AntPersonalesFormSchema
