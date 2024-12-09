import Title from "@/Components/atoms/Title";
import React, {useContext} from "react";
import {z} from "zod";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {route} from "ziggy-js";
import {toast} from "sonner";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import Dropzone from "react-dropzone";
import {Button} from "@/shadcn/ui/button.tsx";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import {Text} from "@/Components/atoms/Text";
import {Upload} from "lucide-react";
import Icon from "@/Components/atoms/Icon.tsx";

const ConsetimientoMedico = () => {

    const {historia, disabled} = useContext(HistoriaEditorContext)

    const {router} = useInertiaSubmit()
    const hasConsentimiento = !!historia.historia_odontologica?.consentimiento
    const isDisabled = hasConsentimiento || disabled

    const consentimientoForm = useForm<z.infer<typeof consentimientoSchema>>({
        resolver: zodResolver(consentimientoSchema),
        defaultValues: {
            consentimiento: historia.historia_odontologica?.consentimiento ?? null
        },
        disabled: isDisabled,
    })

    const handleSubmit = (values: z.infer<typeof consentimientoSchema>) => {
        const endpoint = route('historias.odontologica.consentimiento.update', {
            historia: historia?.id
        })

        const body = {
            _method: 'patch',
            ...values
        }

        router.post(endpoint, body, {
            onError: errors => {
                toast.error('Ocurrió un error al intentar subir el archivo')
                mapServerErrorsToFields(consentimientoForm, errors)
            },
            onSuccess: page => {
                toast.success('Subido')
            }
        })
    }

    const handlePictureDrop = ([file]) => {
        file.preview = URL.createObjectURL(file)

        consentimientoForm.setValue('consentimiento', file, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
    }

    return (
        <section className={'mt-6'}>
            <header className={'mb-1.5 space-y-1'}>
                <Title level={'title-md'}>Consentimiento informado</Title>
                <Text>Antes de realizar el examen físico, debes obtener consentimiento de tu paciente. Sube un archivo con el nombre, apellido, cédula y firma de tu paciente consintiendo
                la información suministrada. Luego podrás continuar editando la historia. <span className='text-rose-500 font-bold'>Sube el archivo correcto. Una vez guardado, no podrás cambiar ni subir otro archivo.</span></Text>
            </header>
            <div>
                <Form {...consentimientoForm}>
                    <form id='consentimientoForm' onSubmit={consentimientoForm.handleSubmit(handleSubmit)}>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Dropzone onDrop={handlePictureDrop} accept={pictureFileFormats} maxFiles={1} disabled={consentimientoForm.formState.disabled}>
                                        {({getRootProps, getInputProps}) => (
                                            <>
                                                <input {...getInputProps()} />
                                                {
                                                    (consentimientoForm.getValues().consentimiento === null) ?
                                                        (<div className={'relative'}>
                                                            <img
                                                                className={'w-full aspect-[3/4] object-contain border border-slate-200 rounded-lg'}
                                                                src={(consentimientoForm.getValues().consentimiento && 'preview' in consentimientoForm.getValues().consentimiento) ? consentimientoForm.getValues().consentimiento.preview : null} {...getRootProps()}/>
                                                                <Icon className={'top-1/2 left-1/2 absolute'}>
                                                                    <Upload/>
                                                                </Icon>
                                                        </div>
                                                        ) : (

                                                            <img
                                                                className={'w-full aspect-[3/4] object-contain  border border-slate-200 rounded-lg'}
                                                                src={consentimientoForm.getValues().consentimiento} {...getRootProps()}/>
                                                        )
                                                }

                                            </>
                                        )}
                                    </Dropzone>
                                </FormControl>
                                <FormMessage/>
                                <FormDescription>
                                </FormDescription>
                            </FormItem>
                        )} name={'consentimiento'} control={consentimientoForm.control}/>
                    </form>
                </Form>
                <div className={'flex justify-end'}>
                    {
                        !hasConsentimiento &&
                    <Button form='consentimientoForm' type='submit' disabled={consentimientoForm.formState.disabled || !consentimientoForm.formState.isDirty}>Guardar</Button>
                    }
                </div>
            </div>
        </section>
    )
}

const pictureFileFormats = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
}

const MAX_PICTURE_SIZE: number = 10 * 1000 * 1000 // 10 MB
const MIN_PICTURE_SIZE: number = 1000 // 1 KB
const ACCEPTED_PICTURE_MIME: readonly string[] = ['image/jpeg', 'image/jpg', 'image/png']

const consentimientoSchema = z.object({
    consentimiento: z
        .any()
        .refine((data: any) => data instanceof File)
        .refine((file: File) => ACCEPTED_PICTURE_MIME.includes(file?.type), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
        .refine((file: File) => file.size >= MIN_PICTURE_SIZE, {message: 'Archivo muy pequeño'})
        .refine((file: File) => file?.size <= MAX_PICTURE_SIZE, {message: 'Archivo muy grande'})
})

export default ConsetimientoMedico
