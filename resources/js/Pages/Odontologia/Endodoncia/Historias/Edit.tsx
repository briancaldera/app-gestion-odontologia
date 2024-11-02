import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {HistoriaEndodoncia} from "@/src/models/Endodoncia/HistoriaEndodoncia.ts";
import {HistoriaEndodonciaEditor} from "@/Components/organisms/historia-endodoncia/HistoriaEndodonciaEditor.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";

type EditProps = {
    historia: HistoriaEndodoncia
}

const Edit = ({historia}: EditProps) => {

    return (
        <AuthLayout title={'Historia Endodoncia'}>
            <ScrollArea className={'h-full'}>
                <div className={'p-6'}>
                    <HistoriaEndodonciaEditor historia={historia} readMode={false} canCreateCorrections={false}/>
                </div>
            </ScrollArea>
        </AuthLayout>
    )
}

export default Edit
