import AuthLayout from "@/Layouts/AuthLayout";
import {useRoute} from "ziggy-js";
import {Link} from "@inertiajs/react";
import {Icon} from "@/Components/atoms/Icon";
import Title from "@/Components/atoms/Title";
import React from "react";
import {ClipboardDocumentIcon, UserGroupIcon} from "@heroicons/react/24/outline";
import {LayoutDashboard, Menu, MonitorCog, Users, BookOpenText, GraduationCap, Book} from "lucide-react";
import {Card} from '@/shadcn/ui/card'
import {Text} from "@/Components/atoms/Text";
import {usePage} from '@inertiajs/react'

type MenuItem = Readonly<{
    name: string,
    icon: React.ReactElement,
    link: string
}>

const sidebarMenu: MenuItem[] = [
    {name: 'Inicio', link: 'dashboard', icon: <LayoutDashboard/>},
    {name: 'Historias', link: 'historia', icon: <ClipboardDocumentIcon/>},
    {name: 'Grupos', link: 'dashboard', icon: <UserGroupIcon/>},
    {name: 'Usuarios', link: 'profile.index', icon: <Users/>},
    {name: 'Configuración', link: 'dashboard', icon: <MonitorCog/>},
    {name: 'Otros', link: 'dashboard', icon: <Menu/>},
]

interface DashboardProps extends React.ComponentPropsWithoutRef<React.ReactElement> {
    usersCount: number,
    historiasCount: number
    estudiantesCount: number,
    profesoresCount: number
}

const Dashboard = ({usersCount, historiasCount, estudiantesCount, profesoresCount}: DashboardProps) => {

    return (
        <AuthLayout title={'Inicio'} sidebar={<SidebarContent/>}>

            <div className={'h-32 grid grid-cols-2 sm:grid-cols-4 gap-6 m-6'}>
                <StatisticsSlot title={'Usuarios registrados'} data={usersCount} icon={<Users />} />
                <StatisticsSlot title={'Historias creadas'} data={historiasCount} icon={<ClipboardDocumentIcon />} />
                <StatisticsSlot title={'Estudiantes registrados'} data={estudiantesCount} icon={<BookOpenText />} />
                <StatisticsSlot title={'Profesores registrados'} data={profesoresCount} icon={<GraduationCap />} />
            </div>
        </AuthLayout>
    )
}


export const SidebarContent = () => {
    const route = useRoute()
    const { url, component} = usePage()


    return (
        <div className={'h-full lg:p-6 flex lg:flex-col gap-1 justify-center lg:justify-start'}>
            {sidebarMenu.map((menuItem, index) =>
                <Link className={`flex-initial flex items-center gap-2 rounded-lg p-2 cursor-pointer hover:bg-white/10 ${(route(menuItem.link).endsWith(url))? 'bg-white/10' : ''}`} href={route(menuItem.link)} key={index}
                      onClick={() => {
                }}>
                    <Icon className={'size-8 text-white'}>
                        {menuItem.icon}
                    </Icon>
                    <Title className={'max-lg:hidden text-white'} level={'title-md'}>{menuItem.name}</Title>
                </Link>
            )}
        </div>
    )
}

interface StatisticsSlotProps {
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

export default Dashboard
