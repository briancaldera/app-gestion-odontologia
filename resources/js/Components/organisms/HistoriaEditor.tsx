import Surface from '@/Components/atoms/Surface'
import {UserCircleIcon} from '@heroicons/react/24/outline'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs"
import {Icon} from "@/Components/atoms/Icon.tsx";
import {useForm} from "react-hook-form"
import {undefined, z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useRef} from "react";
import PacienteSchema, {PacienteDefaults} from "@/FormSchema/Historia/PacienteSchema";
import AntPersonalesSchema, {AntPersonalesDefaults} from "@/FormSchema/Historia/AntPersonalesSchema";
import AntFamiliaresSchema, {AntFamiliaresDefaults} from "@/FormSchema/Historia/AntFamiliaresSchema";
import HistoriaSchema, {HistoriaDefaults} from "@/FormSchema/Historia/HistoriaSchema";
import HistoriaOdontologicaSchema, {
    HistoriaOdontologicaDefaults
} from "@/FormSchema/Historia/HistoriaOdontologicaSchema";
import ExamenRadiograficoSchema, {ExamenRadiograficoDefaults} from '@/FormSchema/Historia/ExamenRadiograficoSchema.ts'
import {
    Bone,
    BriefcaseMedical,
    FileBox,
    HeartPulse,
    Hospital,
    ListChecks,
    RefreshCcwDot,
    Users,
    Clipboard,
    TableRowsSplit,
    Images,
    Table,
    Menu, UserCircle
} from "lucide-react"
import EstudioModelosSection from "@/Components/organisms/historia/EstudioModelosSection";
import ModificacionesPlanTratamientoSection from '@/Components/organisms/historia/ModificacionesPlanTratamientoSection'
import SecuenciaPlanTratamientoSection from '@/Components/organisms/historia/SecuenciaTratamientoSection'
import Historia from '@/src/models/Historia'
import PacienteSection from "@/Components/organisms/historia/PacienteSection";
import HistoriaSection from "@/Components/organisms/historia/HistoriaSection";
import AntFamiliaresSection from "@/Components/organisms/historia/AntFamiliaresSection";
import AntPersonalesSection from "@/Components/organisms/historia/AntPersonalesSection";
import HistoriaOdontologicaSection from "@/Components/organisms/historia/HistoriaOdontologicaSection";
import PlanTratamientoSection from "@/Components/organisms/historia/PlanTratamientoSection";
import PlanTratamientoSchema, {PlanTratamientoDefaults} from "@/FormSchema/Historia/PlanTratamientoSchema";
import ModificacionesPlanTratamientoSchema, {
    ModificacionesPlanTratamientoDefaults
} from "@/FormSchema/Historia/ModificacionesPlanTratamientoSchema";
import SecuenciaTratamientoSchema, {
    SecuenciaTratamientoDefaults
} from "@/FormSchema/Historia/SecuenciaTratamientoSchema";
import EstudioModelosSchema, {EstudioModelosDefaults} from "@/FormSchema/Historia/EstudioModelosSchema";
import {mergeDeep} from "@/src/Utils/Utils";
import ExamenRadiograficoSection from "@/Components/organisms/historia/ExamenRadiograficoSection.tsx";
import PeriodontodiagramaSchema from "@/FormSchema/Historia/PeriodontodiagramaSchema.ts";
import PeriodontodiagramaSection from "@/Components/organisms/historia/PeriodontodiagramaSection.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import MediaSection from "@/Components/organisms/historia/MediaSection.tsx";
import HistoriaPeriodontalSection from "@/Components/organisms/historia/HistoriaPeriodontalSection.tsx";
import {HistoriaPeriodontalDefaults} from "@/FormSchema/Historia/HistoriaPeriodontalSchema.ts";
import ControlPlacaSection from "@/Components/organisms/historia/ControlPlacaSection.tsx";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/shadcn/ui/menubar"
import {Homework} from "@/src/models/Group.ts";


const TabTriggerStyle = 'p-0 m-0'

const HistoriaEditorContext = React.createContext<{ homework?: Homework }>({})

type HistoriaEditorProps = {
    historia: Historia
    readMode: boolean
    homework?: Homework
}

const HistoriaEditor = ({historia, homework, readMode = true}: HistoriaEditorProps) => {

    const [showSidebar, setShowSidebar] = React.useState<boolean>(false)

    const historiaForm = useForm<z.infer<typeof HistoriaSchema>>({
        resolver: zodResolver(HistoriaSchema),
        defaultValues: HistoriaDefaults,
        values: historia,
        disabled: readMode,
    })

    const pacienteForm = useForm<z.infer<typeof PacienteSchema>>({
        resolver: zodResolver(PacienteSchema),
        defaultValues: PacienteDefaults,
        values: historia.paciente,
        disabled: readMode,
    })

    const trastornos = historia?.trastornos!!

    if (historia?.ant_personales) {
        historia.ant_personales.trastornos = trastornos
    }

    const antPersonalesForm = useForm<z.infer<typeof AntPersonalesSchema>>({
        resolver: zodResolver(AntPersonalesSchema),
        defaultValues: AntPersonalesDefaults,
        values: historia.ant_personales,
        disabled: readMode,
    })

    const antFamiliaresForm = useForm<z.infer<typeof AntFamiliaresSchema>>({
        resolver: zodResolver(AntFamiliaresSchema),
        defaultValues: AntFamiliaresDefaults,
        values: historia.ant_familiares,
        disabled: readMode,
    })

    const historiaOdontologicaForm = useForm<z.infer<typeof HistoriaOdontologicaSchema>>({
        resolver: zodResolver(HistoriaOdontologicaSchema),
        defaultValues: HistoriaOdontologicaDefaults,
        values: {
            historia_id: historia.id,
            ant_personales: historia.historia_odontologica!.ant_personales,
            examen_fisico: historia.historia_odontologica!.examen_fisico,
            habitos: historia.historia_odontologica!.habitos,
            portador: historia.historia_odontologica!.portador
        },
        disabled: readMode,
    })

    const defaults = (historia?.historia_odontologica?.plan_tratamiento) ? {
        plan_tratamiento: historia.historia_odontologica?.plan_tratamiento ?? [],
        historia_id: historia.id
    } satisfies z.infer<typeof PlanTratamientoSchema> : Object.assign(PlanTratamientoDefaults, {historia_id: historia?.id}) satisfies z.infer<typeof PlanTratamientoSchema>

    const planTratamientoForm = useForm<z.infer<typeof PlanTratamientoSchema>>({
        resolver: zodResolver(PlanTratamientoSchema),
        defaultValues: PlanTratamientoDefaults,
        values: {
            historia_id: historia.historia_odontologica!.historia_id,
            plan_tratamiento: historia.historia_odontologica!.plan_tratamiento
        },
        disabled: readMode,
    })

    const modificacionesDefaults = (historia.historia_odontologica?.modificaciones_plan_tratamiento) ? {
        modificaciones_plan_tratamiento: historia.historia_odontologica?.modificaciones_plan_tratamiento ?? [],
        historia_id: historia.id
    } satisfies z.infer<typeof ModificacionesPlanTratamientoSchema> : Object.assign(ModificacionesPlanTratamientoDefaults, {historia_id: historia?.id}) satisfies z.infer<typeof ModificacionesPlanTratamientoSchema>

    const modificacionesTratamientoForm = useForm<z.infer<typeof ModificacionesPlanTratamientoSchema>>({
        resolver: zodResolver(ModificacionesPlanTratamientoSchema),
        defaultValues: ModificacionesPlanTratamientoDefaults,
        values: {
            historia_id: historia.historia_odontologica!.historia_id,
            modificaciones_plan_tratamiento: historia.historia_odontologica!.modificaciones_plan_tratamiento,
        },
        disabled: readMode,
    })

    const secuenciaDefaults = (historia.historia_odontologica?.secuencia_tratamiento) ? {
        secuencia_tratamiento: historia.historia_odontologica?.secuencia_tratamiento ?? [],
        historia_id: historia.id
    } satisfies z.infer<typeof SecuenciaTratamientoSchema> : Object.assign(SecuenciaTratamientoDefaults, {historia_id: historia.id}) satisfies z.infer<typeof SecuenciaTratamientoSchema>

    const secuenciaTratamientoForm = useForm<z.infer<typeof SecuenciaTratamientoSchema>>({
        resolver: zodResolver(SecuenciaTratamientoSchema),
        defaultValues: SecuenciaTratamientoDefaults,
        values: {
            historia_id: historia.historia_odontologica!.historia_id,
            secuencia_tratamiento: historia.historia_odontologica!.secuencia_tratamiento,
        },
        disabled: readMode,
    })

    const examenRadiograficoForm = useForm<z.infer<typeof ExamenRadiograficoSchema>>({
        resolver: zodResolver(ExamenRadiograficoSchema),
        defaultValues: ExamenRadiograficoDefaults,
        values: {
            historia_id: historia.id,
            interpretacion_panoramica: {
                descripcion: {
                    ATM: historia.historia_odontologica?.examen_radiografico.interpretacion_panoramica?.ATM ?? '',
                    dento_alveolar_inf: historia.historia_odontologica?.examen_radiografico.interpretacion_panoramica?.dento_alveolar_inf ?? '',
                    dento_alveolar_sup: historia.historia_odontologica?.examen_radiografico.interpretacion_panoramica?.dento_alveolar_sup ?? '',
                    mandibular: historia.historia_odontologica?.examen_radiografico.interpretacion_panoramica?.mandibular ?? '',
                    nasomaxilar: historia.historia_odontologica?.examen_radiografico.interpretacion_panoramica?.nasomaxilar ?? '',
                },
                imagenes: []
            },
            interpretacion_coronales: {
                descripcion: historia.historia_odontologica?.examen_radiografico.interpretacion_coronales ?? '',
                imagenes: []
            },
            interpretacion_periapicales: {
                descripcion: historia.historia_odontologica?.examen_radiografico.interpretacion_periapicales ?? '',
                imagenes: []
            }
        },
        disabled: readMode,
    })

    const estudioModelosDefaults = (historia.historia_odontologica?.estudio_modelos) ? mergeDeep({...EstudioModelosDefaults}, {estudio_modelos: historia.historia_odontologica?.estudio_modelos}, {historia_id: historia.id}) satisfies z.infer<typeof EstudioModelosSchema>
        : Object.assign(EstudioModelosDefaults, {historia_id: historia.id}) satisfies z.infer<typeof EstudioModelosSchema>

    const estudioModelosForm = useForm<z.infer<typeof EstudioModelosSchema>>({
        resolver: zodResolver(EstudioModelosSchema),
        defaultValues: EstudioModelosDefaults,
        values: historia.historia_odontologica?.estudio_modelos,
        disabled: readMode,
    })

    const periodontodiagramaForm = useForm<z.infer<typeof PeriodontodiagramaSchema>>({
        resolver: zodResolver(PeriodontodiagramaSchema),
        defaultValues: {
            historia_id: historia.id,
            periodontodiagrama: null
        },
        values: {
            historia_id: historia.id,
            periodontodiagrama: null
        },
        disabled: readMode,
    })

    return (
        <div className={'h-full'}>
            <HistoriaEditorContext.Provider value={{homework: homework}}>
                <Menubar className={'mb-2'}>
                    <MenubarMenu>
                        <MenubarTrigger>Vista</MenubarTrigger>
                        <MenubarContent>
                            <MenubarCheckboxItem checked={showSidebar} onClick={() => setShowSidebar(value => !value)}>Barra
                                lateral</MenubarCheckboxItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
                <div className={'flex gap-x-2'}>


                    <Tabs defaultValue="paciente" className={"basis-3/4 flex-auto flex h-full"}
                          orientation={'vertical'}>
                        <TabsList className={'flex-none flex flex-col items-end justify-start p-0 sticky top-0'}>
                            <TabsTrigger value="paciente" className={'p-0'}>
                                <Surface className={'rounded-l-lg rounded-r-none rounded-b-none'}>
                                    <Icon className={'size-8'}>
                                        <UserCircle/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="historia" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <Clipboard/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="antPersonales" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <HeartPulse/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="antFamiliares" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <Users/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="historiaOdon" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <Hospital/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="examenRadiografico" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <Bone/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="planTratamiento" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <BriefcaseMedical/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="modificacionesPlanTratamiento" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <RefreshCcwDot/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="secuenciaPlanTratamiento" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <ListChecks/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="estudioModelos" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <FileBox/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="periodontodiagrama" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <TableRowsSplit/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="historia-periodontal" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <Table/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="control-placa" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <Table/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="media" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <Images/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                        </TabsList>
                        <ScrollArea className={'flex-1 w-full h-[83vh]'}>

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
                                <ExamenRadiograficoSection historiaOdontologica={historia.historia_odontologica!}
                                                           form={examenRadiograficoForm}/>
                            </TabsContent>
                            <TabsContent value="planTratamiento" className={TabTriggerStyle}>
                                <PlanTratamientoSection form={planTratamientoForm}/>
                            </TabsContent>
                            <TabsContent value="modificacionesPlanTratamiento" className={TabTriggerStyle}>
                                <ModificacionesPlanTratamientoSection form={modificacionesTratamientoForm}/>
                            </TabsContent>
                            <TabsContent value="secuenciaPlanTratamiento" className={TabTriggerStyle}>
                                <SecuenciaPlanTratamientoSection form={secuenciaTratamientoForm}/>
                            </TabsContent>
                            <TabsContent value="estudioModelos" className={TabTriggerStyle}>
                                <EstudioModelosSection form={estudioModelosForm}/>
                            </TabsContent>
                            <TabsContent value="periodontodiagrama" className={TabTriggerStyle}>
                                <PeriodontodiagramaSection form={periodontodiagramaForm}
                                                           periodontograma={historia.historia_odontologica?.periodontodiagrama[0] ?? null}/>
                            </TabsContent>
                            <TabsContent value="historia-periodontal" className={TabTriggerStyle}>
                                <HistoriaPeriodontalSection readonly={readMode} historia_id={historia.id}
                                                            historia_periodontal={historia.historia_odontologica!.historia_periodontal}/>
                            </TabsContent>
                            <TabsContent value="control-placa" className={TabTriggerStyle}>
                                <ControlPlacaSection/>
                            </TabsContent>
                            <TabsContent value="media" className={TabTriggerStyle}>
                                <MediaSection media={historia?.historia_odontologica?.anymedia ?? []}
                                              historia_id={historia.id} readmode={readMode}/>
                            </TabsContent>

                        </ScrollArea>
                    </Tabs>

                    {
                        showSidebar && (

                            <div className={'basis-1/4 p-2 bg-white'}>

                            </div>
                        )
                    }
                </div>
            </HistoriaEditorContext.Provider>
        </div>
    )
}

export {HistoriaEditorContext}
export default HistoriaEditor
