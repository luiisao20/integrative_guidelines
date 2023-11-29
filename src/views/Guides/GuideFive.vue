<template>
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendData"
        @go-route="router.push(`/${id}/process/${processid}/guidefive`)"
        :is-loading="isLoading.sending"
    />
    <SideBar
        :options="content"
    />
    <h1 class="text-2xl pt-10 font-bold text-center">PLANIFICACIÓN DEL PROCESO</h1>
    <div v-if="isLoading.data" class="flex justify-center">
        <Spinner class="text-4xl py-20" />
    </div>
    <div v-else :style="{ opacity: opacity }">
        <h1 class="py-5"><span class="font-bold">Paciente:</span> {{ patient.Apellidos }} {{ patient.Nombres }}</h1>
        <div v-for="item in content">
            <ListAddDelete
                v-if="dataCopy[item.title].toString().trim() !== ''"
                :title="item.title"
                :content="dataCopy[item.title]"
                :data-response="dataGuideFive[item.title]"
                @push-values="pushObjTechn"
            />
        </div>
    </div>
    <div class="flex justify-end">
        <ButtonVue class="p-2 mb-10" variant="info" @click="checkValues">
            Enviar
        </ButtonVue>
    </div>
</template>

<script setup>
import ListAddDelete from '@/guide_components/ListAddDelete.vue';
import { reactive, onBeforeMount, ref } from 'vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import ButtonVue from '@/general_components/ButtonVue.vue';
import SideBar from '@/guide_components/SideBar.vue';
import { router } from '../../routes';
import { onBeforeRouteLeave } from 'vue-router';
import { fetchGuide } from '@/composables/fetchGuides';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '@/main.js';
import Spinner from '../../general_components/Spinner.vue';
import { formatDate } from '@/composables/formatDate';

const content = [
    {
        title: 'Diagnóstico descriptivo y formulación dinámica del problema',

    },
    {
        title: 'Diagnóstico descriptivo y formulación dinámica del trastorno',

    }, 
    {
        title: 'Diagnóstico descriptivo y formulación dinámica de la personalidad'
    }
]
const dataGuideFive = reactive({
})
const { opacity, modalAlert, showModalAlert } = useModal();
const isLoading = reactive({
    data: false, sending: false
});
const dataCopy = ref({});
const props = defineProps(['id', 'processid']);
const isSafeToLeave = ref(false);
const isEmpty = ref(false);
const patient = ref({});
const modalMessage = ref('');

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

function checkValues() {
    isEmpty.value = false;
    modalMessage.value = '';
    console.log(dataGuideFive);
    for (const key in dataGuideFive) {
        if (dataGuideFive[key].length === 0){
            isEmpty.value = true;
            modalMessage.value = 'Debes agregar al menos un objetivo y técnica por cada diagnóstico';
            break
        }
    }

    if (isEmpty.value) {
        showModalAlert(modalMessage.value, false, {variant: 'danger'});
    } else {
        showModalAlert('¿Estás seguro de guardar los datos?', true, {variant: 'info'});
    }
}

window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = '';
})

function pushObjTechn(objective, technique, ubication){

    if(objective.toString().trim() === '' || technique.toString().trim() === ''){
        showModalAlert('Los objetivos y técnicas no pueden estar vacíos', false, {variant: 'danger'});
    } else if(dataGuideFive[ubication].some(value => JSON.stringify(value) === JSON.stringify({objective: objective, technique: technique}))){
        showModalAlert('No puedes volver a repetir los mismos valores', false, {variant: 'danger'});
    } else {
        dataGuideFive[ubication].push({
            objective: objective,
            technique: technique
        })
    }
}

onBeforeMount(async() => {
    isLoading.data = true;

    const { data, error } = await fetchGuide('guidethree', props.id, props.processid);
    const patientRef = doc(db, 'patients', `${props.id}`);
    const docSnap = await getDoc(patientRef);

    dataCopy.value = { ...data.data().sectionSix };
    patient.value = docSnap.data().dataPatient;

    for (const key in dataCopy.value){
        if (dataCopy.value[key].length > 0) dataGuideFive[key] = [];
    }

    isLoading.data = false;
})

async function sendData() {
    isLoading.sending = true;
    try {
        await addDoc(collection(db, 'guidefive'), {
            patient: props.id,
            dataGuideFive: dataGuideFive,
            date: formatDate(new Date()),
            process: props.processid
        })
        showModalAlert('Eureka!!', false, {variant: 'success', showRoute: true});
        isSafeToLeave.value = true;
    } catch (error) {
        showModalAlert(error, false, {variant: 'danger'})
    }
    isLoading.sending = false;
}
</script>