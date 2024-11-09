import React from "react";
import {Homework} from "@/src/models/Group.ts";
import {HistoriaEndodoncia} from "@/src/models/Endodoncia/HistoriaEndodoncia.ts";
import {toast} from "sonner";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useCorrections} from "@/src/corrections/corrections.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import Surface from "@/Components/atoms/Surface";
import {UserCircle} from "lucide-react";
import {Icon} from "@/Components/atoms/Icon.tsx";
import AnamnesisSection from "@/Components/organisms/historia-endodoncia/AnamnesisSection.tsx";
import EvaluacionDolorSection from "@/Components/organisms/historia-endodoncia/EvaluacionDolorSection.tsx";
import FichasSection from "@/Components/organisms/historia-endodoncia/FichasSection.tsx";
import Section3 from "@/Components/organisms/historia-endodoncia/Seccion3.tsx";
import Section2 from "@/Components/organisms/historia-endodoncia/Seccion2.tsx";

type HistoriaEndodonciaEditorContextType = {historia?: HistoriaEndodoncia}

const HistoriaEndodonciaEditorContext = React.createContext<HistoriaEndodonciaEditorContextType>({})

type HistoriaEndodonciaEditorProps = {
    historia: HistoriaEndodoncia
    readMode: boolean
    homework?: Homework
    canCreateCorrections: boolean
}

const HistoriaEndodonciaEditor = ({historia, homework, readMode, canCreateCorrections}: HistoriaEndodonciaEditorProps) => {

    const [showSidebar, setShowSidebar] = React.useState<boolean>(false)

    const corrections = homework?.documents.find((document) => document.id === historia?.id).corrections

    const {isProcessing, router} = useInertiaSubmit()

    const handleSubmitCorrections = (values: {section: string, content: string}) => {
        const endpoint = route('groups.assignments.homeworks.corrections', {
            group:homework?.assignment?.group_id,
            assignment: homework?.assignment_id,
            homework: homework?.id,
        })

        const data = {
            document_id: historia?.id,
            type: 'HE',
            section: values.section,
            content: values.content,
        }

        router.post(endpoint, data, {
            onError: errors => {
                toast.error('No se pudo agregar las correcciones')
            },
            onSuccess: page => {
                toast.success('Correcciones agregadas')
            }
        })
    }

    const correctionsModel = useCorrections(handleSubmitCorrections, corrections)

    return (
        <HistoriaEndodonciaEditorContext.Provider value={{historia: historia}}>
            <div className={'h-full'}>
                <div className={'flex gap-x-2'}>
                    <Tabs defaultValue="fichas" className={"basis-3/4 flex-auto flex h-full"}
                          orientation={'vertical'}>
                        <TabsList className={'flex-none flex flex-col items-end justify-start p-0 sticky top-0'}>
                            <TabsTrigger value="anamnesis" className={'p-0'}>
                                <Surface className={'rounded-l-lg rounded-r-none rounded-b-none'}>
                                    <Icon className={'size-8'}>
                                        <UserCircle/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="seccion2" className={'p-0'}>
                                <Surface className={'rounded-l-lg rounded-r-none rounded-b-none'}>
                                    <Icon className={'size-8'}>
                                        <UserCircle/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="evaluacionDolor" className={'p-0'}>
                                <Surface className={'rounded-l-lg rounded-r-none rounded-b-none'}>
                                    <Icon className={'size-8'}>
                                        <UserCircle/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="seccion3" className={'p-0'}>
                                <Surface className={'rounded-l-lg rounded-r-none rounded-b-none'}>
                                    <Icon className={'size-8'}>
                                        <UserCircle/>
                                    </Icon>
                                </Surface>
                            </TabsTrigger>
                            <TabsTrigger value="fichas" className={'p-0'}>
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

                            <TabsContent value="seccion2" className='p-0 m-0'>
                                <Section2/>
                            </TabsContent>

                            <TabsContent value="evaluacionDolor" className='p-0 m-0'>
                                <EvaluacionDolorSection/>
                            </TabsContent>

                            <TabsContent value="seccion3" className='p-0 m-0'>
                                <Section3/>
                            </TabsContent>

                            <TabsContent value="fichas" className='p-0 m-0'>
                                <FichasSection/>
                            </TabsContent>

                        </ScrollArea>
                    </Tabs>
                </div>
            </div>
        </HistoriaEndodonciaEditorContext.Provider>
    )
}

export {HistoriaEndodonciaEditor, HistoriaEndodonciaEditorContext}
