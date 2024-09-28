import {Dialog, DialogContent, DialogTrigger,} from '@/shadcn/ui/dialog'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/shadcn/ui/carousel"
import {Fullscreen} from 'lucide-react'
import {Icon} from "@/Components/atoms/Icon.tsx";
import React from "react";
import {ScrollArea} from "@/shadcn/ui/scroll-area";
import {Text} from "@/Components/atoms/Text";


type Analisis = {
    user: string,
    descripcion: string,
    radiografias: readonly string[]
}

const Analisis = ({analisis, ...props}: { analisis: Analisis, props: any[] }) => {

    return (
        <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent className={'h-[850px] max-w-fit p-0 overflow-hidden'}>
                <div className={'h-full w-[1500px] flex'}>
                    {/*image*/}
                    <div className={'w-2/3 bg-zinc-900'}>
                        <Carousel className={'h-full flex items-center'}>
                            <CarouselContent>
                                {
                                    analisis.radiografias.map((radiografia, index) => (
                                        <CarouselItem key={index}>
                                            <div
                                                className={'relative bg-neutral-950 w-full h-[850px] overflow-hidden flex justify-center'}>
                                                <div className={'opacity-40 hover:opacity-80 transition absolute m-6 size-10 top-0 right-0 bg-neutral-900 flex items-center justify-center rounded-lg cursor-pointer'}
                                                     onClick={() => document.querySelector(`img#radiografia_viewer-${index}`)?.requestFullscreen()}>
                                                    <Icon>
                                                        <Fullscreen/>
                                                    </Icon>
                                                </div>
                                                <img id={`radiografia_viewer-${index}`} className={'shrink-0 object-contain w-full h-auto'}
                                                     src={analisis.radiografias[index]} alt={''}/>
                                            </div>
                                        </CarouselItem>
                                    ))
                                }
                            </CarouselContent>
                            <CarouselPrevious className={'ms-16'}/>
                            <CarouselNext className={'me-16'}/>
                        </Carousel>
                    </div>
                    {/*description*/}
                    <aside className={'w-1/3'}>
                        <div className={'h-5/6 flex flex-col'}>
                            <div className={'h-20 basis-20 shrink-0'}>

                            </div>
                            <ScrollArea className={'grow basis-0 flex'}>
                                <div className={'flex'}>
                                    <div className={'basis-28 shrink-0'}>

                                    </div>
                                    <Text level={'body-sm'}>{analisis.descripcion}</Text>
                                    <div className={'basis-12 shrink-0'}>

                                    </div>
                                </div>
                            </ScrollArea>
                        </div>
                        <div className={'h-1/6'}></div>
                    </aside>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Analisis
