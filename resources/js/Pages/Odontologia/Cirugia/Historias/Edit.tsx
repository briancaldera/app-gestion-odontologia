import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {HistoriaCirugia} from "@/src/models/Cirugia/HistoriaCirugia.ts";
import {HistoriaCirugiaEditor} from "@/Components/organisms/historia-cirugia/HistoriaCirugiaEditor.tsx";

type EditProps = {
    historia: HistoriaCirugia
}

const Edit = ({historia}: EditProps) => {

    return (
        <AuthLayout title='Historia Clínica - Área de Cirugía'>
            <ScrollArea className={'h-full'}>
                <div className={'p-6'}>

                    <HistoriaCirugiaEditor historia={historia} readMode={true} canCreateCorrections={true}/>
                </div>
            </ScrollArea>
        </AuthLayout>
    )
}

export default Edit
