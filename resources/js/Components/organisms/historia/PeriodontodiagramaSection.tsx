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

type PeriodontodiagramaSection = {
    periodontograma: string | null
    form: UseFormReturn<z.infer<typeof PeriodontodiagramaSchema>>
}

const PeriodontodiagramaSection = ({periodontograma, form}: PeriodontodiagramaSection) => {

    const route = useRoute()

    const {router, isProcessing} = useInertiaSubmit()

    const handleSubmit = (values: z.infer<typeof PeriodontodiagramaSchema>) => {
        console.log(values)

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
        <Surface className={'p-6 h-full'}>
            <Title level={'title-lg'}>Periodontodiagrama</Title>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={''}>


                    <div>



                        <FormField render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <div className={'flex justify-center bg-neutral-950 min-h-[900px]'}>
                                        <div className={'w-4/5'}>
                                            <Image src={field.value ?? periodontograma} className={'object-contain w-full h-auto'}/>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'periodontodiagrama'} control={form.control}/>

                    </div>

                    <DragAndDrop maxFiles={1} accept={ACCEPTED_PICTURE_MIME} handleDrop={handleDrop}/>

                    <div className={'flex justify-end'}>
                        <Button disabled={isProcessing || !form.formState.isDirty || form.formState.disabled}>
                            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Guardar
                        </Button>
                    </div>



                </form>
            </Form>
        </Surface>
    )
}

const ACCEPTED_PICTURE_MIME = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
}

export default PeriodontodiagramaSection
