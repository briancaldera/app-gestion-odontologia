"use client"

import {Label, PolarRadiusAxis, RadialBar, RadialBarChart} from "recharts"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/shadcn/ui/card"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/shadcn/ui/chart"
import {useMetrics} from "@/src/Utils/Utils.ts";

const chartConfig = {
    male: {
        label: "Masculino",
        color: "#3b82f6",
    },
    female: {
        label: "Femenino",
        color: "#ec4899",
    },
} satisfies ChartConfig

export function PatientsSexDistributionChart({user}:{user?: string}) {

    const metrics = useMetrics(user)

    if (!metrics) return null

    const {patients: {
        total_patients,
        sex: {
            total_female_patients,
            total_male_patients,
            total_ns_patients,
        }
    }} = metrics

    const chartData = [{ month: "january", male: total_male_patients, female: total_female_patients }]

    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Pacientes </CardTitle>
                <CardDescription>Distribución de género</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={360}
                        innerRadius={80}
                        outerRadius={130}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {total_patients.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    Pacientes
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="male"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-male)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="female"
                            fill="var(--color-female)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">

                </div>
                <div className="leading-none text-muted-foreground">
                    Mostrando para un total de {total_patients} pacientes asignados al usuario
                </div>
            </CardFooter>
        </Card>
    )
}

