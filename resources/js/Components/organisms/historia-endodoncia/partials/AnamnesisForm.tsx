import {HistoriaEndodonciaEditorContext} from "@/Components/organisms/historia-endodoncia/HistoriaEndodonciaEditor.tsx";
import React from "react";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {z} from 'zod'
import {anamnesisSchema, enfermedadesItems} from "@/FormSchema/Odontologia/Endodoncia/HistoriaEndodonciaSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {RadioGroup, RadioGroupItem} from "@/shadcn/ui/radio-group.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";

const AnamnesisForm = () => {

    const {historia} = React.useContext(HistoriaEndodonciaEditorContext)

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing

    const {anamnesis} = historia!

    const anamnesisForm: UseFormReturn<z.infer<typeof anamnesisSchema>> = useForm<z.infer<typeof anamnesisSchema>>({
        resolver: zodResolver(anamnesisSchema),
        defaultValues: {
            abultamiento_diente: {
                description: anamnesis!.abultamiento_diente.description ?? '',
                status: anamnesis!.abultamiento_diente.status ?? 'D'
            },
            alergia_alimento: {
                description: anamnesis!.alergia_alimento.description ?? '',
                status: anamnesis!.alergia_alimento.status ?? 'D'
            },
            alergia_enlatados: {
                description: anamnesis!.alergia_enlatados.description ?? '',
                status: anamnesis!.alergia_enlatados.status ?? 'D'
            },
            alergia_material_dental: {
                description: anamnesis!.alergia_material_dental.description ?? '',
                status: anamnesis!.alergia_material_dental.status ?? 'D'
            },
            alergia_medicamento: {
                description: anamnesis!.alergia_medicamento.description ?? '',
                status: anamnesis!.alergia_medicamento.status ?? 'D'
            },
            alergia_yodo: {
                description: anamnesis!.alergia_yodo.description ?? '',
                status: anamnesis!.alergia_yodo.status ?? 'D'
            },
            bajo_tratamiento_actual: {
                description: anamnesis!.bajo_tratamiento_actual.description ?? '',
                status: anamnesis!.bajo_tratamiento_actual.status ?? 'D'
            },
            cigarrillo_tabaco: {
                description: anamnesis!.cigarrillo_tabaco.description ?? '',
                status: anamnesis!.cigarrillo_tabaco.status ?? 'D'
            },
            dificultad_cicatrizacion: {
                description: anamnesis!.dificultad_cicatrizacion.description ?? '',
                status: anamnesis!.dificultad_cicatrizacion.status ?? 'D'
            },
            dolor_CATM: {
                description: anamnesis!.dolor_CATM.description ?? '',
                status: anamnesis!.dolor_CATM.status ?? 'D'
            },
            embarazo: {
                description: anamnesis!.embarazo.description ?? '',
                status: anamnesis!.embarazo.status ?? 'D'
            },
            enfermedades: {
                list: [...anamnesis!.enfermedades.list],
                resumen_ant_personales: anamnesis?.enfermedades.resumen_ant_personales ?? ""
            },
            enfermedades_familiares: {
                examen_comp: anamnesis!.enfermedades_familiares.examen_comp ?? "",
                resumen_ant_familiares: anamnesis!.enfermedades_familiares.resumen_ant_familiares ?? ""
            },
            hospitalizado_alguna_vez: {
                description: anamnesis!.hospitalizado_alguna_vez.description ?? '',
                status: anamnesis!.hospitalizado_alguna_vez.status ?? 'D'
            },
            odontologo_ultimos_6_meses: {
                description: anamnesis!.odontologo_ultimos_6_meses.description ?? '',
                status: anamnesis!.odontologo_ultimos_6_meses.status ?? 'D'
            },
            reaccion_anestesia: {
                description: anamnesis!.reaccion_anestesia.description ?? '',
                status: anamnesis!.reaccion_anestesia.status ?? 'D'
            },
            rechina_aprieta_dientes: {
                description: anamnesis!.rechina_aprieta_dientes.description ?? '',
                status: anamnesis!.rechina_aprieta_dientes.status ?? 'D'
            },
            sangrado_al_cepillar: {
                description: anamnesis!.sangrado_al_cepillar.description ?? '',
                status: anamnesis!.sangrado_al_cepillar.status ?? 'D'
            },
            sangrado_excesivo_corte: {
                description: anamnesis!.sangrado_excesivo_corte.description ?? '',
                status: anamnesis!.sangrado_excesivo_corte.status ?? 'D'
            },
            visita_medico_ultimos_6_meses: {
                description: anamnesis!.visita_medico_ultimos_6_meses.description ?? '',
                status: anamnesis!.visita_medico_ultimos_6_meses.status ?? 'D'
            }
        },
        disabled: isDisabled
    })

    const handleSubmit = (values: z.infer<typeof anamnesisSchema>) => {

        const endpoint = route('endodoncia.historias.anamnesis.update', {
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
                    <AnamnesisFormField fieldName={'alergia_material_dental'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'hospitalizado_alguna_vez'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'odontologo_ultimos_6_meses'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'sangrado_al_cepillar'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'abultamiento_diente'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'rechina_aprieta_dientes'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'dolor_CATM'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'sangrado_excesivo_corte'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'dificultad_cicatrizacion'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'cigarrillo_tabaco'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'alergia_alimento'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'alergia_enlatados'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'alergia_yodo'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'reaccion_anestesia'} anamnesisForm={anamnesisForm}/>
                    <AnamnesisFormField fieldName={'embarazo'} anamnesisForm={anamnesisForm}/>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>{anamnesisSchema.shape.enfermedades.description}</FormLabel>
                            <div
                                className={'grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-7 grid-flow-col gap-y-3 gap-x-2'}>
                                {
                                    enfermedadesItems.map((item) => (
                                        <FormField key={item.id} render={({field}) => (
                                            <FormItem key={item.id}
                                                      className="flex flex-row items-start space-x-3 space-y-0">

                                                <FormControl>
                                                    <Checkbox
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
                                        <FormLabel>{anamnesisSchema.shape.enfermedades.shape.resumen_ant_personales.description}</FormLabel>
                                        <FormControl>
                                            <Textarea {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'enfermedades.resumen_ant_personales'} control={anamnesisForm.control}/>
                            </div>
                        </FormItem>
                    )} name={'enfermedades'} control={anamnesisForm.control}/>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>{anamnesisSchema.shape.enfermedades_familiares.description}</FormLabel>
                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>{anamnesisSchema.shape.enfermedades_familiares.shape.resumen_ant_familiares.description}</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'enfermedades_familiares.resumen_ant_familiares'} control={anamnesisForm.control}/>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>{anamnesisSchema.shape.enfermedades_familiares.shape.examen_comp.description}</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'enfermedades_familiares.examen_comp'} control={anamnesisForm.control}/>
                        </FormItem>
                    )} name={'enfermedades_familiares'} control={anamnesisForm.control}/>

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
                <FormControl>
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
                </FormControl>
                <FormControl>
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
                </FormControl>
                <FormMessage/>
            </FormItem>
        )} name={fieldName} control={anamnesisForm.control}/>
    )
}

export default AnamnesisForm
