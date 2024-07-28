import {usePage} from "@inertiajs/react";
import Avatar from "@/Components/atoms/Avatar.jsx";
import {useRoute} from 'ziggy-js'
import Dropdown from "@/Components/molecules/Dropdown.jsx";
import React from "react";
import Switch from "@/Components/atoms/Switch.jsx";
import {SunIcon, MoonIcon} from "@heroicons/react/24/outline"
import {AuthContext} from "@/Layouts/AuthLayout.jsx";

const AuthNavbar = () => {

    const {auth: {user}} = usePage().props

    return (
        <div className={'flex sm:flex-row-reverse h-full'}>
            {/*auth section*/}
            <AuthSection user={user}/>
        </div>
    )
}

const AuthSection = ({user}) => {

    const {isDarkMode, toggleDarkMode} = React.useContext(AuthContext)

    const route = useRoute()

    const handleLogout = async () => {
        const res = await axios.post(route('logout'))
        if (res.statusText === 'OK') {
            window.location.assign(route('login'))
        }
    }

    return (
        <div className={'h-full flex justify-center items-center px-8 gap-2 relative flex-0'}>
            <Dropdown.Container>
                <Dropdown.Trigger>
                    <Avatar picture={user.profile.picture_url}/>
                </Dropdown.Trigger>

                <Dropdown>

                    <Dropdown.Option href={route("profile.edit")}>Perfil</Dropdown.Option>
                    <Dropdown.StaticOption>
                        <div className={"flex justify-between items-center gap-4"}>
                            Modo Oscuro
                            <Switch checked={isDarkMode} onClick={() => toggleDarkMode(value => !value)}  iconOn={<MoonIcon/>} iconOff={<SunIcon/>}/>
                        </div>
                    </Dropdown.StaticOption>
                    <hr/>
                    <Dropdown.Option onClick={handleLogout}>Cerrar Sesión</Dropdown.Option>
                </Dropdown>
            </Dropdown.Container>
        </div>
    )
}

export default AuthNavbar
