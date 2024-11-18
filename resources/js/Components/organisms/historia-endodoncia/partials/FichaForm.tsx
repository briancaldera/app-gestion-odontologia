import React from "react";
import {HistoriaEndodonciaEditorContext} from "@/Components/organisms/historia-endodoncia/HistoriaEndodonciaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {
    etiologiaItems,
    examenTejidoPeriodontalItems,
    fichaEndodonticaSchema,
    metodoObturacionItems,
    morfologiaConductoItems,
    pruebaVitalidadPulparItems,
    tratamientoConductoItems
} from "@/FormSchema/Odontologia/Endodoncia/FichaEndodonciaSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";
import {Input} from "@/shadcn/ui/input.tsx";
import {FichaEndodoncia, HistoriaEndodoncia} from "@/src/models/Endodoncia/HistoriaEndodoncia.ts";

const FichaForm = ({ficha, disabled}: {ficha?: FichaEndodoncia, disabled?: boolean}) => {

    const {historia} = React.useContext(HistoriaEndodonciaEditorContext)

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing || disabled

    // todo check this
    const fichaForm = useForm<z.infer<typeof fichaEndodonticaSchema>>({
        resolver: zodResolver(fichaEndodonticaSchema),
        defaultValues: {
            diente: ficha?.diente ?? "",
            etiologia: ficha?.data.etiologia ?? [],
            interpretacion_radiografica: ficha?.data.interpretacion_radiografica ?? "",
            pruebas_diagnosticas: {
                diagnostico_definitivo: ficha?.pruebas_diagnosticas.diagnostico_definitivo ?? "",
                diagnostico_presuntivo: ficha?.pruebas_diagnosticas.diagnostico_presuntivo ?? "",
                examen_tejidos_periodontales: ficha?.pruebas_diagnosticas.examen_tejidos_periodontales ?? [],
                material_obturacion: ficha?.pruebas_diagnosticas.material_obturacion ?? "",
                medicacion_justificacion: ficha?.pruebas_diagnosticas.medicacion_justificacion ?? "",
                metodos_obturacion: ficha?.pruebas_diagnosticas.metodos_obturacion ?? [],
                morfologia_conducto: ficha?.pruebas_diagnosticas.morfologia_conducto ?? [],
                numero_lima: ficha?.pruebas_diagnosticas.numero_lima ?? "",
                observaciones: ficha?.pruebas_diagnosticas.observaciones ?? "",
                preparacion_quimica: ficha?.pruebas_diagnosticas.preparacion_quimica ?? "",
                pruebas_vitalidad_pulpar: ficha?.pruebas_diagnosticas.pruebas_vitalidad_pulpar ?? [],
                tecnica_preparacion_biomecanica: ficha?.pruebas_diagnosticas.tecnica_preparacion_biomecanica ?? "",
                tratamiento_conducto: ficha?.pruebas_diagnosticas.tratamiento_conducto ?? []
            },
            signos: ficha?.data.signos ?? "",
            sintomas: ficha?.data.sintomas ?? ""
        },
        disabled: isDisabled
    })

    const handleSubmit = (values: z.infer<typeof fichaEndodonticaSchema>) => {

        const endpoint = route('endodoncia.historias.ficha.store', {
            historia: historia!.id
        })

        const body = {
            ...values
        }

        router.post(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(fichaForm, errors)
            },
            onSuccess: _page => {
                router.reload()
            }
        })
    }


    return (
        <div>
            <Form {...fichaForm}>
                <form onSubmit={fichaForm.handleSubmit(handleSubmit)} className={'space-y-6'}>


                    <FormField render={({field}) => (
                        <FormItem className={'w-48'}>
                            <FormLabel>{fichaEndodonticaSchema.shape.diente.description}</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage/>
                            <FormDescription>Indique el diente al cual pertenece esta ficha</FormDescription>
                        </FormItem>
                    )} name={'diente'} control={fichaForm.control}/>

                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-3'}>

                        <div className={'col-span-full'}>

                        </div>



                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>{fichaEndodonticaSchema.shape.sintomas.description}</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'sintomas'} control={fichaForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>{fichaEndodonticaSchema.shape.signos.description}</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'signos'} control={fichaForm.control}/>


                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>{fichaEndodonticaSchema.shape.etiologia.description}</FormLabel>
                                <div
                                    className={'grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-2'}>
                                    {
                                        etiologiaItems.map((item) => (
                                            <FormField key={item.id} render={({field}) => (
                                                <FormItem key={item.id}
                                                          className="flex flex-row items-start space-x-3 space-y-0">

                                                    <FormControl>
                                                        <Checkbox disabled={field.disabled}
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
                                            )} name={'etiologia'} control={fichaForm.control}/>
                                        ))
                                    }
                                </div>
                            </FormItem>
                        )} name={'etiologia'} control={fichaForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>{fichaEndodonticaSchema.shape.interpretacion_radiografica.description}</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'interpretacion_radiografica'} control={fichaForm.control}/>


                        <div className={'border rounded-lg col-span-full grid grid-cols-1 md:grid-cols-2'}>
                            <FormField render={({field}) => (
                                <FormItem className={'p-6 border'}>
                                    <FormLabel>{fichaEndodonticaSchema.shape.pruebas_diagnosticas.shape.examen_tejidos_periodontales.description}</FormLabel>
                                    <div
                                        className={'grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-2'}>
                                        {
                                            examenTejidoPeriodontalItems.map((item) => (
                                                <FormField key={item.id} render={({field}) => (
                                                    <FormItem key={item.id}
                                                              className="flex flex-row items-start space-x-3 space-y-0">

                                                        <FormControl>
                                                            <Checkbox disabled={field.disabled}
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
                                                )} name={'pruebas_diagnosticas.examen_tejidos_periodontales'}
                                                           control={fichaForm.control}/>
                                            ))
                                        }
                                    </div>
                                </FormItem>
                            )} name={'pruebas_diagnosticas.examen_tejidos_periodontales'} control={fichaForm.control}/>

                            <FormField render={({field}) => (
                                <FormItem className={'p-6 border'}>
                                    <FormLabel>{fichaEndodonticaSchema.shape.pruebas_diagnosticas.shape.pruebas_vitalidad_pulpar.description}</FormLabel>
                                    <div
                                        className={'grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-2'}>
                                        {
                                            pruebaVitalidadPulparItems.map((item) => (
                                                <FormField key={item.id} render={({field}) => (
                                                    <FormItem key={item.id}
                                                              className="flex flex-row items-start space-x-3 space-y-0">

                                                        <FormControl>
                                                            <Checkbox disabled={field.disabled}
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
                                                )} name={'pruebas_diagnosticas.pruebas_vitalidad_pulpar'}
                                                           control={fichaForm.control}/>
                                            ))
                                        }
                                    </div>
                                </FormItem>
                            )} name={'pruebas_diagnosticas.pruebas_vitalidad_pulpar'} control={fichaForm.control}/>


                        </div>

                        <div className={'border rounded-lg p-6 col-span-full grid grid-cols-1 md:grid-cols-2 gap-3'}>
                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>{fichaEndodonticaSchema.shape.pruebas_diagnosticas.shape.diagnostico_presuntivo.description}</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'pruebas_diagnosticas.diagnostico_presuntivo'} control={fichaForm.control}/>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>{fichaEndodonticaSchema.shape.pruebas_diagnosticas.shape.diagnostico_definitivo.description}</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'pruebas_diagnosticas.diagnostico_definitivo'} control={fichaForm.control}/>
                        </div>

                    </div>

                    <div className={'border rounded-lg col-span-full grid grid-cols-1 md:grid-cols-3'}>

                        <FormField render={({field}) => (
                            <FormItem className={'p-6 border'}>
                                <FormLabel>{fichaEndodonticaSchema.shape.pruebas_diagnosticas.shape.morfologia_conducto.description}</FormLabel>
                                <div
                                    className={'flex flex-col gap-y-2'}>
                                    {
                                        morfologiaConductoItems.map((item) => (
                                            <FormField key={item.id} render={({field}) => (
                                                <FormItem key={item.id}
                                                          className="flex flex-row items-start space-x-3 space-y-0">

                                                    <FormControl>
                                                        <Checkbox disabled={field.disabled}
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
                                            )} name={'pruebas_diagnosticas.morfologia_conducto'}
                                                       control={fichaForm.control}/>
                                        ))
                                    }
                                </div>
                            </FormItem>
                        )} name={'pruebas_diagnosticas.morfologia_conducto'} control={fichaForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem className={'p-6 border'}>
                                <FormLabel>{fichaEndodonticaSchema.shape.pruebas_diagnosticas.shape.tratamiento_conducto.description}</FormLabel>
                                <div
                                    className={'flex flex-col gap-y-2'}>
                                    {
                                        tratamientoConductoItems.map((item) => (
                                            <FormField key={item.id} render={({field}) => (
                                                <FormItem key={item.id}
                                                          className="flex flex-row items-start space-x-3 space-y-0">

                                                    <FormControl>
                                                        <Checkbox disabled={field.disabled}
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
                                            )} name={'pruebas_diagnosticas.tratamiento_conducto'}
                                                       control={fichaForm.control}/>
                                        ))
                                    }
                                </div>
                            </FormItem>
                        )} name={'pruebas_diagnosticas.tratamiento_conducto'} control={fichaForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem className={'p-6 border'}>
                                <FormLabel>{fichaEndodonticaSchema.shape.pruebas_diagnosticas.shape.metodos_obturacion.description}</FormLabel>
                                <div
                                    className={'flex flex-col gap-y-2'}>
                                    {
                                        metodoObturacionItems.map((item) => (
                                            <FormField key={item.id} render={({field}) => (
                                                <FormItem key={item.id}
                                                          className="flex flex-row items-start space-x-3 space-y-0">

                                                    <FormControl>
                                                        <Checkbox disabled={field.disabled}
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
                                            )} name={'pruebas_diagnosticas.metodos_obturacion'}
                                                       control={fichaForm.control}/>
                                        ))
                                    }
                                </div>
                            </FormItem>
                        )} name={'pruebas_diagnosticas.metodos_obturacion'} control={fichaForm.control}/>

                    </div>

                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-3'}>


                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>{fichaEndodonticaSchema.shape.pruebas_diagnosticas.shape.tecnica_preparacion_biomecanica.description}</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'pruebas_diagnosticas.tecnica_preparacion_biomecanica'} control={fichaForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>{fichaEndodonticaSchema.shape.pruebas_diagnosticas.shape.preparacion_quimica.description}</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'pruebas_diagnosticas.preparacion_quimica'} control={fichaForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>{fichaEndodonticaSchema.shape.pruebas_diagnosticas.shape.numero_lima.description}</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'pruebas_diagnosticas.numero_lima'} control={fichaForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>{fichaEndodonticaSchema.shape.pruebas_diagnosticas.shape.material_obturacion.description}</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'pruebas_diagnosticas.material_obturacion'} control={fichaForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>{fichaEndodonticaSchema.shape.pruebas_diagnosticas.shape.medicacion_justificacion.description}</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'pruebas_diagnosticas.medicacion_justificacion'} control={fichaForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>{fichaEndodonticaSchema.shape.pruebas_diagnosticas.shape.observaciones.description}</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'pruebas_diagnosticas.observaciones'} control={fichaForm.control}/>

                    </div>


                        <div className={'flex justify-end'}>
                            {
                                !isDisabled && (
                                    <Button type='submit'>Guardar</Button>

                                )
                            }
                        </div>
                </form>
            </Form>

        </div>
)
}

export default FichaForm
