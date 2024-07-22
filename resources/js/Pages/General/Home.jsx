import BaseLayout from "@/Layouts/BaseLayout.jsx";
import Navbar from "@/Components/organisms/Navbar.jsx";
import AuthLayout from "@/Layouts/AuthLayout.jsx";

const Home = ({auth}) => {
    return (
        <AuthLayout navbar={<Navbar user={auth.user}/>}>

        </AuthLayout>
    )
}

Home.layout = page => <BaseLayout children={page}/>

export default Home
