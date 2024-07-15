import { fn } from '@storybook/test';
import { OutlinedButton } from '@/Components/molecules/OutlinedButton.jsx'

export default {
    title: 'molecules/Buttons/OutlinedButton',
    component: OutlinedButton,
    // tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: { label: 'Button', onClick: fn() },
};

export const Default = {
    args: {

    },
};

export const Disabled = {
    args: {
        disabled: true
    }
}

export const Loading = {
    args: {
        loading: true
    }
}
