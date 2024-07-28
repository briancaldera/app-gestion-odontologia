import {Icon} from "@/Components/atoms/Icon.jsx";
import {DocumentIcon} from "@heroicons/react/24/outline/index.js";
import React from "react";

const AuthSidebar = ({children}) => {
    return (
        <div className={'grid grid-cols-2 gap-2 p-6 justify-items-center'}>
            <div className={'aspect-square border-2 rounded-3xl border-dashed border-gray-300 p-10'}>
                <Icon><DocumentIcon/></Icon>
            </div>
            <div className={'aspect-square border-2 rounded-3xl border-dashed border-gray-300 p-10'}>
                <Icon><DocumentIcon/></Icon>
            </div>
            <div className={'aspect-square border-2 rounded-3xl border-dashed border-gray-300 p-10'}>
                <Icon><DocumentIcon/></Icon>
            </div>
            <div className={'aspect-square border-2 rounded-3xl border-dashed border-gray-300 p-10'}>
                <Icon><DocumentIcon/></Icon>
            </div>
        </div>
    )
}

export default AuthSidebar
