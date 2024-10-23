import AuthLayout from "@/Layouts/AuthLayout.tsx";
import {HistoriaEndodoncia} from "@/src/models/Endodoncia/HistoriaEndodoncia.ts";

type EditProps = {
    historia: HistoriaEndodoncia
}

const Edit = ({historia}: EditProps) => {
    console.log(historia)
    return (
        <AuthLayout title={'Historia Endodoncia'}>
            Editar
        </AuthLayout>
    )
}

export default Edit
