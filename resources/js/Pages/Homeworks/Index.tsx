import {usePermission} from "@/src/Utils/Utils.ts";
import AuthLayout from "@/Layouts/AuthLayout.tsx";
import Historia from "@/src/models/Historia.ts";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn/ui/table.tsx";
import {ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";

const Index = ({historias}: {historias: Historia[]}) => {
    const can = usePermission()
    console.log(historias)

  if (can('homeworks-index-all') || can('homeworks-full-control')) {
      return (
          <AuthLayout title={'Entregas de historia'}>
              <ScrollArea className={'h-full bg-white'}>
                  <div className='p-6'>
                    <EntregasTable columns={entregasColumns} data={historias}/>

                  </div>
              </ScrollArea>
          </AuthLayout>
      )
  } else {
      return (
          <AuthLayout title={'Entregas de historia'}>
              <ScrollArea className={'h-full'}>

              </ScrollArea>
          </AuthLayout>
      )
  }
}

const helper = createColumnHelper<Historia>()

const entregasColumns: ColumnDef<Historia>[] = [
    helper.accessor(originalRow => originalRow.numero, {
        id: 'numero',
        header: 'HCN',
        cell: ({row}) => {
            return row.original.numero ?? 'Sin asignar'
        }
    }),
    helper.accessor(originalRow => originalRow.numero, {
        id: 'paciente',
        header: 'Paciente',
        cell: ({row}) => {
            return row.original.paciente?.nombre
        }
    }),

]



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function EntregasTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
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
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Index
