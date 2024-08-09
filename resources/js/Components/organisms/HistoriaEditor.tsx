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
import TrastornosFormSchema, {Trastornos} from "@/FormSchema/Historia/TrastornosForm";
import HistoriaFormSchema, {Historia} from "@/FormSchema/Historia/HistoriaForm";
import HistoriaOdontologicaFormSchema, {HistoriaOdontologica} from "@/FormSchema/Historia/HistoriaOdontologicaForm";
import Checkbox from "@/Components/atoms/Checkbox";
import Input from "@/Components/atoms/Input";
import Textarea from "@/Components/atoms/Textarea";
import Label from "@/Components/atoms/Label";


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

    const trastornosForm = useForm<z.infer<typeof TrastornosFormSchema>>({
        resolver: zodResolver(TrastornosFormSchema),
        defaultValues: Trastornos,
    })

    const historiaOdontologicaForm = useForm<z.infer<typeof HistoriaOdontologicaFormSchema>>({
        resolver: zodResolver(HistoriaOdontologicaFormSchema),
        defaultValues: HistoriaOdontologica
    })

    return (
        <div className={'w-full h-full px-6 py-6'}>

            <Tabs defaultValue="paciente" className="flex h-full" orientation={'vertical'}>
                <TabsList className={'flex flex-col items-end justify-start p-0'}>
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
                                <UserCircleIcon/>
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

// const Historia = ({form}) => {
//
//     const {errors} = React.useContext(HistoriaEditorContext)
//     const route = useRoute()
//
//     return (
//         <Surface className={SectionStyle}>
//             <Title level={'title-lg'}>Datos Personales</Title>
//
//         </Surface>
//     )
// }

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
                                    <div id={key} className={'grid grid-cols-2 gap-2 border rounded-lg p-6 content-start'} key={key}>
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
                                                                                <Checkbox id={field.name} checked={field.value}
                                                                                          onCheckedChange={field.onChange}/>
                                                                            </FormControl>
                                                                            <FormLabel htmlFor={field.name} className={'capitalize'}>{trastorno.replace('_', ' ')}</FormLabel>
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

export default HistoriaEditor
