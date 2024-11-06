import React from "react";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {HistoriaCirugiaEditorContext} from "@/Components/organisms/historia-cirugia/HistoriaCirugiaEditor.tsx";
import Title from "@/Components/atoms/Title";
import {useForm, UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {
    anamnesisSchema,
    enfermedadItems,
    reaccionMedicamentoItems
} from "@/FormSchema/Odontologia/Cirugia/HistoriaCirugiaSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {RadioGroup, RadioGroupItem} from "@/shadcn/ui/radio-group.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";

const AnamnesisForm = () => {

    const {historia} = React.useContext(HistoriaCirugiaEditorContext)

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing

    const {anamnesis} = historia!

    const anamnesisForm = useForm<z.infer<typeof anamnesisSchema>>({
        resolver: zodResolver(anamnesisSchema),
        defaultValues: {
            agitacion: {
                status: anamnesis.agitacion.status ?? 'D',
                description: anamnesis.agitacion.description ?? ''
            },
            alergia_enlatados: {
                status: anamnesis.alergia_enlatados.status ?? 'D',
                description: anamnesis.alergia_enlatados.description ?? ''
            },
            alergia_medicamento: {
                status: anamnesis.alergia_medicamento.status ?? 'D',
                description: anamnesis.alergia_medicamento.description ?? ''
            },
            alergia_yodo: {
                status: anamnesis.alergia_yodo.status ?? 'D',
                description: anamnesis.alergia_yodo.description ?? ''
            },
            apetito_excesivo: {
                status: anamnesis.apetito_excesivo.status ?? 'D',
                description: anamnesis.apetito_excesivo.description ?? ''
            },
            bajo_tratamiento_actual: {
                status: anamnesis.bajo_tratamiento_actual.status ?? 'D',
                description: anamnesis.bajo_tratamiento_actual.description ?? ''
            },
            depresion: {
                status: anamnesis.depresion.status ?? 'D',
                description: anamnesis.depresion.description ?? ''
            },
            diente_dolor: {
                status: anamnesis.diente_dolor.status ?? 'D',
                description: anamnesis.diente_dolor.description ?? ''
            },
            dieta_especial: {
                status: anamnesis.dieta_especial.status ?? 'D',
                description: anamnesis.dieta_especial.description ?? ''
            },
            dificultad_cicatrizacion: {
                status: anamnesis.dificultad_cicatrizacion.status ?? 'D',
                description: anamnesis.dificultad_cicatrizacion.description ?? ''
            },
            dolor_ATM_levantarse: {
                status: anamnesis.dolor_ATM_levantarse.status ?? 'D',
                description: anamnesis.dolor_ATM_levantarse.description ?? ''
            },
            enfermedad_sistemica: {
                status: anamnesis.enfermedad_sistemica.status ?? 'D',
                description: anamnesis.enfermedad_sistemica.description ?? ''
            },
            enfermedades: {
                list: [...anamnesis.enfermedades.list],
                otros: anamnesis.enfermedades.otros ?? ''
            },
            hospitalizado_alguna_vez: {
                status: anamnesis.hospitalizado_alguna_vez.status ?? 'D',
                description: anamnesis.hospitalizado_alguna_vez.description ?? ''
            },
            limitaciones_apertura_cierre_bucal: {
                status: anamnesis.limitaciones_apertura_cierre_bucal.status ?? 'D',
                description: anamnesis.limitaciones_apertura_cierre_bucal.description ?? ''
            },
            miccion_nocturna: {
                status: anamnesis.miccion_nocturna.status ?? 'D',
                description: anamnesis.miccion_nocturna.description ?? ''
            },
            migrana: {
                status: anamnesis.migrana.status ?? 'D',
                description: anamnesis.migrana.description ?? ''
            },
            odontologo_ultimos_6_meses: {
                status: anamnesis.odontologo_ultimos_6_meses.status ?? 'D',
                description: anamnesis.odontologo_ultimos_6_meses.description ?? ''
            },
            reaccion_anestesia: {
                status: anamnesis.reaccion_anestesia.status ?? 'D',
                description: anamnesis.reaccion_anestesia.description ?? ''
            },
            reaccion_medicamento: {
                list: [...anamnesis.reaccion_medicamento.list],
                status: anamnesis.reaccion_medicamento.status ?? 'D',
                description: anamnesis.reaccion_medicamento.description ?? ''
            },
            rechina_aprieta_dientes: {
                status: anamnesis.rechina_aprieta_dientes.status ?? 'D',
                description: anamnesis.rechina_aprieta_dientes.description ?? ''
            },
            sangrado_al_cepillar: {
                status: anamnesis.sangrado_al_cepillar.status ?? 'D',
                description: anamnesis.sangrado_al_cepillar.description ?? ''
            },
            visita_medico_ultimos_6_meses: {
                status: anamnesis.visita_medico_ultimos_6_meses.status ?? 'D',
                description: anamnesis.visita_medico_ultimos_6_meses.description ?? ''
            }
        },
        disabled: isDisabled
    })

    const handleSubmit = (values: z.infer<typeof anamnesisSchema>) => {

        const endpoint = route('cirugia.historias.update', {
            historia: historia!.id
        })

        const body = {
            anamnesis: values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(anamnesisForm, errors.anamnesis as Record<string, string>)
            },
            onSuccess: _page => {
                anamnesisForm.reset(values)
            }
        })
    }


    return (
        <div>
            <Title level={'title-lg'}>Anamnesis</Title>

            <Form {...anamnesisForm}>
                <form onSubmit={anamnesisForm.handleSubmit(handleSubmit)} className={'space-y-6'}>

                    <AnamnesisFormField fieldName={'visita_medico_ultimos_6_meses'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'bajo_tratamiento_actual'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'alergia_medicamento'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'hospitalizado_alguna_vez'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'enfermedad_sistemica'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'odontologo_ultimos_6_meses'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'dolor_ATM_levantarse'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'limitaciones_apertura_cierre_bucal'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'rechina_aprieta_dientes'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'sangrado_al_cepillar'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'miccion_nocturna'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'apetito_excesivo'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'depresion'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'agitacion'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'migrana'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'dieta_especial'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'alergia_enlatados'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'reaccion_anestesia'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'diente_dolor'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'dificultad_cicatrizacion'} anamnesisForm={anamnesisForm}/>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>{anamnesisSchema.shape.reaccion_medicamento.description}</FormLabel>
                            <div
                                className={'grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-2'}>
                                {
                                    reaccionMedicamentoItems.map((item) => (
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
                                        )} name={'reaccion_medicamento.list'} control={anamnesisForm.control}/>
                                    ))
                                }
                            </div>
                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>{anamnesisSchema.shape.reaccion_medicamento.shape.description.description}</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} className={'max-h-48'}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'reaccion_medicamento.description'} control={anamnesisForm.control}/>
                        </FormItem>
                    )} name={'reaccion_medicamento'} control={anamnesisForm.control}/>

                    <AnamnesisFormField fieldName={'alergia_yodo'} anamnesisForm={anamnesisForm}/>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>{anamnesisSchema.shape.enfermedades.description}</FormLabel>
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
                                        )} name={'enfermedades.list'} control={anamnesisForm.control}/>
                                    ))
                                }
                            </div>
                            <div className={'col-span-full'}>
                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormLabel>{anamnesisSchema.shape.enfermedades.shape.otros.description}</FormLabel>
                                        <FormControl>
                                            <Textarea {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'enfermedades.otros'} control={anamnesisForm.control}/>
                            </div>
                        </FormItem>
                    )} name={'enfermedades'} control={anamnesisForm.control}/>

                    <div className={'flex justify-end'}>
                        <Button type='submit'>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )

}

const AnamnesisFormField = ({fieldName, anamnesisForm}: {
    fieldName: string,
    anamnesisForm: UseFormReturn<z.infer<typeof anamnesisSchema>>
}) => {
    return (
        <FormField render={(fieldProps) => (
            <FormItem className={'flex items-center gap-2 flex-wrap'}>
                <FormLabel
                    className={'basis-1/6'}>{anamnesisSchema.shape[fieldProps.field.name].description}</FormLabel>
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
                    )} name={`${fieldProps.field.name}.status`} control={anamnesisForm.control}/>
                </div>
                <div className={'flex-1 basis-48'}>
                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>{anamnesisSchema.shape[fieldProps.field.name].shape.description.description}</FormLabel>
                            <FormControl>
                                <Textarea {...field} className={'max-h-48'}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={`${fieldProps.field.name}.description`} control={anamnesisForm.control}/>
                </div>
                <FormMessage/>
            </FormItem>
        )} name={fieldName} control={anamnesisForm.control}/>
    )
}

export default AnamnesisForm
