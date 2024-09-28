import AuthLayout from "@/Layouts/AuthLayout.tsx";
import SidebarMenu, {MenuItem} from "@/Components/organisms/SidebarMenu";
import {ArrowBigLeft, GraduationCap, Apple} from 'lucide-react'
import Group from "@/src/models/Group";
import Surface from "@/Components/atoms/Surface";
import Heading from "@/Components/atoms/Heading";
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/shadcn/ui/tabs'
import Avatar from "@/Components/atoms/Avatar";
import Title from "@/Components/atoms/Title";
import {DataTable} from "@/Components/molecules/DataTable";
import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import User from "@/src/models/User";
import {Button} from "@/shadcn/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/shadcn/ui/dialog";
import React from "react";
import SelectionDataTable from "@/Components/molecules/SelectionDataTable";
import {Checkbox} from "@/shadcn/ui/checkbox";
import {map, z} from "zod";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {enqueueSnackbar} from "notistack";
import {route} from "ziggy-js";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/shadcn/ui/tooltip";
import {Icon} from "@/Components/atoms/Icon.tsx";
import App from "@inertiajs/react/types/App";


interface ShowProps {
    group: Group,
    students: User[]
}

const Show = ({group, students}: ShowProps) => {
    return (
        <AuthLayout title={'Grupo'} sidebar={<SidebarMenu menu={menu}/>}>
            <div className={'p-6'}>
                <Surface className={'p-6 pb-0'}>
                    <Heading level={'h2'}>{group.name}</Heading>
                    <Tabs className={'relative mt-5'} defaultValue={'info'}>
                        <TabsList>
                            <TabsTrigger className={'min-w-32'} value={'info'}>Información</TabsTrigger>
                            <TabsTrigger className={'min-w-32'} value={'members'}>Miembros</TabsTrigger>
                        </TabsList>

                        <div className={'h-6 w-6 relative top-12 w-full'}>
                            <TabsContent value={'info'}>
                                <InfoSection group={group}/>
                            </TabsContent>

                            <TabsContent value={'members'}>
                                <MembersSection group={group} students={students}/>
                            </TabsContent>
                        </div>
                    </Tabs>
                </Surface>
            </div>
        </AuthLayout>
    )
}

const InfoSection = ({group}: { group: Group }) => {

    return (
        <Surface className={'p-6 space-y-3'}>

            <Title>Administrador de grupo</Title>
            <div className={'flex gap-4'}>
                <Avatar picture={group.owner.profile?.picture_url}
                        className={'h-auto aspect-square basis-1/12 flex-none'}/>
            </div>

        </Surface>
    )
}

const MembersSection = ({group, students}: { group: Group, students: User[] }) => {

    const [openAddMemberDialog, setOpenAddMemberDialog] = React.useState<boolean>(false)
    const [openRemoveMemberDialog, setOpenRemoveMemberDialog] = React.useState<boolean>(false)

    return (
        <Surface className={'p-6'}>
            <div className={'grid grid-cols-4 gap-6'}>
                <div className={'col-span-3'}>
                    <DataTable columns={MembersColumns} data={group.members}/>
                </div>
                <div className={'col-span-1 space-y-4'}>
                    <div className={'space-y-3 border rounded-lg p-3'}>
                        <Title>Agregar nuevos miembros</Title>
                        <div className={'flex justify-end'}>
                            <AddMemberDialog group={group} open={openAddMemberDialog}
                                             onOpenChange={setOpenAddMemberDialog} students={students}/>
                            <Button onClick={() => setOpenAddMemberDialog(true)}>Agregar</Button>
                        </div>
                    </div>

                    <div className={'space-y-3 border rounded-lg p-3'}>
                        <Title>Remover miembros</Title>
                        <div className={'flex justify-end'}>
                            <RemoveMemberDialog group={group} open={openRemoveMemberDialog}
                                             onOpenChange={setOpenRemoveMemberDialog} students={students}/>
                            <Button variant={'destructive'} onClick={() => setOpenRemoveMemberDialog(true)}>Remover</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Surface>
    )
}

const AddMemberDialog = ({group, students, open, onOpenChange}: {
    group: Group,
    students: User[],
    open: boolean,
    onOpenChange: (boolean) => void
}) => {

    const {isProcessing, router} = useInertiaSubmit()

    const onSubmitNewMembers = (newMembers: User[]) => {
        try {

            const values = AddMembersSchema.parse({
                group_id: group.id,
                new_members: newMembers.map((user) => user.id),
            })

            const endpoint = route('groups.addMembers', {group: group.id})

            router.patch(endpoint, values, {

                onError: errors => {enqueueSnackbar('No se pudieron agregar los usuarios seleccionados.', {variant: "error"})},
                onSuccess: page => router.reload()
            })
        } catch (e: Error) {
            console.error(e)
            enqueueSnackbar('No se pudieron agregar los usuarios seleccionados.', {variant: "error"})
        }

    }

    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogContent className={'min-w-[1200px]'}>
                <DialogHeader>
                    <DialogTitle>Agregar nuevos miembros</DialogTitle>
                    <DialogDescription>Selecciona usuarios que desees agregar al grupo.</DialogDescription>
                    <div>
                        <SelectionDataTable columns={AddMembersColumns} data={students} onSubmitSelected={(members) => onSubmitNewMembers(members)}/>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const AddMembersSchema = z.object({
    group_id: z.string(),
    new_members: z.array(z.string().uuid()),
})

const RemoveMemberDialog = ({group, open, onOpenChange}: {
    group: Group,
    open: boolean,
    onOpenChange: (boolean) => void
}) => {

    const {isProcessing, router} = useInertiaSubmit()

    const onSubmitMembers = (members: User[]) => {
        try {

            const values = RemoveMembersSchema.parse({
                group_id: group.id,
                members: members.map((user) => user.id),
            })

            const endpoint = route('groups.removeMembers', {group: group.id})

            router.patch(endpoint, {...values}, {
                onError: errors => {enqueueSnackbar('No se removieron los usuarios seleccionados.', {variant: "error"})},
                onSuccess: page => router.reload()
            })
        } catch (e: Error) {
            console.error(e)
            enqueueSnackbar('No se removieron los usuarios seleccionados.', {variant: "error"})
        }
    }

    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogContent className={'min-w-[1200px]'}>
                <DialogHeader>
                    <DialogTitle>Remover miembros</DialogTitle>
                    <DialogDescription>Selecciona usuarios que desees remover del grupo.</DialogDescription>
                    <div>
                        <SelectionDataTable columns={AddMembersColumns} data={group.members.filter(user => user.id !== group.owner.id)} onSubmitSelected={(members) => onSubmitMembers(members)}/>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const RemoveMembersSchema = z.object({
    group_id: z.string(),
    members: z.array(z.string().uuid()),
})

const columnHelper = createColumnHelper<User>()

const AddMembersColumns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    columnHelper.accessor((row: User) => row.profile?.cedula, {
        id: 'cedula',
        header: 'Cédula',
    }),
    columnHelper.accessor((row: User) => row.name, {
        id: 'username',
        header: 'Usuario',
    }),
    columnHelper.accessor((row: User) => row.email, {
        id: 'email',
        header: 'Correo Electrónico',
    }),
    columnHelper.accessor((row: User) => row.profile?.nombres, {
        id: 'firstName',
        header: 'Nombre',
    }),
    columnHelper.accessor((row: User) => row.profile?.apellidos, {
        id: 'lastName',
        header: 'Apellido',
    }),
]

const roles: Map<number, string> = new Map([
    [0, 'admin'],
    [1, 'admision'],
    [2, 'profesor'],
    [3, 'estudiante']
]) satisfies Map<number, string> as const


const MembersColumns = [
    columnHelper.accessor((row: User) => row.role, {
        id: 'role',
        header: 'Rol',
        cell: props => {

            const description = roles.get(props.row.original.role)

            let icon // TODO change this misery

            switch (props.row.original.role) {
                case 2:
                    icon = (<Apple />)
                    break
                case 3:
                    icon = (<GraduationCap />)
                    break
                default:
                    break
            }

            return (
                <Tooltip>
                    <TooltipTrigger>
                        <Icon className={'size-4'}>
                            {
                                icon
                            }
                        </Icon>
                    </TooltipTrigger>
                    <TooltipContent>
                        {description}
                    </TooltipContent>
                </Tooltip>
            )
        }
    }),
    columnHelper.accessor((row: User) => row.name, {
        id: 'username',
        header: 'Usuario',
    }),
    columnHelper.accessor((row: User) => row.email, {
        id: 'email',
        header: 'Correo Electrónico',
    }),
    columnHelper.accessor((row: User) => row.profile?.nombres, {
        id: 'firstName',
        header: 'Nombre',
    }),
    columnHelper.accessor((row: User) => row.profile?.apellidos, {
        id: 'lastName',
        header: 'Apellido',
    }),
] as const

const menu = [
    {icon: <ArrowBigLeft/>, link: "groups.index", name: "Volver"}
] satisfies MenuItem[] as const

export default Show
