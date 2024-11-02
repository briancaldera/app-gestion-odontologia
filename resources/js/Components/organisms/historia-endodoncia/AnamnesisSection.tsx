import Title from "@/Components/atoms/Title";
import React from "react";
import AnamnesisForm from "@/Components/organisms/historia-endodoncia/partials/AnamnesisForm.tsx";

const AnamnesisSection = () => {
    return (
        <Surface className={'px-6'}>
            <Title level={'title-lg'}>Anamnesis</Title>

            <AnamnesisForm />
        </Surface>
    )
}

export default AnamnesisSection
