import {z} from "zod"
import {UseFormReturn} from 'react-hook-form'
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import EstudioModelosSchema from "@/FormSchema/Historia/EstudioModelosSchema";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {useRoute} from "ziggy-js";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import MaxSupInfOcluForm from "@/Components/organisms/historia/partials/MaxSupInfOcluForm.tsx";
import EstudioModelosParte2 from "@/Components/organisms/historia/partials/EstudioModelosParte2.tsx";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import React from "react";
import CorrectionsBlock from "@/src/corrections/CorrectionsBlock.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";


type EstudioModelosSectionProps = {
    form: UseFormReturn<z.infer<typeof EstudioModelosSchema>>
}

const EstudioModelosSection = ({form}: EstudioModelosSectionProps) => {

    const {historia, homework, canCreateCorrections, correctionsModel} = React.useContext(HistoriaEditorContext)

    const {isProcessing, router}: ReturnType<typeof useInertiaSubmit> = useInertiaSubmit()
    const route = useRoute()

    const onHandleSubmit = (values) => {

        const endpoint: string = route('historias.odontologica.modelos.update', {
            historia: values.historia_id
        })

        router.patch(endpoint, values, {
            preserveScroll: true,
            onError: errors => mapServerErrorsToFields(form, errors),
            onSuccess: _page => {
                form.reset(values)
            }
        })
    }

    return (
        <ScrollArea className={'bg-white w-full p-6 h-[83vh]'}>
            <Title level={'title-lg'}>Estudio de Modelos</Title>

            <CorrectionsBlock model={correctionsModel} name={'maxsupinfoclu'}
                              canCreateCorrections={canCreateCorrections}>
                <MaxSupInfOcluForm/>
            </CorrectionsBlock>

            <CorrectionsBlock model={correctionsModel} name={'diagnostico'} canCreateCorrections={canCreateCorrections}>
                <EstudioModelosParte2/>
            </CorrectionsBlock>
        </ScrollArea>
    )
}

export default EstudioModelosSection
