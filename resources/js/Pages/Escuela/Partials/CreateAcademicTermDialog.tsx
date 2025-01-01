import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/shadcn/ui/dialog.tsx'
import {Button} from "@/shadcn/ui/button.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {route} from "ziggy-js";
import {Input} from "@/shadcn/ui/input.tsx";
import DatePicker from "@/Components/molecules/DatePicker.tsx";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import React from "react";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";

const CreateAcademicTermDialog = () => {

    const [open, setOpen] = React.useState<boolean>(false)

    const {router, isProcessing} = useInertiaSubmit()

    const createAcademicTermForm = useForm<z.infer<typeof createAcademicTermSchema>>({
        resolver: zodResolver(createAcademicTermSchema),
        defaultValues: {
            name: "",
            code: "",
            start_date: new Date(),
            end_date: new Date(),
        },
        disabled: isProcessing
    })

    const handleSubmit = async (values: z.infer<typeof createAcademicTermSchema>) => {

        const endpoint = route('academic-terms.store')

        router.post(endpoint, values, {
            onSuccess: params => {
                router.reload()
                setOpen(false)
            },
            onError: error => {
                mapServerErrorsToFields(createAcademicTermForm, error)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild>
                <Button variant='link'>Crear periodo académico</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear periodo académico</DialogTitle>
                </DialogHeader>
                <div>
                    <Form {...createAcademicTermForm}>
                        <form id='createAcademicTermForm' onSubmit={createAcademicTermForm.handleSubmit(handleSubmit)} className='space-y-2'>
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
                            )} name='name' control={createAcademicTermForm.control}/>

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
                            )} name='code' control={createAcademicTermForm.control}/>

                            <DatePicker modal={true} control={createAcademicTermForm.control} name={'start_date'} label='Fecha de comienzo' description='La fecha en la que inicia el periodo académico' disabled={isProcessing}/>
                            <DatePicker modal={true} control={createAcademicTermForm.control} name={'end_date'} label='Fecha de culminación' description='La fecha en la que culmina el periodo académico' disabled={isProcessing}/>

                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline'>Cancelar</Button>
                    </DialogClose>
                    <Button type='submit' form='createAcademicTermForm'>Crear</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const createAcademicTermSchema = z.object({
    name: z.string().max(255),
    code: z.string().max(255),
    start_date: z.date(),
    end_date: z.date(),
}).refine((values) => {
    return values.end_date > values.start_date
}, {message: 'La fecha de fin debe ser mayor a la fecha de inicio', path: ['end_date']})

export default CreateAcademicTermDialog
