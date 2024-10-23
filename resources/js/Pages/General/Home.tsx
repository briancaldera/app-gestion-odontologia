import Navbar from "@/Components/organisms/Navbar.js";

const Home = ({auth}) => {
    return (
        <div>
            <Navbar user={auth.user}></Navbar>
        </div>
    )
}

export default Home
