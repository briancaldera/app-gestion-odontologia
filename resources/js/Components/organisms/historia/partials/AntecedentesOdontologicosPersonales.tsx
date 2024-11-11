import React, {useContext} from "react";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import Title from "@/Components/atoms/Title";
import {Text} from "@/Components/atoms/Text";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {
    AntOdontologicosPersonalesSchema,
    HabitosSchema,
    PortadorSchema
} from "@/FormSchema/Historia/HistoriaOdontologicaSchema.ts";
import {z} from 'zod'
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";
import {Button} from "@/shadcn/ui/button.tsx";

const AntecedentesOdontologicosPersonales = () => {

    const {isProcessing, router} = useInertiaSubmit()
    const {historia} = useContext(HistoriaEditorContext)
    const {ant_personales, habitos, portador} = historia.historia_odontologica!

    const antOdonPerForm = useForm<z.infer<typeof antecedentesOdontologicosPersonalesSchema>>({
        resolver: zodResolver(antecedentesOdontologicosPersonalesSchema),
        defaultValues: {
            ant_personales: ant_personales ?? '',
            habitos: {
                alcohol: habitos.alcohol ?? false,
                bruxismo: habitos.bruxismo ?? false,
                bruxomania: habitos.bruxomania ?? false,
                deglusion_atip: habitos.deglusion_atip ?? false,
                descripcion: habitos.descripcion ?? '',
                drogas: habitos.drogas ?? false,
                fumar: habitos.fumar ?? false,
                onicofagia: habitos.onicofagia ?? false,
                otros: habitos.otros ?? false,
                palillos: habitos.palillos ?? false,
                queilofagia: habitos.queilofagia ?? false,
                respirador_bucal: habitos.respirador_bucal ?? false,
                succion_digital: habitos.succion_digital ?? false
            }, portador: {ortodoncia: portador.ortodoncia ?? false, protesis: portador.protesis ?? false}
        },
        disabled: isProcessing,
    })
    const handleSubmit = (values: z.infer<typeof antecedentesOdontologicosPersonalesSchema>) => {
        const endpoint = route('historias.odontologica.update', {
            historia: historia.id
        })

        const body = {
            ...values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(antOdonPerForm, errors)
            }
        })
    }


    return (
        <div>
            <Title level={'title-md'}>Antecedentes Odontologicos Personales</Title>
            <Text>Restauraciones, cirugías, prótesis, tratamientos periodontales, endodonticos,
                ortodonticos que ha recibido el paciente</Text>

            <Form {...antOdonPerForm}>
                <form onSubmit={antOdonPerForm.handleSubmit(handleSubmit)} className={''}>

                    <FormField render={({field}) =>
                        (
                            <FormItem>
                                <FormControl>
                                    <Textarea id={field.name} className={'min-h-48'} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'ant_personales'} control={antOdonPerForm.control}/>

                    <div className={'grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'}>

                        <section
                            className={'col-span-full sm:col-span-1 border rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-2 p-5 content-start'}>

                            <div className={'col-span-full'}>
                                <Title>Portador</Title>
                                <Text level={'body-sm'}>Seleccione las opciones que apliquen al
                                    paciente</Text>
                            </div>


                            {
                                Object.keys(antecedentesOdontologicosPersonalesSchema.shape.portador.shape).map(item => (
                                    <FormField key={item} render={({field}) => (
                                        <FormItem className={'col-span-full'}>
                                            <div className={'flex items-center gap-1'}>
                                                <FormControl>
                                                    <Checkbox id={field.name} checked={field.value}
                                                              disabled={field.disabled}
                                                              onCheckedChange={field.onChange}/>
                                                </FormControl>
                                                <FormLabel>{antecedentesOdontologicosPersonalesSchema.shape.portador.shape[item].description}</FormLabel>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={`portador.${item}`} control={antOdonPerForm.control}/>
                                ))
                            }

                        </section>

                        <section
                            className={'col-span-full sm:col-span-2 border rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-2 p-5 content-start'}>

                            <div className={'col-span-full'}>
                                <Title>Hábitos</Title>
                                <Text level={'body-sm'}>Seleccione los hábitos que presenta el paciente</Text>
                            </div>

                            <div
                                className={'col-span-full flex flex-col sm:flex-row sm:flex-wrap gap-3'}>

                                {
                                    Object.keys(antecedentesOdontologicosPersonalesSchema.shape.habitos.shape).filter(habito => habito !== 'descripcion').sort().map(habito =>
                                        (
                                            <FormField key={habito} render={({field}) => (
                                                <FormItem>
                                                    <div className={'flex gap-2'}>
                                                        <FormControl>
                                                            <Checkbox checked={field.value}
                                                                      disabled={field.disabled}
                                                                      onCheckedChange={field.onChange}/>
                                                        </FormControl>
                                                        <FormLabel>{antecedentesOdontologicosPersonalesSchema.shape.habitos.shape[habito].description}</FormLabel>
                                                    </div>
                                                    <FormMessage/>
                                                </FormItem>
                                            )} name={`habitos.${habito}`} control={antOdonPerForm.control}/>))
                                }
                            </div>
                            <div className={'col-span-full'}>
                                <FormField render={({field}) => (
                                    <FormItem>
                                        <div className={'mt-1'}>
                                            <FormLabel>Descripción</FormLabel>
                                            <FormDescription>
                                                En caso de presentar algún hábito explique desde
                                                cuándo y la frecuencia
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Textarea {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'habitos.descripcion'} control={antOdonPerForm.control}/>
                            </div>

                        </section>
                    </div>

                    <div className={'flex justify-end'}>
                        <Button type='submit'
                                disabled={antOdonPerForm.formState.disabled || !antOdonPerForm.formState.isDirty}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

const antecedentesOdontologicosPersonalesSchema = z.object({
    ant_personales: AntOdontologicosPersonalesSchema,
    portador: PortadorSchema,
    habitos: HabitosSchema,
})

export default AntecedentesOdontologicosPersonales
