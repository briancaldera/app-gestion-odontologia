import GuestLayout from "@/Layouts/GuestLayout.js";
import Surface from "@/Components/atoms/Surface.jsx";
import Heading from "@/Components/atoms/Heading.jsx";
import React from "react";
import {Text} from "@/Components/atoms/Text.jsx";
import Loader from "@/Components/atoms/Loader.tsx";
import {z} from 'zod'
import {useForm, UseFormReturn} from "react-hook-form";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form.tsx";
import {Input} from "@/shadcn/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/ui/select.tsx";
import {Button} from "@/shadcn/ui/button.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/shadcn/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon, LogOut} from "lucide-react";
import {Calendar} from "@/shadcn/ui/calendar.tsx";
import {route} from "ziggy-js";
import {Link} from "@inertiajs/react";
import ProfilePicturePicker from "@/Components/molecules/ProfilePicturePicker.tsx";
import {toast} from "sonner";
import {formatTelephone, mapServerErrorsToFields} from "@/src/Utils/Utils.ts";

const CreateProfile = () => {

    const {isProcessing, router} = useInertiaSubmit()

    const isDisabled: boolean = isProcessing

    const section1Form = useForm<z.infer<typeof section1Schema>>({
        resolver: zodResolver(section1Schema),
        defaultValues: {
            apellidos: "",
            direccion: '',
            fecha_nacimiento: null,
            nombres: "",
            sexo: "",
            telefono: '',
            cedula: {
                cedula_letra: "",
                cedula_numero: "",
            },
        },
        disabled: isDisabled
    })

    const formState = React.useRef<{
        section1: z.infer<typeof section1Schema> | null
        section2: z.infer<typeof section2Schema> | null
    }>({
        section1: null,
        section2: null
    })

    const section2Form = useForm<z.infer<typeof section2Schema>>({
        resolver: zodResolver(section2Schema),
        defaultValues: {
            picture: null
        },
        disabled: isDisabled
    })

    const [section, setSection] = React.useState<'1' | '2'>('1')

    const loader = (
        <div className={"size-96 flex justify-center items-center"}>
            <Loader/>
        </div>
    )

    const onSubmitSection1 = (values: z.infer<typeof section1Schema>) => {
        formState.current.section1 = values
        setSection('2')
    }

    const onSubmitSection2 = (values: z.infer<typeof section2Schema>) => {

        formState.current.section2 = values
        const endpoint = route('profile.store')


        const body = {
            ...formState.current.section1,
            ...formState.current.section2,
        }

        router.post(endpoint, body, {
            onError: errors => {
                toast('Hubieron errores en la información enviada. Por favor, revisa los campos y reenvia nuevamente')
                if (!errors.picture) {
                    setSection('1')
                }
                mapServerErrorsToFields(section1Form, errors)
                mapServerErrorsToFields(section2Form, errors)
            }
        })
    }

    return (
        <GuestLayout title={"Crear perfil"}>
            <Button className={'fixed top-2 right-2'} variant='ghost' asChild>
                <Link href={route('logout')} as='button' method='post'>
                    Cerrar sesión<LogOut className={'ml-2 size-4'}/>
                </Link>
            </Button>
            <div className={'relative flex justify-center items-center'}>
                <Surface className={"mt-6 px-6 py-4 min-w-96 max-w-xl"}>
                    {
                        section === '1' ? (
                            <Section1 form={section1Form} onSubmitHandler={onSubmitSection1}/>
                        ) : (
                            <Section2 form={section2Form} onSubmitHandler={onSubmitSection2} previous={() => {setSection('1')}}/>
                        )
                    }
                </Surface>
            </div>
        </GuestLayout>
    )
}

const MAX_PICTURE_SIZE: number = 2 * 1000 * 1000 // 2 MB
const MIN_PICTURE_SIZE: number = 5 * 1000 // 5 KB
const ACCEPTED_PICTURE_MIME: readonly string[] = ['image/jpeg', 'image/jpg', 'image/png']

const section1Schema = z.object({
    nombres: z.string().min(1, {message: 'Campo requerido'}).max(100, {message: 'Máximo 100 caracteres'}),
    apellidos: z.string().min(1, {message: 'Campo requerido'}).max(100, {message: 'Máximo 100 caracteres'}),
    fecha_nacimiento: z.date().max(new Date()),
    telefono: z.string().regex(/^\d{4}-\d{7}$|^$/).optional(),
    direccion: z.string().max(255, {message: 'Máximo 255 caracteres'}).optional(),
    sexo: z.enum(['F', 'M', 'NI']),
    cedula: z.object({
        cedula_letra: z.enum(['V', 'E']),
        cedula_numero: z.string().min(3).max(9).refine(value => typeof parseInt(value) === 'number'),
    }).transform((values) => {
        const {cedula_letra, cedula_numero} = values

        return `${cedula_letra}${cedula_numero}`
    }),
})

const section2Schema = z.object({
    picture: z.any()
        .refine((file: File | null) => file === null || ACCEPTED_PICTURE_MIME.includes(file.type), {message: 'Archivo inválido. Formatos permitidos: .jpg .jpeg .png'})
        .refine((file: File | null) => file === null || file.size >= MIN_PICTURE_SIZE, {message: 'Archivo muy pequeño'})
        .refine((file: File | null) => file === null || file?.size <= MAX_PICTURE_SIZE, {message: 'Archivo muy grande'})
        .nullish(),
})

const Section1 = ({form, onSubmitHandler = () => {}}: {
    form: UseFormReturn<z.infer<typeof section1Schema>>,
    onSubmitHandler?: (values: z.infer<typeof section1Schema>) => void
}) => {

    return (
        <section className={''}>
            <header>
                <Heading level={"h6"}>Crear perfil</Heading>
                <Text>Procedamos a crear su perfil de usuario</Text>
            </header>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitHandler)} className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>Nombres</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'nombres'} control={form.control}/>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>Apellidos</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'apellidos'} control={form.control}/>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                                <Input name={field.name} value={field.value} disabled={field.disabled} ref={field.ref} onBlur={field.onBlur} onChange={({target: {value}}) => field.onChange(formatTelephone(value))} autoComplete='tel' type='tel'/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'telefono'} control={form.control}/>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>Dirección</FormLabel>
                            <FormControl>
                                <Input {...field} autoComplete='street-address'/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'direccion'} control={form.control}/>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>Sexo</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={field.disabled}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={'Seleccione una opción...'}/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={'F'}>Femenino</SelectItem>
                                    <SelectItem value={'M'}>Masculino</SelectItem>
                                    <SelectItem value={'NI'}>Prefiere no indicar</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )} name={'sexo'} control={form.control}/>

                    <FormField
                        control={form.control}
                        name={'fecha_nacimiento'}
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className={'mb-2.5'}>Fecha de nacimiento</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild disabled={field.disabled}>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Selecciona una fecha</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            fromYear={1900}
                                            toYear={2100}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                            classNames={{
                                                day_hidden: "invisible",
                                                dropdown: "rounded-md bg-popover text-popover-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                                                caption_dropdowns: "flex gap-4",
                                                vhidden: "hidden",
                                                caption_label: "hidden",
                                            }}
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                                <FormDescription>
                                </FormDescription>
                            </FormItem>
                        )}
                    />


                    <FormField render={({field}) => (
                        <FormItem>

                            <div className={'flex gap-x-2'}>


                                <FormField render={({field}) => (
                                    <FormItem className={'basis-2/6'}>
                                        <FormLabel>Cédula</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}
                                                disabled={field.disabled}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={'-'}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={'V'}>V</SelectItem>
                                                <SelectItem value={'E'}>E</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'cedula.cedula_letra'} control={form.control}/>

                                <FormField render={({field}) => (
                                    <FormItem className={'basis-full'}>
                                        <FormLabel>Numero</FormLabel>
                                        <FormControl>
                                            <Input {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} name={'cedula.cedula_numero'} control={form.control}/>
                            </div>
                            <FormMessage/>

                        </FormItem>
                    )} name={'cedula'} control={form.control}/>


                    <div className={'flex justify-end mt-2'}>
                        <Button type='submit'>Siguiente</Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}

const Section2 = ({form, previous, onSubmitHandler}: {
    form: UseFormReturn<z.infer<typeof section2Schema>>,
    previous: () => void,
    onSubmitHandler: (values: z.infer<typeof section2Schema>) => void
}) => {

    const handlePictureDrop = ([file]) => {
        file.preview = URL.createObjectURL(file)

        form.setValue('picture', file, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
    }

    return (
        <section className={''}>
            <header>
                <Heading level={"h6"}>Crear perfil</Heading>
                <Text>Elige una foto (Opcional)</Text>
            </header>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitHandler)} className={'flex flex-col items-center'}>

                    <FormField render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <ProfilePicturePicker src={field.value} onDrop={handlePictureDrop}
                                                      className={'size-48'}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={'picture'} control={form.control}/>

                    <Button type='button' variant='ghost' onClick={() => {
                        form.resetField('picture')
                    }}>Descartar</Button>

                    <div className={'flex justify-end mt-2 gap-x-3'}>
                        <Button type='button' variant='ghost' onClick={previous}>Volver</Button>
                        <Button type='submit'>Crear perfil</Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default CreateProfile
