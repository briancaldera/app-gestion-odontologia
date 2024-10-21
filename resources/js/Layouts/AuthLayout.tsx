import {Head, Link, router, usePage} from "@inertiajs/react";
import React from "react";
import AuthNavbar from "@/Components/organisms/AuthNavbar.tsx";
import Loader from "@/Components/atoms/Loader.tsx";
import Logo from "@/Components/atoms/Logo.js";
import {useRoute} from 'ziggy-js'
import {TooltipProvider} from "@/Components/atoms/Tooltip"
import SidebarMenu from "@/Components/organisms/SidebarMenu.tsx";

const DARK_MODE_KEY = 'dark_mode'

export const AuthContext = React.createContext({})

const AuthLayout = ({title, sidebar, children}) => {

    const {auth: {user}} = usePage().props
    const route = useRoute()
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

    const can = React.useCallback((permission: string): boolean => (user?.permissions ?? []).some(p => p === permission), [user]) // todo remove this

    const [isSidebarExpanded, setIsSidebarExpanded] = React.useState<boolean>(true)

    return (
        <AuthContext.Provider value={{isDarkMode: isDarkMode, toggleDarkMode: handleToggleDarkMode, can: can}}>
            <TooltipProvider>
                <Head title={title}/>
                <div className={`${isDarkMode ? 'dark' : ''} bg-slate-100 dark:bg-slate-900 h-screen flex flex-col`}>
                    <SidebarMenu expanded={isSidebarExpanded}/>
                    <AuthNavbar/>
                    <div className={'z-50 absolute bottom-0 left-0 p-4'} hidden={!loading}>
                        <Loader/>
                    </div>
                    <main
                        className={`pt-14 sm:pt-20 lg:pb-0 pb-16 ${isSidebarExpanded ? 'lg:pl-72' : 'lg:pl-28'} h-full basis-full flex-none`}>
                        {children}
                    </main>
                </div>
            </TooltipProvider>
        </AuthContext.Provider>
    )
}

export default AuthLayout
