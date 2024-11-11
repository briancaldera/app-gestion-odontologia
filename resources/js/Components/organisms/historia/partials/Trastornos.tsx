import React from "react";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {z} from "zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {useForm} from "react-hook-form";
import {
    cardiovasculares,
    endocrinos,
    gastrointestinales,
    ginecologicos,
    hematologicos,
    infectocontagiosa,
    neurologicos,
    oseos,
    respiratorios,
    type TrastornoItem,
    trastornosSchema,
    urologicos
} from "@/FormSchema/Historia/TrastornosSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";

const trastornosItems: Record<string, TrastornoItem[]> = {
    cardiovasculares,
    gastrointestinales,
    oseos,
    urologicos,
    respiratorios,
    ginecologicos,
    neurologicos,
    endocrinos,
    hematologicos,
    infectocontagiosa,
}

const Trastornos = () => {
    const {historia} = React.useContext(HistoriaEditorContext)
    const {trastornos} = historia.ant_personales!

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing

    const trastornosForm = useForm<z.infer<typeof trastornosSchema>>({
        resolver: zodResolver(trastornosSchema),
        defaultValues: {
                cardiovasculares: trastornos.cardiovasculares ?? [],
                endocrinos: trastornos.endocrinos ?? [],
                gastrointestinales: trastornos.gastrointestinales ?? [],
                ginecologicos: trastornos.ginecologicos ?? [],
                hematologicos: trastornos.hematologicos ?? [],
                infectocontagiosa: trastornos.infectocontagiosa ?? [],
                neurologicos: trastornos.neurologicos ?? [],
                oseos: trastornos.oseos ?? [],
                respiratorios: trastornos.respiratorios ?? [],
                urologicos: trastornos.urologicos ?? [],
                descripcion: trastornos.descripcion ?? '',
        },
        disabled: isDisabled
    })

    const handleSubmit = (values: z.infer<typeof trastornosSchema>) => {

        const endpoint = route('historias.antpersonales.update', {
            historia: historia.id
        })

        const body = {
            trastornos: values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(trastornosForm, {...errors.trastornos})
            },
            onSuccess: _page => {
                trastornosForm.reset(values)
            }
        })
    }
    return (
        <div>
            <Form {...trastornosForm}>
                <form onSubmit={trastornosForm.handleSubmit(handleSubmit)} className={''}>
                    <section className={'my-6'}>
                        <header>
                            <Title level={'title-md'}>Trastornos</Title>
                        </header>

                        <div
                            className={'grid grid-cols-1 sm:grid-cols-2 gap-6 border rounded-2xl border-slate-300 p-3'}>

                            {
                                Object.keys(trastornosSchema.omit({descripcion: true}).shape).map((key: string) => (
                                    <div id={key}
                                         className={'grid grid-cols-1 sm:grid-cols-2 gap-2 border rounded-lg p-6 content-start'}
                                         key={key}>
                                        {/*<div className={'col-span-full capitalize'}>*/}
                                        {/*    <Label htmlFor={key}>{key}</Label>*/}
                                        {/*</div>*/}


                                        <FormField
                                            control={trastornosForm.control}
                                            name={key} render={() => (
                                            <FormItem className={'col-span-full'}>
                                                <div className="mb-4">
                                                    <FormLabel className="text-base capitalize">{key}</FormLabel>
                                                    <FormDescription>
                                                    </FormDescription>
                                                </div>
                                                <div
                                                    className={'grid grid-cols-1 sm:grid-cols-2 gap-2 p-6 content-start'}>

                                                    {trastornosItems[key].map((item) => (
                                                        <FormField
                                                            key={item.id}
                                                            control={trastornosForm.control}
                                                            name={key}
                                                            render={({field}) => {
                                                                return (
                                                                    <FormItem
                                                                        key={item.id}
                                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(item.id)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                        ? field.onChange([...field.value, item.id])
                                                                                        : field.onChange(
                                                                                            field.value?.filter(
                                                                                                (value) => value !== item.id
                                                                                            )
                                                                                        )
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal">
                                                                            {item.label}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    ))}
                                                </div>

                                                <FormMessage/>
                                            </FormItem>

                                        )}/>

                                    </div>))
                            }

                            <div className='col-span-full border rounded-lg p-6'>
                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Descripción</FormLabel>
                                        <FormDescription>En caso de ser positivo alguna de las anteriores, especificar el tiempo, si ha sido controlado, si ha tenido complicaciones,
                                            si toma alguna medicación, etc.</FormDescription>
                                        <FormControl>
                                            <Textarea {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'descripcion'} control={trastornosForm.control}/>
                            </div>
                        </div>
                    </section>
                    <div className={'flex justify-end'}>
                        <Button type='submit'
                                disabled={trastornosForm.formState.disabled || !trastornosForm.formState.isDirty}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default Trastornos
