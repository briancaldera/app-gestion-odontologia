import {Head} from "@inertiajs/react";
import React from "react";
import {TooltipProvider} from "@/Components/atoms/Tooltip"
import {SidebarProvider} from "@/shadcn/ui/sidebar.tsx";
import {AppSidebar} from "@/shadcn/ui/app-sidebar.tsx";
import AuthNavbar from "@/Components/organisms/AuthNavbar.tsx";

const AuthContext = React.createContext({})

const AuthLayout = ({title, children}) => {

    return (
        <AuthContext.Provider value={{}}>
            <Head title={title}/>
            <TooltipProvider>
                <SidebarProvider defaultOpen={true}>
                    <AppSidebar/>
                    <main className='flex-1 pt-14 sm:pt-20 bg-slate-100 dark:bg-slate-900'>
                        <AuthNavbar/>
                        {children}
                    </main>
                </SidebarProvider>
            </TooltipProvider>
        </AuthContext.Provider>
    )
}

export {AuthContext}
export default AuthLayout
