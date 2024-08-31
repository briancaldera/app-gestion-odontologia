import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import HistoriaOdontologicaSchema from "@/FormSchema/Historia/HistoriaOdontologicaSchema";
import {useRoute} from "ziggy-js";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import {Text} from "@/Components/atoms/Text";
import Textarea from "@/Components/atoms/Textarea";
import Checkbox from "@/Components/atoms/Checkbox";
import Input from "@/Components/atoms/Input";
import Tooltip from "@/Components/atoms/Tooltip";
import React from "react";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {Button} from "@/shadcn/ui/button";
import {mapServerErrorsToFields} from "@/src/Utils/Utils";

type HistoriaOdontologicaSectionProps = {
    form: UseFormReturn<z.infer<typeof HistoriaOdontologicaSchema>>
}

const HistoriaOdontologicaSection = ({form}: HistoriaOdontologicaSectionProps) => {

    const route = useRoute()
    const {isProcessing, router} = useInertiaSubmit()

    const handleSubmit = (values: z.infer<typeof HistoriaOdontologicaSchema>) => {
        console.log(values)

        const endpoint = route('historias.odontologica.update', {
            historia: values.historia_id
        })

        router.patch(endpoint, values, {
            onError: errors => {
                console.log(errors)
                mapServerErrorsToFields(form, errors)
            },
            onSuccess: page => form.reset(values)
        })
    }


    return (

        <Surface className={'w-full px-6 min-h-screen'}>

            <Title level={'title-lg'}>Historia Odontologica</Title>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={''}>

                    <section className={'my-6'}>
                        <header className={'mb-1.5 mt-5 space-y-1'}>
                            <Title level={'title-md'}>Antecedentes Odontologicos Personales</Title>
                            <Text>Restauraciones, cirugías, prótesis, tratamientos periodontales, endodonticos,
                                ortodonticos que ha recibido el paciente</Text>
                        </header>

                        <div>
                            <FormField render={({field}) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea id={field.name} className={'min-h-48'} {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }} name={'ant_personales'} control={form.control}/>
                        </div>

                        <div className={'grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'}>

                            <section
                                className={'col-span-full sm:col-span-1 border rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-2 p-5 content-start'}>
                                <div className={'col-span-full'}>
                                    <Title>Portador</Title>
                                    <Text level={'body-sm'}>Seleccione las opciones que apliquen al paciente</Text>
                                </div>
                                {
                                    Object.keys(form.getValues().portador).map(item => (
                                        <div key={item} className={'col-span-full'}>
                                            <FormField render={({field}) => (
                                                <FormItem>
                                                    <div className={'flex items-center gap-1'}>
                                                        <FormControl>
                                                            <Checkbox id={field.name} checked={field.value}
                                                                      onCheckedChange={field.onChange}/>
                                                        </FormControl>
                                                        <FormLabel htmlFor={field.name}
                                                                   className={'capitalize'}>{item}</FormLabel>
                                                    </div>
                                                    <FormMessage/>
                                                </FormItem>
                                            )} name={`portador.${item}`} control={form.control}/>
                                        </div>
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
                                    className={'col-span-full grid grid-cols-1 gap-2 grid-flow-col-dense sm:grid-cols-4 sm:grid-rows-5'}>
                                    {
                                        Object.keys(form.getValues().habitos).filter(habito => habito !== 'descripcion').sort().map(habito => {
                                            return (
                                                <div key={habito}>
                                                    <FormField render={({field}) => (
                                                        <FormItem>
                                                            <div className={'flex gap-2'}>
                                                                <FormControl>
                                                                    <Checkbox id={field.name} checked={field.value}
                                                                              onCheckedChange={field.onChange}/>
                                                                </FormControl>
                                                                <FormLabel htmlFor={field.name}
                                                                           className={'capitalize'}>{habito.replace('_', ' ')}</FormLabel>
                                                            </div>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )} name={`habitos.${habito}`} control={form.control}/>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                                <div className={'col-span-full'}>
                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <div className={'mt-1'}>
                                                <FormLabel htmlFor={field.name}>Descripción</FormLabel>
                                                <Text level={'body-sm'}>En caso de presentar algún hábito explique desde
                                                    cuándo y la frecuencia</Text>
                                            </div>
                                            <FormControl>
                                                <Textarea id={field.name} {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={'habitos.descripcion'} control={form.control}/>
                                </div>

                            </section>

                        </div>
                    </section>

                    <section className={'my-6 border rounded-lg p-5'}>
                        <header className={'mb-1.5 space-y-1'}>
                            <Title level={'title-md'}>Examen físico</Title>
                        </header>

                        <section>
                            <header>
                                <Title level={'title-sm'}>Signos vitales</Title>
                            </header>

                            <div className={'grid grid-cols-8 gap-2'}>
                                <div className={'grid grid-cols-1'}>
                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name}
                                                       className={'capitalize'}>Diastole</FormLabel>
                                            <div className={'flex items-baseline gap-2'}>
                                                <FormControl>
                                                    <Input id={field.name} {...field} type={'number'}/>
                                                </FormControl>
                                                <Text level={'body-md'} className={'font-bold '}>mmHg</Text>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={'examen_fisico.signos_vitales.tension_arterial.diastole'}
                                               control={form.control}/>
                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name} className={'capitalize'}>Sistole</FormLabel>
                                            <div className={'flex items-baseline gap-2'}>
                                                <FormControl>
                                                    <Input id={field.name} {...field} type={'number'}/>
                                                </FormControl>
                                                <Text level={'body-md'} className={'font-bold '}>mmHg</Text>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={'examen_fisico.signos_vitales.tension_arterial.sistole'}
                                               control={form.control}/>
                                </div>

                                <div className={'col-span-7 grid grid-cols-1 sm:grid-cols-4 gap-6'}>
                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name} className={'capitalize'}>Pulso</FormLabel>
                                            <div className={'flex gap-2 items-baseline'}>
                                                <FormControl>
                                                    <Input id={field.name}  {...field} type={'number'}/>
                                                </FormControl>
                                                <Tooltip>
                                                    <Tooltip.Trigger onClick={(e) => e.preventDefault()}>
                                                        <abbr>PPM</abbr>
                                                    </Tooltip.Trigger>
                                                    <Tooltip.Content>
                                                        Pulsaciones por minuto
                                                    </Tooltip.Content>
                                                </Tooltip>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={'examen_fisico.signos_vitales.pulso'} control={form.control}/>

                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name}
                                                       className={'capitalize'}>Respiración</FormLabel>
                                            <div className={'flex gap-2 items-baseline'}>
                                                <FormControl>
                                                    <Input id={field.name}  {...field} type={'number'}/>
                                                </FormControl>
                                                <Tooltip>
                                                    <Tooltip.Trigger onClick={(e) => e.preventDefault()}>
                                                        <abbr>RPM</abbr>
                                                    </Tooltip.Trigger>
                                                    <Tooltip.Content>
                                                        Respiraciones por minuto
                                                    </Tooltip.Content>
                                                </Tooltip>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={'examen_fisico.signos_vitales.respiracion'} control={form.control}/>

                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name}
                                                       className={'capitalize'}>Temperatura</FormLabel>
                                            <div className={'flex gap-2 items-baseline'}>
                                                <FormControl>
                                                    <Input id={field.name}  {...field} type={'number'} step={0.1}/>
                                                </FormControl>
                                                <Tooltip>
                                                    <Tooltip.Trigger onClick={(e) => e.preventDefault()}>
                                                        <em>C°</em>
                                                    </Tooltip.Trigger>
                                                    <Tooltip.Content>
                                                        Grados Celsius
                                                    </Tooltip.Content>
                                                </Tooltip>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={'examen_fisico.signos_vitales.temperatura'} control={form.control}/>
                                </div>
                            </div>
                        </section>

                        <section className={'mt-6'}>
                            <header>
                                <Title level={'title-md'}>Examen Extraoral</Title>
                            </header>

                            <div>
                                {
                                    Object.keys(form.getValues().examen_fisico.examen_extraoral).map(char => (
                                        <div key={char}>
                                            <FormField render={({field}) => (
                                                <FormItem>
                                                    <FormLabel htmlFor={field.name}
                                                               className={'capitalize'}>{char.replaceAll('_', ' ')}</FormLabel>
                                                    <FormControl>
                                                        <Textarea id={field.name} {...field}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )} name={`examen_fisico.examen_extraoral.${char}`} control={form.control}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </section>

                        <section className={'mt-6'}>
                            <header>
                                <Title level={'title-md'}>Examen Intraoral</Title>
                            </header>

                            <div>
                                {
                                    Object.keys(form.getValues().examen_fisico.examen_intraoral).map(char => (
                                        <div key={char}>
                                            <FormField render={({field}) => (
                                                <FormItem>
                                                    <FormLabel htmlFor={field.name}
                                                               className={'capitalize'}>{char.replaceAll('_', ' ')}</FormLabel>
                                                    <FormControl>
                                                        <Textarea id={field.name} {...field}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )} name={`examen_fisico.examen_intraoral.${char}`} control={form.control}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </section>

                    </section>

                    <div className={'flex justify-end'}>
                        <Button type={'submit'} disabled={isProcessing || !form.formState.isDirty}>Guardar</Button>
                    </div>

                </form>
            </Form>
        </Surface>
    );
}

export default HistoriaOdontologicaSection
