import AuthLayout from "@/Layouts/AuthLayout.tsx";
import Group, {Assignment} from "@/src/models/Group.ts";
import SidebarMenu, {type MenuItem} from "@/Components/organisms/SidebarMenu.tsx";
import {CheckCircle, LayoutDashboard, NotebookPen, Plus, Users, Loader2} from "lucide-react";
import {ClipboardDocumentIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn/ui/tabs.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shadcn/ui/card.tsx";
import Title from "@/Components/atoms/Title";
import {Avatar} from "@mui/joy";
import {Separator} from "@/shadcn/ui/separator.tsx";
import {Text} from "@/Components/atoms/Text";
import {Link} from "@inertiajs/react";
import {route, useRoute} from "ziggy-js";
import Historia from "@/src/models/Historia.ts";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/shadcn/ui/dialog.tsx'
import {Button} from "@/shadcn/ui/button.tsx";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import Surface from "@/Components/atoms/Surface";
import {mapServerErrorsToFields, usePermission} from "@/src/Utils/Utils.ts";
import {Icon} from "@/Components/atoms/Icon.tsx";
import {fakerES_MX} from "@faker-js/faker";
import {formatDate} from 'date-fns'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import CreateAssignmentSchema from "@/FormSchema/Grupos/CreateAssignmentSchema.ts";
import {Input} from "@/shadcn/ui/input.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";

const ShowGroupContext = React.createContext()

type ShowProps = {
    readonly group: Group
    readonly historias: Historia[]
}

const Show = ({group, historias}: ShowProps) => {

    const can = usePermission()

    console.log(group)
    return (
        <AuthLayout title={'Grupo'} sidebar={<SidebarMenu menu={menu}/>}>
            <ShowGroupContext.Provider value={{group_id: group.id}}>
            <ScrollArea className={'h-full'}>


                <div className={'p-6 h-full grid grid-cols-5 gap-x-3'}>
                    <div className={'col-span-3 col-start-2 h-full flex flex-col'}>


                        <Card className={''}>
                            <CardContent className={'flex flex-col p-4 relative h-32'}>
                                <Title level={'h4'}>{group.name}</Title>
                                {/*<Text level={'body-xs'}*/}
                                {/*      className={'text-slate-400 absolute right-4 bottom-4'}>{format(group.created_at, 'PP')}</Text>*/}
                            </CardContent>
                        </Card>
                        <ScrollArea className={'h-[80vh]'}>
                            <Tabs className={'w-full'} defaultValue={'assignments'}>
                                <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
                                    <TabsTrigger value="assignments">Actividad</TabsTrigger>
                                    {/*<TabsTrigger value="members">Miembros</TabsTrigger>*/}
                                </TabsList>
                                <TabsContent value={'assignments'}>
                                    <AssignmentsTab assignments={group.assignments}/>
                                </TabsContent>
                                <TabsContent value={'homework'}>
                                    <HomeworkTab historias={historias}/>
                                </TabsContent>
                                {/*<TabsContent value={'members'}>*/}
                                {/*    <MembersTab group={group}/>*/}
                                {/*</TabsContent>*/}
                            </Tabs>
                        </ScrollArea>
                    </div>

                    <div className={'col-span-1 flex flex-col'}>
                        {
                            can('groups-create-assignments') && (
                                <CreateAssignmentCard/>
                            )
                        }
                    </div>
                </div>
            </ScrollArea>
            </ShowGroupContext.Provider>
        </AuthLayout>
    )
}

const CreateAssignmentCard = () => {

    const [openDialog, setOpenDialog] = React.useState<boolean>(false)

    return (
        <>
            <Card className={'col-span-1'}>
                <CardHeader>
                    <CardTitle>Crear asignación</CardTitle>
                    <CardDescription>Asigna una nueva entrega a tus estudiantes</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button onClick={() => setOpenDialog(true)} className={'w-full'}><Plus className={'size-4 mr-2'}/>Crear</Button>
                </CardFooter>
            </Card>
            <CreateAssignmentDialog open={openDialog} onOpenChange={setOpenDialog}/>
        </>
    )
}

const CreateAssignmentDialog = ({open, onOpenChange}: { open: boolean, onOpenChange: (open: boolean) => void }) => {

    const showGroupContext = React.useContext(ShowGroupContext)

    const {isProcessing, router} = useInertiaSubmit()

    const assignmentForm = useForm<z.infer<typeof CreateAssignmentSchema>>({
        resolver: zodResolver(CreateAssignmentSchema),
        defaultValues: {
            description: "", name: ""
        }
    })

    const handleCancel = (open: boolean) => {
        if (!open) assignmentForm.reset()
        onOpenChange(open)
    }

    const handleSubmit = (values: z.infer<typeof CreateAssignmentSchema>) => {

        const endpoint = route('groups.assignments.store', {group: showGroupContext.group_id})

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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={'max-w-3xl'}>
                <DialogHeader>
                    <DialogTitle>Crear asignación</DialogTitle>
                    <DialogDescription>Coloca un nombre y una descripción</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...assignmentForm}>
                        <form onSubmit={assignmentForm.handleSubmit(handleSubmit)} id={'assignmentForm'} className={'space-y-4'}>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nombre de la asignación</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'name'} control={assignmentForm.control}/>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>Descripcion (Opcional)</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'description'} control={assignmentForm.control}/>

                        </form>
                    </Form>
                </div>
                <DialogFooter className={'flex justify-end gap-x-3'}>
                    <Button type={"submit"} variant={'outline'}
                            onClick={() => handleCancel(false)}>Cancelar</Button>
                    <Button type={"submit"} disabled={!assignmentForm.formState.isDirty || isProcessing} form={'assignmentForm'}>
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

const AssignmentsTab
= ({
    assignments
}:
{
    assignments: Assignment[]
}
) =>
{

    const can = usePermission()

    return (
        <div className={'h-[80vh]'}>
            {
                assignments.length > 0 ? (
                    <div className={'flex flex-col gap-2'}>
                        {
                            assignments.map(assignment => {
                                return (
                                    <Link key={assignment.id} href={route('groups.assignments.show', {
                                        group: assignment.group_id,
                                        assignment: assignment.id
                                    })}>
                                        <Card>
                                            <CardHeader>
                                                <div className={'flex items-center gap-3'}>
                                                    <Icon className={'rounded-full bg-indigo-500 p-4 text-indigo-50'}>
                                                        <NotebookPen/>
                                                    </Icon>
                                                    <div className={'flex flex-col gap-1'}>
                                                        <CardTitle>{assignment.name}</CardTitle>
                                                        <Text
                                                            level={'body-xs'}>{formatDate(assignment.created_at, 'PPp')}</Text>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <Text level={'body-xs'}>{assignment.description}</Text>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                )
                            })

                        }
                    </div>
                ) : (
                    <div className={'h-full flex justify-center items-center'}>
                        {can('groups-create-assignments') ? (
                            <div className={'h-full flex justify-center items-center flex flex-col gap-4'}>
                                <NotebookPen className={'size-20 mb-4 text-slate-300'}/>
                                <Text className={'text-center'}>¡Aun no hay asignaciones! Crea una nueva
                                    asignación</Text>
                                <Button>
                                    <Plus className={'mr-2'}/>Crear asignación
                                </Button>
                            </div>
                        ) : (
                            <div className={'h-full flex justify-center items-center flex flex-col gap-4'}>
                                <NotebookPen className={'size-20 mb-4 text-slate-300'}/>
                                <Text className={'text-center'}>¡Aun no hay asignaciones!</Text>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}

    const HomeworkTab = ({historias}: { historias: Historia[] }) => {

        const [openSelectHCEDialog, setOpenSelectHCEDialog] = React.useState<boolean>(true)

        return (
            <Card>
                <CardContent className={'p-6'}>
                    <Title>Entregar historia</Title>
                    <Text level={'body-xs'}>En esta sección podrás entregar historias a tu tutor para su evaluación.
                        Recuerda que una vez
                        entregada, no podrás realizar cambios a la HCE.</Text>
                    <Text level={'body-xs'}>Si el tutor encuentra errores a corregir, habilitará la historia para
                        edición y
                        podras realizar
                        cambios. Una vez hecho esto, debes volver a entregarla.</Text>

                </CardContent>
                <SelectHCEDialog historias={historias} open={openSelectHCEDialog}
                                 onOpenChange={setOpenSelectHCEDialog}/>
            </Card>
        )
    }

    const MembersTab = ({group}: { group: Group }) => {

        const route = useRoute()
        const {owner} = group

        return (
            <Card>
                <CardContent className={'p-6'}>
                    <Title level={'title-lg'}>Tutores</Title>
                    <Separator className={'my-4'}/>
                    <Link href={route('profile.show', {
                        profile: owner.id
                    })}>
                        <div className={'flex gap-4'}>
                            <Avatar src={owner.profile?.picture_url}
                                    className={'h-auto aspect-square basis-1/12 flex-none'}/>
                            <div className={'flex flex'}>
                                <Text
                                    className={'text-lg'}>{`${owner.profile?.nombres ?? ''} ${owner.profile?.apellidos ?? ''}`}</Text>
                                <Text className={'text-lg'}></Text>
                            </div>
                        </div>
                    </Link>
                </CardContent>
            </Card>
        )
    }

    const SelectHCEDialog = ({historias, open, onOpenChange}: {
        historias: Historia[],
        open: boolean,
        onOpenChange: (boolean) => void
    }) => {

        const route = useRoute()
        const {isProcessing, router} = useInertiaSubmit()
        const form = useForm<z.infer<typeof SelectHCESchema>>({
            resolver: zodResolver(SelectHCESchema),
            defaultValues: {historia_id: ""}
        })

        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className={'lg:max-w-6xl'}>
                    <DialogHeader>
                        <DialogTitle><Title>Seleccione historia</Title></DialogTitle>
                        <DialogDescription>Seleccione la historia que desea entregar</DialogDescription>
                    </DialogHeader>
                    <div className={'flex flex-col h-96 gap-4'}>
                        <ScrollArea className={'h-full basis-full bg-slate-50 flex flex-col'}>
                            <div className={'grid sm:grid-cols-1 lg:grid-cols-2 p-4 gap-4'}>
                                {
                                    historias.map(historia => (
                                        <HistoriaItem key={historia.id} historia={historia}
                                                      selected={(form.getValues().historia_id === historia.id)}
                                                      onSelectItem={(id: string) => form.setValue('historia_id', id, {
                                                          shouldTouch: true,
                                                          shouldDirty: true,
                                                          shouldValidate: true
                                                      })}/>))}
                            </div>
                        </ScrollArea>
                        <div className={'flex-none flex justify-end gap-3'}>
                            <Button variant={'outline'} onClick={() => onOpenChange(false)}>Cancelar</Button>
                            <Button variant={'default'}
                                    disabled={isProcessing || !form.formState.isDirty}>Entregar</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    const HistoriaItem = ({historia, selected, onSelectItem}: {
        historia: Historia,
        selected: boolean,
        onSelectItem: (id: string) => void
    }) => {

        return (
            <div onClick={() => onSelectItem(historia.id)}>
                <Surface
                    className={`h-[100px] flex items-center px-6 gap-4 cursor-pointer relative hover:scale-105 ${selected && 'scale-105'} transition-all`}>
                    {selected && <CheckCircle className={'size-4 absolute top-2 right-2 text-emerald-400'}/>}
                    <div className={'w-16 flex-none'}>
                        <Avatar className={'w-full h-auto aspect-square'} picture={historia.paciente?.foto_url}/>
                    </div>

                    <div>
                        <Text>
                            Paciente: {`${historia.paciente?.nombre ?? ''} ${historia.paciente?.apellido ?? ''}`}
                        </Text>
                        <div className={'flex gap-2'}>
                            <Text level={'body-sm'} className={'text-slate-500'}>
                                {historia.paciente?.cedula ?? ''}
                            </Text>
                            <Text level={'body-sm'} className={'text-slate-500'}>
                                Edad: {historia.paciente?.edad}
                            </Text>
                        </div>
                    </div>
                </Surface>
            </div>
        )
    }


    const SelectHCESchema = z.object({
        historia_id: z.string().uuid(),
    })

    const menu: MenuItem[] = [
        {name: 'Inicio', link: 'dashboard', icon: <LayoutDashboard/>},
        {name: 'Historias', icon: <ClipboardDocumentIcon/>, link: 'historias.dashboard'},
        {icon: <Users/>, link: "groups.index", name: "Grupos"}
    ] satisfies MenuItem[]

    export default Show
