import Surface from "@/Components/atoms/Surface";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/shadcn/ui/form.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import HistoriaPeriodontalSchema from "@/FormSchema/Historia/HistoriaPeriodontalSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {HistoriaPeriodontal} from "@/src/models/HistoriaOdontologica.ts";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useRoute} from "ziggy-js";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import Title from "@/Components/atoms/Title";
import {Button} from "@/shadcn/ui/button.tsx";
import {FormLabel} from "@mui/joy";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/ui/select.tsx";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";

type HistoriaPeriodontalSectionProps = {
    historia_id: string
    readonly: boolean
    historia_periodontal: HistoriaPeriodontal
}

const HistoriaPeriodontalSection = ({historia_id, historia_periodontal, readonly}: HistoriaPeriodontalSectionProps) => {

    const {isProcessing, router} = useInertiaSubmit()
    const route = useRoute()

    const {higiene_bucal, control_higiene_bucal} = historia_periodontal

    const form = useForm<z.infer<typeof HistoriaPeriodontalSchema>>({
        resolver: zodResolver(HistoriaPeriodontalSchema),
        disabled: readonly,
        defaultValues: {
            higiene_bucal: {
                cepillado_lengua: higiene_bucal.cepillado_lengua,
                frecuencia_cepillado: higiene_bucal.frecuencia_cepillado ?? '',
                metodo_auxiliar: {
                    cepillo_interdental: higiene_bucal.metodo_auxiliar.cepillo_interdental,
                    enjuague_bucal: higiene_bucal.metodo_auxiliar.enjuague_bucal,
                    hidroterapia: higiene_bucal.metodo_auxiliar.hidroterapia,
                    hilo_dental: higiene_bucal.metodo_auxiliar.hilo_dental
                },
                metodo_cepillado: higiene_bucal.metodo_cepillado ?? '',
                sustancia_reveladora: {
                    descripcion: higiene_bucal.sustancia_reveladora.descripcion ?? '',
                    otro: higiene_bucal.sustancia_reveladora.otro ?? ''
                },
                tipo_cepillo: higiene_bucal.tipo_cepillo ?? ''
            },
            control_higiene_bucal: {
                cepillo_recomendado: control_higiene_bucal.cepillo_recomendado ?? '',
                control_halitosis: control_higiene_bucal.control_halitosis ?? '',
                metodos_auxiliares_requeridos: control_higiene_bucal.metodos_auxiliares_requeridos ?? '',
                placa_bacteriana_lengua: control_higiene_bucal.placa_bacteriana_lengua,
                tecnica_cepillado_ensenada: control_higiene_bucal.tecnica_cepillado_ensenada ?? '',
                tratamiento: control_higiene_bucal.tratamiento ?? ''
            }
        } satisfies z.infer<typeof HistoriaPeriodontalSchema>,
    })

    const handleSubmit = (values: z.infer<typeof HistoriaPeriodontalSchema>) => {
        const endpoint = route('historias.odontologica.periodontal.update', {
            historia: historia_id
        })

        router.patch(endpoint, {...values}, {

            onError: errors => {
                mapServerErrorsToFields(form, errors)
            },
            onSuccess: _page => {
                form.reset(values)
                router.reload()
            }
        })
    }

    return (
        <Surface className={'p-6'}>
            <section>
                <header>
                    <Title>Historia Periodontal</Title>
                </header>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>


                        <div className={'grid grid-cols-1 sm:grid-cols-2 gap-3 border p-2 rounded-lg'}>

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
                            )} name={'higiene_bucal.frecuencia_cepillado'} control={form.control}/>

                            <div className={'grid grid-cols-1 sm:grid-cols-2 gap-3'}>
                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Tipo de cepillo</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}
                                                disabled={field.disabled} name={field.name}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={'Selecciona un tipo de dureza'}></SelectValue>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={'D'}>Duro</SelectItem>
                                                <SelectItem value={'M'}>Medio</SelectItem>
                                                <SelectItem value={'S'}>Suave</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'higiene_bucal.tipo_cepillo'} control={form.control}/>

                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Tipo de cepillo</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}
                                                disabled={field.disabled} name={field.name}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={'Seleccione un metodo de cepillado'}></SelectValue>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={'H'}>Horizontal</SelectItem>
                                                <SelectItem value={'V'}>Vertical</SelectItem>
                                                <SelectItem value={'C'}>Circular</SelectItem>
                                                <SelectItem value={'O'}>Otro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'higiene_bucal.metodo_cepillado'} control={form.control}/>
                            </div>

                            <div>
                                <FormLabel>Método auxiliar de higiene</FormLabel>
                                {
                                    Object.keys(HistoriaPeriodontalSchema.shape.higiene_bucal.shape.metodo_auxiliar.shape).map(key => (
                                        <FormField key={key} render={({field}) => (
                                            <FormItem className={'flex flex-row items-start space-x-3 space-y-0'}>
                                                <FormControl>
                                                    <Checkbox checked={field.value} name={field.name}
                                                              disabled={field.disabled}
                                                              onCheckedChange={field.onChange}/>
                                                </FormControl>
                                                <FormLabel
                                                    className={'capitalize font-normal'}>{key.replaceAll('_', ' ')}</FormLabel>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={`higiene_bucal.metodo_auxiliar.${key}`} control={form.control}/>
                                    ))
                                }
                            </div>

                            <FormField render={({field}) => (
                                <FormItem className={'col-start-1'}>
                                    <FormLabel>Sustancia reveladora</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'higiene_bucal.sustancia_reveladora.descripcion'} control={form.control}/>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>Otro</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'higiene_bucal.sustancia_reveladora.otro'} control={form.control}/>

                            <FormField render={({field}) => (
                                <FormItem className={'flex flex-row items-start space-x-3 space-y-0'}>
                                    <FormControl>
                                        <Checkbox checked={field.value} name={field.name} disabled={field.disabled}
                                                  onCheckedChange={field.onChange}/>
                                    </FormControl>
                                    <FormLabel className={'capitalize font-normal'}>Cepillado de lengua</FormLabel>
                                    <FormMessage/>
                                </FormItem>
                            )} name={`higiene_bucal.cepillado_lengua`} control={form.control}/>


                        </div>

                        <div className={'grid grid-cols-1 sm:grid-cols-2 gap-3 border p-2 rounded-lg mt-4'}>
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
                            )} name={'control_higiene_bucal.tecnica_cepillado_ensenada'} control={form.control}/>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>Cepillo dental recomendado para su paciente</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'control_higiene_bucal.cepillo_recomendado'} control={form.control}/>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>Métodos auxiliares requeridos</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'control_higiene_bucal.metodos_auxiliares_requeridos'} control={form.control}/>

                            <div>

                                <FormField render={({field}) => (
                                    <FormItem className={'flex flex-row items-start space-x-3 space-y-0'}>
                                        <FormControl>
                                            <Checkbox checked={field.value} name={field.name} disabled={field.disabled}
                                                      onCheckedChange={field.onChange}/>
                                        </FormControl>
                                        <FormLabel className={'capitalize font-normal'}>Presencia de placa
                                            bacteriana</FormLabel>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={`control_higiene_bucal.placa_bacteriana_lengua`} control={form.control}/>

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
                                )} name={'control_higiene_bucal.control_halitosis'} control={form.control}/>

                            </div>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>Tratamiento</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'control_higiene_bucal.tratamiento'} control={form.control}/>
                        </div>


                        <div className={'col-span-full flex justify-end gap-3'}>
                            <Button
                                disabled={isProcessing || !form.formState.isDirty || form.formState.disabled}>Guardar</Button>
                        </div>


                    </form>
                </Form>
            </section>
        </Surface>
    )
}

export default HistoriaPeriodontalSection
