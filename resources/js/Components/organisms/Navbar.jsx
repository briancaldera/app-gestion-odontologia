import Logo from "@/Components/atoms/Logo.jsx"
import {Bars3Icon, EllipsisHorizontalIcon, EllipsisVerticalIcon} from "@heroicons/react/24/outline"
import {Icon} from "@/Components/atoms/Icon.jsx";
import React from "react";
import {Link} from "@inertiajs/react"
import NavLink from "@/Components/atoms/NavLink.jsx";
import Avatar from "@/Components/atoms/Avatar.jsx";
import {useRoute} from 'ziggy-js';
import {ArrowRightIcon} from "@heroicons/react/24/outline"
import Surface from "@/Components/atoms/Surface.jsx";

const authLinks = [{name: 'Dashboard'}, {name: "Historia"}, {name: "Pacientes"}]
const guestLinks = [{name: 'Funcionalidades'}, {name: "Odontologia"}, {name: "Informacion"}]

const Navbar = ({user, className = "", props}) => {

    const route = useRoute()

    const [openMobile, setOpenMobile] = React.useState(false)

    return (
        <nav className={`w-screen bg-white dark:bg-slate-800 ${className}`} {...props}>
            <div className={"flex justify-between items-center h-16 px-2 lg:px-8"}>
                {/*logo*/}
                <div className={'size-8'}>
                    <Link href={(user ? route("dashboard") : "/")}>
                        <Logo/>
                    </Link>
                </div>

                <NavLinks user={user}/>


                <div className={"inline-flex gap-2"}>
                    <div className={"sm:hidden"}>
                        <MobileMenuButton expanded={openMobile} onClick={() => {setOpenMobile(!openMobile)}}/>
                    </div>
                    <AuthSection user={user}/>
                </div>
            </div>
            <MobileMenu show={openMobile} user={user}/>
        </nav>
    )

    return (

        <nav className={`w-screen bg-white dark:bg-slate-800 ${className}`} {...props}>
            <div className={"mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"}>
                <div className={"relative flex h-16 items-center justify-between"}>
                    <div className={"absolute inset-y-0 left-0 flex items-center sm:hidden"}>

                    </div>

                    <button type={"button"} onClick={() => {
                        setOpenMobile(!openMobile)
                    }}
                            className={"relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"}
                            aria-controls={"mobile-menu"} aria-expanded={false}>

                        {/*<span className={"absolute -inset-0.5"}></span>*/}
                        {/*<span className={"sr-only"}>Open main menu</span>*/}

                        <Icon className={'dark:text-slate-500'}>
                            {!openMobile ? <EllipsisVerticalIcon/> : <EllipsisHorizontalIcon/>}
                        </Icon>
                    </button>
                </div>
                <div className={"flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"}>
                    <div className={"flex shrink-0 items-center size-16"}>
                        <Logo/>
                    </div>

                    <div className={"hidden sm:ml-6 sm:block"}>
                        <div className={"flex space-x-4"}>

                            <a href={"#"} className={"rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"}
                               aria-current={"page"}>Dashboard</a>
                            <a href={"#"}
                               className={"rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}>Team</a>

                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}

const NavLinks = ({user}) => {

    if (user) {
        return (<div className={"hidden sm:flex justify-even gap-6"}>
            {authLinks.map(link => <NavLink>{link.name}</NavLink>)}
        </div>)
    } else {
        return (<div className={"hidden sm:flex justify-even gap-6"}>
            {guestLinks.map(link => <NavLink>{link.name}</NavLink>)}
        </div>)
    }
}

const AuthSection = ({user}) => {

    const route = useRoute()

    const auth = (
        <div className={"flex flex-0 items-center gap-2"}>
            <Avatar/>
        </div>
    )

    const guest = (
        <div className={"hidden sm:inline-flex gap-2"}>
            <NavLink href={route("login")}>Iniciar sesión</NavLink>
            <NavLink href={route("register")}>Registrarse<Icon className={"mx-1 size-3 text-slate-900"}><ArrowRightIcon/></Icon></NavLink>
        </div>
    )

    return user ? auth : guest
}

const MobileMenuButton = ({expanded, onClick}) => {
    return (
        <button onClick={onClick} type={"button"} className={"relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"} aria-controls="mobile-menu" aria-expanded={expanded}>
            <Icon className={`transition ${expanded ? '' : '-rotate-90'}`}>
                <EllipsisHorizontalIcon/>
            </Icon>
        </button>
    )
}

const MobileMenu = ({show, user}) => {

    const route = useRoute()

    return show ? (
        <Surface className={"sm:hidden px-2.5 py-3"}>
            <ul className={"flex flex-col"}>
                {user ? authLinks.map(link => <li><NavLink href={'#'}>{link.name}</NavLink></li>) : guestLinks.map(link => <li><NavLink href={'#'}>{link.name}</NavLink></li>)}
            </ul>
        </Surface>
    ) : null
}

export default Navbar
