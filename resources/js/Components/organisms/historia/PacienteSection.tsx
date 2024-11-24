import React from "react";
import {useForm, UseFormReturn} from "react-hook-form";
import {z} from "zod";
import PacienteSchema from "@/FormSchema/Historia/PacienteSchema";
import {route, useRoute} from "ziggy-js";
import Surface from "@/Components/atoms/Surface";
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

type PacienteSectionProps = {
    form: UseFormReturn<z.infer<typeof PacienteSchema>>
}

const PacienteSection = ({form}: PacienteSectionProps) => {

    const {historia} = React.useContext(HistoriaEditorContext)
    const can = usePermission()

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

            <div className={'flex flex-col items-center gap-y-1'}>
                <Title level={'body-sm'}>Facultad de Odontología</Title>
                <Title level={'body-sm'}>Clínica Integral de Adulto</Title>
                <Title level={'h3'} className={'font-bold'}>Historia Clínica</Title>

            </div>

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
                            Semestre:
                        </Text>
                        {
                        historia.semestre && (
                            <div className={'flex items-center gap-x-2'}>
                                <Text>{historia.semestre}°</Text>
                                <Pin color={colorMap.get(historia.semestre)!}/>
                            </div>
                            )}

                    </div>
                    {
                        can('historias-assign-semester') && (
                            <AssignSemesterDialog/>
                        )
                    }
                </div>
            </div>

            <Title level={'title-lg'}>Datos Personales</Title>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={'flex flex-col sm:flex-row gap-6 pt-4'}>
                    <div className='basis-1/3'>
                        <FormField render={({field}) => (
                            <FormItem
                                className={'bg-slate-100 rounded-lg aspect-[3/4] p-2 flex justify-center items-center'}>
                                <FormControl>
                                    <ProfilePicturePicker src={field.value} onDrop={() => {
                                    }}
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

                            <Field control={form.control} name={'peso'} label={'Peso (Kg)'} type={'number'}/>
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
                        )} name={'informacion_emergencia.contacto'} control={form.control}/>

                        <FormField render={({field}) => (
                            <FormItem className={''}>
                                <FormLabel>Teléfono</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'informacion_emergencia.telefono'} control={form.control}/>

                        <FormField render={({field}) => (
                            <FormItem className={'col-span-full'}>
                                <FormLabel>Motivo Consulta</FormLabel>
                                <FormControl>
                                    <Textarea value={historia.paciente?.motivo_consulta} disabled/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={''} control={form.control}/>

                        <FormField render={({field}) => (
                            <FormItem className={'col-span-full'}>
                                <FormLabel>Enfermedad Actual</FormLabel>
                                <FormControl>
                                    <Textarea value={historia.paciente?.enfermedad_actual ?? ''} disabled/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={''} control={form.control}/>


                    </div>
                </form>
            </Form>
        </Surface>
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
        const endpoint = route('historias.update', {historia: historia.id})

        console.log(values)

        const body = {
            ...values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                console.log(errors)
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

        console.log(values)

        const body = {
            ...values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                console.log(errors)
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
                <DialogTitle>Asignar número de historia</DialogTitle>
                <DialogDescription>Asigne un número a esta historia</DialogDescription>
                <div>
                    <Form {...form}>
                        <form id={'assignSemesterForm'} onSubmit={form.handleSubmit(handleSubmit)}>

                            <FormField render={({field}) => (
                                <FormItem className={'w-fit'}>
                                    <FormLabel>N° de historia</FormLabel>
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
