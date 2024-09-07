import React from "react";
import {FormProps, useForm, UseFormReturn} from "react-hook-form";
import {z} from "zod";
import PlanTratamientoSchema, {TratamientoDefaults, TratamientoSchema} from "@/FormSchema/Historia/PlanTratamientoSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Popover, PopoverContent, PopoverTrigger} from "@/shadcn/ui/popover";
import {Icon} from "@/Components/atoms/Icon";
import {MoreHorizontal, SquarePlus, Trash2} from "lucide-react";
import Heading from "@/Components/atoms/Heading";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import Input from "@/Components/atoms/Input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/ui/select";
import Textarea from "@/Components/atoms/Textarea";
import {OutlinedButton} from "@/Components/molecules/OutlinedButton";
import {Button} from "@/shadcn/ui/button";
import {DataTable} from "@/Components/molecules/DataTable";
import {ColumnDef, createColumnHelper, Row} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shadcn/ui/dropdown-menu";
import {route, useRoute} from "ziggy-js";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {mapServerErrorsToFields} from "@/src/Utils/Utils";

interface PlanTratamientoSectionProps {
    form: UseFormReturn<z.infer<PlanTratamientoSchema>>
}

const PlanTratamientoTableContext = React.createContext<{onDeleteTratamiento: (index: number) => void}>({onDeleteTratamiento: (_index: number) => {}})

const PlanTratamientoSection = ({form}: PlanTratamientoSectionProps) => {

    const route = useRoute()
    const {isProcessing, router} = useInertiaSubmit()
    const [openAddTratamientoPopover, setOpenAddTratamientoPopover] = React.useState<boolean>(false)

    const tratamientoForm = useForm<z.infer<typeof TratamientoSchema>>({
        resolver: zodResolver(TratamientoSchema),
        defaultValues: TratamientoDefaults
    })

    const onAddTratamiento = (values: z.infer<typeof TratamientoSchema>) => {
        const oldData = form.getValues().plan_tratamiento
        form.setValue('plan_tratamiento', [...oldData, values], {
            shouldDirty: true, shouldTouch: true, shouldValidate: true
        })
        tratamientoForm.reset()
        setOpenAddTratamientoPopover(false)
    }

    const onDeleteTratamiento = (index) => {
        const newData = form.getValues().plan_tratamiento
        newData.splice(index, 1)
        form.setValue('plan_tratamiento', [...newData], {
            shouldDirty: true, shouldTouch: true, shouldValidate: true
        })
    }

    const onSubmitPlan = (values: z.infer<typeof PlanTratamientoSchema>) => {
        const endpoint = route('historias.odontologica.plantratamiento.update', {
            historia: values.historia_id
        })
        console.log(values)

        router.patch(endpoint, values, {
            onError: errors => {
                console.log(errors)
                mapServerErrorsToFields(form, errors)
            },
            onSuccess: page => form.reset(values)
        })
    }

    return (
        <Surface className={'w-full px-6 min-h-screen'}>
            <Title level={'title-lg'}>Plan de Tratamiento</Title>

            <section className={'my-6 relative'}>
                <header>
                    <Title level={'title-md'}>Plan de Tratamiento</Title>
                </header>

                {/*actions*/}
                <div className={'sticky flex justify-end right-0 top-0'}>

                    <Popover open={openAddTratamientoPopover} onOpenChange={setOpenAddTratamientoPopover}>
                        <PopoverTrigger type={'button'} className={'border rounded-full size-12 flex items-center justify-center shadow'}>
                            <Icon className={'flex-none'}>
                                <SquarePlus/>
                            </Icon>
                        </PopoverTrigger>
                        <PopoverContent align={'end'}>
                            <section className={'grid grid-cols-2'}>
                                <header className={'col-span-full'}>
                                    <Heading level={'h6'}>Agregar plan</Heading>
                                </header>

                                <Form {...tratamientoForm} className={'col-span-full'}>
                                    <form onSubmit={tratamientoForm.handleSubmit(onAddTratamiento)} className={'grid grid-cols-2 col-span-full gap-5'}>

                                        <FormField render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Diente</FormLabel>
                                                <FormControl>
                                                    <Input {...field}/>
                                                </FormControl>
                                                <FormMessage className={'text-xs'}/>
                                            </FormItem>
                                        )} name={'diente'} control={tratamientoForm.control} />

                                        <FormField render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Cavidad</FormLabel>
                                                    <FormControl>
                                                        <Input {...field}/>
                                                    </FormControl>
                                                <FormMessage className={'text-xs'}/>
                                            </FormItem>
                                        )} name={'cavidad'} control={tratamientoForm.control} />

                                        <div className={'col-span-full'}>
                                            <FormField render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Tratamiento</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field} />
                                                    </FormControl>
                                                    <FormMessage className={'text-xs'}/>
                                                </FormItem>
                                            )} name={'tratamiento'} control={tratamientoForm.control} />
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

                <PlanTratamientoTableContext.Provider value={{onDeleteTratamiento: onDeleteTratamiento}}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmitPlan)}>
                            <FormField render={({field}) => (
                                <FormItem>
                                    <DataTable columns={columns} data={field.value}/>
                                </FormItem>
                            )} name={'plan_tratamiento'} control={form.control}/>

                            <div className={'flex justify-end'}>
                                <Button type={'submit'} disabled={isProcessing || !form.formState.isDirty}>Guardar</Button>
                            </div>
                        </form>
                    </Form>
                </PlanTratamientoTableContext.Provider>

            </section>
        </Surface>
    )
}

const TratamientoMenu = ({row}: {row: Row<z.infer<typeof TratamientoSchema>>}) => {
    const context = React.useContext(PlanTratamientoTableContext)

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
                <DropdownMenuSeparator />
                <DropdownMenuItem className={'text-rose-600'} onClick={() => context.onDeleteTratamiento(row.index)}><Trash2 className={'size-4 me-1'}/>Eliminar tratamiento</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const columnHelper = createColumnHelper<z.infer<typeof TratamientoSchema>>()

const columns: ColumnDef<z.infer<typeof TratamientoSchema>>[] = [
    columnHelper.accessor((originalRow, _index) => originalRow.diente, {
        id: 'diente',
        header: _props => 'Diente'
    }),
    columnHelper.accessor((originalRow, _index) => originalRow.cavidad, {
        id: 'cavidad',
        header: _props => 'Tipo de cavidad'
    }),
    columnHelper.accessor((originalRow, _index) => originalRow.tratamiento, {
        id: 'tratamiento',
        header: _props => 'Tratamiento'
    }),
    columnHelper.display({
        id: 'actions',
        cell: ({row}) => <TratamientoMenu row={row}/>
    })
]

export default PlanTratamientoSection
