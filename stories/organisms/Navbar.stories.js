import Navbar from "@/Components/organisms/Navbar.jsx"
import {faker} from "@faker-js/faker";

export default {
    title: 'organisms/Navbar',
    component: Navbar
}

export const Default = {

}

export const Authenticated = {
    args: {
        user: {username: "Username1", name: faker.person.firstName()}
    }
}
