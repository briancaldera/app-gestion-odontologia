import {type Assignment, Homework} from "@/src/models/Group.ts";
import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {mapServerErrorsToFields, usePermission} from "@/src/Utils/Utils.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shadcn/ui/card.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import React from "react";
import Title from "@/Components/atoms/Title";
import {Loader2, NotebookPen} from "lucide-react";
import {Text} from "@/Components/atoms/Text";
import {faker} from '@faker-js/faker'
import {Separator} from "@/shadcn/ui/separator.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/shadcn/ui/dialog.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {route} from "ziggy-js";
import {Form, FormField, FormItem, FormMessage} from "@/shadcn/ui/form.tsx";
import Historia from "@/src/models/Historia.ts";
import CreateHomeworkSchema from "@/FormSchema/Grupos/CreateHomeworkSchema.ts";
import {Link, usePage} from "@inertiajs/react";
import {format} from 'date-fns'
import {Tabs, TabsContent, TabsList} from '@/shadcn/ui/tabs.tsx'

type ShowProps = {
    assignment: Assignment,
    historias: Historia[]
}

const Show = ({assignment, historias}: ShowProps) => {

    const can = usePermission()

    return (
        <AuthLayout title={`Asignación - ${assignment.name}`}>
            <div className={'grid grid-cols-4 h-full p-6 gap-2'}>
                <div className={'col-span-3 overflow-y-scroll'}>
                    <div className={'flex'}>
                        <div className={'basis-20 flex-none'}>
                            <div className={''}>
                                <NotebookPen/>
                            </div>

                        </div>
                        <div className={'flex-1 flex flex-col'}>
                            <Title level={'h3'}>{assignment.name}</Title>
                            <Separator className={'my-4'}/>
                            <Text>
                                {
                                    faker.lorem.paragraphs(3)
                                }
                            </Text>
                        </div>

                    </div>

                    {
                        can('groups-index-all-homeworks') && (
                            <div>
                                <Tabs defaultValue={'homeworks'}>
                                    <TabsList className={'w-full grid-cols-1'}>
                                        <TabsList value={'homeworks'}>
                                            Tarea entregada
                                        </TabsList>
                                    </TabsList>
                                    <TabsContent value={'homeworks'}>
                                        <HomeworksTab homeworks={assignment.homeworks}/>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )
                    }
                </div>
                <div className={'col-span-1 col-start-4 flex flex-col'}>
                    {
                        can('groups-create-homeworks') && (
                            <TurnInHomeworkCard historias={historias} assignment={assignment}/>
                        )
                    }
                </div>

            </div>
        </AuthLayout>
    )
}

const TurnInHomeworkCard = ({assignment, historias}: { assignment: Assignment, historias: Historia[] }) => {

    const {auth: {user}} = usePage().props

    const [openDialog, setOpenDialog] = React.useState<boolean>(false)
    const myHomework = assignment.homeworks?.filter(homework => homework.user_id === user.id) ?? []

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Entregar
                    </CardTitle>
                    <CardDescription>

                    </CardDescription>
                </CardHeader>
                <div>

                </div>
                <CardFooter>
                    {
                        myHomework.length > 0 ? (
                            <div>Documento entregado en {format(myHomework[0].created_at, 'Pp')}</div>
                        ) : (
                            <Button onClick={() => setOpenDialog(true)} className={'w-full'}>Entregar</Button>
                        )
                    }
                </CardFooter>
            </Card>

            <TurnInHomeworkDialog open={openDialog} onOpenChange={setOpenDialog} historias={historias}
                                  assignment={assignment}/>
        </>
    )
}

const TurnInHomeworkDialog = ({assignment, historias, open, onOpenChange}: {
    assignment: Assignment,
    historias: Historia[],
    open: boolean,
    onOpenChange: (open: boolean) => void
}) => {

    const {isProcessing, router} = useInertiaSubmit()

    const [selection, setSelection] = React.useState<Historia[]>([])

    const assignmentForm = useForm<z.infer<typeof CreateHomeworkSchema>>({
        resolver: zodResolver(CreateHomeworkSchema),
        defaultValues: {
            documents: [],
        }
    })

    const handleCancel = (open: boolean) => {
        if (!open) assignmentForm.reset()
        onOpenChange(open)
    }

    const handleSubmit = (values: z.infer<typeof CreateHomeworkSchema>) => {


        const endpoint = route('groups.assignments.homeworks.store', {
            group: assignment?.group_id,
            assignment: assignment?.id
        })

        router.post(endpoint, values, {
            onError: errors => {
                mapServerErrorsToFields(assignmentForm, errors)
            },
            onSuccess: page => {
                handleCancel(false)
                router.reload()
            }
        })
    }

    const handleHistoriaClick = (historia: Historia) => {
        if (assignmentForm.getValues().documents.some(element => element.id === historia.id)) {
            assignmentForm.setValue('documents',
                [],
                {shouldDirty: true, shouldTouch: true, shouldValidate: true})
        } else {

            const newDocument = {
                id: historia.id,
                type: 'HRA'
            }

            assignmentForm.setValue('documents', [newDocument], {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={'max-w-3xl'}>
                <DialogHeader>
                    <DialogTitle>Crear entrega</DialogTitle>
                    <DialogDescription>Coloca un nombre y una descripción</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...assignmentForm}>
                        <form onSubmit={assignmentForm.handleSubmit(handleSubmit)} id={'assignmentForm'}
                              className={'space-y-4'}>
                            {
                                (historias.length > 0) ? (
                                    <ScrollArea className={'h-[30vw]'}>
                                        <div className={'flex flex-col'}>
                                            <div>
                                                <Title>Historias regulares de adulto</Title>
                                                <div>
                                                    {
                                                        historias.map(historia => (
                                                            <HistoriaItem historia={historia} key={historia.id}
                                                                          onClick={handleHistoriaClick}
                                                                          isSelected={assignmentForm.getValues().documents.some(selection => selection.id === selection.id)}/>))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </ScrollArea>
                                ) : (
                                    <div>
                                        No tienes documentos pendientes por entregar
                                    </div>
                                )
                            }

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'documents'} control={assignmentForm.control}/>
                        </form>
                    </Form>
                </div>
                <DialogFooter className={'flex justify-end gap-x-3'}>
                    <Button type={"submit"} variant={'outline'}
                            onClick={() => handleCancel(false)}>Cancelar</Button>
                    <Button type={"submit"} disabled={!assignmentForm.formState.isDirty || isProcessing}
                            form={'assignmentForm'}>
                        {
                            !assignmentForm.formState.isDirty || isProcessing && (
                                <Loader2 className={'mr-2 size-4 animate-spin'}/>
                            )
                        }
                        Crear
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const HistoriaItem = ({
                          historia, isSelected, onClick = () => {
    }
                      }: { historia: Historia, isSelected: boolean, onClick: (historia: Historia) => void }) => {
    return (
        <div key={historia.id}
             className={`group h-32 p-2 border rounded-lg cursor-pointer ${isSelected && 'bg-emerald-100'}`}
             onClick={() => onClick(historia)}>
            <Text>
                {`Paciente: ${historia.paciente?.nombre} ${historia.paciente?.apellido}`}
            </Text>
        </div>
    )
}

const HomeworksTab = ({homeworks}: { homeworks: Homework[] }) => {

    return (
        <div className={'grid grid-cols-4 gap-2'}>
            {
                homeworks.map(homework => (
                    <HomeworkItem key={homework.id} homework={homework}/>
                ))
            }
        </div>
    )
}

const HomeworkItem = ({homework}: { homework: Homework }) => {

    const firstResource = homework.documents[0]

    let resourceLink: string = ''

    switch (firstResource.type) {
        case 'HRA':
            resourceLink = route('historias.show', {historia: firstResource.id, _query: {
                    homework: homework.id
                }})
            break
        default:
            throw new Error('Tipo de recurso no encontrado')
    }

    return (
        <Link href={resourceLink}>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className={'flex flex-col'}>
                            <Text>{`${homework.user?.profile?.nombres}`}</Text>
                            <Text>{`${homework.user?.profile?.apellidos}`}</Text>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>

                </CardContent>
                <CardFooter>
                    <div>
                        <Text>Entregado en: {format(homework.created_at, 'Pp')}</Text>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}

export default Show
