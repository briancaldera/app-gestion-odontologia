import {useRoute} from "ziggy-js";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {z} from "zod";
import {Plus} from 'lucide-react'
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import MediaSchema, {MediaSchemaDefault} from "@/FormSchema/Historia/MediaSchema.ts";
import {useForm} from "react-hook-form";
import Title from "@/Components/atoms/Title";
import React from "react";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {Text} from "@/Components/atoms/Text";
import Image from "@/Components/atoms/Image.tsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/shadcn/ui/dialog.tsx";
import {Input} from "@/shadcn/ui/input.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import DragAndDrop from "@/Components/molecules/DragAndDrop";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import CorrectionsBlock from "@/src/corrections/CorrectionsBlock.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {Media} from "@/src/models/HistoriaOdontologica.ts";

// TODO: Remove dialog when file is submitted
// TODO: Limit total files in backend to 20 files

type MediaSectionProps = {
    media: readonly Media[]
    readmode: boolean
    historia_id: string
}

const MediaSection = ({media, historia_id, readmode}: MediaSectionProps) => {

    const {
        historia,
        disabled,
        homework,
        canCreateCorrections,
        correctionsModel
    } = React.useContext(HistoriaEditorContext)

    const [openAddFileDialog, setOpenAddFileDialog] = React.useState<boolean>(false)

    const form = useForm<z.infer<typeof MediaSchema>>({
        resolver: zodResolver(MediaSchema),
        defaultValues: MediaSchemaDefault,
        values: {
            historia_id: historia_id, description: '', file: [], title: ""
        },
        disabled: disabled,
    })

    const route = useRoute()

    const {isProcessing, router} = useInertiaSubmit()

    const handleSubmit = (values: z.infer<typeof MediaSchema>) => {

        const endpoint = route('historias.odontologica.media.store', {
            historia: values.historia_id
        })

        const data = {
            description: values.description,
            file: values.file.pop(),
            historia_id: values.historia_id,
            title: values.title
        } satisfies z.infer<typeof MediaSchema>

        router.post(endpoint, data, {
            onError: errors => mapServerErrorsToFields(form, errors),
            onSuccess: _page => {
                setOpenAddFileDialog(false)
                router.reload()
            }
        })
    }

    const handleDrop = (files: File[]) => {
        if (files.length === 0) return
        if (files.length > 2) return

        form.setValue('file', [...files], {shouldDirty: true, shouldTouch: true, shouldValidate: true})
    }

    const onOpenChange = (open: boolean) => {
        if (!open) {
            form.reset()
        }
        setOpenAddFileDialog(open)
    }

    return (
        <ScrollArea className={'bg-white w-full p-6 h-[83vh]'}>

            <Title level={'title-lg'}>Archivos adicionales</Title>

            <section>
                <header className={'mb-1.5 mt-5 space-y-1.5'}>
                    <Title level={'title-md'}>Imágenes</Title>
                    <Text level={'body-sm'}>En esta sección podrás anexar cualquier imagen adicional relevante para la
                        historia clínica. (Máximo 10 MB por archivo)</Text>
                </header>

                <CorrectionsBlock model={correctionsModel} name={'media'} canCreateCorrections={canCreateCorrections}>
                    <div className={'grid grid-cols-1 sm:grid-cols-3 gap-3'}>
                        {
                            media.map((media,index) => (
                                <div key={media.url} className={'aspect-square border flex flex-col justify-center items-center'}>
                                    <Image className={'cursor-pointer'} id={`img_${index}`} src={media.url} onClick={() => document.querySelector(`#img_${index}`)?.requestFullscreen()}/>
                                    <Title>{media.title}</Title>
                                    <Text>{media.description}</Text>
                                </div>
                            ))
                        }
                    </div>
                </CorrectionsBlock>

                <Dialog open={openAddFileDialog} onOpenChange={onOpenChange}>
                    <DialogContent className={'max-w-[75vw] pb-0 px-0 border-0'}>
                        <DialogHeader className={'p-2'}>
                            <DialogTitle>Agregar archivo</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)}
                                  className={'flex-1 flex flex-col gap-6'}>
                                <div className={'h-[75vh] flex'}>

                                    <div className={'bg-neutral-950 basis-3/4'}>
                                        <div className={'basis-full w-full h-full'}>
                                            {form.getValues().file?.map((file: File) => <Image key={file.name}
                                                                                               src={file}
                                                                                               className={'object-contain w-full h-full'}/>)}
                                        </div>
                                    </div>
                                    <div className={'basis-1/4 flex flex-col p-2'}>

                                        <FormField render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Nombre</FormLabel>
                                                <FormControl>
                                                    <Input {...field}/>
                                                </FormControl>
                                                <FormDescription>Agrega un nombre para el archivo</FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={'title'} control={form.control}/>

                                        <FormField render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Descripción (Opcional)</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field}/>
                                                </FormControl>
                                                <FormDescription>Agrega un nombre para el archivo</FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={'description'} control={form.control}/>

                                        <DragAndDrop maxFiles={1} handleDrop={handleDrop}/>

                                        <div className={'flex justify-end gap-3 mt-2'}>
                                            <Button
                                                disabled={disabled || !form.formState.isDirty}>Guardar</Button>
                                        </div>

                                    </div>

                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>


                <div className={'flex justify-end gap-3'}>
                    <Button disabled={disabled} onClick={() => setOpenAddFileDialog(true)}><Plus
                        className={'size-4 me-2'}/>Agregar</Button>
                </div>

            </section>
        </ScrollArea>
    )
}

export default MediaSection
