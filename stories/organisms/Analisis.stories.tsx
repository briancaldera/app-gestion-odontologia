import Analisis from "@/Components/organisms/Analisis"
import{faker} from '@faker-js/faker'

export default {
    title: 'organisms/Analisis',
    component: Analisis,
}

const analisis = {
    descripcion: faker.lorem.paragraphs(20),
    radiografias: [faker.image.urlLoremFlickr({category: 'cats'}), faker.image.urlLoremFlickr({category: 'cats', height: 800}), faker.image.urlLoremFlickr({category: 'cats'})]
}

export const Default = {
    args: {
        analisis: analisis
    }
}
