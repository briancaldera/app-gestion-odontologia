import Surface from '@/Components/atoms/Surface'
import {UserCircleIcon} from '@heroicons/react/24/outline'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs"
import {Icon} from "@/Components/atoms/Icon";
import {useForm, UseFormReturn} from "react-hook-form"
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import {useRoute} from "ziggy-js";
import {Button} from "@/shadcn/ui/button"
import React from "react";
import Title from "@/Components/atoms/Title";
import Field from "@/Components/molecules/Field";
import DatePicker from "@/Components/molecules/DatePicker";
import PacienteSchema, {PacienteDefaults} from "@/FormSchema/Historia/PacienteSchema";
import AntPersonalesSchema, {
    AntPersonalesDefaults
} from "@/FormSchema/Historia/AntPersonalesSchema";
import AntFamiliaresSchema , {AntFamiliaresDefaults} from "@/FormSchema/Historia/AntFamiliaresSchema";
import HistoriaSchema, {HistoriaDefaults} from "@/FormSchema/Historia/HistoriaSchema";
import HistoriaOdontologicaSchema, {HistoriaOdontologicaDefaults, TratamientoSchema, TratamientoDefaults, CAVIDAD_CLASES} from "@/FormSchema/Historia/HistoriaOdontologicaSchema";
import ExamenRadiograficoSchema, {ExamenRadiografico} from '@/FormSchema/Historia/ExamenRadiograficoForm'
import Checkbox from "@/Components/atoms/Checkbox";
import Input from "@/Components/atoms/Input";
import Textarea from "@/Components/atoms/Textarea";
import Label from "@/Components/atoms/Label";
import {Text} from "@/Components/atoms/Text";
import {
    Bone,
    HeartPulse,
    Hospital,
    SquarePlus,
    Users,
    MoreHorizontal,
    Trash2,
    ListChecks,
    FileBox,
    File
} from "lucide-react"
import Tooltip from "@/Components/atoms/Tooltip"
import DragAndDrop from "@/Components/molecules/DragAndDrop";
import AnalisisSlot from "@/Components/organisms/AnalisisSlot";
import EstudioModelosSection from "@/Components/organisms/historia/EstudioModelosSection";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shadcn/ui/popover"
import Heading from "@/Components/atoms/Heading";
import {OutlinedButton} from "@/Components/molecules/OutlinedButton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel, Row, RowData,
    useReactTable,
} from "@tanstack/react-table"
import {DataTable} from "@/Components/molecules/DataTable"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu"
import ModificacionesPlanTratamientoSection from '@/Components/organisms/historia/ModificacionesPlanTratamientoSection'
import SecuenciaPlanTratamientoSection from '@/Components/organisms/historia/SecuenciaTratamientoSection'
import Historia from '@/src/models/Historia'
import {router} from "@inertiajs/react";
import PacienteSection from "@/Components/organisms/historia/PacienteSection";
import HistoriaSection from "@/Components/organisms/historia/HistoriaSection";
import AntFamiliaresSection from "@/Components/organisms/historia/AntFamiliaresSection";
import AntPersonalesSection from "@/Components/organisms/historia/AntPersonalesSection";
import HistoriaOdontologicaSection from "@/Components/organisms/historia/HistoriaOdontologicaSection";

const TabTriggerStyle = 'p-0 m-0'

const SectionStyle = 'w-full px-6 min-h-screen'

const HistoriaEditorContext = React.createContext({})

interface HistoriaEditorProps {
    historia?: Historia
}

const HistoriaEditor = ({historia}: HistoriaEditorProps) => {

    const historiaForm = useForm<z.infer<typeof HistoriaSchema>>({
        resolver: zodResolver(HistoriaSchema),
        defaultValues: historia ?? HistoriaDefaults,
    })

    const pacienteForm = useForm<z.infer<typeof PacienteSchema>>({
        resolver: zodResolver(PacienteSchema),
        defaultValues: historia?.paciente ?? PacienteDefaults,
    })

    const trastornos = historia?.trastornos!!

    if (historia?.ant_personales) {
        historia.ant_personales.trastornos = trastornos
    }

    const antPersonalesForm = useForm<z.infer<typeof AntPersonalesSchema>>({
        resolver: zodResolver(AntPersonalesSchema),
        defaultValues: historia?.ant_personales ?? Object.assign(AntPersonalesDefaults, {historia_id: historia?.id}),
    })

    const antFamiliaresForm = useForm<z.infer<typeof AntFamiliaresSchema>>({
        resolver: zodResolver(AntFamiliaresSchema),
        defaultValues: historia?.ant_familiares ?? Object.assign(AntFamiliaresDefaults, {historia_id: historia?.id}),
    })

    const historiaOdontologicaForm = useForm<z.infer<typeof HistoriaOdontologicaSchema>>({
        resolver: zodResolver(HistoriaOdontologicaSchema),
        defaultValues: historia?.historia_odontologica ?? Object.assign(HistoriaOdontologicaDefaults, {historia_id: historia?.id})
    })

    const examenRadiograficoForm = useForm<z.infer<typeof ExamenRadiograficoSchema>>({
        resolver: zodResolver(ExamenRadiograficoSchema),
        defaultValues: ExamenRadiografico,
    })

    return (
        <div className={'w-full h-full px-6 py-6'}>

            <Tabs defaultValue="paciente" className="flex h-full" orientation={'vertical'}>
                <TabsList className={'flex flex-col items-end justify-start p-0 sticky top-0'}>
                    <TabsTrigger value="paciente" className={'p-0'}>
                        <Surface>
                            <Icon className={'size-8'}>
                                <UserCircleIcon/>
                            </Icon>
                        </Surface>
                    </TabsTrigger>
                    <TabsTrigger value="historia" className={'p-0'}>
                        <Surface>
                            <Icon className={'size-8'}>
                                <UserCircleIcon/>
                            </Icon>
                        </Surface>
                    </TabsTrigger>
                    <TabsTrigger value="antPersonales" className={'p-0'}>
                        <Surface>
                            <Icon className={'size-8'}>
                                <HeartPulse/>
                            </Icon>
                        </Surface>
                    </TabsTrigger>
                    <TabsTrigger value="antFamiliares" className={'p-0'}>
                        <Surface>
                            <Icon className={'size-8'}>
                                <Users/>
                            </Icon>
                        </Surface>
                    </TabsTrigger>
                    <TabsTrigger value="historiaOdon" className={'p-0'}>
                        <Surface>
                            <Icon className={'size-8'}>
                                <Hospital/>
                            </Icon>
                        </Surface>
                    </TabsTrigger>
                    <TabsTrigger value="examenRadiografico" className={'p-0'}>
                        <Surface>
                            <Icon className={'size-8'}>
                                <Bone/>
                            </Icon>
                        </Surface>
                    </TabsTrigger>
                    <TabsTrigger value="planTratamiento" className={'p-0'}>
                        <Surface>
                            <Icon className={'size-8'}>
                                <Bone/>
                            </Icon>
                        </Surface>
                    </TabsTrigger>
                    <TabsTrigger value="modificacionesPlanTratamiento" className={'p-0'}>
                        <Surface>
                            <Icon className={'size-8'}>
                                <Bone/>
                            </Icon>
                        </Surface>
                    </TabsTrigger>
                    <TabsTrigger value="secuenciaPlanTratamiento" className={'p-0'}>
                        <Surface>
                            <Icon className={'size-8'}>
                                <ListChecks />
                            </Icon>
                        </Surface>
                    </TabsTrigger>
                    <TabsTrigger value="estudioModelos" className={'p-0'}>
                        <Surface>
                            <Icon className={'size-8'}>
                                <FileBox />
                            </Icon>
                        </Surface>
                    </TabsTrigger>
                </TabsList>
                <div className={'w-full h-full'}>
                    <HistoriaEditorContext.Provider value={{}}>
                        <TabsContent value="paciente" className={TabTriggerStyle}>
                            <PacienteSection form={pacienteForm}/>
                        </TabsContent>
                        <TabsContent value="historia" className={TabTriggerStyle}>
                            <HistoriaSection form={historiaForm} historia_id={historia?.id ?? ''}/>
                        </TabsContent>
                        <TabsContent value="antPersonales" className={TabTriggerStyle}>
                            <AntPersonalesSection form={antPersonalesForm}/>
                        </TabsContent>
                        <TabsContent value="antFamiliares" className={TabTriggerStyle}>
                            <AntFamiliaresSection form={antFamiliaresForm}/>
                        </TabsContent>
                        <TabsContent value="historiaOdon" className={TabTriggerStyle}>
                            <HistoriaOdontologicaSection form={historiaOdontologicaForm}/>
                        </TabsContent>
                        <TabsContent value="examenRadiografico" className={TabTriggerStyle}>
                            <ExamenRadiograficoSection form={examenRadiograficoForm}/>
                        </TabsContent>
                        <TabsContent value="planTratamiento" className={TabTriggerStyle}>
                            <PlanTratamientoSection form={historiaOdontologicaForm}/>
                        </TabsContent>
                        <TabsContent value="modificacionesPlanTratamiento" className={TabTriggerStyle}>
                            <ModificacionesPlanTratamientoSection form={historiaOdontologicaForm}/>
                        </TabsContent>
                        <TabsContent value="secuenciaPlanTratamiento" className={TabTriggerStyle}>
                            <SecuenciaPlanTratamientoSection form={historiaOdontologicaForm}/>
                        </TabsContent>
                        <TabsContent value="estudioModelos" className={TabTriggerStyle}>
                            <EstudioModelosSection form={historiaOdontologicaForm}/>
                        </TabsContent>
                    </HistoriaEditorContext.Provider>
                </div>
            </Tabs>

        </div>
    )
}

type ExamenRadiograficoSectionProps = {
    form: UseFormReturn<z.infer<typeof ExamenRadiograficoSchema>>
}

const ExamenRadiograficoSection = ({form}: ExamenRadiograficoSectionProps) => {

    const route = useRoute()

    const handleSubmit = (values: z.infer<typeof ExamenRadiograficoSchema>) => {
        console.log(values)

        // router.post(route(''), Object.create(values))
    }

    return (
        <Surface className={SectionStyle}>

            <Title level={'title-lg'}>Examen Radiografico</Title>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={''}>

                    <section className={'my-6'}>
                        <header className={'mb-1.5 mt-5 space-y-1'}>
                            <Title level={'title-md'}>Interpretación panorámica</Title>
                        </header>

                        <div className={'grid grid-rows-5 grid-cols-3 gap-4'}>
                            {
                                Object.keys(form.formState.defaultValues?.interpretacion_panoramica).map(char => (
                                    <div key={char}>
                                        <FormField render={({field}) => {
                                            return (<FormItem>
                                                    <div className={'capitalize font-semibold'}>
                                                        {char.replaceAll('_', ' ')}
                                                    </div>
                                                    <div className={'border border-gray-400 rounded-lg'}>
                                                        <FormControl>
                                                            <AnalisisSlot title={char.replaceAll('_', ' ')}
                                                                          descripcion={field.value.descripcion}
                                                                          radiografias={field.value.radiografias}
                                                                          onSubmitAnalisis={(values) => {
                                                                              // field.onChange(values) // This doesn't work. Please do NOT use
                                                                              form.setValue(`interpretacion_panoramica.${char}.radiografias`, values.radiografias, {
                                                                                  shouldDirty: true,
                                                                                  shouldTouch: true,
                                                                                  shouldValidate: true
                                                                              })
                                                                              form.setValue(`interpretacion_panoramica.${char}.descripcion`, values.descripcion, {
                                                                                  shouldDirty: true,
                                                                                  shouldTouch: true,
                                                                                  shouldValidate: true
                                                                              })
                                                                          }}/>
                                                        </FormControl>
                                                    </div>
                                                    {/*<FormMessage hidden={true}/>*/}
                                                </FormItem>
                                            )
                                        }} name={`interpretacion_panoramica.${char}`} control={form.control}/>


                                    </div>
                                ))
                            }


                        </div>
                    </section>

                    <section className={'my-6'}>
                        <header className={'mb-1.5 mt-5 space-y-1'}>
                            <Title level={'title-md'}>Interpretación radiográfica periapicales</Title>
                            <Text level={'body-md'}>(Corona, Raíz, Hueso y Espacio Ligamento Periodontal)</Text>
                        </header>

                        <div>
                            <DragAndDrop/>
                        </div>
                    </section>

                    <section className={'my-6'}>
                        <header className={'mb-1.5 mt-5 space-y-1'}>
                            <Title level={'title-md'}>Interpretación radiográfica coronales</Title>
                            <Text level={'body-md'}>(Corona, Cresta Alveolar, Espacio de la camara pulpar)</Text>
                        </header>

                        <div>


                        </div>
                    </section>
                </form>
            </Form>
        </Surface>
    )
}

const PlanTratamientoTableContext = React.createContext({onDeleteTratamiento: (index: number) => {console.log('nose')}})

const columns: ColumnDef<z.infer<typeof TratamientoSchema>>[] = [
    {
        accessorKey: "diente",
        header: "Diente",
    },
    {
        accessorKey: "cavidad",
        header: "Tipo de cavidad",
    },
    {
        accessorKey: "tratamiento",
        header: "Tratamiento",
    },
    {
        id: 'actions',
        cell: ({row}) => <TratamientoMenu row={row}/>
    }
]

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
                <DropdownMenuItem
                    onClick={() => {}}
                >
                    Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem className={'text-rose-600'} onClick={() => context.onDeleteTratamiento(row.index)}><Trash2 className={'size-4 me-1'}/>Eliminar tratamiento</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const PlanTratamientoSection = ({form}: HistoriaOdontologicaSectionProps) => {

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

    return (
        <Surface className={SectionStyle}>
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
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecciona un tipo de cavidad"/>
                                                        </SelectTrigger>
                                                    </FormControl>

                                                    <SelectContent>
                                                        {CAVIDAD_CLASES.map((clase: string) => (<SelectItem key={clase}
                                                                                                            value={clase}>Clase {clase}</SelectItem>))}
                                                    </SelectContent>
                                                </Select>
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
                        <form>
                            <FormField render={({field}) => (
                                <FormItem>
                                    <DataTable columns={columns} data={field.value} />
                                </FormItem>
                            )} name={'plan_tratamiento'} control={form.control} />
                        </form>
                    </Form>
                </PlanTratamientoTableContext.Provider>

            </section>
        </Surface>
    )
}

export default HistoriaEditor
