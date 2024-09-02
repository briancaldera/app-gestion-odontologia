import Surface from '@/Components/atoms/Surface'
import {UserCircleIcon} from '@heroicons/react/24/outline'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs"
import {Icon} from "@/Components/atoms/Icon";
import {useForm, UseFormReturn} from "react-hook-form"
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/shadcn/ui/form";
import {useRoute} from "ziggy-js";
import React from "react";
import Title from "@/Components/atoms/Title";
import PacienteSchema, {PacienteDefaults} from "@/FormSchema/Historia/PacienteSchema";
import AntPersonalesSchema, {AntPersonalesDefaults} from "@/FormSchema/Historia/AntPersonalesSchema";
import AntFamiliaresSchema, {AntFamiliaresDefaults} from "@/FormSchema/Historia/AntFamiliaresSchema";
import HistoriaSchema, {HistoriaDefaults} from "@/FormSchema/Historia/HistoriaSchema";
import HistoriaOdontologicaSchema, {
    HistoriaOdontologicaDefaults
} from "@/FormSchema/Historia/HistoriaOdontologicaSchema";
import ExamenRadiograficoSchema, {ExamenRadiografico} from '@/FormSchema/Historia/ExamenRadiograficoForm'
import {Text} from "@/Components/atoms/Text";
import {Bone, BriefcaseMedical, FileBox, HeartPulse, Hospital, ListChecks, RefreshCcwDot, Users} from "lucide-react"
import DragAndDrop from "@/Components/molecules/DragAndDrop";
import AnalisisSlot from "@/Components/organisms/AnalisisSlot";
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
import deepMerge from "react-hook-form/dist/utils/deepMerge";
import {mergeDeep} from "@/src/Utils/Utils";

const TabTriggerStyle = 'p-0 m-0'

const SectionStyle = 'w-full px-6 min-h-screen'

const HistoriaEditorContext = React.createContext({})

interface HistoriaEditorProps {
    historia: Historia
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

    const defaults = (historia?.historia_odontologica?.plan_tratamiento) ? {
        plan_tratamiento: historia.historia_odontologica?.plan_tratamiento ?? [],
        historia_id: historia.id
    } satisfies z.infer<typeof PlanTratamientoSchema> : Object.assign(PlanTratamientoDefaults, {historia_id: historia?.id}) satisfies z.infer<typeof PlanTratamientoSchema>

    const planTratamientoForm = useForm<z.infer<typeof PlanTratamientoSchema>>({
        resolver: zodResolver(PlanTratamientoSchema),
        defaultValues: defaults
    })

    const modificacionesDefaults = (historia.historia_odontologica?.modificaciones_plan_tratamiento) ? {
        modificaciones_plan_tratamiento: historia.historia_odontologica?.modificaciones_plan_tratamiento ?? [],
        historia_id: historia.id
    } satisfies z.infer<typeof ModificacionesPlanTratamientoSchema> : Object.assign(ModificacionesPlanTratamientoDefaults, {historia_id: historia?.id}) satisfies z.infer<typeof ModificacionesPlanTratamientoSchema>

    const modificacionesTratamientoForm = useForm<z.infer<typeof ModificacionesPlanTratamientoSchema>>({
        resolver: zodResolver(ModificacionesPlanTratamientoSchema),
        defaultValues: modificacionesDefaults
    })

    const secuenciaDefaults = (historia.historia_odontologica?.secuencia_tratamiento) ? {
        secuencia_tratamiento: historia.historia_odontologica?.secuencia_tratamiento ?? [],
        historia_id: historia.id
    } satisfies z.infer<typeof SecuenciaTratamientoSchema> : Object.assign(SecuenciaTratamientoDefaults, {historia_id: historia.id}) satisfies z.infer<typeof SecuenciaTratamientoSchema>

    const secuenciaTratamientoForm = useForm<z.infer<typeof SecuenciaTratamientoSchema>>({
        resolver: zodResolver(SecuenciaTratamientoSchema),
        defaultValues: secuenciaDefaults
    })

    const examenRadiograficoForm = useForm<z.infer<typeof ExamenRadiograficoSchema>>({
        resolver: zodResolver(ExamenRadiograficoSchema),
        defaultValues: ExamenRadiografico,
    })

    const estudioModelosDefaults = (historia.historia_odontologica?.estudio_modelos) ? mergeDeep({...EstudioModelosDefaults}, {estudio_modelos: historia.historia_odontologica?.estudio_modelos}, {historia_id: historia.id}) satisfies z.infer<typeof EstudioModelosSchema>
        : Object.assign(EstudioModelosDefaults, {historia_id: historia.id}) satisfies z.infer<typeof EstudioModelosSchema>

    const estudioModelosForm = useForm<z.infer<typeof EstudioModelosSchema>>({
        resolver: zodResolver(EstudioModelosSchema),
        defaultValues: estudioModelosDefaults,
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
                                <BriefcaseMedical />
                            </Icon>
                        </Surface>
                    </TabsTrigger>
                    <TabsTrigger value="modificacionesPlanTratamiento" className={'p-0'}>
                        <Surface>
                            <Icon className={'size-8'}>
                                <RefreshCcwDot />
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

export default HistoriaEditor
