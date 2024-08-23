import {router, usePage} from "@inertiajs/react";
import Avatar from "@/Components/atoms/Avatar.jsx";
import {useRoute} from 'ziggy-js'
import Dropdown from "@/Components/molecules/Dropdown.jsx";
import React from "react";
import Switch from "@/Components/atoms/Switch.jsx";
import {MoonIcon, SunIcon} from "@heroicons/react/24/outline"
import {AuthContext} from "@/Layouts/AuthLayout.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'
import {Icon} from "@/Components/atoms/Icon";
import {Bell, EllipsisVertical, Users} from 'lucide-react'
import {ScrollArea} from '@/shadcn/ui/scroll-area'
import Title from "@/Components/atoms/Title";
import Label from "@/Components/atoms/Label";
import {Text} from "@/Components/atoms/Text";
import {toDate, formatRelative} from 'date-fns'

const AuthNavbar = () => {
    return (
        <div className={'flex sm:flex-row-reverse h-full'}>
            {/*auth section*/}
            <AuthSection/>
        </div>
    )
}

const AuthSection = () => {

    const {isDarkMode, toggleDarkMode} = React.useContext(AuthContext)
    const {auth: {user}, notifications}: {notifications: Notification[]} = usePage().props

    const route = useRoute()

    const handleLogout = async () => {
        router.post(route('logout'), {}, {preserveState: false, replace: true})
    }

    const hasUnread: boolean = React.useMemo(() => notifications.some(item => item.read_at === null), [notifications])

    return (
        <div className={'h-full flex justify-center items-center px-8 gap-4 relative'}>
            <DropdownMenu>
                <DropdownMenuTrigger>
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
                </DropdownMenuTrigger>
                <DropdownMenuContent align={'end'} sideOffset={30} className={''}>
                    <NotificationsSection />
                </DropdownMenuContent>
            </DropdownMenu>
            <Dropdown.Container>
                <Dropdown.Trigger>
                    <Avatar picture={user.profile.picture_url}/>
                </Dropdown.Trigger>

                <Dropdown>

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

const NotificationsSection = () => {
    const {notifications}: {notifications: Notification[]} = usePage().props

    const now: Date = React.useMemo(() => new Date(), [])

    return (
        <>
            <header className={'flex justify-between items-center'}>
                <DropdownMenuLabel>
                    <Title level={'title-md'}>Notificaciones</Title>
                </DropdownMenuLabel>
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
                        <div className={''}>
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

const DefaultNotification = ({notification, key, now}: {notification: Notification, key: number, now: Date}) => {


    return (
        <DropdownMenuItem key={key} className={'p-0'}>
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
                                (!notification.read_at) && (
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
                                    <EllipsisVertical className={'size-4'}/>
                                </Icon>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align={'end'}>
                                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                                {(!notification.read_at) && (
                                    <DropdownMenuItem>
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
        </DropdownMenuItem>
    )
}

export default AuthNavbar
