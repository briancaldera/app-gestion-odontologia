import {useForm, UseFormReturn} from "react-hook-form";
import {z} from 'zod'
import HistoriaOdontologicaSchema, {
    ModificacionPlanTratamientoDefaults,
    ModificacionPlanTratamientoSchema,
} from '@/FormSchema/Historia/HistoriaOdontologicaSchema'
import Title from "@/Components/atoms/Title";
import React from "react";
import Surface from "@/Components/atoms/Surface";
import {zodResolver} from "@hookform/resolvers/zod";
import {Popover, PopoverContent, PopoverTrigger} from "@/shadcn/ui/popover";
import {Icon} from "@/Components/atoms/Icon";
import {MoreHorizontal, SquarePlus, Trash2} from "lucide-react";
import Heading from "@/Components/atoms/Heading";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
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

interface ModificacionesPlanTratamientoSectionProps {
    form: UseFormReturn<z.infer<typeof HistoriaOdontologicaSchema>>
}

const columnHelper = createColumnHelper<z.infer<typeof ModificacionPlanTratamientoDefaults>>()

const columns: ColumnDef<z.infer<typeof ModificacionPlanTratamientoDefaults>>[] = [
    {
        accessorKey: "fecha",
        header: "Fecha",
        enableResizing: false,
        cell: ({row}) => {

            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'short',
            }

            const dateFormatted = new Intl.DateTimeFormat('es-VE', options).format(row.getValue('fecha'))
            return dateFormatted
        }
    },
    {
        accessorKey: "diente",
        header: "Diente",
        cell: ({ row }) => {

            return <div className="text-right">{row.getValue('diente')}</div>
        },

    },
    {
        accessorKey: "tratamiento",
        header: "Tratamiento",
    },
    {
        id: 'actions',
        cell: ({row}) => <ModificacionPlanTratamientoMenu row={row}/>
    }
]

const ModificacionPlanTratamientoMenu = ({row}: {row: Row<z.infer<typeof ModificacionPlanTratamientoSchema>>}) => {
    const context = React.useContext(ModificacionesPlanTratamientoTableContext)

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

const ModificacionesPlanTratamientoTableContext = React.createContext({onDeleteModificacion: (index: number) => {}})

const ModificacionesPlanTratamientoSection = ({form}: ModificacionesPlanTratamientoSectionProps) => {

    const [openAddModificacionPopover, setOpenAddModificacionPopover] = React.useState<boolean>(false)

    const modificacionForm = useForm<z.infer<typeof ModificacionPlanTratamientoSchema>>({
        resolver: zodResolver(ModificacionPlanTratamientoSchema),
        defaultValues: ModificacionPlanTratamientoDefaults
    })

    const onAddModificacion = (values: z.infer<typeof ModificacionPlanTratamientoSchema>) => {
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

    return (
        <Surface className={'w-full px-6 min-h-screen'}>
            <Title level={'title-lg'}>Plan de Tratamiento</Title>

            <section className={'my-6 relative'}>
                <header>
                    <Title level={'title-md'}>Modificaciones del plan de tratamiento</Title>
                </header>

                {/*actions*/}
                <div className={'sticky flex justify-end right-0 top-0'}>

                    <Popover open={openAddModificacionPopover} onOpenChange={setOpenAddModificacionPopover}>
                        <PopoverTrigger type={'button'}
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
                                            <DatePicker control={modificacionForm.control} label={'Fecha'} name={'fecha'}/>
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
                                            <OutlinedButton label={'Limpiar'} onClick={() => modificacionForm.reset()}/>
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

                <ModificacionesPlanTratamientoTableContext.Provider value={{onDeleteModificacion: onDeleteModificacion}}>
                    <Form {...form}>
                        <form>
                            <FormField render={({field}) => (
                                <FormItem>
                                    <DataTable columns={columns} data={field.value}/>
                                </FormItem>
                            )} name={'modificaciones_plan_tratamiento'} control={form.control}/>
                        </form>
                    </Form>
                </ModificacionesPlanTratamientoTableContext.Provider>

            </section>
        </Surface>
    )
}

export default ModificacionesPlanTratamientoSection
