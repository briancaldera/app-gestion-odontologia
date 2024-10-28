import Surface from "@/Components/atoms/Surface";
import {HistoriaPeriodontal} from "@/src/models/HistoriaOdontologica.ts";
import HistoriaPeriodontalForm from "@/Components/organisms/historia/partials/HistoriaPeriodontalForm.tsx";

type HistoriaPeriodontalSectionProps = {
    historia_id: string
    readonly: boolean
    historia_periodontal: HistoriaPeriodontal
}

const HistoriaPeriodontalSection = ({historia_id, historia_periodontal, readonly}: HistoriaPeriodontalSectionProps) => {

    return (
        <Surface className={'p-6'}>

            <HistoriaPeriodontalForm/>

        </Surface>
    )
}

export default HistoriaPeriodontalSection
