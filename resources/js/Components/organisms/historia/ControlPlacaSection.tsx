import {DentalPlaqueChartModel, useDentalPlaqueChart} from "@/src/DentalPlaqueChartModel.ts";
import DentalPlaqueChart from "@/Components/controlplaca/DentalPlaqueChart.tsx";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Text} from "@/Components/atoms/Text";

const ControlPlacaSection = () => {

    const controlPlacaChart1 = useDentalPlaqueChart()
    const controlPlacaChart2 = useDentalPlaqueChart()
    const controlPlacaChart3 = useDentalPlaqueChart()
    const controlPlacaChart4 = useDentalPlaqueChart()

    return (
        <Surface className={'p-6'}>

            <header>
                <Title level={'h4'}>Control de placa de dental</Title>
            </header>

            <ControlPlacaDiagrama/>


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

const ControlPlacaDiagrama = () => {

    const controlPlacaChart = useDentalPlaqueChart()

    const presentSurfacesCount = countPresentDentalPieces(controlPlacaChart.getModel()) * 4

    const markedSurfacesCount = countMarkedSurfaces(controlPlacaChart.getModel())

    return (
        <div>
            <DentalPlaqueChart chart={controlPlacaChart}/>
            <div className={'grid grid-cols-5 border'}>

                <div className={'p-4 flex justify-center items-center'}>
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
                        {}
                        {(markedSurfacesCount / presentSurfacesCount * 100).toFixed(2)}
                    </Text>
                </div>
            </div>

        </div>
    )
}

export default ControlPlacaSection
