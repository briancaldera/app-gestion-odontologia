import {useRoute} from "ziggy-js";
import {z} from "zod";
import ExamenRadiograficoSchema from "@/FormSchema/Historia/ExamenRadiograficoSchema.ts";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import React from "react";
import {UseFormReturn} from "react-hook-form";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import HistoriaOdontologica from "@/src/models/HistoriaOdontologica.ts";
import InterpretacionPanoramica from "@/Components/organisms/historia/partials/InterpretacionPanoramica.tsx";
import InterpretacionPeriapicales from "@/Components/organisms/historia/partials/InterpretacionPeriapicales.tsx";
import InterpretacionCoronales from "@/Components/organisms/historia/partials/InterpretacionCoronales.tsx";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import CorrectionsBlock from "@/src/corrections/CorrectionsBlock.tsx";

type ExamenRadiograficoSectionProps = {
    historiaOdontologica: HistoriaOdontologica
    form: UseFormReturn<z.infer<typeof ExamenRadiograficoSchema>>
}

const ExamenRadiograficoSection = ({historiaOdontologica, form}: ExamenRadiograficoSectionProps) => {

    const route = useRoute()
    const {isProcessing, router} = useInertiaSubmit()

    const {historia, homework, canCreateCorrections, correctionsModel} = React.useContext(HistoriaEditorContext)

    const handleSubmit = (values: z.infer<typeof ExamenRadiograficoSchema>) => {

        const endpoint = route('historias.odontologica.radiografias.update', {
            historia: values.historia_id
        })

        const data = {
            _method: 'patch',
            ...values
        } satisfies z.infer<typeof ExamenRadiograficoSchema> & { _method: 'patch' }

        router.post(endpoint, data, {
            onError: errors => mapServerErrorsToFields(form, errors),
            onSuccess: page => {
                form.reset()
                router.reload()
            }
        })
    }

    // todo clean file
    const handleDropPanoramica = (files: File[]) => {
        if (files.length === 0) return

        const oldImages = form.getValues().interpretacion_panoramica.imagenes

        form.setValue('interpretacion_panoramica.imagenes', [...oldImages, ...files], {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const handleDropCoronales = (files: File[]) => {
        if (files.length === 0) return

        const oldImages = form.getValues().interpretacion_coronales.imagenes

        form.setValue('interpretacion_coronales.imagenes', [...oldImages, ...files], {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const handleDropPeriapicales = (files: File[]) => {
        if (files.length === 0) return

        const oldImages = form.getValues().interpretacion_periapicales.imagenes

        form.setValue('interpretacion_periapicales.imagenes', [...oldImages, ...files], {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    return (
        <Surface className={'w-full px-6 min-h-screen'}>

            <Title level={'title-lg'}>Examen Radiográfico</Title>

            <CorrectionsBlock model={correctionsModel} name={'int_panoramicas'}
                              canCreateCorrections={canCreateCorrections}>
                <InterpretacionPanoramica/>
            </CorrectionsBlock>


            <CorrectionsBlock model={correctionsModel} name={'int_periapicales'}
                              canCreateCorrections={canCreateCorrections}>
                <InterpretacionPeriapicales/>
            </CorrectionsBlock>


            <CorrectionsBlock model={correctionsModel} name={'int_coronales'}
                              canCreateCorrections={canCreateCorrections}>
                <InterpretacionCoronales/>
            </CorrectionsBlock>

        </Surface>
    )
}

export default ExamenRadiograficoSection
