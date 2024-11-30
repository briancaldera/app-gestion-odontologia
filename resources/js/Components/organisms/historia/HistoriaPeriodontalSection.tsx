import Surface from "@/Components/atoms/Surface";
import {HistoriaPeriodontal} from "@/src/models/HistoriaOdontologica.ts";
import HistoriaPeriodontalForm from "@/Components/organisms/historia/partials/HistoriaPeriodontalForm.tsx";
import {HistoriaEditorContext} from "@/Components/organisms/HistoriaEditor.tsx";
import React from "react";
import CorrectionsBlock from "@/src/corrections/CorrectionsBlock.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";

type HistoriaPeriodontalSectionProps = {
    historia_id: string
    readonly: boolean
    historia_periodontal: HistoriaPeriodontal
}

const HistoriaPeriodontalSection = ({historia_id, historia_periodontal, readonly}: HistoriaPeriodontalSectionProps) => {

    const {historia, homework, canCreateCorrections, correctionsModel} = React.useContext(HistoriaEditorContext)

    return (
        <ScrollArea className={'bg-white w-full p-6 h-[83vh]'}>

            <CorrectionsBlock model={correctionsModel} name={'historia_periodontal'}
                              canCreateCorrections={canCreateCorrections}>
                <HistoriaPeriodontalForm/>
            </CorrectionsBlock>

        </ScrollArea>
    )
}

export default HistoriaPeriodontalSection
