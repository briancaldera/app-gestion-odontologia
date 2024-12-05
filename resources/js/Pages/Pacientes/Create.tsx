import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {useForm} from "react-hook-form";
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {pacienteSchema} from '@/FormSchema/Pacientes/CreateSchema.ts'
import {Button} from "@/shadcn/ui/button.tsx";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Link, usePage} from "@inertiajs/react";
import {Input} from "@/shadcn/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/ui/select.tsx";
import {Text} from "@/Components/atoms/Text";
import {Popover, PopoverContent, PopoverTrigger} from "@/shadcn/ui/popover.tsx";
import {Calendar} from "@/shadcn/ui/calendar.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon, Loader2, Stethoscope} from "lucide-react";
import ProfilePicturePicker from "@/Components/molecules/ProfilePicturePicker.tsx";
import {toast} from "sonner";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import User from "@/src/models/User.ts";
import {route} from "ziggy-js";
import {Separator} from "@/shadcn/ui/separator.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import React from "react";

const Create = () => {

    const {auth} = usePage().props
    const {router, isProcessing} = useInertiaSubmit()

    const pacienteForm = useForm<z.infer<typeof pacienteSchema>>({
        resolver: zodResolver(pacienteSchema),
        defaultValues: {
            apellido: "",
            cedula: "",
            direccion: "",
            edad: 0,
            enfermedad_actual: '',
            foto: null,
            informacion_emergencia: {
                contacto: "",
                telefono: ""
            },
            motivo_consulta: "",
            nombre: "",
            ocupacion: "",
            peso: 0,
            sexo: "",
            telefono: ''
        },
    })

    const handleSubmit = (values: z.infer<typeof pacienteSchema>) => {
        const endpoint = route('pacientes.store')

        router.post(endpoint, values, {
            onError: errors => {
                mapServerErrorsToFields(pacienteForm, errors);
            }
        })
    }

    const handleDropFile = (files: File[]) => {
        if (files.length == 0 || files.length > 1) toast.error('Debes elegir solo un archivo.')

        pacienteForm.setValue('foto', files[0], {shouldDirty: true, shouldTouch: true, shouldValidate: true})
    }

    return (
        <AuthLayout title={'Pacientes - Registrar nuevo paciente'}>
            <ScrollArea className={'h-full bg-white'}>
                <Form {...pacienteForm}>
                    <form onSubmit={pacienteForm.handleSubmit(handleSubmit)}
                          className={'h-full flex flex-col pl-6 pr-6 lg:pl-48 lg:pr-40'}>
                        <div className={'flex justify-between items-center pt-8 pb-10'}>
                            <div>
                                <Title level={'h3'}>Crear paciente</Title>
                            </div>
                        </div>

                        <section className={'grid grid-cols-1 sm:grid-cols-4 flex-1 gap-12'}>
                            <div className={'col-span-1'}>
                                <div>
                                    <FormField render={({field}) => (
                                        <FormItem
                                            className={'bg-slate-100 rounded-lg aspect-square p-2 flex justify-center items-center'}>
                                            <FormControl>
                                                <ProfilePicturePicker src={field.value} onDrop={handleDropFile}
                                                                      className={'size-32'}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={'foto'} control={pacienteForm.control}/>
                                    {/*<FormField render={({field}) => (*/}
                                    {/*    <FormItem className={'h-full flex'}>*/}

                                    {/*        <FormControl>*/}
                                    {/*            <Dropzone onDropAccepted={(_ ,event) => field.onChange(event)} maxFiles={1} minSize={5000} disabled={field.disabled} accept={pictureFileFormats}>*/}
                                    {/*                {*/}
                                    {/*                    ({getRootProps, getInputProps}) => (*/}
                                    {/*                        <section className={'border-2 border-slate-300 border-dashed basis-full flex flex-col justify-center items-center'} {...getRootProps()}>*/}
                                    {/*                            <input {...getInputProps()} />*/}
                                    {/*                            <ImageIcon className={'size-20 md:size-12 text-slate-300'}/>*/}
                                    {/*                            <Text className={'text-indigo-500 font-bold'}>Sube una foto</Text>*/}
                                    {/*                            <Image src={field.value} className={'w-full h-auto'}/>*/}
                                    {/*                        </section>*/}
                                    {/*                    )*/}
                                    {/*                }*/}
                                    {/*            </Dropzone>*/}
                                    {/*        </FormControl>*/}
                                    {/*        <FormMessage/>*/}
                                    {/*    </FormItem>*/}
                                    {/*)} name={'foto'} control={pacienteForm.control}/>*/}
                                </div>
                                <div className={'p-6'}>

                                    <Title>Asignado a</Title>
                                    <div className={'flex gap-2'}>
                                        <Stethoscope className={'size-10'}/>
                                        <Text>{`${(auth.user as User).profile.nombres} ${(auth.user as User).profile.apellidos}`}
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
                                                <Input {...field}/>
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

                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Fecha de nacimiento</FormLabel>
                                            <div>


                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
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
                                                <Input {...field} placeholder='Formato: 0414-1234567'/>
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

                                    <div className={'col-span-full grid grid-cols-subgrid'}>
                                        <Title className={'col-span-full'}>En casos de emergencia contactar a</Title>


                                        <FormField render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Nombre</FormLabel>
                                                <FormControl>
                                                    <Input {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={"informacion_emergencia.contacto"} control={pacienteForm.control}/>

                                        <FormField render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Teléfono</FormLabel>
                                                <FormControl>
                                                    <Input {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={"informacion_emergencia.telefono"} control={pacienteForm.control}/>
                                    </div>

                                    <Separator className={'col-span-full my-6'}/>

                                    <Title className={'col-span-full'} level={'h5'}>Información clínica</Title>

                                    <FormField render={({field}) => (
                                        <FormItem className={'col-span-full'}>
                                            <FormLabel>Diagnóstico<span
                                                className={'text-slate-400'}> (Opcional)</span></FormLabel>
                                            <FormControl>
                                            <Textarea
                                                    placeholder={''} {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={"motivo_consulta"} control={pacienteForm.control}/>

                                    <FormField render={({field}) => (
                                        <FormItem className={'col-span-full'}>
                                            <FormLabel>Tratamiento indicado<span
                                                className={'text-slate-400'}> (Opcional)</span></FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={''} {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={"enfermedad_actual"} control={pacienteForm.control}/>

                                </div>

                            </div>
                        </section>
                        <div className={'flex justify-end gap-x-3 py-3'}>
                            <Button type={'button'} variant='outline' disabled={isProcessing} asChild><Link
                                href={route('pacientes.index')}>Cancelar</Link></Button>
                            <Button type={'submit'} className={'bg-indigo-500'}
                                    disabled={!pacienteForm.formState.isDirty || isProcessing}>
                                <Loader2 className='mr-2 animate-spin' hidden={!isProcessing}/>
                                Registrar paciente</Button>
                        </div>
                    </form>
                </Form>
            </ScrollArea>
        </AuthLayout>
    )
}

export default Create
