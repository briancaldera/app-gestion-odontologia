import React from "react";
import Surface from "@/Components/atoms/Surface";
import HabitosForm from "@/Components/organisms/historia-cirugia/partials/HabitosForm.tsx";
import FemeninoForm from "@/Components/organisms/historia-cirugia/partials/FemeninoForm.tsx";

const Section2 = () => {

    return (
        <Surface className={'px-6'}>
            <HabitosForm/>
            <FemeninoForm/>
        </Surface>
    )
}

export default Section2
