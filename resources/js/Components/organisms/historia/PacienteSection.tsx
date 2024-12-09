import React from "react";
import {useForm, UseFormReturn} from "react-hook-form";
import {z} from "zod";
import PacienteSchema from "@/FormSchema/Historia/PacienteSchema";
import {route, useRoute} from "ziggy-js";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import Field from "@/Components/molecules/Field";
import DatePicker from "@/Components/molecules/DatePicker";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/ui/select";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {mapServerErrorsToFields, usePermission} from "@/src/Utils/Utils.ts";
import {Input} from '@/shadcn/ui/input.tsx';
import ProfilePicturePicker from "@/Components/molecules/ProfilePicturePicker.tsx";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Text} from "@/Components/atoms/Text";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from '@/shadcn/ui/dialog.tsx'
import {Button} from "@/shadcn/ui/button.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {router} from "@inertiajs/react";
import Pin from "@/Components/atoms/Pin.tsx";
import {historiaSchema} from "@/FormSchema/Historia/HistoriaSchema.ts";
import Logo from "@/Components/atoms/Logo.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {format} from "date-fns";
import Heading from "@/Components/atoms/Heading";

type PacienteSectionProps = {
    form: UseFormReturn<z.infer<typeof historiaSchema>>
}

const PacienteSection = ({form}: PacienteSectionProps) => {

    const {historia, disabled} = React.useContext(HistoriaEditorContext)
    const {paciente} = historia

    const pacienteForm = useForm<z.infer<typeof PacienteSchema>>({
        resolver: zodResolver(PacienteSchema),
        defaultValues: {
            apellido: paciente?.apellido ?? "",
            cedula: paciente?.cedula ?? "",
            direccion: paciente?.direccion ?? "",
            edad: paciente?.edad ?? 0,
            fecha_nacimiento: paciente?.fecha_nacimiento ?? '',
            foto: paciente?.foto ?? null,
            nombre: paciente?.nombre ?? "",
            ocupacion: paciente?.ocupacion ?? "",
            peso: paciente?.peso ?? 0,
            sexo: paciente?.sexo ?? "",
            telefono: paciente?.telefono ?? ''
        },
        disabled: true // this form is always disabled
    })

    const can = usePermission()

    const route = useRoute()

    const {router, isProcessing} = useInertiaSubmit()

    const handleSubmit = (values: z.infer<typeof historiaSchema>) => {

        const endpoint = route('historias.update', {
            historia: historia.id
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
        <ScrollArea className={'bg-white w-full p-6 h-[83vh]'}>

            <header className={'flex flex-col items-center gap-y-1 relative text-center'}>
                <Logo className={'size-20 sm:absolute top-0 left-0'}/>
                <Heading level={'h6'}>Universidad Gran Mariscal de Ayacucho</Heading>
                <Title level={'body-sm'}>Facultad de Odontología</Title>
                <Title level={'body-sm'}>Clínica Integral de Adulto</Title>
                <Title level={'h3'} className={'font-bold'}>Historia Clínica</Title>

            </header>

            <div className={'flex justify-between items-baseline py-2'}>
                <div className={'flex items-baseline gap-x-3'}>
                    <Text>Historia N°: {historia.numero}</Text>
                    {
                        can('historias-assign-id') && (
                            <AssignNumberDialog/>
                        )
                    }
                </div>

                <div className={'flex items-baseline gap-x-3'}>

                    <div className={'flex gap-x-3'}>
                        <Text>
                            Fecha: {format(historia.created_at, 'P')}
                        </Text>
                    </div>

                </div>


            </div>
            <div className={'flex justify-between items-baseline gap-x-3'}>
                <Text>
                    Bachiller: {`${historia.autor?.profile?.nombres} ${historia.autor?.profile?.apellidos}`}
                </Text>
                <div>
                    <Text>
                        Semestre:
                    </Text>
                    {
                        historia.semestre && (
                            <div className={'flex items-center gap-x-2'}>
                                <Text>{historia.semestre}°</Text>
                                <Pin color={colorMap.get(historia.semestre)!}/>
                            </div>
                        )}
                    {
                        can('historias-assign-semester') && !disabled && (
                            <AssignSemesterDialog/>
                        )
                    }
                </div>
            </div>

            <Title level={'title-lg'}>Datos Personales</Title>

            <Form {...pacienteForm}>
                <form onSubmit={form.handleSubmit(() => {
                })} className={'flex flex-col sm:flex-row gap-6 pt-4'}>
                    <div className='basis-1/3'>
                        <FormField render={({field}) => (
                            <FormItem
                                className={'bg-slate-100 rounded-lg aspect-[3/4] p-2 flex justify-center items-center'}>
                                <FormControl>
                                    <ProfilePicturePicker disabled={true} src={field.value} onDrop={() => {
                                    }}
                                                          className={'size-32'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'foto'} control={pacienteForm.control}/>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-y-8 gap-x-6'>

                        <Field control={pacienteForm.control} name={'nombre'} label={'Nombre'}/>
                        <Field control={pacienteForm.control} name={'apellido'} label={'Apellido'}/>
                        <Field control={pacienteForm.control} name={'cedula'} label={'Cédula'}/>


                        <div className={'flex gap-x-2'}>
                            <Field control={pacienteForm.control} name={'edad'} label={'Edad'} type={'number'}/>

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
                            )} name={'sexo'} control={pacienteForm.control}/>

                            <Field control={pacienteForm.control} name={'peso'} label={'Peso (Kg)'} type={'number'}/>
                        </div>

                        <DatePicker control={pacienteForm.control} label={'Fecha de nacimiento'}
                                    name={'fecha_nacimiento'}/>


                        <FormField render={({field}) => (
                            <FormItem className={'col-start-1'}>
                                <FormLabel>Ocupación</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'ocupacion'} control={pacienteForm.control}/>


                        <Field control={pacienteForm.control} name={'telefono'} label={'Teléfono'} type={'tel'}
                               placeholder={'Ejemplo: 0414-1234567'}/>

                        <FormField render={({field}) => (
                            <FormItem className={'col-start-1 col-span-full'}>
                                <FormLabel>Dirección</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'direccion'} control={pacienteForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem className={''}>
                                <FormLabel>En casos de emergencia contactar</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'informacion_emergencia.contacto'} control={pacienteForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem className={''}>
                                <FormLabel>Teléfono</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'informacion_emergencia.telefono'} control={pacienteForm.control}/>

                    </div>
                </form>
            </Form>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={'flex flex-col sm:flex-row gap-6 pt-4'}>


                    <div className={'basis-1/4'}>

                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-y-8 gap-x-6 basis-full'>
                        <FormField render={({field}) => (
                            <FormItem className={'col-span-full'}>

                                <FormLabel>Motivo de consulta</FormLabel>

                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'motivo_consulta'} control={form.control}/>

                        <FormField render={({field}) => (
                            <FormItem className={'col-span-full'}>
                                <FormLabel>Tratamiento indicado</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'enfermedad_actual'} control={form.control}/>

                        <div className={'flex justify-end col-span-full'}>
                            <Button disabled={disabled || !form.formState.isDirty}>
                                Guardar
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>

        </ScrollArea>
    )
}

const assignNumberSchema = z.object({
    numero: z.string().regex(/^[A-Z]-\d{4}-I{1,3}2\d{3}$|^$/, {message: 'Formato inválido. Ejemplo: T-0000-II2024'})
})

const AssignNumberDialog = () => {
    const {historia} = React.useContext(HistoriaEditorContext)

    const form = useForm<z.infer<typeof assignNumberSchema>>({
        resolver: zodResolver(assignNumberSchema),
        defaultValues: {
            numero: historia.numero ?? ""
        },
    })

    const handleSubmit = (values: z.infer<typeof assignNumberSchema>) => {
        const endpoint = route('historias.assignid', {historia: historia.id})


        const body = {
            ...values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(form, errors)
            },
            onSuccess: page => {
                router.reload()
            }
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    {
                        !historia.numero ? (
                            'Asignar N° de historia'
                        ) : (
                            'Reasignar N° de historia'
                        )
                    }
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Asignar número de historia</DialogTitle>
                <DialogDescription>Asigne un número a esta historia</DialogDescription>
                <div>
                    <Form {...form}>
                        <form id={'assignNumberForm'} onSubmit={form.handleSubmit(handleSubmit)}>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>N° de historia</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder={'Ej: T-0000-II2024'}/>
                                    </FormControl>
                                    <FormMessage/>
                                    <FormDescription>

                                    </FormDescription>
                                </FormItem>
                            )} name={'numero'} control={form.control}/>

                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='secondary'>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button type='submit' form='assignNumberForm'>
                        Asignar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const assignSemesterSchema = z.object({
    semestre: z.enum(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
})

const AssignSemesterDialog = () => {
    const {historia} = React.useContext(HistoriaEditorContext)

    const form = useForm<z.infer<typeof assignSemesterSchema>>({
        resolver: zodResolver(assignSemesterSchema),
        defaultValues: {
            semestre: ""
        },
    })

    const handleSubmit = (values: z.infer<typeof assignSemesterSchema>) => {
        const endpoint = route('historias.update', {historia: historia.id})


        const body = {
            ...values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(form, errors)
            },
            onSuccess: page => {
                router.reload()
            }
        })
    }

    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    {
                        !historia.semestre ? (
                            'Asignar semestre'
                        ) : (
                            'Reasignar semestre'
                        )
                    }
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Asignar semestre</DialogTitle>
                <DialogDescription>Asigne un número de semestre</DialogDescription>
                <div>
                    <Form {...form}>
                        <form id={'assignSemesterForm'} onSubmit={form.handleSubmit(handleSubmit)}>

                            <FormField render={({field}) => (
                                <FormItem className={'w-fit'}>
                                    <FormLabel>Semestre</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={'Selecciona un semestre'}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={'5'}>
                                                <div className={'flex items-center gap-x-2'}>
                                                    5<Pin color={colorMap.get('5')!}/>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value={'6'}>
                                                <div className={'flex items-center gap-x-2'}>
                                                    6<Pin color={colorMap.get('6')!}/>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value={'7'}>
                                                <div className={'flex items-center gap-x-2'}>
                                                    7<Pin color={colorMap.get('7')!}/>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value={'8'}>
                                                <div className={'flex items-center gap-x-2'}>
                                                    8<Pin color={colorMap.get('8')!}/>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value={'9'}>
                                                <div className={'flex items-center gap-x-2'}>
                                                    9<Pin color={colorMap.get('9')!}/>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                    <FormDescription>

                                    </FormDescription>
                                </FormItem>
                            )} name={'semestre'} control={form.control}/>

                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='secondary'>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button type='submit' form='assignSemesterForm'>
                        Asignar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const colorMap = new Map([
    ['5', '#3290F0'],
    ['6', '#F0599C'],
    ['7', '#EF833A'],
    ['8', '#b239e5'],
    ['9', '#14c481'],
])

export default PacienteSection
