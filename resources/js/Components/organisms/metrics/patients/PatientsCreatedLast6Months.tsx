"use client"
import {Bar, BarChart, CartesianGrid, LabelList, XAxis} from "recharts"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/shadcn/ui/card.tsx"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/shadcn/ui/chart.tsx"
import {useMetrics} from "@/src/Utils/Utils.ts";
import SkeletonChart from "@/Pages/Escuela/Partials/SkeletonChart.tsx";
import {format} from 'date-fns'

const chartConfig = {
    patients: {
        label: "Pacientes",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const PatientsCreatedLast6Months = () => {

    const metrics = useMetrics()

    if (!metrics) {
        return <SkeletonChart/>
    }

    const {
        patients: {created_last_6_months, total_patients},
    } = metrics;

    const ordered = created_last_6_months.toReversed() as {date: string, count: number}[]

    const chartData = ordered.map((bucket) => {
        return {month: format(bucket.date, 'MMMM'), patients: bucket.count}
    })

    return (
        <Card className='h-full'>
            <CardHeader>
                <CardTitle>Pacientes - Últimos 6 meses</CardTitle>
                <CardDescription><span className='capitalize'>{format(ordered[0].date, 'MMMM yyy').toLocaleString()}</span> - <span className='capitalize'>{format(ordered[ordered.length - 1].date, 'MMMM yyy')}</span></CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            className='capitalize'
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="patients" fill="var(--color-patients)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">

                </div>
                <div className="leading-none text-muted-foreground">
                    Mostrando {total_patients} pacientes en total
                </div>
            </CardFooter>
        </Card>
    )}

export default PatientsCreatedLast6Months
