import {DentalPiece} from "@/src/models/DentalPiece.ts";
import React, {useState} from "react";

type UseDentalPlaqueChart = {
    model?: DentalPlaqueChartModel
}

type UseDentalPlaqueChartReturn = {
    getModel: () => DentalPlaqueChartModel
    _listeners: {
        setGroup1:  React.Dispatch<React.SetStateAction<DentalPiece[]>>
        setGroup2:  React.Dispatch<React.SetStateAction<DentalPiece[]>>
        setGroup3:  React.Dispatch<React.SetStateAction<DentalPiece[]>>
        setGroup4:  React.Dispatch<React.SetStateAction<DentalPiece[]>>
    }
}

type DentalPlaqueChartModel = {
    quadrant_1: DentalPiece[]
    quadrant_2: DentalPiece[]
    quadrant_3: DentalPiece[]
    quadrant_4: DentalPiece[]
}

const quadrant1: DentalPiece[] = [
    {
        id: "18", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "17", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "16", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "15", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "14", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "13", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "12", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "11", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
] satisfies DentalPiece[]

const quadrant2: DentalPiece[] = [
    {
        id: "21", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "22", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "23", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "24", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "25", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "26", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "27", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "28", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
] satisfies DentalPiece[]

const quadrant3: DentalPiece[] = [
    {
        id: "31", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "32", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "33", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "34", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "35", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "36", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "37", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "38", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
] satisfies DentalPiece[]

const quadrant4: DentalPiece[] = [
    {
        id: "48", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "47", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "46", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "45", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "44", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "43", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "42", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
    {
        id: "41", present: true, surfaces: {
            back: false, front: false, left: false, right: false
        }
    },
] satisfies DentalPiece[]

const mergeQuadrant: (target: DentalPiece[], source: DentalPiece[]) => DentalPiece[] = (target, source) => {
    return target.map(piece => source.find(sourcePiece => piece.id === sourcePiece.id) ?? piece)
}

const useDentalPlaqueChart: (props?: UseDentalPlaqueChart) => UseDentalPlaqueChartReturn = (props) => {

    // todo move JSON parse inside useState
    const quad_1: DentalPiece[] = React.useMemo(() => JSON.parse(JSON.stringify(props?.model?.quadrant_1 ?? quadrant1)), [])
    const quad_2: DentalPiece[] = React.useMemo(() => JSON.parse(JSON.stringify(props?.model?.quadrant_2 ?? quadrant2)), [])
    const quad_3: DentalPiece[] = React.useMemo(() => JSON.parse(JSON.stringify(props?.model?.quadrant_3 ?? quadrant3)), [])
    const quad_4: DentalPiece[] = React.useMemo(() => JSON.parse(JSON.stringify(props?.model?.quadrant_4 ?? quadrant4)), [])

    const [group1, setGroup1] = useState<DentalPiece[]>(quad_1);
    const [group2, setGroup2] = useState<DentalPiece[]>(quad_2);
    const [group3, setGroup3] = useState<DentalPiece[]>(quad_3);
    const [group4, setGroup4] = useState<DentalPiece[]>(quad_4);

    const getModel: () => DentalPlaqueChartModel = () => {
        return {
            quadrant_1: group1, quadrant_2: group2, quadrant_3: group3, quadrant_4: group4
        } satisfies DentalPlaqueChartModel
    }

    return {getModel, _listeners: {setGroup1, setGroup2, setGroup3, setGroup4}} satisfies UseDentalPlaqueChartReturn
}

export {useDentalPlaqueChart, type UseDentalPlaqueChart, type UseDentalPlaqueChartReturn, type DentalPlaqueChartModel}
