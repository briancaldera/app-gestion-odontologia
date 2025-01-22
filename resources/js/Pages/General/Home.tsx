import {Button} from "@/shadcn/ui/button"
import {Link} from "@inertiajs/react";
import Logo from "@/Components/atoms/Logo.tsx";
import {route} from "ziggy-js";
import dentistWorking from '/public/assets/images/smile-4.jpg'
import {Check} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/shadcn/ui/avatar.tsx";

const Home = ({auth}) => {

    const {user} = auth

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                {/* Placeholder for logo */}
                                <Logo className={'size-8'}/>
                                <span className="hidden sm:block ml-2 text-xl font-semibold text-gray-800">UGMA - Facultad de Odontología</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {user ? (
                                <Link href={route('dashboard')}
                                      className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                                    <Avatar>
                                        <AvatarImage src={user.profile?.picture_url}/>
                                        <AvatarFallback>{
                                            user.profile ? `${user.profile.nombres[0]}${user.profile.apellidos[0]}` : `${user.name[0]}`
                                        }</AvatarFallback>
                                    </Avatar>
                                </Link>
                                ): (
                                <>
                                    <Link href={route('login')}
                                          className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                                        Iniciar sesión
                                    </Link>
                                    <Link href={route('register')}
                                          className="ml-4 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                                        Registrarse
                                    </Link>
                                </>
                                )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main
                            className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Bienvenido a la app de la</span>{' '}
                                    <span className="block text-indigo-600 xl:inline">Facultad de Odontología</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Comienza digitalizando tus historias clínicas y aprovecha todas las facilidades de
                                    la plataforma tecnológica.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link href={route('register')}>
                                            <Button
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                                                Registrarse
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        src={dentistWorking}
                        alt="Dentist working"
                        width={1920}
                        height={1080}
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Funcionalidades</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Historias Clínicas Digitales
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            Nuestra plataforma ofrece las mejores herramientas para guardar las historias clínicas de
                            tus pacientes.
                        </p>
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            {[
                                {
                                    name: 'Perfil de paciente',
                                    description: 'Registra tus pacientes y lleva el control de sus historias clínicas.',
                                },
                                {
                                    name: 'Historias clínicas digitales',
                                    description: 'Llena el formato de historia clínica en digital.',
                                },
                                {
                                    name: 'Almacenamiento de radiografías',
                                    description: 'Olvida las radiografías impresas! Subelas y guardalas en digital.',
                                },
                                {
                                    name: 'Formato PDF',
                                    description: 'Guarda la historia en formato PDF si necesitas imprimir o archivar.',
                                },
                            ].map((feature) => (
                                <div key={feature.name} className="relative">
                                    <dt>
                                        <div
                                            className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                            <Check/>
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
