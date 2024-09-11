import AuthLayout from "@/Layouts/AuthLayout.tsx";
import HistoriaEditor from "@/Components/organisms/HistoriaEditor";
import Historia from "@/src/models/Historia";

const Edit = ({historia}: {historia : Historia}) => {

    return (
        <AuthLayout title={'Historia'}>
            <div className={'p-6 h-full'}>
                <HistoriaEditor historia={historia} readMode={false}/>
            </div>
        </AuthLayout>
    )
}

export default Edit
