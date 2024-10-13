import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import AntPersonalesSchema from "@/FormSchema/Historia/AntPersonalesSchema";
import {useRoute} from "ziggy-js";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import Label from "@/Components/atoms/Label";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";
import Textarea from "@/Components/atoms/Textarea";
import Input from "@/Components/atoms/Input";
import {Button} from "@/shadcn/ui/button";
import React from "react";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import CorrectionsBlock from "@/src/corrections/CorrectionsBlock.tsx";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import {toast} from "sonner";

type AntecedentesMedicosPersonalesSectionProps = {
    form: UseFormReturn<z.infer<typeof AntPersonalesSchema>>
}

const AntecedentesMedicosPersonalesSection = ({form}: AntecedentesMedicosPersonalesSectionProps) => {

    const {historia, homework, canCreateCorrections} = React.useContext(HistoriaEditorContext)

    const correctionsModel = homework?.documents.find((document) => document.id === historia?.id).corrections

    const route = useRoute()
    const {isProcessing, router} = useInertiaSubmit()

    const handleSubmit = (values: z.infer<typeof AntPersonalesSchema>) => {

        const endpoint = route('historias.antpersonales.update', {
            historia: values.historia_id
        })

        router.patch(endpoint, {...values}, {
            onError: errors => mapServerErrorsToFields(form, errors),
            onSuccess: _page => {
                form.reset(values)
            }
        })
    }

    const handleSubmitCorrections = (values: {section: string, content: string}) => {
        const endpoint = route('groups.assignments.homeworks.corrections', {
            group:homework?.assignment?.group_id,
            assignment: homework?.assignment_id,
            homework: homework?.id,
        })

        const data = {
            document_id: historia?.id,
            type: 'HRA',
            section: values.section,
            content: values.content,
        }

        router.post(endpoint, data, {
            onError: errors => {
                toast.error('No se pudo agregar las correcciones')
            },
            onSuccess: page => {
                toast.success('Correcciones agregadas')
            }
        })
    }

    return (

        <Surface className={'w-full px-6 min-h-screen'}>

            <Title level={'title-lg'}>Antecedentes Médicos Personales</Title>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={''}>

                    <CorrectionsBlock model={correctionsModel} name={'trastornos'} canCreateCorrections={canCreateCorrections} onSubmitCorrections={handleSubmitCorrections}>
                    <section className={'my-6'}>
                        <header>
                            <Title level={'title-md'}>Trastornos</Title>
                        </header>

                        <div
                            className={'grid grid-cols-1 sm:grid-cols-2 gap-6 border rounded-2xl border-slate-300 p-3'}>
                            {

                                Object.keys(AntPersonalesSchema.shape.trastornos.shape).map((key: string) => (
                                    <div id={key}
                                         className={'grid grid-cols-2 gap-2 border rounded-lg p-6 content-start'}
                                         key={key}>
                                        <div className={'col-span-full capitalize'}>
                                            <Label htmlFor={key}>{key}</Label>
                                        </div>
                                        {/*TODO: Add 'otros' field*/}
                                        {
                                            Object.keys(AntPersonalesSchema.shape.trastornos.shape[key].shape).filter(trastorno => trastorno !== 'otros').map(trastorno => {
                                                return (
                                                    <div key={trastorno}>
                                                        <FormField render={({field}) => {
                                                            return (
                                                                <div key={trastorno}>
                                                                    <FormItem className={'flex flex-col'}>
                                                                        <div className={'flex items-center gap-2'}>
                                                                            <FormControl>
                                                                                <Checkbox id={field.name}
                                                                                          disabled={field.disabled}
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
                    </CorrectionsBlock>

                    <CorrectionsBlock model={correctionsModel} name={'alergias'} canCreateCorrections={canCreateCorrections} onSubmitCorrections={handleSubmitCorrections}>
                    <section className={'my-6'}>
                        <header>
                            <Title level={'title-md'}>Alergias</Title>
                        </header>

                        <div
                            className={'grid sm:flex grid-cols-1 items-center gap-6 border rounded-2xl border-slate-300 p-3'}>
                            {
                                Object.keys(AntPersonalesSchema.shape.alergias.shape).filter(alergia => alergia !== 'descripcion').map(alergia => (
                                    <div key={alergia}>
                                        <FormField render={({field}) => (
                                            <FormItem className={'flex gap-2 items-center'}>
                                                <FormControl>
                                                    <Checkbox id={field.name} checked={field.value} disabled={field.disabled}
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
                    </CorrectionsBlock>

                    <hr/>

                    <section className={'my-6'}>
                        <header>
                            <Title level={'title-md'}>Medicamentos que toma actualmente (mg y dosis diaria)</Title>
                        </header>

                        <div
                            className={'col-span-full grid grid-cols-1 gap-4 sm:grid-cols-3 border rounded-2xl border-slate-300 p-3'}>
                            {
                                Object.keys(AntPersonalesSchema.shape.medicamentos.shape).filter(medicamento => medicamento !== 'otros').map(medicamento => (
                                    <div key={medicamento}>
                                        <div className={'flex gap-4 items-center'}>
                                            <FormField render={({field}) =>
                                                <FormItem className={'flex gap-4 items-center'}>
                                                    <FormControl>
                                                        <Checkbox id={field.name} checked={field.value} disabled={field.disabled}
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

                    <Button type={"submit"} disabled={isProcessing || !form.formState.isDirty || form.formState.disabled}>Guardar</Button>

                </form>
            </Form>
        </Surface>
    )
}

export default AntecedentesMedicosPersonalesSection
