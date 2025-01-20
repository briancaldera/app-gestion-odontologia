"use client"
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/shadcn/ui/card.tsx"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/shadcn/ui/chart.tsx"
import {useMetrics} from "@/src/Utils/Utils.ts";
import SkeletonChart from "@/Pages/Escuela/Partials/SkeletonChart.tsx";

const chartConfig = {
    patients: {
        label: "Pacientes",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const PatientsAgeDistributionChart = ({user}: {user?: string}) => {
    const metrics = useMetrics(user)

    if (!metrics) {
        return <SkeletonChart/>
    }

    const {
        patients: {
            age: {
                total_patients_0_17,
                total_patients_18_35,
                total_patients_36_45,
                total_patients_46_60,
                total_patients_60,
            },
            total_patients,
        },
    } = metrics

    const chartData = [
        {ageBucket: "0-17", patients: total_patients_0_17},
        {ageBucket: "18-35", patients: total_patients_18_35},
        {ageBucket: "36-45", patients: total_patients_36_45},
        {ageBucket: "46-60", patients: total_patients_46_60},
        {ageBucket: "+60", patients: total_patients_60},
    ]

    return (
        <Card className='h-full'>
            <CardHeader>
                <CardTitle>Pacientes</CardTitle>
                <CardDescription>Distribución de edad</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="ageBucket"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />
                        <Bar dataKey="patients" fill="var(--color-patients)" radius={8}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">

                </div>
                <div className="leading-none text-muted-foreground">
                    Motrandos para un total de {total_patients} pacientes asignados al usuario
                </div>
            </CardFooter>
        </Card>
    )
}

export default PatientsAgeDistributionChart
