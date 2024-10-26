import {z} from 'zod'

const MAX_TEXT_SIZE = 1000

type TrastornoItem = {
    id: string
    label: string
}

const cardiovasculares: readonly TrastornoItem[] = [
    {id: 'disnea', label: 'Disnea'},
    {id: 'cansancio', label: 'Cansancio'},
    {id: 'vertigo', label: 'Vertigo'},
    {id: 'palpitaciones', label: 'Palpitaciones'},
    {id: 'taquicardia', label: 'Taquicardia'},
    {id: 'bradicardia', label: 'Bradicardia'},
    {id: 'varices', label: 'Várices'},
    {id: 'infarto_miocardio', label: 'Infarto al miocardio'},
    {id: 'angina_pecho', label: 'Angina de pecho'},
    {id: 'hipertension', label: 'Hipertensión'},
    {id: 'endocarditis', label: 'Endocarditis'},
    {id: 'otros', label: 'Otros'},
] satisfies TrastornoItem[]

const hematologicos: readonly TrastornoItem[] = [
    {id: 'palidez', label: 'Palidez'},
    {id: 'ictericia', label: 'Ictericia'},
    {id: 'anemia', label: 'Anemia'},
    {id: 'hemorragias', label: 'Hemorragias'},
    {id: 'hematoma', label: 'Hematoma'},
    {id: 'equimosis', label: 'Equimosis'},
    {id: 'petequias', label: 'Petequias'},
    {id: 'dengue', label: 'Dengue'},
    {id: 'hemofilia', label: 'Hemofilia'},
    {id: 'otros', label: 'Otros'},
] satisfies TrastornoItem[]

const respiratorios: readonly TrastornoItem[] = [
    {id: 'ciaonosis', label: 'Ciaonosis'},
    {id: 'hemoptisis', label: 'Hemoptisis'},
    {id: 'esputos', label: 'Esputos'},
    {id: 'enfisema_pulmonar', label: 'Enfisema pulmonar'},
    {id: 'asma', label: 'Asma'},
    {id: 'asfixia', label: 'Asfixia'},
    {id: 'tos_frecuente', label: 'Tos frecuente'},
    {id: 'rinitis', label: 'Rinitis'},
    {id: 'sonido_anormal', label: 'Sonido anormal'},
    {id: 'inf_respiratorias', label: 'Infecciones respiratorias'},
    {id: 'otros', label: 'Otros'},
] satisfies TrastornoItem[]

const endocrinos: readonly TrastornoItem[] = [
    {id: 'poliuria', label: 'Poliuria'},
    {id: 'polidipsia', label: 'Polidipsia'},
    {id: 'polifagia', label: 'Polifagia'},
    {id: 'variacion_peso', label: 'Variación de peso'},
    {id: 'irritabilidad', label: 'Irritabilidad'},
    {id: 'sudoracion_excesiva', label: 'Sudoración excesiva'},
    {id: 'diabetes', label: 'Diabetes'},
    {id: 'intolerancia_frio', label: 'Intolerancia al frío'},
    {id: 'hipoglicemia', label: 'Hipoglicemia'},
    {id: 'hipertiroidismo', label: 'Hipertiroidismo'},
    {id: 'adenopatia', label: 'Adenopatía'},
    {id: 'hipotiroidismo', label: 'Hipotiroidismo'},
    {id: 'otros', label: 'Otros'},
] satisfies TrastornoItem[]

const gastrointestinales: readonly TrastornoItem[] = [
    {id: 'diarrea', label: 'Diarrea'},
    {id: 'flatulencia', label: 'Flatulencia'},
    {id: 'acidez', label: 'Acidez'},
    {id: 'nauseas', label: 'Nauseas'},
    {id: 'vomitos', label: 'Vómitos'},
    {id: 'ulceras', label: 'Úlceras'},
    {id: 'dolor_estomacal', label: 'Dolor estomacal'},
    {id: 'gastritis', label: 'Gastritis'},
    {id: 'parasitos', label: 'Parásitos'},
    {id: 'reflujo_gastrico', label: 'Reflujo gástrico'},
    {id: 'gastroenteritis', label: 'Gastroenteritis'},
    {id: 'colon_irritable', label: 'Colon Irritable'},
    {id: 'cirrosis_hepatica', label: 'Cirrosis Hepática'},
    {id: 'estrenimiento', label: 'Estreñimiento'},
    {id: 'otros', label: 'Otros'},
] satisfies TrastornoItem[]

const neurologicos: readonly TrastornoItem[] = [
    {id: 'convulsiones', label: 'Convulsiones'},
    {id: 'temblor', label: 'Temblor'},
    {id: 'tic', label: 'Tic'},
    {id: 'epilepsia', label: 'Epilepsia'},
    {id: 'cefalea', label: 'Cefálea'},
    {id: 'depresion', label: 'Depresión'},
    {id: 'dislexia', label: 'Dislexia'},
    {id: 'parkinson', label: 'Parkinson'},
    {id: 'alzheimer', label: 'Alzheimer'},
    {id: 'ecv', label: 'ECV'},
    {id: 'bulimia', label: 'Bulimia'},
    {id: 'anorexia', label: 'Anorexia'},
    {id: 'sindrome_down', label: 'Síndrome de Down'},
    {id: 'retardo_mental', label: 'Retardo mental'},
    {id: 'otros', label: 'Otros'},] satisfies TrastornoItem[]

const oseos: readonly TrastornoItem[] = [
    {id: 'deformidades', label: 'Deformidades'},
    {id: 'fracturas', label: 'Fracturas'},
    {id: 'escleroticas_azules', label: 'Escleroticas azules'},
    {id: 'artritis', label: 'Artritis'},
    {id: 'dificultad_movimiento', label: 'Dificultad de movimiento'},
    {id: 'osteoporosis', label: 'Osteoporosis'},
    {id: 'osteomelitis', label: 'Osteomelitis'},
    {id: 'otros', label: 'Otros'},
] satisfies TrastornoItem[]

const ginecologicos: readonly TrastornoItem[] = [
    {id: 'embarazo', label: 'Embarazo'},
    {id: 'menstruacion', label: 'Menstruación'},
    {id: 'abortos', label: 'Abortos'},
    {id: 'menopausia', label: 'Menopausia'},
    {id: 'otros', label: 'Otros'},
] satisfies TrastornoItem[]

const urologicos: readonly TrastornoItem[] = [
    {id: 'insuficiencia_renal', label: 'Insuficiencia renal'},
    {id: 'colico_nefritico', label: 'Cólico nefrítico'},
    {id: 'cancer_prostata', label: 'Cáncer de próstata'},
    {id: 'andropausia', label: 'Andropausia'},
    {id: 'otros', label: 'Otros'},
] satisfies TrastornoItem[]

const infectocontagiosa: readonly TrastornoItem[] = [
    {id: 'parotiditis', label: 'Paroditis'},
    {id: 'tuberculosis', label: 'Tuberculosis'},
    {id: 'vih_sida', label: 'VIH/SIDA'},
    {id: 'blenorragia', label: 'Blenorragia'},
    {id: 'sifilis', label: 'Sífilis'},
    {id: 'herpes', label: 'Herpes'},
    {id: 'hepatitis_abc', label: 'Hepatitis A-B-C'},
    {id: 'influenza', label: 'Influenza'},
    {id: 'vhp', label: 'VHP'},
    {id: 'rubeola', label: 'Rubeola'},
    {id: 'varicela', label: 'Varicela'},
    {id: 'sarampion', label: 'Sarampión'},
    {id: 'covid', label: 'Covid'},
    {id: 'otros', label: 'Otros'},
] satisfies TrastornoItem[]

const trastornosSchema = z.object({
    cardiovasculares: z.array(z.string()),
    hematologicos: z.array(z.string()),
    respiratorios: z.array(z.string()),
    endocrinos: z.array(z.string()),
    gastrointestinales: z.array(z.string()),
    neurologicos: z.array(z.string()),
    oseos: z.array(z.string()),
    ginecologicos: z.array(z.string()),
    urologicos: z.array(z.string()),
    infectocontagiosa: z.array(z.string()),
    descripcion: z.string().max(MAX_TEXT_SIZE).nullable()
})

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

export {
    trastornosSchema,
    cardiovasculares,
    hematologicos,
    respiratorios,
    endocrinos,
    gastrointestinales,
    neurologicos,
    oseos,
    ginecologicos,
    urologicos,
    infectocontagiosa,
    type TrastornoItem
}
export default TrastornosSchema
