import {Text} from "@/Components/atoms/Text.jsx";
import {ExampleText} from "../Utils.js";

export default {
    title: 'atoms/Text/Text',
    component: Text,
    parameters: {
        layout: 'centered',
    },
    // tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: { children: ExampleText },
}

export const lg = {
    args: {
        level: "body-lg"
    }
}

export const md = {
    args: {
        level: "body-md"
    }
}

export const sm = {
    args: {
        level: "body-sm"
    }
}

export const xs = {
    args: {
        level: "body-xs"
    }
}
