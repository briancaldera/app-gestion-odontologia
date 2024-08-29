import AuthLayout from "@/Layouts/AuthLayout";
import {Card, CardHeader, CardTitle, CardContent, CardDescription} from '@/shadcn/ui/card'
import Title from "@/Components/atoms/Title";
import { Calendar } from "@/shadcn/ui/calendar"
import {Clipboard, FilePlus2} from "lucide-react";
import {type MenuItem} from '@/src/SidebarMenu'
import SidebarMenu from "@/Components/organisms/SidebarMenu";

const sidebarMenuItems: MenuItem[] = [
    {name: 'Ver Historias', link: 'dashboard', icon: <Clipboard />},
    {name: 'Crear Historia', link: 'historias.create', icon: <FilePlus2 />}
] as const


interface IndexProps {

}

const Index = ({}) => {

    return (
        <AuthLayout title={'Ver historias'} sidebar={<SidebarMenu menu={sidebarMenuItems}/>}>
            <div className={'p-6 h-[400px] grid grid-cols-4 gap-6'}>
                <Card className={'col-span-2'}>
                    <CardHeader>
                        <CardTitle>
                            <Title level={'title-lg'}>
                                Estadísticas de Historias
                            </Title>
                        </CardTitle>
                    </CardHeader>
                </Card>

                <Card>

                </Card>
                <Card className={'col-span-1'}>
                    <CardHeader>
                        <CardTitle>
                            <Title level={'title-lg'}>
                                Calendario
                            </Title>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={'flex justify-center'}>
                        <Calendar />
                    </CardContent>
                </Card>
            </div>
        </AuthLayout>
    )
}

export default Index
