import {Icon} from "@/Components/atoms/Icon.jsx";
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
