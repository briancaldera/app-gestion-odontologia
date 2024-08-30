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

const TrastornoSchema = z.boolean()
const OtrosTrastornosSchema = z.string().max(MAX_TEXT_SIZE).nullable()

const TCardiovascularesSchema = z.object({
    disnea: TrastornoSchema,
    cansancio: TrastornoSchema,
    vertigo: TrastornoSchema,
    palpitaciones: TrastornoSchema,
    taquicardia: TrastornoSchema,
    bradicardia: TrastornoSchema,
    varices: TrastornoSchema,
    infarto_miocardio: TrastornoSchema,
    angina_pecho: TrastornoSchema,
    hipertension: TrastornoSchema,
    endocarditis: TrastornoSchema,
    otros: OtrosTrastornosSchema,
})

const THematologicosSchema = z.object({
    palidez: TrastornoSchema,
    ictericia: TrastornoSchema,
    anemia: TrastornoSchema,
    hemorragias: TrastornoSchema,
    hematoma: TrastornoSchema,
    equimosis: TrastornoSchema,
    petequias: TrastornoSchema,
    dengue: TrastornoSchema,
    hemofilia: TrastornoSchema,
    otros: OtrosTrastornosSchema,
})

const TRespiratoriosSchema = z.object({
    ciaonosis: TrastornoSchema,
    hemoptisis: TrastornoSchema,
    esputos: TrastornoSchema,
    enfisema_pulmonar: TrastornoSchema,
    asma: TrastornoSchema,
    asfixia: TrastornoSchema,
    tos_frecuente: TrastornoSchema,
    rinitis: TrastornoSchema,
    sonido_anormal: TrastornoSchema,
    inf_respiratorias: TrastornoSchema,
    otros: OtrosTrastornosSchema,
})

const TEndocrinosSchema = z.object({
    poliuria: TrastornoSchema,
    polidipsia: TrastornoSchema,
    polifagia: TrastornoSchema,
    variacion_peso: TrastornoSchema,
    irritabilidad: TrastornoSchema,
    sudoracion_excesiva: TrastornoSchema,
    diabetes: TrastornoSchema,
    intolerancia_frio: TrastornoSchema,
    hipoglicemia: TrastornoSchema,
    hipertiroidismo: TrastornoSchema,
    adenopatia: TrastornoSchema,
    hipotiroidismo: TrastornoSchema,
    otros: OtrosTrastornosSchema,
})

const TGastrointestinalesSchema = z.object({
    diarrea: TrastornoSchema,
    flatulencia: TrastornoSchema,
    acidez: TrastornoSchema,
    nauseas: TrastornoSchema,
    vomitos: TrastornoSchema,
    ulceras: TrastornoSchema,
    dolor_estomacal: TrastornoSchema,
    gastritis: TrastornoSchema,
    parasitos: TrastornoSchema,
    reflujo_gastrico: TrastornoSchema,
    gastroenteritis: TrastornoSchema,
    colon_irritable: TrastornoSchema,
    cirrosis_hepatica: TrastornoSchema,
    estrenimiento: TrastornoSchema,
    otros: OtrosTrastornosSchema,
})

const TNeurologicosSchema = z.object({
    convulsiones: TrastornoSchema,
    temblor: TrastornoSchema,
    tic: TrastornoSchema,
    epilepsia: TrastornoSchema,
    cefalea: TrastornoSchema,
    depresion: TrastornoSchema,
    dislexia: TrastornoSchema,
    parkinson: TrastornoSchema,
    alzheimer: TrastornoSchema,
    ecv: TrastornoSchema,
    bulimia: TrastornoSchema,
    anorexia: TrastornoSchema,
    sindrome_down: TrastornoSchema,
    retardo_mental: TrastornoSchema,
    otros: OtrosTrastornosSchema,
})

const TOseosSchema = z.object({
    deformidades: TrastornoSchema,
    fracturas: TrastornoSchema,
    escleroticas_azules: TrastornoSchema,
    artritis: TrastornoSchema,
    dificultad_movimiento: TrastornoSchema,
    osteoporosis: TrastornoSchema,
    osteomelitis: TrastornoSchema,
    otros: OtrosTrastornosSchema,
})
const TGinecologicosSchema = z.object({
    embarazo: TrastornoSchema,
    menstruacion: TrastornoSchema,
    abortos: TrastornoSchema,
    menopausia: TrastornoSchema,
    otros: OtrosTrastornosSchema,
})
const TUrologicosSchema = z.object({
    insuficiencia_renal: TrastornoSchema,
    colico_nefritico: TrastornoSchema,
    cancer_prostata: TrastornoSchema,
    andropausia: TrastornoSchema,
    otros: OtrosTrastornosSchema,
})
const TInfectocontagiosaSchema = z.object({
    parotiditis: TrastornoSchema,
    tuberculosis: TrastornoSchema,
    vih_sida: TrastornoSchema,
    blenorragia: TrastornoSchema,
    sifilis: TrastornoSchema,
    herpes: TrastornoSchema,
    hepatitis_abc: TrastornoSchema,
    influenza: TrastornoSchema,
    vhp: TrastornoSchema,
    rubeola: TrastornoSchema,
    varicela: TrastornoSchema,
    sarampion: TrastornoSchema,
    covid: TrastornoSchema,
    otros: OtrosTrastornosSchema,
})

const TrastornosSchema = z.object({
    cardiovasculares: TCardiovascularesSchema,
    hematologicos: THematologicosSchema,
    respiratorios: TRespiratoriosSchema,
    endocrinos: TEndocrinosSchema,
    gastrointestinales: TGastrointestinalesSchema,
    neurologicos: TNeurologicosSchema,
    oseos: TOseosSchema,
    ginecologicos: TGinecologicosSchema,
    urologicos: TUrologicosSchema,
    infectocontagiosa: TInfectocontagiosaSchema,
})

export const TrastornosDefaults = {
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
} satisfies z.infer<typeof TrastornosSchema> as const

export default TrastornosSchema
