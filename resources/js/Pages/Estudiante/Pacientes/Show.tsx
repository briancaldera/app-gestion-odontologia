import AuthLayout from "@/Layouts/AuthLayout.tsx";
import Paciente from "@/src/models/Paciente.ts";
import React from "react";
import {usePermission} from "@/src/Utils/Utils.ts";
import Surface from "@/Components/atoms/Surface";

type ShowProps = {
    paciente: Paciente
}

const Show = ({paciente}: ShowProps) => {

    const can = usePermission()

    return (
        <AuthLayout title={`Paciente - ${paciente.nombre} ${paciente.apellido}`}>
            <div className={'h-full p-6 grid grid-cols-3 gap-6'}>
                <Surface className={'col-span-2'}>


                </Surface>
                <Surface className={'col-span-1'}>


                </Surface>
            </div>
        </AuthLayout>
    )
}

export default Show
