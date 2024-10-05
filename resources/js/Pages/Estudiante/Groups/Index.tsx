import AuthLayout from "@/Layouts/AuthLayout.tsx";
import SidebarMenu, {type MenuItem} from "@/Components/organisms/SidebarMenu.tsx";
import {ClipboardDocumentIcon} from "@heroicons/react/24/outline";
import {LayoutDashboard, Users} from "lucide-react";
import React from "react";
import Group from "@/src/models/Group.ts";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import Heading from "@/Components/atoms/Heading";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {Link} from "@inertiajs/react";
import {Text} from "@/Components/atoms/Text";
import {Avatar} from "@mui/joy";
import {route} from "ziggy-js";

type IndexProps = {
    readonly groups: Group[]
}

const Index = ({groups}: IndexProps) => {

    console.log(groups)
    return (
        <AuthLayout title={'Grupos'} sidebar={<SidebarMenu menu={menu}/>}>
            <ScrollArea className={'bg-white h-full'}>

                <div className={'p-6 grid grid-cols-4 grid-rows-2 gap-6 basis-full'}>
                    <Surface className={'p-6 col-span-4 lg:col-span-3 row-span-2 flex flex-col gap-4'}>
                        <Heading level={'h3'}>Grupos</Heading>

                        <ScrollArea className={'basis-full'}>
                            <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pr-3'}>
                                {groups.map(group => (<GroupItem key={group.id} group={group}/>))}
                            </div>
                        </ScrollArea>

                    </Surface>
                </div>
            </ScrollArea>
        </AuthLayout>
    )
}

const GroupItem = ({group}: { group: Group }) => {
    return (
        <Link href={route('groups.show', {group: group.id})}>
            <div className={'aspect-square border border-gray-300 rounded-lg overflow-hidden flex flex-col bg-white'}>
                <div className={'basis-2/5 bg-gradient-to-r from-sky-500 to-indigo-500 relative flex flex-col p-4'}>
                    <Title level={'title-lg'} className={'text-white dark:text-white truncate'}>{group.name}</Title>
                    <Text level={'body-sm'}
                          className={'text-white dark:text-white truncate'}>{group.owner.profile?.nombres}</Text>
                </div>
                <div className={'relative'}>
                    <div
                        className={'origin-center rounded-full bg-white w-1/4 aspect-square absolute right-2/3 -translate-y-1/2 overflow-hidden bg-sky-200 flex justify-center items-center'}>
                        <Avatar src={group.owner.profile?.picture_url}
                                className={'text-white text-4xl font-bold size-full bg-transparent border-white border-4'}>{group.owner.profile?.nombres[0] ?? ''}</Avatar>
                    </div>
                </div>
                <div className={'basis-3/5 flex flex-col'}>
                    <div className={'basis-2/3'}>

                    </div>


                    <div className={'basis-1/3 border border-x-0 border-b-0 border-gray-300'}>

                    </div>
                </div>
            </div>
        </Link>
    )
}

const menu: readonly MenuItem[] = [
    {name: 'Inicio', link: 'dashboard', icon: <LayoutDashboard/>},
    {name: 'Historias', icon: <ClipboardDocumentIcon/>, link: 'historias.dashboard'},
    {icon: <Users/>, link: "groups.index", name: "Grupos"}
] satisfies MenuItem[]

export default Index
