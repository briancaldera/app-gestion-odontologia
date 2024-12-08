import React from "react";
import {Correccion} from "@/src/models/Historia.ts";

type UseCorrectionsReturn = {
    model?: CorrectionsModel | null
    handleSubmit: (values: {section: string, content: string}) => void
}

const useCorrections: (handleSubmit: (values: {section: string, content: string}) => void, model?: CorrectionsModel) => UseCorrectionsReturn = (handleSubmit, model) => {

    const [correctionsModel, setCorrectionsModel] = React.useState((() => model ?? null))

    return {
        handleSubmit: handleSubmit,
        model: correctionsModel
    }
}

type CorrectionsModel = {
    secciones: Record<string, Correccion[]>
}

type Comment = {
    id: string
    user_id: string
    content: string
    created_at: string
}

export {type CorrectionsModel, useCorrections, type UseCorrectionsReturn}
