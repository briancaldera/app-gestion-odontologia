import AnalisisSlot from "../../resources/js/Components/organisms/AnalisisSlot"
import { faker} from '@faker-js/faker'

export default {
    title: 'organisms/CreateAnalisis',
    component: AnalisisSlot,
    decorators: [
        Story => (
            <div className={'bg-white p-6'}>
                <div className={'w-96 p-2 border-2 border-gray-200 rounded-lg'}>
                    <Story />
                </div>
            </div>
        )
    ]
}

export const Default = {

}

export const Filled = {
    args: {
        descripcion: faker.lorem.paragraphs(2),
        files: ['', '', '']
    }
}
