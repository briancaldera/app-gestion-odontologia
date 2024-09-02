import AuthLayout from "@/Layouts/AuthLayout.jsx";
import {Text} from "@/Components/atoms/Text.jsx";
import {Button} from "@/Components/molecules/Button.jsx";
import {DocumentTextIcon} from "@heroicons/react/24/outline/index.js";
import React from "react";
import { router } from '@inertiajs/react'
import { useRoute } from 'ziggy-js'
import HistoriaEditor from "@/Components/organisms/HistoriaEditor.tsx";
import StatisticsCard from "@/Components/molecules/StatisticsCard";
import {ArrowBigLeft, Car, Clipboard, FilePlus2} from 'lucide-react'
import { Card } from '@/shadcn/ui/card'
import {RadialChartText} from "@/Components/molecules/charts/RadialChartText";
import SidebarMenu, {MenuItem} from "@/Components/organisms/SidebarMenu";

const menu = [
    {icon: <ArrowBigLeft />, link: "dashboard", name: "Volver"},
    {name: 'Ver Historias', link: 'historias.index', icon: <Clipboard />},
    {name: 'Crear Historia', link: 'historias.create', icon: <FilePlus2 />}
] satisfies MenuItem[] as const

const Dashboard = ({historias}) => {

    return (
        <AuthLayout title={'Historias'} sidebar={<SidebarMenu menu={menu}/>}>
            {/*<HistoriaEditor />*/}
            <div className={'h-96 grid grid-cols-2 grid-rows-2 sm:grid-cols-4 gap-6 m-6'}>
                <StatisticsCard title={'Historias creadas'} data={2} icon={<Clipboard/>} />
                <StatisticsCard title={'Historias creadas'} data={2} icon={<Clipboard/>} />

             <div className={'col-span-2 row-span-2'}>
                 <RadialChartText title={'Historias'} description={'Status de historias'}/>
             </div>

            </div>
        </AuthLayout>
)
}

const EmptySection = () => {
    const route = useRoute()
    return (
        <div className={'h-full relative px-20'}>
            <div className={'absolute z-20 h-full flex flex-col justify-center gap-4 -mt-6'}>
                <div>
                    <Text level={'h2'}>Crea una nueva historia</Text>
                    <Text level={'body-lg'}>Comencemos creando tu primera historia clínica digital</Text>
                </div>
                <div className={''}>
                    <Button label={'Crear historia'} onClick={() => router.visit(route('dashboard'))} />
                </div>

            </div>
            <div className={'absolute z-10 max-w-md text-slate-300/50 inset-y-0 flex right-0'}>
                <DocumentTextIcon/>
            </div>
        </div>
    )
}

const Sidebar = () => {

}

export default Dashboard
