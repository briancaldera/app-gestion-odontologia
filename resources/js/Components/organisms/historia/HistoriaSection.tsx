import {UseFormReturn} from "react-hook-form";
import {z} from 'zod'
import historiaSchema from "@/FormSchema/Historia/HistoriaSchema";
import Title from "@/Components/atoms/Title";
import React from "react";
import Surface from "@/Components/atoms/Surface";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import {Textarea} from "@/shadcn/ui/textarea";
import {Button} from "@/shadcn/ui/button";
import {useRoute} from "ziggy-js";
import {router} from '@inertiajs/react'
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";

interface HistoriaSectionProps {
    historia?: string
    form: UseFormReturn<z.infer<typeof historiaSchema>>
}

const HistoriaSection = ({form}: HistoriaSectionProps) => {

    const route = useRoute()
    const {processing, post} = useInertiaSubmit()

    const handleSubmit = (values: z.infer<typeof historiaSchema>) => {
        const endpoint = route('historias.update')


        post(endpoint, values)
    }

    return (
        <Surface className={'w-full p-12 min-h-screen'}>
            <Title level={'title-lg'}>Historia</Title>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={'grid grid-cols-1 sm:grid-cols-4 gap-4'}>

                    <div className={'col-span-2'}>
                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Enfermedad Actual</FormLabel>
                                <FormControl>
                                    <Textarea value={field.value} onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'enfermedad_actual'} control={form.control}/>
                    </div>

                    <div className={'col-span-2'}>
                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Motivo de la consulta</FormLabel>
                                <FormControl>
                                    <Textarea value={field.value} onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'motivo_consulta'} control={form.control}/>
                    </div>

                    <div className={'col-span-full flex justify-end gap-2'}>
                        <Button disabled={processing || !form.formState.isDirty}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </Surface>
    )
}

export default HistoriaSection
