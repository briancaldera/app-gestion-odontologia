import {z} from "zod"
import {UseFormReturn} from 'react-hook-form'
import HistoriaOdontologicaSchema from '@/FormSchema/Historia/HistoriaOdontologicaSchema'
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import {Textarea} from '@/shadcn/ui/textarea'
import {Checkbox} from "@/shadcn/ui/checkbox"
import EstudioModelosSchema, {EstudioModelosDefaults} from "@/FormSchema/Historia/EstudioModelosSchema";
import {Button} from "@/shadcn/ui/button";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {useRoute} from "ziggy-js";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import MaxSupInfOclu from "@/Components/organisms/historia/partials/MaxSupInfOclu.tsx";


type EstudioModelosSectionProps = {
    form: UseFormReturn<z.infer<typeof EstudioModelosSchema>>
}

const EstudioModelosSection = ({form}: EstudioModelosSectionProps) => {

    const {isProcessing, router}: ReturnType<typeof useInertiaSubmit> = useInertiaSubmit()
    const route = useRoute()

    const onHandleSubmit = (values) => {

        const endpoint: string = route('historias.odontologica.modelos.update', {
            historia: values.historia_id
        })

        router.patch(endpoint, values, {
            preserveScroll: true,
            onError: errors => mapServerErrorsToFields(form, errors),
            onSuccess: _page => {
                form.reset(values)
            }
        })
    }

    return (
        <Surface className={'w-full px-6 min-h-screen'}>
            <Title level={'title-lg'}>Estudio de Modelos</Title>

            <MaxSupInfOclu/>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onHandleSubmit)}>

                    <section className={'my-6 relative'}>

                        <section>
                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>Examenes Complementarios</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'estudio_modelos.examenes_comp'} control={form.control}/>
                        </section>


                        <section className={'space-y-2 mt-5'}>
                            <header>
                                <Title>Interconsultas</Title>
                            </header>


                            <div className={'flex justify-evenly flex-wrap gap-5'}>
                                {
                                    Object.keys(EstudioModelosSchema.shape.estudio_modelos.shape.interconsultas.shape).filter(item => item !== 'descripcion').map(item => (
                                        <FormField key={item} render={({field}) => (
                                            <FormItem className={'shrink-0'}>
                                                <div className={'flex items-center gap-1'}>
                                                    <FormControl>
                                                        <Checkbox checked={field.value} disabled={field.disabled}
                                                                  onCheckedChange={field.onChange}/>
                                                    </FormControl>
                                                    <FormLabel>{item}</FormLabel>
                                                </div>
                                            </FormItem>
                                        )} name={`estudio_modelos.interconsultas.${item}`} control={form.control}/>
                                    ))
                                }

                            </div>

                            <div>
                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'estudio_modelos.interconsultas.descripcion'} control={form.control}/>
                            </div>
                        </section>

                        <section>

                            <FormField render={({field}) => (
                                <FormItem className={'mt-5'}>
                                    <FormLabel><Title>Diagnóstico</Title></FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'estudio_modelos.diagnostico'} control={form.control}/>

                        </section>

                        <section>

                            <FormField render={({field}) => (
                                <FormItem className={'mt-5'}>
                                    <FormLabel><Title>Pronóstico (General/Específicos)</Title></FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'estudio_modelos.pronostico'} control={form.control}/>

                        </section>

                    </section>
                    <div className={'flex justify-end'}>
                        <Button type={'submit'} disabled={isProcessing || !form.formState.isDirty || form.formState.disabled}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </Surface>
    )
}

export default EstudioModelosSection
