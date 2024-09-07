import AuthLayout from "@/Layouts/AuthLayout.tsx";
import Group from "@/src/models/Group.ts";
import SidebarMenu, {type MenuItem} from "@/Components/organisms/SidebarMenu.tsx";
import {LayoutDashboard, Users} from "lucide-react";
import {ClipboardDocumentIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs.tsx";
import {Card, CardContent} from "@/shadcn/ui/card.tsx";
import Title from "@/Components/atoms/Title";
import {Avatar} from "@mui/joy";
import {Separator} from "@/shadcn/ui/separator.tsx";
import {Text} from "@/Components/atoms/Text";
import {Link} from "@inertiajs/react";
import {useRoute} from "ziggy-js";

type ShowProps = {
    readonly group: Group
}

const Show = ({group}: ShowProps) => {
    return (
        <AuthLayout title={'Grupo'} sidebar={<SidebarMenu menu={menu}/>}>
            <div className={'p-6 h-full'}>
                <Tabs className={'w-full'} defaultValue={'members'}>
                    <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
                        <TabsTrigger value="homework">Evaluación</TabsTrigger>
                        <TabsTrigger value="members">Miembros</TabsTrigger>
                    </TabsList>
                    <TabsContent value={'homework'}>
                        <HomeworkTab/>
                    </TabsContent>
                    <TabsContent value={'members'}>
                        <MembersTab group={group}/>
                    </TabsContent>
                </Tabs>
            </div>
        </AuthLayout>
    )
}

const HomeworkTab = () => {
    return (
        <Card>
            <CardContent className={'p-6'}>
            </CardContent>
        </Card>
    )
}

const MembersTab = ({group}: { group: Group }) => {

    const route = useRoute()
    const {owner} = group

    return (
        <Card>
            <CardContent className={'p-6'}>
                <Title level={'title-lg'}>Tutor</Title>
                <Separator className={'my-4'}/>
                <Link href={route('profile.show', {
                    profile: owner.id
                })}>
                    <div className={'flex gap-4'}>
                        <Avatar src={owner.profile?.picture_url}
                                className={'h-auto aspect-square basis-1/12 flex-none'}/>
                        <div className={'flex flex'}>

                            <Text
                                className={'text-lg'}>{`${owner.profile?.nombres ?? ''} ${owner.profile?.apellidos ?? ''}`}</Text>
                            <Text className={'text-lg'}></Text>
                        </div>
                    </div>
                </Link>
            </CardContent>
        </Card>
    )
}

const menu: MenuItem[] = [
    {name: 'Inicio', link: 'dashboard', icon: <LayoutDashboard/>},
    {name: 'Historias', icon: <ClipboardDocumentIcon/>, link: 'historias.dashboard'},
    {icon: <Users/>, link: "groups.index", name: "Grupos"}
] satisfies MenuItem[]

export default Show
