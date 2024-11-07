import React from "react";
import {HistoriaCirugiaEditorContext} from "@/Components/organisms/historia-cirugia/HistoriaCirugiaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {z} from "zod";
import {examenFisicoSchema, observacionesSchema} from "@/FormSchema/Odontologia/Cirugia/HistoriaCirugiaSchema.ts";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Input} from "@/shadcn/ui/input.tsx";
import {Button} from "@/shadcn/ui/button.tsx";

const ExamenFisicoForm = () => {

    const {historia} = React.useContext(HistoriaCirugiaEditorContext)

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing

    const {examen_fisico, observaciones} = historia!

    const sectionForm = useForm<z.infer<typeof sectionSchema>>({
        resolver: zodResolver(sectionSchema),
        defaultValues: {
            observaciones: observaciones ?? "",
            examen_fisico: {
                extraoral: {
                    cuello: examen_fisico.extraoral.cuello ?? "",
                    cuero_cabelludo: examen_fisico.extraoral.cuero_cabelludo ?? "",
                    labios: examen_fisico.extraoral.labios ?? "",
                    ojos: examen_fisico.extraoral.ojos ?? "",
                    orejas: examen_fisico.extraoral.orejas ?? "",
                    otros: examen_fisico.extraoral.otros ?? "",
                    piel: examen_fisico.extraoral.piel ?? "",
                },
                intraoral: {
                    carrillos: examen_fisico.intraoral.carrillos ?? "",
                    encias: examen_fisico.intraoral.encias ?? "",
                    frenillos: examen_fisico.intraoral.frenillos ?? "",
                    lengua: examen_fisico.intraoral.lengua ?? "",
                    otros: examen_fisico.intraoral.otros ?? "",
                    paladar_blando: examen_fisico.intraoral.paladar_blando ?? "",
                    paladar_duro: examen_fisico.intraoral.paladar_duro ?? "",
                    piso_boca: examen_fisico.intraoral.piso_boca ?? "",
                }
            },
        },
        disabled: isDisabled
    })

    const handleSubmit = (values: z.infer<typeof sectionSchema>) => {

        const endpoint = route('cirugia.historias.update', {
            historia: historia!.id
        })

        const body = {
            ...values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(sectionForm, errors)
            },
            onSuccess: _page => {
                sectionForm.reset(values)
            }
        })
    }

    return (
        <div>
            <Title level={'title-lg'}>Examen físico</Title>

            <Form {...sectionForm}>
                <form onSubmit={sectionForm.handleSubmit(handleSubmit)}
                      className={'grid grid-cols-1 sm:grid-cols-2 gap-6'}>

                    <FormField render={({field}) => (
                        <FormItem className={'col-span-full'}>
                            <FormLabel>{sectionSchema.shape.observaciones.description}</FormLabel>
                            <FormControl>
                                <Textarea {...field} className={'max-h-48'}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'observaciones'} control={sectionForm.control}/>


                    <Title level={'title-lg'} className={'col-span-full'}>Examen extraoral</Title>
                    {
                        Object.keys(sectionSchema.shape.examen_fisico.shape.extraoral.shape).map(item =>
                            <FormField key={item} render={({field}) => (
                                <FormItem>
                                    <FormLabel>{sectionSchema.shape.examen_fisico.shape.extraoral.shape[item].description}</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={`examen_fisico.extraoral.${item}`} control={sectionForm.control}/>
                        )
                    }

                    <Title className={'col-span-full'} level={'title-lg'}>Examen intraoral</Title>
                    {
                        Object.keys(sectionSchema.shape.examen_fisico.shape.intraoral.shape).map(item =>
                            <FormField key={item} render={({field}) => (
                                <FormItem>
                                    <FormLabel>{sectionSchema.shape.examen_fisico.shape.intraoral.shape[item].description}</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={`examen_fisico.intraoral.${item}`} control={sectionForm.control}/>
                        )
                    }

                    <div className={'col-span-full flex justify-end'}>
                        <Button type='submit'>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

const sectionSchema = z.object({
    examen_fisico: examenFisicoSchema,
    observaciones: observacionesSchema,
})

export default ExamenFisicoForm
