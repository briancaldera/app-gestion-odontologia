"use client"

import * as React from "react"
import {Label, Pie, PieChart} from "recharts"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/shadcn/ui/card.tsx"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/shadcn/ui/chart.tsx"
import {useMetrics} from "@/src/Utils/Utils.ts";

const chartConfig = {
    historias: {
        label: "Historias",
    },
    cerradas: {
        label: "Cerradas",
        color: "hsl(var(--chart-2))",
    },
    abiertas: {
        label: "Abiertas",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export function HistoriasStatusChart({user}: {user?: string}) {

    const metrics = useMetrics(user)

    if (!metrics) return null

    const {
        historias: {
            total_HC_created_by_user,
            total_open_HC_created_by_user,
            total_closed_HC_created_by_user
        }
    } = metrics

    const chartData = [
        { status: "abiertas", historias: total_open_HC_created_by_user, fill: "var(--color-abiertas)" },
        { status: "cerradas", historias: total_closed_HC_created_by_user, fill: "var(--color-cerradas)" },
    ]

    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Status de Historias</CardTitle>
                <CardDescription>Todas las historias</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="historias"
                            nameKey="status"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
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
                                                    {total_HC_created_by_user.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Historias
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
                    {/*Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />*/}
                </div>
                <div className="leading-none text-muted-foreground">
                    Mostrando para un total de {total_HC_created_by_user} historias creadas por el usuario
                </div>
            </CardFooter>
        </Card>
    )
}
