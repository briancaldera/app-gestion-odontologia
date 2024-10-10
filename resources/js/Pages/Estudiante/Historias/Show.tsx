import AuthLayout from "@/Layouts/AuthLayout.tsx";
import type Historia from "@/src/models/Historia.ts";
import SidebarMenu, {type MenuItem} from "@/Components/organisms/SidebarMenu.tsx";
import {ArrowBigLeft} from 'lucide-react'
import HistoriaEditor from "@/Components/organisms/HistoriaEditor.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {Homework} from "@/src/models/Group.ts";
import {usePermission} from "@/src/Utils/Utils.ts";

type ShowProps = {
    historia: Historia
    homework?: Homework
}

const Show = ({historia, homework}: ShowProps) => {

    const can = usePermission()

    const canCreateCorrections = can('corrections-create')
    // Show my marvelous HCE here
    return (
        <AuthLayout title={`Paciente: ${historia.paciente?.nombre} ${historia.paciente?.apellido}`} sidebar={<SidebarMenu menu={menu}/>}>
            <ScrollArea className={'h-full'}>
                <div className={'p-6'}>
                    {/*TODO set readmode to true*/}
                    <HistoriaEditor historia={historia} readMode={false} homework={homework} canCreateCorrections={canCreateCorrections}/>
                </div>
            </ScrollArea>
        </AuthLayout>
    )
}

const menu: MenuItem[] = [
    {icon: <ArrowBigLeft />, link: "historias.index", name: "Volver"}
] satisfies MenuItem[]

export default Show
