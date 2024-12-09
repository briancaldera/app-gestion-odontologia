import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {mapServerErrorsToFields, usePermission} from "@/src/Utils/Utils.ts";
import Group from "@/src/models/Group.ts";
import User from "@/src/models/User.ts";
import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {formatDate} from "date-fns";
import {Link, router, usePage} from "@inertiajs/react";
import {route, useRoute} from "ziggy-js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shadcn/ui/dropdown-menu.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {EllipsisVertical, MoreHorizontal, Trash2} from "lucide-react";
import React from "react";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/shadcn/ui/dialog.tsx";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Input} from "@/shadcn/ui/input.tsx";
import {Text} from "@/Components/atoms/Text";
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Avatar} from "@mui/joy";
import {DataTable} from "@/Components/molecules/DataTable.tsx";
import {Icon} from "@/Components/atoms/Icon.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/ui/select.tsx";
import ProfileItem from "@/Components/molecules/ProfileItem.tsx";

type IndexProps = {
    assigned_tutors: User[]
    tutors: User[]
}

const Index = ({assigned_tutors, tutors}: IndexProps) => {

    const {user} = usePage().props.auth

    const can = usePermission()

    const [openCreateGroupDialog, setOpenCreateGroupDialog] = React.useState<boolean>(false)

    if (can('groups-index-all') || can('groups-full-control')) {
        return (
            <AuthLayout title='Grupos'>
                <div className='h-full flex flex-col bg-white p-4'>
                    <Title>Grupos</Title>
                    <div className={'flex-1'}>
                        <Surface className={'h-full overflow-x-scroll'}>
                            <DataTable columns={tutorsCols} data={tutors} searchable={true}/>
                        </Surface>
                    </div>

                </div>
            </AuthLayout>
        )
    } else if (can('groups-add-corrections')) {
        return (
            <AuthLayout title='Grupos'>
                <div className='bg-white h-full p-6'>
                    <Title>Alumnos asignados</Title>
                    <Text>A countinuación, se listan sus alumnos asignados. Podrá acceder a sus pacientes e historias creadas.</Text>

                    <div className={'flex flex-col py-4'}>
                        {
                            user.group?.members.map((user) => (<ProfileItem id={user.id} key={user.id}/>))
                        }
                    </div>
                </div>
            </AuthLayout>
        )
    } else {
        return (
            <AuthLayout title='Grupos'>
                <div className='bg-white h-full p-6'>
                    <Title>Tutores asignados</Title>
                    <Text>A countinuación, se listan los tutores a los cuales se encuentra asignado actualmente. Estos podrán tener acceso a sus pacientes e historias clínicas.</Text>

                    <div className={'flex flex-col py-4'}>
                    {
                        assigned_tutors.map((user) => (<ProfileItem id={user.id} key={user.id}/>))
                    }
                    </div>
                </div>
            </AuthLayout>
        )
    }
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


const CreateGroupFormSchema = z.object({
    name: z.coerce.string().min(3, {message: 'Mínimo 3 caracteres'}).max(50, {message: 'Máximo 50 caracteres'}),
    owner: z.coerce.string().uuid(),
})

const CreateGroupDialog = ({
                               professors = [], show: open, onOpenChange = (_) => {
    }
                           }: { professors: User[], show: boolean, onOpenChange: (boolean) => void }) => {

    const [professorsList, setProfessorsList] = React.useState<User[]>(professors)

    const {isProcessing, router} = useInertiaSubmit()
    const route = useRoute()

    const form = useForm<z.infer<typeof CreateGroupFormSchema>>({
        defaultValues: {name: '', owner: ''},
        resolver: zodResolver(CreateGroupFormSchema),
    })


    const onSubmit = (values: z.infer<typeof CreateGroupFormSchema>) => {

        const endpoint = route('groups.store')

        router.post(endpoint, values, {
            preserveScroll: true,
            onError: errors => mapServerErrorsToFields(form, errors),
            onSuccess: page => {
                form.reset()
                onOpenChange(false)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={(open) => {
            form.reset();
            onOpenChange(open)
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear nuevo grupo</DialogTitle>
                    <DialogDescription>Escribe un nombre para el grupo y selecciona el administrador del grupo. (Solo
                        los profesores pueden ser administrador)</DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>

                            <div className={''}>
                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nombre del grupo</FormLabel>
                                        <FormControl>
                                            <Input {...field} type={'text'}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'name'} control={form.control}/>
                            </div>

                            <div>
                                <FormField render={({field}) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Administrador</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={field.disabled} name={field.name}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Seleccione a un usuario'/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {professorsList.map(item => <SelectItem value={item.id} key={item.id}>{item.email}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        {/*<Popover>*/}
                                        {/*        <FormControl>*/}
                                        {/*    <PopoverTrigger>*/}
                                        {/*            <Button variant={"outline"} role={'combobox'} className={*/}
                                        {/*                cn(*/}
                                        {/*                    "w-[200px] justify-between",*/}
                                        {/*                    !field.value && "text-muted-foreground"*/}
                                        {/*                )*/}
                                        {/*            }>*/}
                                        {/*                {*/}
                                        {/*                    field.value ? professorsList.find(user => user.id === field.value)?.email : 'Seleccione usuario'*/}
                                        {/*                }*/}
                                        {/*                <Icon>*/}
                                        {/*                    <ChevronsUpDown*/}
                                        {/*                        className={'ml-2 h-4 w-4 shrink-0 opacity-50'}/>*/}
                                        {/*                </Icon>*/}
                                        {/*            </Button>*/}
                                        {/*    </PopoverTrigger>*/}
                                        {/*        </FormControl>*/}
                                        {/*    <PopoverContent className={'p-0'}>*/}
                                        {/*        <Command>*/}
                                        {/*            <CommandInput placeholder={'Seleccione usuario...'}/>*/}
                                        {/*            <CommandList>*/}
                                        {/*                <CommandEmpty>Usuario no encontrado.</CommandEmpty>*/}
                                        {/*                <CommandGroup>*/}
                                        {/*                    {*/}
                                        {/*                        professorsList.map(user => (*/}
                                        {/*                            <CommandItem*/}
                                        {/*                                value={user.id}*/}
                                        {/*                                key={user.id}*/}
                                        {/*                                onSelect={() => form.setValue('owner', user.id)}*/}
                                        {/*                            >*/}
                                        {/*                                <Tooltip>*/}
                                        {/*                                    <TooltipTrigger>*/}
                                        {/*                                        <Check className={cn(*/}
                                        {/*                                            "mr-2 h-4 w-4 inline",*/}
                                        {/*                                            user.id === field.value*/}
                                        {/*                                                ? "opacity-100"*/}
                                        {/*                                                : "opacity-0"*/}
                                        {/*                                        )}/>*/}
                                        {/*                                        <Text level={'body-xs'} className={'inline'}>*/}
                                        {/*                                            {user.email}*/}
                                        {/*                                        </Text>*/}
                                        {/*                                    </TooltipTrigger>*/}
                                        {/*                                    <TooltipContent>*/}
                                        {/*                                        <div>*/}
                                        {/*                                            <Text>{`${user.profile?.nombres} ${user.profile?.apellidos}`}</Text>*/}
                                        {/*                                        </div>*/}
                                        {/*                                    </TooltipContent>*/}
                                        {/*                                </Tooltip>*/}
                                        {/*                            </CommandItem>*/}
                                        {/*                        ))*/}
                                        {/*                    }*/}
                                        {/*                </CommandGroup>*/}
                                        {/*            </CommandList>*/}
                                        {/*        </Command>*/}
                                        {/*    </PopoverContent>*/}
                                        {/*</Popover>*/}
                                        <FormDescription>
                                            Este usuario será el administrador del grupo.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'owner'} control={form.control}/>
                            </div>

                            <div className={'flex justify-end gap-3'}>
                                <Button variant={'outline'} type={'button'} onClick={() => {
                                    form.reset();
                                    onOpenChange(false)
                                }}>Cancelar</Button>
                                <Button type={'submit'}
                                        disabled={isProcessing || !form.formState.isDirty}>Crear</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const tutorsColHelper = createColumnHelper<User>()

const tutorsCols: ColumnDef<User>[] = [
    tutorsColHelper.accessor((user: User) => user.profile?.cedula, {
        header: 'Rol',
        id: 'role',
        cell: ({row}) => {
            return (
                <div className='flex items-center justify-center capitalize'>
                    {`${row.original.role}`}
                </div>
            )
        }
    }),
    tutorsColHelper.accessor((user: User) => user.profile?.cedula, {
        meta: {
            title: 'Cédula',
            'searchable': true,
        },
        header: 'Cédula',
        id: 'nationalID'
    }),
    tutorsColHelper.accessor((user: User) => `${user.profile?.nombres} ${user.profile?.apellidos}`, {
        meta: {
            title: 'Nombre',
            'searchable': true,
        },
        size: 200,
        header: 'Nombre',
        id: 'name',
        cell: ({column, row: {original}}) =>  <div style={{width: column.getSize()}}>{`${original.profile?.nombres} ${original.profile?.apellidos}`}</div>
    }),
    tutorsColHelper.accessor((user: User) => `@${user.name}`, {
        meta: {
            title: 'Usuario',
            'searchable': true,
        },
        header: 'Usuario',
        id: 'username'
    }),
    tutorsColHelper.accessor((user: User) => user.email, {
        meta: {
            title: 'Correo',
            'searchable': true,
        },
        header: 'Correo',
        id: 'email'
    }),
    tutorsColHelper.display({
        id: 'actions',
        cell: (props) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild><EllipsisVertical/></DropdownMenuTrigger>
                    <DropdownMenuContent>

                    <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href={route('users.group.show', {user: props.row.original.id})}>
                            Asignar estudiantes
                        </Link>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    })
]

const columnHelper = createColumnHelper<Group>()

const columns: ColumnDef<Group>[] = [
    columnHelper.accessor((originalRow: Group) => originalRow.owner.profile?.cedula, {
        meta: {
            title: 'Cédula'
        },
        id: 'cedula',
        header: _props => 'Cédula',
    }),
    columnHelper.accessor((originalRow: Group) => originalRow.owner.profile?.nombres ?? originalRow.owner.name + ' ' + originalRow.owner.profile?.apellidos ?? '', {
        meta: {
            title: 'Admin'
        },
        id: 'group',
        header: _props => 'Admin',
    }),
    columnHelper.accessor((originalRow: Group) => originalRow.name, {
        meta: {
            title: 'Nombre del grupo'
        },
        id: 'name',
        header: _props => 'Nombre del grupo'
    }),
    columnHelper.accessor((originalRow: Group) => originalRow.members.length, {
        meta: {
            title: 'Número de miembros'
        },
        id: 'members_count',
        header: 'Miembros'
    }),
    columnHelper.accessor((originalRow: Group) => formatDate(originalRow.created_at, 'eee, PP'), {
        meta: {
            title: 'Fecha de creación'
        },
        id: 'created_at',
        header: 'Fecha de creación'
    }),
    columnHelper.display({
        id: 'actions',
        header: _props => 'Opciones',
        cell: props => {

            const onDeleteGroup = (group_id: string) => {
                router.delete(route('groups.destroy', {group: group_id}), {
                    onError: errors => console.log(errors),
                    onSuccess: page => router.reload(),
                })
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => router.visit(route('groups.show', {group: props.row.original.id}))}
                        >
                            Ver grupo
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className={'text-rose-600'}
                                          onClick={() => onDeleteGroup(props.row.original.id)}
                        >
                            <Icon className={'me-1'}>
                                <Trash2 className={'text-rose-600 size-5'}/>
                            </Icon>
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    })
]

export default Index
