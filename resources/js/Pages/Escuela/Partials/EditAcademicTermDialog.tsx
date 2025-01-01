import AcademicTerm from "@/src/models/Escuela/AcademicTerm.ts";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/shadcn/ui/dialog.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import React from "react";
import {Input} from "@/shadcn/ui/input.tsx";
import DatePicker from "@/Components/molecules/DatePicker.tsx";

interface EditAcademicTermDialogProps {
    term: AcademicTerm
    open: boolean
    onOpenChange: (boolean) => void
}

const EditAcademicTermDialog = ({term, open, onOpenChange}: EditAcademicTermDialogProps) => {

    const {isProcessing, router} = useInertiaSubmit()

    const editAcademicTermForm = useForm<z.infer<typeof editAcademicTermSchema>>({
        resolver: zodResolver(editAcademicTermSchema),
        defaultValues: {
            name: term.name,
            code: term.code,
            start_date: new Date(term.start_date),
            end_date: new Date(term.end_date),
        },
        disabled: isProcessing,
    })

    const handleSubmit = (values: z.infer<typeof editAcademicTermSchema>) => {
        const endpoint = route('academic-terms.update', {academicTerm: term.id})

        router.patch(endpoint, values, {
            onSuccess: (params) => {
                onOpenChange(false)
            },
            onError: (errors) => {
                mapServerErrorsToFields(editAcademicTermForm, errors)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar periodo academico</DialogTitle>
                    <DialogDescription>Actualiza los datos del periodo académico.</DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...editAcademicTermForm}>
                        <form id='editAcedemicTermForm' onSubmit={editAcademicTermForm.handleSubmit(handleSubmit)}>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>
                                        Un nombre descriptivo para el periodo académico
                                    </FormDescription>
                                </FormItem>
                            )} name='name' control={editAcademicTermForm.control}/>

                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>Código</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>
                                        Un código único para identificar el periodo académico. Ejemplo: 2022II
                                    </FormDescription>
                                </FormItem>
                            )} name='code' control={editAcademicTermForm.control}/>

                            <DatePicker modal={true} control={editAcademicTermForm.control} name={'start_date'} label='Fecha de comienzo' description='La fecha en la que inicia el periodo académico' disabled={isProcessing}/>
                            <DatePicker modal={true} control={editAcademicTermForm.control} name={'end_date'} label='Fecha de culminación' description='La fecha en la que culmina el periodo académico' disabled={isProcessing}/>
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline'>Cancelar</Button>
                    </DialogClose>
                    <Button form='editAcedemicTermForm' type='submit' disabled={!editAcademicTermForm.formState.isDirty || editAcademicTermForm.formState.disabled}>Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const editAcademicTermSchema = z.object({
    name: z.string().max(255),
    code: z.string().max(255),
    start_date: z.date(),
    end_date: z.date(),
}).refine((values) => {
    return values.end_date > values.start_date
}, {message: 'La fecha de fin debe ser mayor a la fecha de inicio', path: ['end_date']})

export default EditAcademicTermDialog
