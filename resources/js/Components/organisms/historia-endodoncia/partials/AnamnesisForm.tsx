import {HistoriaEndodonciaEditorContext} from "@/Components/organisms/historia-endodoncia/HistoriaEndodonciaEditor.tsx";
import React from "react";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm} from "react-hook-form";
import {z} from 'zod'
import {anamnesisSchema} from "@/FormSchema/Odontologia/Endodoncia/HistoriaEndodonciaSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";

const AnamnesisForm = () => {

    const {historia} = React.useContext(HistoriaEndodonciaEditorContext)

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing

    const {anamnesis} = historia!

    const anamnesisForm = useForm<z.infer<typeof anamnesisSchema>>({
        resolver: zodResolver(anamnesisSchema),
        defaultValues: {
            abultamiento_diente: {
                description: anamnesis!.abultamiento_diente.descripcion ?? '',
                status: anamnesis!.abultamiento_diente.status ?? false
            },
            alergia_alimento: {
                description: anamnesis!.alergia_alimento.descripcion ?? '',
                status: anamnesis!.alergia_alimento.status ?? ''
            },
            alergia_enlatados: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? ''
            },
            alergia_material_dental: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? ''
            },
            alergia_medicamento: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? false
            },
            alergia_yodo: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? ''
            },
            bajo_tratamiento_actual: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? false
            },
            cigarrillo_tabaco: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? false
            },
            dificultad_cicatrizacion: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? false
            },
            dolor_CATM: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? false
            },
            embarazo: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? false
            },
            enfermedades: {
                list: [...anamnesis!.enfermedades.list], resumen_ant_personales: ""
            },
            enfermedades_familiares: {
                examen_comp: anamnesis!.enfermedades_familiares.examen_comp ?? "",
                resumen_ant_familiares: anamnesis!.enfermedades_familiares.resumen_ant_familiares ?? ""
            },
            hospitalizado_alguna_vez: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? false
            },
            odontologo_ultimos_6_meses: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? false
            },
            reaccion_anestesia: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? ''
            },
            rechina_aprieta_dientes: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? false
            },
            sangrado_al_cepillar: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? false
            },
            sangrado_excesivo_corte: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? false
            },
            visita_medico_ultimos_6_meses: {
                description: anamnesis!.alergia_enlatados.descripcion ?? '',
                status: anamnesis!.alergia_enlatados.status ?? false
            }
        },
        disabled: isDisabled
    })

    const handleSubmit = (values: z.infer<typeof anamnesisSchema>) => {
        const endpoint = route('historias.odontologica.update', {
            historia: historia!.id
        })

        const body = {
            ...values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(anamnesisForm, errors)
            },
            onSuccess: _page => {
                anamnesisForm.reset(values)
            }
        })
    }

    return (
        <div>

        </div>
    )
}

export default AnamnesisForm
