import GuestLayout from '@/Layouts/GuestLayout';
import {Link} from '@inertiajs/react';
import {z} from 'zod'
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {route} from "ziggy-js";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Input} from "@/shadcn/ui/input.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import Title from "@/Components/atoms/Title";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shadcn/ui/card.tsx";
import {Loader2} from "lucide-react";
import {useEffect} from "react";

const ForgotPassword = ({status}) => {

    const {router, isProcessing} = useInertiaSubmit()

    const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: ""
        },
        disabled: isProcessing
    })

    const handleSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
        const endpoint = route('password.email')

        const body = {...values}

        router.post(endpoint, body, {
            onError: errors => mapServerErrorsToFields(resetPasswordForm, errors),
        })
    }

    useEffect(() => {
        return () => {
            resetPasswordForm.reset()
        };
    }, []);

    return (
        <GuestLayout title={'Recuperar contraseña'}>
            <div className={'absolute top-1 left-1'}>
                <Button variant='link' asChild>
                    <Link href='/'>Inicio</Link>
                </Button>
            </div>
            <div className={'px-4'}>
                <Card className={'max-w-xl'}>
                    <CardHeader>
                        <CardTitle>
                            <Title>Recuperar contraseña</Title>
                        </CardTitle>
                        <CardDescription>
                            ¿Olvidaste tu contraseña? No hay problema. Simplemente dinos tu dirección de correo
                            electrónico y te enviaremos un enlace de restablecimiento de contraseña que te permitirá
                            elegir una nueva.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>


                        <div className={'flex flex-col'}>
                            <Form {...resetPasswordForm}>
                                <form onSubmit={resetPasswordForm.handleSubmit(handleSubmit)} id={'resetPasswordForm'}>


                                    <FormField render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Correo Electrónico
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete='email' type='email'/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name={'email'} control={resetPasswordForm.control}/>


                                </form>
                            </Form>
                        </div>

                        {status &&
                            <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

                    </CardContent>
                    <CardFooter className={'justify-end'}>
                        <Button form={'resetPasswordForm'} type='submit'
                                disabled={isProcessing || !resetPasswordForm.formState.isDirty}>
                            {
                                isProcessing &&
                                <Loader2 className={'size-4 mr-2 animate-spin'}/>
                            }
                            Enviar
                            link</Button>
                    </CardFooter>
                </Card>
            </div>
        </GuestLayout>
    );
}

const resetPasswordSchema = z.object({
    email: z.coerce.string().min(0, {message: 'Campo requerido'}).max(255, {message: 'Máximo 255 caracteres'}).email({message: 'Correo electrónico inválido'})
})

export default ForgotPassword
