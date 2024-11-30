import {DentalPiece, Surface} from "@/src/models/DentalPiece.ts";
import Tooth from "./Tooth.tsx";

type TeethGroupProps = {
    teeth: DentalPiece[]
    onClickSurface?: (id: string, surface: Surface, mark: boolean) => void
    onDiscardPiece?: (id: string) => void
}

const TeethGroup = ({teeth, onClickSurface = () => {}, onDiscardPiece = () => {}}: TeethGroupProps) => {

    return (
        <div className={'lg:p-0.5 w-full flex lg:gap-1 border'}>
            {
                teeth.map(tooth => <Tooth key={tooth.id} piece={tooth} onClickSurface={(surface, mark) => {
                    onClickSurface(tooth.id, surface, mark)
                }} onDiscardPiece={onDiscardPiece}/>)
            }
        </div>
    )
}

export default TeethGroup
