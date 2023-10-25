<template>
    <Modal
        v-bind="modal"
        @close-mod="modal.showModal = false; opacity = '1'"
    />
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendData"
    />
    <SideBar 
        :options="demands"
        title="text"
    />
    <form class="pt-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">FICHA INTEGRATIVA DE EVALUACIÓN PSICOLÓGICA FIEPS</h1>
        <!-- Sección 2 y 3 -->
        <div v-for="(item, index) in demands.slice(0, 3)" :id="item.text" :key="index">
            <TextArea
                :text-value="dataGuideThree.otherSections"
                :item="item"
                @showModalInfo="showInfo"
            />
        </div>
        <!-- Sección 4 -->
        <div :id="demands[3].text">
            <SectionFour 
                @update="getInfoSectFour"
                :item="demands[3]"
                @show-info="showInfo"
            />
        </div>
        <h2 :id="demands[4].text" class="text-xl mt-10 normal-case font-bold">Resultados de pruebas psicológicas</h2>
        <!-- Sección 5 -->
        <div>
            <TextArea
                section="title"
                :text-value="dataGuideThree.otherSections"
                :item="demands[4]"
                @showModalInfo="showInfo"
            />
        </div>
        <h2 class="text-xl mt-10 normal-case font-bold">Conclusiones diagnósticas</h2>
        <!-- Sección 6 -->
        <div v-for="(item, index) in demands.slice(5, 8)" :id="item.text" :key="index">
            <TextArea
                :text-value="dataGuideThree.sectionSix"
                :item="item"
                @showModalInfo="showInfo"
            />
        </div>
        <!-- Sección 7 y 8 -->
        <div v-for="(item, index) in demands.slice(8)" :key="index" :id="item.text">
            <TextArea
                :text-value="dataGuideThree.otherSections"
                :item="item"
                @showModalInfo="showInfo"
            />
        </div>
        <ButtonVue class="p-4 mb-10" variant="secondary" type="button" @click="showData">
            Enviar
        </ButtonVue>
    </form>
</template>

<script setup>
import SectionFour from '@/guide_components/SectionFour.vue';
import TextArea from '@/guide_components/TextArea.vue';
import Modal from '@/general_components/Modal.vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import { ref, reactive } from 'vue';
import { getInfoContent } from '@/composables/infoDemands.js';
import ButtonVue from '@/general_components/ButtonVue.vue';
import SideBar from '@/guide_components/SideBar.vue';
import axios from 'axios';
import { onBeforeRouteLeave } from 'vue-router';

const { opacity, modal, showModal, modalAlert, showModalAlert } = useModal();
const infoContent = ref({});
const dataGuideThree = reactive({
    otherSections: {
        'Demanda explícita':'',
        'Demanda implícita': '',
        'Antecedentes disfuncionales': '',
        'Consignar los resultados de las pruebas psicológicas:': '',
        'Criterios pronósticos': '',
        'Recomendaciones': '',
    },
    sectionFour: {
        'Biografía psicológica personal y familiar': '',
        table:{}
    },
    sectionSix: {
        'Diagnóstico descriptivo y formulación dinámica del problema': '',
        'Diagnóstico descriptivo y formulación dinámica del trastorno': '',
        'Diagnóstico descriptivo y formulación dinámica de la personalidad': '',
    }
})
const demands = [
    {
        code: '2.1',
        text: 'Demanda explícita'
    },
    {
        code: '2.2',
        text: 'Demanda implícita'
    },
    {
        code: '3',
        text: 'Antecedentes disfuncionales'
    },
    {
        code: '4',
        text: 'Biografía psicológica personal y familiar'
    },
    {
        code: '5',
        title: 'Consignar los resultados de las pruebas psicológicas:',
        text: 'Resultados de las pruebas psicológicas'
    },
    {
        code: '6.1',
        text: 'Diagnóstico descriptivo y formulación dinámica del problema'
    },
    {
        code: '6.2',
        text: 'Diagnóstico descriptivo y formulación dinámica del trastorno'
    },
    {
        code: '6.3',
        text: 'Diagnóstico descriptivo y formulación dinámica de la personalidad'
    },
    {
        code: '7',
        text: 'Criterios pronósticos'
    },
    {
        code: '8',
        text: 'Recomendaciones'
    },
]
const isEmpty = ref(false);
const messageAlert = ref('');
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

function getInfoSectFour(data){
    dataGuideThree.sectionFour = data;
}

/**
 * Recorre todo el formulario en busca de campos vacíos y retorna 
 * en caso de encontrarlos
 */
function checkValues(){

    // Other sections
    for (const key in dataGuideThree.otherSections) {
        if (dataGuideThree.otherSections.hasOwnProperty(key)) {
            if (dataGuideThree.otherSections[key].toString().trim() === "") {
                isEmpty.value = true;
                messageAlert.value = `El campo "${key}" se encuentra vacío, por favor llénalo`;
                return;
            }
        }
    }

    // Section 6
    let countSectionSix = 0;
    for (const key in dataGuideThree.sectionSix) {
        if (dataGuideThree.sectionSix.hasOwnProperty(key)) {
            if (dataGuideThree.sectionSix[key].toString().trim() === "") {
                countSectionSix ++
            }

            if(countSectionSix === 3){
                isEmpty.value = true;
                messageAlert.value = 'Debes llenar al menos una conclusión diagnóstica';
                return;
            }
        }
    }

    // Section 4
    if (dataGuideThree.sectionFour['Biografía psicológica personal y familiar'].toString().trim() === ''){
        isEmpty.value = true;
        messageAlert.value = 'La biografía psicológica debe estar completada';
        return;
    } else {
        for (const key in dataGuideThree.sectionFour.table) {
            if (dataGuideThree.sectionFour.table.hasOwnProperty(key)) {
                if (dataGuideThree.sectionFour.table[key].toString().trim() === "") {
                    isEmpty.value = true;
                    messageAlert.value = `El campo "${key}" de la biografia psicológica se encuentra vacío, por favor llénalo`;
                    return;
                }
            }
        }
    }
}

async function sendData(){

    try {            
        const res = await axios.post('api/guidethree', {
            patient: dataGuideThree.dataUser['Número de cédula'],
            otherSections: dataGuideThree.otherSections,
            sectionFour: dataGuideThree.sectionFour,
            sectionSix: dataGuideThree.sectionSix,
            date: new Date()
        })
        showModalAlert('Eureka!!', false, {variant: 'success', showRoute: true});
        isSafeToLeave.value = true;
    } catch (error) {
        showModalAlert(error.message, false);
        console.log(error);
    }
}

function showData(){
    isEmpty.value = false;
    messageAlert.value = '';

    checkValues();

    if (isEmpty.value) {
        showModalAlert(messageAlert.value, false, {variant: 'danger'});
    } else {
        showModalAlert('¿Estás seguro de guardar un nuevo paciente?', true, {variant: 'info'});
    }
}
function showInfo(item){
    infoContent.value = getInfoContent(item.code);
    showModal(infoContent.value, item.text);
}
</script>