import {Head} from "@inertiajs/react";

const AuthLayout = ({title, navbar, sidebar, children}) => {
    return (
        <>
            <Head title={title}/>
            <nav>{navbar}</nav>
            <aside>{sidebar}</aside>
            <main>
                {children}
            </main>
        </>
    )
}

export default AuthLayout
