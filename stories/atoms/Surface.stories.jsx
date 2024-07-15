import Surface from "@/Components/atoms/Surface.jsx";
import {Text} from "@/Components/atoms/Text.jsx";

export default {
    title: "atoms/Surface",
    component: Surface,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        children: <Text>The quick brown fox jumps over the lazy dog</Text>,
    },
}

export const Default = {}
