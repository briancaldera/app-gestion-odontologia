import React from "react";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import PacienteSchema from "@/FormSchema/Historia/PacienteSchema";
import {useRoute} from "ziggy-js";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import Field from "@/Components/molecules/Field";
import DatePicker from "@/Components/molecules/DatePicker";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/ui/select";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import Input from "@/Components/atoms/Input.tsx";
import ProfilePicturePicker from "@/Components/molecules/ProfilePicturePicker.tsx";

type PacienteSectionProps = {
    form: UseFormReturn<z.infer<typeof PacienteSchema>>
}

const PacienteSection = ({form}: PacienteSectionProps) => {

    const route = useRoute()

    const {router, isProcessing} = useInertiaSubmit()

    const handleSubmit = (values: z.infer<typeof PacienteSchema>) => {

        const endpoint = route('pacientes.update', {
            paciente: values.id
        })

        router.patch(endpoint, {...values}, {
            onError: errors => mapServerErrorsToFields(form, errors),
            onSuccess: _page => {
                // This will reload data from server. Might think later on it... 🤔
                // router.reload()
                // This is cheaper and will simply set the form default values to the current accepted ones
                form.reset(values)
            }
        })
    }

    return (
        <Surface className={'w-full p-6 h-screen'}>
            <Title level={'title-lg'}>Datos Personales</Title>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={'flex flex-col sm:flex-row gap-6 pt-4'}>
                    <div className='basis-1/3'>
                        <FormField render={({field}) => (
                            <FormItem className={'bg-slate-100 rounded-lg aspect-[3/4] p-2 flex justify-center items-center'}>
                                <FormControl>
                                    <ProfilePicturePicker src={field.value} onDrop={() => {}}
                                                          className={'size-32'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'foto'} control={form.control}/>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-y-8 gap-x-6'>

                        <Field control={form.control} name={'nombre'} label={'Nombre'}/>
                        <Field control={form.control} name={'apellido'} label={'Apellido'}/>
                        <Field control={form.control} name={'cedula'} label={'Cédula'}/>


                        <div className={'flex gap-x-2'}>
                            <Field control={form.control} name={'edad'} label={'Edad'} type={'number'}/>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>Sexo</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}
                                            disabled={field.disabled}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={'Sexo'}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={'F'}>Femenino</SelectItem>
                                            <SelectItem value={'M'}>Masculino</SelectItem>
                                            <SelectItem value={'NI'}>No indicado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'sexo'} control={form.control}/>

                            <Field control={form.control} name={'peso'} label={'Peso'} type={'number'}/>
                        </div>

                        <DatePicker control={form.control} label={'Fecha de nacimiento'} name={'fecha_nacimiento'}/>



                        <FormField render={({field}) => (
                            <FormItem className={'col-start-1'}>
                                <FormLabel>Ocupación</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'ocupacion'} control={form.control}/>


                        <Field control={form.control} name={'telefono'} label={'Teléfono'} type={'tel'}
                               placeholder={'Ejemplo: 0414-1234567'}/>

                        <FormField render={({field}) => (
                            <FormItem className={'col-start-1 col-span-full'}>
                                <FormLabel>Dirección</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'direccion'} control={form.control}/>

                        <FormField render={({field}) => (
                            <FormItem className={''}>
                                <FormLabel>En casos de emergencia contactar</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'emergencia_contacto'} control={form.control}/>

                        <FormField render={({field}) => (
                            <FormItem className={''}>
                                <FormLabel>Teléfono</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'emergencia_telefono'} control={form.control}/>




                    </div>
                </form>
            </Form>
        </Surface>
    )
}

export default PacienteSection
