import BaseLayout from "@/Layouts/BaseLayout.tsx";
import Navbar from "@/Components/organisms/Navbar.jsx";

const Home = ({auth}) => {
    return (
        <div>
            <Navbar user={auth.user}></Navbar>
        </div>
    )
}

Home.layout = page => <BaseLayout children={page}/>

export default Home
