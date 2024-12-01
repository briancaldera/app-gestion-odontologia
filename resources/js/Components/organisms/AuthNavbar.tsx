import {Link, router, usePage} from "@inertiajs/react";
import Avatar from "@/Components/atoms/Avatar.jsx";
import {route, useRoute} from 'ziggy-js'
import React, {Fragment} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'
import {Icon} from "@/Components/atoms/Icon.tsx";
import {Bell, ChevronDown, ChevronUp, EllipsisVertical, House, Search} from 'lucide-react'
import {ScrollArea} from '@/shadcn/ui/scroll-area'
import Title from "@/Components/atoms/Title";
import Label from "@/Components/atoms/Label";
import {Text} from "@/Components/atoms/Text";
import {formatDistanceToNow} from 'date-fns'
import {Axios} from "axios";
import {Popover, PopoverContent, PopoverTrigger} from '@/shadcn/ui/popover'
import Heading from "@/Components/atoms/Heading";
import User from "@/src/models/User";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator,} from "@/shadcn/ui/breadcrumb"
import {Input} from "@/shadcn/ui/input.tsx";
import {Separator} from "@/shadcn/ui/separator.tsx";
import {Switch} from "@/shadcn/ui/switch"
import {SidebarTrigger, useSidebar} from "@/shadcn/ui/sidebar.tsx";
import {BaseContext} from "@/Layouts/BaseLayout.tsx";
import {cn} from "@/lib/utils.ts";

declare const axios: Axios

const AuthNavbar = () => {

    const {open} = useSidebar()

    return (
        <nav
            className={`fixed z-40 inset-x-0 top-0 bg-white dark:bg-slate-950 h-14 sm:h-20 ${open ? 'lg:pl-[18rem]' : 'lg:pl-[3rem]'} flex justify-end`}>
            <div className={'flex-1 flex h-full'}>
                {/*breadcrumbs*/}
                <div className={'px-8 flex-1 flex items-center gap-x-6'}>
                    <Icon>
                        <SidebarTrigger/>
                    </Icon>
                    <Breadcrumbs/>
                    <SearchBar className='ml-auto'/>
                </div>
                {/*auth section*/}
                <AuthSection/>
            </div>
        </nav>
    )
}

const AuthSection = () => {

    const [openAuthDropdown, setOpenAuthDropdown] = React.useState<boolean>(false)

    const {isDarkMode, toggleDarkMode} = React.useContext(BaseContext)
    const {auth: {user}}: { auth: { user: User } } = usePage().props

    const [notifications, setNotifications] = React.useState<Notification[]>([])

    const route = useRoute()

    const handleLogout = async () => {
        router.post(route('logout'), {}, {preserveState: false, replace: true})
    }

    const hasUnread: boolean = React.useMemo(() => notifications.some(item => item.read_at === null), [notifications])

    // Get notifications
    React.useEffect(() => {
        let ignore = false

        const fetchNotifications = async () => {
            const {data, status} = await axios.get(route('api.v1.notifications.index'))
            if (!ignore && status === 200) {
                setNotifications(data)
            }
        }

        fetchNotifications()

        return () => {
            ignore = true
        }
    }, [])

    return (
        <div className={'h-full flex justify-center items-center px-8 gap-4 relative py-4'}>

            <Separator orientation={'vertical'}/>

            <Popover>
                <PopoverTrigger>
                    <div className={'relative rounded-full p-2'}>
                        <Icon onClick={() => {
                        }}>
                            <Bell/>
                        </Icon>
                        {
                            hasUnread && (
                                <div
                                    className={'absolute rounded-full bg-red-600 size-2 top-1 right-1 flex items-center justify-center'}>
                                </div>
                            )
                        }

                    </div>
                </PopoverTrigger>
                <PopoverContent align={'end'} className={'w-80'}>
                    <NotificationsSection notifications={notifications}/>
                </PopoverContent>
            </Popover>

            <Separator orientation={'vertical'}/>

            <DropdownMenu open={openAuthDropdown} onOpenChange={setOpenAuthDropdown}>
                <DropdownMenuTrigger>
                    <div className={'flex gap-x-3 items-center'}>
                        <Avatar picture={user.profile?.picture_url}/>
                        <div className={'flex flex-col'}>
                            <Text level={'body-xs'}>@{user.name}</Text>
                            <Text level={'body-xs'}
                                  className={'text-slate-400 font-medium line-clamp-1 truncate capitalize text-left'}>{user.role}</Text>
                        </div>
                        <Icon>
                            {
                                openAuthDropdown ? <ChevronUp/> : <ChevronDown/>
                            }
                        </Icon>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <Heading level={'h6'} className={'line-clamp-1 truncate'}>@{user.name}</Heading>
                        <Label
                            className={'text-slate-400 font-medium line-clamp-1 truncate'}>{user.profile?.nombres}</Label>
                        <Label
                            className={'text-slate-400 font-medium line-clamp-1 truncate'}>{user.profile?.apellidos}</Label>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem asChild><Link href={route("profile.edit")}>Perfil</Link></DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}
                                      className={"flex justify-between items-center gap-4"}>
                        Modo Oscuro
                        <Switch checked={isDarkMode} onCheckedChange={() => toggleDarkMode()}/>
                    </DropdownMenuItem>
                    <hr/>
                    <DropdownMenuItem onClick={handleLogout}>Cerrar Sesión</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

interface Notification {
    id: string,
    created_at: string,
    data: { message: string, url: string | null },
    notifiable_id: string,
    notifiable_type: string,
    read_at: string | null,
    type: string,
    updated_at: string,
}

const NotificationsSection = ({notifications}: { notifications: Notification[] }) => {

    return (
        <>
            <header className={'flex justify-between items-center'}>
                <div>
                    <Title level={'title-md'}>Notificaciones</Title>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Icon>
                                <EllipsisVertical className={'size-5'}/>
                            </Icon>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={'end'}>

                        </DropdownMenuContent>
                    </DropdownMenu>


                </div>
            </header>

            <div>
                {
                    (notifications.length) ? (
                        <div>
                            <ScrollArea className={'h-[300px] w-72'}>
                                {notifications.map((notification, index) => (
                                    <DefaultNotification notification={notification} key={notification.id}/>
                                ))}
                            </ScrollArea>
                        </div>
                    ) : (
                        <div className={'h-20 flex justify-center items-center'}>
                            <Text level={'body-sm'} className={'text-slate-400 flex-none'}>
                                No hay notificaciones
                            </Text>
                        </div>
                    )
                }
            </div>
        </>
    )
}

const isReadReducer = (state, action) => {
    if (action.type === 'markAsRead') {
        return {isRead: true}
    }
}

const DefaultNotification = ({notification}: { notification: Notification }) => {

    const [state, dispatch]: [{
        isRead: boolean
    }] = React.useReducer(isReadReducer, {isRead: (notification.read_at !== null)})

    const onMarkAsRead = async () => {
        const {status} = await axios.patch(route('api.v1.notifications.markAsRead', {id: notification.id}))
        if (status === 200) {
            // TODO find proper way
            // dirty hack... props should be immutable
            notification.read_at = new Date().toString()
            dispatch({type: 'markAsRead'})
        }
    }

    const onClickNoti = async (url: string) => {
        try {
            await axios.patch(route('api.v1.notifications.markAsRead', {id: notification.id}))
        } catch (e) {

        } finally {
            router.get(url)
        }
    }

    return (
        <div className={'w-full h-[100px] border flex flex-col'}>
            {/*header*/}
            <div className={'flex-none basis-1/5 self-end pe-3 pt-2'}>
                <Text level={'body-xs'} className={'text-slate-400'}>
                    Hace {formatDistanceToNow(notification.created_at)}
                </Text>
            </div>
            {/*content*/}
            <div className={'flex-1 flex'} onClick={() => notification.data.url && onClickNoti(notification.data.url)}>
                <div className={'basis-1/5 flex-none items-center justify-center pt-2'}>
                    <div
                        className={'relative bg-white p-2 rounded-full flex-none flex items-center justify-center'}>

                        <Icon>
                            <Bell/>
                        </Icon>
                        {
                            (!state.isRead) && (
                                <div
                                    className={'absolute rounded-full bg-red-600 size-2 -top-1 left-2 flex items-center justify-center'}>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={'basis-4/5 flex-none pt-2'}>
                    <Title level={'title-sm line-clamp-2 break-all'}>
                        {notification.data.message}
                    </Title>
                </div>
                <div className={'flex-none'}>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Icon>
                                <EllipsisVertical/>
                            </Icon>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                            {(!state.isRead) && (
                                <DropdownMenuItem onClick={onMarkAsRead}>
                                    <Text>
                                        Marcar como leído
                                    </Text>
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

const Breadcrumbs = () => {

    const url = usePage().url
    const urlArray = url.split('/').filter(segment => segment !== 'dashboard' && segment !== '')
    const breadcrumbStack = []

    // second level
    const level2: { name: string, link: string }[] = [
        {name: 'Pacientes', link: route('pacientes.index')},
        {name: 'Historias', link: route('historias.index')},
        {name: 'Grupos', link: route('groups.index')},
        {name: 'Mi Perfil', link: route('profile.edit')},
    ]

    if (urlArray[0]) {
        const element = level2.find(element => element.name.toLowerCase() === urlArray[0])
        element && breadcrumbStack.push((
            <Fragment key={element.link}>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={element.link}>
                            {element.name}
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Fragment>
        ))
    }


    return (
        <Breadcrumb className='max-sm:hidden'>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild><Link
                        href={route('dashboard')}><Icon><House/></Icon></Link></BreadcrumbLink>
                </BreadcrumbItem>
                {
                    breadcrumbStack
                }
            </BreadcrumbList>
        </Breadcrumb>

    )
}

const SearchBar = ({className}: { className?: string }) => {
    const [searchTerm, setSearchTerm] = React.useState('')

    return (
        <div
            className={cn('hidden sm:flex w-80 items-center gap-2 border rounded-full pr-2 bg-indigo-50 px-2', className)}>
            <Icon className={'flex-none'}>
                <Search/>
            </Icon>
            <Input className={'border-0 bg-transparent rounded-full'} placeholder={'Buscar...'} value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
    )
}

export default AuthNavbar
