import {Avatar, AvatarFallback, AvatarImage} from "@/shadcn/ui/avatar.tsx";
import Title from "@/Components/atoms/Title";
import {Text} from "@/Components/atoms/Text";
import {Skeleton} from "@/shadcn/ui/skeleton.tsx";
import React from "react";
import {useProfile} from "@/src/Utils/Utils.ts";

type ProfileItemProps = {
    id: string
}

const ProfileItem = ({id}: ProfileItemProps) => {

    const profile = useProfile(id)

    if (profile) {
        return (
            <div className={'flex gap-x-2 items-center'}>
                <Avatar>
                    <AvatarImage src={profile?.picture_url}/>
                    <AvatarFallback>{`${profile.nombres[0]}${profile.apellidos[0]}`}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col flex-1'>
                    <Title level='title-sm'>{`${profile.nombres} ${profile.apellidos}`}</Title>
                    <Text level='body-xs'>{`@${profile.user?.name}`}</Text>
                </div>
            </div>
        )
    } else {
        return (
            <div className={'flex gap-x-2 items-center'}>
                <Skeleton className='rounded-full size-12'/>
                <div className='flex flex-col flex-1 gap-y-2'>
                    <Skeleton className='h-[18pt]'/>
                    <Skeleton className='h-[18pt]'/>
                </div>
            </div>
        )
    }
}

export default ProfileItem
