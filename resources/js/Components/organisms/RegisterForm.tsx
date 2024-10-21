import Surface from "@/Components/atoms/Surface.jsx";
import NavLink from "@/Components/atoms/NavLink.jsx";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.js";
import {useForm} from "react-hook-form";
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {route} from "ziggy-js";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Eye, EyeOff, Loader2} from "lucide-react";
import {Input} from "@/shadcn/ui/input.tsx";
import {Text} from "@/Components/atoms/Text";
import React, {useEffect} from "react";

const RegisterForm = () => {

    const {router, isProcessing} = useInertiaSubmit()

    const registerForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            code: "", email: "", name: "", password: "", password_confirmation: ""
        },
        disabled: isProcessing,
    })

    const handleSubmit = (values: z.infer<typeof registerSchema>) => {
        const endpoint = route('register')

        const body = {...values}

        router.post(endpoint, body, {
            onError: errors => mapServerErrorsToFields(registerForm, errors)
        })
    }

    useEffect(() => {
        return () => {
            registerForm.reset()
        };
    }, []);

    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    return (
        <Surface className={"mt-6 w-full overflow-hidden px-6 py-4 sm:max-w-md"}>
            <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(handleSubmit)} className={"space-y-5"}>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>Expediente</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage/>
                            <FormDescription>
                                Código o número de expediente asignado por la universidad.
                            </FormDescription>
                        </FormItem>
                    )} name={'code'} control={registerForm.control}/>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>Usuario</FormLabel>
                            <div className={'flex items-baseline gap-x-2'}>
                                <Text>@</Text>
                                <FormControl>
                                    <Input {...field} autoComplete='username' placeholder='username'/>
                                </FormControl>
                            </div>
                            <FormMessage/>
                            <FormDescription>
                                Este nombre de usuario será públicamente visible. Ejemplo: @johndoe23
                            </FormDescription>
                        </FormItem>
                    )} name={'name'} control={registerForm.control}/>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>Correo Electrónico</FormLabel>
                            <FormControl>
                                <Input {...field} autoComplete='email'/>
                            </FormControl>
                            <FormMessage/>
                            <FormDescription>
                                Use un correo accesible. Requerirá verificar.
                            </FormDescription>
                        </FormItem>
                    )} name={'email'} control={registerForm.control}/>

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
                                            <EyeOff className={'size-6'} onClick={() => setShowPassword(false)}/>
                                        ) : (
                                            <Eye className={'size-6'} onClick={() => setShowPassword(true)}/>
                                        )
                                    }
                                </div>
                                <FormMessage/>
                                <FormDescription>
                                    Use una contraseña de 10 o más caracteres con al menos 1 mayuscula, 1 número y 1 caracter especial.
                                    Recuerde que trabajará con datos sensibles y privados.
                                </FormDescription>
                        </FormItem>
                        )} name={'password'} control={registerForm.control}/>

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
                    )} name={'password_confirmation'} control={registerForm.control}/>

                    <div className="flex items-center justify-end mt-4 gap-x-4">
                        <NavLink href={route('login')}>Ya tienes usuario?</NavLink>

                        <Button type='submit' disabled={isProcessing || !registerForm.formState.isDirty}>
                            {
                                isProcessing && <Loader2 className={'mr-2 animate-spin'}/>
                            }
                            Registrar</Button>
                    </div>
                </form>
            </Form>
        </Surface>
    )
}

const registerSchema = z.object({
    code: z.string({required_error: 'Campo requerido'}).min(1, {message: 'Campo requerido'}).max(255, {message: 'Máximo 255'}),
    name: z.string({required_error: 'Campo requerido'}).min(1, {message: 'Campo requerido'}).max(255, {message: 'Máximo 255'}),
    email: z.string().min(1, {message: 'Campo requerido'}).max(255, {message: 'Máximo 255 caracteres'}).email({message: 'Correo Electrónico inválido'}).toLowerCase(),
    password: z.string().min(10, {message: 'Contraseña debe tener al menos 10 caracteres'}),
    password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
    message: 'Las contraseñas no son iguales',
    path: ['password_confirmation']
})

export default RegisterForm
