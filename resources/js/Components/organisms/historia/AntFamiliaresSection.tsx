import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {useRoute} from "ziggy-js";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import {Text} from "@/Components/atoms/Text";
import Textarea from "@/Components/atoms/Textarea";
import React from "react";
import AntFamiliaresSchema from "@/FormSchema/Historia/AntFamiliaresSchema";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {Button} from "@/shadcn/ui/button";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";

type AntFamiliaresSectionProps = {
    form: UseFormReturn<z.infer<typeof AntFamiliaresSchema>>
}

const AntFamiliaresSection = ({form}: AntFamiliaresSectionProps) => {
    const route = useRoute()

    const { isProcessing, router } = useInertiaSubmit()

    const handleSubmit = (values: z.infer<typeof AntFamiliaresSchema>) => {

        const endpoint = route('historias.antfamiliares.update', {
            historia: values.historia_id
        })

        router.patch(endpoint, {...values}, {
            onError: errors => mapServerErrorsToFields(form, errors),
            onSuccess: _page => {
                form.reset(values)
            }
        })
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
                                Object.keys(AntFamiliaresSchema.shape).filter(key => key !== 'historia_id').map(familiar => {

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

                    <div className={'flex justify-end mt-2'}>
                        <Button disabled={isProcessing || !form.formState.isDirty || form.formState.disabled}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </Surface>
    )
}

export default AntFamiliaresSection
