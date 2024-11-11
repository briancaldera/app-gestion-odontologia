import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import AntPersonalesSchema from "@/FormSchema/Historia/AntPersonalesSchema";
import {useRoute} from "ziggy-js";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import React from "react";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import CorrectionsBlock from "@/src/corrections/CorrectionsBlock.tsx";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import Trastornos from "@/Components/organisms/historia/partials/Trastornos.tsx";
import AlergiasYMedicamentos from "@/Components/organisms/historia/partials/AlergiasYMedicamentos.tsx";

type AntecedentesMedicosPersonalesSectionProps = {
    form: UseFormReturn<z.infer<typeof AntPersonalesSchema>>
}

const AntecedentesMedicosPersonalesSection = ({form}: AntecedentesMedicosPersonalesSectionProps) => {

    const {historia, homework, canCreateCorrections, correctionsModel} = React.useContext(HistoriaEditorContext)

    return (

        <Surface className={'w-full px-6 min-h-screen'}>

            <Title level={'title-lg'}>Antecedentes Médicos Personales</Title>

            <CorrectionsBlock model={correctionsModel} name={'trastornos'} canCreateCorrections={canCreateCorrections}>
                <Trastornos/>
            </CorrectionsBlock>

            <CorrectionsBlock model={correctionsModel} name={'alergias'} canCreateCorrections={canCreateCorrections}>
                <AlergiasYMedicamentos/>
            </CorrectionsBlock>
        </Surface>
    )
}

export default AntecedentesMedicosPersonalesSection
