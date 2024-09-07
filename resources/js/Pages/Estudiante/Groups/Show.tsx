import AuthLayout from "@/Layouts/AuthLayout.tsx";
import Group from "@/src/models/Group.ts";
import SidebarMenu, {type MenuItem} from "@/Components/organisms/SidebarMenu.tsx";
import {CheckCircle, LayoutDashboard, Users} from "lucide-react";
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
import {format} from 'date-fns'
import Historia from "@/src/models/Historia.ts";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/shadcn/ui/dialog.tsx'
import {Button} from "@/shadcn/ui/button.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import Surface from "@/Components/atoms/Surface";

type ShowProps = {
    readonly group: Group
    readonly historias: Historia[]
}

const Show = ({group, historias}: ShowProps) => {

    console.log(historias)
    return (
        <AuthLayout title={'Grupo'} sidebar={<SidebarMenu menu={menu}/>}>
            <div className={'p-6 h-full space-y-4'}>
                <Card className={'h-32'}>
                    <CardContent className={'flex flex-col p-4 relative h-full'}>
                        <Title level={'h4'}>{group.name}</Title>
                        <Text level={'body-xs'}
                              className={'text-slate-400 absolute right-4 bottom-4'}>{format(group.created_at, 'PP')}</Text>
                    </CardContent>
                </Card>
                <Tabs className={'w-full'} defaultValue={'homework'}>
                    <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
                        <TabsTrigger value="homework">Evaluación</TabsTrigger>
                        <TabsTrigger value="members">Miembros</TabsTrigger>
                    </TabsList>
                    <TabsContent value={'homework'}>
                        <HomeworkTab historias={historias}/>
                    </TabsContent>
                    <TabsContent value={'members'}>
                        <MembersTab group={group}/>
                    </TabsContent>
                </Tabs>
            </div>
        </AuthLayout>
    )
}

const HomeworkTab = ({historias}: { historias: Historia[] }) => {

    const [openSelectHCEDialog, setOpenSelectHCEDialog] = React.useState<boolean>(true)

    return (
        <Card>
            <CardContent className={'p-6'}>
                <Title>Entregar historia</Title>
                <Text>En esta sección podrás entregar historias a tu tutor para su evaluación. Recuerda que una vez
                    entregada, no podrás realizar cambios a la HCE.</Text>
                <Text>Si el tutor encuentra errores a corregir, habilitará la historia para edición y podras realizar
                    cambios. Una vez hecho esto, debes volver a entregarla.</Text>

            </CardContent>
            <SelectHCEDialog historias={historias} open={openSelectHCEDialog} onOpenChange={setOpenSelectHCEDialog}/>
        </Card>
    )
}

const MembersTab = ({group}: { group: Group }) => {

    const route = useRoute()
    const {owner} = group

    return (
        <Card>
            <CardContent className={'p-6'}>
                <Title level={'title-lg'}>Tutores</Title>
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

const SelectHCEDialog = ({historias, open, onOpenChange}: {
    historias: Historia[],
    open: boolean,
    onOpenChange: (boolean) => void
}) => {

    const route = useRoute()
    const {isProcessing, router} = useInertiaSubmit()
    const form = useForm<z.infer<typeof SelectHCESchema>>({
        resolver: zodResolver(SelectHCESchema),
        defaultValues: {historia_id: ""}
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={'lg:max-w-6xl'}>
                <DialogHeader>
                    <DialogTitle><Title>Seleccione historia</Title></DialogTitle>
                    <DialogDescription>Seleccione la historia que desea entregar</DialogDescription>
                </DialogHeader>
                <div className={'flex flex-col h-96 gap-4'}>
                    <ScrollArea className={'h-full basis-full bg-slate-50 flex flex-col'}>
                        <div className={'grid sm:grid-cols-1 lg:grid-cols-2 p-4 gap-4'}>
                            {
                                historias.map(historia => (
                                    <HistoriaItem key={historia.id} historia={historia}
                                                  selected={(form.getValues().historia_id === historia.id)}
                                                  onSelectItem={(id: string) => form.setValue('historia_id', id, {
                                                      shouldTouch: true,
                                                      shouldDirty: true,
                                                      shouldValidate: true
                                                  })}/>))}
                        </div>
                    </ScrollArea>
                    <div className={'flex-none flex justify-end gap-3'}>
                        <Button variant={'outline'} onClick={() => onOpenChange(false)}>Cancelar</Button>
                        <Button variant={'default'} disabled={isProcessing || !form.formState.isDirty}>Entregar</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const HistoriaItem = ({historia, selected, onSelectItem}: {
    historia: Historia,
    selected: boolean,
    onSelectItem: (id: string) => void
}) => {

    return (
        <div onClick={() => onSelectItem(historia.id)}>
            <Surface className={`h-[100px] flex items-center px-6 gap-4 cursor-pointer relative hover:scale-105 ${selected && 'scale-105'} transition-all`}>
                {selected && <CheckCircle className={'size-4 absolute top-2 right-2 text-emerald-400'}/>}
                <div className={'w-16 flex-none'}>
                    <Avatar className={'w-full h-auto aspect-square'} picture={historia.paciente?.foto_url}/>
                </div>

                <div>
                    <Text>
                        Paciente: {`${historia.paciente?.nombre ?? ''} ${historia.paciente?.apellido ?? ''}`}
                    </Text>
                    <div className={'flex gap-2'}>
                        <Text level={'body-sm'} className={'text-slate-500'}>
                            {historia.paciente?.cedula ?? ''}
                        </Text>
                        <Text level={'body-sm'} className={'text-slate-500'}>
                            Edad: {historia.paciente?.edad}
                        </Text>
                    </div>
                </div>
            </Surface>
        </div>
    )
}


const SelectHCESchema = z.object({
    historia_id: z.string().uuid(),
})

const menu: MenuItem[] = [
    {name: 'Inicio', link: 'dashboard', icon: <LayoutDashboard/>},
    {name: 'Historias', icon: <ClipboardDocumentIcon/>, link: 'historias.dashboard'},
    {icon: <Users/>, link: "groups.index", name: "Grupos"}
] satisfies MenuItem[]

export default Show
