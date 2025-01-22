import React from "react";
import AuthLayout from "@/Layouts/AuthLayout.tsx";
import { Card } from "@/shadcn/ui/card.tsx";
import { Text } from "@/Components/atoms/Text";
import { Icon } from "@/Components/atoms/Icon.tsx";
import UsersRolesChart from "../../Components/organisms/metrics/users/UsersRolesChart.tsx";
import UsersTutorsChart from "../../Components/organisms/metrics/users/UsersTutorsChart.tsx";
import PatientsAgeDistributionChart from "../../Components/organisms/metrics/patients/PatientsAgeDistributionChart.tsx";
import PatientsCreatedLast6Months from "../../Components/organisms/metrics/patients/PatientsCreatedLast6Months.tsx";
import { usePermission } from "@/src/Utils/Utils.ts";
import { usePage } from "@inertiajs/react";
import { HistoriasStatusChart } from "@/Components/organisms/metrics/historias/HistoriasStatusChart.tsx";
import { PatientsSexDistributionChart } from "@/Components/organisms/metrics/patients/PatientsSexDistributionChart.tsx";
import Heading from "@/Components/atoms/Heading";

type DashboardProps = {
    statistics: Record<string, number>;
};

const Show = ({ statistics }: DashboardProps) => {
    const can = usePermission();

    if (can("metrics-read-all")) {
        return (
            <AuthLayout title={"Inicio"}>
                <AdminMetrics />
                <UserMetrics />
            </AuthLayout>
        );
    } else {
        return (
            <AuthLayout title={"Inicio"}>
                {/*{can("groups-add-corrections") && <TutorMetrics />}*/}
                <UserMetrics />
            </AuthLayout>
        );
    }
};

type StatisticsSlotProps = {
    title: string;
    data: number | string;
    icon: React.ReactElement;
};

const StatisticsSlot = ({ title, data, icon }: StatisticsSlotProps) => {
    return (
        <Card className={"p-6"}>
            <header className={"flex items-center justify-between"}>
                <Text level={"body-sm"} className={"font-semibold"}>
                    {title}
                </Text>
                <Icon>{icon}</Icon>
            </header>
            <div className={"mt-1.5"}>
                <Text className={"line-clamp-1"} level={"h1"} component={"p"}>
                    {data}
                </Text>
            </div>
        </Card>
    );
};

const AdminMetrics = () => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <Heading>Resumen del sistema</Heading>
            {/*<div className={'h-32 grid grid-cols-2 sm:grid-cols-4 gap-6'}>*/}
            {/*    {*/}
            {/*        ('pacientesAsignados' in statistics) && (*/}
            {/*            <StatisticsSlot title={'Pacientes asignados'} data={statistics.pacientesAsignados}*/}
            {/*                            icon={<Users/>}/>)*/}
            {/*    }*/}
            {/*    {*/}
            {/*        ('historiasCreadas' in statistics) && (*/}
            {/*            <StatisticsSlot title={'Historias creadas'} data={statistics.historiasCreadas}*/}
            {/*                            icon={<Clipboard/>}/>)*/}
            {/*    }*/}
            {/*    {*/}
            {/*        ('usuariosRegistrados' in statistics) && (*/}
            {/*            <StatisticsSlot title={'Usuarios registrados'} data={statistics.usuariosRegistrados}*/}
            {/*                            icon={<Users/>}/>)*/}
            {/*    }*/}
            {/*    {*/}
            {/*        ('estudiantesRegistrados' in statistics) && (*/}
            {/*            <StatisticsSlot title={'Estudiantes registrados'} data={statistics.estudiantesRegistrados}*/}
            {/*                            icon={<BookOpenText/>}/>)*/}
            {/*    }*/}
            {/*    {*/}
            {/*        ('profesoresRegistrados' in statistics) && (*/}
            {/*            <StatisticsSlot title={'Profesores'} data={statistics.profesoresRegistrados}*/}
            {/*                            icon={<Apple/>}/>)*/}
            {/*    }*/}
            {/*    {*/}
            {/*        ('gruposQueManeja' in statistics) && (*/}
            {/*            <StatisticsSlot title={'Grupos'} data={statistics.gruposQueManeja}*/}
            {/*                            icon={<Users/>}/>)*/}
            {/*    }*/}
            {/*    {*/}
            {/*        ('estudiantesAsignados' in statistics) && (*/}
            {/*            <StatisticsSlot title={'Estudiantes asignados'} data={statistics.estudiantesAsignados}*/}
            {/*                            icon={<GraduationCap/>}/>)*/}
            {/*    }*/}
            {/*</div>*/}
            <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
                <div className="rounded-xl bg-gray-200">
                    <PatientsCreatedLast6Months />
                </div>
                <div className="rounded-xl bg-gray-200">
                    <PatientsAgeDistributionChart />
                </div>
                <div className="rounded-xl bg-gray-200">
                    <UsersTutorsChart />
                </div>
            </div>
            <div className="grid min-h-[100vh] flex-1 auto-rows-min gap-4 md:min-h-min lg:grid-cols-3">
                <div className="rounded-xl bg-gray-200">
                    <UsersRolesChart />
                </div>
            </div>
        </div>
    );
};

const UserMetrics = () => {
    const {
        auth: { user },
    } = usePage().props;

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <Heading>Resumen de usuario</Heading>
            <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
                <div className="rounded-xl bg-gray-200">
                    <PatientsAgeDistributionChart user={user.id} />
                </div>
                <div className="rounded-xl bg-gray-200">
                    <HistoriasStatusChart user={user.id} />
                </div>
                <div className="rounded-xl bg-gray-200">
                    <PatientsSexDistributionChart user={user.id} />
                </div>
            </div>
            <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
                <div className="rounded-xl bg-gray-200 sm:col-span-2"></div>
            </div>
        </div>
    );
};

const TutorMetrics = () => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-gray-200"></div>
                <div className="rounded-xl bg-gray-200"></div>
                <div className="rounded-xl bg-gray-200"></div>
            </div>
            <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
                <div className="rounded-xl bg-gray-200 sm:col-span-2"></div>
            </div>
        </div>
    );
};

export default Show;
