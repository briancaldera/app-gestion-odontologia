import {Homework} from "@/src/models/Group.ts";
import React from "react";
import {HistoriaCirugia} from "@/src/models/Cirugia/HistoriaCirugia.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs.tsx";
import Surface from "@/Components/atoms/Surface";
import {UserCircle} from "lucide-react";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {Icon} from "@/Components/atoms/Icon.tsx";
import AnamnesisSection from "@/Components/organisms/historia-cirugia/AnamnesisSection.tsx";

type HistoriaCirugiaEditorContextType = { historia?: HistoriaCirugia }

const HistoriaCirugiaEditorContext = React.createContext<HistoriaCirugiaEditorContextType>({})

type HistoriaCirugiaEditorProps = {
    historia: HistoriaCirugia
    readMode: boolean
    homework?: Homework
    canCreateCorrections: boolean
}

const HistoriaCirugiaEditor = ({historia, homework, readMode, canCreateCorrections}: HistoriaCirugiaEditorProps) => {


    return (
        <HistoriaCirugiaEditorContext.Provider value={{historia: historia}}>

            <div className={'h-full'}>
                <div className={'flex gap-x-2'}>
                    <Tabs defaultValue="anamnesis" className={"basis-3/4 flex-auto flex h-full"}
                          orientation={'vertical'}>
                        <TabsList className={'flex-none flex flex-col items-end justify-start p-0 sticky top-0'}>
                            <TabsTrigger value="anamnesis" className={'p-0'}>
                                <Surface className={'rounded-l-lg rounded-r-none rounded-b-none'}>
                                    <Icon className={'size-8'}>
                                        <UserCircle/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                        </TabsList>

                        <ScrollArea className={'flex-1 w-full h-[83vh]'}>

                            <TabsContent value="anamnesis" className='p-0 m-0'>
                                <AnamnesisSection/>
                            </TabsContent>


                        </ScrollArea>
                    </Tabs>

                </div>
            </div>
        </HistoriaCirugiaEditorContext.Provider>
    )
}

export {HistoriaCirugiaEditor, HistoriaCirugiaEditorContext}
