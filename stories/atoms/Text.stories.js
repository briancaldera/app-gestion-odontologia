import { fn } from '@storybook/test'
import {Text} from "@/Components/atoms/Text.jsx";

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
    args: { onClick: fn() },
}

export const Normal = {
    args: {
        text: "The quick brown fox jumps over the lazy dog"
    }
}
