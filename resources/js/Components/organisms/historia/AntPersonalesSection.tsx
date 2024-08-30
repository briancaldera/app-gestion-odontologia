import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import AntPersonalesSchema from "@/FormSchema/Historia/AntPersonalesSchema";
import {useRoute} from "ziggy-js";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import Label from "@/Components/atoms/Label";
import Checkbox from "@/Components/atoms/Checkbox";
import Textarea from "@/Components/atoms/Textarea";
import Input from "@/Components/atoms/Input";
import {Button} from "@/shadcn/ui/button";
import React from "react";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";

type AntecedentesMedicosPersonalesSectionProps = {
    form: UseFormReturn<z.infer<typeof AntPersonalesSchema>>
}

const AntecedentesMedicosPersonalesSection = ({form}: AntecedentesMedicosPersonalesSectionProps) => {

    const route = useRoute()
    const { isProcessing, router} = useInertiaSubmit()

    console.log(form.formState.errors)
    console.log(form.getValues().medicamentos.acidoacetilicidico)

    const handleSubmit = (values: z.infer<typeof AntPersonalesSchema>) => {
        console.log(values)

        const endpoint = route('historias.antpersonales.update', {
            historia: values.historia_id
        })

        router.patch(endpoint, values, {
            onError: errors => {
                console.log(errors)
            },
            onSuccess: page => {
                form.reset(values)
            }
        })
    }
    return (

        <Surface className={'w-full px-6 min-h-screen'}>

            <Title level={'title-lg'}>Antecedentes Médicos Personales</Title>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={''}>

                    <section className={'my-6'}>
                        <header>
                            <Title level={'title-md'}>Trastornos</Title>
                        </header>

                        <div
                            className={'grid grid-cols-1 sm:grid-cols-2 gap-6 border rounded-2xl border-slate-300 p-3'}>
                            {

                                Object.entries(form.getValues().trastornos).filter(([key, _]) => key !== 'historia_id').map(([key, value]: [string, object]) => (
                                    <div id={key}
                                         className={'grid grid-cols-2 gap-2 border rounded-lg p-6 content-start'}
                                         key={key}>
                                        <div className={'col-span-full capitalize'}>
                                            <Label htmlFor={key}>{key}</Label>
                                        </div>
                                        {
                                            Object.keys(value).filter(trastorno => trastorno !== 'otros').map(trastorno => {
                                                return (
                                                    <div key={trastorno}>
                                                        <FormField render={({field}) => {
                                                            return (
                                                                <div key={trastorno}>
                                                                    <FormItem className={'flex flex-col'}>
                                                                        <div className={'flex items-center gap-2'}>
                                                                            <FormControl>
                                                                                <Checkbox id={field.name}
                                                                                          checked={field.value}
                                                                                          onCheckedChange={field.onChange}/>
                                                                            </FormControl>
                                                                            <FormLabel htmlFor={field.name}
                                                                                       className={'capitalize'}>{trastorno.replace('_', ' ')}</FormLabel>
                                                                        </div>
                                                                        <FormMessage/>
                                                                    </FormItem>
                                                                </div>
                                                            )
                                                        }} name={`trastornos.${key}.${trastorno}`}
                                                                   control={form.control}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ))
                            }
                        </div>


                    </section>

                    <section className={'my-6'}>
                        <header>
                            <Title level={'title-md'}>Alergias</Title>
                        </header>

                        <div
                            className={'grid sm:flex grid-cols-1 items-center gap-6 border rounded-2xl border-slate-300 p-3'}>
                            {
                                Object.keys(form.getValues().alergias).filter(alergia => alergia !== 'descripcion').map(alergia => (
                                    <div key={alergia}>
                                        <FormField render={({field}) => (
                                            <FormItem className={'flex gap-2 items-center'}>
                                                <FormControl>
                                                    <Checkbox id={field.name} checked={field.value}
                                                              onCheckedChange={field.onChange}/>
                                                </FormControl>
                                                <Title level={'title-md'} className={'capitalize'}>{alergia}</Title>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={`alergias.${alergia}`} control={form.control}/>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={'mt-4'}>
                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel htmlFor={field.name} className={'mb-1.5'}>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea id={field.name} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'alergias.descripcion'} control={form.control}/>
                        </div>
                    </section>

                    <hr/>

                    <section className={'my-6'}>
                        <header>
                            <Title level={'title-md'}>Medicamentos que toma actualmente (mg y dosis diaria)</Title>
                        </header>

                        <div
                            className={'col-span-full grid grid-cols-1 gap-4 sm:grid-cols-3 border rounded-2xl border-slate-300 p-3'}>
                            {
                                Object.keys(form.getValues().medicamentos).filter(medicamento => medicamento !== 'otros').map(medicamento => (
                                    <div key={medicamento}>
                                        <div className={'flex gap-4 items-center'}>
                                            <FormField render={({field}) =>
                                                <FormItem className={'flex gap-4 items-center'}>
                                                    <FormControl>
                                                        <Checkbox id={field.name} checked={field.value}
                                                                  onCheckedChange={field.onChange}/>
                                                    </FormControl>
                                                    <FormLabel htmlFor={field.name}
                                                               className={'capitalize'}>{medicamento}</FormLabel>
                                                </FormItem>
                                            } name={`medicamentos.${medicamento}.positivo`}
                                                       control={form.control}/>
                                            <FormField render={({field}) =>
                                                <FormItem className={'flex items-top gap-1'}>
                                                    <FormControl>
                                                        <Input id={field.name} {...field} type={'number'} step={'0.1'}
                                                               className={'text-xl'}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                    <FormLabel htmlFor={field.name}
                                                               className={'font-light text-xs text-neutral-500 text-muted'}>mg</FormLabel>
                                                </FormItem>
                                            } name={`medicamentos.${medicamento}.dosis_diaria`}
                                                       control={form.control}/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                    <Button type={"submit"} disabled={isProcessing || !form.formState.isDirty}>Guardar</Button>

                </form>
            </Form>
        </Surface>
    )
}

export default AntecedentesMedicosPersonalesSection
