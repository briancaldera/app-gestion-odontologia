import {useRoute} from "ziggy-js";
import {undefined, z} from "zod";
import ExamenRadiograficoSchema from "@/FormSchema/Historia/ExamenRadiograficoSchema.ts";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import AnalisisSlot from "@/Components/organisms/AnalisisSlot.tsx";
import {Text} from "@/Components/atoms/Text";
import DragAndDrop from "@/Components/molecules/DragAndDrop";
import React, {ClassAttributes} from "react";
import {useForm, UseFormReturn} from "react-hook-form";
import {Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext} from '@/shadcn/ui/carousel.tsx'
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {Button} from "@/shadcn/ui/button.tsx";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import HistoriaOdontologica from "@/src/models/HistoriaOdontologica.ts";
import {ur} from "@faker-js/faker";

type ExamenRadiograficoSectionProps = {
    historiaOdontologica: HistoriaOdontologica
    form: UseFormReturn<z.infer<typeof ExamenRadiograficoSchema>>
}

// const PanSchema = ExamenRadiograficoSchema.pick({historia_id: true, interpretacion_panoramica: true})

const ExamenRadiograficoSection = ({historiaOdontologica, form}: ExamenRadiograficoSectionProps) => {

    console.log(historiaOdontologica)

    const route = useRoute()
    const {isProcessing, router} = useInertiaSubmit()

    const handleSubmit = (values: z.infer<typeof ExamenRadiograficoSchema>) => {

        const endpoint = route('historias.odontologica.radiografias.update', {
            historia: values.historia_id
        })

        const data = {
            _method: 'patch',
            ...values
        } satisfies z.infer<typeof ExamenRadiograficoSchema> & {_method: 'patch'}

        router.post(endpoint, data, {
            onError: errors => {mapServerErrorsToFields(form, errors);
                console.log(errors)},
            onSuccess: page => {
                console.log('Good')
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

    console.log(form.formState.errors)

    return (
        <Surface className={'w-full px-6 min-h-screen'}>

            <Title level={'title-lg'}>Examen Radiografico</Title>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={''}>

                    <section className={'my-6'}>
                        <header className={'mb-1.5 mt-5 space-y-1'}>
                            <Title level={'title-md'}>Interpretación panorámica</Title>
                        </header>

                        <div className={'px-14'}>
                            <Carousel>
                                <CarouselContent className={'h-[700px] bg-neutral-950'}>
                                    {
                                        form.getValues().interpretacion_panoramica.imagenes.map((file: File) => (
                                            <CarouselItem key={file.name} className={'flex items-center'}>
                                                <Image src={file} className={'w-full h-auto flex-none'}/>
                                            </CarouselItem>
                                        ))
                                    }
                                    {
                                        historiaOdontologica.panoramicas.map((url: string) => (
                                            <CarouselItem key={url}>
                                                <div className={'bg-neutral-950'}>
                                                    <img className={'object-contain w-full h-auto'} src={url} alt={''}/>
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
                            <DragAndDrop maxFiles={5} handleDrop={handleDropPanoramica}/>
                        </div>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormMessage />
                            </FormItem>
                        )} name={'interpretacion_panoramica.imagenes'} control={form.control} />


                        <div className={'grid sm:grid-cols-2 gap-4'}>
                            {
                                Object.keys(ExamenRadiograficoSchema.shape.interpretacion_panoramica.shape.descripcion.shape).map((interpretacion: string) => (
                                    <FormField key={interpretacion} render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{interpretacion}</FormLabel>
                                            <FormControl>
                                                <Textarea value={field.value} onChange={field.onChange}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} name={`interpretacion_panoramica.descripcion.${interpretacion}`} control={form.control} />
                                ))
                            }
                        </div>
                        <div className={'grid grid-rows-5 grid-cols-3 gap-4'}>

{/*
                            {
                                Object.keys(form.formState.defaultValues?.interpretacion_panoramica).map(char => (
                                    <div key={char}>
                                        <FormField render={({field}) => {
                                            return (<FormItem>
                                                    <div className={'capitalize font-semibold'}>
                                                        {char.replaceAll('_', ' ')}
                                                    </div>
                                                    <div className={'border border-gray-400 rounded-lg'}>
                                                        <FormControl>
                                                            <AnalisisSlot title={char.replaceAll('_', ' ')}
                                                                          descripcion={field.value.descripcion}
                                                                          radiografias={field.value.radiografias}
                                                                          onSubmitAnalisis={(values) => {
                                                                              // field.onChange(values) // This doesn't work. Please do NOT use
                                                                              form.setValue(`interpretacion_panoramica.${char}.radiografias`, values.radiografias, {
                                                                                  shouldDirty: true,
                                                                                  shouldTouch: true,
                                                                                  shouldValidate: true
                                                                              })
                                                                              form.setValue(`interpretacion_panoramica.${char}.descripcion`, values.descripcion, {
                                                                                  shouldDirty: true,
                                                                                  shouldTouch: true,
                                                                                  shouldValidate: true
                                                                              })
                                                                          }}/>
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage hidden={true}/>
                                                </FormItem>
                                            )
                                        }} name={`interpretacion_panoramica.${char}`} control={form.control}/>


                                    </div>
                                ))
                            }
*/}


                        </div>
                    </section>

                    <section className={'my-6'}>
                        <header className={'mb-1.5 mt-5 space-y-1'}>
                            <Title level={'title-md'}>Interpretación radiográfica periapicales</Title>
                            <Text level={'body-md'}>(Corona, Raíz, Hueso y Espacio Ligamento Periodontal)</Text>
                        </header>

                        <div className={'px-14'}>
                            <Carousel>
                                <CarouselContent className={'h-[700px] bg-neutral-950'}>
                                    {
                                        form.getValues().interpretacion_periapicales.imagenes.map((file: File) => (
                                            <CarouselItem key={file.name} className={'flex items-center'}>
                                                <Image src={file} className={'w-full h-auto flex-none'}/>
                                            </CarouselItem>
                                        ))
                                    }
                                    {
                                        historiaOdontologica.panoramicas.map((url: string) => (
                                            <CarouselItem key={url}>
                                                <div className={'bg-neutral-950'}>
                                                    <img className={'object-contain w-full h-auto'} src={url} alt={''}/>
                                                </div>
                                            </CarouselItem>
                                        ))
                                    }
                                </CarouselContent>
                                <CarouselPrevious/>
                                <CarouselNext/>
                            </Carousel>
                        </div>

                        <div>
                            <DragAndDrop maxFiles={10} handleDrop={handleDropPeriapicales}/>
                        </div>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Descripcion</FormLabel>
                                <FormControl>
                                    <Textarea {...field} className={'h-48'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'interpretacion_periapicales.descripcion'} control={form.control}/>

                    </section>

                    <section className={'my-6'}>
                        <header className={'mb-1.5 mt-5 space-y-1'}>
                            <Title level={'title-md'}>Interpretación radiográfica coronales</Title>
                            <Text level={'body-md'}>(Corona, Cresta Alveolar, Espacio de la camara pulpar)</Text>
                        </header>

                        <div className={'px-14'}>
                            <Carousel>
                                <CarouselContent className={'h-[700px] bg-neutral-950'}>
                                    {
                                        form.getValues().interpretacion_coronales.imagenes.map((file: File) => (
                                            <CarouselItem key={file.name} className={'flex items-center'}>
                                                <Image src={file} className={'w-full h-auto flex-none'}/>
                                            </CarouselItem>
                                        ))
                                    }
                                    {
                                        historiaOdontologica.panoramicas.map((url: string) => (
                                            <CarouselItem key={url}>
                                                <div className={'bg-neutral-950'}>
                                                    <img className={'object-contain w-full h-auto'} src={url} alt={''}/>
                                                </div>
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
                        <Button disabled={isProcessing || !form.formState.isDirty || form.formState.disabled} type={'submit'}>Guardar</Button>
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
