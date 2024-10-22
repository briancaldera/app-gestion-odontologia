import React from "react";
import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {Apple, BookOpenText, Clipboard, GraduationCap, Users} from "lucide-react";
import {Card} from "@/shadcn/ui/card.tsx";
import {Text} from "@/Components/atoms/Text";
import {Icon} from "@/Components/atoms/Icon.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";


type DashboardProps = {
    statistics: Record<string, number>
}

const Show = ({statistics}: DashboardProps) => {

    console.log(statistics)
    return (
        <AuthLayout title={'Inicio'}>
            <ScrollArea className={'h-full'}>


                <div className={'h-32 grid grid-cols-2 sm:grid-cols-4 gap-6 m-6'}>
                    {
                        ('pacientesAsignados' in statistics) && (
                            <StatisticsSlot title={'Pacientes asignados'} data={statistics.pacientesAsignados}
                                            icon={<Users/>}/>)
                    }
                    {
                        ('historiasCreadas' in statistics) && (
                            <StatisticsSlot title={'Historias creadas'} data={statistics.historiasCreadas}
                                            icon={<Clipboard/>}/>)
                    }
                    {
                        ('usuariosRegistrados' in statistics) && (
                            <StatisticsSlot title={'Usuarios registrados'} data={statistics.usuariosRegistrados}
                                            icon={<Users/>}/>)
                    }
                    {
                        ('estudiantesRegistrados' in statistics) && (
                            <StatisticsSlot title={'Estudiantes registrados'} data={statistics.estudiantesRegistrados}
                                            icon={<BookOpenText/>}/>)
                    }
                    {
                        ('profesoresRegistrados' in statistics) && (
                            <StatisticsSlot title={'Profesores'} data={statistics.profesoresRegistrados}
                                            icon={<Apple/>}/>)
                    }
                    {
                        ('gruposQueManeja' in statistics) && (
                            <StatisticsSlot title={'Grupos'} data={statistics.gruposQueManeja}
                                            icon={<Users/>}/>)
                    }
                    {
                        ('estudiantesAsignados' in statistics) && (
                            <StatisticsSlot title={'Estudiantes asignados'} data={statistics.estudiantesAsignados}
                                            icon={<GraduationCap/>}/>)
                    }
                </div>
            </ScrollArea>
        </AuthLayout>
    )
}

type StatisticsSlotProps = {
    title: string,
    data: number | string,
    icon: React.ReactElement
}

const StatisticsSlot = ({title, data, icon}: StatisticsSlotProps) => {
    return (
        <Card className={'p-6'}>
            <header className={'flex justify-between items-center'}>
                <Text level={'body-sm'} className={'font-semibold'}>
                    {title}
                </Text>
                <Icon>
                    {icon}
                </Icon>
            </header>
            <div className={'mt-1.5'}>
                <Text className={'line-clamp-1'} level={'h1'} component={'p'}>{data}</Text>
            </div>
        </Card>
    )
}

export default Show
