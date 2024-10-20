import GuestLayout from '@/Layouts/GuestLayout.tsx';
import RegisterForm from "@/Components/organisms/RegisterForm.js";

const Register = () => {

    return (
        <GuestLayout title={"Registrar"}>
            <RegisterForm/>
        </GuestLayout>
    );
}

export default Register
