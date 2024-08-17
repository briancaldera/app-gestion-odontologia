import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shadcn/ui/dialog";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/shadcn/ui/card"
import {Text} from "@/Components/atoms/Text";
import {ScrollArea} from '@/shadcn/ui/scroll-area'
import DragAndDrop from "@/Components/molecules/DragAndDrop";
import {faker} from "@faker-js/faker";
import Textarea from '@/Components/atoms/Textarea'
import {OutlinedButton} from "@/Components/molecules/OutlinedButton";
import React from "react";
import {Icon} from "@/Components/atoms/Icon";
import {Trash} from "lucide-react"
import Title from "@/Components/atoms/Title";
import Dropzone from "react-dropzone";
import DocumentIcon from "@heroicons/react/24/outline/DocumentArrowDownIcon";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/shadcn/ui/form";
import {enqueueSnackbar} from "notistack";
import {VisuallyHidden} from '@radix-ui/react-visually-hidden'
import {RadiografiaSchema, MAX_PICTURES_PER_RADIOGRAFIA} from '@/FormSchema/Historia/ExamenRadiograficoForm'

type CreateAnalisisProps = Readonly<{
    title: string,
    descripcion: string,
    radiografias: (string | File)[]
    onSubmitAnalisis: (values: z.infer<typeof RadiografiaSchema>) => void
}>

const radiografiaFileFormats = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
} as const

const AnalisisSlot = ({title, descripcion, radiografias, onSubmitAnalisis}: CreateAnalisisProps) => {

    const [showDialog, setShowDialog] = React.useState<boolean>(false)

    const onSubmit = (values) => {
        setShowDialog(false)
        onSubmitAnalisis(values)
    }


    return (
        <div>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogTrigger className={'w-full'} onClick={() => setShowDialog(true)}>
                    <div className={'h-32 p-2'}>
                    {
                        (radiografias.length > 0) ? (
                            <Card className={'h-full border-t-8 border-t-indigo-400'}>
                                <CardHeader>
                                    <CardTitle className={'line-clamp-1 text-md capitalize text-left'}>{`${title}`}</CardTitle>
                                    <CardDescription className={'line-clamp-1 text-ellipsis overflow-hidden text-left'}>{descripcion}</CardDescription>
                                </CardHeader>
                                {/*<CardContent>*/}
                                {/*    <p>Card Content</p>*/}
                                {/*</CardContent>*/}
                                {/*<CardFooter>*/}
                                {/*    <p>Card Footer</p>*/}
                                {/*</CardFooter>*/}
                            </Card>
                        ) : (
                            <div
                                className={'border-2 border-neutral-300 border-dashed rounded-lg h-full w-full flex items-center justify-center'}>
                                <Text className={'text-neutral-300 font-bold'}>Crear interpretación</Text>
                            </div>
                        )
                    }
                    </div>

                </DialogTrigger>
                <DialogContent className={'max-w-fit overflow-hidden p-0 h-[700px]'}>
                    <VisuallyHidden>
                        <DialogHeader>
                            <DialogTitle>Crear análisis</DialogTitle>
                            <DialogDescription>Selecciona una o más imágenes radiográficas y escribe un
                                análisis</DialogDescription>
                        </DialogHeader>
                    </VisuallyHidden>
                    <CreateAnalisisSection title={title} descripcion={descripcion} radiografias={radiografias} onSubmitAnalisis={onSubmit}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}

type FileWithPreview = File & { preview: string }

type CreateAnalisisSectionProps = {
    title: string,
    descripcion: string,
    radiografias: (string | File)[],
    onSubmitAnalisis: (values: z.infer<typeof RadiografiaSchema>) => void,
}

const CreateAnalisisSection = ({title, descripcion, radiografias,
                                   onSubmitAnalisis = (_: z.infer<typeof RadiografiaSchema>) => {
                                   }, ...props
                               }: Readonly<CreateAnalisisSectionProps>) => {

    const analisisForm = useForm<z.infer<typeof RadiografiaSchema>>({
        resolver: zodResolver(RadiografiaSchema),
        defaultValues: {
            descripcion: descripcion,
            radiografias: radiografias.map((radiografia: (string | File)) => {
                if (typeof radiografia === 'string') {
                    return radiografia
                } else {
                    return Object.assign(radiografia, {preview: URL.createObjectURL(radiografia)})
                }
            })
        }
    })

    const [selectedRadiografia, setSelectedRadiografia] = React.useState<number | null>(() => (radiografias.length > 0) ? 0: null)

    const handleDropFiles = (files) => {
        if (files.length === 0) {
            enqueueSnackbar('Debes elegir al menos una imagen y no más de ' + MAX_PICTURES_PER_RADIOGRAFIA + ' imagenes.', {variant: 'error'})
            return
        } else if (files.length > (MAX_PICTURES_PER_RADIOGRAFIA - analisisForm.getValues().radiografias.length)) {
            enqueueSnackbar('No puedes elegir más de 5 imagenes', {variant: 'error'})
            return
        }
        const newValue: Array<FileWithPreview> = [...analisisForm.getValues().radiografias, ...files.map(file => Object.assign(file, {preview: URL.createObjectURL(file)}))]
        analisisForm.setValue('radiografias', newValue, {shouldValidate: true, shouldDirty: true, shouldTouch: true})
        setSelectedRadiografia(newValue.length - 1)
    }

    const onDeleteRadiografia = (index) => {
        const arr = [...analisisForm.getValues().radiografias]
        arr.splice(index, 1)
        const newRadiografiaValue: Array<FileWithPreview> = [...arr]
        analisisForm.setValue('radiografias', newRadiografiaValue, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
        setSelectedRadiografia((newRadiografiaValue.length > 0) ? 0 : null)
    }

    const onClickRadiografia: (number) => void = (index) => {
        setSelectedRadiografia(index)
    }

    // set values to form
    const onAcceptAnalisis = (values: z.infer<typeof RadiografiaSchema>) => {
        onSubmitAnalisis(values)
    }

    React.useEffect(() => {
        return () => analisisForm.getValues().radiografias.forEach((file: File & {
            preview: string
        }) => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <div className={'w-[1200px] h-full flex'}>
            {/*image*/}
            <div
                className={'bg-neutral-950 w-2/3 h-[700px] basis-2/3 shrink-0 grow-0 flex items-center justify-center'}>
                {
                    (selectedRadiografia !== null) ?
                        (<img className={'object-contain w-full h-[700px] flex-none'}
                              src={(typeof analisisForm.getValues().radiografias[selectedRadiografia] === 'string') ? analisisForm.getValues().radiografias[selectedRadiografia] : analisisForm.getValues().radiografias[selectedRadiografia].preview}
                              alt={''}/>)
                        : (
                            <div className={'bg-slate-200 p-6 rounded-lg flex flex-col items-center'}>
                                <Title>Aún no ha seleccionado ningún archivo</Title>
                                <DragAndDrop maxFiles={5} handleDrop={handleDropFiles} accept={radiografiaFileFormats}/>
                            </div>
                        )
                }
            </div>
            {/*description*/}
            <div className={'w-1/3 basis-1/3 h-[700px] shrink-0 flex flex-col'}>
                <div className={'basis-2/3 shrink-0 flex flex-col'}>
                    <div className={'basis-20 p-4'}>
                        <Title className={'capitalize'}>{title}</Title>
                    </div>
                    <ScrollArea className={'px-2 basis-0 shrink-0 grow'}>
                        <Form {...analisisForm}>
                            <form onSubmit={analisisForm.handleSubmit(onAcceptAnalisis)} id={'analisisForm'}>

                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'descripcion'} control={analisisForm.control}/>
                            </form>

                        </Form>


                    </ScrollArea>
                    {/*options*/}
                    <div className={'flex gap-2 basis-fit shrink-0 justify-end gap-4 p-2'}>
                        <DialogClose asChild>
                            <OutlinedButton label={'Cancelar'}/>
                        </DialogClose>
                        <button type={"submit"} form={'analisisForm'}>Guardar</button>
                    </div>

                </div>

                {/*thumbnails*/}
                <ScrollArea className={'dark bg-neutral-800 basis-1/3 shrink-0 grow-0 overflow-hidden w-full'}>
                    <div className={'relative p-4 grid grid-cols-2 h-full gap-4 auto-rows-fr auto-cols-fr'}>
                        <div className={'absolute inset-x-0 top-0 h-fit bg-neutral-900/60 p-1'}>
                            <Form {...analisisForm}>
                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'radiografias'} control={analisisForm.control}/>
                            </Form>
                        </div>

                        <div className={'flex w-full aspect-square'}>
                            <DragAndDropRadiografia maxFiles={5} handleDrop={handleDropFiles}
                                                    accept={radiografiaFileFormats}/>
                        </div>

                        {
                            analisisForm.getValues().radiografias.map((file: string | File & { preview: string }, index) => {
                                return (
                                    <div key={index}
                                         className={'group w-full aspect-square relative aspect-square overflow-hidden bg-neutral-900 rounded-lg flex cursor-pointer' + ` ${(index === selectedRadiografia) && 'outline outline-offset-2 outline-blue-500'}`}
                                         onClick={(_) => onClickRadiografia(index)}>
                                        <div
                                            className={'hidden group-hover:block absolute top-2 right-2 rounded-full bg-neutral-700/25 opacity-80 p-2 cursor-pointer'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteRadiografia(index)
                                            }}>
                                            <Icon>
                                                <Trash className={'text-red-800'}/>
                                            </Icon>
                                        </div>


                                        <img className={'object-contain w-full h-auto flex-none'}
                                             src={(typeof file === 'string')? file : file.preview} alt={''}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

const DragAndDropRadiografia = ({
                                    handleDrop = (_) => {
                                    }, maxFiles = 1, accept, ...props
                                }) => {

    const [isdragging, setDragging] = React.useState(false)

    return (
        <Dropzone accept={accept} maxFiles={maxFiles} onDrop={handleDrop} onDragEnter={() => setDragging(true)}
                  onDragLeave={() => setDragging(false)} onDropAccepted={() => setDragging(false)}
                  onDropRejected={() => setDragging(false)} {...props}>
            {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}
                     className={`select-none flex flex-col gap-2 justify-center items-center w-full border-dashed rounded-lg hover:border-gray-500 cursor-pointer ${isdragging ? "border-4 border-indigo-400 bg-indigo-100" : "border-2 border-gray-400"}`}>
                    <input {...getInputProps()} />
                    <Icon><DocumentIcon/></Icon>
                    <Text level={"title-sm"} className={"text-center"}>Arrastra archivos aquí o haz click para
                        seleccionar archivos</Text>
                </div>
            )}
        </Dropzone>
    )
}

export default AnalisisSlot
