import {Icon} from "@/Components/atoms/Icon.jsx";
import Title from "@/Components/atoms/Title.jsx";
import React from "react";
import AuthLayout from "@/Layouts/AuthLayout.jsx";
import {ClipboardDocumentIcon} from '@heroicons/react/24/outline'
import {Link} from "@inertiajs/react";
import {useRoute} from 'ziggy-js'

const Dashboard = ({auth}) => {

    return (
        <AuthLayout title={'Resumen'} sidebar={(<Sidebar />)}>
            <div className={"p-6"}>


            </div>
        </AuthLayout>
    );
}

const sidebarMenu = [
    {name: 'Historias',  icon: <ClipboardDocumentIcon/>}
]

const Sidebar = () => {
    const route = useRoute()

    return (
        <div className={'p-6'}>
            <div className={'space-y-1'}>
                {sidebarMenu.map((section, index) =>
                    <Link href={route('historia')} key={index} onClick={() => {
                    }}
                        className={`flex items-center gap-2 rounded-lg p-2 cursor-pointer hover:bg-white/10`}>
                        <Icon className={'size-8 text-white'}>
                            {section.icon}
                        </Icon>
                        <Title className={'text-white'} level={'title-md'}>{section.name}</Title>
                    </Link>)}
            </div>
        </div>
    )
}

export default Dashboard
