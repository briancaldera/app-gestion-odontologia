import Surface from "@/Components/atoms/Surface.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {Link, useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useRoute} from "ziggy-js"
import {useEffect} from "react";
import InputField from "@/Components/molecules/InputField.jsx";
import {Button} from "@/Components/molecules/Button.jsx";
import NavLink from "@/Components/atoms/NavLink.jsx";

const RegisterForm = () => {

    const route = useRoute()

    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    const handleChange = (field) => {
        return ({target: {value}}) => setData(field, value)
    }


    return (
        <Surface className={"mt-6 w-full overflow-hidden px-6 py-4 sm:max-w-md"}>
            <form onSubmit={submit} className={"space-y-4"}>
                <InputField onChange={handleChange("name")} label={"Nombre"} id={'name'} name={"name"}
                            autocomplete={"name"} value={data.name} error={errors.name} required={true} />

                <InputField onChange={handleChange("email")} label={"Correo Electrónico"} id={'email'}
                            type={"email"} name={"email"} value={data.email} error={errors.email}
                            autocomplete={"email"} required={true}/>

                <InputField label={'Contraseña'} id={"password"} name={"password"} value={data.password}
                            error={errors.password} type={"password"} autocomplete={'password'}
                            onChange={handleChange("password")} required={true}/>


                <InputField label={'Confirmar contraseña'} id={"password_confirmation"} name={"password_confirmation"}
                            value={data.password_confirmation}
                            error={errors.password_confirmation} type={"password"} autocomplete={'password'}
                            onChange={handleChange("password_confirmation")} required={true} />


                <div className="flex items-center justify-end mt-4 gap-x-4">
                    <NavLink href={route('login')}>Ya tienes usuarios?</NavLink>

                    <Button onClick={submit} label={"Registrar"} loading={processing}/>
                </div>
            </form>
        </Surface>
    )
}

export default RegisterForm
