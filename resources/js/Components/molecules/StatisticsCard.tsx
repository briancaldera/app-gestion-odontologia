import React from "react";
import {Card} from "@/shadcn/ui/card";
import {Text} from "@/Components/atoms/Text";
import {Icon} from "@/Components/atoms/Icon";

interface StatisticsCardProps {
    title: string,
    data: number | string,
    icon: React.ReactElement
}

const StatisticsCard = ({title, data, icon}: StatisticsCardProps) => {
    return (
        <Card className={'p-6'}>
            <header className={'flex justify-between items-center'}>
                <Text level={'body-sm'} className={'font-semibold'}>
                    {title}
                </Text>
                <Icon>
                    {icon}
                </Icon>
            </header>
            <div className={'mt-1.5'}>
                <Text className={'line-clamp-1'} level={'h1'} component={'p'}>{data}</Text>
            </div>
        </Card>
    )
}

export default StatisticsCard
