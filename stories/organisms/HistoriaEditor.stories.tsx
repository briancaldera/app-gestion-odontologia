import HistoriaEditor from '@/Components/organisms/HistoriaEditor'

export default {
    title: 'organisms/HistoriaEditor',
    component: HistoriaEditor,
    decorators: [
        (Story) => (
            <div className={'w-screen h-screen pe-5'}>
                <Story />
            </div>
        )
    ]
}

export const Default = {
}
