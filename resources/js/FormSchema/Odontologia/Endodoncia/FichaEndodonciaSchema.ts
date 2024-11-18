import {z} from 'zod'

const MAX_TEXT_SIZE: number = 1000

type ListItem = {
    id: string
    label: string
}

type EtiologiaItem = ListItem

const etiologiaItems: readonly EtiologiaItem[] = [
    {id: "caries", label: "Caries"},
    {id: "traumatismo", label: "Traumatismo"},
    {id: "abrasion", label: "Abrasión"},
    {id: "rest_profunda", label: "Restauración profunda"},
    {id: "recidiva_caries", label: "Recidiva de caries"},
    {id: "otros", label: "Otras"},
]

type ExamenTejidoPeriodontal = ListItem

const examenTejidoPeriodontalItems: ExamenTejidoPeriodontal[] = [
    {id: "palpacion", label: "Palpación"},
    {id: "percusion", label: "Percusión"},
    {id: "sondaje", label: "Sondaje"},
    {id: "grado_movilidad", label: "Grado de movilidad"},
]

type PruebaVitalidadPulpar = ListItem

const pruebaVitalidadPulparItems: PruebaVitalidadPulpar[] = [
    {id: "electrica", label: "Eléctrica"},
    {id: "termica", label: "Térmica"},
    {id: "cavitaria", label: "Cavitaria"},
]

type MorfologiaConducto = ListItem

const morfologiaConductoItems: MorfologiaConducto[] = [
    {id: "conducto_abierto", label: "Conducto normal"},
    {id: "foramen_abierto", label: "Foramen abierto"},
    {id: "foramen_cerrado", label: "Foramen cerrado"},
    {id: "calcificacion", label: "Calcificación"},
    {id: "anomalias", label: "Anomalías del conducto"},
]

type TratamientoConducto = ListItem

const tratamientoConductoItems: TratamientoConducto[] = [
    {id: "biopulpectomia", label: "Biopulpectomía"},
    {id: "necropulpectomia", label: "Necropulpectomía"},
    {id: "retratamiento", label: "Retratamiento"},
    {id: "induccion_cierre_apical", label: "Inducción de cierre apical"},
    {id: "apiceptomia", label: "Apiceptomía"},
]

type MetodoObturacion = ListItem

const metodoObturacionItems: MetodoObturacion[] = [
    {id: "cond_lateral", label: "Condensación lateral"},
    {id: "cond_vertical", label: "Condensación vertical"},
    {id: "mixta", label: "Mixta"},
    {id: "otros", label: "Otros"},
]

const fichaEndodonticaSchema = z.object({
    diente: z.string().max(MAX_TEXT_SIZE).describe('Diente'),
    sintomas: z.string().max(MAX_TEXT_SIZE).describe('Síntomas'),
    signos: z.string().max(MAX_TEXT_SIZE).describe('Signos'),
    interpretacion_radiografica: z.string().max(MAX_TEXT_SIZE).describe('Interpretación radiográfica'),
    etiologia: z.array(z.string()).describe('Etiología'),
    pruebas_diagnosticas: z.object({
        examen_tejidos_periodontales: z.array(z.string()).describe('Exámen de tejidos periodontales'),
        pruebas_vitalidad_pulpar: z.array(z.string()).describe('Pruebas de vitalidad pulpar'),
        diagnostico_presuntivo: z.string().max(MAX_TEXT_SIZE).describe('Diagnóstico presuntivo'),
        diagnostico_definitivo: z.string().max(MAX_TEXT_SIZE).describe('Diagnóstico definitivo'),
        morfologia_conducto: z.array(z.string()).describe('Morfología del conducto'),
        tratamiento_conducto: z.array(z.string()).describe('Tratamiento del conducto'),
        metodos_obturacion: z.array(z.string()).describe('Métodos de obturación'),
        tecnica_preparacion_biomecanica: z.string().max(MAX_TEXT_SIZE).describe('Técnica de preparación biomecánica'),
        preparacion_quimica: z.string().max(MAX_TEXT_SIZE).describe('Preparación química'),
        numero_lima: z.string().max(MAX_TEXT_SIZE).describe('Número de la última lima utilizada'),
        material_obturacion: z.string().max(MAX_TEXT_SIZE).describe('Material de obturación'),
        medicacion_justificacion: z.string().max(MAX_TEXT_SIZE).describe('Medicación y justificación de la medicación'),
        observaciones: z.string().max(MAX_TEXT_SIZE).describe('Observaciones'),
    })
})

const radiografiaSchema = z.object({
    conducto_unico: z.string().max(MAX_TEXT_SIZE).describe('Conducto único'),
    vestibular: z.string().max(MAX_TEXT_SIZE).describe('Vestibular'),
    palatino: z.string().max(MAX_TEXT_SIZE).describe('Palatino'),
    mesio_vestibular: z.string().max(MAX_TEXT_SIZE).describe('Mesio vestibular'),
    mesio_lingual: z.string().max(MAX_TEXT_SIZE).describe('Mesio lingual'),
    distal: z.string().max(MAX_TEXT_SIZE).describe('Distal'),
    disto_vestibular: z.string().max(MAX_TEXT_SIZE).describe('Disto vestibular'),
    disto_lingual: z.string().max(MAX_TEXT_SIZE).describe('Disto lingual'),
})

const radiografiasTratamientoSchema = z.object({
    conductometria: radiografiaSchema,
    cono_patron: radiografiaSchema
})

export {fichaEndodonticaSchema, radiografiasTratamientoSchema, etiologiaItems, examenTejidoPeriodontalItems, pruebaVitalidadPulparItems, morfologiaConductoItems, tratamientoConductoItems, metodoObturacionItems}
