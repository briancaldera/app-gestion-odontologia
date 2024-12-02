import {Link, usePage} from "@inertiajs/react";
import {Icon} from "@/Components/atoms/Icon.tsx";
import Title from "@/Components/atoms/Title";
import React from "react";
import {CircleHelp, EllipsisVertical, Info, LayoutDashboard, PersonStanding, User} from "lucide-react";
import {ClipboardDocumentIcon, UserGroupIcon} from "@heroicons/react/24/outline";
import {Text} from "@/Components/atoms/Text";
import {Separator} from "@/shadcn/ui/separator.tsx";
import {usePermission} from "@/src/Utils/Utils.ts";
import {route} from "ziggy-js";
import Logo from "@/Components/atoms/Logo.tsx";

type SidebarProps = {
    readonly menu?: MenuItem[]
    expanded: boolean
    onExpandChange: (state: boolean) => void
}

const SidebarContext = React.createContext({expanded: true})

const SidebarMenu = ({menu, expanded = true, onExpandChange = () => {}}: SidebarProps) => {

    const can = usePermission()

    const clinicaMenu: MenuItem[] = []
    clinicaMenu.push({name: 'Inicio', icon: <LayoutDashboard/>, link: route('dashboard')})

    if (can('pacientes-read')) {
        clinicaMenu.push({name: 'Pacientes', icon: <PersonStanding/>, link: route('pacientes.index')})
    }

    if (can('historias-read')) {
        clinicaMenu.push({name: 'Historias', icon: <ClipboardDocumentIcon/>, link: route('historias.dashboard')})
    }

    const escuelaMenu: MenuItem[] = []

    if (can('groups-read')) {
        escuelaMenu.push({name: "Grupos", icon: <UserGroupIcon/>, link: route("groups.index")})
    }

    const sistemaMenu: MenuItem[] = []

    if (can('system-add-users-codes')) {
        sistemaMenu.push({name: "Usuarios", icon: <User/>, link: route('profile.index')},)
    }

    const footerMenu: MenuItem[] = [
        {name: "Ayuda", icon: <CircleHelp/>, link: "/ayuda"},
        {name: "Información", icon: <Info/>, link: "/informacion"}
    ] satisfies MenuItem[]

    return (
        <SidebarContext.Provider value={{expanded: expanded}}>

            <aside className={
                ' /*mobile*/ bg-indigo-600 fixed z-50 max-lg:inset-x-0 max-lg:h-10 bottom-0' +
                ' /*tablet*/ ' +
                ` /*laptop*/  lg:inset-y-0 lg:inset-x-px lg:left-0 ${expanded ? 'lg:w-72' : 'lg:w-28'}`}>
                <div className={'sm:h-20 items-center hidden lg:flex'}>
                    <Link href={route('dashboard')}
                          className={'grayscale contrast-200 brightness-200 overflow-hidden ps-6 flex-1 flex items-center gap-x-2'}>
                        <Logo className={'w-14 basis-14'}/>
                        {
                            expanded &&
                            <div className={'flex-1 flex flex-col'}>
                                <Title className={'text-white'} level='title-lg'>UGMA</Title>
                                <Title className={'text-white font-light'}>Facultad de Odontología</Title>
                            </div>
                        }
                    </Link>
                </div>
                <div className={'flex justify-center items-baseline lg:flex-col '}>
                    <SidebarMenuGroup title='Clínica'>
                        {clinicaMenu.map((menuItem, _index) => (
                            <SidebarMenuItem menuItem={menuItem} key={menuItem.link}/>))}
                    </SidebarMenuGroup>
                    {
                        escuelaMenu.length > 0 && (
                            <SidebarMenuGroup title='Escuela'>
                                {escuelaMenu.map((menuItem, _index) => (
                                    <SidebarMenuItem menuItem={menuItem} key={menuItem.link}/>))}
                            </SidebarMenuGroup>
                        )
                    }
                    {
                        escuelaMenu.length > 0 && (
                            <SidebarMenuGroup title='Sistema'>
                                {escuelaMenu.map((menuItem, _index) => (
                                    <SidebarMenuItem menuItem={menuItem} key={menuItem.link}/>))}
                            </SidebarMenuGroup>
                        )
                    }
                    <Separator className={'hidden lg:block bg-indigo-400'}/>
                    <SidebarMenuGroup>
                        {footerMenu.map((menuItem, _index) => (
                            <SidebarMenuItem menuItem={menuItem} key={menuItem.link}/>))}
                    </SidebarMenuGroup>
                </div>
                <div className={'hidden lg:block absolute inset-y-0 right-0 flex items-center'}>
                    <EllipsisVertical onClick={() => onExpandChange(!expanded)}
                                      className={"cursor-pointer text-white/20 animate-color transition hover:text-white"}/>
                </div>
            </aside>
        </SidebarContext.Provider>
    )
}

const SidebarMenuGroup = ({title, children}) => {

    const {expanded} = React.useContext(SidebarContext)

    return (
        <div className={`h-full lg:p-6 flex lg:flex-col ${!expanded && 'items-center'} gap-1 justify-center max-lg:items-center lg:justify-start`}>
            <Text className={'max-lg:hidden uppercase text-sm font-semibold text-indigo-400 mt-2'}>{title}</Text>
            {children}
        </div>
    )
}

const SidebarMenuItem = ({menuItem}: { menuItem: MenuItem }) => {

    const {expanded} = React.useContext(SidebarContext)
    const url = window.location.href

    return (
        <Link
            className={`flex-initial flex items-center ${!expanded && 'justify-center'} gap-2 rounded-lg p-2 cursor-pointer hover:bg-white/10 ${(url.startsWith(menuItem.link)) && 'bg-white/10'}`}
            href={menuItem.link} as={'button'}>
            <Icon className={'size-5 lg:size-8 text-white flex justify-center items-center'}>
                {menuItem.icon}
            </Icon>
            {
                expanded &&
                <Title className={'max-lg:hidden text-white'} level={'title-md'}>{menuItem.name}</Title>
            }
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
