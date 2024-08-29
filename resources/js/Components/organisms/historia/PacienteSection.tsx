import React from "react";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import PacienteSchema from "@/FormSchema/Historia/PacienteSchema";
import {useRoute} from "ziggy-js";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormLabel, FormMessage, FormItem, FormDescription, FormField} from "@/shadcn/ui/form";
import Field from "@/Components/molecules/Field";
import DatePicker from "@/Components/molecules/DatePicker";
import {Button} from "@/shadcn/ui/button";
import {Select, SelectItem, SelectValue, SelectTrigger, SelectContent, SelectLabel} from "@/shadcn/ui/select";
import ProfilePicturePicker from "@/Components/molecules/ProfilePicturePicker";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";

interface PacienteSectionProps {
    form: UseFormReturn<z.infer<typeof PacienteSchema>>
}

const PacienteSection = ({form}: PacienteSectionProps) => {

    const route = useRoute()

    const {router, isProcessing} = useInertiaSubmit()

    const handleSubmit = (values: z.infer<typeof PacienteSchema>) => {

        const endpoint = route('pacientes.update', {
            paciente: form.getValues().id
        })

        router.patch(endpoint, values, {
            onError: errors => {
                Object.keys(errors).forEach((key: string) => {
                    form.setError(key, {type: 'custom', message: errors[key]})
                })
            },
            onSuccess: page => {
                // This will reload data from server. Might think later on it... 🤔
                // router.reload()
                // This is cheaper and will simply set the form default values to the current accepted ones
                form.reset(values)
            }
        })
    }

    return (
        <Surface className={'w-full px-6 min-h-screen'}>
            <Title level={'title-lg'}>Datos Personales</Title>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={'grid grid-cols-1 sm:grid-cols-3 gap-4'}>

                    <div className={'col-span-1'}>
                        <Field control={form.control} name={'cedula'} label={'Cédula'}/>
                    </div>

                    <div className={'hidden sm:block'}></div>
                    <div className={'row-span-3'}>

                        {/*<FormField render={({field}) => {*/}
                        {/*    return (*/}
                        {/*        <FormItem>*/}
                        {/*            <FormLabel>Foto de paciente</FormLabel>*/}
                        {/*            <FormControl>*/}
                        {/*                <div className={'basis-full aspect-square'}>*/}
                        {/*                    <ProfilePicturePicker onDrop={(files: File[]) => {*/}
                        {/*                        if (files.length === 1) field.onChange(files[0])*/}
                        {/*                    }} src={field.value} className={'w-auto h-full'}/>*/}
                        {/*                </div>*/}
                        {/*            </FormControl>*/}
                        {/*            <FormMessage />*/}
                        {/*        </FormItem>*/}
                        {/*    )*/}
                        {/*}} name={'foto'} control={form.control} />*/}
                    </div>

                    <Field control={form.control} name={'nombre'} label={'Nombre'}/>

                    <Field control={form.control} name={'apellido'} label={'Apellido'}/>

                    <div className={'grid grid-cols-2 gap-4'}>
                        <Field control={form.control} name={'edad'} label={'Edad'} type={'number'}/>
                        <Field control={form.control} name={'peso'} label={'Peso'} type={'number'}/>
                    </div>

                    <div className={'grid grid-cols-4 gap-4'}>
                        <div className={'col-span-1'}>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>Sexo</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={'Sexo'} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={'F'}>Femenino</SelectItem>
                                            <SelectItem value={'M'}>Masculino</SelectItem>
                                            <SelectItem value={'NI'}>No indicado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} name={'sexo'} control={form.control}/>
                        </div>
                        <div className={'col-span-3'}>
                            <DatePicker control={form.control} label={'Fecha de nacimiento'} name={'fecha_nacimiento'}/>
                        </div>
                    </div>

                    <div className={'col-span-2'}>
                        <Field control={form.control} name={'direccion'} label={'Dirección'}/>
                    </div>

                    <Field control={form.control} name={'telefono'} label={'Teléfono'} type={'tel'}
                           placeholder={'Ejemplo: 0414-1234567'}/>


                    <Field control={form.control} name={'ocupacion'} label={'Ocupación'}/>


                    <div className={'hidden sm:block'}></div>
                    <div className={'hidden sm:block'}></div>

                    <div className={'w-full'}>
                        <Button type={'submit'} disabled={!form.formState.isDirty || isProcessing}>Actualizar</Button>
                    </div>
                </form>
            </Form>
        </Surface>
    )
}

export default PacienteSection
