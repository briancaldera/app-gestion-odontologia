import {useForm} from "react-hook-form";
import {z} from "zod";
import AntFamiliaresFormSchema from "@/FormSchema/Historia/AntFamiliaresSchema";
import {useRoute} from "ziggy-js";
import PacienteSchema from "@/FormSchema/Historia/PacienteSchema";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import {Text} from "@/Components/atoms/Text";
import Textarea from "@/Components/atoms/Textarea";
import React from "react";

type AntFamiliaresSectionProps = {
    form: ReturnType<typeof useForm<typeof z.infer<typeof AntFamiliaresFormSchema>>>
}

const AntFamiliaresSection = ({form}: AntFamiliaresSectionProps) => {
    const route = useRoute()

    const handleSubmit = (values: z.infer<typeof PacienteSchema>) => {
        console.log(values)

        // router.post(route(''), Object.create(values))
    }

    return (
        <Surface className={'w-full px-6 min-h-screen'}>

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

export default AntFamiliaresSection
