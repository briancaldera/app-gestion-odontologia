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
import {Button} from "@/shadcn/ui/button.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    ColumnDef,
    ColumnFiltersState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import User from "@/src/models/User.ts";
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger} from "@/shadcn/ui/dropdown-menu.tsx";
import {EllipsisVertical} from "lucide-react";
import React, {MutableRefObject} from "react";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";
import {Input} from "@/shadcn/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/ui/select.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn/ui/table.tsx";

const AssignUserToGroupDialog = ({users, onSubmit}: {users: User[], onSubmit: (values: z.infer<typeof assignUserToGroupSchema>) => void}) => {

    const [open, setOpen] = React.useState(false)

    const handleOpen = (open: boolean) => {
        setOpen(open)
    }

    const isDisabled: boolean = false

    const form = useForm<z.infer<typeof assignUserToGroupSchema>>({
        resolver: zodResolver(assignUserToGroupSchema),
        defaultValues: {
            users: []
        },
        disabled: isDisabled
    })

    const tableModelRef: MutableRefObject<Table<any> | null> = React.useRef(null)

    const handleSubmit = () => {

    }

    return (
        <Dialog open={open} onOpenChange={handleOpen}>
            <DialogTrigger asChild>
                <Button>Asignar alumnos</Button>
            </DialogTrigger>
            <DialogContent className={'max-w-6xl'}>
                <DialogHeader>
                    <DialogTitle>Asignar alumnos</DialogTitle>
                    <DialogDescription>Asigne alumnos a este usuario</DialogDescription>
                </DialogHeader>
                <div>
                    <div>
                        <UsersDataTable modelRef={tableModelRef} columns={colsDef} data={users} searchable={true}/>
                    </div>

                    {/*<Form {...form}>*/}
                    {/*    <form id='assignUsersToGroupForm' onSubmit={form.handleSubmit(onSubmit)}>*/}

                    {/*        <FormField render={({field}) => (*/}
                    {/*            <FormItem className={'max-sm:w-96 overflow-x-scroll'}>*/}
                    {/*                <FormLabel></FormLabel>*/}
                    {/*                <FormControl>*/}
                    {/*                    */}
                    {/*                </FormControl>*/}
                    {/*                <FormMessage/>*/}
                    {/*            </FormItem>*/}
                    {/*        )} name={'users'} control={form.control} />*/}
                    {/*    </form>*/}
                    {/*</Form>*/}
                </div>
                <DialogFooter className={'gap-3'}>
                    <DialogClose asChild>
                        <Button variant='secondary'>Cancelar</Button>
                    </DialogClose>
                    <Button form='assignUsersToGroupForm' type='button' onClick={() => onSubmit(tableModelRef.current?.getFilteredSelectedRowModel().rows.map((row) => row.original.id))}>Asignar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const colHelper = createColumnHelper<User>()

const colsDef: ColumnDef<User>[] = [
    colHelper.display({
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value);
                    }}
                    aria-label="Select row"
                />
            ),
    }),
    colHelper.accessor((user: User) => user.profile?.cedula, {
        meta: {
            title: 'Cédula',
            'searchable': true,
        },
        header: 'Cédula',
        id: 'nationalID'
    }),
    colHelper.accessor((user: User) => `${user.profile?.nombres} ${user.profile?.apellidos}`, {
        meta: {
            title: 'Nombre',
            'searchable': true,
        },
        size: 200,
        header: 'Nombre',
        id: 'name',
        cell: ({column, row: {original}}) =>  <div style={{width: column.getSize()}}>{`${original.profile?.nombres} ${original.profile?.apellidos}`}</div>
    }),
    colHelper.accessor((user: User) => `@${user.name}`, {
        meta: {
            title: 'Usuario',
            'searchable': true,
        },
        header: 'Usuario',
        id: 'username'
    }),
    colHelper.accessor((user: User) => user.email, {
        meta: {
            title: 'Correo',
            'searchable': true,
        },
        header: 'Correo',
        id: 'email'
    }),
    colHelper.display({
        id: 'actions',
        cell: (props) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild><EllipsisVertical/></DropdownMenuTrigger>
                    <DropdownMenuContent>

                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    })
]

const assignUserToGroupSchema = z.object({
    users: z.array(z.string())
})

interface SelectionDataTableProps<TData, TValue> {
    modelRef?: MutableRefObject<Table<TData>>
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    searchable?: boolean
}

function UsersDataTable<TData, TValue>({
                                           modelRef,
                                      columns,
                                      data, searchable = false,
                                  }: SelectionDataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const [filter, setFilter] = React.useState<string>(() => columns[0]?.id ?? '')

    const onFilterChange = (value) => {
        table.getColumn(filter)?.setFilterValue('')
        setFilter(value)
    }

    React.useEffect(() => {
        if (modelRef != null) {
            modelRef.current = table
        }
    }, [])

    return (
        <div>
            {
                (searchable) && (
                    <div className="flex items-center py-4 gap-2">
                        <Input
                            placeholder="Buscar por"
                            value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn(filter)?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />

                        <Select onValueChange={onFilterChange} defaultValue={columns[0].id}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Por defecto"/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    columns.every(col => 'id' in col) && columns.filter(col => col.meta?.searchable).filter(col => col.id !== '').map(column => {

                                        return (
                                            <SelectItem key={column.id}
                                                        value={column.id}>{column.meta?.title ?? column.id}</SelectItem>
                                        )
                                    })
                                }
                            </SelectContent>
                        </Select>
                    </div>
                )
            }
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Sin resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Siguiente
                </Button>

            </div>
        </div>
    )
}

export default AssignUserToGroupDialog
