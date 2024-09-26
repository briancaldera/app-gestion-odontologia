import BaseLayout from "@/Layouts/BaseLayout.tsx";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import Surface from "@/Components/atoms/Surface.jsx";
import Heading from "@/Components/atoms/Heading.jsx";
import {useForm} from "@inertiajs/react";
import InputField from "@/Components/molecules/InputField.jsx";
import {Button} from "@/Components/molecules/Button.jsx";
import React from "react";
import {Option, Select} from "@mui/joy";
import Label from "@/Components/atoms/Label.jsx";
import ErrorText from "@/Components/atoms/ErrorText.jsx";
import {Text} from "@/Components/atoms/Text.jsx";
import {OutlinedButton} from "@/Components/molecules/OutlinedButton.jsx";
import ProfilePicturePicker from "@/Components/molecules/ProfilePicturePicker.tsx";
import Loader from "@/Components/atoms/Loader.tsx";
import {useRoute} from "ziggy-js"

const CreateProfile = () => {

    const route = useRoute()

    const [page, setPage] = React.useState(0)

    const {data, processing, errors, post, setData, submit} = useForm({
        nombres: "",
        apellidos: "",
        fecha_nacimiento: "",
        telefono: "",
        direccion: "",
        sexo: "",
        cedula: "",
        picture: null,
    })

    const handleChange = field => ({target: {value}}) => {
        setData(field, value)
    }

    const handlePictureDrop = ([file]) => {
        Object.assign(file, {
            preview: URL.createObjectURL(file)
        })
        setData("picture", file)
    }

    const page_0 = (
        <>
            <Heading level={"h2"}>Crear perfil</Heading>
            <Text>Procedamos a crear su perfil de usuario</Text>
            <form className={"grid grid-cols-1 sm:grid-cols-2 gap-8"}>
                <InputField onChange={handleChange('nombres')} label={"Nombres"} id={"nombres"}
                            error={errors.nombres} name={"nombres"} value={data.nombres}
                            required={true} className={"w-80"}/>

                <InputField onChange={handleChange('apellidos')} label={"Apellidos"} id={"apellidos"}
                            error={errors.apellidos} name={"apellidos"} value={data.apellidos}
                            required={true} className={"w-full"}/>

                <InputField onChange={handleChange('cedula')} label={"Cédula"} id={"cedula"}
                            error={errors.cedula} name={"cedula"} value={data.cedula}
                            required={true} className={"w-full"}/>

                <InputField onChange={handleChange('fecha_nacimiento')} label={"Fecha de nacimiento"}
                            id={"fecha_nacimiento"}
                            error={errors.fecha_nacimiento} name={"fecha_nacimiento"}
                            value={data.fecha_nacimiento} type={"date"}
                            required={true} className={"w-full"}/>

                <InputField onChange={handleChange('telefono')} label={"Telefono"} id={"telefono"}
                            error={errors.telefono} name={"telefono"} value={data.telefono}
                            required={true} className={"w-full"}/>


                <InputField onChange={handleChange('direccion')} label={"Dirección"} id={"direccion"}
                            error={errors.direccion} name={"direccion"} value={data.direccion}
                            required={true} className={"w-full sm:col-span-2"}/>

                <div className={"sm:grid sm:grid-cols-4"}>


                    <div className={"sm:col-span-3"}>

                        <Label htmlFor={"sexo"} value={"Sexo"} className={"mb-2"}/>
                        <Select value={data.sexo} id={"sexo"} onChange={(e, value) => {
                            setData("sexo", value)
                        }}>
                            <Option value={"F"}>Femenino</Option>
                            <Option value={"M"}>Masculino</Option>
                            <Option value={"NI"}>Prefiere no indicar</Option>
                        </Select>
                        <ErrorText message={errors.sexo}/>
                    </div>
                </div>


            </form>

            <div className={"flex justify-end pt-2"}>
                <Button label={"Siguiente"} onClick={() => setPage(1)}/>
            </div>
        </>
    )

    const page_1 = (
        <>
            <Heading level={"h2"}>Agregar foto de perfil</Heading>
            <Text>Puedes agregar una foto de perfil si lo deseas</Text>
            <form className={"grid grid-cols-1 sm:grid-cols-2 gap-8"}>


                <div className={"col-span-1 sm:col-span-2 flex flex-col items-center justify-center gap-2 pt-4"}>
                    <ProfilePicturePicker src={data.picture?.preview} onDrop={handlePictureDrop} className={"size-48"}/>
                    <div className={"flex justify-end w-full my-2"}>
                        { data.picture && (<OutlinedButton label={"Borrar"} onClick={() => setData("picture", null)}/>)}
                    </div>
                </div>
            </form>

            <div className={"flex justify-end pt-2 gap-4"}>

                <OutlinedButton label={"Atras"} onClick={() => setPage(0)}/>
                {data.picture ? (<Button label={"Siguiente"} onClick={() => post(route("profile.store"))}/>) : (<OutlinedButton label={"Saltar"} onClick={() => post(route("profile.store"))}/>)}
            </div>
        </>
    )

    const loader = (
        <div className={"size-96 flex justify-center items-center"}>
            <Loader/>
        </div>
    )

    return (
        <GuestLayout title={"Crear perfil"}>
            <div className={"px-4"}>
                <Surface className={"px-6 py-6 space-y-2"}>
                    {
                        processing ? loader : (page === 0 ? page_0 : page_1)
                    }

                </Surface>
            </div>
        </GuestLayout>
    )
}

CreateProfile.layout = page => <BaseLayout children={page}/>

export default CreateProfile
