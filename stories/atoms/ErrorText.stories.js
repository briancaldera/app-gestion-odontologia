import ErrorText from "@/Components/atoms/ErrorText.jsx";
import {ExampleErrorText} from "../Utils.js";
import {fakerES_MX as faker} from "@faker-js/faker";

export default {
    title: 'atoms/Text/ErrorText',
    component: ErrorText,
    args: {
        message: faker.lorem.sentence(10)
    }
}

export const Default = {

}
