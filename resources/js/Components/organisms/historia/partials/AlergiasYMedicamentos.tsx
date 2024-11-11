import React from "react";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {
    alergiaItems,
    alergiaSchema,
    medicamentoItems,
    medicamentoSchema
} from "@/FormSchema/Historia/AntPersonalesSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import Title from "@/Components/atoms/Title";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";

const AlergiasYMedicamentos = () => {
    const {historia, disabled} = React.useContext(HistoriaEditorContext)
    const {alergias, medicamentos} = historia.ant_personales!

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = disabled

    const medAlerForm = useForm<z.infer<typeof medAlerSchema>>({
        resolver: zodResolver(medAlerSchema),
        defaultValues: {
            alergias: {
                tipo: [...alergias.tipo],
                descripcion: alergias.descripcion ?? ''
            },
            medicamentos: {
                tipo:  [...medicamentos.tipo],
                dosis: medicamentos.dosis ?? ''
            }
        },
        disabled: isDisabled,
    })

    const handleSubmit = (values: z.infer<typeof medAlerSchema>) => {

        const endpoint = route('historias.antpersonales.update', {
            historia: historia.id
        })

        const body = {
            ...values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(medAlerForm, errors)
            },
            onSuccess: _page => {
                medAlerForm.reset(values)
            }
        })
    }

    return (
        <div>
            <Form {...medAlerForm}>
                <form onSubmit={medAlerForm.handleSubmit(handleSubmit)}>

                    <div className='border rounded-lg p-6 space-y-3'>

                        <FormField
                            control={medAlerForm.control}
                            name={'medicamentos.tipo'} render={() => (

                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Medicamentos</FormLabel>
                                    <FormDescription></FormDescription>
                                </div>
                                <div className='flex flex-col sm:flex-row sm:flex-wrap gap-3'>
                                    {medicamentoItems.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={medAlerForm.control}
                                            name="medicamentos.tipo"
                                            render={({field}) => {
                                                return (
                                                    <FormItem
                                                        key={item.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                disabled={medAlerForm.formState.disabled}
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
                                <FormLabel>
                                    Dosis
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name='medicamentos.dosis' control={medAlerForm.control}/>

                    </div>

                    <div className='border rounded-lg p-6 space-y-3'>
                        <FormField
                            control={medAlerForm.control}
                            name={'alergias.tipo'} render={() => (

                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Alergias</FormLabel>
                                    <FormDescription></FormDescription>
                                </div>
                                <div className='flex gap-3 flex-col sm:flex-row justify-evenly'>
                                    {alergiaItems.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={medAlerForm.control}
                                            name="alergias.tipo"
                                            render={({field}) => {
                                                return (
                                                    <FormItem
                                                        key={item.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                disabled={medAlerForm.formState.disabled}
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
                                <FormLabel>
                                    Descripción
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name='alergias.descripcion' control={medAlerForm.control}/>
                    </div>

                    <div className={'flex justify-end'}>
                        <Button type='submit'
                                disabled={medAlerForm.formState.disabled || !medAlerForm.formState.isDirty}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

const medAlerSchema = z.object({
    medicamentos: medicamentoSchema,
    alergias: alergiaSchema
})

export default AlergiasYMedicamentos
