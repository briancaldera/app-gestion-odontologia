"use client"

import TeethGroup from "./TeethGroup.tsx";
import type {DentalPiece, Surface} from "@/src/models/DentalPiece.ts";
import {UseDentalPlaqueChartReturn} from "@/src/DentalPlaqueChartModel.ts";
import Heading from "@/Components/atoms/Heading";

type DentalPlaqueChartProps = {
    chart: UseDentalPlaqueChartReturn
    disabled?: boolean
}

const DentalPlaqueChart = ({ chart, disabled = false }: DentalPlaqueChartProps) => {

    const handleClickSurface: (group: DentalPiece[], id: string, surface: Surface, mark: boolean) => DentalPiece[] = (group, id, surface, mark) => {
        if (disabled) return group
        return group.map((piece) => {
            if (piece.id === id) {
                const newTooth: DentalPiece = {...piece}
                newTooth.surfaces[surface] = mark
                return newTooth
            } else {
                return piece
            }
        })
    }

    const handleDiscardPiece: (group: DentalPiece[], id: string) => DentalPiece[] = (group: DentalPiece[], id: string) => {
        if (disabled) return group
        return group.map(piece => {
            if (piece.id === id) {
                const newPiece: DentalPiece = {...piece}
                newPiece.present = !newPiece.present
                newPiece.surfaces.front = false
                newPiece.surfaces.back = false
                newPiece.surfaces.left = false
                newPiece.surfaces.right = false
                return newPiece
            } else {
                return piece
            }
        })
    }

    return (
        <div className={'grid grid-cols-1 sm:grid-cols-2'}>
            <div className={'relative'}>
                <Heading className={'absolute px-2 max-sm:-left-5'} level={'h6'}>I</Heading>
                <TeethGroup teeth={chart.getModel().quadrant_1} onDiscardPiece={(id) => {chart._listeners.setGroup1(prevState => handleDiscardPiece(prevState, id))}} onClickSurface={(id, surface, mark) => chart._listeners.setGroup1((prevState) => handleClickSurface(prevState, id, surface, mark))}/>
            </div>
            <div className={'relative'}>
                <Heading className={'absolute px-2 max-sm:-left-5'} level='h6'>II</Heading>
                <TeethGroup teeth={chart.getModel().quadrant_2} onDiscardPiece={(id) => chart._listeners.setGroup2(prevState => handleDiscardPiece(prevState, id))} onClickSurface={(id, surface, mark) => chart._listeners.setGroup2((prevState) => handleClickSurface(prevState, id, surface, mark))}/>
            </div>
            <div className={'relative'}>
                <Heading className={'absolute px-2 max-sm:-left-5'} level='h6'>IV</Heading>
                <TeethGroup teeth={chart.getModel().quadrant_4} onDiscardPiece={(id) => chart._listeners.setGroup4(prevState => handleDiscardPiece(prevState, id))} onClickSurface={(id, surface, mark) => chart._listeners.setGroup4((prevState) => handleClickSurface(prevState, id, surface, mark))}/>
            </div>
            <div className={'relative max-sm:row-start-3'}>
                <Heading className={'absolute px-2 max-sm:-left-5'} level='h6'>III</Heading>
                <TeethGroup teeth={chart.getModel().quadrant_3} onDiscardPiece={(id) => {
                    chart._listeners.setGroup3(prevState => handleDiscardPiece(prevState, id))
                }}
                            onClickSurface={(id, surface, mark) => chart._listeners.setGroup3((prevState) => handleClickSurface(prevState, id, surface, mark))}/>
            </div>
        </div>
    )
}

export default DentalPlaqueChart
