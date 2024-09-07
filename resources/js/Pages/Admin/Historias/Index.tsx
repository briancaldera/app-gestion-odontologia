import AuthLayout from "@/Layouts/AuthLayout.tsx";
import SidebarMenu, {type MenuItem} from "@/Components/organisms/SidebarMenu";
import {ArrowBigLeft} from 'lucide-react'
import {ColumnDef, ColumnHelper, createColumnHelper} from "@tanstack/react-table";
import Historia from "@/src/models/Historia";
import Surface from "@/Components/atoms/Surface";
import {DataTable} from "@/Components/molecules/DataTable";

type IndexProps = {
    historias: Historia[]
}

const Index = ({historias}: IndexProps) => {

    return (
        <AuthLayout title={'Historias'} sidebar={<SidebarMenu menu={menu}/>}>
            <div className={'p-6'}>
                <Surface>

                    <div>
                        <DataTable columns={historiaIndexTableColDef} data={historias} searchable={true}/>
                    </div>
                </Surface>
            </div>
        </AuthLayout>
    )
}

const menu = [
    {icon: <ArrowBigLeft/>, link: "historias.dashboard", name: "Volver"}
] satisfies MenuItem[] as const

const columnHelper: ColumnHelper<Historia> = createColumnHelper<Historia>()

const historiaIndexTableColDef: ColumnDef<Historia>[] = [
    columnHelper.accessor((historia: Historia) => `${historia.paciente?.nombre ?? ''} ${historia.paciente?.apellido ?? ''}`, {
        meta: {
            title: 'Paciente'
        },
        id: 'patient',
        header: 'Paciente'
    }),
    columnHelper.accessor( (historia: Historia) => historia.paciente?.edad ?? '-', {
        meta: { title: 'Edad'},
        id: 'age',
        header: 'Edad',
    }),
    columnHelper.accessor( (historia: Historia) => historia.paciente?.cedula ?? '-', {
        meta: { title: 'Cédula del paciente'},
        id: 'cedula',
        header: 'Cédula del paciente',
    }),
    columnHelper.accessor( (historia: Historia) => historia.numero ?? '-', {
        meta: { title: 'Número de historia'},
        id: 'code',
        header: 'Número de historia',
    }),
    columnHelper.accessor( (historia: Historia) => `${historia.autor?.profile?.apellidos + ',' ?? ''} ${historia.autor?.profile?.nombres ?? ''}`, {
        meta: { title: 'Autor'},
        id: 'author',
        header: 'Autor',
    }),
    columnHelper.accessor( (historia: Historia) => historia.autor?.profile?.cedula, {
        meta: { title: 'Cédula del autor'},
        id: 'author_cedula',
        header: 'Cédula del autor',
    }),
    columnHelper.display({
        id: 'actions',
    })
] as const

export default Index
