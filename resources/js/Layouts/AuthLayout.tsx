import {Head, router} from "@inertiajs/react";
import React from "react";
import AuthNavbar from "@/Components/organisms/AuthNavbar.tsx";
import Loader from "@/Components/atoms/Loader.tsx";
import {TooltipProvider} from "@/Components/atoms/Tooltip"
import SidebarMenu from "@/Components/organisms/SidebarMenu.tsx";

const DARK_MODE_KEY = 'dark_mode'

export const AuthContext = React.createContext({})

const AuthLayout = ({title, sidebar, children}) => {

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

    const [isSidebarExpanded, setIsSidebarExpanded] = React.useState<boolean>(true)

    return (
        <AuthContext.Provider value={{isDarkMode: isDarkMode, toggleDarkMode: handleToggleDarkMode}}>
            <TooltipProvider>
                <Head title={title}/>
                <div className={`${isDarkMode ? 'dark' : ''} bg-slate-100 dark:bg-slate-900 h-dvh flex flex-col`}>
                    <SidebarMenu expanded={isSidebarExpanded}/>
                    <AuthNavbar/>
                    <div className={'z-50 absolute bottom-0 left-0 p-4'} hidden={!loading}>
                        <Loader/>
                    </div>
                    <main
                        className={`pt-14 sm:pt-20 lg:pb-0 pb-10 ${isSidebarExpanded ? 'lg:pl-72' : 'lg:pl-28'} h-full basis-full flex-none`}>
                        {children}
                    </main>
                </div>
            </TooltipProvider>
        </AuthContext.Provider>
    )
}

export default AuthLayout
