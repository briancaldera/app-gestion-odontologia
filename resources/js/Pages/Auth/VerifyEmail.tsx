import GuestLayout from '@/Layouts/GuestLayout';
import {Link, useForm} from '@inertiajs/react';
import Surface from "@/Components/atoms/Surface.jsx";
import Logo from "@/Components/atoms/Logo.jsx";
import {Text} from "@/Components/atoms/Text.jsx";
import Title from "@/Components/atoms/Title.jsx";
import {Button} from "@/Components/molecules/Button.jsx";
import BaseLayout from "@/Layouts/BaseLayout.tsx";
import {useRoute} from "ziggy-js"

const VerifyEmail = ({status}) => {

    const route = useRoute()
    const {post, processing} = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout title={"Verificación"}>
            <div className={"px-4"}>
                <Surface className={"max-w-lg px-6 py-6"}>

                    <div className={"flex justify-center h-24 my-4"}>
                        <Logo/>
                    </div>

                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <Title level={'title-lg'} className={"text-center"}>Verificar email</Title>
                        <Text level={'body-md'}>
                            Antes de continuar, por favor verifica tu correo electrónico haciendo click en el link que
                            acabamos de enviar a tu correo.
                            Si no recibiste el email, revisa el spam o presiona el boton de abajo y cordialmente
                            reenviaremos otro correo de verificación.
                        </Text>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                            Se ha enviado a tu correo un nuevo link de verificación.
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mt-4 flex items-center justify-between">
                            <Button onClick={submit} label={"Reenviar correo de verificación"} disabled={processing}/>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Cerrar sesión
                            </Link>
                        </div>
                    </form>
                </Surface>
            </div>
        </GuestLayout>
    );
}

VerifyEmail.layout = page => <BaseLayout children={page}/>

export default VerifyEmail
