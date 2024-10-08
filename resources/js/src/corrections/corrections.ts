import {faker} from "@faker-js/faker";


const useCorrections = (correctionsModel) => {

}

type CorrectionsModel = {
    messages: Messages
}

type Messages = Record<string, string>

const exampleMessage: CorrectionsModel = {
    messages: {
        trastornos: faker.lorem.paragraphs(3)
    }
}

export {exampleMessage, type CorrectionsModel}
