import HistoriaOdontologicaFormSchema, {
    TratamientoRealizado,
    TratamientoRealizadoObject
} from "@/FormSchema/Historia/HistoriaOdontologicaForm";
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
import {Icon} from "@/Components/atoms/Icon";
import Heading from "@/Components/atoms/Heading";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import DatePicker from "@/Components/molecules/DatePicker";
import Input from "@/Components/atoms/Input";
import Textarea from "@/Components/atoms/Textarea";
import {OutlinedButton} from "@/Components/molecules/OutlinedButton";
import {DataTable} from "@/Components/molecules/DataTable";
import Surface from "@/Components/atoms/Surface";

interface SecuenciaTratamientoSectionProps {
    form: UseFormReturn<z.infer<typeof HistoriaOdontologicaFormSchema>>
}

const SecuenciaPlanTratamientoTableContext = React.createContext({onDeleteModificacion: (index: number) => {}})

const columnHelper = createColumnHelper<z.infer<typeof TratamientoRealizadoObject>>()

const columns: ColumnDef<z.infer<typeof TratamientoRealizadoObject>>[] = [
    columnHelper.accessor(originalRow => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'short',
        }

        return new Intl.DateTimeFormat('es-VE', options).format(originalRow.fecha)
    }, {
        header: 'Fecha'
    }),
    columnHelper.accessor(originalRow => originalRow.diente, {
        header: 'Diente'
    }),
    columnHelper.accessor(originalRow => originalRow.tratamiento, {
        header: 'Tratamiento Realizado'
    }),
    {
        id: 'actions',
        cell: ({row}) => <TratamientoRealizadoMenu row={row}/>
    }
]

const TratamientoRealizadoMenu = ({row}: {row: Row<z.infer<typeof TratamientoRealizadoObject>>}) => {
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

const SecuenciaTratamientoSection = ({form}: SecuenciaTratamientoSectionProps) => {

    const [openAddTratamientoPopover, setOpenAddTratamientoPopover] = React.useState<boolean>(false)

    const tratamientoForm = useForm<z.infer<typeof TratamientoRealizadoObject>>({
        resolver: zodResolver(TratamientoRealizadoObject),
        defaultValues: TratamientoRealizado
    })

    const onAddTratamiento = (values: z.infer<typeof TratamientoRealizado>) => {
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
                        <form>
                            <FormField render={({field}) => (
                                <FormItem>
                                    <DataTable columns={columns} data={field.value}/>
                                </FormItem>
                            )} name={'secuencia_tratamiento'} control={form.control}/>
                        </form>
                    </Form>
                </SecuenciaPlanTratamientoTableContext.Provider>

            </section>
        </Surface>
    )
}

export default SecuenciaTratamientoSection
