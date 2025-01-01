import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import AcademicTerm from "@/src/models/Escuela/AcademicTerm.ts";
import {DataTable} from "@/Components/molecules/DataTable.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shadcn/ui/dropdown-menu.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {MoreHorizontal, Trash2} from "lucide-react";
import {format} from "date-fns";
import React from "react";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {toast} from "sonner";
import EditAcademicTermDialog from "@/Pages/Escuela/Partials/EditAcademicTermDialog.tsx";

const AcademicTermTableContext = React.createContext({
    onDeleteTerm: (term: AcademicTerm) => {
    }
})

interface AcademicTermTableProps {
    terms: AcademicTerm[]
}

const AcademicTermTable = ({terms}: AcademicTermTableProps) => {

    const {router, isProcessing} = useInertiaSubmit()

    const handleDelete = (term: AcademicTerm) => {
        const endpoint = route('academic-terms.destroy', {academicTerm: term.id})

        router.delete(endpoint, {
            onSuccess: (page) => {
                router.reload()
            },
            onError: (errors) => {
                toast.error('No se pudo eliminar el periodo académico')
            }
        })
    }

    return (
        <AcademicTermTableContext.Provider value={{onDeleteTerm: (term: AcademicTerm) => handleDelete(term)}}>
            <div>
                <DataTable columns={cols} data={terms} searchable={true}/>
            </div>
        </AcademicTermTableContext.Provider>
    )
}

const helper = createColumnHelper<AcademicTerm>()

const cols: ColumnDef<AcademicTerm>[] = [
    helper.accessor((originalRow) => originalRow.name, {
        id: 'name',
        header: 'Nombre'
    }),
    helper.accessor((originalRow) => originalRow.code, {
        id: 'code',
        header: 'Código'
    }),
    helper.accessor((originalRow) => format(originalRow.start_date, 'P'), {
        id: 'start_date',
        header: 'Fecha de inicio'
    }),
    helper.accessor((originalRow) => format(originalRow.end_date, 'P'), {
        id: 'end_date',
        header: 'Fecha de fin'
    }),
    helper.display({
        id: 'actions',
        cell: ({row}) => (<AcademicTermTableActions term={row.original}/>)
    })
]

interface AcademicTermTableMenuProps {
    term: AcademicTerm
}

const AcademicTermTableActions = ({term}: AcademicTermTableMenuProps) => {
    const context = React.useContext(AcademicTermTableContext)

    const [openDropdown, setOpenDropdown] = React.useState<boolean>(false)
    const [openEditDialog, setOpenEditDialog] = React.useState<boolean>(false)

    return (
        <>
            <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => {
                        setOpenEditDialog(true)
                        setOpenDropdown(false)
                    }}>Editar periodo</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className={'text-rose-600'}
                                      onClick={() => context.onDeleteTerm(term)}><Trash2
                        className={'size-4 me-1'}/>Eliminar periodo</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditAcademicTermDialog term={term} open={openEditDialog} onOpenChange={setOpenEditDialog}/>
        </>
    )
}

export default AcademicTermTable
