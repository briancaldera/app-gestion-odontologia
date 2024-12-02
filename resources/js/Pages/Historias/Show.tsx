import AuthLayout from "@/Layouts/AuthLayout.tsx";
import type Historia from "@/src/models/Historia.ts";
import {Status} from "@/src/models/Historia.ts";
import {KeyRound, LoaderCircle, Lock, LockOpen, PencilLine, ShareIcon} from 'lucide-react'
import HistoriaEditor from "@/Components/organisms/HistoriaEditor.tsx";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {Homework} from "@/src/models/Group.ts";
import {mapServerErrorsToFields, usePermission} from "@/src/Utils/Utils.ts";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/shadcn/ui/hover-card.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Link, router, usePage} from "@inertiajs/react";
import User from "@/src/models/User.ts";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shadcn/ui/dialog.tsx";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {RadioGroup, RadioGroupItem} from "@/shadcn/ui/radio-group.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import React from "react";
import {route} from "ziggy-js";
import Title from "@/Components/atoms/Title";
import {Text} from "@/Components/atoms/Text";
import Profile from "@/src/models/Profile.ts";
import axios from "axios";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";

type ShowProps = {
    historia: Historia
    homework?: Homework
}

const Show = ({historia, homework}: ShowProps) => {

    const {auth: {user}} = usePage().props as { auth: { user: User } }

    const can = usePermission()

    const canCreateCorrections = can('homeworks-create-corrections')
    const canUpdateHistoria = can('historias-update') && (historia.status === Status.ABIERTA || historia.status === Status.CORRECCION) && historia.autor_id === user?.id

    // Show my marvelous HCE here
    return (
        <AuthLayout title={`Historia: ${historia.paciente?.nombre} ${historia.paciente?.apellido}`}>
            <ScrollArea className={'h-full'}>
                <div className={'max-lg:px-2 lg:p-6 max-lg:pt-2 flex gap-x-2'}>
                    <div className={'basis-full'}>
                        <HistoriaEditor historia={historia} readMode={true} homework={homework}
                                        canCreateCorrections={canCreateCorrections}/>
                    </div>
                    {/*Sidebar for additional actions/options*/}
                    <div className={'basis-16 flex flex-col gap-y-2'}>
                        {
                            canUpdateHistoria && (
                                <Button className={'w-full aspect-square h-auto'} asChild>
                                    <Link href={route('historias.edit', {historia: historia.id})}>
                                        <PencilLine/>
                                    </Link>
                                </Button>
                            )
                        }
                        <StatusCard historia={historia}/>
                        {
                            can('historias-update-status') && (<UpdateStatusDialog historia={historia}/>) // todo check groups-create-corrections permission here
                        }
                        {/*{*/}
                        {/*    can('homeworks-create') || can('homeworks-full-control') && <ShareDialog historia={historia}/>*/}
                        {/*}*/}
                    </div>
                </div>
            </ScrollArea>
        </AuthLayout>
    )
}

const shareDialogSchema = z.object({
    users: z.array(z.string()).nonempty()
})

const ShareDialog = ({historia}: { historia: Historia }) => {

    const [open, setOpen] = React.useState<boolean>(false)
    const [tutorList, setTutorList] = React.useState<Profile[]>([])

    React.useEffect(() => {
        const endpoint = route('api.v1.profiles.index', {
            _query: {
                role: 'profesor'
            }
        })
        axios.get(endpoint).then(res => {
            setTutorList(res.data.data)
        })
    }, [])

    const shareDialogForm = useForm<z.infer<typeof shareDialogSchema>>({
        resolver: zodResolver(shareDialogSchema),
        defaultValues: {
            users: []
        }
    })


    const handleSubmit = (values: z.infer<typeof shareDialogSchema>) => {
        const endpoint = route('historias.share', {historia: historia.id})

        const body = {

        }

        router.patch(endpoint, values, {
            onError: errors => {
                mapServerErrorsToFields(shareDialogForm, errors)
            }, onSuccess: params => {
                setOpen(false)
                router.reload()
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={(open) => {
            if (historia.status === Status.CERRADA || historia.status === Status.ENTREGADA) {
                // cancel
            }

            shareDialogForm.reset()
            setOpen(open)
        }}>
            <DialogTrigger asChild>
                <Button className={'w-full aspect-square h-auto'} variant='outline'>
                    <ShareIcon/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Entregar historia</DialogTitle>
                    <DialogDescription>Selecciona el tutor a quien deseas entregar la historia. <span
                        className='text-rose-600'>No podrás modificarla después de entregarlo.</span></DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...shareDialogForm}>
                        <form id='shareDialogForm' onSubmit={shareDialogForm.handleSubmit(handleSubmit)}>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>Profesores</FormLabel>
                                    <ScrollArea className='h-32' type='always'>
                                        {tutorList.map((item) => (
                                            <FormField
                                                key={item.user_id}
                                                control={shareDialogForm.control}
                                                name="users"
                                                render={({field}) => {
                                                    return (
                                                        <FormItem
                                                            key={item.user_id}
                                                            className="flex flex-row items-start space-x-3 space-y-0 py-0.5"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.user_id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, item.user_id])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value) => value !== item.user_id
                                                                                )
                                                                            )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {`${item.nombres} ${item.apellidos}`}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                    </ScrollArea>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'users'} control={shareDialogForm.control}/>


                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline'>Cancelar</Button>
                    </DialogClose>
                    <Button type='submit' form='shareDialogForm'>
                        Entregar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const StatusCard = ({historia}: { historia: Historia }) => {
    let cardColor = ''

    const isOpen = historia.status === Status.ABIERTA || historia.status === Status.CORRECCION

    switch (historia.status) {
        case Status.ABIERTA:
            cardColor = 'emerald'
            break
        case Status.ENTREGADA:
            cardColor = 'sky'
            break
        case Status.CORRECCION:
            cardColor = 'rose'
            break
        case Status.CERRADA:
            cardColor = 'slate'
            break
    }

    return (
        <HoverCard>
            <HoverCardTrigger>
                <div
                    className={`flex justify-center items-center aspect-square border border-${cardColor}-300 rounded-lg bg-${cardColor}-200`}>
                    {
                        isOpen ? (<LockOpen/>) : (<Lock/>)
                    }
                </div>
            </HoverCardTrigger>
            <HoverCardContent align={"end"} side={"left"}>
                <Title>Información</Title>
                <Text>
                    {
                        isOpen ? 'Historia abierta' : 'Historia cerrada'
                    }
                </Text>
            </HoverCardContent>
        </HoverCard>
    )
}

const UpdateStatusDialog = ({historia}: { historia: Historia }) => {

    const [openDialog, setOpenDialog] = React.useState<boolean>(false)

    const {isProcessing, router} = useInertiaSubmit()

    const form = useForm<z.infer<typeof UpdateStatusSchema>>({
        resolver: zodResolver(UpdateStatusSchema)
    })

    const handleSubmit = (values: z.infer<typeof UpdateStatusSchema>) => {
        const endpoint = route('historias.update-status', {historia: historia.id})

        const data = {
            status: values.new_status
        }

        router.patch(endpoint, data, {
            onError: errors => mapServerErrorsToFields(form, errors),
            onSuccess: pages => {
                handleOpenChange(false)
            }
        })
    }

    const handleOpenChange = (open: boolean) => {
        if (open) form.reset()
        setOpenDialog(open)
    }

    return (
        <Dialog open={openDialog} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className={'w-full aspect-square h-auto'} variant={'outline'}>
                    <KeyRound/>
                </Button>
            </DialogTrigger>
            <DialogContent className={'max-w-2xl'}>
                <DialogHeader>
                    <DialogHeader>
                        Cambiar status de la historia
                    </DialogHeader>
                    <DialogDescription>
                        A continuación, podrá seleccionar el nuevo estado de la historia. Si desea habilitar la historia
                        para correcciones, seleccione como nuevo estado "Corrección".
                        Por el contrario, si desea cerrar definitivamente y archivar la historia, seleccione como estado
                        "Cerrado". Considere que una vez cierre definitivamente la historia,
                        esta no podrá volver a editarse.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form id={'updateStatusDialog'} onSubmit={form.handleSubmit(handleSubmit)}>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Nuevo status:
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value}
                                                    className="flex flex-col space-y-1">
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="correccion"/>
                                                </FormControl>
                                                <FormLabel><LockOpen className={'inline mr-2'}/>Corrección</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="cerrada"/>
                                                </FormControl>
                                                <FormLabel><Lock className={'inline mr-2'}/>Cerrada</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={'new_status'} control={form.control}/>
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button variant={"outline"} onClick={() => handleOpenChange(false)}>Cancelar</Button>
                    <Button type={"submit"} form={'updateStatusDialog'}
                            disabled={!form.formState.isDirty || isProcessing}>
                        {isProcessing && <LoaderCircle className={'mr-2 animate-spin'}/>}
                        Cambiar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const UpdateStatusSchema = z.object({
    new_status: z.enum(['correccion', 'cerrada'], {required_error: 'Debe seleccionar una opción'})
})

export default Show
