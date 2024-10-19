import {Link, usePage} from "@inertiajs/react";
import {Icon} from "@/Components/atoms/Icon.tsx";
import Title from "@/Components/atoms/Title";
import React from "react";
import {CircleHelp, Info, LayoutDashboard, Menu, PersonStanding, User, Users} from "lucide-react";
import {ClipboardDocumentIcon} from "@heroicons/react/24/outline";
import {Text} from "@/Components/atoms/Text";
import {Separator} from "@/shadcn/ui/separator.tsx";
import {usePermission} from "@/src/Utils/Utils.ts";
import {UserGroupIcon} from '@heroicons/react/24/outline'
import {route} from "ziggy-js";

type SidebarProps = {
    readonly menu?: MenuItem[]
}

const SidebarMenu = ({menu}: SidebarProps) => {

    const {auth: {user: {permissions}}} = usePage().props

    const can = usePermission()

    const clinicaMenu: MenuItem[] = []
    clinicaMenu.push({name: 'Inicio', icon: <LayoutDashboard/>, link: route('dashboard')})

    if ((permissions as string[]).some(permission => permission.startsWith('pacientes'))) {
        clinicaMenu.push({name: 'Pacientes', icon: <PersonStanding/>, link: route('pacientes.index')})
    }

    if ((permissions as string[]).includes('historia-index-all')) {
        clinicaMenu.push({name: 'Historias', icon: <ClipboardDocumentIcon/>, link: route('historias.dashboard')})
    }

    const escuelaMenu: MenuItem[] = [
        {name: "Grupos", icon: <UserGroupIcon/>, link: route("groups.index")}
    ]

    const sistemaMenu: MenuItem[] = [
        {name: "Usuarios", icon: <User/>, link: route('profile.index')},
    ]

    const footerMenu: MenuItem[] = [
        {name: "Ayuda", icon: <CircleHelp/>, link: "/ayuda"},
        {name: "Información", icon: <Info/>, link: "/informacion"}
    ] satisfies MenuItem[]

    return (
        <div>
            <SidebarMenuGroup>
                <Text className={'uppercase text-sm font-semibold text-indigo-400 mt-2'}>Clínica</Text>
                {clinicaMenu.map((menuItem, _index) => (<SidebarMenuItem menuItem={menuItem} key={menuItem.link}/>))}
            </SidebarMenuGroup>
            <SidebarMenuGroup>
                <Text className={'uppercase text-sm font-semibold text-indigo-400 mt-2'}>Escuela</Text>
                {escuelaMenu.map((menuItem, _index) => (<SidebarMenuItem menuItem={menuItem} key={menuItem.link}/>))}
            </SidebarMenuGroup>
            {
                (permissions as string[]).some(permission => permission.startsWith('system')) &&
                (
                    <>
                        <SidebarMenuGroup>
                            <Text className={'uppercase text-sm font-semibold text-indigo-400 mt-2'}>Sistema</Text>
                            {
                                sistemaMenu.map((menuItem, _index) => (
                                    <SidebarMenuItem menuItem={menuItem} key={menuItem.link}/>))
                            }
                        </SidebarMenuGroup>

                    </>
                )
            }
            <Separator className={'bg-indigo-400'}/>
            <SidebarMenuGroup>
                {footerMenu.map((menuItem, _index) => (<SidebarMenuItem menuItem={menuItem} key={menuItem.link}/>))}
            </SidebarMenuGroup>
        </div>
    )
}

const SidebarMenuGroup = ({children}) => {
    return (
        <div className={'h-full lg:p-6 flex lg:flex-col gap-1 justify-center lg:justify-start'}>
            {children}
        </div>
    )
}

const SidebarMenuItem = ({menuItem}: { menuItem: MenuItem }) => {

    const url = window.location.href

    return (
        <Link
            className={`flex-initial flex items-center gap-2 rounded-lg p-2 cursor-pointer hover:bg-white/10 ${(url.startsWith(menuItem.link)) && 'bg-white/10'}`}
            href={menuItem.link} as={'button'}>
            <Icon className={'size-8 text-white'}>
                {menuItem.icon}
            </Icon>
            <Title className={'max-lg:hidden text-white'} level={'title-md'}>{menuItem.name}</Title>
        </Link>
    )
}

type MenuItem = Readonly<{
    name: string,
    icon: React.ReactElement,
    link: string
}>

export default SidebarMenu
export {type MenuItem}
