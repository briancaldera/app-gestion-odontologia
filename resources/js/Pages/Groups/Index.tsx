import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {mapServerErrorsToFields, usePermission} from "@/src/Utils/Utils.ts";
import Group from "@/src/models/Group.ts";
import User from "@/src/models/User.ts";
import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {formatDate} from "date-fns";
import {Link, router} from "@inertiajs/react";
import {route, useRoute} from "ziggy-js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shadcn/ui/dropdown-menu.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Check, ChevronsUpDown, MoreHorizontal, Trash2} from "lucide-react";
import React from "react";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/shadcn/ui/dialog.tsx";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Input} from "@/shadcn/ui/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/shadcn/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/shadcn/ui/command.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/shadcn/ui/tooltip.tsx";
import {Text} from "@/Components/atoms/Text";
import Surface from "@/Components/atoms/Surface";
import Heading from "@/Components/atoms/Heading";
import Title from "@/Components/atoms/Title";
import {Avatar} from "@mui/joy";
import {DataTable} from "@/Components/molecules/DataTable.tsx";
import {Icon} from "@/Components/atoms/Icon.tsx";

type IndexProps = {
    groups: Group[]
    profesores: User[]
}

const Index = ({groups, profesores}) => {
    const can = usePermission()

    const [openCreateGroupDialog, setOpenCreateGroupDialog] = React.useState<boolean>(false)

    if (can('groups-index-all')) {
        return (
            <AuthLayout title='Grupos'>
                <ScrollArea className='h-full'>
                    <div className={'p-6 grid grid-cols-4 grid-rows-3 gap-6'}>
                        <Surface className={'col-span-3 row-span-2 h-[700px]'}>
                            <DataTable columns={columns} data={groups} searchable={true}/>
                        </Surface>
                        <Surface className={'col-span-1 p-6'}>
                            <section>
                                <CreateGroupDialog show={openCreateGroupDialog} onOpenChange={setOpenCreateGroupDialog}
                                                   professors={profesores}/>
                                <Title>Crear nuevo grupo</Title>

                                <div>
                                    <Button type={'button'} onClick={() => setOpenCreateGroupDialog(true)}>Crear nuevo
                                        grupo</Button>
                                </div>
                            </section>
                        </Surface>
                    </div>
                </ScrollArea>
            </AuthLayout>
        )
    } else {
        return (
            <AuthLayout title='Grupos'>
                <ScrollArea className='h-full'>
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
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} role={'combobox'} className={
                                                        cn(
                                                            "w-[200px] justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )
                                                    }>
                                                        {
                                                            field.value ? professorsList.find(user => user.id === field.value)?.email : 'Seleccione usuario'
                                                        }
                                                        <Icon>
                                                            <ChevronsUpDown
                                                                className={'ml-2 h-4 w-4 shrink-0 opacity-50'}/>
                                                        </Icon>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className={'p-0'}>
                                                <Command>
                                                    <CommandInput placeholder={'Seleccione usuario...'}/>
                                                    <CommandList>
                                                        <CommandEmpty>Usuario no encontrado.</CommandEmpty>
                                                        <CommandGroup>
                                                            {
                                                                professorsList.map(user => (
                                                                    <CommandItem
                                                                        value={user.id}
                                                                        key={user.id}
                                                                        onSelect={() => form.setValue('owner', user.id)}
                                                                    >
                                                                        <Tooltip>
                                                                            <TooltipTrigger>
                                                                                <Check className={cn(
                                                                                    "mr-2 h-4 w-4 inline",
                                                                                    user.id === field.value
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}/>
                                                                                <Text level={'body-xs'} className={'inline'}>
                                                                                    {user.email}
                                                                                </Text>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                <div>
                                                                                    <Text>{`${user.profile?.nombres} ${user.profile?.apellidos}`}</Text>
                                                                                </div>
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </CommandItem>
                                                                ))
                                                            }
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
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
