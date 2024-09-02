import React from "react";
import AuthLayout from "@/Layouts/AuthLayout.jsx";
import {ClipboardDocumentIcon} from '@heroicons/react/24/outline'
import SidebarMenu, {MenuItem} from "@/Components/organisms/SidebarMenu";

const menu = [
    {name: 'Historias',  icon: <ClipboardDocumentIcon/>, link: 'historias.dashboard'}
] satisfies MenuItem[]

const Dashboard = ({auth}) => {


    return (
        <AuthLayout title={'Resumen'} sidebar={(<SidebarMenu menu={menu} />)}>
            <div className={"p-6"}>


            </div>
        </AuthLayout>
    );
}

export default Dashboard
