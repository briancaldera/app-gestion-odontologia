import AuthLayout from "@/Layouts/AuthLayout.tsx";
import HistoriaEditor from "@/Components/organisms/HistoriaEditor";
import Historia from "@/src/models/Historia";
import {Homework} from "@/src/models/Group.ts";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";

type EditProps = {
    historia: Historia
    homework?: Homework
}
const Edit = ({historia, homework}: EditProps) => {

    return (
        <AuthLayout title={`Paciente: ${historia.paciente?.nombre} ${historia.paciente?.apellido}`}>
            <ScrollArea className={'h-full'}>
                <div className={'max-lg:px-2 max-lg:pt-2 lg:p-6'}>
                    <HistoriaEditor historia={historia} readMode={false} homework={homework}
                                    canCreateCorrections={false}/>
                </div>
            </ScrollArea>
        </AuthLayout>
    )
}

export default Edit
