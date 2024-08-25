import AuthLayout from "@/Layouts/AuthLayout";
import {Card} from "@/shadcn/ui/card";
import Title from "@/Components/atoms/Title";
import {DataTable} from "@/Components/molecules/DataTable";
import { createColumnHelper, ColumnDef, getPaginationRowModel } from '@tanstack/react-table'
import User from '@/src/models/User'
import Profile from "@/src/models/Profile"
import {ArrowUpDown, MoreHorizontal} from "lucide-react"
import {Button} from "@/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu"
import {router} from "@inertiajs/react"
import {route} from "ziggy-js";



const columnHelper = createColumnHelper<Profile>()

const columns: ColumnDef<Profile>[] = [
    columnHelper.accessor(originalRow => originalRow.cedula, {
        meta: { title: 'Cédula'},
        id: 'cedula',
        header: props => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => props.column.toggleSorting(props.column.getIsSorted() === "asc")}
                >
                    {props.column.columnDef.meta.title}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
        ,
    }),
    columnHelper.accessor(originalRow => originalRow.nombres, {
        meta: { title: 'Nombres'},
        id: 'nombres' ,
        header: props => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => props.column.toggleSorting(props.column.getIsSorted() === "asc")}
                >
                    {props.column.columnDef.meta.title}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    }),
    columnHelper.accessor(originalRow => originalRow.apellidos, {
        meta: { title: 'Apellidos'},
        id: 'apellidos' ,
        header: props => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => props.column.toggleSorting(props.column.getIsSorted() === "asc")}
                >
                    {props.column.columnDef.meta.title}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    }),
    columnHelper.accessor(originalRow => originalRow.user?.email, {
        meta: { title: 'Email'},
        id: 'email' ,
        header: props => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => props.column.toggleSorting(props.column.getIsSorted() === "asc")}
                >
                    {props.column.columnDef.meta.title}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    }),
    columnHelper.accessor(originalRow => originalRow.user?.name, {
        meta: { title: 'Usuario'},
        id: 'name' ,
        header: props => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => props.column.toggleSorting(props.column.getIsSorted() === "asc")}
                >
                    {props.column.columnDef.meta.title}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    }),
    columnHelper.display({
        id: 'actions',
        cell: props => {
            const profile = props.row.original

            console.log(profile)

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
                            onClick={() => router.visit(route('profile.show', {profile: profile.user_id}))}
                        >
                            Ver perfil
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    })
]

interface IndexProps {
    profiles: Profile[]
}

const Index = ({profiles}: IndexProps) => {

    return (
        <AuthLayout title={'Perfiles'}>
            <div className={'p-12'}>
                <Card className={'p-12'}>
                    <Title level={'title-lg'}>Usuarios</Title>
                    <section>
                        <DataTable columns={columns} data={profiles} />
                    </section>
                </Card>
            </div>
        </AuthLayout>
    )
}

export default Index
