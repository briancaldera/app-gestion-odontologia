import Surface from '@/Components/atoms/Surface'
import {UserCircleIcon} from '@heroicons/react/24/outline'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs"
import {Icon} from "@/Components/atoms/Icon";
import {useForm} from "react-hook-form"
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import {useRoute} from "ziggy-js";
import {Button} from "@/shadcn/ui/button"
import React from "react";
import Title from "@/Components/atoms/Title";
import Field from "@/Components/molecules/Field";
import DatePicker from "@/Components/molecules/DatePicker";
import PacienteFormSchema, {Paciente} from "@/FormSchema/Historia/PacienteForm";
import AntPersonalesFormSchema, {AntPersonalesForm} from "@/FormSchema/Historia/AntPersonalesForm";
import AntFamiliaresFormSchema, {AntFamiliaresForm} from "@/FormSchema/Historia/AntFamiliaresForm";
import HistoriaFormSchema, {Historia} from "@/FormSchema/Historia/HistoriaForm";
import HistoriaOdontologicaFormSchema, {HistoriaOdontologica} from "@/FormSchema/Historia/HistoriaOdontologicaForm";
import Checkbox from "@/Components/atoms/Checkbox";
import Input from "@/Components/atoms/Input";
import Textarea from "@/Components/atoms/Textarea";
import Label from "@/Components/atoms/Label";
import {Text} from "@/Components/atoms/Text";
import {HeartPulse, Hospital, Users, Bone} from "lucide-react"
import Tooltip from "@/Components/atoms/Tooltip"


const TabTriggerStyle = 'p-0 m-0'

const SectionStyle = 'w-full px-6 min-h-screen'

const HistoriaEditorContext = React.createContext({errors: null})

const HistoriaEditor = ({errors = null}) => {

    const pacienteForm = useForm<z.infer<typeof PacienteFormSchema>>({
        resolver: zodResolver(PacienteFormSchema),
        defaultValues: Paciente,
    })

    const historiaForm = useForm<z.infer<typeof HistoriaFormSchema>>({
        resolver: zodResolver(HistoriaFormSchema),
        defaultValues: Historia,
    })

    const antPersonalesForm = useForm<z.infer<typeof AntPersonalesFormSchema>>({
        resolver: zodResolver(AntPersonalesFormSchema),
        defaultValues: AntPersonalesForm,
    })

    const antFamiliaresForm = useForm<z.infer<typeof AntFamiliaresFormSchema>>({
        resolver: zodResolver(AntFamiliaresFormSchema),
        defaultValues: AntFamiliaresForm,
    })

    const historiaOdontologicaForm = useForm<z.infer<typeof HistoriaOdontologicaFormSchema>>({
        resolver: zodResolver(HistoriaOdontologicaFormSchema),
        defaultValues: HistoriaOdontologica
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
                </TabsList>
                <div className={'w-full h-full'}>
                    <HistoriaEditorContext.Provider value={{errors: errors}}>
                        <TabsContent value="paciente" className={TabTriggerStyle}>
                            <PacienteSection form={pacienteForm}/>
                        </TabsContent>
                        <TabsContent value="antPersonales" className={TabTriggerStyle}>
                            <AntecedentesMedicosPersonalesSection form={antPersonalesForm}/>
                        </TabsContent>
                        <TabsContent value="antFamiliares" className={TabTriggerStyle}>
                            <AntecedentesMedicosFamiliaresSection form={antFamiliaresForm}/>
                        </TabsContent>
                        <TabsContent value="historiaOdon" className={TabTriggerStyle}>
                            <HistoriaOdontologicaSection form={historiaOdontologicaForm}/>
                        </TabsContent>
                        <TabsContent value="examenRadiografico" className={TabTriggerStyle}>
                            <ExamenRadiograficoSection form={historiaOdontologicaForm}/>
                        </TabsContent>
                    </HistoriaEditorContext.Provider>
                </div>
            </Tabs>

        </div>
    )
}

const PacienteSection = ({form}) => {

    const {errors} = React.useContext(HistoriaEditorContext)
    const route = useRoute()

    const [processing, setProcessing] = React.useState(false)

    const handleSubmit = (values: z.infer<typeof PacienteFormSchema>) => {
        console.log(values)

        // router.post(route(''), Object.create(values))
    }

    return (
        <Surface className={SectionStyle}>
            <Title level={'title-lg'}>Datos Personales</Title>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={'grid grid-cols-1 sm:grid-cols-3 gap-4'}>

                    <div className={'col-span-1'}>
                        <Field control={form.control} name={'cedula'} label={'Cédula'}/>
                    </div>

                    <div className={'hidden sm:block'}></div>
                    <div className={'row-span-3 bg-amber-200'}></div>

                    <Field control={form.control} name={'nombre'} label={'Nombre'}/>

                    <Field control={form.control} name={'apellido'} label={'Apellido'}/>

                    <div className={'grid grid-cols-2 gap-4'}>
                        <Field control={form.control} name={'edad'} label={'Edad'} type={'number'}/>
                        <Field control={form.control} name={'peso'} label={'Peso'} type={'number'}/>
                    </div>

                    <div className={'grid grid-cols-4 gap-4'}>
                        <div className={'col-span-1'}>
                            <Field control={form.control} name={'sexo'} label={'Sexo'}/>
                        </div>
                        <div className={'col-span-3'}>
                            <DatePicker control={form.control} label={'Fecha de nacimiento'} name={'fecha_nacimiento'}/>
                        </div>
                    </div>

                    <div className={'col-span-2'}>
                        <Field control={form.control} name={'direccion'} label={'Dirección'}/>
                    </div>

                    <Field control={form.control} name={'telefono'} label={'Teléfono'} type={'tel'}
                           placeholder={'Ejemplo: 0414-1234567'}/>


                    <Field control={form.control} name={'ocupacion'} label={'Ocupación'}/>


                    <div className={'hidden sm:block'}></div>
                    <div className={'hidden sm:block'}></div>

                    <div className={'w-full'}>
                        <Button type={'submit'}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </Surface>
    )
}

type AntecedentesMedicosFamiliaresSectionProps = {
    form: ReturnType<typeof useForm<typeof z.infer<typeof AntFamiliaresFormSchema>>>
}

const AntecedentesMedicosFamiliaresSection = ({form}: AntecedentesMedicosFamiliaresSectionProps) => {
    const {errors} = React.useContext(HistoriaEditorContext)
    const route = useRoute()

    const handleSubmit = (values: z.infer<typeof PacienteFormSchema>) => {
        console.log(values)

        // router.post(route(''), Object.create(values))
    }

    return (
        <Surface className={SectionStyle}>

            <Title level={'title-lg'}>Antecedentes Médicos Familiares</Title>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={''}>

                    <section>
                        <header className={'mb-1.5 mt-5 space-y-1.5'}>
                            <Title level={'title-md'}>Antecedentes Médicos Familiares</Title>
                            <Text level={'body-sm'}>Describa el estado actual o causa de muerte de padres hermanos y
                                abuelos.</Text>
                        </header>


                        <div
                            className={'grid grid-cols-1 sm:grid-cols-2 gap-6 border rounded-2xl border-slate-300 p-3'}>
                            {
                                Object.keys(form.formState.defaultValues).filter(key => key !== 'historia_id').map(familiar => {

                                    return (
                                        <div key={familiar}>
                                            <FormField render={({field}) => (
                                                <FormItem>
                                                    <FormLabel className={'capitalize'}
                                                               htmlFor={field.name}>{familiar.replace('_', ' ')}</FormLabel>
                                                    <FormControl>
                                                        <Textarea className={'h-36'} id={field.name} {...field}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )} name={familiar} control={form.control}/>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </section>

                </form>
            </Form>
        </Surface>
    )
}

type AntecedentesMedicosPersonalesSectionProps = {
    form: ReturnType<typeof useForm<typeof z.infer<typeof AntPersonalesFormSchema>>>
}

const AntecedentesMedicosPersonalesSection = ({form}: AntecedentesMedicosPersonalesSectionProps) => {

    const {errors} = React.useContext(HistoriaEditorContext)
    const route = useRoute()

    const handleSubmit = (values: z.infer<typeof PacienteFormSchema>) => {
        console.log(values)

        // router.post(route(''), Object.create(values))
    }
    return (

        <Surface className={SectionStyle}>

            <Title level={'title-lg'}>Antecedentes Médicos Personales</Title>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={''}>

                    <section className={'my-6'}>
                        <header>
                            <Title level={'title-md'}>Trastornos</Title>
                        </header>

                        <div
                            className={'grid grid-cols-1 sm:grid-cols-2 gap-6 border rounded-2xl border-slate-300 p-3'}>
                            {

                                Object.entries(form.formState.defaultValues.trastornos).filter(([key, _]) => key !== 'historia_id').map(([key, value]: [string, object]) => (
                                    <div id={key}
                                         className={'grid grid-cols-2 gap-2 border rounded-lg p-6 content-start'}
                                         key={key}>
                                        <div className={'col-span-full capitalize'}>
                                            <Label htmlFor={key}>{key}</Label>
                                        </div>
                                        {
                                            Object.keys(value).filter(trastorno => trastorno !== 'otros').map(trastorno => {
                                                return (
                                                    <div key={trastorno}>
                                                        <FormField render={({field}) => {
                                                            return (
                                                                <div key={trastorno}>
                                                                    <FormItem className={'flex flex-col'}>
                                                                        <div className={'flex items-center gap-2'}>
                                                                            <FormControl>
                                                                                <Checkbox id={field.name}
                                                                                          checked={field.value}
                                                                                          onCheckedChange={field.onChange}/>
                                                                            </FormControl>
                                                                            <FormLabel htmlFor={field.name}
                                                                                       className={'capitalize'}>{trastorno.replace('_', ' ')}</FormLabel>
                                                                        </div>
                                                                        <FormMessage/>
                                                                    </FormItem>
                                                                </div>
                                                            )
                                                        }} name={`trastornos.${key}.${trastorno}`}
                                                                   control={form.control}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ))
                            }
                        </div>


                    </section>

                    <section className={'my-6'}>
                        <header>
                            <Title level={'title-md'}>Alergias</Title>
                        </header>

                        <div
                            className={'grid sm:flex grid-cols-1 items-center gap-6 border rounded-2xl border-slate-300 p-3'}>
                            {
                                Object.keys(form.formState.defaultValues.alergias).filter(alergia => alergia !== 'descripcion').map(alergia => (
                                    <div key={alergia}>
                                        <FormField render={({field}) => (
                                            <FormItem className={'flex gap-2 items-center'}>
                                                <FormControl>
                                                    <Checkbox id={field.name} checked={field.value}
                                                              onCheckedChange={field.onChange}/>
                                                </FormControl>
                                                <Title level={'title-md'} className={'capitalize'}>{alergia}</Title>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={`alergias.${alergia}`} control={form.control}/>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={'mt-4'}>
                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel htmlFor={field.name} className={'mb-1.5'}>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea id={field.name} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'alergias.descripcion'} control={form.control}/>
                        </div>
                    </section>

                    <hr/>

                    <section className={'my-6'}>
                        <header>
                            <Title level={'title-md'}>Medicamentos que toma actualmente (mg y dosis diaria)</Title>
                        </header>

                        <div
                            className={'col-span-full grid grid-cols-1 gap-4 sm:grid-cols-3 border rounded-2xl border-slate-300 p-3'}>
                            {
                                Object.keys(form.formState.defaultValues.medicamentos).filter(medicamento => medicamento !== 'otros').map(medicamento => (
                                    <div key={medicamento}>
                                        <div className={'flex gap-4 items-center'}>
                                            <FormField render={({field}) =>
                                                <FormItem className={'flex gap-4 items-center'}>
                                                    <FormControl>
                                                        <Checkbox id={field.name} checked={field.value}
                                                                  onCheckedChange={field.onChange}/>
                                                    </FormControl>
                                                    <FormLabel htmlFor={field.name}
                                                               className={'capitalize'}>{medicamento}</FormLabel>
                                                </FormItem>
                                            } name={`medicamentos.${medicamento}.positivo`}
                                                       control={form.control}/>
                                            <FormField render={({field}) =>
                                                <FormItem className={'flex items-top gap-1'}>
                                                    <FormControl>
                                                        <Input id={field.name} {...field} type={'number'} step={'0.1'}
                                                               className={'text-xl'}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                    <FormLabel htmlFor={field.name}
                                                               className={'font-light text-xs text-neutral-500 text-muted'}>mg</FormLabel>
                                                </FormItem>
                                            } name={`medicamentos.${medicamento}.dosis`}
                                                       control={form.control}/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                    <Button type={"submit"}>Guardar</Button>

                </form>
            </Form>
        </Surface>
    )
}

type HistoriaOdontologicaSectionProps = {
    form: ReturnType<typeof useForm<typeof z.infer<typeof HistoriaOdontologicaFormSchema>>>
}

const HistoriaOdontologicaSection = ({form}: HistoriaOdontologicaSectionProps) => {

    const {errors} = React.useContext(HistoriaEditorContext)
    const route = useRoute()

    const handleSubmit = (values: z.infer<typeof PacienteFormSchema>) => {
        console.log(values)

        // router.post(route(''), Object.create(values))
    }


    return (

        <Surface className={SectionStyle}>

            <Title level={'title-lg'}>Historia Odontologica</Title>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={''}>

                    <section className={'my-6'}>
                        <header className={'mb-1.5 mt-5 space-y-1'}>
                            <Title level={'title-md'}>Antecedentes Odontologicos Personales</Title>
                            <Text>Restauraciones, cirugías, prótesis, tratamientos periodontales, endodonticos,
                                ortodonticos que ha recibido el paciente</Text>
                        </header>

                        <div>
                            <FormField render={({field}) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea id={field.name} className={'min-h-48'} {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }} name={'ant_personales'} control={form.control}/>
                        </div>

                        <div className={'grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'}>

                            <section
                                className={'col-span-full sm:col-span-1 border rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-2 p-5 content-start'}>
                                <div className={'col-span-full'}>
                                    <Title>Portador</Title>
                                    <Text level={'body-sm'}>Seleccione las opciones que apliquen al paciente</Text>
                                </div>
                                {
                                    Object.keys(form.formState.defaultValues.portador).map(item => (
                                        <div key={item} className={'col-span-full'}>
                                            <FormField render={({field}) => (
                                                <FormItem>
                                                    <div className={'flex items-center gap-1'}>
                                                        <FormControl>
                                                            <Checkbox id={field.name} checked={field.value}
                                                                      onCheckedChange={field.onChange}/>
                                                        </FormControl>
                                                        <FormLabel htmlFor={field.name}
                                                                   className={'capitalize'}>{item}</FormLabel>
                                                    </div>
                                                    <FormMessage/>
                                                </FormItem>
                                            )} name={`portador.${item}`} control={form.control}/>
                                        </div>
                                    ))
                                }
                            </section>

                            <section
                                className={'col-span-full sm:col-span-2 border rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-2 p-5 content-start'}>
                                <div className={'col-span-full'}>
                                    <Title>Hábitos</Title>
                                    <Text level={'body-sm'}>Seleccione los hábitos que presenta el paciente</Text>
                                </div>
                                <div
                                    className={'col-span-full grid grid-cols-1 gap-2 grid-flow-col-dense sm:grid-cols-4 sm:grid-rows-5'}>
                                    {
                                        Object.keys(form.formState.defaultValues.habitos).filter(habito => habito !== 'descripcion').sort().map(habito => {
                                            return (
                                                <div key={habito}>
                                                    <FormField render={({field}) => (
                                                        <FormItem>
                                                            <div className={'flex gap-2'}>
                                                                <FormControl>
                                                                    <Checkbox id={field.name} checked={field.value}
                                                                              onCheckedChange={field.onChange}/>
                                                                </FormControl>
                                                                <FormLabel htmlFor={field.name}
                                                                           className={'capitalize'}>{habito.replace('_', ' ')}</FormLabel>
                                                            </div>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )} name={`habitos.${habito}`} control={form.control}/>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                                <div className={'col-span-full'}>
                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <div className={'mt-1'}>
                                                <FormLabel htmlFor={field.name}>Descripción</FormLabel>
                                                <Text level={'body-sm'}>En caso de presentar algún hábito explique desde
                                                    cuándo y la frecuencia</Text>
                                            </div>
                                            <FormControl>
                                                <Textarea id={field.name} {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={'habitos.descripcion'} control={form.control}/>
                                </div>

                            </section>

                        </div>
                    </section>

                    <section className={'my-6 border rounded-lg p-5'}>
                        <header className={'mb-1.5 space-y-1'}>
                            <Title level={'title-md'}>Examen físico</Title>
                        </header>

                        <section>
                            <header>
                                <Title level={'title-sm'}>Signos vitales</Title>
                            </header>

                            <div className={'grid grid-cols-8 gap-2'}>
                                <div className={'grid grid-cols-1'}>
                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name}
                                                       className={'capitalize'}>Diastole</FormLabel>
                                            <div className={'flex items-baseline gap-2'}>
                                                <FormControl>
                                                    <Input id={field.name} {...field} type={'number'}/>
                                                </FormControl>
                                                <Text level={'body-md'} className={'font-bold '}>mmHg</Text>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={'examen_fisico.signos_vitales.tension_arterial.diastole'}
                                               control={form.control}/>
                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name} className={'capitalize'}>Sistole</FormLabel>
                                            <div className={'flex items-baseline gap-2'}>
                                                <FormControl>
                                                    <Input id={field.name} {...field} type={'number'}/>
                                                </FormControl>
                                                <Text level={'body-md'} className={'font-bold '}>mmHg</Text>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={'examen_fisico.signos_vitales.tension_arterial.sistole'}
                                               control={form.control}/>
                                </div>

                                <div className={'col-span-7 grid grid-cols-1 sm:grid-cols-4 gap-6'}>
                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name} className={'capitalize'}>Pulso</FormLabel>
                                            <div className={'flex gap-2 items-baseline'}>
                                                <FormControl>
                                                    <Input id={field.name}  {...field} type={'number'}/>
                                                </FormControl>
                                                <Tooltip>
                                                    <Tooltip.Trigger onClick={(e) => e.preventDefault()}>
                                                        <abbr>PPM</abbr>
                                                    </Tooltip.Trigger>
                                                    <Tooltip.Content>
                                                        Pulsaciones por minuto
                                                    </Tooltip.Content>
                                                </Tooltip>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={'examen_fisico.signos_vitales.pulso'} control={form.control}/>

                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name}
                                                       className={'capitalize'}>Respiración</FormLabel>
                                            <div className={'flex gap-2 items-baseline'}>
                                                <FormControl>
                                                    <Input id={field.name}  {...field} type={'number'}/>
                                                </FormControl>
                                                <Tooltip>
                                                    <Tooltip.Trigger onClick={(e) => e.preventDefault()}>
                                                        <abbr>RPM</abbr>
                                                    </Tooltip.Trigger>
                                                    <Tooltip.Content>
                                                        Respiraciones por minuto
                                                    </Tooltip.Content>
                                                </Tooltip>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={'examen_fisico.signos_vitales.respiracion'} control={form.control}/>

                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name}
                                                       className={'capitalize'}>Temperatura</FormLabel>
                                            <div className={'flex gap-2 items-baseline'}>
                                                <FormControl>
                                                    <Input id={field.name}  {...field} type={'number'} step={0.1}/>
                                                </FormControl>
                                                <Tooltip>
                                                    <Tooltip.Trigger onClick={(e) => e.preventDefault()}>
                                                        <em>C°</em>
                                                    </Tooltip.Trigger>
                                                    <Tooltip.Content>
                                                        Grados Celsius
                                                    </Tooltip.Content>
                                                </Tooltip>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={'examen_fisico.signos_vitales.temperatura'} control={form.control}/>
                                </div>
                            </div>
                        </section>

                        <section className={'mt-6'}>
                            <header>
                                <Title level={'title-md'}>Examen Extraoral</Title>
                            </header>

                            <div>
                                {
                                    Object.keys(form.formState.defaultValues.examen_fisico.examen_extraoral).map(char => (
                                        <FormField render={({field}) => (
                                            <FormItem>
                                                <FormLabel htmlFor={field.name}
                                                           className={'capitalize'}>{char.replaceAll('_', ' ')}</FormLabel>
                                                <FormControl>
                                                    <Textarea id={field.name} {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={`examen_fisico.examen_extraoral.${char}`} control={form.control}/>
                                    ))
                                }
                            </div>
                        </section>

                        <section className={'mt-6'}>
                            <header>
                                <Title level={'title-md'}>Examen Intraoral</Title>
                            </header>

                            <div>
                                {
                                    Object.keys(form.formState.defaultValues.examen_fisico.examen_intraoral).map(char => (
                                        <FormField render={({field}) => (
                                            <FormItem>
                                                <FormLabel htmlFor={field.name}
                                                           className={'capitalize'}>{char.replaceAll('_', ' ')}</FormLabel>
                                                <FormControl>
                                                    <Textarea id={field.name} {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={`examen_fisico.examen_intraoral.${char}`} control={form.control}/>
                                    ))
                                }
                            </div>
                        </section>

                    </section>

                </form>
            </Form>
        </Surface>
    );
}

const ExamenRadiograficoSection = ({form}) => {

    const handleSubmit = (values) => {
        console.log(values)
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

                        <div>
                        </div>
                    </section>
                </form>
            </Form>
        </Surface>
    )
}

export default HistoriaEditor
