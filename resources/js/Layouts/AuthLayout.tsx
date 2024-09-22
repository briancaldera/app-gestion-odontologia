import {Head, Link, router, usePage} from "@inertiajs/react";
import React from "react";
import AuthNavbar from "@/Components/organisms/AuthNavbar.tsx";
import AuthSidebar from "@/Components/organisms/AuthSidebar.jsx"
import Loader from "@/Components/atoms/Loader.tsx";
import Logo from "@/Components/atoms/Logo.jsx";
import {useRoute} from 'ziggy-js'
import {TooltipProvider} from "@/Components/atoms/Tooltip"

const DARK_MODE_KEY = 'dark_mode'

export const AuthContext = React.createContext({})

const AuthLayout = ({title, navbar, sidebar, children}) => {

    const {auth: {user}} = usePage().props
    const route = useRoute()
    const [loading, setLoading] = React.useState(false)
    const [isDarkMode, toggleDarkMode] = React.useState(false)

    React.useEffect(() => {
        let darkMode = window.localStorage.getItem(DARK_MODE_KEY)

        if (darkMode) {
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

    const can = React.useCallback((permission: string): boolean => (user?.permissions ?? []).some(p => p === permission),[user])

    return (
        <AuthContext.Provider value={{isDarkMode: isDarkMode, toggleDarkMode: handleToggleDarkMode, can:can}}>
            <TooltipProvider>
                <Head title={title}/>
                <div className={`${isDarkMode ? 'dark' : ''} bg-slate-100 dark:bg-slate-900 h-screen flex flex-col`}>
                    <nav
                        className={'z-50 fixed inset-x-0 top-0 bg-white dark:bg-slate-950 h-14 sm:h-20 lg:ps-72 flex justify-end'}>
                        {navbar || <AuthNavbar/>}
                    </nav>
                    <aside className={
                        ' /*mobile*/ bg-indigo-600 fixed z-50 max-lg:inset-x-0 max-lg:h-16 bottom-0' +
                        ' /*tablet*/ ' +
                        ' /*laptop*/  lg:inset-y-0 lg:inset-x-px lg:left-0 lg:w-full lg:max-w-72'}>
                        <div className={'sm:h-20 items-center hidden lg:flex'}>
                            <div className={'overflow-hidden w-20 ps-6 '}>
                                <Link href={route('dashboard')}
                                      className={'grayscale contrast-200 brightness-200'}>
                                    <Logo/>
                                </Link>
                            </div>
                        </div>
                        {sidebar || <AuthSidebar/>}
                        <div className={'z-50 absolute bottom-0 left-0 p-4'} hidden={!loading}>
                            <Loader/>
                        </div>
                    </aside>
                    <main className={'pt-14 sm:pt-20 lg:pb-0 pb-16 lg:pl-72 h-full basis-full flex-none'}>
                        {children}
                    </main>
                </div>
            </TooltipProvider>
        </AuthContext.Provider>
    )
}

export default AuthLayout
