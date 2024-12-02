import AuthLayout from "@/Layouts/AuthLayout.tsx";
import Historia from "@/src/models/Historia.ts";
import {usePermission} from "@/src/Utils/Utils.ts";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {ColumnDef, ColumnHelper, createColumnHelper} from "@tanstack/react-table";
import {DataTable} from "@/Components/molecules/DataTable.tsx";
import {route, useRoute} from "ziggy-js";
import {EllipsisVertical, FilePlus2, FileX2, Plus} from "lucide-react";
import {Text} from "@/Components/atoms/Text";
import {Button} from "@/shadcn/ui/button.tsx";
import {Link} from "@inertiajs/react";
import Surface from "@/Components/atoms/Surface";
import Avatar from "@/Components/atoms/Avatar";
import {Card, CardContent, CardHeader, CardTitle} from "@/shadcn/ui/card.tsx";
import Title from "@/Components/atoms/Title";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs.tsx";
import {Calendar} from "@/shadcn/ui/calendar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/shadcn/ui/dropdown-menu.tsx'

const Index = ({historias}: IndexProps) => {

    const can = usePermission()

    if (can('historias-index-all')) {
        return (
            <AuthLayout title={'Historias'}>
                <ScrollArea className={'bg-white h-full'}>
                    <div className={'px-6'}>
                        <DataTable columns={historiaIndexTableColDef} data={historias} searchable={true}/>
                    </div>
                </ScrollArea>
            </AuthLayout>
        )
    } else {
        return (
            <AuthLayout title={'Historias'}>
                <ScrollArea className={'h-full'}>
                    <div className={'px-6 h-[900px] grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-6'}>
                        <Card className={'col-span-3 row-span-2'}>
                            <CardHeader>
                                <CardTitle>
                                    <Title level={'title-lg'}>
                                        Historias
                                    </Title>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue={'all'}>
                                    <TabsList className="grid w-full grid-cols-5">
                                        <TabsTrigger value="all"
                                                     className={'max-sm:text-xs max-sm:truncate'}>Todas</TabsTrigger>
                                        <TabsTrigger value="open"
                                                     className={'max-sm:text-xs max-sm:truncate'}>Abiertas</TabsTrigger>
                                        <TabsTrigger value="turnedin"
                                                     className={'max-sm:text-xs max-sm:truncate'}>Entregadas</TabsTrigger>
                                        <TabsTrigger value="correction"
                                                     className={'max-sm:text-xs max-sm:truncate'}>Correcciones</TabsTrigger>
                                        <TabsTrigger value="close"
                                                     className={'max-sm:text-xs max-sm:truncate'}>Cerradas</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value={'all'}>
                                        <AllHCESection historias={historias}/>
                                    </TabsContent>
                                    <TabsContent value={'open'}>
                                        <HCEListSection
                                            historias={historias.filter(historia => historia.status?.toString() === 'abierta')}/>
                                    </TabsContent>
                                    <TabsContent value={'turnedin'}>
                                        <HCEListSection
                                            historias={historias.filter(historia => historia.status?.toString() === 'entregada')}/>
                                    </TabsContent>
                                    <TabsContent value={'correction'}>
                                        <HCEListSection
                                            historias={historias.filter(historia => historia.status?.toString() === 'correccion')}/>
                                    </TabsContent>
                                    <TabsContent value={'close'}>
                                        <HCEListSection
                                            historias={historias.filter(historia => historia.status?.toString() === 'cerrada')}/>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        <Card className={'col-span-1'}>
                            <CardHeader>
                                <CardTitle>
                                    <Title level={'title-lg'}>
                                        Calendario
                                    </Title>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className={'flex justify-center'}>
                                <Calendar/>
                            </CardContent>
                        </Card>
                    </div>
                </ScrollArea>
            </AuthLayout>
        )
    }
}

type IndexProps = {
    historias: Historia[]
}

const columnHelper: ColumnHelper<Historia> = createColumnHelper<Historia>()

const historiaIndexTableColDef: ColumnDef<Historia>[] = [
    columnHelper.accessor((historia: Historia) => historia.numero ?? 'Sin asignar', {
        meta: {title: 'Número de historia', searchable: true},
        id: 'code',
        header: 'Número de historia',
    }),
    columnHelper.accessor((historia: Historia) => `${historia.paciente?.nombre ?? ''} ${historia.paciente?.apellido ?? ''}`, {
        meta: {title: 'Paciente', searchable: true
        },
        id: 'patient',
        header: 'Paciente'
    }),
    columnHelper.accessor((historia: Historia) => historia.paciente?.edad ?? '-', {
        meta: {title: 'Edad', searchable: true},
        id: 'age',
        header: 'Edad',
    }),
    columnHelper.accessor((historia: Historia) => historia.paciente?.cedula ?? '-', {
        meta: {title: 'Cédula del paciente', searchable: true},
        id: 'cedula',
        header: 'Cédula del paciente',
    }),
    columnHelper.accessor((historia: Historia) => `${historia.autor?.profile?.apellidos + ',' ?? ''} ${historia.autor?.profile?.nombres ?? ''}`, {
        meta: {title: 'Autor', searchable: true},
        id: 'author',
        header: 'Autor',
    }),
    columnHelper.accessor((historia: Historia) => historia.autor?.profile?.cedula, {
        meta: {title: 'Cédula del autor', searchable: true},
        id: 'author_cedula',
        header: 'Cédula del autor',
    }),
    columnHelper.display({
        id: 'actions',
        cell: ({row}) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <EllipsisVertical/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={route('historias.show', {historia: row.original.id})}>
                                Ver historia
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    })
]

const AllHCESection = ({historias}: { historias: Historia[] }) => {

    const route = useRoute()

    return (
        <div className={'flex flex-col'}>
            <ScrollArea className={'h-[680px]'}>
                <div className={'h-[680px] space-y-4'}>
                    {
                        (historias.length !== 0) ?
                            (
                                historias.map(historia => (<HistoriaItem key={historia.id} historia={historia}/>))
                            ) : (
                                <div className={'h-full flex justify-center items-center flex flex-col gap-4'}>
                                    <FilePlus2 className={'size-20 mb-4 text-slate-300'}/>
                                    <Text className={'text-center'}>¡Aun no tiene historias! Crea una nueva historia</Text>
                                    <Button role={'link'} asChild>
                                        <Link href={route('historias.create')}><Plus className={'mr-2'}/>Crear
                                            historia</Link>
                                    </Button>
                                </div>
                            )
                    }
                </div>
            </ScrollArea>
        </div>
    )
}

const HCEListSection = ({historias}: { historias: Historia[] }) => {
    return (
        <div className={'flex flex-col'}>
            <ScrollArea className={'h-[680px]'}>
                <div className={'h-[680px] space-y-4'}>
                    {
                        (historias.length !== 0) ?
                            (
                                historias.map(historia => (<HistoriaItem key={historia.id} historia={historia}/>))
                            ) : (
                                <div className={'h-full flex justify-center items-center gap-4 flex flex-col'}>
                                    <FileX2 className={'size-20 mb-4 text-slate-300'}/>
                                    <Text>No existen historias</Text>
                                </div>
                            )
                    }
                </div>
            </ScrollArea>
        </div>
    )
}

const HistoriaItem = ({historia}: { historia: Historia }) => {

    return (
        <div>
            <Link href={route('historias.show', {historia: historia.id})}>
                <Surface className={'h-[100px] flex items-center px-6 gap-4'}>
                    <div className={'w-16 flex-none'}>
                        <Avatar className={'w-full h-auto aspect-square'} picture={historia.paciente?.foto_url}/>
                    </div>

                    <div>
                        <Text>
                            Paciente: {`${historia.paciente?.nombre ?? ''} ${historia.paciente?.apellido ?? ''}`}
                        </Text>
                        <div className={'flex gap-2'}>
                            <Text level={'body-sm'} className={'text-slate-500'}>
                                {historia.paciente?.cedula ?? ''}
                            </Text>
                            <Text level={'body-sm'} className={'text-slate-500'}>
                                Edad: {historia.paciente?.edad}
                            </Text>
                        </div>
                    </div>
                </Surface>
            </Link>
        </div>
    )
}

export default Index
