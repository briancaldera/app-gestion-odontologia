import React from "react";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
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

const InterpretacionCoronales = () => {
    const {historia} = React.useContext(HistoriaEditorContext)

    const {historia_odontologica} = historia
    const {interpretacion_coronales} = historia.historia_odontologica?.examen_radiografico!

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing

    const interpretacionCoronalesForm = useForm<z.infer<typeof interpretacionCoronalesSchema>>({
        resolver: zodResolver(interpretacionCoronalesSchema),
        defaultValues: {
            interpretacion_coronales: {
                descripcion: interpretacion_coronales ?? "",
                imagenes: []
            }
        },
        disabled: isDisabled,
    })

    const handleSubmit = (values: z.infer<typeof interpretacionCoronalesSchema>) => {

        const endpoint = route('historias.odontologica.radiografias.update', {
            historia: historia.id
        })

        const body = {
            _method: 'patch',
            ...values
        } satisfies z.infer<typeof interpretacionCoronalesSchema> & { _method: 'patch' }

        router.post(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(interpretacionCoronalesForm, errors)
            },
            onSuccess: page => {
                interpretacionCoronalesForm.reset(values)
            }
        })
    }

    const handleDropCoronales = (files: File[]) => {
        if (files.length === 0) return

        files.forEach((file: File) => {
            if (ACCEPTED_PICTURE_MIME.includes(file.type)) {
                file.preview = URL.createObjectURL(file)
            }
        })

        const oldImages = interpretacionCoronalesForm.getValues().interpretacion_coronales.imagenes

        interpretacionCoronalesForm.setValue('interpretacion_coronales.imagenes', [...oldImages, ...files], {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    return (
        <div>
            <Form {...interpretacionCoronalesForm}>
                <form onSubmit={interpretacionCoronalesForm.handleSubmit(handleSubmit)}>
                    <section className={'my-6'}>
                        <header className={'mb-1.5 mt-5 space-y-1'}>
                            <Title level={'title-md'}>Interpretación Radiográfica Coronales: (Corona, Cresta Alveolar,
                                Espacio de la Cámara Pulpar)</Title>
                        </header>

                        <div className={'px-14'}>
                            <Carousel>
                                <CarouselContent className={'h-[700px]'}>
                                    {
                                        historia_odontologica?.coronales.map((url: string) => (
                                            <CarouselItem key={url} className={'bg-white'}>
                                                <div className={'h-full flex justify-center items-center'}>
                                                    <Image src={url} className={'object-contain h-full w-full'}/>
                                                </div>
                                            </CarouselItem>
                                        ))
                                    }
                                    {
                                        interpretacionCoronalesForm.getValues().interpretacion_coronales.imagenes.map((file: File) => (
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

                        <div className={'my-2'}>
                            <DragAndDrop maxFiles={5} handleDrop={handleDropCoronales}/>
                        </div>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormMessage/>
                            </FormItem>
                        )} name={'interpretacion_coronales.imagenes'} control={interpretacionCoronalesForm.control}/>


                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Interpretación</FormLabel>
                                <FormControl>
                                    <Textarea value={field.value} onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={`interpretacion_coronales.descripcion`}
                                   control={interpretacionCoronalesForm.control}/>

                    </section>
                    <div className={'flex justify-end'}>
                        <Button type='submit'
                                disabled={interpretacionCoronalesForm.formState.disabled || !interpretacionCoronalesForm.formState.isDirty}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

const interpretacionCoronalesSchema = examenRadiograficoSchema.pick({interpretacion_coronales: true})

export default InterpretacionCoronales