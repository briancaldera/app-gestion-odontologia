import {useRoute} from "ziggy-js";
import {z} from "zod";
import ExamenRadiograficoSchema from "@/FormSchema/Historia/ExamenRadiograficoSchema.ts";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Text} from "@/Components/atoms/Text";
import DragAndDrop from "@/Components/molecules/DragAndDrop";
import React, {ClassAttributes} from "react";
import {UseFormReturn} from "react-hook-form";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/shadcn/ui/carousel.tsx'
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {Button} from "@/shadcn/ui/button.tsx";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import HistoriaOdontologica from "@/src/models/HistoriaOdontologica.ts";
import InterpretacionPanoramica from "@/Components/organisms/historia/partials/InterpretacionPanoramica.tsx";
import InterpretacionPeriapicales from "@/Components/organisms/historia/partials/InterpretacionPeriapicales.tsx";

type ExamenRadiograficoSectionProps = {
    historiaOdontologica: HistoriaOdontologica
    form: UseFormReturn<z.infer<typeof ExamenRadiograficoSchema>>
}

const ExamenRadiograficoSection = ({historiaOdontologica, form}: ExamenRadiograficoSectionProps) => {

    const route = useRoute()
    const {isProcessing, router} = useInertiaSubmit()

    const handleSubmit = (values: z.infer<typeof ExamenRadiograficoSchema>) => {

        const endpoint = route('historias.odontologica.radiografias.update', {
            historia: values.historia_id
        })

        const data = {
            _method: 'patch',
            ...values
        } satisfies z.infer<typeof ExamenRadiograficoSchema> & { _method: 'patch' }

        router.post(endpoint, data, {
            onError: errors => mapServerErrorsToFields(form, errors),
            onSuccess: page => {
                form.reset()
                router.reload()
            }
        })
    }

    const handleDropPanoramica = (files: File[]) => {
        if (files.length === 0) return

        const oldImages = form.getValues().interpretacion_panoramica.imagenes

        form.setValue('interpretacion_panoramica.imagenes', [...oldImages, ...files], {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const handleDropCoronales = (files: File[]) => {
        if (files.length === 0) return

        const oldImages = form.getValues().interpretacion_coronales.imagenes

        form.setValue('interpretacion_coronales.imagenes', [...oldImages, ...files], {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const handleDropPeriapicales = (files: File[]) => {
        if (files.length === 0) return

        const oldImages = form.getValues().interpretacion_periapicales.imagenes

        form.setValue('interpretacion_periapicales.imagenes', [...oldImages, ...files], {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    return (
        <Surface className={'w-full px-6 min-h-screen'}>

            <Title level={'title-lg'}>Examen Radiografico</Title>

            <InterpretacionPanoramica/>

            <InterpretacionPeriapicales/>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={''}>

                    <section className={'my-6'}>
                        <header className={'mb-1.5 mt-5 space-y-1'}>
                            <Title level={'title-md'}>Interpretación radiográfica coronales</Title>
                            <Text level={'body-md'}>(Corona, Cresta Alveolar, Espacio de la camara pulpar)</Text>
                        </header>

                        <div className={'px-14'}>
                            <Carousel>
                                <CarouselContent className={'h-[700px] bg-neutral-950'}>
                                    {
                                        historiaOdontologica.coronales.map((url: string) => (
                                            <CarouselItem key={url} className={'flex items-center bg-neutral-950'}>
                                                <Image src={url} className={'w-full h-auto flex-none'}/>
                                            </CarouselItem>
                                        ))
                                    }
                                    {
                                        form.getValues().interpretacion_coronales.imagenes.map((file: File) => (
                                            <CarouselItem key={file.name} className={'flex items-center'}>
                                                <Image src={file} className={'w-full h-auto flex-none'}/>
                                            </CarouselItem>
                                        ))
                                    }
                                </CarouselContent>
                                <CarouselPrevious/>
                                <CarouselNext/>
                            </Carousel>
                        </div>

                        <div>
                            <DragAndDrop maxFiles={10} handleDrop={handleDropCoronales}/>
                        </div>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Descripcion</FormLabel>
                                <FormControl>
                                    <Textarea {...field} className={'h-48'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'interpretacion_coronales.descripcion'} control={form.control}/>
                    </section>

                    <div className={'flex justify-end gap-3'}>
                        <Button disabled={isProcessing || !form.formState.isDirty || form.formState.disabled}
                                type={'submit'}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </Surface>
    )
}

type ImageProps = {
    src: string | File
}

const Image = ({
                   src,
                   ...props
               }: ImageProps & ClassAttributes<HTMLImageElement> & React.ImgHTMLAttributes<HTMLImageElement>) => {

    const preview: string = React.useMemo(() => {
        if (typeof src === 'string') {
            return src
        } else {
            return URL.createObjectURL(src)
        }
    }, [])

    React.useEffect(() => {
        return () => {
            if (src instanceof File)
                URL.revokeObjectURL(preview)
        }
    }, [])

    return (
        <img src={preview} alt={''} {...props}/>
    )
}


export default ExamenRadiograficoSection
