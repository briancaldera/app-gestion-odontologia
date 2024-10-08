import {z} from 'zod'
import EstudioModelosSchema from "@/FormSchema/Historia/EstudioModelosSchema";
import {b} from "vite/dist/node/types.d-aGj9QkWt";

type HistoriaOdontologica = {
    historia_id: string
    ant_personales: string
    habitos: Habitos
    portador: Portador
    examen_fisico: ExamenFisico
    estudio_modelos: z.infer<typeof EstudioModelosSchema>
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

type HistoriaPeriodontal = {
    higiene_bucal: {
        frecuencia_cepillado: string | null
        tipo_cepillo: 'D' | 'M' | 'S' | null
        metodo_cepillado: 'H' | 'V' | 'C' | 'O' | null
        metodo_auxiliar: {
            hilo_dental: boolean
            enjuague_bucal: boolean
            hidroterapia: boolean
            cepillo_interdental: boolean
        },
        sustancia_reveladora: {
            descripcion: string | null
            otro: string | null
        }
        cepillado_lengua: boolean
    }
    control_higiene_bucal: {
        tecnica_cepillado_ensenada: string | null
        cepillo_recomendado: string | null
        metodos_auxiliares_requeridos: string | null
        control_halitosis: 'S' | 'N' | 'NR' | null
        tratamiento: string | null
        placa_bacteriana_lengua: boolean
    }
}

export {type HistoriaPeriodontal}
export default HistoriaOdontologica
