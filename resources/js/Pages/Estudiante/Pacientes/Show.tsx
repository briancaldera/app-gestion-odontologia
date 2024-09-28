import AuthLayout from "@/Layouts/AuthLayout.tsx";
import Paciente from "@/src/models/Paciente.ts";
import React from "react";
import {usePermission} from "@/src/Utils/Utils.ts";
import {EllipsisVertical, User} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs"
import Title from "@/Components/atoms/Title";
import {Button} from "@/shadcn/ui/button.tsx";
import {Separator} from "@/shadcn/ui/separator.tsx";
import Label from "@/Components/atoms/Label";
import {format, formatDistanceToNow} from 'date-fns'
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import Image from "@/Components/atoms/Image.tsx";
import {Icon} from "@/Components/atoms/Icon";

type ShowProps = {
    paciente: Paciente
}

const Show = ({paciente}: ShowProps) => {

    const can = usePermission()

    console.log(paciente)

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
    return (
        <div className={'h-full flex flex-col'}>
            <div className={'grid grid-cols-4 px-6 py-6'}>
                <div className={'col-span-2 flex gap-2 py-3'}>
                    {/*image*/}
                    <div className={'size-28 rounded-full shadow-inner overflow-hidden'}>
                        {
                            paciente.foto ?
                                (
                                    <Image src={paciente.foto} className={'w-full h-auto object-contain aspect-square'}/>
                                ) : (
                                    <div className={'h-full flex justify-center items-center'}>
                                        <Icon className={'text-slate-200 size-fit'}>
                                            <User className={'size-16'}/>
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
                        <Button className={'bg-indigo-500'}>Crear Historia</Button>
                        <Button variant={'outline'}><EllipsisVertical/></Button>
                    </div>
                </div>

            </div>
            <div className={'basis-full'}>
                <Tabs defaultValue={'information'} className={'w-full'}>
                    <TabsList
                        className={'flex justify-start w-full bg-transparent border-b-2 border-b-slate-200 rounded-none p-0'}>
                        <TabsTrigger value={'information'} className={tabTriggerStyle}>Información</TabsTrigger>
                        <TabsTrigger value={'historias'} className={tabTriggerStyle}>Historia Médica</TabsTrigger>
                    </TabsList>
                    <TabsContent value={'information'}>
                        <InformationSection paciente={paciente}/>
                    </TabsContent>
                    <TabsContent value={'historias'}>
                        <HistoriasSection/>
                    </TabsContent>
                </Tabs>
            </div>

        </div>
    )
}

const InformationSection = ({paciente}: { paciente: Paciente }) => {
    return (
        <div className={'px-6'}>
            <section className={'grid grid-cols-2 sm:grid-cols-3 gap-y-8 pt-6'}>

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

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Fecha de nacimiento</Title>
                    <Title className={'font-semibold'}>{paciente.fecha_nacimiento}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Dirección</Title>
                    <Title className={'font-semibold'}>{paciente.direccion}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Teléfono</Title>
                    <Title className={'font-semibold'}>{paciente.telefono}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Ocupación</Title>
                    <Title className={'font-semibold'}>{paciente.ocupacion}</Title>
                </div>

            </section>
            <Separator className={'mt-8'}/>
            <section className={'grid grid-cols-2 sm:grid-cols-3 gap-y-8 pt-6'}>

                <div className={'col-span-full border-l-4 border-l-indigo-500 pl-4'}>
                    <Title className={'uppercase font-semibold'}>Información médica</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Edad</Title>
                    <Title className={'font-semibold'}>{paciente?.edad ?? 'No autorizado para ver'}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Sexo</Title>
                    <Title className={'font-semibold'}>{paciente.sexo ?? 'No autorizado para ver'}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Peso</Title>
                    <Title className={'font-semibold'}>{paciente?.peso + ' Kg' ?? 'No autorizado para ver'}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Motivo de consulta</Title>
                    <Title className={'font-semibold'}>{paciente.motivo_consulta}</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Enfermedad actual</Title>
                    <Title className={'font-semibold'}>{paciente.enfermedad_actual}</Title>
                </div>

            </section>
            <Separator className={'mt-8'}/>
            <section className={'grid grid-cols-2 sm:grid-cols-3 gap-y-8 pt-6'}>

                <div className={'col-span-full border-l-4 border-l-indigo-500 pl-4'}>
                    <Title className={'uppercase font-semibold'}>Información de registro</Title>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Fecha de registro</Title>
                    <div>
                        <Title
                            className={'font-semibold'}>{paciente?.created_at ? format(paciente.created_at, 'P') : 'No autorizado para ver'}</Title>
                        <Label
                            className={'text-slate-400 font-normal'}>{paciente?.created_at && formatDistanceToNow(paciente.created_at)}</Label>
                    </div>
                </div>

                <div className={'space-y-2'}>
                    <Title className={'font-semibold text-neutral-400'}>Fecha de última actualización</Title>
                    <div>
                        <Title
                            className={'font-semibold'}>{paciente?.updated_at ? format(paciente.updated_at, 'P') : 'No autorizado para ver'}</Title>
                        <Label
                            className={'text-slate-400 font-normal'}>{paciente?.updated_at && formatDistanceToNow(paciente.updated_at)}</Label>
                    </div>
                </div>

            </section>
        </div>
    )
}

const HistoriasSection = () => {
    return (
        <div>

        </div>
    )
}

export default Show
