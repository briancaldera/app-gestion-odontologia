import AuthLayout from "@/Layouts/AuthLayout.tsx";
import Paciente from "@/src/models/Paciente.ts";
import React from "react";
import Surface from "@/Components/atoms/Surface";
import {Link} from "@inertiajs/react";
import {route} from "ziggy-js";
import Avatar from "@/Components/atoms/Avatar";
import {Text} from "@/Components/atoms/Text";
import Title from "@/Components/atoms/Title";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {ArrowBigLeft, Plus, UserRoundX} from 'lucide-react'
import {Button} from "@/shadcn/ui/button.tsx";
import SidebarMenu, {MenuItem} from "@/Components/organisms/SidebarMenu.tsx";
import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {DataTable} from "@/Components/molecules/DataTable.tsx";
import {usePermission} from "@/src/Utils/Utils.ts";

type IndexProps = {
    pacientes: Paciente[]
}

const Index = ({pacientes}: IndexProps) => {

    const can = usePermission()

    return (
        <AuthLayout title={'Pacientes'} sidebar={<SidebarMenu menu={menu}/>}>
            <div className={'p-6 h-full'}>
                {
                    can('pacientes-index-all') ? (
                        <Surface className={'h-full flex flex-col p-6 gap-y-6'}>
                            <Title level={'h3'}>Pacientes</Title>
                            <div className={'flex justify-end'}><Text level={'body-xs'}>Total pacientes:<span className={'text-2xl font-bold'}>{pacientes.length}</span></Text></div>

                            {
                                pacientes.length !== 0 ? (
                                    <div className={'basis-full'}>
                                        <DataTable columns={pacientesColumDef} data={pacientes} searchable={true}/>
                                    </div>
                                ) : (
                                    <div className={'flex-1 flex flex-col justify-center items-center gap-y-4'}>
                                        <UserRoundX className={'size-20 mb-4 text-slate-300'}/>
                                        <Text className={'text-center'}>¡Aun no tienes ningún paciente! Registra a un
                                            nuevo paciente</Text>
                                        <Button role={'link'} asChild>
                                            <Link href={route('pacientes.create')}><Plus className={'mr-2'}/>Registrar
                                                paciente</Link>
                                        </Button>
                                    </div>
                                )
                            }
                        </Surface>
                    ) : (
                        <Surface className={'h-full flex flex-col p-6 gap-y-6'}>
                            <Title level={'h3'}>Pacientes</Title>
                            {
                                pacientes.length !== 0 ? (
                                    <ScrollArea className={'basis-full'}>
                                        <div className={'space-y-2'}>
                                        {
                                            pacientes.map(paciente => <PacienteItem key={paciente.id} paciente={paciente}/>)
                                        }
                                        </div>
                                    </ScrollArea>
                                ) : (
                                    <div className={'flex-1 flex flex-col justify-center items-center gap-y-4'}>
                                        <UserRoundX className={'size-20 mb-4 text-slate-300'}/>
                                        <Text className={'text-center'}>¡Aun no tienes ningún paciente! Registra a un nuevo paciente</Text>
                                        <Button role={'link'} asChild>
                                            <Link href={route('pacientes.create')}><Plus className={'mr-2'}/>Registrar paciente</Link>
                                        </Button>
                                    </div>
                                )
                            }
                        </Surface>
                    )
                }
            </div>
        </AuthLayout>
    )
}

const PacienteItem = ({paciente}: {paciente: Paciente}) => {

    return (
        <Link href={route('pacientes.show', {paciente: paciente.id})}>
            <Surface className={'flex items-center px-6 py-5 gap-4'}>
                <div className={'w-16 flex-none'}>
                    <Avatar className={'w-full h-auto aspect-square'} picture={paciente.foto_url ?? null}/>
                </div>

                <div>
                    <Text>
                        Paciente: {`${paciente.nombre ?? ''} ${paciente.apellido ?? ''}`}
                    </Text>
                    <div className={'flex gap-x-2 flex-wrap'}>
                        <Text level={'body-sm'} className={'text-slate-500'}>
                            {paciente.cedula ?? ''}
                        </Text>
                        {
                            paciente.edad && (
                                <Text level={'body-sm'} className={'text-slate-500'}>
                                    Edad: {paciente.edad}
                                </Text>
                            )
                        }
                    </div>
                </div>
            </Surface>
        </Link>
    )
}

const menu = [
    {icon: <ArrowBigLeft/>, link: "dashboard", name: "Volver"}
] satisfies MenuItem[]

const pacientesColumnHelper = createColumnHelper<Paciente>()

const pacientesColumDef: ColumnDef<Paciente>[] = [
    pacientesColumnHelper.accessor(originalRow => originalRow.cedula, {
        meta: {
            title: 'Cédula',
            searchable: true,
        },
        id: 'nationalId',
        header: 'Cédula'
    }),
    pacientesColumnHelper.accessor(originalRow => originalRow.nombre, {
        meta: {
            title: 'Nombre',
            searchable: true,
        },
        id: 'firstName',
        header: 'Nombre'
    }),
    pacientesColumnHelper.accessor(originalRow => originalRow.apellido, {
        meta: {
            title: 'Apellido',
            searchable: true,
        },
        id: 'lastName',
        header: 'Apellido'
    }),
    pacientesColumnHelper.accessor(originalRow => originalRow.edad, {
        meta: {
            title: 'Edad',
            searchable: true,
        },
        id: 'age',
        header: 'Edad'
    }),
    pacientesColumnHelper.accessor(originalRow => originalRow.sexo, {
        meta: {
            title: 'Sexo',
        },
        id: 'sex',
        header: 'Sexo',
        cell: props => {
            if (props.row.original.sexo === "F") {
                return 'F'
            } else if (props.row.original.sexo === "M") {
                return 'M'
            } else {
                return '-'
            }
        }
    }),
]

export default Index
