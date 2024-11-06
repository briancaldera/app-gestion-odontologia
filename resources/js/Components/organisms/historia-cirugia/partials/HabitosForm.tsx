import React from "react";
import {HistoriaCirugiaEditorContext} from "@/Components/organisms/historia-cirugia/HistoriaCirugiaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {z} from "zod";
import {habitosSchema} from "@/FormSchema/Odontologia/Cirugia/HistoriaCirugiaSchema.ts";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import Title from "@/Components/atoms/Title";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {RadioGroup, RadioGroupItem} from "@/shadcn/ui/radio-group.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Button} from "@/shadcn/ui/button.tsx";

const HabitosForm = () => {

    const {historia} = React.useContext(HistoriaCirugiaEditorContext)

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing

    const {habitos} = historia!

    const habitosForm = useForm<z.infer<typeof habitosSchema>>({
        resolver: zodResolver(habitosSchema),
        defaultValues: {
            cigarrillo_tabaco: {
                description: habitos.cigarrillo_tabaco.description ?? "",
                status: habitos.cigarrillo_tabaco.status ?? "D"
            },
            consumir_carbo_azucares: {
                description: habitos.consumir_carbo_azucares.description ?? "",
                status: habitos.consumir_carbo_azucares.status ?? "D"
            },
            morder_objetos: {
                description: habitos.morder_objetos.description ?? "",
                status: habitos.morder_objetos.status ?? "D"
            },
            muerde_unas_labios: {
                description: habitos.muerde_unas_labios.description ?? "",
                status: habitos.muerde_unas_labios.status ?? "D"
            },
            rechina_aprieta_dientes: {
                description: habitos.rechina_aprieta_dientes.description ?? "",
                status: habitos.rechina_aprieta_dientes.status ?? "D"
            }
        },
        disabled: isDisabled
    })

    const handleSubmit = (values: z.infer<typeof habitosSchema>) => {

        const endpoint = route('cirugia.historias.update', {
            historia: historia!.id
        })

        const body = {
            habitos: values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(habitosForm, errors.habitos as Record<string, string>)
            }, onSuccess: _page => {
                habitosForm.reset(values)
            }
        })
    }

    return (
        <div>
            <Title level={'title-lg'}>{habitosSchema.description}</Title>


            <Form {...habitosForm}>
                <form onSubmit={habitosForm.handleSubmit(handleSubmit)}
                      className={'grid grid-cols-1 sm:grid-cols-2 gap-6'}>

                    <HabitosFormField fieldName={'cigarrillo_tabaco'} habitosForm={habitosForm}/>
                    <HabitosFormField fieldName={'consumir_carbo_azucares'} habitosForm={habitosForm}/>
                    <HabitosFormField fieldName={'morder_objetos'} habitosForm={habitosForm}/>
                    <HabitosFormField fieldName={'muerde_unas_labios'} habitosForm={habitosForm}/>
                    <HabitosFormField fieldName={'rechina_aprieta_dientes'} habitosForm={habitosForm}/>

                    <div className={'col-span-full flex justify-end'}>
                        <Button type='submit'>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

const HabitosFormField = ({fieldName, habitosForm}: {
    fieldName: string,
    habitosForm: UseFormReturn<z.infer<typeof habitosSchema>>
}) => {
    return (
        <FormField render={(fieldProps) => (
            <FormItem className={'flex items-center gap-2 flex-wrap'}>
                <FormLabel
                    className={'basis-1/6'}>{habitosSchema.shape[fieldProps.field.name].description}</FormLabel>
                <div className='flex-none flex flex-col'>
                    <FormField render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <RadioGroup className={'flex flex-col space-y-1'} onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={'S'}/>
                                        </FormControl>
                                        <FormLabel>
                                            Sí
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={'N'}/>
                                        </FormControl>
                                        <FormLabel>
                                            No
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={'D'}/>
                                        </FormControl>
                                        <FormLabel>
                                            Desconoce
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={`${fieldProps.field.name}.status`} control={habitosForm.control}/>
                </div>
                <div className={'flex-1 basis-48'}>
                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>{habitosSchema.shape[fieldProps.field.name].shape.description.description}</FormLabel>
                            <FormControl>
                                <Textarea {...field} className={'max-h-48'}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={`${fieldProps.field.name}.description`} control={habitosForm.control}/>
                </div>
                <FormMessage/>
            </FormItem>
        )} name={fieldName} control={habitosForm.control}/>
    )
}

export default HabitosForm
