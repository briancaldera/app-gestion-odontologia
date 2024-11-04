import Surface from "@/Components/atoms/Surface";
import React from "react";
import {HistoriaEndodonciaEditorContext} from "@/Components/organisms/historia-endodoncia/HistoriaEndodonciaEditor.tsx";
import Title from "@/Components/atoms/Title";
import {Button} from "@/shadcn/ui/button.tsx";
import FichaForm from "@/Components/organisms/historia-endodoncia/partials/FichaForm.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs"
import {Separator} from "@/shadcn/ui/separator.tsx";
import {Text} from "@/Components/atoms/Text";


const FichasSection = () => {

    const {historia} = React.useContext(HistoriaEndodonciaEditorContext)

    const fichas = historia?.fichas_endodonticas

    console.log(fichas)

    const [showFichaForm, setShowFichaForm] = React.useState<boolean>(false)

    return (
        <Surface className={'px-6'}>
            <Title>Fichas endodonticas</Title>

            {
                fichas?.length > 0 ? (
                    <div>
                        <Text>Fichas guardadas</Text>
                        <Text level={'body-sm'}>Selecciona el número de diente para ver su correspondiente ficha</Text>
                        <Tabs defaultValue={fichas![0].id}>
                            <TabsList className="grid grid-cols-4 md:grid-cols-8">
                                <TabsTrigger className={'border'} value='nueva'>Nueva ficha</TabsTrigger>
                                {
                                    fichas?.map(item => <TabsTrigger className={'border'} key={item.id}
                                                                     value={item.id}>{item.diente}</TabsTrigger>)
                                }
                            </TabsList>
                            <TabsContent value='nueva'>
                                <div>
                                    <Title>Crear nueva ficha de endodoncia</Title>
                                    <FichaForm/>
                                </div>
                            </TabsContent>
                            {
                                fichas?.map(item =>
                                    <TabsContent key={item.id} value={item.id}>
                                        <FichaForm ficha={item} disabled={true}/>
                                    </TabsContent>
                                )
                            }

                        </Tabs>
                    </div>
                ) : (
                    !showFichaForm && (
                        <div className={'h-48 flex flex-col items-center justify-center'}>
                            <Title>No existen fichas endodonticas aún para esta historia!</Title>
                            <Button onClick={() => setShowFichaForm(true)}>Crear nueva ficha de endodoncia</Button>
                        </div>
                    )
                )
            }

            {
                showFichaForm && (

                    <div>
                        <Title>Crear nueva ficha de endodoncia</Title>
                        <FichaForm/>
                    </div>
                )
            }

        </Surface>
    )
}

export default FichasSection
