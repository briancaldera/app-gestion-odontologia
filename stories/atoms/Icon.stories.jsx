import {Icon} from "@/Components/atoms/Icon.tsx";
import {fn} from "@storybook/test"
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import React from "react";

export default {
    title: 'atoms/Icons/Icon',
    component: Icon,
    // tags: ['autodocs'],
}

export const Default = {
    args: {
        children: <AcademicCapIcon className="size-6 text-slate-400"/>,
    }
}

export const Clickable = {
    args: {
        onClick: fn()
    }
}
