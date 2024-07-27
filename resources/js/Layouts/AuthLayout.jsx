import {Head, usePage} from "@inertiajs/react";
import React from "react";
import Sidebar from "@/Components/organisms/Sidebar.jsx";
import {DocumentIcon} from '@heroicons/react/24/outline'
import {Icon} from "@/Components/atoms/Icon.jsx";

const AuthLayout = ({title, navbar, sidebar, children}) => {

    const {auth} = usePage().props

    const defaultSidebar = (
        <div className={'grid grid-cols-2 gap-2 p-6 justify-items-center'}>
            <div className={'aspect-square border-2 rounded-3xl border-dashed border-gray-300 p-10'}>
                <Icon><DocumentIcon/></Icon>
            </div>
            <div className={'aspect-square border-2 rounded-3xl border-dashed border-gray-300 p-10'}>
                <Icon><DocumentIcon/></Icon>
            </div>
            <div className={'aspect-square border-2 rounded-3xl border-dashed border-gray-300 p-10'}>
                <Icon><DocumentIcon/></Icon>
            </div>
            <div className={'aspect-square border-2 rounded-3xl border-dashed border-gray-300 p-10'}>
                <Icon><DocumentIcon/></Icon>
            </div>

        </div>
    )

    return (
        <>
            <Head title={title}/>
            <nav className={'z-100 fixed inset-x-0 top-0 bg-white h-20'}>{navbar}</nav>
            <aside className={'z-90 bg-white fixed inset-y-0 left-0 w-full max-w-72 pt-20'}>
                {defaultSidebar}
            </aside>
            <main className={'pt-20 pl-72 min-h-screen'}>
                {children}
            </main>
        </>
    )
}

export default AuthLayout
