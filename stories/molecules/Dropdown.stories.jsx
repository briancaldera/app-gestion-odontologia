import Dropdown from "@/Components/molecules/Dropdown.jsx";
import {Button} from "@/Components/molecules/Button.jsx"

export default {
    title: "molecules/Dropdown",
    component: Dropdown.Container
}

export const Default = {
    args: {
        children: (
            <>
                <Dropdown.Trigger><Button label={"Show"}>Example</Button></Dropdown.Trigger>
            <Dropdown>
                <Dropdown.Option href={"#"}>Option 1</Dropdown.Option>
                <Dropdown.Option href={"#"}>Option 2</Dropdown.Option>
                <hr/>
                <Dropdown.Option href={"#"}>Option 3</Dropdown.Option>
            </Dropdown>
            </>
        )
    }
}
