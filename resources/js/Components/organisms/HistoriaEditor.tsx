import Surface from '@/Components/atoms/Surface'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs"
import {Icon} from "@/Components/atoms/Icon.tsx";
import {useForm} from "react-hook-form"
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import PacienteSchema from "@/FormSchema/Historia/PacienteSchema";
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
    Images,
    ListChecks,
    RefreshCcwDot,
    Table,
    TableRowsSplit,
    UserCircle,
    Users
} from "lucide-react"
import EstudioModelosSection from "@/Components/organisms/historia/EstudioModelosSection";
import ModificacionesPlanTratamientoSection from '@/Components/organisms/historia/ModificacionesPlanTratamientoSection'
import SecuenciaPlanTratamientoSection from '@/Components/organisms/historia/SecuenciaTratamientoSection'
import Historia from '@/src/models/Historia'
import PacienteSection from "@/Components/organisms/historia/PacienteSection";
import AntFamiliaresSection from "@/Components/organisms/historia/AntFamiliaresSection";
import AntPersonalesSection from "@/Components/organisms/historia/AntPersonalesSection";
import HistoriaOdontologicaSection from "@/Components/organisms/historia/HistoriaOdontologicaSection";
import PlanTratamientoSection from "@/Components/organisms/historia/PlanTratamientoSection";
import PlanTratamientoSchema, {PlanTratamientoDefaults} from "@/FormSchema/Historia/PlanTratamientoSchema";
import {modificacionesPlanTratamientoSchema} from "@/FormSchema/Historia/ModificacionesPlanTratamientoSchema";
import {secuenciaTratamientoSchema} from "@/FormSchema/Historia/SecuenciaTratamientoSchema";
import EstudioModelosSchema, {EstudioModelosDefaults} from "@/FormSchema/Historia/EstudioModelosSchema";
import {mergeDeep} from "@/src/Utils/Utils";
import ExamenRadiograficoSection from "@/Components/organisms/historia/ExamenRadiograficoSection.tsx";
import PeriodontodiagramaSchema from "@/FormSchema/Historia/PeriodontodiagramaSchema.ts";
import PeriodontodiagramaSection from "@/Components/organisms/historia/PeriodontodiagramaSection.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import MediaSection from "@/Components/organisms/historia/MediaSection.tsx";
import HistoriaPeriodontalSection from "@/Components/organisms/historia/HistoriaPeriodontalSection.tsx";
import ControlPlacaSection from "@/Components/organisms/historia/ControlPlacaSection.tsx";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/shadcn/ui/menubar"
import {Homework} from "@/src/models/Group.ts";
import {useCorrections, UseCorrectionsReturn} from "@/src/corrections/corrections.ts";
import {toast} from "sonner";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {route} from "ziggy-js";


const TabTriggerStyle = 'p-0 m-0'

type HistoriaEditorContextType = {
    historia: Historia
    disabled: boolean
    homework?: Homework | null
    canCreateCorrections: boolean
    correctionsModel: UseCorrectionsReturn
}
const HistoriaEditorContext = React.createContext<HistoriaEditorContextType>({
    correctionsModel: {model: null, handleSubmit: (values) => {}},
    historia: null,
    disabled: true,
    homework: null,
    canCreateCorrections: false})

type HistoriaEditorProps = {
    historia: Historia
    readMode: boolean
    homework?: Homework
    canCreateCorrections: boolean
}

const HistoriaEditor = ({historia, homework, readMode = true, canCreateCorrections}: HistoriaEditorProps) => {

    const [showSidebar, setShowSidebar] = React.useState<boolean>(false)

    const corrections = homework?.documents.find((document) => document.id === historia?.id).corrections

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled = readMode || isProcessing

    const handleSubmitCorrections = (values: {section: string, content: string}) => {
        const endpoint = route('groups.assignments.homeworks.corrections', {
            group:homework?.assignment?.group_id,
            assignment: homework?.assignment_id,
            homework: homework?.id,
        })

        const data = {
            document_id: historia?.id,
            type: 'HRA',
            section: values.section,
            content: values.content,
        }

        router.post(endpoint, data, {
            onError: errors => {
                toast.error('No se pudo agregar las correcciones')
            },
            onSuccess: page => {
                toast.success('Correcciones agregadas')
                router.reload()
            }
        })
    }

    const correctionsModel = useCorrections(handleSubmitCorrections, corrections)

    const historiaForm = useForm<z.infer<typeof HistoriaSchema>>({
        resolver: zodResolver(HistoriaSchema),
        defaultValues: HistoriaDefaults,
        values: historia,
        disabled: isDisabled,
    })

    const {paciente} = historia

    const pacienteForm = useForm<z.infer<typeof PacienteSchema>>({
        resolver: zodResolver(PacienteSchema),
        defaultValues: {
            apellido: paciente?.apellido ?? "",
            cedula: paciente?.cedula ?? "",
            direccion: paciente?.direccion ?? '',
            edad: paciente?.edad ?? 0,
            fecha_nacimiento: paciente?.fecha_nacimiento ?? Date().toString(),
            foto: null,
            nombre: paciente?.nombre ?? "",
            ocupacion: paciente?.ocupacion ?? "",
            peso: paciente?.peso ?? 0,
            sexo: paciente?.sexo ?? "",
            telefono: paciente?.telefono ?? '',
        },
        disabled: isDisabled,
    })

    const trastornos = historia?.trastornos!!

    if (historia?.ant_personales) {
        historia.ant_personales.trastornos = trastornos
    }

    const antPersonalesForm = useForm<z.infer<typeof AntPersonalesSchema>>({
        resolver: zodResolver(AntPersonalesSchema),
        defaultValues: AntPersonalesDefaults,
        values: historia.ant_personales,
        disabled: isDisabled,
    })

    const antFamiliaresForm = useForm<z.infer<typeof AntFamiliaresSchema>>({
        resolver: zodResolver(AntFamiliaresSchema),
        defaultValues: AntFamiliaresDefaults,
        values: historia.ant_familiares,
        disabled: isDisabled,
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
        disabled: isDisabled,
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
        disabled: isDisabled,
    })

    const modificacionesTratamientoForm = useForm<z.infer<typeof modificacionesPlanTratamientoSchema>>({
        resolver: zodResolver(modificacionesPlanTratamientoSchema),
        defaultValues: {
            modificaciones_plan_tratamiento: []
        },
        disabled: isDisabled,
    })

    const secuenciaTratamientoForm = useForm<z.infer<typeof secuenciaTratamientoSchema>>({
        resolver: zodResolver(secuenciaTratamientoSchema),
        defaultValues: {
            secuencia_tratamiento: []
        },
        disabled: isDisabled,
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
        disabled: isDisabled,
    })

    const estudioModelosDefaults = (historia.historia_odontologica?.estudio_modelos) ? mergeDeep({...EstudioModelosDefaults}, {estudio_modelos: historia.historia_odontologica?.estudio_modelos}, {historia_id: historia.id}) satisfies z.infer<typeof EstudioModelosSchema>
        : Object.assign(EstudioModelosDefaults, {historia_id: historia.id}) satisfies z.infer<typeof EstudioModelosSchema>

    const estudioModelosForm = useForm<z.infer<typeof EstudioModelosSchema>>({
        resolver: zodResolver(EstudioModelosSchema),
        defaultValues: EstudioModelosDefaults,
        values: historia.historia_odontologica?.estudio_modelos,
        disabled: isDisabled,
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
        disabled: isDisabled,
    })

    return (
        <HistoriaEditorContext.Provider
            value={{historia: historia, homework: homework, canCreateCorrections: canCreateCorrections, correctionsModel: correctionsModel, disabled: isDisabled}}>
            <div className={'h-full'}>
                <Menubar className={'mb-2'}>
                    <MenubarMenu>
                        <MenubarTrigger>Archivo</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem asChild>
                                <a href={route('historias.print', { historia: historia.id})} target='_blank'>
                                    Imprimir
                                </a>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
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
                            <TabsTrigger value="antFamiliares" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <Users/>
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
                            <TabsTrigger value="periodontodiagrama" className={'p-0'}>
                                <Surface className={'rounded-none'}>
                                    <Icon className={'size-8'}>
                                        <TableRowsSplit/>
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
                            <TabsContent value="estudioModelos" className={TabTriggerStyle}>
                                <EstudioModelosSection form={estudioModelosForm}/>
                            </TabsContent>
                            <TabsContent value="periodontodiagrama" className={TabTriggerStyle}>
                                <PeriodontodiagramaSection form={periodontodiagramaForm}
                                                           periodontograma={historia.historia_odontologica?.periodontodiagrama[0] ?? null}/>
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

                            <div className={'basis-1/4 p-2 bg-white'} id={'historiaEditorSidebar'}>

                            </div>
                        )
                    }
                </div>
            </div>
        </HistoriaEditorContext.Provider>
    )
}

export {HistoriaEditorContext}
export default HistoriaEditor
