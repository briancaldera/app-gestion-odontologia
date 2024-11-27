import AuthLayout from "@/Layouts/AuthLayout.tsx";
import Paciente from "@/src/models/Paciente.ts";
import React from "react";
import {usePermission} from "@/src/Utils/Utils.ts";
import {EllipsisVertical, FolderOpen, History, User as UserIcon} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs.tsx"
import Title from "@/Components/atoms/Title";
import {Button} from "@/shadcn/ui/button.tsx";
import {Separator} from "@/shadcn/ui/separator.tsx";
import Label from "@/Components/atoms/Label";
import {format, formatDistanceToNow} from 'date-fns'
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import Image from "@/Components/atoms/Image.tsx";
import {Icon} from "@/Components/atoms/Icon.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from '@/shadcn/ui/dropdown-menu.tsx'
import {Text} from "@/Components/atoms/Text";
import {Link, usePage} from "@inertiajs/react";
import {route} from "ziggy-js";
import User from '@/src/models/User.ts'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/shadcn/ui/alert-dialog.tsx";
import HistoriaCirugiaButton from "@/Pages/Pacientes/Partials/HistoriaCirugiaButton.tsx";

type ShowProps = {
    paciente: Paciente
}

const Show = ({paciente}: ShowProps) => {

    return (
        <AuthLayout title={`Paciente - ${paciente.nombre} ${paciente.apellido}`}>
            <ScrollArea className={'h-full bg-white'}>
                <PacienteInfoSection paciente={paciente}/>
            </ScrollArea>
        </AuthLayout>
    )
}

const tabTriggerStyle = 'py-2.5 rounded-none ring-0 shadow-none px-12 text-slate-400 data-[state=active]:text-indigo-500 border-b-2 border-b-slate-200 data-[state=active]:border-b-indigo-500'

const PacienteInfoSection = ({paciente}: { paciente: Paciente }) => {

    const user: User | null = usePage().props.auth.user
    const can = usePermission()

    return (
        <div className={'h-full flex flex-col'}>
            <div className={'grid grid-cols-4 px-6 py-6'}>
                <div className={'col-span-2 flex gap-2 py-3'}>
                    {/*image*/}
                    <div className={'size-28 rounded-full shadow-inner overflow-hidden'}>
                        {
                            paciente.foto ?
                                (
                                    <Image src={paciente.foto}
                                           className={'w-full h-auto object-contain aspect-square'}/>
                                ) : (
                                    <div className={'h-full flex justify-center items-center'}>
                                        <Icon className={'text-slate-200 size-fit'}>
                                            <UserIcon className={'size-16'}/>
                                        </Icon>
                                    </div>
                                )
                        }
                    </div>
                    <div className={'flex flex-col'}>
                        <Title level={'h3'}>{`${paciente.nombre} ${paciente.apellido}`}</Title>
                    </div>

                </div>
                <div className={'col-start-4 py-3'}>
                    <div className={'flex justify-end items-center gap-3'}>
                        {
                            can('pacientes-update') && paciente.assigned_to === user?.id || can('pacientes-full-control') && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant={'outline'}><EllipsisVertical/></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align={"end"}>
                                        {can('pacientes-update') &&
                                            <DropdownMenuItem asChild>
                                                <Link href={route('pacientes.edit', {paciente: paciente.id})}>
                                                    <Text>
                                                        Editar
                                                    </Text>
                                                </Link>
                                            </DropdownMenuItem>
                                        }
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        }
                    </div>
                </div>

            </div>
            <div className={'basis-full'}>
                <Tabs defaultValue={'information'} className={'w-full h-full'}>
                    <TabsList
                        className={'flex justify-start w-full bg-transparent border-b-2 border-b-slate-200 rounded-none p-0'}>
                        <TabsTrigger value={'information'} className={tabTriggerStyle}>Información</TabsTrigger>
                        <TabsTrigger value={'historias'} className={tabTriggerStyle}>Historia Clínica</TabsTrigger>
                    </TabsList>
                    <TabsContent value={'information'}>
                        <InformationSection paciente={paciente}/>
                    </TabsContent>
                    <TabsContent value={'historias'}>
                        <HistoriasSection paciente={paciente}/>
                    </TabsContent>
                </Tabs>
            </div>

        </div>
    )
}

const InformationSection = ({paciente}: { paciente: Paciente }) => {
    return (
        <div className={'px-6'}>
            <section className={'grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-6 pt-6'}>

                <div className={'col-span-full border-l-4 border-l-indigo-500 pl-4'}>
                    <Title className={'uppercase font-semibold'}>Información personal</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Nombre</Title>
                    <Title className={'font-semibold'}>{paciente.nombre}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Apellido</Title>
                    <Title className={'font-semibold'}>{paciente.apellido}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Cédula</Title>
                    <Title className={'font-semibold'}>{paciente.cedula}</Title>
                </div>

                <div className={'space-y-2 col-start-1'}>
                    <Title className={'font-semibold text-neutral-400'}>Edad</Title>
                    <Title className={'font-semibold'}>{paciente?.edad ?? 'No autorizado para ver'}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Sexo</Title>
                    <Title className={'font-semibold'}>{paciente.sexo ?? 'No autorizado para ver'}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Peso</Title>
                    <Title className={'font-semibold'}>{paciente?.peso + ' Kg'}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Fecha de nacimiento</Title>
                    <Title className={'font-semibold'}>{paciente.fecha_nacimiento}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Ocupación</Title>
                    <Title className={'font-semibold'}>{paciente.ocupacion}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Teléfono</Title>
                    <Title className={'font-semibold'}>{paciente.telefono}</Title>
                </div>

                <div className={'space-y-2 col-span-full'}>
                    <Title className={'font-semibold text-neutral-400'}>Dirección</Title>
                    <Title className={'font-semibold'}>{paciente.direccion}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>En caso de emergencia contactar</Title>
                    <Title className={'font-semibold'}>{paciente.informacion_emergencia?.contacto}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Teléfono emergencia</Title>
                    <Title className={'font-semibold'}>{paciente.informacion_emergencia?.telefono}</Title>
                </div>

            </section>
            <Separator className={'mt-8'}/>
            <section className={'grid grid-cols-1 sm:grid-cols-3 gap-y-8 pt-6 gap-x-6'}>

                <div className={'col-span-full border-l-4 border-l-indigo-500 pl-4'}>
                    <Title className={'uppercase font-semibold'}>Información clínica</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Diagnóstico</Title>
                    <Title className={'font-semibold'}>{paciente.motivo_consulta}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Tratamiento indicado</Title>
                    <Title className={'font-semibold'}>{paciente.enfermedad_actual}</Title>
                </div>

            </section>
            <Separator className={'mt-8'}/>
            <section className={'grid grid-cols-2 sm:grid-cols-3 gap-y-8 pt-6 gap-x-6'}>

                <div className={'col-span-full border-l-4 border-l-indigo-500 pl-4'}>
                    <Title className={'uppercase font-semibold'}>Información de registro</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Fecha de registro</Title>
                    <div>
                        <Title
                            className={'font-semibold'}>{paciente?.created_at ? format(paciente.created_at, 'P') : 'No autorizado para ver'}</Title>
                        <Label
                            className={'text-slate-400 font-normal'}>Hace {paciente?.created_at && formatDistanceToNow(paciente.created_at)}</Label>
                    </div>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Fecha de última actualización</Title>
                    <div>
                        <Title
                            className={'font-semibold'}>{paciente?.updated_at ? format(paciente.updated_at, 'P') : 'No autorizado para ver'}</Title>
                        <Label
                            className={'text-slate-400 font-normal'}>Hace {paciente?.updated_at && formatDistanceToNow(paciente.updated_at)}</Label>
                    </div>
                </div>

            </section>
        </div>
    )
}

const HistoriasSection = ({paciente}: { paciente: Paciente }) => {
    return (
        <div className={'h-[50vw] px-4 rounded-lg '}>
            <div className={'flex h-full border flex-wrap'}>
                <div className={'basis-1/3 p-4 flex flex-col'}>

                    <div className={'inline-flex gap-2'}>
                        <Icon>
                            <FolderOpen/>
                        </Icon>
                        <Title level={'title-lg'}>Historias</Title>
                    </div>

                    <ScrollArea className={'flex-1'}>
                        <div className={'flex flex-col gap-y-3 py-2'}>

                            <HistoriaItem paciente={paciente}/>
                            <HistoriaEndodonciaItem paciente={paciente}/>
                            <HistoriaCirugiaButton paciente={paciente}/>

                        </div>
                    </ScrollArea>

                </div>

                <div className={'basis-2/3 bg-slate-100 p-4 flex flex-col'}>
                    <div className={'inline-flex gap-2'}>
                        <Icon>
                            <History/>
                        </Icon>
                        <Title level={'title-lg'}>Línea de tiempo</Title>
                    </div>

                    <div className={'flex-1 bg-indigo-500'}>

                    </div>

                </div>
            </div>
        </div>
    )
}

const HistoriaItem = ({paciente}: { paciente?: Paciente | null }) => {

    const historia = paciente?.historia

    return (
        <div
            className={`group h-32 border bg-${historia ? 'sky' : 'slate'}-100 border-${historia ? 'sky' : 'slate'}-400 rounded-lg p-3 flex flex-col`}>
            <div>
                <Title>Historia regular</Title>
            </div>
            {
                historia ? (
                    <div className={'flex-1 flex justify-center items-center gap-x-3'}>
                        <Text>
                            Historia clínica creada
                        </Text>
                        <Button asChild>
                            <Link href={route('historias.show', {historia: historia.id})}>
                                Ver historia clínica
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className={'flex-1 flex justify-center items-center gap-x-3'}>
                        <Text>
                            No hay historia clinica creada
                        </Text>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button>
                                    Crear
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Crear historia clínica
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Estás a punto de crear la historia clínica para este paciente. ¿Deseas
                                        continuar?
                                    </AlertDialogDescription>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancelar
                                        </AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <Link href={route('historias.store')} method={'post'}
                                                  data={{paciente_id: paciente?.id}} as={'button'}>
                                                Crear historia clínica
                                            </Link>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogHeader>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )
            }

        </div>
    )
}

const HistoriaEndodonciaItem = ({paciente}: { paciente: Paciente }) => {

    const historia = paciente.historia_endodoncia ?? null

    return (
        <>
            <div
                className={`group h-32 border bg-${historia ? 'sky' : 'slate'}-100 border-${historia ? 'sky' : 'slate'}-400 rounded-lg p-3 flex flex-col`}>
                <div>
                    <Title>Historia de endodoncia</Title>
                </div>
                {
                    historia ? (
                        <div className={'flex-1 flex justify-center items-center gap-x-3'}>
                            <Text>
                                Historia de endodoncia creada
                            </Text>
                            <Button asChild>
                                <Link href={route('endodoncia.historias.show', {historia: historia.id})}>
                                    Ver historia de endodoncia
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className={'flex-1 flex justify-center items-center gap-x-3'}>
                            <Text>
                                No hay historia de endodoncia creada
                            </Text>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button>
                                        Crear
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Crear historia de endodoncia
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Estás a punto de crear la historia de endodoncia para este paciente. ¿Deseas
                                            continuar?
                                        </AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancelar
                                            </AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                                <Link href={route('endodoncia.historias.store')} method={'post'}
                                                      data={{paciente_id: paciente.id}} as={'button'}>
                                                    Crear historia de endodoncia
                                                </Link>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogHeader>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default Show
