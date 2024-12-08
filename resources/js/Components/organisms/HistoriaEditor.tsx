import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs"
import {Icon} from "@/Components/atoms/Icon.tsx";
import {useForm} from "react-hook-form"
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import PacienteSchema from "@/FormSchema/Historia/PacienteSchema";
import AntPersonalesSchema, {AntPersonalesDefaults} from "@/FormSchema/Historia/AntPersonalesSchema";
import AntFamiliaresSchema, {AntFamiliaresDefaults} from "@/FormSchema/Historia/AntFamiliaresSchema";
import {historiaSchema} from "@/FormSchema/Historia/HistoriaSchema";
import HistoriaOdontologicaSchema, {
    HistoriaOdontologicaDefaults
} from "@/FormSchema/Historia/HistoriaOdontologicaSchema";
import ExamenRadiograficoSchema, {ExamenRadiograficoDefaults} from '@/FormSchema/Historia/ExamenRadiograficoSchema.ts'
import {
    Bone,
    BriefcaseMedical,
    Download,
    FileBox,
    HeartPulse,
    Hospital,
    Images,
    ListChecks,
    Printer,
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
import MediaSection from "@/Components/organisms/historia/MediaSection.tsx";
import HistoriaPeriodontalSection from "@/Components/organisms/historia/HistoriaPeriodontalSection.tsx";
import ControlPlacaSection from "@/Components/organisms/historia/ControlPlacaSection.tsx";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/shadcn/ui/menubar"
import {Homework} from "@/src/models/Group.ts";
import {useCorrections, UseCorrectionsReturn} from "@/src/corrections/corrections.ts";
import {toast} from "sonner";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {route} from "ziggy-js";
import {usePage} from "@inertiajs/react";


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

    const url = usePage().url

    const [showSidebar, setShowSidebar] = React.useState<boolean>(false)

    const corrections = historia.extras?.extras.correcciones//homework?.documents.find((document) => document.id === historia?.id).corrections

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled = readMode || isProcessing

    const [tab, setTab] = React.useState('section1')

    const handleSubmitCorrections = (values: {section: string, content: string}) => {
        const endpoint = route('historias.corrections.add', {historia: historia.id})

        const data = {
            section: values.section,
            content: values.content,
        }

        router.post(endpoint, data, {
            onError: errors => {
                toast.error('No se pudo agregar las correcciones')
            },
            onSuccess: page => {
                toast.success('Correcciones agregadas')
                    router.visit(url)
            }
        })
    }

    const correctionsModel = useCorrections(handleSubmitCorrections, corrections)

    const historiaForm = useForm<z.infer<typeof historiaSchema>>({
        resolver: zodResolver(historiaSchema),
        defaultValues: {
            motivo_consulta: historia.motivo_consulta ?? "",
            enfermedad_actual: historia.enfermedad_actual ?? "",
        },
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
                                <a href={`/historias/${historia.id}/download`}>
                                    <Download className={'size-4 mr-2'}/>Descargar
                                </a>
                            </MenubarItem>
                            <MenubarSeparator/>
                            <MenubarItem asChild>
                                <a href={`/historias/${historia.id}/print`} target='_blank'>
                                    <Printer className={'size-4 mr-2'}/>Imprimir
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
                    <Tabs defaultValue={tab} className={"basis-3/4 flex-auto flex h-full"} onValueChange={(value) => setTab(value)}
                          orientation={'vertical'}>
                        <TabsList className={'flex-none flex flex-col items-end justify-start p-0'}>
                            <TabsTrigger value="section1" className={`p-3 border-l-2 w-full justify-end text-xs gap-x-1 rounded-tl-lg ${tab === 'section1' ? 'bg-white border-l-indigo-500' : 'bg-slate-200'}`}>
                                <h2 className='max-sm:hidden'>Paciente</h2>
                                <Icon>
                                    <UserCircle className={'size-6'}/>
                                </Icon>
                            </TabsTrigger>
                            <TabsTrigger value="section2" className={`p-3 border-l-2 w-full justify-end text-xs gap-x-1 ${tab === 'section2' ? 'bg-white border-l-indigo-500' : 'bg-slate-200'}`}>
                                <h2 className='max-sm:hidden'>Ant. Familiares</h2>
                                <Icon>
                                    <Users className={'size-6'}/>
                                </Icon>
                            </TabsTrigger>
                            <TabsTrigger value="section3" className={`p-3 border-l-2 w-full justify-end text-xs gap-x-1 ${tab === 'section3' ? 'bg-white border-l-indigo-500' : 'bg-slate-200'}`}>
                                <h2 className='max-sm:hidden'>Ant. Personales</h2>
                                <Icon>
                                    <HeartPulse className={'size-6'}/>
                                </Icon>
                            </TabsTrigger>
                            <TabsTrigger value="section4" className={`p-3 border-l-2 w-full justify-end text-xs gap-x-1 ${tab === 'section4' ? 'bg-white border-l-indigo-500' : 'bg-slate-200'}`}>
                                <h2 className='max-sm:hidden'>H. Odont.</h2>
                                <Icon>
                                    <Hospital className={'size-6'}/>
                                </Icon>
                            </TabsTrigger>
                            <TabsTrigger value="section5" className={`p-3 border-l-2 w-full justify-end text-xs gap-x-1 ${tab === 'section5' ? 'bg-white border-l-indigo-500' : 'bg-slate-200'}`}>
                                <h2 className='max-sm:hidden'>Examen Rad.</h2>
                                <Icon>
                                    <Bone className={'size-6'}/>
                                </Icon>
                            </TabsTrigger>
                            <TabsTrigger value="section6" className={`p-3 border-l-2 w-full justify-end text-xs gap-x-1 ${tab === 'section6' ? 'bg-white border-l-indigo-500' : 'bg-slate-200'}`}>
                                <h2 className='max-sm:hidden'>Periodont.</h2>
                                <Icon>
                                    <TableRowsSplit className={'size-6'}/>
                                </Icon>
                            </TabsTrigger>
                            <TabsTrigger value="section7" className={`p-3 border-l-2 w-full justify-end text-xs gap-x-1 ${tab === 'section7' ? 'bg-white border-l-indigo-500' : 'bg-slate-200'}`}>
                                <h2 className='max-sm:hidden'>Est. de modelos</h2>
                                <Icon>
                                    <FileBox className={'size-6'}/>
                                </Icon>
                            </TabsTrigger>
                            <TabsTrigger value="section8" className={`p-3 border-l-2 w-full justify-end text-xs gap-x-1 ${tab === 'section8' ? 'bg-white border-l-indigo-500' : 'bg-slate-200'}`}>
                                <h2 className='max-sm:hidden'>Tratamiento</h2>
                                <Icon>
                                    <BriefcaseMedical className={'size-6'}/>
                                </Icon>
                            </TabsTrigger>
                            <TabsTrigger value="section9" className={`p-3 border-l-2 w-full justify-end text-xs gap-x-1 ${tab === 'section9' ? 'bg-white border-l-indigo-500' : 'bg-slate-200'}`}>
                                <h2 className='max-sm:hidden'>Modif. Trat.</h2>
                                <Icon>
                                    <RefreshCcwDot className={'size-6'}/>
                                </Icon>
                            </TabsTrigger>
                            <TabsTrigger value="section10" className={`p-3 border-l-2 w-full justify-end text-xs gap-x-1 ${tab === 'section10' ? 'bg-white border-l-indigo-500' : 'bg-slate-200'}`}>
                                <h2 className='max-sm:hidden'>Secuencia Trat.</h2>
                                <Icon>
                                    <ListChecks className={'size-6'}/>
                                </Icon>
                            </TabsTrigger>
                            <TabsTrigger value="section11" className={`p-3 border-l-2 w-full justify-end text-xs gap-x-1 ${tab === 'section11' ? 'bg-white border-l-indigo-500' : 'bg-slate-200'}`}>
                                <h2 className='max-sm:hidden'>H. Periodontal</h2>
                                <Icon>
                                    <Table className={'size-6'}/>
                                </Icon>
                            </TabsTrigger>
                            <TabsTrigger value="section12" className={`p-3 border-l-2 w-full justify-end text-xs gap-x-1 ${tab === 'section12' ? 'bg-white border-l-indigo-500' : 'bg-slate-200'}`}>
                                <h2 className='max-sm:hidden'>Cont. placa</h2>
                                <Icon>
                                    <Table className={'size-6'}/>
                                </Icon>
                            </TabsTrigger>
                            <TabsTrigger value="section13" className={`p-3 border-l-2 w-full justify-end text-xs gap-x-1 rounded-bl-lg ${tab === 'section13' ? 'bg-white border-l-indigo-500' : 'bg-slate-200'}`}>
                                <h2 className='max-sm:hidden'>Archivos</h2>
                                <Icon>
                                    <Images className={'size-6'}/>
                                </Icon>
                            </TabsTrigger>
                        </TabsList>
                        <div className={'flex-1'}>
                            <TabsContent value="section1" className={TabTriggerStyle}>
                                <PacienteSection form={historiaForm}/>
                            </TabsContent>
                            <TabsContent value="section2" className={TabTriggerStyle}>
                                <AntFamiliaresSection form={antFamiliaresForm}/>
                            </TabsContent>
                            <TabsContent value="section3" className={TabTriggerStyle}>
                                <AntPersonalesSection form={antPersonalesForm}/>
                            </TabsContent>
                            <TabsContent value="section4" className={TabTriggerStyle}>
                                <HistoriaOdontologicaSection form={historiaOdontologicaForm}/>
                            </TabsContent>
                            <TabsContent value="section5" className={TabTriggerStyle}>
                                <ExamenRadiograficoSection historiaOdontologica={historia.historia_odontologica!}
                                                           form={examenRadiograficoForm}/>
                            </TabsContent>
                            <TabsContent value="section6" className={TabTriggerStyle}>
                                <PeriodontodiagramaSection form={periodontodiagramaForm}
                                                           periodontograma={historia.historia_odontologica?.periodontodiagrama[0] ?? null}/>
                            </TabsContent>
                            <TabsContent value="section7" className={TabTriggerStyle}>
                                <EstudioModelosSection form={estudioModelosForm}/>
                            </TabsContent>
                            <TabsContent value="section8" className={TabTriggerStyle}>
                                <PlanTratamientoSection form={planTratamientoForm}/>
                            </TabsContent>
                            <TabsContent value="section9" className={TabTriggerStyle}>
                                <ModificacionesPlanTratamientoSection form={modificacionesTratamientoForm}/>
                            </TabsContent>
                            <TabsContent value="section10" className={TabTriggerStyle}>
                                <SecuenciaPlanTratamientoSection/>
                            </TabsContent>
                            <TabsContent value="section11" className={TabTriggerStyle}>
                                <HistoriaPeriodontalSection readonly={readMode} historia_id={historia.id}
                                                            historia_periodontal={historia.historia_odontologica!.historia_periodontal}/>
                            </TabsContent>
                            <TabsContent value="section12" className={TabTriggerStyle}>
                                <ControlPlacaSection/>
                            </TabsContent>
                            <TabsContent value="section13" className={TabTriggerStyle}>
                                <MediaSection media={historia?.historia_odontologica?.anymedia ?? []}
                                              historia_id={historia.id} readmode={readMode}/>
                            </TabsContent>
                        </div>
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
