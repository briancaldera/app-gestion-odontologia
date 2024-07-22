import GuestLayout from '@/Layouts/GuestLayout';
import BaseLayout from "@/Layouts/BaseLayout.jsx";
import RegisterForm from "@/Components/organisms/RegisterForm.jsx";

const Register = () => {

    return (
        <GuestLayout title={"Registrar"}>
            <RegisterForm />
        </GuestLayout>
    );
}


Register.layout = page => <BaseLayout children={page} />

export default Register
