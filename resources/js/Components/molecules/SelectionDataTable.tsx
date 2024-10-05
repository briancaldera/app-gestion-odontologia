import {
    ColumnDef,
    ColumnFiltersState, flexRender,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn/ui/table";
import React from "react";
import {Button} from "@/shadcn/ui/button";
import {Input} from "@/shadcn/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/ui/select.tsx";

interface SelectionDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    onSubmitSelected: (rows: TData[]) => void,
    searchable?: boolean
}

function SelectionDataTable<TData, TValue>({
                                             columns,
                                             data, searchable = false,
                                               onSubmitSelected,
                                         }: SelectionDataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
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

                <Button
                    onClick={() => onSubmitSelected(table.getFilteredSelectedRowModel().rows.map(row => row.original))}
                    disabled={table.getFilteredSelectedRowModel().rows.length === 0}
                    size="sm"
                >
                    Aceptar
                </Button>
            </div>
        </div>
    )
}

export default SelectionDataTable
