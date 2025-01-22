import AuthLayout from "@/Layouts/AuthLayout.tsx";
import User from "@/src/models/User.ts";
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
    useReactTable
} from "@tanstack/react-table";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/shadcn/ui/dropdown-menu.tsx";
import {Link, router} from "@inertiajs/react";
import {route} from "ziggy-js";
import Title from "@/Components/atoms/Title";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shadcn/ui/table"
import {Button} from "@/shadcn/ui/button";
import React from "react";
import {Input} from "@/shadcn/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/shadcn/ui/select"
import {Text} from "@/Components/atoms/Text";

type IndexProps = {
    users: {
        links
        data
        meta
    }
}

const Index = ({users}: IndexProps) => {

    const handlePageSizeChange = (value) => {
        router.reload({data: {size: value, page: 1}})
    }

    return (
        <AuthLayout title='Usuarios'>
            <ScrollArea className='h-full'>
                <Title level='title-lg'>Usuarios</Title>
                <div className='overflow-x-scroll w-full'>
                    <DataTable columns={columns} data={users.data.collection} searchable={true} links={users.links} meta={users.meta}/>
                </div>
                <div className='flex justify-end items-center'>
                    <Text>Mostrar:</Text>
                    <Select value={route().queryParams.size ?? '10'} onValueChange={handlePageSizeChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Mostrar por:" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </ScrollArea>
        </AuthLayout>
    )
}

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchable?: boolean
    links: any
    meta: any
}

function DataTable<TData, TValue>({
                                      columns,
                                      data, searchable = false,
                                      links, meta
                                  }: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const [filter, setFilter] = React.useState<string>(() => columns[0]?.id ?? '')

    console.log(links)

    const table = useReactTable({
        manualPagination: true,
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            pagination: {
                pageIndex: meta.current_page,
                pageSize: meta.per_page,
            },
        },
        pageCount: meta.last_page,
        rowCount: meta.total
    })

    const onFilterChange = (value) => {
        table.getColumn(filter)?.setFilterValue('')
        setFilter(value)
    }

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
                <Text>Mostrando de {meta.from} a {meta.to} de {meta.total} en total | Página {meta.current_page} de {meta.last_page}</Text>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={!links.prev}
                    asChild
                >
                    <Link href={links.prev}>
                        Anterior
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={!links.next}
                    asChild
                >
                    <Link href={links.next}>
                        Siguiente
                    </Link>
                </Button>
            </div>
        </div>
    )
}

const columnHelper = createColumnHelper<User>()

const columns: ColumnDef<User>[] = [
    columnHelper.accessor(originalRow => originalRow.profile?.cedula ?? '-', {
        meta: {title: 'Cédula', searchable: true},
        id: 'cedula',
        header: props => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => props.column.toggleSorting(props.column.getIsSorted() === "asc")}
                >
                    {props.column.columnDef.meta.title}
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        }
        ,
    }),
    columnHelper.accessor(originalRow => originalRow.profile?.nombres ?? '-', {
        meta: {title: 'Nombres', searchable: true},
        id: 'nombres',
        header: props => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => props.column.toggleSorting(props.column.getIsSorted() === "asc")}
                >
                    {props.column.columnDef.meta.title}
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        }
    }),
    columnHelper.accessor(originalRow => originalRow.profile?.apellidos ?? '-', {
        meta: {title: 'Apellidos', searchable: true},
        id: 'apellidos',
        header: props => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => props.column.toggleSorting(props.column.getIsSorted() === "asc")}
                >
                    {props.column.columnDef.meta.title}
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        }
    }),
    columnHelper.accessor(originalRow => originalRow.email, {
        meta: {title: 'Email', searchable: true},
        id: 'email',
        header: props => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => props.column.toggleSorting(props.column.getIsSorted() === "asc")}
                >
                    {props.column.columnDef.meta.title}
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        }
    }),
    columnHelper.accessor(originalRow => '@' + originalRow.name, {
        meta: {title: 'Usuario', searchable: true},
        id: 'name',
        header: props => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => props.column.toggleSorting(props.column.getIsSorted() === "asc")}
                >
                    {props.column.columnDef.meta.title}
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        }
    }),
    columnHelper.display({
        id: 'actions',
        cell: props => {
            const user = props.row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => router.visit(route('profile.show', {profile: user.id}))}
                        >
                            Ver perfil
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    })
]

export default Index
