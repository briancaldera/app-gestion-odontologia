import {useForm, UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {femeninoSchema} from "@/FormSchema/Odontologia/Cirugia/HistoriaCirugiaSchema.ts";
import {RadioGroup, RadioGroupItem} from "@/shadcn/ui/radio-group.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import React from "react";
import {HistoriaCirugiaEditorContext} from "@/Components/organisms/historia-cirugia/HistoriaCirugiaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import Title from "@/Components/atoms/Title";
import {Button} from "@/shadcn/ui/button.tsx";

const FemeninoForm = () => {

    const {historia} = React.useContext(HistoriaCirugiaEditorContext)

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing

    const {femenino} = historia!

    const femeninoForm = useForm<z.infer<typeof femeninoSchema>>({
        resolver: zodResolver(femeninoSchema),
        defaultValues: {
            anticonceptivos: {
                description: femenino.anticonceptivos.description ?? "",
                status: femenino.anticonceptivos.status ?? ""
            },
            embarazo: {
                description: femenino.embarazo.description ?? "",
                status: femenino.embarazo.status ?? ""
            },
            ginecologo_ultimos_6_meses: {
                description: femenino.ginecologo_ultimos_6_meses.description ?? "",
                status: femenino.ginecologo_ultimos_6_meses.status ?? ""
            },
            menopausia: {
                description: femenino.menopausia.description ?? "",
                status: femenino.menopausia.status ?? ""
            },
            menstruacion_dolorosa: {
                description: femenino.menstruacion_dolorosa.description ?? "",
                status: femenino.menstruacion_dolorosa.status ?? ""
            },
            menstruacion_regular: {
                description: femenino.menstruacion_regular.description ?? "",
                status: femenino.menstruacion_regular.status ?? ""
            }
        },
        disabled: isDisabled

    })

    const handleSubmit = (values: z.infer<typeof femeninoSchema>) => {

        const endpoint = route('cirugia.historias.update', {
            historia: historia!.id
        })

        const body = {
            femenino: values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(femeninoForm, errors.femenino as Record<string, string>)
            },
            onSuccess: _page => {
                femeninoForm.reset(values)
            }
        })
    }

    return (
        <div>
            <Title level={'title-lg'}>Femenino</Title>

            <Form {...femeninoForm}>
                <form onSubmit={femeninoForm.handleSubmit(handleSubmit)}
                      className={'grid grid-cols-1 sm:grid-cols-2 gap-6'}>

                    <FemeninoFormField fieldName={'anticonceptivos'} femeninoForm={femeninoForm}/>
                    <FemeninoFormField fieldName={'embarazo'} femeninoForm={femeninoForm}/>
                    <FemeninoFormField fieldName={'ginecologo_ultimos_6_meses'} femeninoForm={femeninoForm}/>
                    <FemeninoFormField fieldName={'menopausia'} femeninoForm={femeninoForm}/>
                    <FemeninoFormField fieldName={'menstruacion_dolorosa'} femeninoForm={femeninoForm}/>
                    <FemeninoFormField fieldName={'menstruacion_regular'} femeninoForm={femeninoForm}/>

                    <div className={'col-span-full flex justify-end'}>
                        <Button type='submit'>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

const FemeninoFormField = ({fieldName, femeninoForm}: {
    fieldName: string,
    femeninoForm: UseFormReturn<z.infer<typeof femeninoSchema>>
}) => {
    return (
        <FormField render={(fieldProps) => (
            <FormItem className={'flex items-center gap-2 flex-wrap'}>
                <FormLabel
                    className={'basis-1/6'}>{femeninoSchema.shape[fieldProps.field.name].description}</FormLabel>
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
                    )} name={`${fieldProps.field.name}.status`} control={femeninoForm.control}/>
                </div>
                <div className={'flex-1 basis-48'}>
                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>{femeninoSchema.shape[fieldProps.field.name].shape.description.description}</FormLabel>
                            <FormControl>
                                <Textarea {...field} className={'max-h-48'}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={`${fieldProps.field.name}.description`} control={femeninoForm.control}/>
                </div>
                <FormMessage/>
            </FormItem>
        )} name={fieldName} control={femeninoForm.control}/>
    )
}

export default FemeninoForm
