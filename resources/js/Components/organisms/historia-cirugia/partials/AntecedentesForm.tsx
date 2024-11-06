import React from "react";
import {HistoriaCirugiaEditorContext} from "@/Components/organisms/historia-cirugia/HistoriaCirugiaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {undefined, z} from "zod";
import {
    anamnesisSchema,
    antecedentesSchema, enfermedadItems,
    femeninoSchema
} from "@/FormSchema/Odontologia/Cirugia/HistoriaCirugiaSchema.ts";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import Title from "@/Components/atoms/Title";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";
import {Button} from "@/shadcn/ui/button.tsx";


const AntecedentesForm = () => {
    const {historia} = React.useContext(HistoriaCirugiaEditorContext)

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing

    const {antecedentes} = historia!

    const antecedentesForm = useForm<z.infer<typeof antecedentesSchema>>({
        resolver: zodResolver(antecedentesSchema),
        defaultValues: {
            ant_familiares: antecedentes.ant_familiares ?? "",
            ant_familiares_enfermedades: [...antecedentes.ant_familiares_enfermedades],
            ant_personales: antecedentes.ant_personales ?? ""
        },
        disabled: isDisabled
    })


    const handleSubmit = (values: z.infer<typeof antecedentesSchema>) => {

        const endpoint = route('cirugia.historias.update', {
            historia: historia!.id
        })

        const body = {
            antecedentes: values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(antecedentesForm, errors.antecedentes as Record<string, string>)
            },
            onSuccess: _page => {
                antecedentesForm.reset(values)
            }
        })
    }

    return (
        <div>
            <Title level={'title-lg'}>Femenino</Title>

            <Form {...antecedentesForm}>
                <form onSubmit={antecedentesForm.handleSubmit(handleSubmit)}
                      className={'grid grid-cols-1 sm:grid-cols-2 gap-6'}>


                    <FormField render={({field}) => (
                        <FormItem className={'col-span-full'}>
                            <FormLabel>{antecedentesSchema.shape.ant_personales.description}</FormLabel>
                            <FormControl>
                                <Textarea {...field} className={'max-h-48'}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'ant_personales'} control={antecedentesForm.control}/>

                    <FormField render={({field}) => (
                        <FormItem className={'col-span-full'}>
                            <FormLabel>{antecedentesSchema.shape.ant_familiares_enfermedades.description}</FormLabel>
                            <div
                                className={'grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-7 grid-flow-col gap-y-3 gap-x-2'}>
                                {
                                    enfermedadItems.map((item) => (
                                        <FormField key={item.id} render={({field}) => (
                                            <FormItem key={item.id}
                                                      className="flex flex-row items-start space-x-3 space-y-0">

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
                                        )} name={'ant_familiares_enfermedades'} control={antecedentesForm.control}/>
                                    ))
                                }
                            </div>
                        </FormItem>
                    )} name={'ant_familiares_enfermedades'} control={antecedentesForm.control}/>

                    <FormField render={({field}) => (
                        <FormItem className={'col-span-full'}>
                            <FormLabel>{antecedentesSchema.shape.ant_familiares.description}</FormLabel>
                            <FormControl>
                                <Textarea {...field} className={'max-h-48'}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'ant_familiares'} control={antecedentesForm.control}/>

                    <div className={'col-span-full flex justify-end'}>
                        <Button type='submit'>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AntecedentesForm
