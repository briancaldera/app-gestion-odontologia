import Paciente from "@/src/models/Paciente.ts";
import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import React from "react";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {pacienteSchema} from "@/FormSchema/Pacientes/CreateSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {route} from "ziggy-js";
import {formatTelephone, mapServerErrorsToFields, usePermission} from "@/src/Utils/Utils.ts";
import {toast} from "sonner";
import Title from "@/Components/atoms/Title";
import {Button} from "@/shadcn/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {CalendarIcon, Stethoscope} from "lucide-react";
import {Text} from "@/Components/atoms/Text";
import {Input} from "@/shadcn/ui/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/shadcn/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {Calendar} from "@/shadcn/ui/calendar.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/ui/select.tsx";
import {Separator} from "@/shadcn/ui/separator.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Icon} from "@/Components/atoms/Icon.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/shadcn/ui/avatar.tsx";
import Image from "@/Components/atoms/Image.tsx";

type EditProps = {
    paciente: Paciente
}

const editPacienteSchema = pacienteSchema.omit({cedula: true})

const Edit = ({paciente}: EditProps) => {

    const {router, isProcessing} = useInertiaSubmit()
    const can = usePermission()

    const pacienteForm = useForm<z.infer<typeof editPacienteSchema>>({
        resolver: zodResolver(editPacienteSchema),
        defaultValues: {
            apellido: paciente.apellido ?? '',
            cedula: paciente.cedula ?? '',
            direccion: paciente.direccion ?? '',
            edad: paciente.edad ?? 0,
            enfermedad_actual: paciente.enfermedad_actual ?? '',
            fecha_nacimiento: new Date(paciente.fecha_nacimiento ?? ''),
            motivo_consulta: paciente.motivo_consulta ?? '',
            nombre: paciente.nombre ?? '',
            ocupacion: paciente.ocupacion ?? '',
            peso: paciente.peso ?? 0,
            sexo: paciente.sexo ?? '',
            telefono: paciente.telefono ?? '',
            informacion_emergencia: {
                contacto: paciente.informacion_emergencia?.contacto ?? '',
                telefono: paciente.informacion_emergencia?.telefono ?? ''
            }
        },
    })

    const handleSubmit = (values: z.infer<typeof editPacienteSchema>) => {

        const endpoint = route('pacientes.update', {paciente: paciente.id})

        const data = {
            _method: 'patch',
            ...values
        }

        router.post(endpoint, data, {
            onError: errors => {
                mapServerErrorsToFields(pacienteForm, errors);
            },
            onSuccess: page => {
                router.reload({only: ['paciente']})
            }
        })
    }

    const handleDropFile = (files: File[]) => {
        if (files.length == 0 || files.length > 1) toast.error('Debes elegir solo un archivo.')

        pacienteForm.setValue('foto', files[0], {shouldDirty: true, shouldTouch: true, shouldValidate: true})
    }

    return (
        <AuthLayout title={'Pacientes - Editar'}>
            <ScrollArea className={'h-full bg-white'}>
                <Form {...pacienteForm}>
                    <form onSubmit={pacienteForm.handleSubmit(handleSubmit)}
                          className={'h-full flex flex-col pl-6 pr-6 lg:pl-48 lg:pr-40'}>
                        <div className={'flex justify-between items-center pt-8 pb-10'}>
                            <div>
                                <Title level={'h3'}>Editar paciente</Title>
                            </div>
                        </div>

                        <section className={'grid grid-cols-1 sm:grid-cols-4 flex-1 gap-12'}>
                            <div className={'col-span-1'}>


                                <FormField render={({field}) => (
                                    <FormItem>
                                        <Avatar className={'w-full h-auto shadow-inner rounded-none'}>
                                            <Image src={field.value}/>
                                            <AvatarFallback>
                                                <Avatar className={'w-full h-auto shadow-inner rounded-none'}>
                                                    <AvatarImage src={paciente.foto}/>
                                                    <AvatarFallback></AvatarFallback>
                                                </Avatar>
                                            </AvatarFallback>
                                        </Avatar>
                                        <FormControl>
                                            <Input type={'file'} name={field.name} onChange={field.onChange}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'foto'} control={pacienteForm.control}/>

                                <div className={'p-6'}>

                                    <Title>Asignado a</Title>
                                    <div className={'flex gap-2'}>
                                        <Icon>
                                            <Stethoscope className={'size-6'}/>
                                        </Icon>
                                        <Text>
                                            {`${paciente.medico_tratante?.profile?.nombres} ${paciente.medico_tratante?.profile?.apellidos}`}
                                        </Text>
                                    </div>
                                </div>
                            </div>

                            <div className={'col-span-3 border rounded-lg p-6'}>
                                <div className={'grid grid-cols-1 sm:grid-cols-2 gap-3'}>


                                    <Title className={'col-span-full'} level={'h5'}>Información del paciente</Title>


                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Cédula</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={true}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={"cedula"} control={pacienteForm.control}/>

                                    <FormField render={({field}) => (
                                        <FormItem className={'col-start-1'}>
                                            <FormLabel>Nombre</FormLabel>
                                            <FormControl>
                                                <Input {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={"nombre"} control={pacienteForm.control}/>

                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Apellido</FormLabel>
                                            <FormControl>
                                                <Input {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={"apellido"} control={pacienteForm.control}/>

                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Ocupación</FormLabel>
                                            <FormControl>
                                                <Input {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={"ocupacion"} control={pacienteForm.control}/>

                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Teléfono <span
                                                className={'text-slate-400'}>(Opcional)</span></FormLabel>
                                            <FormControl>
                                                <Input name={field.name} value={field.value} disabled={field.disabled} ref={field.ref} onBlur={field.onBlur} onChange={({target: {value}}) => field.onChange(formatTelephone(value))} autoComplete='tel' type='tel'/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={"telefono"} control={pacienteForm.control}/>

                                    <FormField render={({field}) => (
                                        <FormItem className={'col-span-full'}>
                                            <FormLabel>Dirección</FormLabel>
                                            <FormControl>
                                                <Input {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={"direccion"} control={pacienteForm.control}/>

                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Fecha de nacimiento</FormLabel>
                                            <div>


                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[240px] pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "P")
                                                                ) : (
                                                                    <span>Selecciona una fecha</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={field.disabled}
                                                            initialFocus
                                                            captionLayout="dropdown"
                                                            classNames={{
                                                                day_hidden: "invisible",
                                                                dropdown: "rounded-md bg-popover text-popover-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                                                                caption_dropdowns: "flex gap-4",
                                                                vhidden: "hidden",
                                                                caption_label: "hidden",
                                                            }}
                                                            fromYear={1900}
                                                            toYear={2100}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={"fecha_nacimiento"} control={pacienteForm.control}/>

                                    <div className={'grid grid-cols-2 gap-3'}>

                                        <FormField render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Edad</FormLabel>
                                                <FormControl>
                                                    <Input {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={"edad"} control={pacienteForm.control}/>

                                        <FormField render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Sexo</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Seleccione..."/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="F">Femenino</SelectItem>
                                                        <SelectItem value="M">Masculino</SelectItem>
                                                        <SelectItem value="NI">No indicado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={"sexo"} control={pacienteForm.control}/>
                                    </div>

                                    <div className={'grid grid-cols-2 gap-3'}>
                                        <FormField render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Peso</FormLabel>
                                                <div className={'flex items-baseline gap-2'}>
                                                    <FormControl>
                                                        <Input {...field}/>
                                                    </FormControl>
                                                    <Text>Kg</Text>
                                                </div>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={"peso"} control={pacienteForm.control}/>
                                    </div>

                                    <Separator className={'col-span-full my-6'}/>

                                    <Title className={'col-span-full'} level={'h5'}>Información médica</Title>

                                    <FormField render={({field}) => (
                                        <FormItem className={'col-span-full'}>
                                            <FormLabel>Diagnóstico<span
                                                className={'text-slate-400'}> (Opcional)</span></FormLabel>
                                            <FormControl>
                                                <Textarea {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={"motivo_consulta"} control={pacienteForm.control}/>

                                    <FormField render={({field}) => (
                                        <FormItem className={'col-span-full'}>
                                            <FormLabel>Tratamiento indicado<span
                                                className={'text-slate-400'}> (Opcional)</span></FormLabel>
                                            <FormControl>
                                                <Textarea {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={"enfermedad_actual"} control={pacienteForm.control}/>

                                </div>

                            </div>
                        </section>
                        <div className='flex justify-end gap-x-3 py-3'>
                            <Button type={'button'} variant={'outline'} onClick={() => {
                                router.visit(route('pacientes.show', {paciente: paciente.id}))
                            }}>Cancelar</Button>
                            <Button type={'submit'} className={'bg-indigo-500'}
                                    disabled={!pacienteForm.formState.isDirty || isProcessing}>Guardar</Button>
                        </div>
                    </form>
                </Form>
            </ScrollArea>
        </AuthLayout>
    )
}

export default Edit
