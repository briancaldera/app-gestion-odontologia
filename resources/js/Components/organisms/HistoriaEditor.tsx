import Surface from '@/Components/atoms/Surface'
import {UserCircleIcon} from '@heroicons/react/24/outline'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs"
import {Icon} from "@/Components/atoms/Icon";
import {useForm} from "react-hook-form"
import PacienteFormSchema from "@/FormSchema/Historia/PacienteForm";
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription} from "@/shadcn/ui/form"
import {useRoute} from "ziggy-js";
import { Input } from "@/shadcn/ui/input"
import { Button } from "@/shadcn/ui/button"
import React from "react";
import {usePage, router} from "@inertiajs/react";

const TabTriggerStyle = 'p-0 m-0'

const HistoriaEditor = () => {
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
                    <TabsContent value="paciente" className={TabTriggerStyle}>
                        <PacienteSection/>
                    </TabsContent>
                    <TabsContent value="antPersonales" className={TabTriggerStyle}>
                        <AntecedentesMedicosPersonalesSection/>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

const SectionStyle = 'w-full px-6 h-screen'

const PacienteSection = () => {

    const errors = usePage().props.errors

    const route = useRoute()

    const [processing, setProcessing] = React.useState(false)

    const form = useForm<z.infer<typeof PacienteFormSchema>>({
        resolver: zodResolver(PacienteFormSchema),
        defaultValues: {
            cedula: ''
        },
    })

    const handleSubmit = (values: z.infer<typeof PacienteFormSchema>) => {
        console.log(values)

        // router.post(route(''), Object.create(values))
    }

    return (
        <Surface className={SectionStyle}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField control={form.control}
                               name={'cedula'}
                               render={({field}) =>
                                   (
                                       <FormItem>
                                           <FormLabel>Cédula</FormLabel>
                                           <FormControl>
                                               <Input {...field} />
                                           </FormControl>
                                           <FormDescription>
                                               La cedula del paciente
                                           </FormDescription>
                                           <FormMessage/>
                                       </FormItem>
                                   )}
                    />


                    <Button type={'submit'}>Guardar</Button>
                </form>
            </Form>
        </Surface>
    )
}

const AntecedentesMedicosPersonalesSection = () => {

    return (
        <Surface className={SectionStyle}>
        </Surface>
    )
}

export default HistoriaEditor
