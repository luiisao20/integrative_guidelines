<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
    />
    <SideBar
        :options="content"
    />
    <form class="py-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">ANÁLISIS DE LA PRIMER ENTREVISTA</h1>
        <div :id="content[0].title">
            <CheckBox
                type-input="radio"
                :item="content[0]"
                v-model:option-selected="dataGuideTwo[`${content[0].title}`]"
            />
        </div>
        <h2 class="mt-10 mb-4 text-center font-semibold text-gray-900 dark:text-white">
            INTERROGANTES AL FINALIZAR LA PRIMERA ENTREVISTA <PopOver id-pop="1" variant="info" text-info="Para cada apartado debes llenar las observaciones y seleccionar 'Sí' o 'No'"/>
        </h2>
        <div :id="content[1].title">
            <TableForm
                v-model:data="dataGuideTwo.tableOne"
                :content="content[1].options"
            />
        </div>
        <h2 class="mt-10 mb-4 text-center font-semibold text-gray-900 dark:text-white">CARACTERÍSTICAS DEL PACIENTE</h2>
        <div :id="content[2].title">
            <RadioBox
                v-model:data="dataGuideTwo.tableTwo"
                :content="content[2].options"
            />
        </div>
        <div class="flex justify-end">
            <ButtonVue class="p-2 mt-10" variant="info" type="button" @click="checkValues">
                Enviar
            </ButtonVue>
        </div>
    </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import CheckBox from '../guide_components/CheckBox.vue';
import TableForm from '../guide_components/TableForm.vue';
import RadioBox from '../guide_components/RadioBox.vue';
import ModalAlert from '../general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import ButtonVue from '../general_components/ButtonVue.vue';
import SideBar from '../guide_components/SideBar.vue';
import PopOver from '../general_components/PopOver.vue';

const content = [
    {
        title: 'Tipo de primera entrevista',
        options: [
            'Entrevista de psicodiagnóstico',
            'Entrevista de consulta',
            'Entrevista única',
            'Inicio de proceso terapéutico'
        ]
    },
    {
        title: 'INTERROGANTES AL FINALIZAR LA PRIMERA ENTREVISTA',
        options: [

            {
                title: 'RAPPORT',
                subtitle: '¿Sentí un clima de confianza mutua durante la entrevista?'
            },
            {
                title: 'PERMISIVIDAD',
                subtitle: '¿Logré que el paciente hablé con libertad sobre su problema o su trastorno?'
            },
            {
                title: 'APROXIMACIÓN DIAGNÓSTICA DEL PROBLEMA Y/O TRASTORNO',
                subtitle: '¿Tengo claridad en la aproximación diagnóstica del problema y/o trastorno?'
            },
            {
                title: 'APROXIMACIÓN DIAGNÓSTICA DE LA PERSONALIDAD',
                subtitle: '¿He logrado una aproximación diagnóstica de la personalidad?'
            },
            {
                title: 'POSIBILIDADES DE INTERVENCIÓN',
                subtitle: '¿He identificado las facilidades y dificultades de la intervención psicológica?'
            },
            {
                title: 'EMPATÍA',
                subtitle: '¿Percibí el relato desde su propia significación cognitiva y respuesta afectiva?'
            },
            {
                title: 'EMPATÍA',
                subtitle: '¿Logré que el demandante se sienta comprendido por su problema?'
            },
            {
                title: 'DESINHIBICIÓN EMOCIONAL',
                subtitle: '¿Se produjo desinhibición emocional en la primera entrevista?'
            },
            {
                title: 'DESINHIBICIÓN EMOCIONAL',
                subtitle: '¿La desinhibición emocional se presentó por la propia dinámica del relato?'
            },
            {
                title: 'DESINHIBICIÓN EMOCIONAL',
                subtitle: '¿Se requirió intervención del terapeuta para lograr la desinhibición emocional?'
            },
            {
                title: 'APOYO EMOCIONAL',
                subtitle: '¿Intervine con técnicas comunicacionales para apoyarle emocionalmente al paciente?'
            },
            {
                title: 'ESTRUCTURACIÓN DEL PROCESO',
                subtitle: '¿Terminó convencido sobre las posibilidades y objetivos de la psicoterapia?'
            },
            {
                title: 'ESTRUCTURACIÓN DEL PROCESO',
                subtitle: '¿Tiene confianza el paciente en mí como terapeuta y en la psicoterapia como forma de tratamiento?'
            },
            {
                title: 'RESISTENCIA AL PROCESO',
                subtitle: '¿Se identificaron componentes de resistencia?'
            },
            {
                title: 'TRANSFERENCIA',
                subtitle: '¿Se identificaron componentes de transferencia?'
            },
            {
                title: 'CONTRATRANSFERENCIA',
                subtitle: '¿Se identificaron componentes de contratransferencia?'
            },
        ]
    },
    {
        title: 'CARACTERÍSTICAS DEL PACIENTE',
        options: [
            'Motivación a recibir ayuda',
            'Capacidad cognitiva',
            'Grado de integración de la personalidad',
            'Capacidad de respuesta emocional',
            'Flexibilidad',
            'Locus de control interno'
        ]
    }
]
const { opacity, modalAlert, showModalAlert } = useModal();
const dataGuideTwo = reactive({
    'Tipo de primera entrevista': {
        selected: ''
    },
    tableOne: {},
    tableTwo: {
        'Motivación a recibir ayuda': '',
        'Capacidad cognitiva': '',
        'Grado de integración de la personalidad': '',
        'Capacidad de respuesta emocional': '',
        'Flexibilidad': '',
        'Locus de control interno': ''
    }
})
const isEmpty = ref(false);
const modalMessage = ref('');

function checkValues() {
    isEmpty.value = false;
    if (dataGuideTwo['Tipo de primera entrevista'].selected.toString().trim() === '') {
        modalMessage.value = 'Selecciona el tipo de entrevista';
        isEmpty.value = true;
    } else if(Object.keys(dataGuideTwo.tableOne).length < 31){
        isEmpty.value = true;
        modalMessage.value = 'Tienes que llenar todas las secciones de "Interrogantes de la primer entrevista"';
    } else {
        for (const key in dataGuideTwo.tableOne){
            if (dataGuideTwo.tableOne[key].toString().trim() === ''){
                modalMessage.value = 'Tienes que llenar todas las secciones de "Interrogantes de la primer entrevista"';
                isEmpty.value = true;
                break;
            }
        }

        for (const key in dataGuideTwo.tableTwo){
            if (dataGuideTwo.tableTwo[key].toString().trim() === ''){
                modalMessage.value = `El campo "${key}" de la sección "Características del paciente" está vacío, por favor escoge una opción`;
                isEmpty.value = true;
                break;
            }
        }
    }

    if (isEmpty.value) {
        showModalAlert(modalMessage.value, false, {variant: 'danger'});
    } else {
        showModalAlert('¿Estás seguro de guardar los datos?', true, {variant: 'info'});
    }
}
</script>