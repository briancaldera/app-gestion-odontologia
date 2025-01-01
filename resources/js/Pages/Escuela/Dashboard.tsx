import AuthLayout from "@/Layouts/AuthLayout.tsx";
import RolesChart from "@/Pages/Escuela/Partials/RolesChart.tsx";
import TutorsChart from "@/Pages/Escuela/Partials/TutorsChart.tsx";
import PatientsAgeDistributionChart from "@/Pages/Pacientes/Partials/PatientsAgeDistributionChart.tsx";
import AcademicTerm from "@/src/models/Escuela/AcademicTerm.ts";
import AcademicTermTable from "@/Pages/Escuela/Partials/AcademicTermTable.tsx";
import CreateAcademicTermDialog from "@/Pages/Escuela/Partials/CreateAcademicTermDialog.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/shadcn/ui/card.tsx";

interface DasboardProps {
    acdemictTerms: AcademicTerm[]
}

const Dashboard = ({academicTerms}: DasboardProps) => {
    return (
        <AuthLayout title='Escuela'>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
                    <div className="rounded-xl bg-gray-200">
                        <RolesChart/>
                    </div>
                    <div className="rounded-xl bg-gray-200">
                        <TutorsChart/>
                    </div>
                    <div className="rounded-xl bg-gray-200">
                        <PatientsAgeDistributionChart/>
                    </div>
                </div>
                <div className="min-h-[100vh] flex-1 md:min-h-min grid auto-rows-min gap-4 lg:grid-cols-3">
                    <div className="col-span-2 rounded-xl bg-gray-200">
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Periodos Académicos
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='flex justify-end'>
                                        <CreateAcademicTermDialog/>
                                    </div>
                                    <AcademicTermTable terms={academicTerms}/>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Dashboard
