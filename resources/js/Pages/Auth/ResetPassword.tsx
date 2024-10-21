import React, {useEffect} from 'react';
import GuestLayout from '@/Layouts/GuestLayout.js';
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {Button} from "@/shadcn/ui/button.tsx";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Input} from "@/shadcn/ui/input.tsx";
import {Eye, EyeOff} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shadcn/ui/card.tsx";
import Title from "@/Components/atoms/Title";

const ResetPassword = ({token, email}) => {

    const {isProcessing, router} = useInertiaSubmit()

    const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: "", password: "", password_confirmation: ""
        },
        disabled: isProcessing,
    })

    const handleSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
        const endpoint = route('password.store')

        const body = {
            token: token,
            ...values,
        }

        router.post(endpoint, body, {
            onError: errors => mapServerErrorsToFields(resetPasswordForm, errors)
        })
    }

    useEffect(() => {
        return () => {
            resetPasswordForm.reset()
        };
    }, []);

    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    return (
        <GuestLayout title='Reset Password'>
            <div className={'px-4'}>
                <Card className={'max-w-xl'}>
                    <CardHeader>
                        <CardTitle>
                            <Title>
                                Restablecer contraseña
                            </Title>
                        </CardTitle>
                        <CardDescription>
                            Ingresa la información solicitada para poder recuperar acceso a tu cuenta.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...resetPasswordForm}>
                            <form onSubmit={resetPasswordForm.handleSubmit(handleSubmit)} className={"space-y-5"}
                                  id='resetPasswordForm'>

                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete='email'/>
                                        </FormControl>
                                        <FormMessage/>
                                        <FormDescription>
                                        </FormDescription>
                                    </FormItem>
                                )} name={'email'} control={resetPasswordForm.control}/>

                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <div className={'flex items-center gap-x-2'}>
                                            <FormControl>
                                                <Input {...field} autoComplete='new-password'
                                                       type={showPassword ? 'text' : 'password'}/>
                                            </FormControl>
                                            {
                                                showPassword ? (
                                                    <EyeOff className={'size-6'}
                                                            onClick={() => setShowPassword(false)}/>
                                                ) : (
                                                    <Eye className={'size-6'} onClick={() => setShowPassword(true)}/>
                                                )
                                            }
                                        </div>
                                        <FormMessage/>
                                        <FormDescription>
                                            Use una contraseña de 10 o más caracteres con al menos 1 mayuscula, 1 número
                                            y 1
                                            caracter especial.
                                            Recuerde que trabajará con datos sensibles y privados.
                                        </FormDescription>
                                    </FormItem>
                                )} name={'password'} control={resetPasswordForm.control}/>

                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Confirmar contraseña</FormLabel>
                                        <div className={'flex items-center gap-x-2'}>
                                            <FormControl>
                                                <Input {...field} autoComplete='new-password'
                                                       type={showPassword ? 'text' : 'password'}/>
                                            </FormControl>
                                            {
                                                showPassword ? (
                                                    <EyeOff className={'size-6'}
                                                            onClick={() => setShowPassword(false)}/>
                                                ) : (
                                                    <Eye className={'size-6'} onClick={() => setShowPassword(true)}/>
                                                )
                                            }
                                        </div>
                                        <FormMessage/>
                                        <FormDescription>
                                        </FormDescription>
                                    </FormItem>
                                )} name={'password_confirmation'} control={resetPasswordForm.control}/>

                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className={'justify-end'}>
                        <Button form='resetPasswordForm' type='submit'
                                disabled={isProcessing || !resetPasswordForm.formState.isDirty}>Restablecer
                            contraseña</Button>
                    </CardFooter>
                </Card>
            </div>
        </GuestLayout>
    );
}

const resetPasswordSchema = z.object({
    email: z.string().min(1, {message: 'Campo requerido'}).max(255, {message: 'Máximo 255 caracteres'}).email({message: 'Correo Electrónico inválido'}).toLowerCase(),
    password: z.string().min(10, {message: 'Contraseña debe tener al menos 10 caracteres'}),
    password_confirmation: z.string(),
})

export default ResetPassword
