import {HoverCard, HoverCardContent, HoverCardTrigger,} from "@/shadcn/ui/hover-card"
import {CorrectionsModel} from "@/src/corrections/corrections.ts";
import {TriangleAlert} from "lucide-react";
import React from "react";

type CorrectionsBlockProps = {
    model: CorrectionsModel
    name: string
}

const CorrectionsBlock = ({model, name, children}: CorrectionsBlockProps) => {
    const message = model.messages[name]

    const hasCorrections: boolean = !!message

    const [showCorrections, setShowCorrections] = React.useState(false)

    const handleToggleCorrections = () => {
        setShowCorrections(value => !value)
    }

    return (
        <HoverCard open={showCorrections && hasCorrections}>
            <HoverCardTrigger asChild>
                <div className={'relative inline'}>
                    {
                        hasCorrections && (
                            <div className={'absolute top-0 right-0'}>
                                <TriangleAlert onClick={handleToggleCorrections} className={'text-rose-500'}/>
                            </div>
                        )
                    }
                    {children}
                </div>
            </HoverCardTrigger>
            <HoverCardContent className={'min-w-[40vw]'}>
                <div>
                    {message}
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default CorrectionsBlock
