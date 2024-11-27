import {examenRadiograficoSchema} from "@/FormSchema/Historia/ExamenRadiograficoSchema.ts";
import React from "react";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import Title from "@/Components/atoms/Title";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/shadcn/ui/carousel.tsx";
import DragAndDrop from "@/Components/molecules/DragAndDrop";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import Image from "@/Components/atoms/Image.tsx";
import {Button} from "@/shadcn/ui/button.tsx";

const ACCEPTED_PICTURE_MIME: readonly string[] = ['image/jpeg', 'image/jpg', 'image/png']

const InterpretacionPanoramica = () => {
    const {historia, disabled} = React.useContext(HistoriaEditorContext)

    const {historia_odontologica} = historia
    const {interpretacion_panoramica} = historia.historia_odontologica?.examen_radiografico!

    const {isProcessing, router} = useInertiaSubmit()

    const interpretacionPanoramicaForm = useForm<z.infer<typeof interpretacionPanoramicaSchema>>({
        resolver: zodResolver(interpretacionPanoramicaSchema),
        defaultValues: {
            interpretacion_panoramica: {
                descripcion: {
                    ATM: interpretacion_panoramica.ATM ?? "",
                    dento_alveolar_inf: interpretacion_panoramica.dento_alveolar_inf ?? "",
                    dento_alveolar_sup: interpretacion_panoramica.dento_alveolar_sup ?? "",
                    mandibular: interpretacion_panoramica.mandibular ?? "",
                    nasomaxilar: interpretacion_panoramica.nasomaxilar ?? ""
                },
                imagenes: []
            },
        },
        disabled: disabled,
    })

    const handleSubmit = (values: z.infer<typeof interpretacionPanoramicaSchema>) => {

        const endpoint = route('historias.odontologica.radiografias.update', {
            historia: historia.id
        })

        const body = {
            _method: 'patch',
            ...values
        } satisfies z.infer<typeof interpretacionPanoramicaSchema> & { _method: 'patch' }

        router.post(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(interpretacionPanoramicaForm, errors)
            },
            onSuccess: page => {
                interpretacionPanoramicaForm.reset(values)
            }
        })
    }

    const handleDropPanoramica = (files: File[]) => {
        if (files.length === 0) return

        files.forEach((file: File) => {
            if (ACCEPTED_PICTURE_MIME.includes(file.type)) {
                file.preview = URL.createObjectURL(file)
            }
        })

        const oldImages = interpretacionPanoramicaForm.getValues().interpretacion_panoramica.imagenes

        interpretacionPanoramicaForm.setValue('interpretacion_panoramica.imagenes', [...oldImages, ...files], {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    return (
        <div>
            <Form {...interpretacionPanoramicaForm}>
                <form onSubmit={interpretacionPanoramicaForm.handleSubmit(handleSubmit)}>
                    <section className={'my-6'}>
                        <header className={'mb-1.5 mt-5 space-y-1'}>
                            <Title level={'title-md'}>Interpretación panorámica</Title>
                        </header>

                        <div className={'px-14'}>
                            <Carousel>
                                <CarouselContent className={'h-[700px]'}>
                                    {
                                        historia_odontologica?.panoramicas.map((url: string) => (
                                            <CarouselItem key={url} className={'bg-white'}>
                                                <div className={'h-full flex justify-center items-center'}>
                                                    <Image src={url} className={'object-contain h-full w-full'}/>
                                                </div>
                                            </CarouselItem>
                                        ))
                                    }
                                    {
                                        interpretacionPanoramicaForm.getValues().interpretacion_panoramica.imagenes.map((file: File) => (
                                            <CarouselItem key={file.name} className={'bg-white'}>
                                                <div className={'h-full flex justify-center items-center'}>
                                                    <Image src={file} className={'object-contain h-full w-full'}/>
                                                </div>
                                            </CarouselItem>
                                        ))
                                    }
                                </CarouselContent>
                                <CarouselPrevious/>
                                <CarouselNext/>
                            </Carousel>
                        </div>


                        {
                            !disabled && (
                                <div className={'my-2'}>
                                    <DragAndDrop maxFiles={5} handleDrop={handleDropPanoramica} disabled={disabled}/>
                                </div>
                            )
                        }

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormMessage/>
                            </FormItem>
                        )} name={'interpretacion_panoramica.imagenes'} control={interpretacionPanoramicaForm.control}/>


                        <div className={'grid sm:grid-cols-2 gap-4'}>
                            {
                                Object.keys(interpretacionPanoramicaSchema.shape.interpretacion_panoramica.shape.descripcion.shape).map((interpretacion: string) => (
                                    <FormField key={interpretacion} render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{interpretacionPanoramicaSchema.shape.interpretacion_panoramica.shape.descripcion.shape[interpretacion].description}</FormLabel>
                                            <FormControl>
                                                <Textarea {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={`interpretacion_panoramica.descripcion.${interpretacion}`}
                                               control={interpretacionPanoramicaForm.control}/>
                                ))
                            }
                        </div>
                    </section>
                    <div className={'flex justify-end'}>
                        <Button type='submit'
                                disabled={interpretacionPanoramicaForm.formState.disabled || !interpretacionPanoramicaForm.formState.isDirty}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

const interpretacionPanoramicaSchema = examenRadiograficoSchema.pick({interpretacion_panoramica: true})

export default InterpretacionPanoramica
