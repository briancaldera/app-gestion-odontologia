import React from "react";
import {HistoriaEndodonciaEditorContext} from "@/Components/organisms/historia-endodoncia/HistoriaEndodonciaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {useForm, UseFormReturn} from "react-hook-form";
import {
    calidadDolorItems,
    evaluacionDolorSchema,
    frecuenciaDolorItems,
    sensibilidadDolorItems
} from "@/FormSchema/Odontologia/Endodoncia/HistoriaEndodonciaSchema.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {RadioGroup, RadioGroupItem} from "@/shadcn/ui/radio-group.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Slider} from "@/shadcn/ui/slider.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/ui/select.tsx";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";

const EvaluacionDolorForm = () => {
    const {historia} = React.useContext(HistoriaEndodonciaEditorContext)

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing

    const {evaluacion_dolor} = historia!

    const evaluacionDolorForm = useForm<z.infer<typeof evaluacionDolorSchema>>({
        resolver: zodResolver(evaluacionDolorSchema),
        defaultValues: {
            agravo_dolor: {
                description: evaluacion_dolor?.agravo_dolor.description ?? "",
                status: evaluacion_dolor?.agravo_dolor.status ?? "D"
            },
            alivio_dolor: {
                description: evaluacion_dolor?.alivio_dolor.description ?? "",
                status: evaluacion_dolor?.alivio_dolor.status ?? "D"
            },
            aparicion_sintomas: evaluacion_dolor?.aparicion_sintomas ?? "",
            diente_dolor: {
                description: evaluacion_dolor?.diente_dolor.description ?? "",
                status: evaluacion_dolor?.diente_dolor.status ?? 'D'
            },
            diente_sensible_al_comer: [...evaluacion_dolor?.diente_sensible_al_comer],
            dolor_al_masticar: {
                description: evaluacion_dolor?.dolor_al_masticar.description ?? "",
                status: evaluacion_dolor?.dolor_al_masticar.status ?? "D"
            },
            dolor_momento_dia: evaluacion_dolor?.dolor_momento_dia ?? "",
            dolor_presente: {
                description: evaluacion_dolor?.dolor_presente.description ?? "",
                status: evaluacion_dolor?.dolor_presente.status ?? "D"
            },
            farmaco_alivio_dolor: {
                description: evaluacion_dolor?.farmaco_alivio_dolor.description ?? "",
                status: evaluacion_dolor?.farmaco_alivio_dolor.status ?? "D"
            },
            intensidad_frecuencia_calidad_dolor: {
                calidad: evaluacion_dolor?.intensidad_frecuencia_calidad_dolor.calidad ?? " ",
                frecuencia: evaluacion_dolor?.intensidad_frecuencia_calidad_dolor.frecuencia ?? " ",
                intensidad: evaluacion_dolor?.intensidad_frecuencia_calidad_dolor.intensidad ?? 0
            },
            primeros_sintomas: evaluacion_dolor?.primeros_sintomas ?? ""
        },
        disabled: isDisabled,
    })

    const handleSubmit = (values: z.infer<typeof evaluacionDolorSchema>) => {

        const endpoint = route('endodoncia.historias.dolor.update', {
            historia: historia!.id
        })

        const body = {
            evaluacion_dolor: values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(evaluacionDolorForm, errors.evaluacion_dolor as Record<string, string>)
            },
            onSuccess: _page => {
                evaluacionDolorForm.reset(values)
            }
        })
    }

    return (
        <div>
            <Title level={'title-lg'}>Evaluación del dolor</Title>

            <Form {...evaluacionDolorForm}>
                <form onSubmit={evaluacionDolorForm.handleSubmit(handleSubmit)} className={'space-y-6'}>

                    <FormField render={({field}) => (
                        <FormItem className={'flex items-center gap-2 flex-wrap'}>
                            <FormLabel>{evaluacionDolorSchema.shape.dolor_presente.description}</FormLabel>
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
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )} name={'dolor_presente.status'} control={evaluacionDolorForm.control}/>

                    <EvaluacionDolorFormField fieldName={'diente_dolor'} evaluacionDolorForm={evaluacionDolorForm}/>

                    <FormField render={({field}) => (
                        <FormItem className={'flex items-center'}>
                            <FormLabel>{evaluacionDolorSchema.shape.primeros_sintomas.description}</FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'primeros_sintomas'} control={evaluacionDolorForm.control}/>

                    <FormField render={({field}) => (
                        <FormItem className={'flex items-center'}>
                            <FormLabel>{evaluacionDolorSchema.shape.aparicion_sintomas.description}</FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'aparicion_sintomas'} control={evaluacionDolorForm.control}/>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>{evaluacionDolorSchema.shape.intensidad_frecuencia_calidad_dolor.description}</FormLabel>
                            <div className={'flex gap-4 flex-wrap'}>

                                <FormField render={({field}) => (
                                    <FormItem className={'basis-full md:basis-2/4'}>
                                        <FormLabel>{evaluacionDolorSchema.shape.intensidad_frecuencia_calidad_dolor.shape.intensidad.description}</FormLabel>

                                        <FormDescription
                                            className={'text-2xl'}>{field.value} {intensidadDolorEmoji.get(field.value)}</FormDescription>
                                        <FormControl>
                                            <Slider onValueChange={(value) => field.onChange(value[0])}
                                                    value={[field.value]} min={0} max={10} step={1} name={field.name}
                                                    disabled={field.disabled}/>
                                        </FormControl>


                                        <FormMessage/>
                                    </FormItem>
                                )} name={'intensidad_frecuencia_calidad_dolor.intensidad'}
                                           control={evaluacionDolorForm.control}/>

                                <FormField render={({field}) => (
                                    <FormItem className={'basis-full md:basis-1/4'}>
                                        <FormLabel>{evaluacionDolorSchema.shape.intensidad_frecuencia_calidad_dolor.shape.frecuencia.description}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Selecciona una frecuencia'/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {frecuenciaDolorItems.map(item => <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'intensidad_frecuencia_calidad_dolor.frecuencia'}
                                           control={evaluacionDolorForm.control}/>

                                <FormField render={({field}) => (
                                    <FormItem className={'basis-full md:basis-1/4'}>
                                        <FormLabel>{evaluacionDolorSchema.shape.intensidad_frecuencia_calidad_dolor.shape.calidad.description}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Selecciona una calidad'/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {calidadDolorItems.map(item => <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'intensidad_frecuencia_calidad_dolor.calidad'}
                                           control={evaluacionDolorForm.control}/>
                            </div>
                        </FormItem>
                    )} name={'intensidad_frecuencia_calidad_dolor'} control={evaluacionDolorForm.control}/>

                    <EvaluacionDolorFormField fieldName={'alivio_dolor'} evaluacionDolorForm={evaluacionDolorForm}/>
                    <EvaluacionDolorFormField fieldName={'farmaco_alivio_dolor'} evaluacionDolorForm={evaluacionDolorForm}/>
                    <EvaluacionDolorFormField fieldName={'agravo_dolor'} evaluacionDolorForm={evaluacionDolorForm}/>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>{evaluacionDolorSchema.shape.diente_sensible_al_comer.description}</FormLabel>
                            <div
                                className={'grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-2'}>
                                {
                                    sensibilidadDolorItems.map((item) => (
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
                                        )} name={'diente_sensible_al_comer'} control={evaluacionDolorForm.control}/>
                                    ))
                                }
                            </div>
                        </FormItem>
                    )} name={'diente_sensible_al_comer'} control={evaluacionDolorForm.control}/>

                    <EvaluacionDolorFormField fieldName={'dolor_al_masticar'} evaluacionDolorForm={evaluacionDolorForm}/>

                    <FormField render={({field}) => (
                        <FormItem className={'flex items-center'}>
                            <FormLabel>{evaluacionDolorSchema.shape.dolor_momento_dia.description}</FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'dolor_momento_dia'} control={evaluacionDolorForm.control}/>


                    <div className={'flex justify-end'}>
                        <Button type='submit'>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

const intensidadDolorEmoji = new Map([
    [0, '😁'],
    [1, '🙂'],
    [2, '😐'],
    [3, '☹️'],
    [4, '😓'],
    [5, '️😵'],
    [6, '😣'],
    [7, '😖'],
    [8, '😫'],
    [9, '😭'],
    [10, '💀'],
])

const EvaluacionDolorFormField = ({fieldName, evaluacionDolorForm}: {
    fieldName: string,
    evaluacionDolorForm: UseFormReturn<z.infer<typeof evaluacionDolorSchema>>
}) => {
    return (
        <FormField render={(fieldProps) => (
            <FormItem className={'flex items-center gap-2 flex-wrap'}>
                <FormLabel
                    className={'basis-1/6'}>{evaluacionDolorSchema.shape[fieldProps.field.name].description}</FormLabel>
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
                        )} name={`${fieldProps.field.name}.status`} control={evaluacionDolorForm.control}/>
                    </div>
                </FormControl>
                <FormControl>
                    <div className={'flex-1 basis-48'}>
                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>{evaluacionDolorSchema.shape[fieldProps.field.name].shape.description.description}</FormLabel>
                                <FormControl>
                                    <Textarea {...field} className={'max-h-48'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={`${fieldProps.field.name}.description`} control={evaluacionDolorForm.control}/>
                    </div>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )} name={fieldName} control={evaluacionDolorForm.control}/>
    )
}


export default EvaluacionDolorForm
