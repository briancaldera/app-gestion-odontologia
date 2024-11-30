import AuthLayout from "@/Layouts/AuthLayout.js";
import React from "react";
import {useRoute} from "ziggy-js";
import {z} from "zod";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import Field from "@/Components/molecules/Field.tsx";
import DatePicker from "@/Components/molecules/DatePicker.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {useForm} from 'react-hook-form'
import PacienteSchema, {PacienteDefaults, PacienteFake} from "@/FormSchema/Historia/PacienteSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import ProfilePicturePicker from "@/Components/molecules/ProfilePicturePicker.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/shadcn/ui/select.tsx'
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {historiaSchema} from "@/FormSchema/Historia/HistoriaSchema.ts";
import {Textarea} from "@/shadcn/ui/textarea.tsx";

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

    const {isProcessing, router} = useInertiaSubmit()

    const form = useForm<z.infer<typeof CreateHistoriaSchema>>({
        resolver: zodResolver(CreateHistoriaSchema),
        defaultValues: CreateHistoriaDefaults,
        values: PacienteFake,
    })

    const route = useRoute()

    const handleSubmit = (values: z.infer<typeof PacienteSchema>) => {
        const endpoint: string = route('historias.store')
        router.post(endpoint, {...values}, {
            onError: errors => {mapServerErrorsToFields(form, errors)}
        })
    }

    return (
        <Surface className={'w-full p-6'}>
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
                                                <SelectItem value={'F'}>Femenino</SelectItem>
                                                <SelectItem value={'M'}>Masculino</SelectItem>
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



                    <FormField render={({field}) => (
                        <FormItem className={'col-span-2 col-start-1'}>
                            <FormLabel>Motivo de consulta</FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} name={'motivo_consulta'} control={form.control}/>

                    <FormField render={({field}) => (
                        <FormItem className={'col-span-2 col-start-1'}>
                            <FormLabel>Enfermedad actual</FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} name={'enfermedad_actual'} control={form.control}/>

                    <div className={'hidden sm:block'}></div>
                    <div className={'hidden sm:block'}></div>

                    <div className={'sm:col-span-full flex justify-end'}>
                        <Button type={'submit'} disabled={isProcessing}>Crear nueva historia</Button>
                    </div>
                </form>
            </Form>
        </Surface>
    )
}

const CreateHistoriaSchema = z.intersection(PacienteSchema, historiaSchema.omit({paciente_id: true}))

const {paciente_id, ...HistoriaDefaultsMod} = HistoriaDefaults
const CreateHistoriaDefaults = {...PacienteDefaults, ...HistoriaDefaultsMod} satisfies z.infer<typeof CreateHistoriaSchema>

export default Create
