import React from "react";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {
    historiaPeriodontalSchema,
    metodoAuxHigieneItems,
    metodoCepilladoItems,
    tipoCepilloItems
} from "@/FormSchema/Historia/HistoriaPeriodontalSchema.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import Title from "@/Components/atoms/Title";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/ui/select.tsx";

const HistoriaPeriodontalForm = () => {

    const {historia, disabled} = React.useContext(HistoriaEditorContext)
    const {higiene_bucal: hb, control_higiene_bucal: chb} = historia.historia_odontologica!.historia_periodontal

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = disabled

    const historiaPeriodontalForm = useForm<z.infer<typeof historiaPeriodontalSchema>>({
        resolver: zodResolver(historiaPeriodontalSchema),
        defaultValues: {
            higiene_bucal: {
                cepillado_lengua: hb.cepillado_lengua ?? false,
                frecuencia_cepillado: hb.frecuencia_cepillado ?? "",
                hemorragia_gingival: hb.hemorragia_gingival ?? false,
                metodo_auxiliar: [...hb.metodo_auxiliar],
                metodo_cepillado: [...hb.metodo_cepillado],
                tipo_cepillo: [...hb.tipo_cepillo],
                xerostomia: hb.xerostomia ?? false,
                sialorrea: hb.sialorrea ?? false,
            },
            control_higiene_bucal: {
                cepillo_recomendado: chb.cepillo_recomendado ?? "",
                control_halitosis: chb.control_halitosis ?? "N",
                metodos_auxiliares_requeridos: chb.metodos_auxiliares_requeridos ?? "",
                placa_bacteriana_lengua: chb.placa_bacteriana_lengua ?? false,
                tecnica_cepillado_ensenada: chb.tecnica_cepillado_ensenada ?? '',
                tratamiento: chb.tratamiento ?? ""
            },
        },
        disabled: isDisabled
    })

    const handleSubmit = (values: z.infer<typeof historiaPeriodontalSchema>) => {

        const endpoint = route('historias.odontologica.periodontal.update', {
            historia: historia.id
        })

        const body = {
            ...values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(historiaPeriodontalForm, errors)
            },
            onSuccess: _page => {
                historiaPeriodontalForm.reset(values)
            }
        })
    }

    return (
        <div>
            <Title level={'title-lg'}>Historia Periodontal</Title>
            <Form {...historiaPeriodontalForm}>
                <form onSubmit={historiaPeriodontalForm.handleSubmit(handleSubmit)} className={'space-y-2'}>
                    <div className={'grid grid-cols-1 sm:grid-cols-2 gap-4 border p-6 rounded-lg'}>

                        <div className={'col-span-full'}>
                            <Title>Higiene bucal del paciente</Title>

                        </div>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Frecuencia de cepillado</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'higiene_bucal.frecuencia_cepillado'} control={historiaPeriodontalForm.control}/>

                        <FormField
                            control={historiaPeriodontalForm.control}
                            name={'higiene_bucal.tipo_cepillo'} render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base capitalize">Tipo de cepillo</FormLabel>
                                    <FormDescription>
                                    </FormDescription>
                                </div>
                                <div
                                    className={'flex flex-wrap gap-4'}>

                                    {tipoCepilloItems.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={historiaPeriodontalForm.control}
                                            name={'higiene_bucal.tipo_cepillo'}
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

                        <FormField
                            control={historiaPeriodontalForm.control}
                            name={'higiene_bucal.metodo_cepillado'} render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base capitalize">Método de cepillado</FormLabel>
                                    <FormDescription>
                                    </FormDescription>
                                </div>
                                <div
                                    className={'grid grid-cols-1 sm:grid-cols-2 gap-2 p-6 content-start'}>

                                    {metodoCepilladoItems.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={historiaPeriodontalForm.control}
                                            name={'higiene_bucal.metodo_cepillado'}
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

                        <FormField
                            control={historiaPeriodontalForm.control}
                            name={'higiene_bucal.metodo_auxiliar'} render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base capitalize">Método auxiliar de higiene</FormLabel>
                                    <FormDescription>
                                    </FormDescription>
                                </div>
                                <div
                                    className={'grid grid-cols-1 sm:grid-cols-2 gap-2 p-6 content-start'}>

                                    {metodoAuxHigieneItems.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={historiaPeriodontalForm.control}
                                            name={'higiene_bucal.metodo_auxiliar'}
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

                        <div className={'flex flex-col gap-y-2'}>

                        <FormField render={({field}) => (
                            <FormItem className={'flex flex-row items-start space-x-3 space-y-0'}>
                                <FormControl>
                                    <Checkbox checked={field.value} name={field.name} disabled={field.disabled}
                                              onCheckedChange={field.onChange}/>
                                </FormControl>
                                <FormLabel>Cepillado de lengua</FormLabel>
                                <FormMessage/>
                            </FormItem>
                        )} name={`higiene_bucal.cepillado_lengua`} control={historiaPeriodontalForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem className={'flex flex-row items-start space-x-3 space-y-0'}>
                                <FormControl>
                                    <Checkbox checked={field.value} name={field.name} disabled={field.disabled}
                                              onCheckedChange={field.onChange}/>
                                </FormControl>
                                <FormLabel>Hemorragia gingival</FormLabel>
                                <FormMessage/>
                            </FormItem>
                        )} name={`higiene_bucal.hemorragia_gingival`} control={historiaPeriodontalForm.control}/>
                        </div>

                        <div className={'flex flex-col gap-y-2'}>


                        <FormField render={({field}) => (
                            <FormItem className={'flex flex-row items-start space-x-3 space-y-0'}>
                                <FormControl>
                                    <Checkbox checked={field.value} name={field.name} disabled={field.disabled}
                                              onCheckedChange={field.onChange}/>
                                </FormControl>
                                <FormLabel>Xerostomia</FormLabel>
                                <FormMessage/>
                            </FormItem>
                        )} name={`higiene_bucal.xerostomia`} control={historiaPeriodontalForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem className={'flex flex-row items-start space-x-3 space-y-0'}>
                                <FormControl>
                                    <Checkbox checked={field.value} name={field.name} disabled={field.disabled}
                                              onCheckedChange={field.onChange}/>
                                </FormControl>
                                <FormLabel>Sialorrea</FormLabel>
                                <FormMessage/>
                            </FormItem>
                        )} name={`higiene_bucal.sialorrea`} control={historiaPeriodontalForm.control}/>
                        </div>

                    </div>

                    <div className={'border rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-4 p-6'}>


                        <div className={'col-span-full'}>
                            <Title>Control de higiene bucal</Title>
                        </div>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Técnica de cepillado enseñada en el paciente</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'control_higiene_bucal.tecnica_cepillado_ensenada'}
                                   control={historiaPeriodontalForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Cepillo dental recomendado para su paciente</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'control_higiene_bucal.cepillo_recomendado'}
                                   control={historiaPeriodontalForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Métodos auxiliares requeridos</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'control_higiene_bucal.metodos_auxiliares_requeridos'}
                                   control={historiaPeriodontalForm.control}/>

                        <div className={'flex flex-col gap-y-3 justify-between'}>

                            <FormField render={({field}) => (
                                <FormItem className={'w-1/2'}>
                                    <FormLabel>Control de halitosis</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}
                                            disabled={field.disabled} name={field.name}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={'Seleccione una opción'}></SelectValue>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={'S'}>Sí</SelectItem>
                                            <SelectItem value={'N'}>No</SelectItem>
                                            <SelectItem value={'NR'}>No requiere</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'control_higiene_bucal.control_halitosis'}
                                       control={historiaPeriodontalForm.control}/>

                            <FormField render={({field}) => (
                                <FormItem className={'flex flex-row items-start space-x-3 space-y-0'}>
                                    <FormControl>
                                        <Checkbox checked={field.value} name={field.name} disabled={field.disabled}
                                                  onCheckedChange={field.onChange}/>
                                    </FormControl>
                                    <FormLabel>Presencia de placa bacteriana</FormLabel>
                                    <FormMessage/>
                                </FormItem>
                            )} name={`control_higiene_bucal.placa_bacteriana_lengua`}
                                       control={historiaPeriodontalForm.control}/>

                        </div>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Tratamiento</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'control_higiene_bucal.tratamiento'} control={historiaPeriodontalForm.control}/>

                    </div>
                    <div className={'flex justify-end mt-3'}>
                        <Button type='submit'
                                disabled={historiaPeriodontalForm.formState.disabled || !historiaPeriodontalForm.formState.isDirty}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default HistoriaPeriodontalForm
