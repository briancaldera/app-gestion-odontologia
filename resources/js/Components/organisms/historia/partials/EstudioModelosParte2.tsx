import React from "react";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {z} from "zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {estudioModelosSchema, interconsultasItems} from "@/FormSchema/Historia/EstudioModelosSchema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";

const EstudioModelosParte2 = () => {
    const {historia, disabled} = React.useContext(HistoriaEditorContext)
    const {examenes_comp, interconsultas, diagnostico, pronostico} = historia.historia_odontologica?.estudio_modelos!

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = disabled

    const estudioModelosParte2Form = useForm<z.infer<typeof estudioModelosParte2Schema>>({
        resolver: zodResolver(estudioModelosParte2Schema),
        defaultValues: {
            examenes_comp: examenes_comp ?? '',
            interconsultas:
                {
                    list: [...interconsultas.list],
                    descripcion: interconsultas.descripcion ?? '',
                },
            diagnostico: diagnostico ?? '',
            pronostico: pronostico ?? ''
        },
        disabled: isDisabled
    })

    const handleSubmit = (values: z.infer<typeof estudioModelosParte2Schema>) => {

        const endpoint = route('historias.odontologica.modelos.update', {
            historia: historia.id
        })

        const body = {
            ...values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(estudioModelosParte2Form, errors)
            },
            onSuccess: _page => {
                estudioModelosParte2Form.reset(values)
            }
        })
    }

    return (
        <div>
            <Title level={'title-lg'}>Exámenes Complementarios</Title>

            <Form {...estudioModelosParte2Form}>
                <form onSubmit={estudioModelosParte2Form.handleSubmit(handleSubmit)}>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel></FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'examenes_comp'} control={estudioModelosParte2Form.control}/>

                    <div>
                        <FormField
                            control={estudioModelosParte2Form.control}
                            name='interconsultas.list' render={() => (

                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Interconsultas</FormLabel>
                                    <FormDescription>Fecha y firma del docente</FormDescription>
                                </div>
                                <div className='flex flex-wrap gap-3'>
                                    {interconsultasItems.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={estudioModelosParte2Form.control}
                                            name='interconsultas.list'
                                            render={({field}) => {
                                                return (
                                                    <FormItem
                                                        key={item.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                disabled={field.disabled}
                                                                checked={field.value?.includes(item.id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item.id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item.id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {item.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                </div>
                                <FormMessage/>
                            </FormItem>

                        )}/>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'interconsultas.descripcion'} control={estudioModelosParte2Form.control}/>
                    </div>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>Diagnóstico</FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'diagnostico'} control={estudioModelosParte2Form.control}/>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>Pronóstico (General/Específicos)</FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'pronostico'} control={estudioModelosParte2Form.control}/>

                    <div className={'flex justify-end py-3'}>
                        <Button type='submit'
                                disabled={estudioModelosParte2Form.formState.disabled || !estudioModelosParte2Form.formState.isDirty}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

const estudioModelosParte2Schema = estudioModelosSchema.pick({
    examenes_comp: true,
    interconsultas: true,
    diagnostico: true,
    pronostico: true
})

export default EstudioModelosParte2
