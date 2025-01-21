import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import AuthLayout from "@/Layouts/AuthLayout.js";
import Title from "@/Components/atoms/Title.jsx";
import {Cog6ToothIcon, UserCircleIcon} from "@heroicons/react/24/outline"
import {Icon} from "@/Components/atoms/Icon.js";
import React from "react";
import Surface from "@/Components/atoms/Surface.jsx";
import InputField from "@/Components/molecules/InputField.jsx";
import {useForm} from "@inertiajs/react";
import {useRoute} from 'ziggy-js'
import {Text} from "@/Components/atoms/Text.jsx";
import Avatar from "@/Components/atoms/Avatar.jsx";
import Modal from "@/Components/organisms/Modal.jsx";
import ProfilePicturePicker from "@/Components/molecules/ProfilePicturePicker.tsx";
import {Button} from "@/Components/molecules/Button.jsx";
import ErrorText from "@/Components/atoms/ErrorText.jsx";
import Select from "@/Components/molecules/Select.jsx"
import Label from "@/Components/atoms/Label.jsx";
import {type MenuItem} from "@/Components/organisms/SidebarMenu";
import {ArrowBigLeft} from 'lucide-react'

const ProfileUpdateContext = React.createContext()

export default function Edit({auth, mustVerifyEmail, status, profile}) {

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
            <ProfileUpdateContext.Provider value={{profile: profile}}>

                {sections[activeSection].component}

            </ProfileUpdateContext.Provider>
        </AuthLayout>
    );
}

const menu = [
    {icon: <ArrowBigLeft />, link: "dashboard", name: "Volver"}
] satisfies MenuItem[] as const

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

    const {profile} = React.useContext(ProfileUpdateContext)
    const route = useRoute()

    const [openPictureModal, setOpenPictureModal] = React.useState(false)

    const {data, setData, errors, processing, patch, isDirty} = useForm({
        nombres: profile.nombres,
        apellidos: profile.apellidos,
        fecha_nacimiento: profile.fecha_nacimiento,
        direccion: profile.direccion,
        telefono: profile.telefono,
        sexo: profile.sexo
    })

    const date = new Date(data.fecha_nacimiento)

    const handleChange = (field) => (({target}) => setData(field, target.value))

    const submit = (e) => {
        e.preventDefault()
        patch(route('profile.update'))
    }

    return (

        <Surface className={'mx-6 my-6 p-6'}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">

                <Title level={'title-lg'} className={'text-gray-400'}>Configuracion de perfil</Title>
                <hr className={'mt-2'}/>


                <div className={'grid grid-cols-1 sm:grid-cols-3 py-4'}>
                    <div className={'col-span-1 sm:col-span-2 sm:w-2/4'}>
                        <form onSubmit={submit} className={'space-y-5'}>

                            <div>
                                <InputField name={'nombres'} label={'Nombres'} id={'nombres'} required={true}
                                            value={data.nombres} onChange={handleChange('nombres')}
                                            error={errors.nombres}/>
                                <Text level={'body-xs'}>Su nombre real. Este nombre aparecerá publicamente en
                                    las
                                    historias.</Text>
                            </div>

                            <div>
                                <InputField name={'apellidos'} label={'Apellidos'} id={'apellidos'}
                                            required={true} value={data.apellidos}
                                            onChange={handleChange('apellidos')} error={errors.apellidos}/>
                                <Text level={'body-xs'}>Su apellido u apellidos. Este apellido aparecera junto a
                                    su
                                    nombre real.</Text>
                            </div>

                            <InputField type={'date'} name={'fecha_nacimiento'}
                                        label={'Fecha de nacimiento'}
                                        id={'fecha_nacimiento'} required={true}
                                        value={`${date.getUTCFullYear()}` + '-' + `${date.getUTCMonth() + 1}`.padStart(2, '0') + '-' + `${date.getUTCDate()}`.padStart(2, '0')}
                                        onChange={handleChange('fecha_nacimiento')}
                                        error={errors.fecha_nacimiento}/>

                            <InputField name={'direccion'} label={'Dirección'} id={'direccion'}
                                        required={true} value={data.direccion}
                                        onChange={handleChange('direccion')} error={errors.direccion}/>

                            <InputField name={'telefono'} label={'Teléfono'} id={'telefono'}
                                        required={true} value={data.telefono}
                                        onChange={handleChange('telefono')} error={errors.telefono}/>


                            <div>

                                <Label htmlFor={'sexo'} value={'Sexo'}/>
                                <Select value={data.sexo} id={'sexo'}
                                        onChange={(value) => setData('sexo', value)}>
                                    <Select.Option value={'F'}>Femenino</Select.Option>
                                    <Select.Option value={'M'}>Masculino</Select.Option>
                                    <Select.Option value={'NI'}>No indicado</Select.Option>
                                </Select>
                            </div>

                            <InputField name={'cedula'} label={'Cédula'} id={'cedula'} value={profile.cedula}
                                        disabled={true}/>

                            <div className={'flex gap-4 justify-end'}>
                                <Button label={'Actualizar perfil'} disabled={!isDirty} loading={processing}
                                        onClick={submit}/>
                            </div>
                        </form>

                    </div>
                    <div className={'aspect-square'}>
                        <Text level={'title-md mb-4'}>Foto de perfil</Text>
                        <div className={'w-full sm:w-1/2 aspect-square'}>
                            <Avatar picture={profile.picture_url} className={'size-full'} onClick={() => {
                                setOpenPictureModal(true)
                            }}/>
                        </div>
                        <UpdatePasswordForm className='mt-10'/>
                    </div>

                </div>


            </div>
            <Modal ariaLabelledBy={'Imagen de perfil'} ariaDescribedBy={'Cambiar imagen de perfil'}
                   open={openPictureModal} onClose={() => setOpenPictureModal(false)}>
                <ChangeProfilePicture picture_url={profile.picture_url}/>
            </Modal>
        </Surface>
    );
}

const ChangeProfilePicture = ({picture_url = null}) => {

    const route = useRoute()
    const {data, setData, errors, post, processing, isDirty} = useForm({
        _method: 'patch',
        picture: picture_url
    })

    const onSelectPicture = ([file]) => {
        Object.assign(file, {
            preview: URL.createObjectURL(file)
        })
        setData("picture", file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('profile.updatePicture'))
        // TODO: reload page to make form clean again
    }

    return (
        <div className={''}>
            <form onSubmit={handleSubmit} className={'flex flex-col gap-4'}>
                <div className={'w-full space-y-2'}>
                    <div className={'w-48 sm:w-1/2 aspect-square mx-auto'}>
                        <ProfilePicturePicker src={data.picture?.preview ?? data.picture ?? null}
                                              onDrop={onSelectPicture} className={'size-full relative z-90'}/>
                    </div>
                    <ErrorText message={errors.picture}/>
                    <Text level={'body-sm text-center'}>Haz click para seleccionar una foto o arrastra la image hasta
                        aquí</Text>
                </div>
                <Button label={'Cambiar foto'} loading={processing} onClick={handleSubmit} disabled={!isDirty}/>
            </form>
        </div>
    )
}

const CuentaSection = () => {

    return (
        <section>
            <Surface className={'my-6 mx-6'}>
                <div className={'py-12 px-8'}>
                    <Title level={'title-lg'} className={'text-gray-400'}>Configuracion de cuenta</Title>
                    <hr className={'mt-2'}/>

                    <div className={'py-4'}>
                        <UpdatePasswordForm className="max-w-xl"/>
                    </div>

                </div>
            </Surface>
        </section>
    )
}

const sections = [
    {name: 'Perfil', icon: <UserCircleIcon/>, component: <PerfilSection/>},
    {name: 'Cuenta', icon: <Cog6ToothIcon/>, component: <CuentaSection/>},
]
