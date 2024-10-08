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
import {MoreHorizontal, SquarePlus, Trash2} from "lucide-react";
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
import Surface from "@/Components/atoms/Surface";
import SecuenciaTratamientoSchema, {TratamientoRealizadoSchema, TratamientoRealizadoDefaults} from "@/FormSchema/Historia/SecuenciaTratamientoSchema";
import {formatDate} from 'date-fns'
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {route} from "ziggy-js";

interface SecuenciaTratamientoSectionProps {
    form: UseFormReturn<z.infer<typeof SecuenciaTratamientoSchema>>
}

const SecuenciaTratamientoSection = ({form}: SecuenciaTratamientoSectionProps) => {

    const [openAddTratamientoPopover, setOpenAddTratamientoPopover] = React.useState<boolean>(false)
    const {isProcessing, router} = useInertiaSubmit()

    const tratamientoForm = useForm<z.infer<typeof TratamientoRealizadoSchema>>({
        resolver: zodResolver(TratamientoRealizadoSchema),
        defaultValues: TratamientoRealizadoDefaults
    })

    const onAddTratamiento = (values: z.infer<typeof TratamientoRealizadoDefaults>) => {
        const oldData = form.getValues().secuencia_tratamiento
        form.setValue('secuencia_tratamiento', [...oldData, values], {
            shouldDirty: true, shouldTouch: true, shouldValidate: true
        })
        tratamientoForm.reset()
        setOpenAddTratamientoPopover(false)
    }

    const onDeleteModificacion = (index) => {
        const newData = form.getValues().secuencia_tratamiento
        newData.splice(index, 1)
        form.setValue('secuencia_tratamiento', [...newData], {
            shouldDirty: true, shouldTouch: true, shouldValidate: true
        })
    }

    const onSubmitSecuencia = (values: z.infer<typeof SecuenciaTratamientoSchema>) => {

        const endpoint: string = route('historias.odontologica.secuenciatratamiento.update', {
            historia: values.historia_id
        })

        router.patch(endpoint, {...values}, {
            onError: errors => {
                // TODO Show errors
                console.log(errors)
            },
            onSuccess: page => {
                form.reset(values)
            }
        })
    }

    return (
        <Surface className={'w-full px-6 min-h-screen'}>
            <Title level={'title-lg'}>Secuencia del Plan de Tratamiento</Title>

            <section className={'my-6 relative'}>
                <header>
                    <Title level={'title-md'}>Secuencia del plan de tratamiento</Title>
                </header>

                {/*actions*/}
                <div className={'sticky flex justify-end right-0 top-0'}>

                    <Popover open={openAddTratamientoPopover} onOpenChange={setOpenAddTratamientoPopover}>
                        <PopoverTrigger type={'button'}
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
                                    <DataTable columns={columns} data={field.value}/>
                                </FormItem>
                            )} name={'secuencia_tratamiento'} control={form.control}/>

                            <div className={'flex justify-end'}>
                                <Button type={'submit'} disabled={isProcessing || !form.formState.isDirty}>Guardar</Button>
                            </div>
                        </form>
                    </Form>
                </SecuenciaPlanTratamientoTableContext.Provider>

            </section>
        </Surface>
    )
}

const SecuenciaPlanTratamientoTableContext = React.createContext<{onDeleteModificacion: (index: number) => void}>({onDeleteModificacion: (_index: number) => {}})

const columnHelper = createColumnHelper<z.infer<typeof TratamientoRealizadoSchema>>()

const columns: ColumnDef<z.infer<typeof TratamientoRealizadoSchema>>[] = [
    columnHelper.accessor(originalRow => formatDate(originalRow.fecha, 'eee, PP'), {
        id: 'fecha',
        header: 'Fecha'
    }),
    columnHelper.accessor(originalRow => originalRow.diente, {
        id: 'diente',
        header: 'Diente'
    }),
    columnHelper.accessor(originalRow => originalRow.tratamiento, {
        id: 'tratamiento',
        header: 'Tratamientos Realizado'
    }),
    columnHelper.display({
        id: 'actions',
        cell: ({row}) => <TratamientoRealizadoMenu row={row}/>
    }),
]

const TratamientoRealizadoMenu = ({row}: {row: Row<z.infer<typeof TratamientoRealizadoSchema>>}) => {
    const context = React.useContext(SecuenciaPlanTratamientoTableContext)

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
                <DropdownMenuItem className={'text-rose-600'} onClick={() => context.onDeleteModificacion(row.index)}><Trash2 className={'size-4 me-1'}/>Eliminar modificación</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SecuenciaTratamientoSection
