import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import HistoriaOdontologicaSchema from "@/FormSchema/Historia/HistoriaOdontologicaSchema";
import {useRoute} from "ziggy-js";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import React from "react";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {mapServerErrorsToFields} from "@/src/Utils/Utils";
import ConsetimientoMedico from "@/Components/organisms/historia/partials/ConsetimientoMedico.tsx";
import AntecedentesOdontologicosPersonales
    from "@/Components/organisms/historia/partials/AntecedentesOdontologicosPersonales.tsx";
import ExamenFisico from "@/Components/organisms/historia/partials/ExamenFisico.tsx";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import CorrectionsBlock from "@/src/corrections/CorrectionsBlock.tsx";

type HistoriaOdontologicaSectionProps = {
    form: UseFormReturn<z.infer<typeof HistoriaOdontologicaSchema>>
}

const HistoriaOdontologicaSection = ({form}: HistoriaOdontologicaSectionProps) => {

    const {historia, homework, canCreateCorrections, correctionsModel} = React.useContext(HistoriaEditorContext)

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

            <Title level={'title-lg'}>Historia Odontológica</Title>


            <CorrectionsBlock model={correctionsModel} name={'ant_odon_personales'}
                              canCreateCorrections={canCreateCorrections}>
                <AntecedentesOdontologicosPersonales/>
            </CorrectionsBlock>

            <CorrectionsBlock model={correctionsModel} name={'consentimiento'}
                              canCreateCorrections={canCreateCorrections}>
                <ConsetimientoMedico/>
            </CorrectionsBlock>

            <CorrectionsBlock model={correctionsModel} name={'examen_fisico'}
                              canCreateCorrections={canCreateCorrections}>
                <ExamenFisico/>
            </CorrectionsBlock>

        </Surface>);
}

export default HistoriaOdontologicaSection
