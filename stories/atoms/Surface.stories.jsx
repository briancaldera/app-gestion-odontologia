import Surface from "@/Components/atoms/Surface.jsx";
import {Text} from "@/Components/atoms/Text.jsx";
import Heading from "@/Components/atoms/Heading.jsx";

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

export const WithContent = {
    args: {
        children: <div className={"flex flex-col gap-2"}><Heading level={"h2"}>Example</Heading><Text level={"body-md"}>The quick brown fox jumps over the lazy dog</Text></div>
    }
}
