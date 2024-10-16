import React from "react";
import Historia from "@/src/models/Historia.ts";
import {Homework} from "@/src/models/Group.ts";
import {HistoriaEndodoncia} from "@/src/models/Endodoncia/HistoriaEndodoncia.ts";
import {toast} from "sonner";
import useInertiaSubmit from "@/src/inertia-wrapper/InertiaSubmit.ts";
import {useCorrections} from "@/src/corrections/corrections.ts";

const HistoriaEndodonciaEditorContext = React.createContext({})

type HistoriaEndodonciaEditorProps = {
    historia: HistoriaEndodoncia
    readMode: boolean
    homework?: Homework
    canCreateCorrections: boolean
}

const HistoriaEndodonciaEditor = ({historia, homework, readMode, canCreateCorrections}: HistoriaEndodonciaEditorProps) => {

    const [showSidebar, setShowSidebar] = React.useState<boolean>(false)

    const corrections = homework?.documents.find((document) => document.id === historia?.id).corrections

    const {isProcessing, router} = useInertiaSubmit()

    const handleSubmitCorrections = (values: {section: string, content: string}) => {
        const endpoint = route('groups.assignments.homeworks.corrections', {
            group:homework?.assignment?.group_id,
            assignment: homework?.assignment_id,
            homework: homework?.id,
        })

        const data = {
            document_id: historia?.id,
            type: 'HE',
            section: values.section,
            content: values.content,
        }

        router.post(endpoint, data, {
            onError: errors => {
                toast.error('No se pudo agregar las correcciones')
            },
            onSuccess: page => {
                toast.success('Correcciones agregadas')
            }
        })
    }

    const correctionsModel = useCorrections(handleSubmitCorrections, corrections)

    return (
        <HistoriaEndodonciaEditorContext.Provider value={{}}>
            <div>

            </div>
        </HistoriaEndodonciaEditorContext.Provider>
    )
}

export {HistoriaEndodonciaEditor, HistoriaEndodonciaEditorContext}
