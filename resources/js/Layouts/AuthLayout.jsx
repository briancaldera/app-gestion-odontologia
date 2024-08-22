import {Head, Link, router} from "@inertiajs/react";
import React from "react";
import AuthNavbar from "@/Components/organisms/AuthNavbar.jsx";
import AuthSidebar from "@/Components/organisms/AuthSidebar.jsx"
import Loader from "@/Components/atoms/Loader.jsx";
import Logo from "@/Components/atoms/Logo.jsx";
import {useRoute} from 'ziggy-js'
import {TooltipProvider} from "@/Components/atoms/Tooltip"

const DARK_MODE_KEY = 'dark_mode'

export const AuthContext = React.createContext()

const AuthLayout = ({title, navbar, sidebar, children}) => {

    const route = useRoute()
    const [loading, setLoading] = React.useState(false)
    const [isDarkMode, toggleDarkMode] = React.useState(false)

    React.useEffect(() => {
        let darkMode = window.localStorage.getItem(DARK_MODE_KEY)

        if (darkMode === null) {
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
            <div className={`${isDarkMode ? 'dark' : ''} bg-slate-100 dark:bg-slate-900 min-h-screen`}>
                <AuthContext.Provider value={{isDarkMode: isDarkMode, toggleDarkMode: handleToggleDarkMode}}>
                    <TooltipProvider>
                        <Head title={title}/>
                        <nav className={'z-50 fixed inset-x-0 top-0 bg-white h-20 ps-72'}>
                            {navbar || <AuthNavbar/>}
                        </nav>
                        <aside className={'z-50 bg-indigo-600 fixed inset-y-0 left-0 w-full max-w-72'}>
                            <div className={'h-20 flex items-center'}>
                                <div className={'overflow-hidden w-20 ps-6 '}>
                                    <Link href={route('dashboard')} className={'grayscale contrast-200 brightness-200'}>
                                        <Logo/>
                                    </Link>
                                </div>
                            </div>
                            {sidebar || <AuthSidebar/>}
                            <div className={'z-50 absolute bottom-0 left-0 p-4'} hidden={!loading}>
                                <Loader/>
                            </div>
                        </aside>
                        <main className={'pt-20 pl-72 min-h-screen'}>
                            {children}
                        </main>
                    </TooltipProvider>
                </AuthContext.Provider>
            </div>
    )
}

export default AuthLayout
