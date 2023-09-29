<template>
    <Modal
        v-bind="modal"
        @close-mod="modal.showModal = false; opacity = '1'"
    />
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
    />
    <form class="pt-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">FICHA INTEGRATIVA DE EVALUACIÓN PSICOLÓGICA FIEPS</h1>
        <UserData
            @update="getInfoData"
        />
        <!-- Sección 2 y 3 -->
        <TextArea
            v-for="item in demands.slice(0, 3)"
            v-model:text-value="dataGuideThree.ohterSections[item.text]"
            :item="item"
            @showModalInfo="showInfo"
        />
        <!-- Sección 4 -->
        <SectionFour 
            @update="getInfoSectFour"
            :item="demands[3]"
            @show-info="showInfo"
        />
        <h2 class="text-xl mt-10 normal-case font-bold">Resultados de pruebas psicológicas</h2>
        <!-- Sección 5 -->
        <TextArea
            v-model:text-value="dataGuideThree.ohterSections[demands[4].text]"
            :item="demands[4]"
            @showModalInfo="showInfo"
        />
        <h2 class="text-xl mt-10 normal-case font-bold">Conclusiones diagnósticas</h2>
        <!-- Sección 6 -->
        <TextArea
            v-for="item in demands.slice(5, 8)"
            v-model:text-value="dataGuideThree.sectionSix[item.text]"
            :item="item"
            @showModalInfo="showInfo"
        />
        <!-- Sección 7 y 8 -->
        <TextArea
            v-for="item in demands.slice(8)"
            v-model:text-value="dataGuideThree.ohterSections[item.text]"
            :item="item"
            @showModalInfo="showInfo"
        />
        <Button class="p-2 mb-10" variant="info" type="submit" @click.prevent="console.log('hola')">
            Guardar paciente
        </Button>
        <Button class="p-2 mb-10" variant="secondary" type="button" @click="showData">
            Siguiente
        </Button>
    </form>
</template>

<script setup>
import UserData from '../components/GuideThree/UserData.vue';
import Button from '../components/Button.vue';
import SectionFour from '../components/GuideThree/SectionFour.vue';
import TextArea from '../components/GuideThree/TextArea.vue';
import Modal from '../components/Modal.vue';
import ModalAlert from '../components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import { ref, reactive } from 'vue';
import { getInfoContent } from '@/composables/infoDemands.js';

const { opacity, modal, showModal, modalAlert, showModalAlert } = useModal();
const infoContent = ref({});
const dataGuideThree = reactive({
    dataUser: {
        'id': '',
    },
    ohterSections: {
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
        text: 'Consignar los resultados de las pruebas psicológicas:'
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

function getInfoSectFour(data){
    dataGuideThree.sectionFour = data;
}

function getInfoData(data){
    dataGuideThree.dataUser = data;
}

/**
 * Recorre todo el formulario en busca de campos vacíos y retorna 
 * en caso de encontrarlos
 */
function checkValues(){
    const keysExcluded = ['otherAttention', 'email'];
    // Data User
    for (const key in dataGuideThree.dataUser) {
        if (dataGuideThree.dataUser.hasOwnProperty(key) && !keysExcluded.some(value => value === key)) {
            if (dataGuideThree.dataUser[key].toString().trim() === "") {
                isEmpty.value = true;
                messageAlert.value = `Existe un campo vacío en los datos informativos del paciente, por favor llénalo`;
                return;
            }
        }
    }

    // Other sections
    for (const key in dataGuideThree.ohterSections) {
        if (dataGuideThree.ohterSections.hasOwnProperty(key)) {
            if (dataGuideThree.ohterSections[key].toString().trim() === "") {
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

function showData(){
    isEmpty.value = false;
    messageAlert.value = '';

    console.log(dataGuideThree);

    if (!/^\d*$/.test(dataGuideThree.dataUser.id) || dataGuideThree.dataUser.id.length !== 10){
        isEmpty.value = true;
        messageAlert.value = 'El número de cédula es incorrecto, recuerda que necesita 10 dígitos y sólo contiene números.';
    } else if (dataGuideThree.dataUser.attentionType === 'other' && dataGuideThree.dataUser.otherAttention.trim() === '' || dataGuideThree.dataUser.attentionType === 'Tipo de atención') {
        isEmpty.value = true;
        messageAlert.value = 'Para el tipo de atención: "Otros ¿Cuál?", debes llenar casilla "Otro tipo de atención."';
    } else if(isNaN((new Date(`${dataGuideThree.dataUser.birthdayMonth}/${dataGuideThree.dataUser.birthdayDay}/${dataGuideThree.dataUser.birthdayYear}`)).getTime())){
        isEmpty.value = true;
        messageAlert.value = 'La fecha de nacimiento no es correcta, revisa el formato por favor.';
    } else {
        checkValues();
    } 
    console.log(new Date(`${dataGuideThree.dataUser.birthdayMonth}/${dataGuideThree.dataUser.birthdayDay}/${dataGuideThree.dataUser.birthdayYear}`));
    if (isEmpty.value) {
        showModalAlert(messageAlert.value, false, {variant: 'danger'});
    } else {
        showModalAlert('¿Estás seguro de guardar un nuevo paciente?', true, {variant: 'info'});
    }
}
function showInfo(item){
    console.log(dataGuideThree['Demanda explícita']);
    infoContent.value = getInfoContent(item.code);
    showModal(infoContent.value, item.text);
}
</script>