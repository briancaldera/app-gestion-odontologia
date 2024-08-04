import Surface from '@/Components/atoms/Surface'
import {UserCircleIcon} from '@heroicons/react/24/outline'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs"
import {Icon} from "@/Components/atoms/Icon";

const TabTriggerStyle = 'p-0 m-0'

const HistoriaEditor = () => {
    return (
        <div className={'w-full h-full px-6 py-6'}>
            <Tabs defaultValue="paciente" className="flex h-full" orientation={'vertical'}>
                <TabsList className={'flex flex-col items-end justify-start p-0'}>
                    <TabsTrigger value="paciente" className={'p-0'}>
                        <Surface>
                            <Icon className={'size-8'}>
                                <UserCircleIcon/>
                            </Icon>
                        </Surface>
                    </TabsTrigger>
                    <TabsTrigger value="antPersonales" className={'p-0'}>
                        <Surface>
                            <Icon className={'size-8'}>
                                <UserCircleIcon/>
                            </Icon>
                        </Surface>
                    </TabsTrigger>
                    <TabsTrigger value="antFamiliares" className={'p-0'}>
                        <Surface>
                            <Icon className={'size-8'}>
                                <UserCircleIcon/>
                            </Icon>
                        </Surface>
                    </TabsTrigger>
                </TabsList>
                <div className={'w-full h-full'}>
                    <TabsContent value="paciente" className={TabTriggerStyle}>
                        <PacienteSection/>
                    </TabsContent>
                    <TabsContent value="antPersonales" className={TabTriggerStyle}>
                        <AntecedentesMedicosPersonalesSection/>
                    </TabsContent>
                    <TabsContent value="antFamiliares" className={TabTriggerStyle}>
                        <AntecedentesMedicosPersonalesSection/>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

const SectionStyle = 'w-full px-6 h-screen'

const PacienteSection = () => {
    return (
        <Surface className={SectionStyle}>

        </Surface>
    )
}

const AntecedentesMedicosPersonalesSection = () => {
    return (
        <Surface className={SectionStyle}>

        </Surface>
    )
}

export default HistoriaEditor
