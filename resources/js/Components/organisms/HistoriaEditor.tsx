import Surface from '@/Components/atoms/Surface'
import {UserCircleIcon} from '@heroicons/react/24/outline'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs"
import {Icon} from "@/Components/atoms/Icon";
import {useForm} from "react-hook-form"
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/shadcn/ui/form"
import {useRoute} from "ziggy-js";
import {Button} from "@/shadcn/ui/button"
import React from "react";
import Title from "@/Components/atoms/Title";
import Field from "@/Components/molecules/Field";
import DatePicker from "@/Components/molecules/DatePicker";
import PacienteFormSchema, {Paciente} from "@/FormSchema/Historia/PacienteForm";
import AntPersonalesFormSchema, {AntPersonalesForm} from "@/FormSchema/Historia/AntPersonalesForm";
import AntFamiliaresFormSchema, {AntFamiliaresForm} from "@/FormSchema/Historia/AntFamiliaresForm";
import TrastornosFormSchema , {TrastornosForm} from "@/FormSchema/Historia/TrastornosForm";
import HistoriaFormSchema , {Historia} from "@/FormSchema/Historia/HistoriaForm";
import HistoriaOdontologicaFormSchema, {HistoriaOdontologica} from "@/FormSchema/Historia/HistoriaOdontologicaForm";

const TabTriggerStyle = 'p-0 m-0'

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
        defaultValues: TrastornosForm,
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
                            <AntecedentesMedicosPersonalesSection/>
                        </TabsContent>
                    </HistoriaEditorContext.Provider>
                </div>
            </Tabs>

        </div>
    )
}

const SectionStyle = 'w-full px-6 h-screen'

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

const AntecedentesMedicosPersonalesSection = ({form}) => {

    const {errors} = React.useContext(HistoriaEditorContext)
    const route = useRoute()

    return (
        <Surface className={SectionStyle}>
        </Surface>
    )
}

export default HistoriaEditor
