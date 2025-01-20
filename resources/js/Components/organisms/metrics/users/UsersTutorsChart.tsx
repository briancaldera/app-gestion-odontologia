"use client"
import {Label, PolarRadiusAxis, RadialBar, RadialBarChart} from "recharts"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/shadcn/ui/card.tsx"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/shadcn/ui/chart.tsx"
import {useMetrics} from "@/src/Utils/Utils.ts";
import SkeletonChart from "@/Pages/Escuela/Partials/SkeletonChart.tsx";

const chartConfig = {
    with: {
        label: "Con alumnos",
        color: "hsl(var(--chart-1))",
    },
    without: {
        label: "Sin alumnos",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const UsersTutorsChart = () => {

    const metrics = useMetrics()

    if (!metrics) {
        return <SkeletonChart/>
    }

    const {
        users: {
            total_tutors, tutors_with_assignees, tutors_without_assignees,
        }
    } = metrics

    const chartData = [{with: tutors_with_assignees, without: tutors_without_assignees}]

    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Profesores</CardTitle>
                <CardDescription>Profesores con y sin alumnos asignados</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({viewBox}) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {total_tutors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    Profesores
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="with"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-with)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="without"
                            fill="var(--color-without)"
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
                    Basado en el total de usuarios con rol de profesor
                </div>
            </CardFooter>
        </Card>
    )
}

export default UsersTutorsChart
