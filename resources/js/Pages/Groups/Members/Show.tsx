import AuthLayout from "@/Layouts/AuthLayout.tsx";
import User from "@/src/models/User.ts";
import Title from "@/Components/atoms/Title";
import Paciente from "@/src/models/Paciente.ts";
import Historia, {Status} from "@/src/models/Historia.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/shadcn/ui/avatar.tsx";
import React from "react";
import {Link} from "@inertiajs/react";
import {Text} from "@/Components/atoms/Text";
import {format} from "date-fns";

type ShowProps = {
    member: User
    pacientes: Paciente[]
    historias: Historia[]
}

const Show = ({member, pacientes, historias}: ShowProps) => {

    const {profile} = member

    return (
        <AuthLayout title={`Asignado: ${profile?.nombres} ${profile?.apellidos}`}>
            <div className='bg-white h-full p-4'>
                <div>
                    <Title level='h2'>Alumno asignado</Title>
                    <div className={'flex gap-x-2 items-center'}>
                        <Avatar className='size-28'>
                            <AvatarImage src={profile?.picture_url}/>
                            <AvatarFallback>{`${profile?.nombres[0]}${profile?.apellidos[0]}`}</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col flex-1'>
                            <Title level='title-sm'>{`${profile?.nombres} ${profile?.apellidos}`}</Title>
                            <Text level='body-xs'>{`@${member.name}`}</Text>
                        </div>
                    </div>
                </div>
                <div>
                    <Title level='h3'>Pacientes</Title>
                    <div className='overflow-y-scroll flex flex-col gap-y-3'>
                        {
                            pacientes.map((paciente) => (
                                <Link href={route('pacientes.show', {paciente: paciente.id})} key={paciente.id}>
                                    <div className={'flex gap-x-2 items-center'}>
                                        <Avatar>
                                            <AvatarImage src={paciente?.foto}/>
                                            <AvatarFallback>{`${paciente.nombre[0]}${paciente.apellido[0]}`}</AvatarFallback>
                                        </Avatar>
                                        <div className='flex flex-col flex-1'>
                                            <Title level='title-sm'>{`${paciente.nombre} ${paciente.apellido}`}</Title>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className='py-4'>
                    <Title level='h3'>Historias</Title>
                    <div className='overflow-y-scroll flex flex-col gap-y-3'>
                        <Title level='h4'>Abiertas</Title>
                        <div className={'flex flex-col gap-y-3'}>

                        {
                            historias.filter((historia) => historia.status === Status.ABIERTA).map((historia) => (
                                <Link href={route('historias.show', {historia: historia.id})}>
                                    <div className='flex flex-col'>
                                        <Title>HCN° {historia.numero ?? 'Sin asignar'}</Title>
                                        <Text level='body-sm'>Fecha {format(historia.created_at, 'P')}</Text>
                                        <div className='flex gap-x-3'>
                                            <Text level='body-sm'>Semestre: {`${historia.semestre ?? ''}`}</Text>

                                        </div>
                                        <Text level='body-sm'>Paciente: {`${historia.paciente?.nombre} ${historia.paciente?.apellido}`}</Text>
                                    </div>
                                </Link>
                            ))
                        }
                        </div>

                        <Title level='h4'>Cerradas</Title>
                        <div className={'flex flex-col gap-y-3'}>
                        {
                            historias.filter((historia) => historia.status === Status.CERRADA).map((historia) => (
                                <Link href={route('historias.show', {historia: historia.id})}>
                                    <div className='flex flex-col'>
                                        <Title>HCN° {historia.numero ?? 'Sin asignar'}</Title>
                                        <Text level='body-sm'>Fecha {format(historia.created_at, 'P')}</Text>
                                        <div className='flex gap-x-3'>
                                            <Text level='body-sm'>Semestre: {`${historia.semestre ?? ''}`}</Text>

                                        </div>
                                        <Text level='body-sm'>Paciente: {`${historia.paciente?.nombre} ${historia.paciente?.apellido}`}</Text>
                                    </div>
                                </Link>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Show
