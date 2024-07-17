import NavLink from "@/Components/atoms/NavLink.jsx";
import {fn} from "@storybook/test"

export default {
    title: 'atoms/NavLink',
    component: NavLink
}

export const Default = {
    args: {
        children: 'Home',
        href: "#"
    }
}

export const Active = {
    args: {
        children: 'Active',
        href: "#",
        active: true
    }
}
