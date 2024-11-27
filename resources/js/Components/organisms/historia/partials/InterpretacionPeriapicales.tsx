import React from "react";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm} from "react-hook-form";
import {undefined, z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {examenRadiograficoSchema} from "@/FormSchema/Historia/ExamenRadiograficoSchema.ts";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import Title from "@/Components/atoms/Title";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/shadcn/ui/carousel.tsx";
import Image from "@/Components/atoms/Image.tsx";
import DragAndDrop from "@/Components/molecules/DragAndDrop";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Button} from "@/shadcn/ui/button.tsx";

const ACCEPTED_PICTURE_MIME: readonly string[] = ['image/jpeg', 'image/jpg', 'image/png']

const InterpretacionPeriapicales = () => {
    const {historia, disabled} = React.useContext(HistoriaEditorContext)

    const {historia_odontologica} = historia
    const {interpretacion_periapicales} = historia.historia_odontologica?.examen_radiografico!

    const {isProcessing, router} = useInertiaSubmit()

    const interpretacionPeriapicalesForm = useForm<z.infer<typeof interpretacionPeriapicalesSchema>>({
        resolver: zodResolver(interpretacionPeriapicalesSchema),
        defaultValues: {
            interpretacion_periapicales: {
                descripcion:  interpretacion_periapicales ?? "",
                imagenes: []
            }
        },
        disabled: disabled,
    })

    const handleSubmit = (values: z.infer<typeof interpretacionPeriapicalesSchema>) => {

        const endpoint = route('historias.odontologica.radiografias.update', {
            historia: historia.id
        })

        const body = {
            _method: 'patch',
            ...values
        } satisfies z.infer<typeof interpretacionPeriapicalesSchema> & { _method: 'patch' }

        router.post(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(interpretacionPeriapicalesForm, errors)
            },
            onSuccess: page => {
                interpretacionPeriapicalesForm.reset(values)
            }
        })
    }

    const handleDropPeriapicales = (files: File[]) => {
        if (files.length === 0) return

        files.forEach((file: File) => {
            if (ACCEPTED_PICTURE_MIME.includes(file.type)) {
                file.preview = URL.createObjectURL(file)
            }
        })

        const oldImages = interpretacionPeriapicalesForm.getValues().interpretacion_periapicales.imagenes

        interpretacionPeriapicalesForm.setValue('interpretacion_periapicales.imagenes', [...oldImages, ...files], {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    return (
        <div>
            <Form {...interpretacionPeriapicalesForm}>
                <form onSubmit={interpretacionPeriapicalesForm.handleSubmit(handleSubmit)}>
                    <section className={'my-6'}>
                        <header className={'mb-1.5 mt-5 space-y-1'}>
                            <Title level={'title-md'}>Interpretación Radiográfica Periapicales: (Corona, Raíz, Hueso y Espacio Ligamento Periodontal)</Title>
                        </header>

                        <div className={'px-14'}>
                            <Carousel>
                                <CarouselContent className={'h-[700px]'}>
                                    {
                                        historia_odontologica?.periapicales.map((url: string) => (
                                            <CarouselItem key={url} className={'bg-white'}>
                                                <div className={'h-full flex justify-center items-center'}>
                                                    <Image src={url} className={'object-contain h-full w-full'}/>
                                                </div>
                                            </CarouselItem>
                                        ))
                                    }
                                    {
                                        interpretacionPeriapicalesForm.getValues().interpretacion_periapicales.imagenes.map((file: File) => (
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
                                    <DragAndDrop maxFiles={5} handleDrop={handleDropPeriapicales} disabled={disabled}/>
                                </div>

                            )
                        }

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormMessage/>
                            </FormItem>
                        )} name={'interpretacion_periapicales.imagenes'} control={interpretacionPeriapicalesForm.control}/>


                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Interpretación</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={`interpretacion_periapicales.descripcion`}
                                   control={interpretacionPeriapicalesForm.control}/>

                    </section>
                    <div className={'flex justify-end'}>
                        <Button type='submit'
                                disabled={interpretacionPeriapicalesForm.formState.disabled || !interpretacionPeriapicalesForm.formState.isDirty}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

const interpretacionPeriapicalesSchema = examenRadiograficoSchema.pick({interpretacion_periapicales: true})

export default InterpretacionPeriapicales
