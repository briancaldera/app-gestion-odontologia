import TextInput from "@/Components/atoms/TextInput.jsx";
import {faker} from "@faker-js/faker";

export default {
    title: 'atoms/Text/TextInput',
    component: TextInput,
    args: {
        placeholder: faker.lorem.sentence()
    }
}

export const Default = {}

export const Filled = {
    args: {
        value: faker.lorem.sentence()
    }
}

export const Error = {
    args: {
        pattern: '',
        value: faker.lorem.sentence()
    }
}
