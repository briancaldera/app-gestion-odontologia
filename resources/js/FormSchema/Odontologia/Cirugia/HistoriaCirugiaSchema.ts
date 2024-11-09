import {z} from 'zod'

const MAX_TEXT_SIZE: number = 1000

const anamnesisSchema = z.object({
    visita_medico_ultimos_6_meses: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Motivo')
    }).describe('Ha acudido al médico en los últimos 6 meses?'),
    bajo_tratamiento_actual: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Especifique')
    }).describe('Esta bajo tratamiento médico actualmente?'),
    alergia_medicamento: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Especifique')
    }).describe('Es alérgico a algún medicamento?'),
    hospitalizado_alguna_vez: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Motivo')
    }).describe('Ha estado hospitalizado alguna vez?'),
    enfermedad_sistemica: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Especifique')
    }).describe('Sufre de alguna enfermedad sistémica?'),
    odontologo_ultimos_6_meses: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE)
    }).describe('Ha acudido al odontólogo en los últimos 6 meses?'),
    dolor_ATM_levantarse: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE)
    }).describe('Sufre de dolor en la ATM al levantarse?'),
    limitaciones_apertura_cierre_bucal: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE)
    }).describe('Ha tenido limitaciones en la apertura o cierre de la boca?'),
    rechina_aprieta_dientes: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Frecuencia')
    }).describe('Rechina o aprieta los dientes?'),
    sangrado_al_cepillar: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Frecuencia')
    }).describe('Le sangran las encias al cepillarse?'),
    miccion_nocturna: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Frecuencia')
    }).describe('Se levanta usted de noche a orinar?'),
    apetito_excesivo: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Frecuencia')
    }).describe('Padece usted de apetito exagerado?'),
    depresion: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Frecuencia')
    }).describe('Sufre usted de estados depresivos frecuentes?'),
    agitacion: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Frecuencia')
    }).describe('Se altera con facilidad?'),
    migrana: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Frecuencia')
    }).describe('Sufre usted de dolores de cabeza frecuentes?'),
    dieta_especial: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Razón')
    }).describe('Tiene usted alguna dieta especial?'),
    alergia_enlatados: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Desde cuándo?')
    }).describe('Es alérgico a los alimentos enlatados?'),
    reaccion_anestesia: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Descripción')
    }).describe('Ha reaccionado desfavorablemente a la anestesia anteriormente?'),
    diente_dolor: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Cuál?')
    }).describe('Le molesta algún diente actualmente?'),
    dificultad_cicatrizacion: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Desde cuándo?')
    }).describe('Tiene dificultad para cicatrizar las heridas?'),
    reaccion_medicamento: z.object({
        list: z.array(z.string()),
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Descripción')
    }).describe('Ha reaccionado desfavorablemente a alguno de los siguientes medicamentos?'),
    alergia_yodo: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Desde cuándo?')
    }).describe('Es alérgico al yodo?'),
    enfermedades: z.object({
        list: z.array(z.string()),
        otros: z.string().max(MAX_TEXT_SIZE).describe('Otros')
    }).describe('Ha padecido o padece actualmente alguna de las siguientes enfermedades?'),
})

type ListItem = {
    id: string
    label: string
}

type ReaccionMedicamentoItem = ListItem

const reaccionMedicamentoItems: readonly ReaccionMedicamentoItem[] = [
    {id: "no_esteroideos", label: "Analgésicos no esteroideos"},
    {id: "antibiotico", label: "Antibióticos"},
    {id: "aspirina", label: "Aspirina"},
    {id: "otros", label: "Otros"},
]

type EnfermedadItem = ListItem

const enfermedadItems: readonly EnfermedadItem[] = [
    {id: 'diabetes', label: 'Diabetes'},
    {id: 'hepatitis_abc', label: 'Hepatitis A-B-C'},
    {id: 'artritis', label: 'Artritis'},
    {id: 'asma_EPOC', label: 'Asma/EPOC'},
    {id: 'anemia', label: 'Anemia'},
    {id: 'infarto', label: 'Infarto'},
    {id: "enfermedades_pulmonares", label: "Enfermedades pulmonares"},
    {id: 'hipertiroidismo', label: 'Hipertiroidismo'},
    {id: 'hipotiroidismo', label: 'Hipotiroidismo'},
    {id: 'convulsiones_desmayos', label: 'Convulsiones/Desmayos'},
    {id: 'hipertension', label: 'Hipertensión'},
    {id: 'hipotension', label: 'Hipotensión'},
    {id: 'sinusitis', label: 'Sinusitis'},
    {id: 'angina_pecho', label: 'Angina de pecho'},
    {id: 'fiebre_reumatica', label: 'Fiebre reumática'},
    {id: 'gastritis', label: 'Gastritis'},
    {id: 'ulcera_gastrica', label: 'Úlcera gástrica'},
    {id: 'enf_transmision_sexual', label: 'Enfermedades de transmisión sexual'},
    {id: 'arterioesclerosis', label: 'Arterioesclerosis'},
    {id: 'alt_metabolicas', label: 'Alteraciones metabólicas'},
    {id: 'enf_endocrinas', label: 'Enfermedades endocrinas'},
    {id: 'otros', label: 'Otros'},
]

const habitosSchema = z.object({
    muerde_unas_labios: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Frecuencia')
    }).describe('Se muerde usted las uñas o los labios?'),
    cigarrillo_tabaco: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Frecuencia')
    }).describe('Fuma cigarrillos o tabaco?'),
    rechina_aprieta_dientes: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Frecuencia')
    }).describe('Rechina o aprieta los dientes?'),
    morder_objetos: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Frecuencia')
    }).describe('Muerde objetos con los dientes?'),
    consumir_carbo_azucares: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Descripción')
    }).describe('Consume alimentos con carbohidratos y azucares con frecuencia?'),
}).describe('Hábitos')

const femeninoSchema = z.object({
    ginecologo_ultimos_6_meses: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Motivo')
    }).describe('Ha acudido al ginecólogo en los últimos 6 meses?'),
    embarazo: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Semanas de gestación')
    }).describe('Está usted embarazada?'),
    menstruacion_regular: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Duración')
    }).describe('Es usted regular en su menstruación?'),
    menstruacion_dolorosa: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Conoce el motivo?')
    }).describe('Sufre usted de dolores severos durante su menstruación?'),
    menopausia: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Desde cuándo?')
    }).describe('Ha llegado usted a la menopausia?'),
    anticonceptivos: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Desde cuándo?')
    }).describe('Toma usted pastillas anticonceptivas o usa algún método anticonceptivo?'),
})

const antecedentesSchema = z.object({
    ant_personales: z.string().max(MAX_TEXT_SIZE).describe('Resumen antecedentes personales'),
    ant_familiares_enfermedades: z.array(z.string()).refine(items => items.every(item => enfermedadItems.some(enfermedad => enfermedad.id === item))).describe('Tiene conocimiento de si algún familiar ha padecido o padece actualmente alguna de las siguientes enfermedades?'),
    ant_familiares: z.string().max(MAX_TEXT_SIZE).describe('Resumen antecedentes familiares'),
})

const examenFisicoSchema = z.object({
    extraoral: z.object({
        piel: z.string().max(MAX_TEXT_SIZE).describe('Piel'),
        ojos: z.string().max(MAX_TEXT_SIZE).describe('Ojos'),
        labios: z.string().max(MAX_TEXT_SIZE).describe('Labios'),
        cuello: z.string().max(MAX_TEXT_SIZE).describe('Cuello'),
        orejas: z.string().max(MAX_TEXT_SIZE).describe('Orejas'),
        cuero_cabelludo: z.string().max(MAX_TEXT_SIZE).describe('Cuero cabelludo'),
        otros: z.string().max(MAX_TEXT_SIZE).describe('Otros')
    }),
    intraoral: z.object({
        carrillos: z.string().max(MAX_TEXT_SIZE).describe('Carrillos'),
        lengua: z.string().max(MAX_TEXT_SIZE).describe('Lengua'),
        encias: z.string().max(MAX_TEXT_SIZE).describe('Encías'),
        piso_boca: z.string().max(MAX_TEXT_SIZE).describe('Piso de boca'),
        paladar_duro: z.string().max(MAX_TEXT_SIZE).describe('Paladar duro'),
        paladar_blando: z.string().max(MAX_TEXT_SIZE).describe('Paladar blando'),
        frenillos: z.string().max(MAX_TEXT_SIZE).describe('Frenillos'),
        otros: z.string().max(MAX_TEXT_SIZE).describe('Otros'),
    })
})

const observacionesSchema = z.string().max(MAX_TEXT_SIZE).describe('Observaciones')

const estudiosRadiograficosSchema = z.object({
    panoramica: z.string().max(MAX_TEXT_SIZE).describe('Panorámica'),
    periapical: z.string().max(MAX_TEXT_SIZE).describe('Periapical'),
    tension: z.object({
        sistole: z.string().max(MAX_TEXT_SIZE).describe('Sistólica'),
        diastole: z.string().max(MAX_TEXT_SIZE).describe('Diastólica'),
        PPM: z.string().max(MAX_TEXT_SIZE).describe('PPM'),
    }).describe('Registro de Tensión Arterial'),
    exam_comp: z.string().max(MAX_TEXT_SIZE).describe('Exámenes complementarios'),
    diagnostico: z.string().max(MAX_TEXT_SIZE).describe('Diagnóstico'),
    plan_tratamiento: z.string().max(MAX_TEXT_SIZE).describe('Plan de tratamiento'),
})

const MAX_PICTURE_SIZE: number = 10 * 1000 * 1000 // 10 MB
const MIN_PICTURE_SIZE: number = 1000 // 1 KB
const ACCEPTED_PICTURE_MIME: readonly string[] = ['image/jpeg', 'image/jpg', 'image/png']

const consentimientoSchema = z
    .any()
    .refine((data: any) => data instanceof File)
    .refine((file: File) => ACCEPTED_PICTURE_MIME.includes(file?.type), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
    .refine((file: File) => file.size >= MIN_PICTURE_SIZE, {message: 'Archivo muy pequeño'})
    .refine((file: File) => file?.size <= MAX_PICTURE_SIZE, {message: 'Archivo muy grande'})

export {
    enfermedadItems,
    anamnesisSchema,
    femeninoSchema,
    antecedentesSchema,
    examenFisicoSchema,
    observacionesSchema,
    estudiosRadiograficosSchema,
    habitosSchema,
    reaccionMedicamentoItems,
    consentimientoSchema
}
