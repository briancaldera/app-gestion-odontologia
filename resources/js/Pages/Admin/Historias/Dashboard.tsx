import AuthLayout from "@/Layouts/AuthLayout";
import SidebarMenu, {type MenuItem} from "@/Components/organisms/SidebarMenu";
import {undefined} from "zod";
import {ArrowBigLeft, Clipboard} from 'lucide-react'
import StatisticsCard from "@/Components/molecules/StatisticsCard";
import {RadialChartText} from "@/Components/molecules/charts/RadialChartText";
import React from "react";

type Statistics = {
    readonly created_HCE: number
}

type DashboardProps = {
    statistics: Statistics
}

const Dashboard = ({statistics}: DashboardProps) => {
    return (
        <AuthLayout title={'Historias - Dashboard'} sidebar={<SidebarMenu menu={menu}/>}>
            <div className={'h-96 grid grid-cols-2 grid-rows-2 sm:grid-cols-4 gap-6 m-6'}>
                <StatisticsCard title={'Historias creadas'} data={statistics.created_HCE} icon={<Clipboard/>}/>
                <StatisticsCard title={'Historias creadas'} data={2} icon={<Clipboard/>}/>

                <div className={'col-span-2 row-span-2'}>
                    <RadialChartText title={'Historias'} description={'Status de historias'}/>
                </div>

            </div>
        </AuthLayout>
    )
}

const menu = [
    {name: "Volver", link: "dashboard", icon: <ArrowBigLeft/>},
    {name: 'Ver Historias', link: 'historias.index', icon: <Clipboard />},
] satisfies MenuItem[] as const

export default Dashboard
