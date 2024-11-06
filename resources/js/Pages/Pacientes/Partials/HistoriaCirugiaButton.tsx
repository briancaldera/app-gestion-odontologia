import Paciente from "@/src/models/Paciente.ts";
import Title from "@/Components/atoms/Title";
import {Text} from "@/Components/atoms/Text";
import {Button} from "@/shadcn/ui/button.tsx";
import {Link} from "@inertiajs/react";
import {route} from "ziggy-js";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/shadcn/ui/alert-dialog.tsx";
import React from "react";

const HistoriaCirugiaButton = ({paciente}: {paciente: Paciente}) => {

    const historia = paciente.historia_cirugia

    return (
        <>
            <div className={`group h-32 border bg-${historia ? 'sky' : 'slate'}-100 border-${historia ? 'sky' : 'slate'}-400 rounded-lg p-3 flex flex-col`}>
                <div>
                    <Title>Historia de cirugía</Title>
                </div>
                {
                    historia ? (
                        <div className={'flex-1 flex justify-center items-center gap-x-3'}>
                            <Text>
                                Historia de cirugía creada
                            </Text>
                            <Button asChild>
                                <Link href={route('cirugia.historias.show', {historia: historia.id})} >
                                    Ver historia de cirugía
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className={'flex-1 flex justify-center items-center gap-x-3'}>
                            <Text>
                                No hay historia de cirugía creada
                            </Text>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button>
                                        Crear
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Crear historia de cirugía
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Estás a punto de crear la historia de cirugía para este paciente. ¿Deseas continuar?
                                        </AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancelar
                                            </AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                                <Link href={route('cirugia.historias.store')} method={'post'} data={{paciente_id: paciente.id}} as={'button'}>
                                                    Crear historia de cirugía
                                                </Link>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogHeader>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default HistoriaCirugiaButton
