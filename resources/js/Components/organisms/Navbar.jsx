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
import Dropdown from "@/Components/molecules/Dropdown.jsx";

const authLinks = [{name: 'Dashboard'}, {name: "Historia"}, {name: "Pacientes"}]
const guestLinks = [{name: 'Funcionalidades'}, {name: "Odontologia"}, {name: "Informacion"}]

const Navbar = ({user, className = "", props}) => {

    const route = useRoute()

    const [openMobile, setOpenMobile] = React.useState(false)

    return (
        <div className={`w-screen bg-white dark:bg-slate-800 ${className}`} {...props}>
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
                        <MobileMenuButton expanded={openMobile} onClick={() => {
                            setOpenMobile(!openMobile)
                        }}/>
                    </div>
                    <AuthSection user={user}/>
                </div>
            </div>
            <MobileMenu show={openMobile} user={user}/>
        </div>
    )
}

const NavLinks = ({user}) => {

    if (user) {
        return (<div className={"hidden sm:flex justify-even gap-6"}>
            {authLinks.map((link, index) => <NavLink key={index}>{link.name}</NavLink>)}
        </div>)
    } else {
        return (<div className={"hidden sm:flex justify-even gap-6"}>
            {guestLinks.map((link, index) => <NavLink key={index}>{link.name}</NavLink>)}
        </div>)
    }
}

const AuthSection = ({user}) => {

    const route = useRoute()

    const auth = (
        <div className={"relative flex flex-0 items-center gap-2"}>
            <Dropdown.Container>
                <Dropdown.Trigger>
                    <Avatar/>
                </Dropdown.Trigger>

                <Dropdown>

                    <Dropdown.Option href={route("profile.edit")}>Perfil</Dropdown.Option>
                    <hr/>
                    <Dropdown.Option href={route("logout")}>Cerrar Sesión</Dropdown.Option>
                </Dropdown>
            </Dropdown.Container>
        </div>
    )

    const guest = (
        <div className={"hidden sm:inline-flex gap-2"}>
            <NavLink href={route("login")}>Iniciar sesión</NavLink>
            <NavLink href={route("register")}>Registrarse<Icon
                className={"mx-1 size-3 text-slate-900"}><ArrowRightIcon/></Icon></NavLink>
        </div>
    )

    return user ? auth : guest
}

const MobileMenuButton = ({expanded, onClick}) => {
    return (
        <button onClick={onClick} type={"button"}
                className={"relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"}
                aria-controls="mobile-menu" aria-expanded={expanded}>
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
                {user ? authLinks.map((link, index) => <li key={index}><NavLink href={'#'}>{link.name}</NavLink>
                </li>) : guestLinks.map((link, index) => <li key={index}><NavLink href={'#'}>{link.name}</NavLink></li>)}
            </ul>
        </Surface>
    ) : null
}

export default Navbar
