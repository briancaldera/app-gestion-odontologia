"use client"
import * as React from "react"
import {Label, Pie, PieChart} from "recharts"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/shadcn/ui/card"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/shadcn/ui/chart"
import {useMetrics} from "@/src/Utils/Utils.ts";
import SkeletonChart from "@/Pages/Escuela/Partials/SkeletonChart.tsx";

const chartConfig = {
    roles: {
        label: "Roles",
    },
    estudiante: {
        label: "Estudiantes",
        color: "hsl(var(--chart-1))",
    },
    profesor: {
        label: "Profesores",
        color: "hsl(var(--chart-2))",
    },
    admision: {
        label: "Admisión",
        color: "hsl(var(--chart-3))",
    },
    admin: {
        label: "Administración",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig

const RolesChart = ({}) => {

    const metrics = useMetrics()
    console.log(metrics)

    if (!metrics) {
        return <SkeletonChart/>
    } else {
        const chartData = [
            {role: "estudiante", count: metrics.total_students, fill: "var(--color-estudiante)"},
            {role: "profesor", count: metrics.total_tutors, fill: "var(--color-profesor)"},
            {role: "admision", count: metrics.total_admision, fill: "var(--color-admision)"},
            {role: "admin", count: metrics.total_admins, fill: "var(--color-admin)"},
        ]

        return (
            <Card className="flex flex-col h-full">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Distribución de roles</CardTitle>
                    <CardDescription>Cantidad de usuarios por rol</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel/>}
                            />
                            <Pie
                                data={chartData}
                                dataKey="count"
                                nameKey="role"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({viewBox}) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {metrics?.total_users.toLocaleString() ?? 0}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        Usuarios
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none">
                        Usuarios con más de un rol cuentan en cada rol asignado
                    </div>
                    <div className="leading-none text-muted-foreground">
                        Basado en el total de usuarios registrados
                    </div>
                </CardFooter>
            </Card>
        )
    }
}


export default RolesChart
