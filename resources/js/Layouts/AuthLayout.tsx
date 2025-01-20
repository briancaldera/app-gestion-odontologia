import {Head} from "@inertiajs/react";
import React, {useContext} from "react";
import {TooltipProvider} from "@/Components/atoms/Tooltip"
import {SidebarProvider} from "@/shadcn/ui/sidebar.tsx";
import {AppSidebar} from "@/shadcn/ui/app-sidebar.tsx";
import AuthNavbar from "@/Components/organisms/AuthNavbar.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BaseContext} from "@/Layouts/BaseLayout.tsx";

const AuthContext = React.createContext({})

const queryClient = new QueryClient();

const AuthLayout = ({title, children}) => {

    const {expandSidebar, setExpandSidebar} = useContext(BaseContext)

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={{}}>
                <Head title={title}/>
                <TooltipProvider>
                    <SidebarProvider open={expandSidebar} onOpenChange={setExpandSidebar}>
                        <AppSidebar/>
                        <main className='flex-1 flex flex-col pt-14 sm:pt-20 bg-slate-100 dark:bg-slate-900'>
                            <AuthNavbar/>
                            {children}
                        </main>
                    </SidebarProvider>
                </TooltipProvider>
            </AuthContext.Provider>
        </QueryClientProvider>
    )
}

export {AuthContext}
export default AuthLayout
