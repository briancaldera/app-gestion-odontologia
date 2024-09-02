import AuthLayout from "@/Layouts/AuthLayout";
import {Card, CardContent, CardHeader, CardTitle} from '@/shadcn/ui/card'
import Title from "@/Components/atoms/Title";
import {Calendar} from "@/shadcn/ui/calendar"
import {ArrowBigLeft} from "lucide-react";
import SidebarMenu, {MenuItem} from "@/Components/organisms/SidebarMenu";

const menu = [
    {icon: <ArrowBigLeft />, link: "historias.dashboard", name: "Volver"}
] satisfies MenuItem[]

interface IndexProps {

}

const Index = ({}: IndexProps) => {

    return (
        <AuthLayout title={'Ver historias'} sidebar={<SidebarMenu menu={menu}/>}>
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
