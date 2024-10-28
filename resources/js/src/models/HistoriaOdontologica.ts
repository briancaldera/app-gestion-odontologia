import {z} from 'zod'
import {estudioModelosSchema} from "@/FormSchema/Historia/EstudioModelosSchema";
import {historiaPeriodontalSchema} from "@/FormSchema/Historia/HistoriaPeriodontalSchema.ts";
import {DentalPlaqueChartModel} from "@/src/DentalPlaqueChartModel.ts";

type HistoriaOdontologica = {
    historia_id: string
    ant_personales: string
    habitos: Habitos
    portador: Portador
    consentimiento: string | null
    examen_fisico: ExamenFisico
    estudio_modelos: z.infer<typeof estudioModelosSchema>
    plan_tratamiento: Tratamiento[]
    modificaciones_plan_tratamiento: ModificacionTratamiento[]
    secuencia_tratamiento: TratamientoRealizado[]
    examen_radiografico: ExamenRadiografico
    periodontodiagrama: readonly string[]
    historia_periodontal: HistoriaPeriodontal
    panoramicas: readonly string[]
    coronales: readonly string[]
    periapicales: readonly string[]
    anymedia: readonly string[]
}

type Portador = {
    ortodoncia: boolean
    protesis: boolean
}

type Tratamiento = {
    cavidad: string
    diente: string
    tratamiento: string
}

type ModificacionTratamiento = {
    diente: string
    fecha: string
    tratamiento: string
}

type TratamientoRealizado = {
    diente: string
    fecha: string
    tratamiento: string
}

const examen_fisico = {
    examen_extraoral: {
        articulacion_temporomandibular: "",
        cabeza: "",
        cara: "",
        lesiones_extraorales: "",
        palpacion_ganglios: "",
        piel: "",
        simetria_facial: ""
    },
    examen_intraoral: {
        dientes: "",
        discromias: "",
        encias: "",
        frenillos: "",
        labios: "",
        lengua_tipo: "",
        maxilares: "",
        mejillas: "",
        paladar_duro_blando: "",
        piso_boca: ""
    },
    signos_vitales: {
        pulso: 0,
        respiracion: 0,
        temperatura: 0,
        tension_arterial: {
            diastole: 0,
            sistole: 0
        }
    }
}

type ExamenFisico = typeof examen_fisico

const habitos = {
    alcohol: false,
    bruxismo: false,
    bruxomania: false,
    deglusion_atip: false,
    descripcion: "",
    drogas: false,
    fumar: false,
    onicofagia: false,
    otros: false,
    palillos: false,
    queilofagia: false,
    respirador_bucal: false,
    succion_digital: false
}

type Habitos = typeof habitos

type ExamenRadiografico = {
    interpretacion_panoramica: {
        nasomaxilar: string | null
        ATM: string | null
        mandibular: string | null
        dento_alveolar_sup: string | null
        dento_alveolar_inf: string | null
    }
    interpretacion_periapicales: string | null
    interpretacion_coronales: string | null
}

type ControlPlaca = {
    fecha: string
    modelo: DentalPlaqueChartModel
}

type HistoriaPeriodontal = z.infer<typeof historiaPeriodontalSchema> & {
    readonly control_placa: ControlPlaca[]
}


export {type HistoriaPeriodontal}
export default HistoriaOdontologica
