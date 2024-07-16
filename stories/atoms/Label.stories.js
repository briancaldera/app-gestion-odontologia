import Label from "@/Components/atoms/Label.jsx";
import {fakerES_MX as faker} from "@faker-js/faker";

export default {
    title: "atoms/Text/Label",
    component: Label,
    args: {
        value: faker.lorem.words(2)
    }
}

export const Default = {}

