import React from "react";
import {HistoriaCirugiaEditorContext} from "@/Components/organisms/historia-cirugia/HistoriaCirugiaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import Title from "@/Components/atoms/Title";
import {estudiosRadiograficosSchema, habitosSchema} from "@/FormSchema/Odontologia/Cirugia/HistoriaCirugiaSchema.ts";
import {z} from "zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Input} from "@/shadcn/ui/input.tsx";

const EstudioRadiograficoForm = () => {

    const {historia} = React.useContext(HistoriaCirugiaEditorContext)

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing

    const {estudios_radiograficos} = historia!

    const sectionForm = useForm<z.infer<typeof estudiosRadiograficosSchema>>({
        resolver: zodResolver(estudiosRadiograficosSchema),
        defaultValues: {
            diagnostico: estudios_radiograficos.diagnostico ?? "",
            exam_comp: estudios_radiograficos.exam_comp ?? "",
            panoramica: estudios_radiograficos.panoramica ?? "",
            periapical: estudios_radiograficos.periapical ?? "",
            plan_tratamiento: estudios_radiograficos.plan_tratamiento ?? "",
            tension: {
                PPM: estudios_radiograficos.tension.PPM ?? "",
                diastole: estudios_radiograficos.tension.diastole ?? "",
                sistole: estudios_radiograficos.tension.sistole ?? "",
            }
        },
        disabled: isDisabled
    })

    const handleSubmit = (values: z.infer<typeof estudiosRadiograficosSchema>) => {

        const endpoint = route('cirugia.historias.update', {
            historia: historia!.id
        })

        const body = {
            estudios_radiograficos: values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(sectionForm, errors.estudios_radiograficos as Record<string, string>)
            }, onSuccess: _page => {
                sectionForm.reset(values)
            }
        })
    }


    return (
        <div>
            <Title level={'title-lg'}>{habitosSchema.description}</Title>


            <Form {...sectionForm}>
                <form onSubmit={sectionForm.handleSubmit(handleSubmit)}
                      className={'grid grid-cols-1 sm:grid-cols-2 gap-6'}>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>{estudiosRadiograficosSchema.shape.panoramica.description}</FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'panoramica'} control={sectionForm.control}/>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>{estudiosRadiograficosSchema.shape.periapical.description}</FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'periapical'} control={sectionForm.control}/>

                    <div>
                        <Title>{estudiosRadiograficosSchema.shape.tension.description}</Title>
                        <div className={'flex gap-3'}>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>{estudiosRadiograficosSchema.shape.tension.shape.sistole.description}</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name='tension.sistole' control={sectionForm.control}/>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>{estudiosRadiograficosSchema.shape.tension.shape.diastole.description}</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name='tension.diastole' control={sectionForm.control}/>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>{estudiosRadiograficosSchema.shape.tension.shape.PPM.description}</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name='tension.PPM' control={sectionForm.control}/>
                        </div>
                    </div>

                    <FormField render={({field}) => (
                        <FormItem className={'col-span-full'}>
                            <FormLabel>{estudiosRadiograficosSchema.shape.exam_comp.description}</FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'exam_comp'} control={sectionForm.control}/>


                    <FormField render={({field}) => (
                        <FormItem className={'col-span-full'}>
                            <FormLabel><Title>{estudiosRadiograficosSchema.shape.diagnostico.description}</Title></FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'diagnostico'} control={sectionForm.control}/>

                    <FormField render={({field}) => (
                        <FormItem className={'col-span-full'}>
                            <FormLabel><Title>{estudiosRadiograficosSchema.shape.plan_tratamiento.description}</Title></FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'plan_tratamiento'} control={sectionForm.control}/>

                    <div className={'col-span-full flex justify-end'}>
                        <Button type='submit'>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default EstudioRadiograficoForm
