import Avatar from '@/Components/atoms/Avatar.jsx'
import {faker} from "@faker-js/faker";

export default {
    title: "atoms/Avatar",
    component: Avatar,
    args: {
        picture: faker.image.avatar()
    }
}

export const Picture = {
    args: {
        picture: faker.image.avatar()
    }
}

export const Placeholder = {
    args: {
        picture: null
    }
}
