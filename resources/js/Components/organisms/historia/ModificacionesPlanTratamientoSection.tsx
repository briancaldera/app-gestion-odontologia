import {useForm, UseFormReturn} from "react-hook-form";
import {z} from 'zod'
import Title from "@/Components/atoms/Title";
import React from "react";
import Surface from "@/Components/atoms/Surface";
import {zodResolver} from "@hookform/resolvers/zod";
import {Popover, PopoverContent, PopoverTrigger} from "@/shadcn/ui/popover";
import {Icon} from "@/Components/atoms/Icon.tsx";
import {CircleCheckBig, CircleX, MoreHorizontal, SquarePlus, Trash2} from "lucide-react";
import Heading from "@/Components/atoms/Heading";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import Input from "@/Components/atoms/Input";
import Textarea from "@/Components/atoms/Textarea";
import {OutlinedButton} from "@/Components/molecules/OutlinedButton";
import {Button} from "@/shadcn/ui/button";
import DatePicker from "@/Components/molecules/DatePicker";
import {DataTable} from "@/Components/molecules/DataTable";
import {ColumnDef, createColumnHelper, Row} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/shadcn/ui/dropdown-menu";
import {
    modificacionesConsentimientoSchema,
    modificacionesPlanTratamientoSchema,
    modificacionPlanTratamientoSchema
} from "@/FormSchema/Historia/ModificacionesPlanTratamientoSchema";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {formatDate} from 'date-fns'
import {route} from "ziggy-js";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import {ModificacionTratamiento} from "@/src/models/HistoriaOdontologica.ts";
import {usePermission} from "@/src/Utils/Utils.ts";
import {Link} from "@inertiajs/react";
import {toast} from "sonner";
import {Text} from "@/Components/atoms/Text";
import Dropzone from "react-dropzone";
import {pictureFileFormats} from "@/Components/molecules/ProfilePicturePicker.tsx";

interface ModificacionesPlanTratamientoSectionProps {
    form: UseFormReturn<z.infer<typeof modificacionesPlanTratamientoSchema>>
}

const ModificacionesPlanTratamientoSection = ({form}: ModificacionesPlanTratamientoSectionProps) => {

    const {historia, disabled} = React.useContext(HistoriaEditorContext)

    const {router} = useInertiaSubmit()
    const [openAddModificacionPopover, setOpenAddModificacionPopover] = React.useState<boolean>(false)

    const {modificaciones_plan_tratamiento, modificaciones_consentimiento} = historia!.historia_odontologica!

    const modificacionForm = useForm<z.infer<typeof modificacionPlanTratamientoSchema>>({
        resolver: zodResolver(modificacionPlanTratamientoSchema),
        defaultValues: {
            diente: "", fecha: '', tratamiento: ''
        },
        disabled: disabled
    })

    const consentimientoForm = useForm<z.infer<typeof modificacionesConsentimientoSchema>>({
        resolver: zodResolver(modificacionesConsentimientoSchema),
        defaultValues: {
            modificaciones_consentimiento: null
        },
        disabled: disabled
    })

    const onSubmitConsentimiento = (values: z.infer<typeof modificacionesConsentimientoSchema>) => {
        const endpoint = route('historias.odontologica.modificacionestratamiento.consentimiento.update', {historia: historia.id})

        const body = {
            _method: 'patch',
            ...values,
        }

        router.post(endpoint, body, {
            onError: errors => {

            },
            onSuccess: page => {

            }
        })
    }

    const onAddModificacion = (values: z.infer<typeof modificacionPlanTratamientoSchema>) => {
        const oldData = form.getValues().modificaciones_plan_tratamiento
        form.setValue('modificaciones_plan_tratamiento', [...oldData, values], {
            shouldDirty: true, shouldTouch: true, shouldValidate: true
        })
        modificacionForm.reset()
        setOpenAddModificacionPopover(false)
    }

    const onDeleteModificacion = (index) => {
        const newData = form.getValues().modificaciones_plan_tratamiento
        newData.splice(index, 1)
        form.setValue('modificaciones_plan_tratamiento', [...newData], {
            shouldDirty: true, shouldTouch: true, shouldValidate: true
        })
    }

    const onSubmitModificaciones = (values: z.infer<typeof modificacionesPlanTratamientoSchema>) => {

        const endpoint = route('historias.odontologica.modificacionestratamiento.update', {
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

        consentimientoForm.setValue('modificaciones_consentimiento', file, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    return (
        <Surface className={'px-6'}>
            <Title level={'title-lg'}>Modificaciones del Plan de Tratamiento</Title>

            <section className={'my-6 relative'}>

                {/*actions*/}
                <div className={'sticky flex justify-end right-0 top-0'}>

                    <Popover open={openAddModificacionPopover} onOpenChange={setOpenAddModificacionPopover}>
                        <PopoverTrigger type={'button'} disabled={form.formState.disabled}
                                        className={'border rounded-full size-12 flex items-center justify-center shadow'}>
                            <Icon className={'flex-none'}>
                                <SquarePlus/>
                            </Icon>
                        </PopoverTrigger>
                        <PopoverContent align={'end'}>
                            <section className={'grid grid-cols-2'}>
                                <header className={'col-span-full'}>
                                    <Heading level={'h6'}>Agregar plan</Heading>
                                </header>

                                <Form {...modificacionForm} className={'col-span-full'}>
                                    <form onSubmit={modificacionForm.handleSubmit(onAddModificacion)}
                                          className={'grid grid-cols-3 col-span-full gap-5'}>

                                        <div className={'col-span-2'}>
                                            <DatePicker control={modificacionForm.control} label={'Fecha'}
                                                        name={'fecha'}/>
                                        </div>

                                        <FormField render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Diente</FormLabel>
                                                <FormControl>
                                                    <Input {...field}/>
                                                </FormControl>
                                                <FormMessage className={'text-xs'}/>
                                            </FormItem>
                                        )} name={'diente'} control={modificacionForm.control} className={'col-span-1'}/>

                                        <div className={'col-span-full'}>
                                            <FormField render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Tratamiento</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field} />
                                                    </FormControl>
                                                    <FormMessage className={'text-xs'}/>
                                                </FormItem>
                                            )} name={'tratamiento'} control={modificacionForm.control}/>
                                        </div>

                                        <div className={'col-span-full flex justify-end gap-2'}>
                                            <OutlinedButton label={'Limpiar'} onClick={() => {
                                                modificacionForm.reset()
                                            }}/>
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

                <ModificacionesPlanTratamientoTableContext.Provider
                    value={{onDeleteModificacion: onDeleteModificacion}}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmitModificaciones)}>
                            <FormField render={({field}) => (
                                <FormItem>
                                    <DataTable columns={columns}
                                               data={[...modificaciones_plan_tratamiento, ...field.value]}/>
                                </FormItem>
                            )} name={'modificaciones_plan_tratamiento'} control={form.control}/>
                            <div className={'flex justify-end'}>
                                <Button type={'submit'} disabled={disabled || !form.formState.isDirty}>Guardar</Button>
                            </div>
                        </form>
                    </Form>
                </ModificacionesPlanTratamientoTableContext.Provider>

                <div className={'space-y-2'}>
                    <Title className=''>Aceptación de modificación del paciente</Title>
                    <div className={'flex justify-center'}>

                        {
                            modificaciones_consentimiento.length > 0 ? (
                                <a href={modificaciones_consentimiento[0]} target={'_blank'}>

                                <div className='border rounded-lg p-6 flex flex-col justify-center'>
                                    <div className={'flex'}>

                                    <CircleCheckBig className={'mr-2'}/><Text>Archivo subido</Text>
                                    </div>
                                    <Text>Haz clic para abrir</Text>
                                </div>
                                </a>
                            ) : (
                                <div className='border rounded-lg p-6 flex flex-col justify-center gap-y-2'>
                                    <div className={'flex justify-center'}>
                                        <CircleX className={'mr-2'}/><Text>Sin archivo</Text>

                                    </div>
                                    <Form {...consentimientoForm}>
                                        <form onSubmit={consentimientoForm.handleSubmit(onSubmitConsentimiento)}>
                                            <FormField render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Archivo</FormLabel>
                                                    <div className={'flex items-center'}>


                                                            <Dropzone disabled={consentimientoForm.formState.disabled} maxFiles={1} accept={pictureFileFormats} onDropAccepted={onDropFile}>
                                                                {
                                                                    ({getRootProps, getInputProps}) => (
                                                                        <div {...getRootProps()} className={'h-20'}>

                                                                            <FormControl>
                                                                                <Input type={'file'} {...getInputProps()}/>
                                                                            </FormControl>
                                                                            <FormMessage/>
                                                                            <FormDescription>Haz clic aquí para subir un archivo</FormDescription>
                                                                        </div>
                                                                    )
                                                                }

                                                            </Dropzone>

                                                        {
                                                            !!field.value && <CircleCheckBig className='ml-2'/>
                                                        }
                                                    </div>

                                                </FormItem>
                                            )} name={'modificaciones_consentimiento'}
                                                       control={consentimientoForm.control}/>
                                            <div className={'flex justify-end mt-2'}>
                                                <Button disabled={consentimientoForm.formState.disabled || !consentimientoForm.formState.isDirty}>
                                                    Guardar
                                                </Button>

                                            </div>
                                        </form>
                                    </Form>
                                </div>
                            )
                        }
                    </div>
                </div>

            </section>
        </Surface>
    )
}

const ModificacionesPlanTratamientoTableContext = React.createContext<{
    onDeleteModificacion: (number) => void
}>({
    onDeleteModificacion: (_index: number) => {
    }
})

const columnHelper = createColumnHelper<ModificacionTratamiento>()

const columns: ColumnDef<ModificacionTratamiento>[] = [
    columnHelper.accessor(originalRow => formatDate(originalRow.fecha, 'P'), {
        id: 'fecha',
        header: _props => 'Fecha',
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
        }
    }),
    columnHelper.accessor(originalRow => originalRow.tratamiento, {
        id: 'tratamiento',
        header: 'Tratamiento modificado',
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
        cell: ({cell, row}) => (<td style={{width: cell.column.getSize()}}>{row.original.approver_id ?? ''}</td>),
        id: 'approver_id',
        header: 'Nombre del docente'
    }),
    columnHelper.accessor(originalRow => originalRow.approval, {
        cell: (props) => {
            const can = usePermission()
            const {historia, disabled} = React.useContext(HistoriaEditorContext)

            if (props.row.original.approval) return props.row.original.approval

            if (can('historias-approve-treatment') && !!props.row.original.id) {
                return (
                    <td className={'flex justify-center'}>
                        <Button asChild>
                            <Link method='post' as="button" type="button"
                                  href={route('historias.odontologica.modificacionestratamiento.approve', {
                                      historia: historia.id,
                                      id: props.row.original.id
                                  })}>
                                <CircleCheckBig className='mr-2'/>
                                Aprobar
                            </Link>
                        </Button>
                    </td>
                )
            }
        },
        id: 'approval',
        header: 'Firma'
    }),
    columnHelper.display({
        id: 'actions',
        cell: ({row}) => <ModificacionPlanTratamientoMenu row={row}/>
    }),
]

const ModificacionPlanTratamientoMenu = ({row}: { row: Row<ModificacionTratamiento> }) => {
    const context = React.useContext(ModificacionesPlanTratamientoTableContext)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú de tratamiento</span>
                    <MoreHorizontal className="size-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                {
                    !row.original.id && (
                        <DropdownMenuItem className={'text-rose-600'}
                                          onClick={() => context.onDeleteModificacion(row.index)}><Trash2
                            className={'size-4 me-1'}/>Eliminar modificación</DropdownMenuItem>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ModificacionesPlanTratamientoSection
