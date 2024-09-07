import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {Card} from "@/shadcn/ui/card";
import Avatar from "@/Components/atoms/Avatar";
import Title from "@/Components/atoms/Title";
import {Text} from "@/Components/atoms/Text";
import {format} from 'date-fns'

const Show = ({profile, user}) => {
    return (
        <AuthLayout title={'Perfil'}>
            <div className={'flex justify-center'}>


                <div className={'max-w-6xl flex-none shrink-0 basis-full'}>
                    <div className={'h-[800px] p-12 grid grid-cols-2 grid-rows-2 gap-12'}>

                        <div className={'col-span-1 row-span-2'}>
                            <Card className={'h-full rounded-3xl'}>
                                <div className={'h-full flex flex-col justify-center'}>
                                    <div className={'basis-1/2 flex-initial'}>
                                        <div className={'w-full h-full flex justify-center items-center'}>
                                            <Avatar picture={profile.picture_url} className={'size-56'}/>
                                        </div>
                                    </div>
                                    <div className={'basis-1/2 flex-intial'}>
                                        <div className={'h-full px-12 py-9 space-y-2'}>
                                            <div className={'flex justify-between items-baseline'}>
                                                <Title level={'title-lg text-left'}>Mi perfil</Title>
                                                <div>
                                                    <Text level={'title-md text-right'}>{profile.nombres}</Text>
                                                    <Text level={'title-md text-right'}>{profile.apellidos}</Text>
                                                </div>
                                            </div>

                                            <div className={'flex justify-between items-baseline'}>
                                                <Title level={'title-lg text-left me-12'}>Cédula</Title>
                                                <div>
                                                    <Text level={'title-md text-right'}>{profile.cedula}</Text>
                                                </div>
                                            </div>

                                            <div className={'flex justify-between items-baseline'}>
                                                <Title level={'title-lg text-left me-12'}>Fecha de nacimiento</Title>
                                                <div>
                                                    <Text
                                                        level={'title-md text-right'}>{format(profile.fecha_nacimiento, 'PP')}</Text>
                                                </div>
                                            </div>

                                            <div className={'flex justify-between items-baseline'}>
                                                <Title level={'title-lg text-left me-12'}>Sexo</Title>
                                                <div>
                                                    <Text level={'title-md text-right'}>{profile.sexo}</Text>
                                                </div>
                                            </div>

                                            <div className={'flex justify-between items-baseline'}>
                                                <Title level={'title-lg text-left'}>Teléfono</Title>
                                                <div>
                                                    <Text level={'title-md text-right'}>{profile.telefono}</Text>
                                                </div>
                                            </div>

                                            <div className={'flex justify-between items-baseline'}>
                                                <Title level={'title-lg text-left me-12'}>Dirección</Title>
                                                <div>
                                                    <Text level={'title-md text-right'}>{profile.direccion}</Text>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className={'col-span-1 row-span-1'}>
                            <Card className={'h-full p-12 rounded-3xl'}>
                                <Title level={'title-lg'}>Estadísticas</Title>
                                <ul>

                                </ul>
                            </Card>
                        </div>
                        <div className={'col-span-1 row-span-1'}>
                            <Card className={'h-full rounded-3xl p-12'}>
                                <div className={'grid grid-cols-2 justify-between gap-2'}>
                                    <div className={'col-span-full'}>
                                        <Title level={'title-lg'}>Información de cuenta</Title>
                                    </div>
                                    <div>
                                        <Title level={'title-lg text-left me-12'}>Correo</Title>
                                    </div>
                                    <div>
                                        <Text level={'title-md text-right'}>{user.email}</Text>
                                    </div>
                                    <div>
                                        <Title level={'title-lg text-left me-12'}>Verificado</Title>
                                    </div>
                                    <div>
                                        <Text level={'title-md text-right'}>{format(user.email_verified_at, 'PP')}</Text>
                                    </div>
                                    <div>
                                        <Title level={'title-lg text-left me-12'}>Usuario</Title>
                                    </div>
                                    <div>
                                        <Text level={'title-md text-right'}>{user.name}</Text>
                                    </div>
                                </div>


                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className={'p-6'}>*/}
            {/*    <Card>*/}
            {/*        <div className={'h-72 flex'}>*/}
            {/*        /!*    picture*!/*/}
            {/*            <div>*/}

            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </Card>*/}
            {/*</div>*/}
        </AuthLayout>
    )
}

export default Show
