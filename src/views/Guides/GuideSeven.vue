<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendData"
        @go-route="router.push(`/${id}/guideseven`)"
    />
    <SideBar :options="content" />
    <form action="" class="py-10">
        <h1 class="text-2xl font-bold text-center">FENÓMENOS DEL VÍNCULO TERAPÉUTICO</h1>
        <h2 :id="content[0].title" class="my-4 text-left font-semibold text-gray-900 dark:text-white">CONDICIONES AMBIENTALES EXTERNAS</h2>
        <TableGuideSeven
            :data="dataGuideSeven"
        />
        <h2 class="my-4 text-left font-semibold text-gray-900 dark:text-white">
            CARACTERÍSTICAS DEL TERAPEUTA O ASESOR <PopOver idPop="3" variant="info" textInfo="Todos los apartados deben ser llenados"/>
        </h2>
        <div class="pb-10"
            v-for="(item, index) in content.slice(1, 3)" :id="item.title" :key="index">
            <RadioBox
                :title-table="item.title"
                :content="item.options"
                :data="dataGuideSeven[item.title]"
            />
        </div>
        <h2 class="my-4 text-left font-semibold text-gray-900 dark:text-white">FENÓMENOS AFECTIVOS DURANTE EL PROCESO</h2>
        <div class="pb-10"
            v-for="(item, index) in content.slice(3, 5)" :id="item.title" :key="index">
            <RadioBox
                :title-table="item.title"
                :content-yes-or-no="item.options"
                :data="dataGuideSeven[item.title]"
                :radio-yes-or-no="true"
            />
        </div>
        <div :id="content[5].title">
            <DropDownTable
                :content="content[5]"
                :data="dataGuideSeven.dropDown"
            />
        </div>
        <h2 class="my-4 text-left font-semibold text-gray-900 dark:text-white">INDICADORES DE TRANSFERENCIA</h2>
        <div class="pb-10"
            v-for="(item, index) in content.slice(6, 8)"  :id="item.title" :key="index">
            <RadioBox
                :title-table="item.title"
                :content-yes-or-no="item.options"
                :data="dataGuideSeven[item.title]"
                :radio-yes-or-no="true"
            />
        </div>
        <div :id="content[8].title">
            <DropDownTable
                :content="content[8]"
                :data="dataGuideSeven[`${content[8].title}`]"
            />
        </div>
        <h2 class="my-4 text-left font-semibold text-gray-900 dark:text-white">CONTRATRANSFERENCIA</h2>
        <div class="pb-10"
            v-for="(item, index) in content.slice(9, 11)"  :id="item.title" :key="index">
            <RadioBox
                :title-table="item.title"
                :content-yes-or-no="item.options"
                :data="dataGuideSeven[item.title]"
                :radio-yes-or-no="true"
            />
        </div>
        <div class="flex justify-end">
            <ButtonVue class="p-2" type="submit" variant="info" @click.prevent="checkValues">
                Click 
            </ButtonVue>
        </div>
    </form>
</template>

<script setup>
import ButtonVue from '@/general_components/ButtonVue.vue';
import DropDownTable from '@/guide_components/DropDownTable.vue';
import RadioBox from '@/guide_components/RadioBox.vue';
import TableGuideSeven from '@/guide_components/TableGuideSeven.vue';
import { reactive, ref, computed } from 'vue';
import { useModal } from '@/composables/modal';
import ModalAlert from '@/general_components/ModalAlert.vue';
import SideBar from '@/guide_components/SideBar.vue';
import PopOver from '@/general_components/PopOver.vue';
import { router } from '../../routes';
import axios from 'axios';
import { onBeforeRouteLeave } from 'vue-router';

const content = [
    {
        title: 'CONDICIONES AMBIENTALES EXTERNAS',
    },
    {
        title: 'ASPECTOS COGNITIVOS',
        options: [
            'Función ejecutiva',
            'Pensamiento teórico-abstracto',
            'Potencialidad analítico-sintética',
            'Creatividad',
            'Intuición',
            'Perspicacia',
            'Flexibilidad',
            'Fluidez verbal'
        ]
    },
    {
        title: 'ASPECTOS NO COGNITIVOS',
        options: [
            'Adecuación de sus rasgos de personalidad al cliente',
            'Valores de solidaridad',
            'Equilibrio psíquico',
            'Capacidad de comunicación y relación interpersonal',
            'Capacidad empática',
            'Integridad ética',
            'Motivación a brindar ayuda',
            'Autoestima apropiada',
            'Proactividad'
        ]
    },
    {
        title: 'RAPPORT',
        options: [
            'Demostré inicialmente cordialidad y ausencia de conductas inapropiadas',
            'Inicié la sesión con temas neutros o sucesos conocidos por ambos',
            'Demostré una actitud amistosa, atenta e interesada con el cliente',
            'Controlé los fenómenos transferenciales y contratransferenciales',
            'Sentí agrado, confianza, cooperación, sinceridad e interés del paciente',
        ]
    },
    {
        title: 'EMPATÍA',
        options: [
            'Tuve sintonización con los afectos del paciente',
            'Demostré comprensión de los afectos',
            'Controlé la distancia emocional',
        ]
    },
    {
        title: 'RESISTENCIA',
        options: [
            {
                subtitle: 'Mecanismos de defensa o pensamientos distorsionados predominantes',
                options: []
            },
            {
                subtitle: 'Estrategias de respeto',
                options: [
                    'Iniciales para facilitar el rapport',
                    'Respetando sus valores y creencias personales',
                    'Evitando riesgos en el proceso'
                ]
            },
            {
                subtitle: 'Estrategias de manejo',
                options: [
                    'Interpretación y confrontación para acceder a omisiones y contradicciones',
                    'Sustitución de estructuras defensivas por resoluciones objetivas de los problemas y conflictos',
                    'Reforzamiento de mecanismos de defensa por tratarse de un proceso breve de terapia'
                ]
            }
        ]
    },
    {
        title: 'NO VERBALES',
        options: [
            'Llegadas anticipadas o tardías a la consulta',
            'Demostraciones excesivas de puntualidad',
            'Arreglo personal especial',
            'Compostura insinuante durante la entrevista',
            'Posiciones corporales',
            'Gesticulaciones socialmente aceptables en flirteo',
            'Manifestaciones vegetativas',
            'Gestos autodirigidos',
            'Otros'
        ]
    },
    {
        title: 'VERBALES',
        options: [
            'Expresiones verbales sobre la ansiedad y tranquilidad que le suscitan las consultas',
            'Reiteraciones sobre temas superfluos',
            'Insinuaciones de acercamiento en la distancia social',
            'Verbalizaciones directas de las emociones',
            'Referencia sobre sueños relacionados con el terapeuta',
            'Expresiones verbales seductoras',
            'Otros'
        ]
    },
    {
        title: 'MANEJO DE LA TRANSFERENCIA',
        options: [
            {
                subtitle: 'Análisis del terapeuta',
                options: {
                    type: 'normal'
                }

            },
            {
                subtitle: 'Manejo sin discusión ni interpretación de la transferencia',
                options: [
                    'Frecuencia de sesiones',
                    'Duración de sesiones',
                    'Modificación de los temas de discusión'
                ]
            },
            {
                subtitle: 'Manejo con discusión e interpretación de la transferencia',
                options: {
                    type: 'text',
                    content: 'Estrategia utilizada'
                }
            },
            {
                subtitle: 'Derivación del paciente a otro terapeuta',
                options: {
                    type: 'normal'
                }
            },
        ]
    },
    {
        title: 'EXPRESIONES DE CONTRATRANSFERENCIA',
        options: [
            'Afectos positivos y negativos',
            'Disgusto irrazonable',
            'Incapacidad para simpatizar',
            'Reacción emocional ante la hostilidad del cliente',
            'Actitudes defensivas ante la crítica del paciente',
            'Excesiva atracción',
            'Insinuaciones verbales y no verbales',
            'Incomodidad o temor a la entrevista',
            'Preocupación desmedida por las necesidades del paciente',
            'Dificultades para brindarle atención',
            'Falta de puntualidad o prolongación de las sesiones',
            'Acercamientos afectivos y corporales'
        ]
    },
    {
        title: 'MANEJO DE LA CONTRATRANSFERENCIA',
        options: [
            'Auto-observación para identificarla',
            'Necesidad de resolver conflictos personales del terapeuta',
            'Consulta profesional con otro colega',
            'Derivación del paciente a otro terapeuta',
        ]
    }
]
const { opacity, showModalAlert, modalAlert } = useModal();
const dataGuideSeven = reactive({
    dataTable: {
        'Características del consultorio': {
            'Privacidad': '',
            'Tranquilidad': ''
        },
        'Grabación de las sesiones': '',
        'Tipo de grabación': '',
        'Efecto Tipo de grabación': '',
        'POSICIÓN ENTRE PACIENTE Y TERAPEURA': {
            selected: '',
            other: ''
        },
        'Efecto POSICIÓN ENTRE PACIENTE Y TERAPEURA': ''
    },
    'ASPECTOS COGNITIVOS':{
        'Función ejecutiva': '',
        'Pensamiento teórico-abstracto': '',
        'Potencialidad analítico-sintética': '',
        'Creatividad': '',
        'Intuición': '',
        'Perspicacia': '',
        'Flexibilidad': '',
        'Fluidez verbal': ''
    },
    'ASPECTOS NO COGNITIVOS': {
        'Adecuación de sus rasgos de personalidad al cliente': '',
        'Valores de solidaridad': '',
        'Equilibrio psíquico': '',
        'Capacidad de comunicación y relación interpersonal': '',
        'Capacidad empática': '',
        'Integridad ética': '',
        'Motivación a brindar ayuda': '',
        'Autoestima apropiada': '',
        'Proactividad': ''
    },
    'RAPPORT': {
        'Demostré inicialmente cordialidad y ausencia de conductas inapropiadas': '',
        'Inicié la sesión con temas neutros o sucesos conocidos por ambos': '',
        'Demostré una actitud amistosa, atenta e interesada con el cliente': '',
        'Controlé los fenómenos transferenciales y contratransferenciales': '',
        'Sentí agrado, confianza, cooperación, sinceridad e interés del paciente': '',
    },
    'EMPATÍA': {        
        'Tuve sintonización con los afectos del paciente': '',
        'Demostré comprensión de los afectos': '',
        'Controlé la distancia emocional': '',
    },
    dropDown: {
        'Mecanismos de defensa o pensamientos distorsionados predominantes': '',
        'Estrategias de respeto': {
            selected: '',
            'Iniciales para facilitar el rapport': '',
            'Respetando sus valores y creencias personales': '',
            'Evitando riesgos en el proceso': '',
        },
        'Estrategias de manejo': {
            selected: '',
            'Interpretación y confrontación para acceder a omisiones y contradicciones': '',
            'Sustitución de estructuras defensivas por resoluciones objetivas de los problemas y conflictos': '',
            'Reforzamiento de mecanismos de defensa por tratarse de un proceso breve de terapia': ''
        },
    },
    'NO VERBALES': {        
        'Llegadas anticipadas o tardías a la consulta': '',
        'Demostraciones excesivas de puntualidad': '',
        'Arreglo personal especial': '',
        'Compostura insinuante durante la entrevista': '',
        'Posiciones corporales': '',
        'Gesticulaciones socialmente aceptables en flirteo': '',
        'Manifestaciones vegetativas': '',
        'Gestos autodirigidos': '',
        'Otros': {
            selected: '',
            content: ''
        }
    },
    'VERBALES': {
        'Expresiones verbales sobre la ansiedad y tranquilidad que le suscitan las consultas': '',
        'Reiteraciones sobre temas superfluos': '',
        'Insinuaciones de acercamiento en la distancia social': '',
        'Verbalizaciones directas de las emociones': '',
        'Referencia sobre sueños relacionados con el terapeuta': '',
        'Expresiones verbales seductoras': '',
        'Otros': {
            selected: '',
            content: ''
        }
    },
    'MANEJO DE LA TRANSFERENCIA': {
        'Análisis del terapeuta': {
            selected: ''
        },
        'Manejo sin discusión ni interpretación de la transferencia': {
            selected: '',
            'Frecuencia de sesiones': '',
            'Duración de sesiones': '',
            'Modificación de los temas de discusión': ''
        },
        'Manejo con discusión e interpretación de la transferencia': {
            selected: '',
            'Estrategia utilizada': ''
        },
        'Derivación del paciente a otro terapeuta': {
            selected: ''
        },
    },
    'EXPRESIONES DE CONTRATRANSFERENCIA': {
        'Afectos positivos y negativos': '',
        'Disgusto irrazonable': '',
        'Incapacidad para simpatizar': '',
        'Reacción emocional ante la hostilidad del cliente': '',
        'Actitudes defensivas ante la crítica del paciente': '',
        'Excesiva atracción': '',
        'Insinuaciones verbales y no verbales': '',
        'Incomodidad o temor a la entrevista': '',
        'Preocupación desmedida por las necesidades del paciente': '',
        'Dificultades para brindarle atención': '',
        'Falta de puntualidad o prolongación de las sesiones': '',
        'Acercamientos afectivos y corporales': ''
    },
    'MANEJO DE LA CONTRATRANSFERENCIA': {
        'Auto-observación para identificarla': '',
        'Necesidad de resolver conflictos personales del terapeuta': '',
        'Consulta profesional con otro colega': '',
        'Derivación del paciente a otro terapeuta': '',
    },
})
const props = defineProps(['id']);
const isEmpty = ref(false);
const modalMessage = ref('');
const keysExcluded = ['dataTable', 'dropDown', 'MANEJO DE LA TRANSFERENCIA'];
const isSafeToLeave = ref(false);

onBeforeRouteLeave(() => {
    if (isSafeToLeave.value) return true
    else {
        if (confirm("¿Estás seguro de salir del formulario sin haberlo completado?")) {
            return true
        } else {
            return false
        }
    }
})

window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = '';
})

/**
 * Checa los valores de la primer tabla y retorna según condiciones
 */
function checkTable() {
    const isEmptyFirst = computed(() => {
        return dataGuideSeven.dataTable['Características del consultorio'].Privacidad.toString().trim() === '' ||
        dataGuideSeven.dataTable['Características del consultorio'].Tranquilidad.toString().trim() === '' ? true : false;
    })

    const isEmptyRecordings = computed(() => {
        return dataGuideSeven['dataTable']['Grabación de las sesiones'].toString().trim() === '' ||
            dataGuideSeven.dataTable['Grabación de las sesiones'] === 'Sí' &&
            (dataGuideSeven.dataTable['Tipo de grabación'].toString().trim() === '' ||
            dataGuideSeven.dataTable['Efecto Tipo de grabación'].toString().trim() === '') ? true : false;
    })

    const isEmptyPostitions = computed(() => {
        return dataGuideSeven.dataTable['POSICIÓN ENTRE PACIENTE Y TERAPEURA'].other.toString().trim() === '' &&
        dataGuideSeven.dataTable['POSICIÓN ENTRE PACIENTE Y TERAPEURA'].selected === '' ? true : false;
    })

    const isEmptyEffect = computed(() => {
        return dataGuideSeven.dataTable['Efecto POSICIÓN ENTRE PACIENTE Y TERAPEURA'].toString().trim() === '' ? true : false;
    })

    if(isEmptyFirst.value || isEmptyPostitions.value || isEmptyRecordings.value || isEmptyEffect.value) {
        isEmpty.value = true;
        modalMessage.value = 'Por favor llena la sección de condiciones ambientales';
        return 
    }

    for (const key in dataGuideSeven){
        if (!keysExcluded.some(value => value === key)){
            for (const subkey in dataGuideSeven[key]){
                if (subkey === 'Otros'){
                    if(dataGuideSeven[key][subkey].selected === '' || (dataGuideSeven[key][subkey].selected === 'Sí' && dataGuideSeven[key][subkey].content.toString().trim() === '')){
                        modalMessage.value = 'Si el campo "Otros" está seleccionado en "Sí", recuerda escribir la opción';
                        isEmpty.value = true;
                        return
                    }
                } else if (dataGuideSeven[key][subkey].toString().trim() === ''){
                    modalMessage.value = `Por favor revisa la tabla ${key} y llena los datos`;
                    isEmpty.value = true;
                    return
                }
            }
        }
    }


    for (const key in dataGuideSeven['MANEJO DE LA TRANSFERENCIA']){
        if(dataGuideSeven['MANEJO DE LA TRANSFERENCIA'][key].selected === ''){
            modalMessage.value = 'Revisa la sección "MANEJO DE LA TRANSFERENCIA", hay un campo vacío';
            isEmpty.value = true;
            return
        }
    }


    if(dataGuideSeven.dropDown['Mecanismos de defensa o pensamientos distorsionados predominantes'].toString().trim() === ''){
        modalMessage.value = 'Llena todas las opciones de la sección "Resistencia"';
        isEmpty.value = true;
        return
    }
    const subKeysExcluded = 'Mecanismos de defensa o pensamientos distorsionados predominantes';
    
    for (const key in dataGuideSeven.dropDown) {
        let count = 0;
        if(key !== subKeysExcluded){
            if (dataGuideSeven.dropDown[key].selected === ''){
                modalMessage.value = 'Llena todas las opciones de la sección "Transferencia"';
                isEmpty.value = true;
                return
            } else if (dataGuideSeven.dropDown[key].selected === 'Sí'){
                for (const subkey in dataGuideSeven.dropDown[key]){
                    if (dataGuideSeven.dropDown[key][subkey] === ''){
                        count++
                    }
                }
                if(count === 3){
                    modalMessage.value = 'Revisa la sección "RESISTENCIA", hay un campo vacío';
                    isEmpty.value = true;
                    return
                }
            }
        }
    }
    
    if(dataGuideSeven['MANEJO DE LA TRANSFERENCIA']['Manejo sin discusión ni interpretación de la transferencia'].selected === 'Sí'){
        let count = 0;
        for (const subkey in dataGuideSeven['MANEJO DE LA TRANSFERENCIA']['Manejo sin discusión ni interpretación de la transferencia']){
            if (dataGuideSeven['MANEJO DE LA TRANSFERENCIA']['Manejo sin discusión ni interpretación de la transferencia'][subkey] === ''){
                count++
            }
        }
        if(count === 3){
            modalMessage.value = 'Revisa la sección "MANEJO DE LA TRANSFERENCIA", hay un campo vacío';
            isEmpty.value = true;
            return
        }
    }
    
    if(dataGuideSeven['MANEJO DE LA TRANSFERENCIA']['Manejo con discusión e interpretación de la transferencia'].selected === 'Sí' && dataGuideSeven['MANEJO DE LA TRANSFERENCIA']['Manejo con discusión e interpretación de la transferencia']['Estrategia utilizada'].toString().trim() === ''){
        modalMessage.value = 'Debes llenar la estrategia usada en la sección "MANEJO DE LA TRANSFERENCIA"';
        isEmpty.value = true;
        return
    }
}

function checkValues(){
    isEmpty.value = false;
    modalMessage.value = '';
    checkTable();

    if (isEmpty.value) {
        showModalAlert(modalMessage.value, false, {variant: 'danger'});
    } else {
        showModalAlert('Eureka', true);
    }
}

async function sendData() {
    try {
        const res = await axios.post('http://localhost:3000/guideseven', {
            patient: props.id,
            dataGuideSeven,
            date: new Date()
        })
        showModalAlert('Eureka!!', false, {variant: 'success', showRoute: true});
        isSafeToLeave.value = true;
    } catch (error) {
        showModalAlert(error, false, {variant: 'danger'})
    }
}
</script>