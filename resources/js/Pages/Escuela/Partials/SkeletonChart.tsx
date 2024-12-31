import {Card, CardContent, CardFooter, CardHeader} from "@/shadcn/ui/card.tsx";
import {Skeleton} from "@/shadcn/ui/skeleton.tsx";

const SkeletonChart = () => {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="items-center pb-0">
                <Skeleton className='w-[20ch] h-[2ch]'/>
                <Skeleton className='w-[25ch] h-[2ch]'/>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <div className="mx-auto aspect-square h-[250px] p-4">
                    <Skeleton className='size-full rounded-full'/>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    <Skeleton className='w-[30ch] h-[2ch]'></Skeleton>
                </div>
                <div className="leading-none text-muted-foreground">
                    <Skeleton className='w-[30ch] h-[2ch]'></Skeleton>
                </div>
            </CardFooter>
        </Card>
    )
}

export default SkeletonChart
