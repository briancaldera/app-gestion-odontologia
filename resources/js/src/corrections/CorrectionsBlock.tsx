import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/shadcn/ui/hover-card"
import {CorrectionsModel} from "@/src/corrections/corrections.ts";
import {PencilLine, TriangleAlert} from "lucide-react";
import React from "react";
import {HoverCardPortal} from "@radix-ui/react-hover-card";
import {Icon} from "@/Components/atoms/Icon.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shadcn/ui/card.tsx";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/shadcn/ui/popover.tsx";
import {PopoverPortal} from "@radix-ui/react-popover";
import { createPortal } from 'react-dom';

type CorrectionsBlockProps = {
    model: CorrectionsModel
    name: string
    canCreateCorrections: boolean
    onSubmitCorrections: (values: any) => void
}

const CorrectionsBlock = ({model, name, onSubmitCorrections, canCreateCorrections, children}: CorrectionsBlockProps) => {

    const message = model.sections[name]

    const hasCorrections: boolean = !!message

    const [showCorrections, setShowCorrections] = React.useState(false)
    const [isCreateCorrectionMode, setIsCreateCorrectionMode] = React.useState(false)

    const handleToggleCorrections = () => {
        setShowCorrections(value => !value)
    }

    const correctionsForm = useForm<z.infer<typeof AddCorrectionsSchema>>({
        resolver: zodResolver(AddCorrectionsSchema),
        defaultValues: {
            description: ""
        }
    })

    const handleSubmit = (values: z.infer<typeof AddCorrectionsSchema>) => {
        const message = {
            [name]: values.description
        }

        onSubmitCorrections(message)
    }

    const sidebar = null

    return (
        <div>
            <Popover open={isCreateCorrectionMode}>
                <PopoverTrigger>
                    <div></div>
                </PopoverTrigger>
                <PopoverContent>
                    {
                        sidebar ? (
                            createPortal((
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Agregar corrección</CardTitle>
                                        <CardDescription>Agrega una correción a esta sección</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Form {...correctionsForm}>
                                            <form id={'correctionsForm'} onSubmit={correctionsForm.handleSubmit(handleSubmit)}>

                                                <FormField render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel></FormLabel>
                                                        <FormControl>
                                                            <Textarea {...field}/>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )} name={'description'} control={correctionsForm.control}/>

                                            </form>
                                        </Form>
                                    </CardContent>
                                    <CardFooter>
                                        <Button type={"submit"} form={'correctionsForm'}>Guardar</Button>
                                    </CardFooter>
                                </Card>
                            ), sidebar)
                            ) : (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Agregar corrección</CardTitle>
                                    <CardDescription>Agrega una correción a esta sección</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form {...correctionsForm}>
                                        <form id={'correctionsForm'} onSubmit={correctionsForm.handleSubmit(handleSubmit)}>

                                            <FormField render={({field}) => (
                                                <FormItem>
                                                    <FormLabel></FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )} name={'description'} control={correctionsForm.control}/>

                                        </form>
                                    </Form>
                                </CardContent>
                                <CardFooter>
                                    <Button type={"submit"} form={'correctionsForm'}>Guardar</Button>
                                </CardFooter>
                            </Card>
                        )
                    }
                </PopoverContent>
            </Popover>
            <HoverCard open={showCorrections && hasCorrections}>
                <HoverCardTrigger>
                    <div className={'relative inline'}>
                        {

                                <div className={'absolute top-0 right-0 gap-x-2 flex'}>
                                    {
                                        canCreateCorrections && (
                                            <PencilLine onClick={() => setIsCreateCorrectionMode(value => !value)}/>
                                        )
                                    }
                                    {
                                        hasCorrections && (
                                            <TriangleAlert onClick={handleToggleCorrections} className={'text-rose-500'}/>
                                        )
                                    }
                                </div>

                        }
                        {children}
                    </div>
                </HoverCardTrigger>
                <HoverCardContent className={''} align={"start"}>
                            <div>
                                <TriangleAlert className={'text-rose-500'}/>
                                {
                                    message
                                }
                            </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}

const AddCorrectionsSchema = z.object({
    description: z.string().min(1).max(1000)
})

export default CorrectionsBlock
