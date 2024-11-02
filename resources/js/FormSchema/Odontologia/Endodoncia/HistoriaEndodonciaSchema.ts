import {z} from 'zod'

const MAX_TEXT_SIZE: number = 1000

const anamnesisSchema = z.object({
    visita_medico_ultimos_6_meses: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    bajo_tratamiento_actual: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    alergia_medicamento: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    alergia_material_dental: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    hospitalizado_alguna_vez: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    odontologo_ultimos_6_meses: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    sangrado_al_cepillar: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    abultamiento_diente: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    rechina_aprieta_dientes: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    dolor_CATM: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    sangrado_excesivo_corte: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    dificultad_cicatrizacion: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    cigarrillo_tabaco: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    alergia_alimento: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    alergia_enlatados: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    alergia_yodo: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    reaccion_anestesia: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    embarazo: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    enfermedades: z.object({
        list: z.array(z.string()),
        resumen_ant_personales: z.string().max(MAX_TEXT_SIZE)
    }),
    enfermedades_familiares: z.object({
        resumen_ant_familiares: z.string().max(MAX_TEXT_SIZE),
        examen_comp: z.string().max(MAX_TEXT_SIZE),
    })
})

type ListItem = {
    id: string
    label: string
}

type Enfermedad = ListItem

const enfermedadesItems: Enfermedad[] = [
    {id: 'hipertension', label: 'Hipertensión arterial'},
    {id: 'angina_pecho', label: 'Angina de pecho'},
    {id: 'fiebre_reumatica', label: 'Fiebre reumática'},
    {id: 'arterioesclerosis', label: 'Arterioesclerosis'},
    {id: 'endocarditis', label: 'Endocarditis'},
    {id: 'infarto_miocardio', label: 'Infarto al miocardio'},
    {id: 'enf_endocrinas', label: 'Enfermedades endocrinas'},
    {id: 'diabetes_mellitus', label: 'Diabetes mellitus'},
    {id: 'hepatitis_abc', label: 'Hepatitis A-B-C'},
    {id: 'cirrosis_hepatica', label: 'Cirrosis Hepática'},
    {id: 'cirrosis_hepatica', label: 'Cirrosis Hepática'},
    {id: 'insuficiencia_renal', label: 'Insuficiencia renal'},
    {id: 'hipertiroidismo', label: 'Hipertiroidismo'},
    {id: 'hipotiroidismo', label: 'Hipotiroidismo'},
    {id: 'convulsiones_desmayos', label: 'Convulsiones/desmayos'},
    {id: 'enf_transmision_sexual', label: 'Enfermedades de transmisión sexual'},
    {id: 'asma', label: 'Asma'},
    {id: 'sinusitis', label: 'Sinusitis'},
    {id: 'sinusitis', label: 'Sinusitis'},
    {id: 'anemia', label: 'Anemia'},
    {id: 'artritis', label: 'Artritis'},
    {id: 'gastritis', label: 'Gastritis'},
    {id: 'ulcera_gastrica', label: 'Úlcera gástrica'},
    {id: 'otros', label: 'Otros'},
] satisfies Enfermedad[]

const MAX_PICTURE_SIZE: number = 10 * 1000 * 1000 // 10 MB
const MIN_PICTURE_SIZE: number = 1000 // 1 KB
const ACCEPTED_PICTURE_MIME: readonly string[] = ['image/jpeg', 'image/jpg', 'image/png']

const consentimientoSchema = z.object({
    consentimiento: z
        .any()
        .refine((data: any) => data instanceof File)
        .refine((file: File) => ACCEPTED_PICTURE_MIME.includes(file?.type), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
        .refine((file: File) => file.size >= MIN_PICTURE_SIZE, {message: 'Archivo muy pequeño'})
        .refine((file: File) => file?.size <= MAX_PICTURE_SIZE, {message: 'Archivo muy grande'})
})

type Sensibilidad = ListItem

const sensibilidadItems: Sensibilidad[] = [
    {id: "calor", label: "Calor"},
    {id: "frio", label: "Frío"},
    {id: "dulces", label: "Dulces"},
] satisfies Sensibilidad[]

const evaluacionDolorSchema = z.object({
    dolor_presente: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    diente_dolor: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    primeros_sintomas: z.string().max(MAX_TEXT_SIZE),
    aparicion_sintomas: z.string().max(MAX_TEXT_SIZE),
    intensidad_frecuencia_calidad_dolor: z.object({
        "intensidad": z.number(),
        "frecuencia": z.enum(['constante', 'intermitente', 'momentaneo', 'ocasional']),
        "calidad": z.enum(['agudo', 'sordo', 'pulsatil'])
    }),
    alivio_dolor: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    farmaco_alivio_dolor: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    agravo_dolor: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    diente_sensible_al_comer: z.array(z.string()),
    dolor_al_masticar: z.object({
        status: z.boolean(),
        description: z.string().max(MAX_TEXT_SIZE)
    }),
    dolor_momento_dia: z.string().max(MAX_TEXT_SIZE),
})

export {anamnesisSchema, evaluacionDolorSchema, consentimientoSchema, sensibilidadItems, enfermedadesItems}
