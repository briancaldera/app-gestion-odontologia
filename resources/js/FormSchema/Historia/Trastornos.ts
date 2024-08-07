import {z} from 'zod'

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

const TrastornosFormSchema = z.object({
    historia_id: z.string(),
    cardiovasculares: z.object(Object.assign({}, ...tCardiovasculares.map(toTrastornoObject), {otros: z.string().max(255)})),
    hematologicos: z.object(Object.assign({}, ...tHematologicos.map(toTrastornoObject), {otros: z.string().max(255)})),
    respiratorios:z.object(Object.assign({}, ...tRespiratorios.map(toTrastornoObject), {otros: z.string().max(255)})),
    endocrinos: z.object(Object.assign({}, ...tEndocrinos.map(toTrastornoObject), {otros: z.string().max(255)})),
    gastrointestinales: z.object(Object.assign({}, ...tGastrointestinales.map(toTrastornoObject), {otros: z.string().max(255)})),
    neurologicos:z.object(Object.assign({}, ...tNeurologicos.map(toTrastornoObject), {otros: z.string().max(255)})),
    oseos:z.object(Object.assign({}, ...tOseos.map(toTrastornoObject), {otros: z.string().max(255)})),
    ginecologicos:z.object(Object.assign({}, ...tGinecologicos.map(toTrastornoObject), {otros: z.string().max(255)})),
    urologicos:z.object(Object.assign({}, ...tUrologicos.map(toTrastornoObject), {otros: z.string().max(255)})),
    infectocontagiosa:z.object(Object.assign({}, ...tInfectocontagiosa.map(toTrastornoObject), {otros: z.string().max(255)})),
})

export default TrastornosFormSchema
