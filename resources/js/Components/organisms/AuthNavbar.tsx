import {Link, router, usePage} from "@inertiajs/react";
import Avatar from "@/Components/atoms/Avatar.jsx";
import {route, useRoute} from 'ziggy-js'
import Dropdown from "@/Components/molecules/Dropdown.jsx";
import React, {Fragment} from "react";
import Switch from "@/Components/atoms/Switch.jsx";
import {MoonIcon, SunIcon} from "@heroicons/react/24/outline"
import {AuthContext} from "@/Layouts/AuthLayout.js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'
import {Icon} from "@/Components/atoms/Icon.tsx";
import {Bell, EllipsisVertical, Users, House, Search} from 'lucide-react'
import {ScrollArea} from '@/shadcn/ui/scroll-area'
import Title from "@/Components/atoms/Title";
import Label from "@/Components/atoms/Label";
import {Text} from "@/Components/atoms/Text";
import {formatRelative} from 'date-fns'
import {Axios} from "axios";
import {Popover, PopoverContent, PopoverTrigger} from '@/shadcn/ui/popover'
import Heading from "@/Components/atoms/Heading";
import User from "@/src/models/User";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shadcn/ui/breadcrumb"
import {Input} from "@/shadcn/ui/input.tsx";


declare const axios: Axios

const AuthNavbar = () => {
    return (
        <div className={'flex-1 flex h-full'}>
            {/*breadcrumbs*/}
            <div className={'px-8 flex-1 flex items-center justify-between'}>
                <Breadcrumbs/>
                <SearchBar/>
            </div>
            {/*auth section*/}
            <AuthSection/>
        </div>
    )
}

const AuthSection = () => {

    const {isDarkMode, toggleDarkMode} = React.useContext(AuthContext)
    const {auth: {user}}: {auth: {user: User}} = usePage().props

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
            const { data, status } = await axios.get(route('notifications.index'))
            if (!ignore && status === 200) {
                setNotifications(data)
            }
        }

        fetchNotifications()

        return () => { ignore = true}
    }, [])

    return (
        <div className={'h-full flex justify-center items-center px-8 gap-4 relative'}>
            <Popover>
                <PopoverTrigger>
                    <div className={'relative rounded-full p-2'}>
                        <Icon onClick={() => {}}>
                            <Bell />
                        </Icon>
                        {
                            hasUnread && (
                                <div className={'absolute rounded-full bg-red-600 size-2 top-1 right-1 flex items-center justify-center'}>
                                </div>
                            )
                        }

                    </div>
                </PopoverTrigger>
                <PopoverContent align={'end'} className={'w-80'}>
                    <NotificationsSection notifications={notifications}/>
                </PopoverContent>
            </Popover>
            <Dropdown.Container>
                <Dropdown.Trigger>
                    <Avatar picture={user.profile?.picture_url}/>
                </Dropdown.Trigger>

                <Dropdown>
                    <DropdownMenuLabel>
                        <Heading level={'h6'} className={'line-clamp-1 truncate'}>@{user.name}</Heading>
                        <Label className={'text-slate-400 font-medium line-clamp-1 truncate'}>{user.profile?.nombres}</Label>
                        <Label className={'text-slate-400 font-medium line-clamp-1 truncate'}>{user.profile?.apellidos}</Label>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Dropdown.Option href={route("profile.edit")}>Perfil</Dropdown.Option>
                    <Dropdown.StaticOption>
                        <div className={"flex justify-between items-center gap-4"}>
                            Modo Oscuro
                            <Switch checked={isDarkMode} onClick={() => toggleDarkMode(value => !value)}  iconOn={<MoonIcon/>} iconOff={<SunIcon/>}/>
                        </div>
                    </Dropdown.StaticOption>
                    <hr/>
                    <Dropdown.Option onClick={handleLogout}>Cerrar Sesión</Dropdown.Option>
                </Dropdown>
            </Dropdown.Container>
        </div>
    )
}

interface Notification {
    id: string,
    created_at: string,
    data: string,
    notifiable_id: string,
    notifiable_type: string,
    read_at: string | null,
    type: string,
    updated_at: string,
}

const NotificationsSection = ({notifications}: {notifications: Notification[]}) => {

    const now: Date = React.useMemo(() => new Date(), [])

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
                                    <DefaultNotification notification={notification} key={index} now={now} />
                                ))}
                            </ScrollArea>
                        </div>
                    ) : (
                        <div className={'h-20 w-96 flex justify-center items-center'}>
                            <Text level={'body-sm'} className={'text-slate-400 flex-none'}>
                                Yupi! No hay notificaciones
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

const DefaultNotification = ({notification, now}: {notification: Notification, now: Date}) => {

    const [state, dispatch]: [{isRead: boolean}] = React.useReducer(isReadReducer, {isRead: (notification.read_at !== null)})

    const onMarkAsRead = async () => {
        const {status} = await axios.patch(route('notifications.markAsRead', {id: notification.id}))
        if (status === 200) {
            // TODO find proper way
            // dirty hack... props should be immutable
            notification.read_at = new Date().toString()
            dispatch({type: 'markAsRead'})
        }
    }

    return (
        <div>
            <div className={'w-full h-[100px] border flex flex-col'}>
                {/*header*/}
                <div className={'flex-none self-end pe-3 pt-2'}>
                    <Text level={'body-xs'} className={'text-slate-400'}>
                        {formatRelative(notification.created_at, now)}
                    </Text>
                </div>
                {/*content*/}
                <div className={'flex-1 flex'}>
                    <div className={'basis-1/5 flex items-start justify-center pt-2'}>
                        <div className={'relative bg-white p-2 rounded-full border flex-none'}>
                            <Icon>
                                <Users/>
                            </Icon>
                            {
                                (!state.isRead) && (
                                    <div
                                        className={'absolute rounded-full bg-red-600 size-2 -top-1 -left-1 flex items-center justify-center'}>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                    <div className={'basis-4/5 pt-2'}>
                        <Title level={'title-sm'}>
                            Has sido agregado a un grupo!
                        </Title>
                    </div>
                    <div className={'flex-none'}>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Icon>
                                    <EllipsisVertical />
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
        </div>
    )
}

const Breadcrumbs = () => {

    const url = usePage().url
    const urlArray = url.split('/').filter(segment => segment !== 'dashboard' && segment !== '')
    const breadcrumbStack = []

    // second level
    const level2: {name: string, link: string}[] = [
        {name: 'Pacientes', link: route('pacientes.index') },
        {name: 'Historias', link: route('historias.index') },
        {name: 'Grupos', link: route('groups.index') },
        {name: 'Mi Perfil', link: route('profile.edit') },
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
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild><Link href={route('dashboard')}><Icon><House/></Icon></Link></BreadcrumbLink>
                </BreadcrumbItem>
                {
                    breadcrumbStack
                }
            </BreadcrumbList>
        </Breadcrumb>

    )
}

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = React.useState('')

    return (
        <div className={'w-80 flex items-center gap-2 border rounded-lg pr-2'}>
            <Input className={'border-0'} placeholder={'Buscar...'} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <Icon className={'flex-none'}>
                <Search/>
            </Icon>
        </div>
    )
}

export default AuthNavbar
