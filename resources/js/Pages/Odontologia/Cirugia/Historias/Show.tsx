import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {type HistoriaCirugia} from "@/src/models/Cirugia/HistoriaCirugia.ts";
import {HistoriaCirugiaEditor} from "@/Components/organisms/historia-cirugia/HistoriaCirugiaEditor.tsx";

type ShowProps = {
    historia: HistoriaCirugia
}

const Show = ({historia}: ShowProps) => {

    return (
        <AuthLayout title='Historia Clínica - Área de Cirugía'>
            <HistoriaCirugiaEditor historia={historia} readMode={true} canCreateCorrections={false}/>
        </AuthLayout>
    )
}

export default Show
