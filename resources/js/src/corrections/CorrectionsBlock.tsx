import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/shadcn/ui/hover-card"
import {PencilLine, TriangleAlert} from "lucide-react";
import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shadcn/ui/card.tsx";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Textarea} from "@/shadcn/ui/textarea.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/shadcn/ui/popover.tsx";
import {createPortal} from 'react-dom';
import {Comment} from '@/src/models/Group.ts'
import {Avatar, AvatarFallback, AvatarImage} from "@/shadcn/ui/avatar.tsx";
import {Text} from "@/Components/atoms/Text";
import Title from "@/Components/atoms/Title";
import {formatRelative} from 'date-fns'
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import {Skeleton} from "@/shadcn/ui/skeleton.tsx";
import {UseCorrectionsReturn} from "@/src/corrections/corrections.ts";
import {useProfile} from "@/src/Utils/Utils.ts";

type CorrectionsBlockProps = {
    model?: UseCorrectionsReturn
    name: string
    canCreateCorrections: boolean
}

const CorrectionsBlock = ({model, name, canCreateCorrections, children}: CorrectionsBlockProps) => {

    const sections = model?.model?.secciones
    const messages =  sections ? sections[name] : null

    const hasCorrections: boolean = messages?.length > 0

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

        const data = {
            section: name,
            content: values.description
        }

        model?.handleSubmit(data)

        setIsCreateCorrectionMode(false)
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
                                            <form id={'correctionsForm'}
                                                  onSubmit={correctionsForm.handleSubmit(handleSubmit)}>

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
                                        <form id={'correctionsForm'}
                                              onSubmit={correctionsForm.handleSubmit(handleSubmit)}>

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
                                <CardFooter className='flex justify-end gap-3'>
                                    <Button type='button' variant='outline' onClick={() => setIsCreateCorrectionMode(false)}>Cancelar</Button>
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
                        <div className={showCorrections ? 'outline outline-4 outline-rose-400 rounded-lg' : ''}>
                            {children}
                        </div>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent className={'w-[30vw]'} align={"start"} side={"top"}>
                    <div>
                        <ScrollArea className={'h-48'}>
                            <div className={'flex justify-between py-1'}>
                                <TriangleAlert className={'text-rose-500'}/>
                                <Text>Mensajes ({messages?.length})</Text>
                            </div>
                            {
                                messages?.map(comment => <CommentItem key={comment.id} comment={comment}/>)
                            }
                        </ScrollArea>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}

const CommentItem = ({comment}: { comment: Comment }) => {

    const profile = useProfile(comment.user_id)

    return (
        <div className={'border rounded-lg flex gap-x-3 min-h-32 p-4'}>
            <Avatar className='size-10'>
                <AvatarImage src={profile?.picture_url}/>
                <AvatarFallback>{`${profile?.nombres[0]}${profile?.apellidos[0]}`}</AvatarFallback>
            </Avatar>
            <div className={'flex flex-col flex-1'}>
                {
                    profile ? <Title level={'body-sm'}>{profile?.nombres} {profile?.apellidos}</Title> :
                        <Skeleton className={'w-full h-[14pt]'}/>
                }
                <Text level={'body-xs'}>{formatRelative(comment.created_at, new Date())}</Text>
                <div>
                    <Text>
                        {comment.content}
                    </Text>
                </div>
            </div>
        </div>
    )
}

const AddCorrectionsSchema = z.object({
    description: z.string().min(1).max(1000)
})

export default CorrectionsBlock
