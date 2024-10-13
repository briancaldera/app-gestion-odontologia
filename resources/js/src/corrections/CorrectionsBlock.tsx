import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/shadcn/ui/hover-card"
import {PencilLine, TriangleAlert, User} from "lucide-react";
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
import {Comment, Corrections} from '@/src/models/Group.ts'
import {Avatar, AvatarFallback} from "@/shadcn/ui/avatar.tsx";
import {Text} from "@/Components/atoms/Text";
import Title from "@/Components/atoms/Title";
import {formatRelative} from 'date-fns'
import {ScrollArea} from "@/shadcn/ui/scroll-area.tsx";
import axios from "axios";
import {Skeleton} from "@/shadcn/ui/skeleton.tsx";
import Profile from "@/src/models/Profile.ts";

type CorrectionsBlockProps = {
    model?: Corrections
    name: string
    canCreateCorrections: boolean
    onSubmitCorrections: (values: any) => void
}

const CorrectionsBlock = ({
                              model,
                              name,
                              onSubmitCorrections,
                              canCreateCorrections,
                              children
                          }: CorrectionsBlockProps) => {

    console.log(model)

    const messages = model?.sections[name]

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
        const message = {
            [name]: values.description
        }

        const data = {
            section: name,
            content: values.description
        }

        onSubmitCorrections(data)

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

    const [profile, setProfile] = React.useState<Pick<Profile, 'nombres' | 'apellidos'> | null>(null)

    // todo add cache
    // React Query maybe a candidate
    React.useEffect(() => {

        let ignore = false

        const fetchUser = async (): Promise<Pick<Profile, 'nombres' | 'apellidos'>> => {

            const endpoint = route('profile.show', {profile: comment.user_id})

            const res = await axios.get(endpoint, {responseType: "json"})

            if (ignore) return

            const {data: {profile: {nombres, apellidos}}} = res

            return {
                nombres,
                apellidos,
            }
        }

        fetchUser().then(data => {
            setProfile(data)
        })

        return () => {
            ignore = true
        }
        }, [])

    return (
        <div className={'border rounded-lg flex gap-x-3 min-h-32 p-4'}>
            <Avatar>
                <AvatarFallback>
                    <User/>
                </AvatarFallback>
            </Avatar>
            <div className={'flex flex-col flex-1'}>
                {
                    profile ? <Title level={'body-sm'}>{profile.nombres} {profile.apellidos}</Title> : <Skeleton className={'w-full h-[14pt]'}/>
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
