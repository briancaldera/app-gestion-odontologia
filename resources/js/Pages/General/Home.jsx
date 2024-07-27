import BaseLayout from "@/Layouts/BaseLayout.jsx";
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
