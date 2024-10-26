import {z} from "zod"
import {UseFormReturn} from 'react-hook-form'
import HistoriaOdontologicaSchema from '@/FormSchema/Historia/HistoriaOdontologicaSchema'
import Surface from "@/Components/atoms/Surface";
import Title from "@/Components/atoms/Title";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import {Textarea} from '@/shadcn/ui/textarea'
import {Checkbox} from "@/shadcn/ui/checkbox"
import EstudioModelosSchema, {EstudioModelosDefaults} from "@/FormSchema/Historia/EstudioModelosSchema";
import {Button} from "@/shadcn/ui/button";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit";
import {useRoute} from "ziggy-js";
import {mapServerErrorsToFields} from "@/src/Utils/Utils.ts";
import MaxSupInfOclu from "@/Components/organisms/historia/partials/MaxSupInfOclu.tsx";
import EstudioModelosParte2 from "@/Components/organisms/historia/partials/EstudioModelosParte2.tsx";


type EstudioModelosSectionProps = {
    form: UseFormReturn<z.infer<typeof EstudioModelosSchema>>
}

const EstudioModelosSection = ({form}: EstudioModelosSectionProps) => {

    const {isProcessing, router}: ReturnType<typeof useInertiaSubmit> = useInertiaSubmit()
    const route = useRoute()

    const onHandleSubmit = (values) => {

        const endpoint: string = route('historias.odontologica.modelos.update', {
            historia: values.historia_id
        })

        router.patch(endpoint, values, {
            preserveScroll: true,
            onError: errors => mapServerErrorsToFields(form, errors),
            onSuccess: _page => {
                form.reset(values)
            }
        })
    }

    return (
        <Surface className={'w-full px-6 min-h-screen'}>
            <Title level={'title-lg'}>Estudio de Modelos</Title>

            <MaxSupInfOclu/>

            <EstudioModelosParte2/>
        </Surface>
    )
}

export default EstudioModelosSection
