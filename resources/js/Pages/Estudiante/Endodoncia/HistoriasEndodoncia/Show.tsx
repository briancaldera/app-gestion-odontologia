import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {HistoriaEndodoncia} from "@/src/models/Endodoncia/HistoriaEndodoncia.ts";
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {mapServerErrorsToFields, usePermission} from "@/src/Utils/Utils.ts";
import Historia, {Status} from "@/src/models/Historia.ts";
import {Link, usePage} from "@inertiajs/react";
import User from "@/src/models/User.ts";
import HistoriaEditor from "@/Components/organisms/HistoriaEditor.tsx";
import React from "react";
import {Button} from "@/shadcn/ui/button.tsx";
import {route} from "ziggy-js";
import {KeyRound, LoaderCircle, Lock, LockOpen, PencilLine} from "lucide-react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/shadcn/ui/hover-card.tsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger
} from "@/shadcn/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {RadioGroup, RadioGroupItem} from "@/shadcn/ui/radio-group.tsx";
import {HistoriaEndodonciaEditor} from "@/Components/organisms/historia-endodoncia/HistoriaEndodonciaEditor.tsx";

type ShowProps = {
    historia: HistoriaEndodoncia
}

const Show = ({historia}: ShowProps) => {

    console.log(historia)

    const {auth: {user}} = usePage().props as { auth: { user: User } }

    const can = usePermission()

    const canCreateCorrections = can('homeworks-create-corrections')
    const canUpdateHistoria = can('historias-endodoncia-update') && (historia.status === Status.ABIERTA || historia.status === Status.CORRECCION) && historia.autor_id === user?.id

    return (
        <AuthLayout title={`Endodoncia - Historia: ${historia.paciente?.nombre} ${historia.paciente?.apellido}`}>
            <ScrollArea className={'h-full'}>
                <div className={'px-6 py-2 pr-0 flex'}>
                    <div className={'basis-full'}>
                        <HistoriaEndodonciaEditor />
                    </div>
                    <div className={'basis-16 flex flex-col px-2 gap-y-1'}>
                        {
                            canUpdateHistoria && (
                                <Button className={'w-full aspect-square h-auto'} asChild>
                                    <Link href={route('endodoncia.historias.edit', {historia: historia.id})}>
                                        <PencilLine/>
                                    </Link>
                                </Button>
                            )
                        }
                        <StatusCard historia={historia}/>
                        {
                            can('historias-endodoncia-update-status') && (<UpdateStatusDialog historia={historia}/>) // todo check groups-create-corrections permission here
                        }
                    </div>
                </div>
            </ScrollArea>
        </AuthLayout>
    )
}

const StatusCard = ({historia}: { historia: HistoriaEndodoncia }) => {
    let cardColor = ''

    const isOpen = historia.status === Status.ABIERTA || historia.status === Status.CORRECCION

    switch (historia.status) {
        case Status.ABIERTA:
            cardColor = 'border-emerald-300 bg-emerald-200'
            break
        case Status.ENTREGADA:
            cardColor = 'border-sky-300 bg-sky-200'
            break
        case Status.CORRECCION:
            cardColor = 'border-rose-300 bg-rose-200'
            break
        case Status.CERRADA:
        default:
            cardColor = 'border-slate-300 bg-slate-200'
            break
    }

    return (
        <HoverCard>
            <HoverCardTrigger>
                <div
                    className={`flex justify-center items-center aspect-square border rounded-lg ${cardColor}`}>
                    {
                        isOpen ? (<LockOpen/>) : (<Lock/>)
                    }
                </div>
            </HoverCardTrigger>
            <HoverCardContent align={"end"} side={"left"}>
                <div>Informacion:</div>
                {/*    // todo add info here*/}
            </HoverCardContent>
        </HoverCard>
    )
}

const UpdateStatusDialog = ({historia}: {historia: HistoriaEndodoncia}) => {

    const [openDialog, setOpenDialog] = React.useState<boolean>(false)

    const {isProcessing, router} = useInertiaSubmit()

    const form = useForm<z.infer<typeof UpdateStatusSchema>>({
        resolver: zodResolver(UpdateStatusSchema)
    })

    const handleSubmit = (values: z.infer<typeof UpdateStatusSchema>) => {
        const endpoint = route('endodoncia.historias.update-status', {historia: historia.id})

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
                    <Button type={"submit"} form={'updateStatusDialog'} disabled={!form.formState.isDirty || isProcessing}>
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
