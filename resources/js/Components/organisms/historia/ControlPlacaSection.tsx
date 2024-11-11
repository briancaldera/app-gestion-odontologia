import {DentalPlaqueChartModel, useDentalPlaqueChart} from "@/src/DentalPlaqueChartModel.ts";
import DentalPlaqueChart from "@/Components/controlplaca/DentalPlaqueChart.tsx";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Text} from "@/Components/atoms/Text";
import {route} from "ziggy-js";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import React from "react";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {formatDate} from "date-fns";
import CorrectionsBlock from "@/src/corrections/CorrectionsBlock.tsx";

const ControlPlacaSection = () => {

    const {historia, disabled, homework, canCreateCorrections, correctionsModel} = React.useContext(HistoriaEditorContext)
    const {control_placa} = historia.historia_odontologica!.historia_periodontal

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
                router.reload()
            },
            onError: errors => {
                console.log(errors)
            }
        })
    }

    const [newControl, setNewControl] = React.useState<boolean>(false)

    return (
        <Surface className={'p-6'}>

            <Title level={'h4'}>Control de placa de dental</Title>

            <CorrectionsBlock model={correctionsModel} name={'control_placa'} canCreateCorrections={canCreateCorrections}>
            <div className={'flex flex-col gap-y-2'}>
                {
                    control_placa.length > 0 ? (
                        control_placa.map((item) =>
                            <div className={'border p-6 rounded-lg'} key={item.fecha}>
                                <ControlPlacaDiagrama model={item.modelo} date={item.fecha} key={item.fecha}
                                                      onClick={() => {
                                                      }} disabled={true}/>

                                <div className={'col-start-1 col-span-1 border p-6'}>

                                    <Text className={'font-bold'}>Fecha: {formatDate(item.fecha, 'P')}</Text>
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

            <div className={'mt-2 flex justify-end'}>
                {
                    !newControl ? (
                        <Button disabled={disabled} onClick={() => setNewControl(true)}>Crear control de placa</Button>
                    ) : (
                        <ControlPlacaDiagrama onClick={(model) => handleSubmit(model)}/>
                    )
                }
            </div>


        </Surface>
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

            <div className={'grid grid-cols-5 border'}>

                <div className={'col-span-full flex justify-center'}>
                    <DentalPlaqueChart chart={chart} disabled={disabled}/>
                </div>

                <div className={'p-4 flex justify-center items-center'}>
                    <Text className={'text-center'}>Número de piezas dentales ({dentalPieces})</Text>
                    <Text className={'text-center'}>Número de superficies (Número de diente x 4)</Text>
                    <Text className={''} level={'h1'} component={'p'}>{presentSurfacesCount}</Text>
                </div>

                <div className={'col-span-3 p-4 flex gap-2 justify-center items-center border-l border-r'}>
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

                <div className={'p-4 flex gap-2 justify-center items-center'}>
                    <Text>%</Text>
                    <Text level={'h1'}>
                        {(!Number.isNaN(plaquePercentage) ? plaquePercentage : 0).toFixed(2)}
                    </Text>
                </div>
            </div>


            <div>
                {
                    !disabled && <Button onClick={() => onClick(chart.getModel())} type='button'>Guardar</Button>
                }

            </div>
        </div>
    )
}

export default ControlPlacaSection
