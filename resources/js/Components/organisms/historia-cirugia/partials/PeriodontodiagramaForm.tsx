import React from "react";
import {HistoriaCirugiaEditorContext} from "@/Components/organisms/historia-cirugia/HistoriaCirugiaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm} from "react-hook-form";
import {undefined, z} from "zod";
import {periodontodiagramaSchema} from "@/FormSchema/Odontologia/Cirugia/HistoriaCirugiaSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import Title from "@/Components/atoms/Title";
import {Text} from "@/Components/atoms/Text";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import Dropzone from "react-dropzone";
import {pictureFileFormats} from "@/Components/molecules/ProfilePicturePicker.tsx";
import {Button} from "@/shadcn/ui/button.tsx";

const PeriodontodiagramaForm = () => {
    const {historia} = React.useContext(HistoriaCirugiaEditorContext)

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing

    const {periodontodiagrama} = historia!

    const sectionForm = useForm<z.infer<typeof sectionSchema>>({
        resolver: zodResolver(sectionSchema),
        defaultValues: {
            periodontodiagrama: null
        },
        disabled: isDisabled
    })

    const handleSubmit = (values: z.infer<typeof sectionSchema>) => {

        const endpoint = route('cirugia.historias.update', {
            historia: historia!.id
        })

        const body = {
            _method: 'patch',
            ...values
        }

        router.post(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(sectionForm, errors)
            }, onSuccess: _page => {
                sectionForm.reset(values)
            }
        })
    }

    const handlePictureDrop = ([file]) => {
        file.preview = URL.createObjectURL(file)

        sectionForm.setValue('periodontodiagrama', file, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
    }

    return (
        <section className={'mt-6'}>
            <header className={'mb-1.5 space-y-1'}>
                <Title level={'title-md'}>Periodontodiagrama</Title>
                <Text>Sube un archivo con el nombre, apellido, cédula y firma de tu paciente consintiendo
                    la información suministrada. Luego podrás continuar editando la historia. <span
                        className='text-rose-500 font-bold'>Sube el archivo correcto. Una vez guardado, no podrás cambiar ni subir otro archivo.</span></Text>
            </header>
            <div>
                <Form {...sectionForm}>
                    <form id='sectionForm' onSubmit={sectionForm.handleSubmit(handleSubmit)}>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Dropzone onDrop={handlePictureDrop} accept={pictureFileFormats} maxFiles={1}
                                              disabled={sectionForm.formState.disabled}>
                                        {({getRootProps, getInputProps}) => (
                                            <>
                                                <input {...getInputProps()} />
                                                <PeriodontodiagramaImage server={periodontodiagrama}
                                                                     form={sectionForm.getValues().periodontodiagrama} {...getRootProps()}/>

                                            </>
                                        )}
                                    </Dropzone>
                                </FormControl>
                                <FormMessage/>
                                <FormDescription>
                                </FormDescription>
                            </FormItem>
                        )} name={'consentimiento'} control={sectionForm.control}/>
                        <div className={'flex justify-end'}>
                            {
                                <Button type='submit'
                                        disabled={sectionForm.formState.disabled || !sectionForm.formState.isDirty}>Guardar</Button>
                            }
                        </div>
                    </form>
                </Form>
            </div>
        </section>
    )
}

const periodontodiagramaImageStyle: string = 'w-full aspect-[3/4] object-contain border border-slate-200 rounded-lg bg-slate-100'

const PeriodontodiagramaImage = ({server, form, ...props}: { server: string | null, form: File | null }) => {

    if (server === null && form === null) {
        return (
            <div {...props}>No ha subido ningun formato aun</div>
        )
    } else if (server === null && form instanceof File && 'preview' in form) {
        return (
            <>
                <Text className='text-rose-500'>Existen cambios por guardar</Text>
                <img alt='Image del consentimiento'
                     className={periodontodiagramaImageStyle}
                     src={form.preview as string} {...props}/>
            </>
        )
    } else if (typeof server === 'string' && form === null) {
        return (
            <img alt='Image del periodontodiagrama'
                 className={periodontodiagramaImageStyle}
                 src={server} {...props}/>
        )
    } else if (typeof server === 'string' && form instanceof File && 'preview' in form) {
        return (
            <>
                <Text className='text-rose-500'>Existen cambios por guardar</Text>
                <img alt='Image del periodontodiagrama'
                     className={periodontodiagramaImageStyle}
                     src={form.preview as string} {...props}/>
            </>
        )
    }
}

const sectionSchema = z.object({
    periodontodiagrama: periodontodiagramaSchema
})

export default PeriodontodiagramaForm
