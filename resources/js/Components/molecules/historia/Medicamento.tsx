import Checkbox from "@/Components/atoms/Checkbox";
import {Text} from "@/Components/atoms/Text";
import Input from "@/Components/atoms/Input";
import Label from "@/Components/atoms/Label";

type MedicamentoProps = {
    medicamento: string,
    positivo: boolean,
    dosis: number | null,
    onCheckChange: (value: boolean) => void,
    onDosisChange: (e) => void,
}

const Medicamento = ({medicamento, positivo, dosis, onPositivoChange = () => {}, onDosisChange = () => {}}: MedicamentoProps) => {
    return (
        <div className={'flex gap-4 items-center'}>
            <Checkbox checked={positivo} onChange={onPositivoChange}/>
            <Text level={'body-sx'}>{medicamento}</Text>
            <div className={'flex items-top gap-1'}>
                <div className={'w-20'}>
                    <Input disabled={!positivo} value={dosis?.toString()} onChange={onDosisChange} type={'number'} className={'text-xl'}/>
                </div>
                <Label className={'font-light text-xs text-neutral-500 text-muted'}>mg</Label>
            </div>
        </div>
    )
}

export default Medicamento
