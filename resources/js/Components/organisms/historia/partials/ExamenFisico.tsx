import React, {useContext} from "react";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import Title from "@/Components/atoms/Title";
import {Text} from "@/Components/atoms/Text";
import {useForm} from "react-hook-form";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {z} from 'zod'
import {ExamenFisicoSchema} from "@/FormSchema/Historia/HistoriaOdontologicaSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import Input from "@/Components/atoms/Input.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/shadcn/ui/tooltip.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Separator} from "@/shadcn/ui/separator.tsx";

const ExamenFisico = ({}) => {
    const {historia, disabled} = useContext(HistoriaEditorContext)
    const {isProcessing, router} = useInertiaSubmit()

    const hasConsentimiento: boolean = !!historia.historia_odontologica?.consentimiento
    const isDisabled: boolean = !hasConsentimiento || disabled

    const {examen_fisico: {signos_vitales, examen_intraoral, examen_extraoral}} = historia.historia_odontologica!

    const examenFisicoForm = useForm<z.infer<typeof examenFisicoSchema>>({
        resolver: zodResolver(examenFisicoSchema),
        defaultValues: {
            examen_fisico: {
                signos_vitales: {
                    pulso: signos_vitales.pulso ?? 0,
                    respiracion: signos_vitales.respiracion ?? 0,
                    temperatura: signos_vitales.temperatura ?? 0,
                    tension_arterial: {
                        diastole: signos_vitales.tension_arterial.diastole ?? 0,
                        sistole: signos_vitales.tension_arterial.sistole ?? 0
                    }
                },
                examen_extraoral: {
                    articulacion_temporomandibular: examen_extraoral.articulacion_temporomandibular ?? '',
                    cabeza: examen_extraoral.cabeza ?? '',
                    cara: examen_extraoral.cara ?? '',
                    lesiones_extraorales: examen_extraoral.lesiones_extraorales ?? '',
                    palpacion_ganglios: examen_extraoral.palpacion_ganglios ?? '',
                    piel: examen_extraoral.piel ?? '',
                    simetria_facial: examen_extraoral.simetria_facial ?? ''
                },
                examen_intraoral: {
                    dientes: examen_intraoral.dientes ?? '',
                    discromias: examen_intraoral.discromias ?? '',
                    encias: examen_intraoral.encias ?? '',
                    frenillos: examen_intraoral.frenillos ?? '',
                    labios: examen_intraoral.labios ?? '',
                    lengua_tipo: examen_intraoral.lengua_tipo ?? '',
                    maxilares: examen_intraoral.maxilares ?? '',
                    mejillas: examen_intraoral.mejillas ?? '',
                    paladar_duro_blando: examen_intraoral.paladar_duro_blando ?? '',
                    piso_boca: examen_intraoral.piso_boca ?? ''
                }
            },
        },
        disabled: isDisabled
    })

    const handleSubmit = (values: z.infer<typeof examenFisicoSchema>) => {
        const endpoint = route('historias.odontologica.update', {
            historia: historia.id
        })

        const body = {
            ...values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(examenFisicoForm, errors)
            },
            onSuccess: _page => {
                examenFisicoForm.reset(values)
            }
        })
    }

    return (
        <div>
            {
                (!hasConsentimiento) &&
                <div>
                    <Text className='text-rose-500'>Debes tener consentimiento antes de llenar esta sección</Text>
                    <Separator className='bg-rose-500'/>
                </div>
            }
            <Title level={'title-lg'}>Examen Físico</Title>

            <Form {...examenFisicoForm}>
                <form id='examenFisicoForm' onSubmit={examenFisicoForm.handleSubmit(handleSubmit)}>

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-y-6'>

                        <Title className='col-span-full'>Signos vitales</Title>

                        <div className='col-span-full flex flex-wrap justify-center gap-x-10'>

                            <Title>Tensión arterial:</Title>

                            <FormField render={({field}) => (
                                <FormItem className={'w-32'}>
                                    <FormLabel className={'capitalize'}>Sistólica</FormLabel>
                                    <div className={'flex items-baseline gap-2'}>
                                        <FormControl>
                                            <Input {...field} type={'number'}/>
                                        </FormControl>
                                        <Text level={'body-md'} className={'font-bold '}>mmHg</Text>
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'examen_fisico.signos_vitales.tension_arterial.sistole'}
                                       control={examenFisicoForm.control}/>

                            <FormField render={({field}) => (
                                <FormItem className={'w-32'}>
                                    <FormLabel>Diastólica</FormLabel>
                                    <div className={'flex items-baseline gap-2'}>
                                        <FormControl>
                                            <Input {...field} type={'number'}/>
                                        </FormControl>
                                        <Text level={'body-md'} className={'font-bold '}>mmHg</Text>
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'examen_fisico.signos_vitales.tension_arterial.diastole'}
                                       control={examenFisicoForm.control}/>

                        </div>

                        <div className='col-span-full flex flex-wrap justify-center gap-x-10'>
                            <FormField render={({field}) => (
                                <FormItem className={'w-32'}>
                                    <FormLabel className={'capitalize'}>Pulso</FormLabel>
                                    <div className={'flex gap-2 items-baseline'}>
                                        <FormControl>
                                            <Input {...field} type={'number'}/>
                                        </FormControl>
                                        <Tooltip>
                                            <TooltipTrigger onClick={(e) => e.preventDefault()}>
                                                <abbr>PPM</abbr>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Pulsaciones por minuto
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'examen_fisico.signos_vitales.pulso'} control={examenFisicoForm.control}/>

                            <FormField render={({field}) => (
                                <FormItem className={'w-32'}>
                                    <FormLabel
                                        className={'capitalize'}>Respiración</FormLabel>
                                    <div className={'flex gap-2 items-baseline'}>
                                        <FormControl>
                                            <Input {...field} type={'number'}/>
                                        </FormControl>
                                        <Tooltip>
                                            <TooltipTrigger onClick={(e) => e.preventDefault()}>
                                                <abbr>RPM</abbr>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Respiraciones por minuto
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'examen_fisico.signos_vitales.respiracion'} control={examenFisicoForm.control}/>

                            <FormField render={({field}) => (
                                <FormItem className={'w-32'}>
                                    <FormLabel
                                        className={'capitalize'}>Temperatura</FormLabel>
                                    <div className={'flex gap-2 items-baseline'}>
                                        <FormControl>
                                            <Input {...field} type={'number'} step={0.1}/>
                                        </FormControl>
                                        <Tooltip>
                                            <TooltipTrigger onClick={(e) => e.preventDefault()}>
                                                <em>C°</em>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Grados Celsius
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'examen_fisico.signos_vitales.temperatura'} control={examenFisicoForm.control}/>
                        </div>

                    </div>


                    <div className='py-6'>
                        <Title level={'title-md'}>Examen Extraoral</Title>
                        <div>
                            {
                                Object.keys(ExamenFisicoSchema.shape.examen_extraoral.shape).map(char => (
                                    <FormField key={char} render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{ExamenFisicoSchema.shape.examen_extraoral.shape[char].description}</FormLabel>
                                            <FormControl>
                                                <Textarea {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={`examen_fisico.examen_extraoral.${char}`}
                                               control={examenFisicoForm.control}/>
                                ))
                            }
                        </div>

                    </div>

                    <div className='py-6'>
                        <Title level={'title-md'}>Examen Intraoral</Title>
                        <div>
                            {
                                Object.keys(ExamenFisicoSchema.shape.examen_intraoral.shape).map(char => (
                                    <FormField key={char} render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{ExamenFisicoSchema.shape.examen_intraoral.shape[char].description}</FormLabel>
                                            <FormControl>
                                                <Textarea {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={`examen_fisico.examen_intraoral.${char}`}
                                               control={examenFisicoForm.control}/>
                                ))
                            }
                        </div>
                    </div>

                </form>
            </Form>

            <div className={'flex justify-end'}>
                <Button type={'submit'} form='examenFisicoForm'
                        disabled={!examenFisicoForm.formState.isDirty || examenFisicoForm.formState.disabled}>Guardar</Button>
            </div>
        </div>
    )
}

const examenFisicoSchema = z.object({
    examen_fisico: ExamenFisicoSchema
})

export default ExamenFisico
