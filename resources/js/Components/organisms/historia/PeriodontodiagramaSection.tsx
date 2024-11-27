import {UseFormReturn} from "react-hook-form";
import {z} from 'zod'
import PeriodontodiagramaSchema from "@/FormSchema/Historia/PeriodontodiagramaSchema.ts";
import Title from "@/Components/atoms/Title";
import React from "react";
import {useRoute} from "ziggy-js";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import Surface from "@/Components/atoms/Surface";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/shadcn/ui/form.tsx";
import Image from "@/Components/atoms/Image.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Loader2} from "lucide-react";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import DragAndDrop from "@/Components/molecules/DragAndDrop";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import CorrectionsBlock from "@/src/corrections/CorrectionsBlock.tsx";

type PeriodontodiagramaSection = {
    periodontograma: string | null
    form: UseFormReturn<z.infer<typeof PeriodontodiagramaSchema>>
}

const PeriodontodiagramaSection = ({periodontograma, form}: PeriodontodiagramaSection) => {

    const {historia, disabled, correctionsModel, canCreateCorrections} = React.useContext(HistoriaEditorContext)

    const route = useRoute()

    const {router, isProcessing} = useInertiaSubmit()

    const handleSubmit = (values: z.infer<typeof PeriodontodiagramaSchema>) => {

        const endpoint = route('historias.odontologica.periodontodiagramas.update', {
            historia: values.historia_id
        })

        const data = {
            _method: 'patch',
            ...values
        }

        router.post(endpoint, {...data}, {
            onError: errors => mapServerErrorsToFields(form, errors),
            onSuccess: _page => {
                form.reset()
                router.reload()
            }
        })
    }

    const handleDrop = (files: File[]) => {
        if (files.length === 0) return

        const [file] = files

        form.setValue('periodontodiagrama', file, {shouldDirty: true, shouldTouch: true, shouldValidate: true})

    }

    return (
        <div className={'bg-white w-full p-6 min-h-screen'}>
            <Title level={'title-lg'}>Periodontodiagrama</Title>

            <CorrectionsBlock model={correctionsModel} name={'periodontodiagrama'}
                              canCreateCorrections={canCreateCorrections}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className={''}>


                        <div>


                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <div className={'flex justify-center bg-neutral-950 min-h-[900px]'}>
                                            <div className={'w-4/5'}>
                                                <Image src={field.value ?? periodontograma}
                                                       className={'object-contain w-full h-auto'}/>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'periodontodiagrama'} control={form.control}/>

                        </div>

                        {
                            !disabled && (
                                <DragAndDrop maxFiles={1} accept={ACCEPTED_PICTURE_MIME} handleDrop={handleDrop}
                                             disabled={disabled}/>
                            )
                        }

                        <div className={'flex justify-end'}>
                            <Button disabled={disabled || !form.formState.isDirty}>
                                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}Guardar
                            </Button>
                        </div>


                    </form>
                </Form>
            </CorrectionsBlock>
        </div>
    )
}

const ACCEPTED_PICTURE_MIME = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
}

export default PeriodontodiagramaSection
