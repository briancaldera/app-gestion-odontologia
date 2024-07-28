import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import AuthLayout from "@/Layouts/AuthLayout.jsx";
import Title from "@/Components/atoms/Title.jsx";
import {Cog6ToothIcon, UserCircleIcon} from "@heroicons/react/24/outline"
import {Icon} from "@/Components/atoms/Icon.jsx";
import React from "react";
import Surface from "@/Components/atoms/Surface.jsx";


export default function Edit({auth, mustVerifyEmail, status}) {

    const [activeSection, setActiveSection] = React.useState(0)

    const handleClick = (index) => {
        setActiveSection(index)
    }

    const sidebar = (<Sidebar onClick={handleClick}/>)

    return (

        <AuthLayout
            sidebar={sidebar}
            title={'Perfil'}
        >

            {sections[activeSection].component}

        </AuthLayout>
    );
}

const Sidebar = ({
                     defaultSection = 0, onClick = () => {
    }
                 }) => {

    const [activeSection, setActiveSection] = React.useState(defaultSection)

    return (
        <div className={'p-6'}>
            <ol className={'space-y-1'}>
                {sections.map((section, index) =>
                    <li key={index} onClick={() => {
                        setActiveSection(index)
                        onClick(index)
                    }}
                        className={`flex items-center gap-2 rounded-lg p-2 cursor-pointer hover:bg-white/10 ${activeSection === index ? 'bg-black/10' : ''}`}>
                        <Icon className={'size-8 text-white'}>
                            {section.icon}
                        </Icon>
                        <Title className={'text-white'} level={'title-md'}>{section.name}</Title>
                    </li>)}

            </ol>
        </div>
    )
}

const PerfilSection = () => {

    return (

        <section>

            <Surface className={'mx-6 my-6'}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">


                    </div>
                </div>
            </Surface>
        </section>
    )
}

const CuentaSection = () => {

    return (
        <section>
            <Surface className={'my-6 mx-6'}>
                <div className={'py-12 px-8'}>
                    <Title level={'title-lg'}>Configuracion de cuenta</Title>
                    <hr className={'mt-2'}/>

                    <UpdatePasswordForm className="max-w-xl"/>

                </div>
            </Surface>
        </section>
    )
}

const sections = [
    {name: 'Perfil', icon: <UserCircleIcon/>, component: <PerfilSection/>},
    {name: 'Cuenta', icon: <Cog6ToothIcon/>, component: <CuentaSection/>},
]
