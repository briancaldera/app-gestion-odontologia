import React, {useContext, useEffect} from 'react';
import GuestLayout from '@/Layouts/GuestLayout.tsx';
import {Button} from "@/shadcn/ui/button.js";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shadcn/ui/card.tsx";
import Logo from "@/Components/atoms/Logo.tsx";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Input} from "@/shadcn/ui/input.tsx";
import {Eye, EyeOff} from "lucide-react";
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";
import {Link} from "@inertiajs/react";

const LoginContext = React.createContext({})

const Login = ({status, canResetPassword}) => {

    return (
        <GuestLayout title={'Iniciar sesión'}>
            <LoginContext.Provider value={{canResetPassword: canResetPassword}}>
                <div className={'flex flex-col items-center'}>
                    <LoginForm/>
                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                </div>
            </LoginContext.Provider>
        </GuestLayout>
    );
}

const LoginForm = () => {

    const {isProcessing, router} = useInertiaSubmit()

    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "", password: "", remember: false
        },
        disabled: isProcessing
    })

    const handleSubmit = (values: z.infer<typeof loginSchema>) => {
        const endpoint = route('login')

        const body = {...values}

        router.post(endpoint, body, {
            onError: errors => mapServerErrorsToFields(loginForm, errors)
        })
    }

    const {canResetPassword} = useContext(LoginContext)

    useEffect(() => {
        return () => {
            loginForm.reset()
        };
    }, []);

    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    return (
        <Card>
            <CardHeader>
                <Logo className={'size-12'}/>
                <CardTitle>
                    <Title>Iniciar Sesión</Title>
                </CardTitle>
                <CardDescription>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...loginForm}>
                    <form id='loginForm' onSubmit={loginForm.handleSubmit(handleSubmit)}>

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
                        )} name={'email'} control={loginForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <div className={'flex items-center gap-x-2'}>
                                    <FormControl>
                                        <Input {...field} autoComplete='current-password'
                                               type={showPassword ? 'text' : 'password'}/>
                                    </FormControl>
                                    {
                                        showPassword ? (
                                            <EyeOff className={'size-6'} onClick={() => setShowPassword(false)}/>
                                        ) : (
                                            <Eye className={'size-6'} onClick={() => setShowPassword(true)}/>
                                        )
                                    }
                                </div>
                                <FormMessage/>
                                <FormDescription>
                                </FormDescription>
                            </FormItem>
                        )} name={'password'} control={loginForm.control}/>

                        <FormField render={({field}) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Mantener sesión
                                    </FormLabel>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage/>
                                </div>
                            </FormItem>
                        )} name={'remember'} control={loginForm.control}/>

                    </form>
                </Form>
            </CardContent>
            <CardFooter className={'justify-end'}>
                {canResetPassword && (
                    <Button variant='link' asChild>
                        <Link
                            href={route('password.request')}
                        >
                            Olvidó su contraseña?
                        </Link>
                    </Button>
                )}
                <Button form='loginForm' type='submit' disabled={isProcessing}>Iniciar sesión</Button>
            </CardFooter>
        </Card>
    )
}

const loginSchema = z.object({
    email: z.coerce.string().min(1, {message: 'Campo requerido'}).max(255, {message: 'Máximo 255 caracteres'}).email({message: 'Correo Electrónico inválido'}).toLowerCase(),
    password: z.coerce.string().min(1, {message: 'Campo requerido'}),
    remember: z.coerce.boolean(),
})

export default Login
