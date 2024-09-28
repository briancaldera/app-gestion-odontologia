import {useRoute} from "ziggy-js";
import {Link} from "@inertiajs/react";
import {Icon} from "@/Components/atoms/Icon.tsx";
import Title from "@/Components/atoms/Title";
import React from "react";

type SidebarProps = {
    readonly menu: MenuItem[]
}

const SidebarMenu = ({menu}: SidebarProps) => {

    const route = useRoute()

    return (
        <div className={'h-full lg:p-6 flex lg:flex-col gap-1 justify-center lg:justify-start'}>
            {menu.map((menuItem, index) =>
                <Link
                    className={`flex-initial flex items-center gap-2 rounded-lg p-2 cursor-pointer hover:bg-white/10 ${(route().current() === menuItem.link) ? 'bg-white/10' : ''}`}
                    href={route(menuItem.link)} key={index}
                    onClick={() => {
                    }}>
                    <Icon className={'size-8 text-white'}>
                        {menuItem.icon}
                    </Icon>
                    <Title className={'max-lg:hidden text-white'} level={'title-md'}>{menuItem.name}</Title>
                </Link>
            )}
        </div>
    )
}

type MenuItem = Readonly<{
    name: string,
    icon: React.ReactElement,
    link: string
}>

export default SidebarMenu
export {type MenuItem}
