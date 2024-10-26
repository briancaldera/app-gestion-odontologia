import React from "react";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {estudioModelosSchema} from "@/FormSchema/Historia/EstudioModelosSchema.ts";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Button} from "@/shadcn/ui/button.tsx";

const MaxSupInfOclu = () => {
    const {historia} = React.useContext(HistoriaEditorContext)
    const {maxilar_sup, maxilar_inf, modelos_oclusion} = historia.historia_odontologica?.estudio_modelos!

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing

    const maxSupInfOcluForm = useForm<z.infer<typeof maxSupInfOcluSchema>>({
        resolver: zodResolver(maxSupInfOcluSchema),
        defaultValues: {
            maxilar_sup: {
                anomalia: maxilar_sup.anomalia ?? "",
                diastemas: maxilar_sup.diastemas ?? "",
                dientes_ausentes: maxilar_sup.dientes_ausentes ?? "",
                facetas_desgaste: maxilar_sup.facetas_desgaste ?? "",
                forma_arco: maxilar_sup.forma_arco ?? "",
                maloclusion: maxilar_sup.maloclusion ?? "",
                paladar: maxilar_sup.paladar ?? "",
                simetria_arco: maxilar_sup.simetria_arco ?? "",
                tipo_arco: maxilar_sup.tipo_arco ?? ""
            },
            maxilar_inf: {
                anomalia: maxilar_inf.anomalia ?? "",
                diastemas: maxilar_inf.diastemas ?? "",
                dientes_ausentes: maxilar_inf.dientes_ausentes ?? "",
                facetas_desgaste: maxilar_inf.facetas_desgaste ?? "",
                forma_arco: maxilar_inf.forma_arco ?? "",
                maloclusion: maxilar_inf.maloclusion ?? "",
                piso_boca: maxilar_inf.piso_boca ?? "",
                simetria_arco: maxilar_inf.simetria_arco ?? "",
                tipo_arco: maxilar_inf.tipo_arco ?? ""
            },
            modelos_oclusion: {
                curva_compensacion: modelos_oclusion.curva_compensacion ?? "",
                linea_media: modelos_oclusion.linea_media ?? "",
                mordida_anterior: modelos_oclusion.mordida_anterior ?? "",
                mordida_posterior: modelos_oclusion.mordida_posterior ?? "",
                plano_oclusal: modelos_oclusion.plano_oclusal ?? "",
                relacion_canina: modelos_oclusion.relacion_canina ?? "",
                relacion_molar: modelos_oclusion.relacion_molar ?? "",
                sobrepase: modelos_oclusion.sobrepase ?? "",
                sobresalte: modelos_oclusion.sobresalte ?? ""
            }
        },
        disabled: isDisabled
    })

    const handleSubmit = (values: z.infer<typeof maxSupInfOcluForm>) => {

        const endpoint = route('historias.odontologica.modelos.update', {
            historia: historia.id
        })

        const body = {
            ...values
        }

        router.patch(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(maxSupInfOcluForm, errors)
            },
            onSuccess: _page => {
                maxSupInfOcluForm.reset(values)
            }
        })
    }

    return (
        <div>
            <Title level={'title-lg'}>Estudio de Modelos</Title>

            <Form {...maxSupInfOcluForm}>
                <form onSubmit={maxSupInfOcluForm.handleSubmit(handleSubmit)}>

                    <div className={'grid grid-flow-col grid-cols-3 grid-rows-[20pt_repeat(9,_1fr)] gap-y-.5 gap-x-4'}>

                        <div className={'grid row-span-full grid-rows-subgrid border rounded-lg p-2'}>

                            <Title>Maxilar Superior</Title>

                            {
                                Object.keys(estudioModelosSchema.shape.maxilar_sup.shape).map(item => {
                                    return (
                                        <FormField key={item} render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{estudioModelosSchema.shape.maxilar_sup.shape[item].description}</FormLabel>
                                                <FormControl>
                                                    <Textarea className={'resize-none'} {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={`maxilar_sup.${item}`} control={maxSupInfOcluForm.control}/>
                                    )
                                })
                            }
                        </div>

                        <div className={'grid row-span-full grid-rows-subgrid border rounded-lg p-2'}>

                            <Title className={'h-20'}>Maxilar Inferior</Title>

                            {
                                Object.keys(estudioModelosSchema.shape.maxilar_inf.shape).map(item => {
                                    return (
                                        <FormField key={item} render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{estudioModelosSchema.shape.maxilar_inf.shape[item].description}</FormLabel>
                                                <FormControl>
                                                    <Textarea className={'resize-none'} {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={`maxilar_inf.${item}`} control={maxSupInfOcluForm.control}/>
                                    )
                                })
                            }
                        </div>

                        <div className={'grid row-span-full grid-rows-subgrid border rounded-lg p-2'}>

                            <Title className={'h-20'}>Modelos de Oclusión</Title>

                            {
                                Object.keys(estudioModelosSchema.shape.modelos_oclusion.shape).map(item => {
                                    return (
                                        <FormField key={item} render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{estudioModelosSchema.shape.modelos_oclusion.shape[item].description}</FormLabel>
                                                <FormControl>
                                                    <Textarea className={'resize-none'} {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name={`modelos_oclusion.${item}`} control={maxSupInfOcluForm.control}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={'flex justify-end py-3'}>
                        <Button type='submit'
                                disabled={maxSupInfOcluForm.formState.disabled || !maxSupInfOcluForm.formState.isDirty}>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

const maxSupInfOcluSchema = estudioModelosSchema.pick({maxilar_sup: true, maxilar_inf: true, modelos_oclusion: true})

export default MaxSupInfOclu
