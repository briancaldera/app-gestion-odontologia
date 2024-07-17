import InputField from "@/Components/molecules/InputField.jsx";
import {faker} from "@faker-js/faker";

export default {
    title: 'molecules/Input/InputField',
    component: InputField,
    args: {
        label: 'Descripción',
        placeholder: 'Requerido',

        validation: 'pattern="[A|V]"',
    }
}

export const Default = {}

export const Error = {
    args: {
        error: 'Error'
    }
}
