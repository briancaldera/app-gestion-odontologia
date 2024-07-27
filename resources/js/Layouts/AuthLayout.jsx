import {Head, router, usePage} from "@inertiajs/react";
import React from "react";
import AuthNavbar from "@/Components/organisms/AuthNavbar.jsx";
import AuthSidebar from "@/Components/organisms/AuthSidebar.jsx"
import Loader from "@/Components/atoms/Loader.jsx";

const AuthLayout = ({title, navbar, sidebar, children}) => {

    const [loading, setLoading] = React.useState(false)

    const {auth} = usePage().props

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

    return (
        <>
            <Head title={title}/>
            <nav className={'z-100 fixed inset-x-0 top-0 bg-white h-20'}>{navbar || <AuthNavbar auth={auth}/>}</nav>
            <aside className={'z-90 bg-white fixed inset-y-0 left-0 w-full max-w-72 pt-20'}>
                {sidebar || <AuthSidebar />}
                <div className={'z-100 absolute bottom-0 left-0 p-4'} hidden={!loading}>
                    <Loader />
                </div>
            </aside>
            <main className={'pt-20 pl-72 min-h-screen'}>
                {children}
            </main>
        </>
    )
}

export default AuthLayout
