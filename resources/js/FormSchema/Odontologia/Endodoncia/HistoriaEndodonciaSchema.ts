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
    alergia_material_dental: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Especifique')
    }).describe('Es alérgico a algún material dental?'),
    hospitalizado_alguna_vez: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Motivo')
    }).describe('Ha estado hospitalizado alguna vez?'),
    odontologo_ultimos_6_meses: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE)
    }).describe('Ha acudido al odontólogo en los últimos 6 meses?'),
    sangrado_al_cepillar: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Descripción')
    }).describe('Le sangran las encias al cepillarse?'),
    abultamiento_diente: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('¿Desde cuándo?')
    }).describe('Ha notado algún abultamiento por encima del diente que le causa molestia?'),
    rechina_aprieta_dientes: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Frecuencia')
    }).describe('Rechina o aprieta los dientes?'),
    dolor_CATM: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Frecuencia')
    }).describe('Sufre de dolor en el CATM?'),
    sangrado_excesivo_corte: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Duración')
    }).describe('Cuando se corta accidentalmente, suele sangrar mucho?'),
    dificultad_cicatrizacion: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Duración')
    }).describe('Tiene dificultad para cicatrizar las heridas?'),
    cigarrillo_tabaco: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Frecuencia')
    }).describe('Fuma cigarrillos o tabaco?'),
    alergia_alimento: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Descripción')
    }).describe('Es alérgico a algún medicamento?'),
    alergia_enlatados: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Descripción')
    }).describe('Es alérgico a los enlatados?'),
    alergia_yodo: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Descripción')
    }).describe('Es alérgico al yodo?'),
    reaccion_anestesia: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Descripción')
    }).describe('Ha reaccionado desfavorablemente a la anestesia anteriormente?'),
    embarazo: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('Semanas de gestación')
    }).describe('Está usted embarazada?'),
    enfermedades: z.object({
        list: z.array(z.string()),
        resumen_ant_personales: z.string().max(MAX_TEXT_SIZE).describe('Resumen de antecedentes personales')
    }).describe('Ha padecido usted o padece actualmente alguna de las siguientes enfermedades?'),
    enfermedades_familiares: z.object({
        resumen_ant_familiares: z.string().max(MAX_TEXT_SIZE).describe('Resumen de antecedentes familiares'),
        examen_comp: z.string().max(MAX_TEXT_SIZE).describe('Exámenes complementarios'),
    }).describe('Algún familiar padeció o padece alguna enfermedad anteriormente mencionada?')
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
    {id: 'hepatitis_cirrosis', label: 'Hepatitis o Cirrosis'},
    {id: 'insuficiencia_renal', label: 'Insuficiencia renal'},
    {id: 'hipertiroidismo', label: 'Hipertiroidismo'},
    {id: 'hipotiroidismo', label: 'Hipotiroidismo'},
    {id: 'convulsiones_desmayos', label: 'Convulsiones/desmayos'},
    {id: 'enf_transmision_sexual', label: 'Enfermedades de transmisión sexual'},
    {id: 'asma', label: 'Asma'},
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

type FrecuenciaItem = ListItem

const frecuenciaDolorItems: FrecuenciaItem[] = [
    {id: "constante", label: "Constante"},
    {id: "intermitente", label: "Intermitente"},
    {id: "momentaneo", label: "Momentáneo"},
    {id: "ocasional", label: "Ocasional"},
    {id: " ", label: "-"},
] satisfies FrecuenciaItem[]

type CalidadItem = ListItem

const calidadDolorItems: CalidadItem[] = [
    {id: "agudo", label: "Agudo"},
    {id: "sordo", label: "Sordo"},
    {id: "pulsatil", label: "Pulsátil"},
    {id: " ", label: "-"},
] satisfies CalidadItem[]

type Sensibilidad = ListItem

const sensibilidadDolorItems: Sensibilidad[] = [
    {id: "calor", label: "Calor"},
    {id: "frio", label: "Frío"},
    {id: "dulces", label: "Dulces"},
] satisfies Sensibilidad[]

const evaluacionDolorSchema = z.object({
    dolor_presente: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE)
    }).describe('Presenta dolor ahora mismo?'),
    diente_dolor: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE).describe('U.D')
    }).describe('Podría señalar que diente le causa dolor?'),
    primeros_sintomas: z.string().max(MAX_TEXT_SIZE).describe('Cuándo notó los primeros síntomas?'),
    aparicion_sintomas: z.string().max(MAX_TEXT_SIZE).describe('Los síntomas aparecieron de forma súbita o gradual?'),
    intensidad_frecuencia_calidad_dolor: z.object({
        "intensidad": z.coerce.number().min(0).max(10).describe('Nivel de intensidad (1 leve, 5 moderado, 10 intenso)'),
        "frecuencia": z.enum(frecuenciaDolorItems.map(item => item.id)).describe('Frecuencia'),
        "calidad": z.enum(calidadDolorItems.map(item => item.id)).describe('Calidad')
    }).describe('Intensidad, frecuencia y calidad del dolor'),
    alivio_dolor: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE)
    }).describe('Hay algo que alivie el dolor?'),
    farmaco_alivio_dolor: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE)
    }).describe('Ha ingerido algún fármaco para aliviar el dolor?'),
    agravo_dolor: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE)
    }).describe('Hay algo que agrave el dolor?'),
    diente_sensible_al_comer: z.array(z.string()).describe('Al comer o beber algo, el diente es sensible a:'),
    dolor_al_masticar: z.object({
        status: z.enum(['S', 'N', 'D']),
        description: z.string().max(MAX_TEXT_SIZE)
    }).describe('Le duele al morder o masticar alimentos?'),
    dolor_momento_dia: z.string().max(MAX_TEXT_SIZE).describe('En qué momento del día siente más dolor?'),
})

export {anamnesisSchema, evaluacionDolorSchema, consentimientoSchema, sensibilidadDolorItems, frecuenciaDolorItems, calidadDolorItems, enfermedadesItems}
