import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {UserCode} from "@/src/models/UserCode.ts";
import Title from "@/Components/atoms/Title";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/shadcn/ui/tooltip.tsx";
import {Text} from "@/Components/atoms/Text";
import {CircleCheck, CircleHelp, CircleX, LoaderCircle, MoreHorizontal, Trash} from 'lucide-react'
import {Icon} from "@/Components/atoms/Icon.tsx";
import {CellContext, ColumnDef, createColumnHelper} from "@tanstack/react-table";
import SelectionDataTable from "@/Components/molecules/SelectionDataTable.tsx";
import {format} from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shadcn/ui/dropdown-menu.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Link} from "@inertiajs/react";
import React from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shadcn/ui/dialog.tsx";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {Input} from "@/shadcn/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/ui/select.tsx";
import {route} from "ziggy-js";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";


type IndexProps = {
    userCodes: UserCode[]
}

const Index = ({userCodes}: IndexProps) => {
    return (
        <AuthLayout title={'Expedientes'}>
            <ScrollArea className={'h-full bg-white'}>
                <section className={'py-6 px-24'}>
                    <header className={'flex gap-2 justify-between items-baseline mb-3'}>
                        <div className={'flex gap-x-2'}>
                            <Title level={'title-lg'}>Expedientes de usuario</Title>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Icon>
                                        <CircleHelp className={'size-4'}/>
                                    </Icon>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <Text>
                                        Lista los números de expedientes o códigos de identificación de cada usuario.
                                    </Text>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div>
                            <AddCodeDialog/>
                        </div>
                    </header>

                    <div>
                        <SelectionDataTable columns={codeColumnDef} data={userCodes} onSubmitSelected={() => {
                        }}/>
                    </div>
                </section>
            </ScrollArea>
        </AuthLayout>
    )
}

const AddCodeDialog = ({userCode}: { userCode?: UserCode }) => {

    const [open, setOpen] = React.useState<boolean>(false)
    const {isProcessing, router} = useInertiaSubmit()

    const defaults = (userCode ? {
            id: userCode.id,
            code: userCode.code,
            role: userCode.role.name
        } : {
            code: "",
            role: ""
        }
    ) satisfies z.infer<typeof addCodeSchema>

    const addCodeForm = useForm<z.infer<typeof addCodeSchema>>({
            resolver: zodResolver(addCodeSchema),
            defaultValues: defaults
        }
    )

    const handleOpenChange = (state: boolean) => {
        if (state) addCodeForm.reset()
        setOpen(state)
    }

    const handleSubmit = (values: z.infer<typeof addCodeSchema>) => {

        if ('id' in values) {

        } else {
            const endpoint = route('users.codes.store')

            router.post(endpoint, {...values}, {
                onError: errors => {
                    mapServerErrorsToFields(addCodeForm, errors)
                },
                onSuccess: () => {
                    addCodeForm.reset()
                    // router.reload({only: ['userCodes']})
                }
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>Agregar expediente</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Agregar nuevo número de expediente
                    </DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...addCodeForm}>
                        <form id={'addUserCodeForm'} onSubmit={addCodeForm.handleSubmit(handleSubmit)}>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Nro. de expediente o código de identificación
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder={'E.g. 999.99999.9'} autoComplete={"off"}/>
                                    </FormControl>
                                    <FormDescription>Agregue el número de identificación único para el usuario. Esto le
                                        permitirá registrarse en el sistema.</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'code'} control={addCodeForm.control}/>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={'Selecciona un rol'}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={'estudiante'}>Estudiante</SelectItem>
                                            <SelectItem value={'profesor'}>Profesor</SelectItem>
                                            <SelectItem value={'admision'} className={'bg-rose-50'}>Admisión</SelectItem>
                                            <SelectItem value={'admin'} className={'bg-rose-50'}>Administrador</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Seleccione el rol que tendrá el usuario en el sistema cuando este se registre.
                                        <span className={'text-rose-400'}> Tenga cuidado al asignar el rol, ya que este determinará los permisos que tendrá el usuario en el sistema.</span>
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'role'} control={addCodeForm.control}/>

                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline'>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button form='addUserCodeForm' type="submit"
                            disabled={isProcessing || !addCodeForm.formState.isDirty}>{
                        isProcessing &&
                        <LoaderCircle className='mr-2 animate-spin'/>}Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const addCodeSchema = z.object({
    id: z.coerce.number().optional(),
    role: z.enum(['admin', 'admision', 'profesor', 'estudiante'], {
        required_error: 'Debes seleccionar un elemento',
        invalid_type_error: 'Tipo de dato incorrecto',
        message: 'Selección inválida. Debe elegir entre "Administrador", "Admisión", "Profesor" o "Estudiante"'
    }),
    code: z.string().min(1).max(255)
})

const codeColumnHelper = createColumnHelper<UserCode>()

const codeColumnDef: ColumnDef<UserCode>[] = [
    codeColumnHelper.accessor((originalRow, _index) => originalRow.code, {
        id: 'expediente',
        header: 'Expediente'
    }),
    codeColumnHelper.accessor((originalRow, _index) => originalRow.role.display_name, {
        id: 'role',
        header: 'Rol asignado'
    }),
    codeColumnHelper.accessor((originalRow, _index) => originalRow.user_id, {
        id: 'userID',
        header: 'Usuario',
        cell: props => {
            const {row: {original}} = props
            return original.user_id ?? 'Usuario aún no registrado'
        }
    }),
    codeColumnHelper.accessor((originalRow, _index) => originalRow.created_at, {
        id: 'created_at',
        header: 'Fecha de registro de expediente',
        cell: props => {
            return format(props.row.original.created_at, 'P p a')
        }
    }),
    codeColumnHelper.accessor((originalRow, _index) => originalRow.user_id, {
        id: 'status',
        header: 'Estado',
        cell: props => {
            const {row: {original}} = props
            return (
                <div className={'text-center flex'}>
                    {
                        original.user_id ? (
                            <Tooltip>
                                <TooltipTrigger>
                                    <CircleCheck className={'size-6 text-emerald-400'}/>
                                    <TooltipContent>
                                        <Text>Usuario registrado</Text>
                                    </TooltipContent>
                                </TooltipTrigger>
                            </Tooltip>
                        ) : (
                            <Tooltip>
                                <TooltipTrigger>
                                    <CircleX className={'size-6 text-rose-400'}/>
                                    <TooltipContent>
                                        <Text>Usuario aún no registrado</Text>
                                    </TooltipContent>
                                </TooltipTrigger>
                            </Tooltip>
                        )
                    }
                </div>
            )
        }
    }),
    codeColumnHelper.display({
        id: 'actions',
        cell: (props) => <UserCodeActionCell cellContext={props}/>,
    }),
]

const UserCodeActionCell = ({cellContext} : {cellContext: CellContext<UserCode, unknown>}) => {

    const {row} = cellContext

    const {isProcessing, router} = useInertiaSubmit()
    const [openDropdown, setOpenDropdown] = React.useState<boolean>(false)
    const [openEditDialog, setOpenEditDialog] = React.useState<boolean>(false)

    const editCodeForm = useForm<z.infer<typeof addCodeSchema>>({
        resolver: zodResolver(addCodeSchema),
        defaultValues: {
            code: row.original.code,
            id: row.original.id,
            role: row.original.role.name
        }
    })

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) editCodeForm.reset()
        setOpenEditDialog(isOpen)
    }

    const handleSubmit = (values: z.infer<typeof addCodeSchema>) => {
        const endpoint = route('users.codes.update', {
            userCode: values.id
        })

        router.patch(endpoint, {...values}, {
            onError: errors => {
                mapServerErrorsToFields(editCodeForm, errors)
            },
            onSuccess: () => {
                editCodeForm.reset(values)
                handleOpenChange(false)
            }
        })
    }

    return (
        <>
            <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                    <DropdownMenuItem asChild disabled={!row.original.user_id}>
                        <Link href={route('profile.show', {
                            profile: row.original.user_id ?? ''
                        })} as={'button'}>Ver usuario</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        setOpenEditDialog(true);
                        setOpenDropdown(false)
                    }}>
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem asChild className={'text-rose-400'}>
                        <Link href={route('users.codes.destroy', {
                            userCode: row.original.id
                        })} as='button' type='button' method='delete'>
                            <Trash className='size-4 text-rose-400 mr-2'/>
                            Eliminar
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={openEditDialog} onOpenChange={handleOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>

                        </DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Form {...editCodeForm}>
                            <form id={'editUserCodeForm' + row.original.id}
                                  onSubmit={editCodeForm.handleSubmit(handleSubmit)}>

                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Nro. de expediente o código de identificación
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder={'E.g. 999.99999.9'}
                                                   autoComplete={"off"}/>
                                        </FormControl>
                                        <FormDescription>Agregue el número de identificación único para el
                                            usuario. Esto le
                                            permitirá registrarse en el sistema.</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'code'} control={editCodeForm.control}/>

                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={'Selecciona un rol'}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={'estudiante'}>Estudiante</SelectItem>
                                                <SelectItem value={'profesor'}>Profesor</SelectItem>
                                                <SelectItem value={'admision'} className={'bg-rose-200'}>Admisión</SelectItem>
                                                <SelectItem value={'admin'} className={'bg-rose-200'}>Administrador</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Seleccione el rol que tendrá el usuario en el sistema cuando este se
                                            registre.
                                            <span className={'text-rose-400'}> Tenga cuidado al asignar el rol, ya que este determinará los permisos que tendrá el usuario en el sistema.</span>
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'role'} control={editCodeForm.control}/>


                            </form>
                        </Form>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant='outline'>Cancelar</Button>
                        </DialogClose>
                        <Button type={"submit"} form={'editUserCodeForm' + row.original.id}
                                disabled={isProcessing || !editCodeForm.formState.isDirty}>{
                            isProcessing &&
                            <LoaderCircle className={'mr-2 animate-spin'}/>}Guardar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default Index
