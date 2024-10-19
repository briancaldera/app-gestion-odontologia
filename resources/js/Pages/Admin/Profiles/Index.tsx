import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {Card} from "@/shadcn/ui/card";
import Title from "@/Components/atoms/Title";
import {DataTable} from "@/Components/molecules/DataTable";
import {ColumnDef, createColumnHelper} from '@tanstack/react-table'
import User from '@/src/models/User'
import {ArrowBigLeft, ArrowUpDown, MoreHorizontal} from "lucide-react"
import {Button} from "@/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu"
import {router} from "@inertiajs/react"
import {route} from "ziggy-js";
import SidebarMenu, {type MenuItem} from '@/Components/organisms/SidebarMenu.tsx'
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";

type IndexProps = {
    users: User[]
}

const Index = ({users}: IndexProps) => {

    return (
        <AuthLayout title={'Perfiles'}>
            <ScrollArea className={'h-full'}>
                <div className={'p-2 sm:p-12'}>
                    <Card className={'p-12'}>
                        <Title level={'title-lg'}>Usuarios</Title>
                        <section>
                            {/*// todo make table searchable*/}
                            <DataTable columns={columns} data={users}/>
                        </section>
                    </Card>
                </div>
            </ScrollArea>
        </AuthLayout>
    )
}

const columnHelper = createColumnHelper<User>()

const columns: ColumnDef<User>[] = [
    columnHelper.accessor(originalRow => originalRow.profile.cedula, {
        meta: {title: 'Cédula'},
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
    columnHelper.accessor(originalRow => originalRow.profile.nombres, {
        meta: {title: 'Nombres'},
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
    columnHelper.accessor(originalRow => originalRow.profile.apellidos, {
        meta: {title: 'Apellidos'},
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
        meta: {title: 'Email'},
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
    columnHelper.accessor(originalRow => originalRow.name, {
        meta: {title: 'Usuario'},
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
