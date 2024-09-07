import React from "react";
import AuthLayout from "@/Layouts/AuthLayout.js";
import {LayoutDashboard, Users} from 'lucide-react'
import {ClipboardDocumentIcon} from '@heroicons/react/24/outline'
import SidebarMenu, {MenuItem} from "@/Components/organisms/SidebarMenu";

const menu = [
    {name: 'Inicio', link: 'dashboard', icon: <LayoutDashboard/>},
    {name: 'Historias', icon: <ClipboardDocumentIcon/>, link: 'historias.dashboard'},
    {icon: <Users/>, link: "groups.index", name: "Grupos"}
] satisfies MenuItem[]

const Dashboard = ({auth}) => {


    return (
        <AuthLayout title={'Resumen'} sidebar={(<SidebarMenu menu={menu}/>)}>
            <div className={"p-6"}>


            </div>
        </AuthLayout>
    );
}

export default Dashboard
