import {z} from 'zod'
import {ColumnDef, createColumnHelper, Row} from "@tanstack/react-table";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/shadcn/ui/dropdown-menu";
import {Button} from "@/shadcn/ui/button";
import {CircleCheckBig, MoreHorizontal, SquarePlus, Trash2} from "lucide-react";
import Title from "@/Components/atoms/Title";
import {Popover, PopoverContent, PopoverTrigger} from "@/shadcn/ui/popover";
import {Icon} from "@/Components/atoms/Icon.tsx";
import Heading from "@/Components/atoms/Heading";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import DatePicker from "@/Components/molecules/DatePicker";
import Input from "@/Components/atoms/Input";
import Textarea from "@/Components/atoms/Textarea";
import {OutlinedButton} from "@/Components/molecules/OutlinedButton";
import {DataTable} from "@/Components/molecules/DataTable";
import {secuenciaTratamientoSchema, tratamientoRealizadoSchema} from "@/FormSchema/Historia/SecuenciaTratamientoSchema";
import {formatDate} from 'date-fns'
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {route} from "ziggy-js";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import {toast} from "sonner";
import {TratamientoRealizado} from "@/src/models/HistoriaOdontologica.ts";
import {usePermission} from "@/src/Utils/Utils.ts";
import {Link, usePage} from "@inertiajs/react";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {Text} from "@/Components/atoms/Text";
import Profile from "@/src/models/Profile.ts";
import axios from "axios";
import {Avatar, AvatarFallback, AvatarImage} from "@/shadcn/ui/avatar.tsx";
import {Skeleton} from "@/shadcn/ui/skeleton.tsx";

interface SecuenciaTratamientoSectionProps {
    form: UseFormReturn<z.infer<typeof secuenciaTratamientoSchema>>
}

const SecuenciaTratamientoSection = () => {

    const {user} = usePage().props.auth

    const {historia} = React.useContext(HistoriaEditorContext)

    const isDisabled = historia.autor_id !== user?.id

    const form = useForm<z.infer<typeof secuenciaTratamientoSchema>>({
        resolver: zodResolver(secuenciaTratamientoSchema),
        defaultValues: {
            secuencia_tratamiento: []
        },
        disabled: isDisabled,
    })

    const [openAddTratamientoPopover, setOpenAddTratamientoPopover] = React.useState<boolean>(false)
    const {isProcessing, router} = useInertiaSubmit()

    const {secuencia_tratamiento} = historia.historia_odontologica!

    const tratamientoForm = useForm<z.infer<typeof tratamientoRealizadoSchema>>({
        resolver: zodResolver(tratamientoRealizadoSchema),
        defaultValues: {
            diente: "", fecha: '', tratamiento: ''
        },
        disabled: isDisabled
    })

    const onAddTratamiento = (values: z.infer<typeof tratamientoRealizadoSchema>) => {
        const oldData = form.getValues().secuencia_tratamiento
        form.setValue('secuencia_tratamiento', [...oldData, values], {
            shouldDirty: true, shouldTouch: true, shouldValidate: true
        })
        tratamientoForm.reset()
        setOpenAddTratamientoPopover(false)
    }

    const onDeleteModificacion = (index) => {
        const newData = form.getValues().secuencia_tratamiento
        newData.splice(index - historia.historia_odontologica?.secuencia_tratamiento.length, 1)
        form.setValue('secuencia_tratamiento', [...newData], {
            shouldDirty: true, shouldTouch: true, shouldValidate: true
        })
    }

    const onSubmitSecuencia = (values: z.infer<typeof secuenciaTratamientoSchema>) => {

        const endpoint: string = route('historias.odontologica.secuenciatratamiento.update', {
            historia: historia.id
        })

        router.patch(endpoint, {...values}, {
            onError: errors => {
                toast.error('Ocurrió un error al intentar actualizar la historia. Por favor, revise la información suministrada')
            },
            onSuccess: page => {
                form.reset()
                router.reload()
            }
        })
    }

    const onDropFile = ([file]: [File]) => {
        file.preview = URL.createObjectURL(file)

        // consentimientoForm.setValue('modificaciones_consentimiento', file, {
        //     shouldDirty: true,
        //     shouldTouch: true,
        //     shouldValidate: true
        // })
    }

    return (
        <ScrollArea className={'bg-white w-full p-6 h-[83vh]'}>
            <Title level={'title-lg'}>Secuencia del Plan de Tratamiento</Title>

            <section className={'my-6 relative'}>
                <header>
                    <Title level={'title-md'}>Secuencia del plan de tratamiento</Title>
                </header>

                {/*actions*/}
                <div className={'sticky flex justify-end right-0 top-0'}>

                    <Popover open={openAddTratamientoPopover} onOpenChange={setOpenAddTratamientoPopover}>
                        <PopoverTrigger type={'button'} disabled={form.formState.disabled}
                                        className={'border rounded-full size-12 flex items-center justify-center shadow'}>
                            <Icon className={'flex-none'}>
                                <SquarePlus/>
                            </Icon>
                        </PopoverTrigger>
                        <PopoverContent align={'end'}>
                            <section className={'grid grid-cols-2'}>
                                <header className={'col-span-full'}>
                                    <Heading level={'h6'}>Agregar tratamiento realizado</Heading>
                                </header>

                                <Form {...tratamientoForm} className={'col-span-full'}>
                                    <form onSubmit={tratamientoForm.handleSubmit(onAddTratamiento)}
                                          className={'grid grid-cols-3 col-span-full gap-5'}>

                                        <div className={'col-span-2'}>
                                            <DatePicker control={tratamientoForm.control} label={'Fecha'} name={'fecha'}/>
                                        </div>

                                        <FormField render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Diente</FormLabel>
                                                <FormControl>
                                                    <Input {...field}/>
                                                </FormControl>
                                                <FormMessage className={'text-xs'}/>
                                            </FormItem>
                                        )} name={'diente'} control={tratamientoForm.control} className={'col-span-1'}/>

                                        <div className={'col-span-full'}>
                                            <FormField render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Tratamiento</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field} />
                                                    </FormControl>
                                                    <FormMessage className={'text-xs'}/>
                                                </FormItem>
                                            )} name={'tratamiento'} control={tratamientoForm.control}/>
                                        </div>

                                        <div className={'col-span-full flex justify-end gap-2'}>
                                            <OutlinedButton label={'Limpiar'} onClick={() => tratamientoForm.reset()}/>
                                            <Button type={'submit'}>
                                                Agregar
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </section>
                        </PopoverContent>
                    </Popover>
                </div>

                <SecuenciaPlanTratamientoTableContext.Provider value={{onDeleteModificacion: onDeleteModificacion}}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmitSecuencia)}>
                            <FormField render={({field}) => (
                                <FormItem>
                                    <DataTable columns={columns} data={[...secuencia_tratamiento, ...field.value]}/>
                                </FormItem>
                            )} name={'secuencia_tratamiento'} control={form.control}/>

                            <div className={'flex justify-end items-center gap-x-2'}>
                                {
                                    form.formState.isDirty &&
                                    <Text className={'text-rose-500'}>Posees cambios sin guardar!</Text>
                                }
                                <Button type={'submit'} disabled={isProcessing || !form.formState.isDirty}>Guardar</Button>
                            </div>
                        </form>
                    </Form>
                </SecuenciaPlanTratamientoTableContext.Provider>

            </section>
        </ScrollArea>
    )
}

const SecuenciaPlanTratamientoTableContext = React.createContext<{onDeleteModificacion: (index: number) => void}>({onDeleteModificacion: (_index: number) => {}})

const columnHelper = createColumnHelper<TratamientoRealizado>()

const columns: ColumnDef<TratamientoRealizado>[] = [
    columnHelper.accessor(originalRow => formatDate(originalRow.fecha, 'P'), {
        id: 'fecha',
        header: 'Fecha',
        cell: ({row, cell}) => {
            return (
                <div className={!row.original.id ? 'text-rose-600' : ''}>
                    {formatDate(row.original.fecha, 'P')}
                </div>
            )
        }
    }),
    columnHelper.accessor(originalRow => originalRow.diente, {
        id: 'diente',
        header: 'Diente',
        cell: ({row}) => {
            return (
                <div className={!row.original.id ? 'text-rose-600' : ''}>
                    {row.original.diente}
                </div>
            )
        },
    }),
    columnHelper.accessor(originalRow => originalRow.tratamiento, {
        id: 'tratamiento',
        header: 'Tratamientos Realizado',
        cell: ({row}) => {
            return (
                <div className={!row.original.id ? 'text-rose-600' : ''}>
                    {row.original.tratamiento}
                </div>
            )
        }
    }),
    columnHelper.accessor(originalRow => originalRow.approver_id, {
        enableResizing: false,
        size: 200,
        cell: ({cell, row, column}) => {

            const [profile, setProfile] = React.useState<Profile | null>(null)
            React.useEffect(() => {

                if (row.original.approver_id) {
                    axios.get(route('api.v1.profiles.show', {profile: row.original.approver_id}), ).then((res) => {
                        const profile = res.data.data as Profile
                        setProfile(profile)
                    })
                }
            }, []) // [row]


            if (row.original.approver_id) {
                return (
                    <div style={{width: `${column.getSize()}px`}} className='rounded-lg h-full p-2 flex gap-x-2 justify-center items-center border'>
                        {
                            profile ? (
                                <>
                                    <Avatar className='size-10'>
                                        <AvatarImage src={profile?.picture_url}/>
                                        <AvatarFallback></AvatarFallback>
                                    </Avatar>
                                    <Text className={'truncate'}>{`${profile?.nombres} ${profile?.apellidos}`}</Text>
                                </>
                            ) : (
                                <>
                                    <Skeleton className='size-10 rounded-full'/>
                                    <Skeleton className='flex-1 h-[12pt]'/>
                                </>
                            )
                        }


                    </div>
                )
            } else {
                return (
                    <div style={{width: `${column.getSize()}px`}}></div>
                )
            }
        },
        id: 'approver_id',
        header: 'Nombre del docente'
    }),
    columnHelper.accessor(originalRow => originalRow.approval, {
        cell: (props) => {
            const can = usePermission()
            const {historia, disabled} = React.useContext(HistoriaEditorContext)

            if (props.row.original.approval) {
                return (
                    <div className='rounded-lg h-full bg-emerald-100 p-2 flex gap-x-2 justify-center items-center'>
                        <CircleCheckBig className={'size-4'}/><Text>Aprobado</Text>
                    </div>
                )
            } else if (can('historias-approve-treatment') && !!props.row.original.id) {
                return (
                    <div className={'flex justify-center'}>
                        <Button asChild>
                            <Link method='post' as="button" type="button"
                                  href={route('historias.odontologica.secuenciatratamiento.approve', {
                                      historia: historia.id,
                                      id: props.row.original.id
                                  })}>
                                <CircleCheckBig className='mr-2'/>
                                Aprobar
                            </Link>
                        </Button>
                    </div>
                )
            }

            return null
        },
        id: 'approval',
        header: 'Firma'
    }),
    columnHelper.display({
        id: 'actions',
        cell: ({row}) => <TratamientoRealizadoMenu row={row}/>
    }),
]

const TratamientoRealizadoMenu = ({row}: {row: Row<TratamientoRealizado>}) => {
    const context = React.useContext(SecuenciaPlanTratamientoTableContext)
    const can = usePermission()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú de tratamiento</span>
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                {
                    !row.original.id && (
                        <DropdownMenuItem className={'text-rose-600'}
                                          onClick={() => context.onDeleteModificacion(row.index)}><Trash2
                            className={'size-4 me-1'}/>Eliminar tratamiento</DropdownMenuItem>
                    )
                }
                {
                    row.original.id && can('historias-full-control') && (
                        <DropdownMenuItem className={'text-rose-600'}
                                          onClick={() => {/* todo setup */}}><Trash2
                            className={'size-4 me-1'}/>Forzar eliminar tratamiento</DropdownMenuItem>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SecuenciaTratamientoSection
