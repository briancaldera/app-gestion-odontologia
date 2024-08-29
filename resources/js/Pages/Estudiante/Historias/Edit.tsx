import AuthLayout from "@/Layouts/AuthLayout";
import HistoriaEditor from "@/Components/organisms/HistoriaEditor";
import Historia from "@/src/models/Historia";

const Edit = ({historia}: {historia? : Historia}) => {

    return (
        <AuthLayout title={'Historia'}>
            <div className={'p-6'}>
                <HistoriaEditor historia={historia}/>
            </div>
        </AuthLayout>
    )
}

export default Edit
