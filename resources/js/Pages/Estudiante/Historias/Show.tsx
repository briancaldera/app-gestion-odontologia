import AuthLayout from "@/Layouts/AuthLayout.tsx";
import type Historia from "@/src/models/Historia.ts";
import SidebarMenu, {type MenuItem} from "@/Components/organisms/SidebarMenu.tsx";
import {ArrowBigLeft} from 'lucide-react'
import HistoriaEditor from "@/Components/organisms/HistoriaEditor.tsx";

type ShowProps = {
    historia: Historia
}

const Show = ({historia}: ShowProps) => {
    // Show my marvelous HCE here
    return (
        <AuthLayout title={`Paciente: ${historia.paciente?.nombre} ${historia.paciente?.apellido}`} sidebar={<SidebarMenu menu={menu}/>}>
            <div className={'p-6'}>
                <HistoriaEditor historia={historia} readMode={false}/>
            </div>
        </AuthLayout>
    )
}

const menu: MenuItem[] = [
    {icon: <ArrowBigLeft />, link: "historias.index", name: "Volver"}
] satisfies MenuItem[]

export default Show
