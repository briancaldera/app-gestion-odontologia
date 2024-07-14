import { fn } from '@storybook/test';
import { OutlinedButton } from '@/Components/molecules/OutlinedButton.jsx'

export default {
    title: 'molecules/Buttons/OutlinedButton',
    component: OutlinedButton,
    parameters: {
        layout: 'centered',
    },
    // tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: { onClick: fn() },
};

export const Default = {
    args: {
        label: 'Button',
    },
};
