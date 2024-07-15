import Title from "@/Components/atoms/Title.jsx"
import {ExampleText} from "../Utils.js";

export default {
    title: "atoms/Text/Title",
    component: Title,
    args: {
        children: ExampleText
    }
}

export const lg = {
    args: {
        level: "title-lg"
    }
}

export const md = {
    args: {
        level: "title-md"
    }
}

export const sm = {
    args: {
        level: "title-sm"
    }
}
