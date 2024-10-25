import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import HistoriaOdontologicaSchema from "@/FormSchema/Historia/HistoriaOdontologicaSchema";
import {useRoute} from "ziggy-js";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import React from "react";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {mapServerErrorsToFields} from "@/src/Utils/Utils";
import ConsetimientoMedico from "@/Components/organisms/historia/components/ConsetimientoMedico.tsx";
import AntecedentesOdontologicosPersonales
    from "@/Components/organisms/historia/components/AntecedentesOdontologicosPersonales.tsx";
import ExamenFisico from "@/Components/organisms/historia/components/ExamenFisico.tsx";

type HistoriaOdontologicaSectionProps = {
    form: UseFormReturn<z.infer<typeof HistoriaOdontologicaSchema>>
}

const HistoriaOdontologicaSection = ({form}: HistoriaOdontologicaSectionProps) => {

    const route = useRoute()
    const {isProcessing, router} = useInertiaSubmit()

    const handleSubmit = (values: z.infer<typeof HistoriaOdontologicaSchema>) => {

        const endpoint = route('historias.odontologica.update', {
            historia: values.historia_id
        })

        router.patch(endpoint, {...values}, {
            onError: errors => {
                mapServerErrorsToFields(form, errors)
            }, onSuccess: _page => form.reset(values)
        })
    }


    return (

        <Surface className={'w-full px-6 min-h-screen'}>

            <Title level={'title-lg'}>Historia Odontologica</Title>

            <AntecedentesOdontologicosPersonales/>

            <ConsetimientoMedico/>

            <ExamenFisico/>

        </Surface>);
}

export default HistoriaOdontologicaSection
