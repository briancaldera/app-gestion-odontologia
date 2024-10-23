import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import StatisticsCard from "@/Components/molecules/StatisticsCard.tsx";
import {Clipboard} from "lucide-react";
import {RadialChartText} from "@/Components/molecules/charts/RadialChartText.tsx";
import React from "react";
import {Card} from "@/shadcn/ui/card.tsx";
import {Link} from "@inertiajs/react";
import {route} from "ziggy-js";
import {usePermission} from "@/src/Utils/Utils.ts";

const Dashboard = ({statistics}: DashboardProps) => {

    const can = usePermission()



    if (can('historias-index-all')) {
        return (
            <AuthLayout title={'Historias - Dashboard'}>
                <ScrollArea className={'h-full'}>
                    <div className={'flex'}>
                        <div className={'basis-96 flex flex-col p-6'}>
                            <div className={'flex flex-col'}>
                                <Link href={route('historias.index')}>
                                    <Card className={'p-6'}>
                                        Historias de adulto
                                    </Card>
                                </Link>
                            </div>

                            <div className={'flex flex-col'}>
                                <Link href={route('historias.index')}>
                                    <Card className={'p-6'}>
                                        Historias de endodoncia
                                    </Card>
                                </Link>
                            </div>
                        </div>
                        <div className={'basis-full h-96 grid grid-cols-2 grid-rows-2 sm:grid-cols-4 gap-6 py-6 pr-6'}>
                            <StatisticsCard title={'Historias creadas'} data={statistics.created_HCE}
                                            icon={<Clipboard/>}/>
                            <StatisticsCard title={'Historias creadas'} data={2} icon={<Clipboard/>}/>

                            <div className={'col-span-2 row-span-2'}>
                                <RadialChartText title={'Historias'} description={'Status de historias'}/>
                            </div>

                        </div>
                    </div>
                </ScrollArea>
            </AuthLayout>
        )
    } else if (can('homeworks-create-corrections')) {
        return (
            <AuthLayout title={'Historias - Dashboard'}>
                <ScrollArea className={'h-full'}>

                </ScrollArea>
            </AuthLayout>
        )
    } else {
        return (
            <AuthLayout title={'Historias - Dashboard'}>
                <ScrollArea className={'h-full'}>
                    <div className={'flex'}>
                        <div className={'basis-96 flex flex-col p-6'}>
                            <div className={'flex flex-col'}>
                                <Link href={route('historias.index')}>
                                    <Card className={'p-6'}>
                                        Historias de adulto
                                    </Card>
                                </Link>
                            </div>

                            <div className={'flex flex-col'}>
                                <Link href={route('historias.index')}>
                                    <Card className={'p-6'}>
                                        Historias de endodoncia
                                    </Card>
                                </Link>
                            </div>
                        </div>

                        <div className={'h-96 grid grid-cols-2 grid-rows-2 sm:grid-cols-4 gap-6 m-6'}>
                            {
                                ('historiasCreadas' in statistics) && <StatisticsCard title={'Historias creadas'} data={statistics.historiasCreadas} icon={<Clipboard/>}/>
                            }

                            <div className={'col-span-2 row-span-2'}>
                                <RadialChartText title={'Historias'} description={'Status de historias'}/>
                            </div>

                        </div>
                    </div>
                </ScrollArea>
            </AuthLayout>
        )
    }
}

type Statistics = {
    readonly created_HCE: number
}

type DashboardProps = {
    statistics: Record<string, number>
}

export default Dashboard
