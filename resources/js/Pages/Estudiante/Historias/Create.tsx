import AuthLayout from "@/Layouts/AuthLayout.jsx";
import {Card} from "@/shadcn/ui/card";
import React, {useEffect} from "react";
import {useRoute} from "ziggy-js";
import {z} from "zod";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Form, FormField, FormMessage, FormItem, FormControl, FormLabel, FormDescription} from "@/shadcn/ui/form";
import Field from "@/Components/molecules/Field";
import DatePicker from "@/Components/molecules/DatePicker";
import {Button} from "@/shadcn/ui/button";
import {useForm as useFormHook, UseFormReturn} from 'react-hook-form'
import PacienteSchema , {PacienteDefaults, PacienteFake} from "@/FormSchema/Historia/PacienteSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import ProfilePicturePicker from "@/Components/molecules/ProfilePicturePicker";
import {Select, SelectItem, SelectTrigger, SelectValue, SelectSeparator, SelectContent} from '@/shadcn/ui/select'
import {router, useForm} from "@inertiajs/react";


const Create = () => {
    return (
        <AuthLayout title={'Crear historia'}>
            <div className={'p-12'}>
                <PacienteSection />
            </div>
        </AuthLayout>
    )
}

const PacienteSection = () => {


    const [processing, setProcessing] = React.useState<boolean>(false)

    const form = useFormHook<z.infer<typeof PacienteSchema>>({
        resolver: zodResolver(PacienteSchema),
        defaultValues: PacienteFake,
    })

    const route = useRoute()

    const handleSubmit = (values: z.infer<typeof PacienteSchema>) => {
        const endpoint: string = route('historias.store')
        router.post(endpoint, values, {
            onStart: () => {setProcessing(true)},
            onFinish: () => {setProcessing(false)},
            onError: errors => {
                Object.keys(errors).forEach((key) => {
                    console.log(key)
                    form.setError(key, {type: 'custom', message: errors[key]})
                })

            }
        })

        // inertiaSubmit.post()
        // router.post(route(''), Object.create(values))
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
                    <div className={'row-span-3 flex flex-col justify-center items-center'}>
                            <FormField render={({field}) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Foto de paciente</FormLabel>
                                        <FormControl>
                                            <div className={'basis-full aspect-square'}>
                                                <ProfilePicturePicker onDrop={(files: File[]) => {
                                                    if (files.length === 1) field.onChange(files[0])
                                                }} src={field.value} className={'w-auto h-full'}/>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }} name={'foto'} control={form.control} />
                    </div>

                    <Field control={form.control} name={'nombre'} label={'Nombre'}/>

                    <Field control={form.control} name={'apellido'} label={'Apellido'}/>

                    <div className={'grid grid-cols-2 gap-4'}>
                        <Field control={form.control} name={'edad'} label={'Edad'} type={'number'}/>
                        <Field control={form.control} name={'peso'} label={'Peso'} type={'number'}/>
                    </div>

                    <div className={'grid grid-cols-4 gap-4'}>
                        <div className={'col-span-1'}>
                            <FormField render={({field}) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Sexo</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={'Sexo'}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={'F'}>F</SelectItem>
                                                <SelectItem value={'M'}>M</SelectItem>
                                                <SelectItem value={'NI'}>No indicado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }} name={'sexo'} control={form.control} />

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
                        <Button type={'submit'} disabled={processing}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </Surface>
    )
}


export default Create
