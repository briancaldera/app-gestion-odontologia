import AuthLayout from "@/Layouts/AuthLayout.jsx";
import {Text} from "@/Components/atoms/Text.jsx";
import {Button} from "@/Components/molecules/Button.jsx";
import {DocumentTextIcon} from "@heroicons/react/24/outline/index.js";
import React from "react";
import { router } from '@inertiajs/react'
import { useRoute } from 'ziggy-js'

const Dashboard = ({historias}) => {

    return (
        <AuthLayout title={'Historias'}>
            <EmptySection/>
        </AuthLayout>
    )
}

const EmptySection = () => {
    const route = useRoute()
    return (
        <div className={'h-full relative px-20'}>
            <div className={'absolute z-20 h-full flex flex-col justify-center gap-4 -mt-6'}>
                <div>
                    <Text level={'h2'}>Crea una nueva historia</Text>
                    <Text level={'body-lg'}>Comencemos creando tu primera historia clínica digital</Text>
                </div>
                <div className={''}>
                    <Button label={'Crear historia'} onClick={() => router.visit(route('dashboard'))} />
                </div>

            </div>
            <div className={'absolute z-10 max-w-md text-slate-300/50 inset-y-0 flex right-0'}>
                <DocumentTextIcon/>
            </div>
        </div>
    )
}

const Sidebar = () => {

}

export default Dashboard
