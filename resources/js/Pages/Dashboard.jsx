import BaseLayout from "@/Layouts/BaseLayout.jsx";
import AuthLayout from "@/Layouts/AuthLayout.jsx";
import AuthNavbar from "@/Components/organisms/AuthNavbar.jsx";
import Surface from "@/Components/atoms/Surface.jsx";
import {Text} from "@/Components/atoms/Text.jsx";

const Dashboard = ({auth}) => {

    const navbar = <AuthNavbar auth={auth}/>

    return (
        <AuthLayout title={'Resumen'} navbar={navbar}>

            <div className={"p-6"}>


            </div>
        </AuthLayout>
    );
}

Dashboard.layout = page => <BaseLayout children={page}/>

export default Dashboard
