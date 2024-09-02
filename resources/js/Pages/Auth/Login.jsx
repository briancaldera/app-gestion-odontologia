import React, {useContext, useEffect} from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import {Link, useForm} from '@inertiajs/react';
import {useRoute} from 'ziggy-js'
import Surface from "@/Components/atoms/Surface.jsx";
import InputField from "@/Components/molecules/InputField.jsx";
import {Text} from "@/Components/atoms/Text.jsx";
import {Button} from "@/Components/molecules/Button.jsx";
import Loader from "@/Components/atoms/Loader.tsx";
import Logo from "@/Components/atoms/Logo.jsx";
import Heading from "@/Components/atoms/Heading.jsx";

const LoginContext = React.createContext()

const Login = ({status, canResetPassword}) => {

    return (
        <GuestLayout title={'Iniciar sesión'}>
            <LoginContext.Provider value={{canResetPassword: canResetPassword}}>
                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                <LoginForm/>
            </LoginContext.Provider>
        </GuestLayout>
    );
}

const LoginForm = () => {

    const route = useRoute()

    const {canResetPassword} = useContext(LoginContext)

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleChange = (field) => (({target: {value}}) => setData(field, value))

    return (
        <Surface
            className={"mt-6 w-full overflow-hidden px-6 py-6 sm:max-w-md flex flex-col justify-center items-center"}>
            {processing ? (<Loader/>) : (<>

                    <div className={'size-28 mb-6'}>
                        <Logo/>
                    </div>

                    <form className={'space-y-4'} onSubmit={submit}>
                        <Heading level={'h4'}>Iniciar Sesión</Heading>
                        <InputField
                            label={'Correo Electrónico'}
                            id={'email'}
                            type={'email'}
                            name={'email'}
                            value={data.email}
                            autocomplete={'email'}
                            onChange={handleChange('email')}
                            required={true}
                            error={errors.email}
                            isFocused={true}
                        />

                        <InputField
                            label={'Contraseña'}
                            id={'password'}
                            type={'password'}
                            name={'password'}
                            value={data.password}
                            autocomplete={'current-password'}
                            onChange={handleChange('password')}
                            required={true}
                            error={errors.password}
                        />

                        <input type={'submit'} hidden={true}/>

                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <Text level={'body-sm'} className="ms-2">Mantener sesión</Text>
                        </label>

                        <div className="flex items-center justify-end mt-4 gap-4">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                >
                                    Olvidó su contraseña?
                                </Link>
                            )}

                            <Button label={'Iniciar sesión'} disabled={processing}
                                    onClick={submit}/>
                        </div>
                    </form>
                </>
            )}
        </Surface>
    )
}

export default Login
