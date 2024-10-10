import AuthLayout from "@/Layouts/AuthLayout.tsx";
import type Historia from "@/src/models/Historia.ts";
import {Status} from "@/src/models/Historia.ts";
import {Lock, LockOpen, PencilLine} from 'lucide-react'
import HistoriaEditor from "@/Components/organisms/HistoriaEditor.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {Homework} from "@/src/models/Group.ts";
import {usePermission} from "@/src/Utils/Utils.ts";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/shadcn/ui/hover-card.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Link, usePage} from "@inertiajs/react";
import User from "@/src/models/User.ts";

type ShowProps = {
    historia: Historia
    homework?: Homework
}

const Show = ({historia, homework}: ShowProps) => {

    const {auth: {user}} = usePage().props as {auth: {user: User}}

    const can = usePermission()

    const canCreateCorrections = can('corrections-create')
    const canUpdateHistoria = can('historias-update') && (historia.status === Status.ABIERTA || historia.status === Status.CORRECCION) && historia.autor_id === user?.id

    // Show my marvelous HCE here
    return (
        <AuthLayout title={`Historia: ${historia.paciente?.nombre} ${historia.paciente?.apellido}`}>
            <ScrollArea className={'h-full'}>
                <div className={'px-6 py-2 pr-0 flex'}>
                    <div className={'basis-full'}>
                        <HistoriaEditor historia={historia} readMode={true} homework={homework}
                                        canCreateCorrections={canCreateCorrections}/>
                    </div>
                    {/*Sidebar for additional actions/options*/}
                    <div className={'basis-16 flex flex-col px-2 gap-y-1'}>
                        {
                             canUpdateHistoria && (
                                <Button className={'w-full aspect-square h-auto'} asChild>
                                    <Link href={route('historias.edit', {historia: historia.id})}>
                                        <PencilLine/>
                                    </Link>
                                </Button>
                            )
                        }
                        <StatusCard historia={historia}/>
                    </div>
                </div>
            </ScrollArea>
        </AuthLayout>
    )
}

const StatusCard = ({historia}: { historia: Historia }) => {
    let cardColor = ''

    const isOpen = historia.status === Status.ABIERTA || historia.status === Status.CORRECCION

    switch (historia.status) {
        case Status.ABIERTA:
            cardColor = 'emerald'
            break
        case Status.ENTREGADA:
            cardColor = 'sky'
            break
        case Status.CORRECCION:
            cardColor = 'rose'
            break
        case Status.CERRADA:
            cardColor = 'slate'
            break
    }

    return (
        <HoverCard>
            <HoverCardTrigger>
                <div className={`flex justify-center items-center aspect-square border border-${cardColor}-300 rounded-lg bg-${cardColor}-200`}>
                    {
                        isOpen ? (<LockOpen className={`text-${cardColor}-800`}/>) : (
                            <Lock className={`text-${cardColor}-800`}/>)
                    }
                </div>
            </HoverCardTrigger>
            <HoverCardContent align={"end"} side={"left"}>
                <div>Informacion:</div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default Show
