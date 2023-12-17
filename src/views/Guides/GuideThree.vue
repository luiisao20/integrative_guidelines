<template>
    <Modal
        v-bind="modal"
        @close-mod="modal.showModal = false; opacity = '1'"
    />
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; 
                    opacity = '1';
                    if(goBack) {router.push(`/${id}/process/${processid}/guidethree`)};"
        @send-data="sendData"
        @go-route="router.push(`/${id}/process/${processid}/guidethree`)"
        :is-loading="isLoading.sending"
    />
    <SideBar 
        :options="demands"
        title="text"
    />
    <form @submit.prevent="showData" v-if="!isLoading.data" class="pt-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">FICHA INTEGRATIVA DE EVALUACIÓN PSICOLÓGICA FIEPS</h1>
        <h1 class="py-5"><span class="font-bold">Paciente:</span> {{ patient.Apellidos }} {{ patient.Nombres }}</h1>
        <!-- Sección 2 y 3 -->
        <div v-for="(item, index) in demands.slice(0, 3)" :id="item.text" :key="index">
            <TextArea
                :text-value="dataGuideThree.otherSections"
                :item="item"
                @showModalInfo="showInfo"
                :is-loading="isLoading.info"
            />
        </div>
        <!-- Sección 5 -->
        <div :id="demands[4].text" >
            <TextArea
                :text-value="dataGuideThree.otherSections"
                :item="demands[4]"
                @showModalInfo="showInfo"
                :is-loading="isLoading.info"
            />
        </div>
        <h2 class="text-xl mt-10 normal-case font-bold">Conclusiones diagnósticas</h2>
        <!-- Sección 6 -->
        <div v-for="(item, index) in demands.slice(5, 8)" :id="item.text" :key="index">
            <TextArea
                :text-value="dataGuideThree.sectionSix"
                :item="item"
                :is-loading="isLoading.info"
                @showModalInfo="showInfo"
            />
        </div>
        <!-- Sección 7 y 8 -->
        <div v-for="(item, index) in demands.slice(8)" :key="index" :id="item.text">
            <TextArea
                :text-value="dataGuideThree.otherSections"
                :item="item"
                :is-loading="isLoading.info"
                @showModalInfo="showInfo"
            />
        </div>
        <ButtonVue class="p-4 mb-10" variant="secondary" type="submit">
            Enviar
        </ButtonVue>
    </form>
    <div v-else class="flex justify-center">
        <Spinner class="text-4xl py-20"/>
    </div>
</template>

<script setup>
import TextArea from '@/guide_components/TextArea.vue';
import Modal from '@/general_components/Modal.vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import { ref, reactive, onBeforeMount } from 'vue';
import { getInfoContent } from '@/composables/infoDemands.js';
import ButtonVue from '@/general_components/ButtonVue.vue';
import SideBar from '@/guide_components/SideBar.vue';
import { onBeforeRouteLeave } from 'vue-router';
import { router } from '../../routes';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '@/main.js';
import { formatDate } from '@/composables/formatDate';
import Spinner from '../../general_components/Spinner.vue';
import { fetchGuide } from '@/composables/fetchGuides';

const { opacity, modal, showModal, modalAlert, showModalAlert } = useModal();
const infoContent = ref({});
const dataGuideThree = reactive({
    otherSections: {
        'Demanda explícita':'',
        'Demanda implícita': '',
        'Antecedentes disfuncionales': '',
        'Resultados de las pruebas psicológicas': '',
        'Criterios pronósticos': '',
        'Recomendaciones': '',
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
const isLoading = reactive({
    data: false, sending: false, info: false
});
const messageAlert = ref('');
const isSafeToLeave = ref(false);
const goBack = ref(false);
const props = defineProps(['id', 'processid']);
const processName = ref('');
const dataCopy = ref([]);
const patient = ref({});

onBeforeMount(async() => {
    isLoading.data = true;

    const res = await fetchGuide('guideeight', props.id, props.processid);

    if (res.go) {
        showModalAlert('Esta guía ya está creada, no puedes sobreescribirla', false, {variant: 'danger'});
        goBack.value = true;
        isSafeToLeave.value = true;
        return
    }

    const patientRef = doc(db, 'patients', `${props.id}`);
    const docSnap = await getDoc(patientRef);

    const processRef = doc(db, 'processes', `${props.processid}`);
    const processSnap = await getDoc(processRef);

    patient.value = { ...docSnap.data().dataPatient };
    dataCopy.value = [ ...docSnap.data().biography ];
    processName.value = processSnap.data().processName;

    isLoading.data = false;
})

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
}

async function sendData(){
    isLoading.sending = true;

    try {              
        await addDoc(collection(db, 'guidethree'), {
            patient: props.id,
            otherSections: dataGuideThree.otherSections,
            sectionSix: dataGuideThree.sectionSix,
            date: formatDate(new Date()),
            process: props.processid
        })

        showModalAlert('¡Datos guardados! Visita la guía dando click en "Ir"', false, {variant: 'success', showRoute: true});
        goBack.value = true;
        isSafeToLeave.value = true;
    } catch (error) {
        showModalAlert(error.message, false);
        console.log(error);
    }
    isLoading.sending = false;
}

function showData(){
    isEmpty.value = false;
    messageAlert.value = '';

    checkValues();

    if (isEmpty.value) {
        showModalAlert(messageAlert.value, false, {variant: 'danger'});
    } else {
        showModalAlert('¿Estás seguro de guardar los datos?', true, {variant: 'info'});
    }
}
async function showInfo(item){
    isLoading.info = true;
    infoContent.value = await getInfoContent(item.code);
    showModal(infoContent.value, item.text);
    isLoading.info = false;
}
</script>