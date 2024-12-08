import AuthLayout from "@/Layouts/AuthLayout.tsx";
import User from "@/src/models/User.ts";
import Title from "@/Components/atoms/Title";
import Paciente from "@/src/models/Paciente.ts";
import Historia from "@/src/models/Historia.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/shadcn/ui/avatar.tsx";
import React from "react";
import {Link} from "@inertiajs/react";

type ShowProps = {
    user: User
    pacientes: Paciente[]
    historias: Historia[]
}

const Show = ({user, pacientes, historias}: ShowProps) => {

    const {profile} = user

    return (
        <AuthLayout title={`Asignado: ${profile?.nombres} ${profile?.apellidos}`}>
            <div className='bg-white h-full p-2'>
                <div>
                    <Title>Pacientes</Title>
                    <div className='h-32 overflow-y-scroll'>
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
                <div>
                    <Title>Historias</Title>
                    <div>
                        <div>
                            Abiertas
                        </div>
                        <div>
                            Cerradas
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Show
