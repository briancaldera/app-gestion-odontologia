import {Head, router} from "@inertiajs/react";
import React from "react";
import {TooltipProvider} from "@/Components/atoms/Tooltip"
import {SidebarProvider} from "@/shadcn/ui/sidebar.tsx";
import {AppSidebar} from "@/shadcn/ui/app-sidebar.tsx";
import AuthNavbar from "@/Components/organisms/AuthNavbar.tsx";

const DARK_MODE_KEY = 'dark_mode'

export const AuthContext = React.createContext({})

const AuthLayout = ({title, children}) => {

    const [loading, setLoading] = React.useState(false)
    const [isDarkMode, toggleDarkMode] = React.useState(false)

    React.useEffect(() => {
        let darkMode = window.localStorage.getItem(DARK_MODE_KEY)

        if (darkMode == null) {
            darkMode = 'false'
            window.localStorage.setItem(DARK_MODE_KEY, darkMode)
        }

        toggleDarkMode('true' === darkMode)
    }, [])

    React.useEffect(() => {
        let timeout = null
        const onStartListener = router.on('start', () => {
            timeout = setTimeout(() => setLoading(true), 250)
        })
        const onFinishListener = router.on('finish', () => {
            clearTimeout(timeout)
            setLoading(false)
        })

        return () => {
            onStartListener()
            onFinishListener()
        }
    }, []);

    const handleToggleDarkMode = () => {
        toggleDarkMode(value => {
            window.localStorage.setItem(DARK_MODE_KEY, !value ? 'true' : 'false')
            return !value
        })
    }

    return (
        <AuthContext.Provider value={{isDarkMode: isDarkMode, toggleDarkMode: handleToggleDarkMode}}>
            <Head title={title}/>
            <TooltipProvider>
                <SidebarProvider defaultOpen={true} className={`${isDarkMode ? 'dark' : ''}`}>
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

export default AuthLayout
