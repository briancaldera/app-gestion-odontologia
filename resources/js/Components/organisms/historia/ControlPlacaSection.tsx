import {calculatePlaquePercentage, DentalPlaqueChartModel, useDentalPlaqueChart} from "@/src/DentalPlaqueChartModel.ts";
import DentalPlaqueChart from "@/Components/controlplaca/DentalPlaqueChart.tsx";
import Title from "@/Components/atoms/Title";
import {Text} from "@/Components/atoms/Text";
import {route} from "ziggy-js";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import React from "react";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {formatDate} from "date-fns";
import CorrectionsBlock from "@/src/corrections/CorrectionsBlock.tsx";
import {mapServerErrorsToFields, usePermission} from "@/src/Utils/Utils.ts";
import {Link, router} from "@inertiajs/react";
import {CircleCheckBig, Plus} from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/shadcn/ui/dialog.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Input} from "@/shadcn/ui/input.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";

const ControlPlacaSection = () => {

    const can = usePermission()
    const {
        historia,
        disabled,
        homework,
        canCreateCorrections,
        correctionsModel
    } = React.useContext(HistoriaEditorContext)
    const {historia_periodontal} = historia.historia_odontologica!
    const {control_placa} = historia_periodontal

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled = disabled

    const handleSubmit = (model: DentalPlaqueChartModel) => {


        const endpoint = route('historias.odontologica.periodontal.controlplaca.store', {
            historia: historia.id
        })

        const body = {
            control_placa: model,
        }

        router.post(endpoint, body, {
            onSuccess: page => {
                setNewControl(false)
                router.reload()
            },
            onError: errors => {
                console.log(errors)
            }
        })
    }

    const [newControl, setNewControl] = React.useState<boolean>(false)

    return (
        <ScrollArea className={'bg-white w-full p-6 h-[83vh]'}>

            <Title level={'h4'}>Control de placa de dental</Title>

            <CorrectionsBlock model={correctionsModel} name={'control_placa'}
                              canCreateCorrections={canCreateCorrections}>
                <div className={'flex flex-col gap-y-2'}>
                    {
                        control_placa.length > 0 ? (
                            control_placa.map((item) =>
                                <div className={'border p-6 rounded-lg'} key={item.fecha}>
                                    <ControlPlacaDiagrama model={item.modelo} date={item.fecha} key={item.fecha}
                                                          onClick={() => {
                                                          }} disabled={true}/>

                                    <div className={'col-start-1 col-span-1 border grid grid-col-1 sm:grid-cols-3'}>

                                        <div className='border p-6 flex items-center gap-x-4'>
                                            <Title>Fecha:</Title>
                                            <Text>{formatDate(item.fecha, 'P')}</Text>
                                        </div>
                                        <div className='border p-6 flex items-center gap-x-4'>
                                            <Title>Porcentaje:</Title>
                                            {
                                                (item.approver_id) && (
                                                    <div className={'flex-1 flex justify-center items-center'}>
                                                        <Text level={'h1'}>
                                                            {(!Number.isNaN(calculatePlaquePercentage(item.modelo)) ? calculatePlaquePercentage(item.modelo) : 0).toFixed(2)}
                                                        </Text>
                                                        <Text>%</Text>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className='border p-6 flex items-center gap-x-4'>
                                            <Title>Firma</Title>
                                            <div className='flex-1 flex justify-center'>


                                                {
                                                    (can('historias-approve-plaque-control') && !!item.id) ? (
                                                        <Button asChild>
                                                            <Link method='post'
                                                                  href={route('historias.odontologica.periodontal.controlplaca.approve', {
                                                                      historia: historia.id,
                                                                      id: item.id
                                                                  })} as='button' type='button'><CircleCheckBig
                                                                className='mr-2'/>Aprobar</Link>
                                                        </Button>
                                                    ) : (!!item.approver_id) && (
                                                        <div>
                                                            {item.approver_id}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ) : (
                            !newControl && (
                                <div className={'flex flex-col justify-center items-center p-6 gap-y-4'}>
                                    <Text>No existe ningún control de placa</Text>
                                    {/*<Button disabled={disabled} onClick={() => setNewControl(true)}>Crear control de placa</Button>*/}
                                </div>
                            )
                        )
                    }

                </div>
            </CorrectionsBlock>

            <div className={'mt-2 flex justify-end py-3'}>
                {
                    !newControl ? (
                        <Button variant='outline' disabled={disabled} onClick={() => setNewControl(true)}><Plus className={'mr-2'}/>Crear control de placa</Button>
                    ) : (
                        <div className={'border p-6 rounded-lg'}>
                            <ControlPlacaDiagrama onClick={(model) => handleSubmit(model)}/>
                        </div>
                    )
                }
            </div>

            <div className='flex flex-col items-center gap-y-2'>
                <Title>De alta periodontal</Title>
                <Text>Nombre del tutor: {historia_periodontal.approver_id}</Text>
                <div className={'flex gap-x-8'}>
                    <Text>Firma del tutor: {historia_periodontal.approval}</Text>
                    <Text>Nota: {historia_periodontal.nota}</Text>
                </div>
                {
                    (can('historias-approve-periodontal-discharge') && !historia_periodontal.approver_id) && (
                        <div>
                            <ApprovePeriodontalDischargeDialog/>
                        </div>
                    )
                }
            </div>





        </ScrollArea>
    )
}

const approvePeriodontalDischargeSchema = z.object({
    nota: z.string().max(30)
})

const ApprovePeriodontalDischargeDialog = () => {

    const {historia} = React.useContext(HistoriaEditorContext)

    const form = useForm<z.infer<typeof approvePeriodontalDischargeSchema>>({
        resolver: zodResolver(approvePeriodontalDischargeSchema),
        defaultValues: {
            nota: ''
        }
    })
    const handleSubmit = (values: z.infer<typeof approvePeriodontalDischargeSchema>) => {
        const endpoint = route('historias.odontologica.periodontal.approve', { historia: historia.id})

        const body = {
            ...values
        }

        router.post(endpoint, body, {
            onError: errors => {
                mapServerErrorsToFields(form, errors)
            },
            onSuccess: page => {}
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <CircleCheckBig className='mr-2'/>
                    Aprobar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Aprobar de alta periodontal</DialogTitle>
                <DialogDescription>
                    Está a punto de aprobar el alta periodontal de esta historia.
                </DialogDescription>
                <div>
                    <Form {...form}>
                        <form id='approvePeriodontalDischargeForm' onSubmit={form.handleSubmit(handleSubmit)}>

                            <FormField render={({field}) => (
                                <FormItem className='w-20'>
                                    <FormLabel>Nota</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                    <FormDescription></FormDescription>
                                </FormItem>
                            )} name={'nota'} control={form.control}/>
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button type="button" variant="secondary">
                            Cancelar
                        </Button>
                        <Button type='submit' form='approvePeriodontalDischargeForm'>
                            Aprobar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const countPresentDentalPieces = (model: DentalPlaqueChartModel) => {
    return model.quadrant_1.filter(piece => piece.present).length +
        model.quadrant_2.filter(piece => piece.present).length +
        model.quadrant_3.filter(piece => piece.present).length +
        model.quadrant_4.filter(piece => piece.present).length
}


const countMarkedSurfaces = (model: DentalPlaqueChartModel) => {
    return model.quadrant_1.filter(piece => piece.present).reduce((previousValue, currentValue) => {
            if (currentValue.surfaces.front) ++previousValue
            if (currentValue.surfaces.back) ++previousValue
            if (currentValue.surfaces.right) ++previousValue
            if (currentValue.surfaces.left) ++previousValue
            return previousValue
        }, 0) +
        model.quadrant_2.filter(piece => piece.present).reduce((previousValue, currentValue) => {
            if (currentValue.surfaces.front) ++previousValue
            if (currentValue.surfaces.back) ++previousValue
            if (currentValue.surfaces.right) ++previousValue
            if (currentValue.surfaces.left) ++previousValue
            return previousValue
        }, 0) +
        model.quadrant_3.filter(piece => piece.present).reduce((previousValue, currentValue) => {
            if (currentValue.surfaces.front) ++previousValue
            if (currentValue.surfaces.back) ++previousValue
            if (currentValue.surfaces.right) ++previousValue
            if (currentValue.surfaces.left) ++previousValue
            return previousValue
        }, 0) +
        model.quadrant_4.filter(piece => piece.present).reduce((previousValue, currentValue) => {
            if (currentValue.surfaces.front) ++previousValue
            if (currentValue.surfaces.back) ++previousValue
            if (currentValue.surfaces.right) ++previousValue
            if (currentValue.surfaces.left) ++previousValue
            return previousValue
        }, 0)
}

type ControlPlacaDiagramaProps = {
    model?: DentalPlaqueChartModel,
    onClick: (model: DentalPlaqueChartModel) => void
    disabled?: boolean
}

const ControlPlacaDiagrama = ({
                                  model, onClick = () => {
    }, disabled = false
                              }: ControlPlacaDiagramaProps) => {

    const chart = useDentalPlaqueChart({model: model})

    const dentalPieces: number = countPresentDentalPieces(chart.getModel())

    const presentSurfacesCount: number = dentalPieces * 4

    const markedSurfacesCount: number = countMarkedSurfaces(chart.getModel())

    const plaquePercentage: number = markedSurfacesCount / presentSurfacesCount * 100

    return (
        <div>

            <div className={'grid grid-cols-1 sm:grid-cols-5 border'}>

                <div className={'col-span-full'}>
                    <DentalPlaqueChart chart={chart} disabled={disabled}/>
                </div>

                <div className={'col-span-1 flex items-center p-4 gap-x-2 border'}>
                    <Text className={'text-center'}>Número de piezas dentales presentes</Text>
                    <Text className={''} level={'h1'} component={'p'}>{dentalPieces}</Text>
                </div>

                <div className={'col-span-1 p-4 flex justify-center items-center gap-x-2 border'}>
                    <Text className={'text-center'}>Número de superficies (Número de diente x 4)</Text>
                    <Text className={''} level={'h1'} component={'p'}>{presentSurfacesCount}</Text>
                </div>

                <div className={'sm:col-span-2 p-4 flex gap-2 justify-center items-center border'}>
                    <Text>% Placa Dental</Text>
                    <div>
                        <Text className={'text-center'}>
                            Número de caras coloreadas
                        </Text>
                        <hr className={'border-black'}/>
                        <Text className={'text-center'}>
                            Número de superficies
                        </Text>
                    </div>
                    <Text>x 100</Text>

                </div>

                <div className={'col-span-1 p-4 flex gap-2 justify-center items-center border'}>
                    <Text>%</Text>
                    <Text level={'h1'}>
                        {(!Number.isNaN(plaquePercentage) ? plaquePercentage : 0).toFixed(2)}
                    </Text>
                </div>
            </div>


            <div className='p-2 justify-end'>
                {
                    !disabled && <Button onClick={() => onClick(chart.getModel())} type='button'>Guardar</Button>
                }
            </div>
        </div>
    )
}

export default ControlPlacaSection
