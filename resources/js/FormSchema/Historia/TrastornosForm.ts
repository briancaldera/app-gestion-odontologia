import {z} from 'zod'

const MAX_TEXT_SIZE = 1000

const tCardiovasculares: readonly string[] = ['disnea', 'cansancio', 'vertigo', 'palpitaciones', 'taquicardia', 'bradicardia', 'varices', 'infarto_miocardio', 'angina_pecho', 'hipertension', 'endocarditis', 'otros']
const tHematologicos: readonly string[] = ['palidez', 'ictericia', 'anemia', 'hemorragias', 'hematoma', 'equimosis', 'petequias', 'dengue', 'hemofilia', 'otros']
const tRespiratorios: readonly string[] = ['ciaonosis', 'hemoptisis', 'esputos', 'enfisema_pulmonar', 'asma', 'asfixia', 'tos_frecuente', 'rinitis', 'sonido_anormal', 'inf_respiratorias', 'otros']
const tEndocrinos: readonly string[] = ['poliuria', 'polidipsia', 'polifagia', 'variacion_peso', 'irritabilidad', 'sudoracion_excesiva', 'diabetes', 'intolerancia_frio', 'hipoglicemia', 'hipertiroidismo', 'adenopatia', 'hipotiroidismo', 'otros']
const tGastrointestinales: readonly string[] = ['diarrea', 'flatulencia', 'acidez', 'nauseas', 'vomitos', 'ulceras', 'dolor_estomacal', 'gastritis', 'parasitos', 'reflujo_gastrico', 'gastroenteritis', 'colon_irritable', 'cirrosis_hepatica', 'estrenimiento', 'otros']
const tNeurologicos: readonly string[] = ['convulsiones', 'temblor', 'tic', 'epilepsia', 'cefalea', 'depresion', 'dislexia', 'parkinson', 'alzheimer', 'ecv', 'bulimia', 'anorexia', 'sindrome_down', 'retardo_mental', 'otros']
const tOseos: readonly string[] = ['deformidades', 'fracturas', 'escleroticas_azules', 'artritis', 'dificultad_movimiento', 'osteoporosis', 'osteomelitis', 'otros']
const tGinecologicos: readonly string[] = ['embarazo', 'menstruacion', 'abortos', 'menopausia', 'otros']
const tUrologicos: readonly string[] = ['insuficiencia_renal', 'colico_nefritico', 'cancer_prostata', 'andropausia', 'otros']
const tInfectocontagiosa: readonly string[] = ['parotiditis', 'tuberculosis', 'vih_sida', 'blenorragia', 'sifilis', 'herpes', 'hepatitis_abc', 'influenza', 'vhp', 'rubeola', 'varicela', 'sarampion', 'covid', 'otros']


const toTrastornoObject = (trastorno: string) => {
    return {[trastorno]: z.boolean()}
}

const trastornoObject = z.boolean()
const otrosTrastornosObject = z.string().max(MAX_TEXT_SIZE)

const tCardiovascularesObject = z.object({
    disnea: trastornoObject,
    cansancio: trastornoObject,
    vertigo: trastornoObject,
    palpitaciones: trastornoObject,
    taquicardia: trastornoObject,
    bradicardia: trastornoObject,
    varices: trastornoObject,
    infarto_miocardio: trastornoObject,
    angina_pecho: trastornoObject,
    hipertension: trastornoObject,
    endocarditis: trastornoObject,
    otros: otrosTrastornosObject,
})

const tHematologicosObject = z.object({
    palidez: trastornoObject,
    ictericia: trastornoObject,
    anemia: trastornoObject,
    hemorragias: trastornoObject,
    hematoma: trastornoObject,
    equimosis: trastornoObject,
    petequias: trastornoObject,
    dengue: trastornoObject,
    hemofilia: trastornoObject,
    otros: otrosTrastornosObject,
})

const tRespiratoriosObject = z.object({
    ciaonosis: trastornoObject,
    hemoptisis: trastornoObject,
    esputos: trastornoObject,
    enfisema_pulmonar: trastornoObject,
    asma: trastornoObject,
    asfixia: trastornoObject,
    tos_frecuente: trastornoObject,
    rinitis: trastornoObject,
    sonido_anormal: trastornoObject,
    inf_respiratorias: trastornoObject,
    otros: otrosTrastornosObject,
})

const tEndocrinosObject = z.object({
    poliuria: trastornoObject,
    polidipsia: trastornoObject,
    polifagia: trastornoObject,
    variacion_peso: trastornoObject,
    irritabilidad: trastornoObject,
    sudoracion_excesiva: trastornoObject,
    diabetes: trastornoObject,
    intolerancia_frio: trastornoObject,
    hipoglicemia: trastornoObject,
    hipertiroidismo: trastornoObject,
    adenopatia: trastornoObject,
    hipotiroidismo: trastornoObject,
    otros: otrosTrastornosObject,
})

const tGastrointestinalesObject = z.object({
    diarrea: trastornoObject,
    flatulencia: trastornoObject,
    acidez: trastornoObject,
    nauseas: trastornoObject,
    vomitos: trastornoObject,
    ulceras: trastornoObject,
    dolor_estomacal: trastornoObject,
    gastritis: trastornoObject,
    parasitos: trastornoObject,
    reflujo_gastrico: trastornoObject,
    gastroenteritis: trastornoObject,
    colon_irritable: trastornoObject,
    cirrosis_hepatica: trastornoObject,
    estrenimiento: trastornoObject,
    otros: otrosTrastornosObject,
})

const tNeurologicosObject = z.object({
    convulsiones: trastornoObject,
    temblor: trastornoObject,
    tic: trastornoObject,
    epilepsia: trastornoObject,
    cefalea: trastornoObject,
    depresion: trastornoObject,
    dislexia: trastornoObject,
    parkinson: trastornoObject,
    alzheimer: trastornoObject,
    ecv: trastornoObject,
    bulimia: trastornoObject,
    anorexia: trastornoObject,
    sindrome_down: trastornoObject,
    retardo_mental: trastornoObject,
    otros: otrosTrastornosObject,
})

const tOseosObject = z.object({
    deformidades: trastornoObject,
    fracturas: trastornoObject,
    escleroticas_azules: trastornoObject,
    artritis: trastornoObject,
    dificultad_movimiento: trastornoObject,
    osteoporosis: trastornoObject,
    osteomelitis: trastornoObject,
    otros: otrosTrastornosObject,
})
const tGinecologicosObject = z.object({
    embarazo: trastornoObject,
    menstruacion: trastornoObject,
    abortos: trastornoObject,
    menopausia: trastornoObject,
    otros: otrosTrastornosObject,
})
const tUrologicosObject = z.object({
    insuficiencia_renal: trastornoObject,
    colico_nefritico: trastornoObject,
    cancer_prostata: trastornoObject,
    andropausia: trastornoObject,
    otros: otrosTrastornosObject,
})
const tInfectocontagiosaObject = z.object({
    parotiditis: trastornoObject,
    tuberculosis: trastornoObject,
    vih_sida: trastornoObject,
    blenorragia: trastornoObject,
    sifilis: trastornoObject,
    herpes: trastornoObject,
    hepatitis_abc: trastornoObject,
    influenza: trastornoObject,
    vhp: trastornoObject,
    rubeola: trastornoObject,
    varicela: trastornoObject,
    sarampion: trastornoObject,
    covid: trastornoObject,
    otros: otrosTrastornosObject,
})

const TrastornosFormSchema = z.object({
    historia_id: z.string().nullish(),
    cardiovasculares: tCardiovascularesObject,
    hematologicos: tHematologicosObject,
    respiratorios: tRespiratoriosObject,
    endocrinos: tEndocrinosObject,
    gastrointestinales: tGastrointestinalesObject,
    neurologicos: tNeurologicosObject,
    oseos: tOseosObject,
    ginecologicos: tGinecologicosObject,
    urologicos: tUrologicosObject,
    infectocontagiosa: tInfectocontagiosaObject,
})

export const Trastornos: z.infer<typeof TrastornosFormSchema> = {
    historia_id: null,
    cardiovasculares: {
        angina_pecho: false,
        bradicardia: false,
        cansancio: false,
        disnea: false,
        endocarditis: false,
        hipertension: false,
        infarto_miocardio: false,
        otros: "",
        palpitaciones: false,
        taquicardia: false,
        varices: false,
        vertigo: false
    }, endocrinos: {
        adenopatia: false,
        diabetes: false,
        hipertiroidismo: false,
        hipoglicemia: false,
        hipotiroidismo: false,
        intolerancia_frio: false,
        irritabilidad: false,
        otros: "",
        polidipsia: false,
        polifagia: false,
        poliuria: false,
        sudoracion_excesiva: false,
        variacion_peso: false
    }, gastrointestinales: {
        acidez: false,
        cirrosis_hepatica: false,
        colon_irritable: false,
        diarrea: false,
        dolor_estomacal: false,
        estrenimiento: false,
        flatulencia: false,
        gastritis: false,
        gastroenteritis: false,
        nauseas: false,
        otros: "",
        parasitos: false,
        reflujo_gastrico: false,
        ulceras: false,
        vomitos: false

    }, ginecologicos: {
        abortos: false,
        embarazo: false,
        menopausia: false,
        menstruacion: false,
        otros: ""

    }, hematologicos: {
        anemia: false,
        dengue: false,
        equimosis: false,
        hematoma: false,
        hemofilia: false,
        hemorragias: false,
        ictericia: false,
        otros: "",
        palidez: false,
        petequias: false

    }, infectocontagiosa: {
        blenorragia: false,
        covid: false,
        hepatitis_abc: false,
        herpes: false,
        influenza: false,
        otros: "",
        parotiditis: false,
        rubeola: false,
        sarampion: false,
        sifilis: false,
        tuberculosis: false,
        varicela: false,
        vhp: false,
        vih_sida: false

    }, neurologicos: {
        alzheimer: false,
        anorexia: false,
        bulimia: false,
        cefalea: false,
        convulsiones: false,
        depresion: false,
        dislexia: false,
        ecv: false,
        epilepsia: false,
        otros: "",
        parkinson: false,
        retardo_mental: false,
        sindrome_down: false,
        temblor: false,
        tic: false

    }, oseos: {
        artritis: false,
        deformidades: false,
        dificultad_movimiento: false,
        escleroticas_azules: false,
        fracturas: false,
        osteomelitis: false,
        osteoporosis: false,
        otros: ""

    }, respiratorios: {
        asfixia: false,
        asma: false,
        ciaonosis: false,
        enfisema_pulmonar: false,
        esputos: false,
        hemoptisis: false,
        inf_respiratorias: false,
        otros: "",
        rinitis: false,
        sonido_anormal: false,
        tos_frecuente: false

    }, urologicos: {
        andropausia: false,
        cancer_prostata: false,
        colico_nefritico: false,
        insuficiencia_renal: false,
        otros: ""
    }
}

export default TrastornosFormSchema
