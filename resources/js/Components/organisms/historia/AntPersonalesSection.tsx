import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import AntPersonalesSchema from "@/FormSchema/Historia/AntPersonalesSchema";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import React from "react";
import CorrectionsBlock from "@/src/corrections/CorrectionsBlock.tsx";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import TrastornosForm from "@/Components/organisms/historia/partials/TrastornosForm.tsx";
import AlergiasYMedicamentosForm from "@/Components/organisms/historia/partials/AlergiasYMedicamentosForm.tsx";

type AntecedentesMedicosPersonalesSectionProps = {
    form: UseFormReturn<z.infer<typeof AntPersonalesSchema>>
}

const AntecedentesMedicosPersonalesSection = ({form}: AntecedentesMedicosPersonalesSectionProps) => {

    const {historia, homework, canCreateCorrections, correctionsModel} = React.useContext(HistoriaEditorContext)

    return (

        <Surface className={'w-full px-6 min-h-screen'}>

            <Title level={'title-lg'}>Antecedentes Médicos Personales</Title>

            <CorrectionsBlock model={correctionsModel} name={'trastornos'} canCreateCorrections={canCreateCorrections}>
                <TrastornosForm/>
            </CorrectionsBlock>

            <CorrectionsBlock model={correctionsModel} name={'alergias'} canCreateCorrections={canCreateCorrections}>
                <AlergiasYMedicamentosForm/>
            </CorrectionsBlock>
        </Surface>
    )
}

export default AntecedentesMedicosPersonalesSection
