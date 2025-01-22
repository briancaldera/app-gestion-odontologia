import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
} from "@/shadcn/ui/sidebar"
import {BookOpen, CircleHelp, ClipboardList, Cross, Info, LayoutDashboard, Lock, User, Users} from "lucide-react";
import {Link, usePage} from "@inertiajs/react";
import {route} from "ziggy-js";
import Logo from "@/Components/atoms/Logo.tsx";
import Title from "@/Components/atoms/Title";
import React from "react";
import {usePermission} from "@/src/Utils/Utils.ts";

export function AppSidebar() {
    const {user} = usePage().props.auth
    const can = usePermission()

    const clinicaMenu: MenuItem[] = []
    const systemMenu: MenuItem[] = []
    const escuelaMenu: MenuItem[] = []

    if (can('pacientes-read') || can('pacientes-full-control')) {
        clinicaMenu.push(
            {title: 'Pacientes', icon: Cross, url: route('pacientes.index'), isActiveMatcher: () => route().current('pacientes.*'),}
        )
    }

    if (can('groups-index-all') || can('groups-full-control')) {
        escuelaMenu.push({
            title: "Grupos", icon: Users, url: route('groups.index'), isActiveMatcher: () => route().current('groups.*')
        })
    }

    if (can('groups-add-corrections')) {
        escuelaMenu.push({
            title: "Estudiantes asignados", icon: Users, url: route('users.group.show', {user: user.id,}),
            isActiveMatcher: () => route().current('users.group.*'),
        })
    }

    if (can('historias-read') || can('historias-full-control')) {
        clinicaMenu.push(
            {title: 'Historias', icon: ClipboardList, url: route('historias.index'), isActiveMatcher: () => route().current('historias.*'),}
        )
    }

    if (can('users-index-all') || can('users-full-control')) {
        systemMenu.push({
            title: "Usuarios", icon: User, url: route('profile.index'), isActiveMatcher: () => route().current('profile.index')
        })
    }

    if (can('system-add-users-codes')) {
        systemMenu.push({
            title: "Acceso", icon: Lock, url: route('users.codes.index'), isActiveMatcher: () => route().current('users.codes.*')
        })
    }

    if (can('academic-terms-full-control')) {
        escuelaMenu.push({
            title: "Periodos", icon: BookOpen, url: route('academics.dashboard'), isActiveMatcher: () => route().current('academics.*')
        })
    }

    // if (can('homeworks-read') || can('homeworks-full-control')) {
    //     escuelaMenu.push({
    //         title: "Entregas", icon: BookOpenText, url: route('entregas.index')
    //     })
    // }

    return (
        <Sidebar collapsible='icon' className={'z-50'}>
            <SidebarHeader>
                <Link href={route('dashboard')}
                      className={'overflow-hidden flex items-center gap-x-2 items-center hidden lg:flex'}>
                    <Logo className={'basis-14'}/>
                    <div
                        className={'group-data-[state=open]:flex flex-1 flex-col group-data-[collapsible=icon]:hidden'}>
                        <Title className={'text-white'} level='title-lg'>UGMA</Title>
                        <Title className={'text-white font-light'}>Facultad de Odontología</Title>
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupLabel>Panel</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key='dashboard'>
                                <SidebarMenuButton asChild isActive={route().current('dashboard')}>
                                    <Link href={route('dashboard')}>
                                        <LayoutDashboard/>
                                        <span>Panel de control</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Clínica</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                clinicaMenu.map(toMenuItem)
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {
                    systemMenu.length > 0 && (
                        <SidebarGroup>
                            <SidebarGroupLabel>Sistema</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {
                                        systemMenu.map((item) => toMenuItem(item))
                                    }
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    )
                }

                {
                    escuelaMenu.length > 0 && (
                        <SidebarGroup>
                            <SidebarGroupLabel>Escuela</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {
                                        escuelaMenu.map((item) => toMenuItem(item))
                                    }
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    )
                }

                <SidebarSeparator/>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                helpItems.map((item) => toMenuItem(item))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

function toMenuItem(menuItem: MenuItem) {
    return (
        <SidebarMenuItem key={menuItem.title}>
            <SidebarMenuButton asChild isActive={(menuItem.isActiveMatcher ? menuItem.isActiveMatcher() : false)}>
                <Link href={menuItem.url}>
                    <menuItem.icon/>
                    <span>{menuItem.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

type MenuItem = {
    title: string
    url: string
    icon: any
    isActiveMatcher?: () => boolean
}

const helpItems: MenuItem[] = [
    {
        title: "Soporte",
        url: "#",
        icon: CircleHelp,
    },
    {
        title: "Información",
        url: "#",
        icon: Info,
    }
]
