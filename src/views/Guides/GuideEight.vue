<template>
    <SideBar
        :options="content"
    />
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; 
                    opacity = '1';
                    if(goBack) {router.push(`/${id}/process/${processid}/guideeight`)};"
        @send-data="sendData"
        @go-route="router.push(`/${id}/process/${processid}/guideeight`)"
        :is-loading="isLoading.sending"
    />
    <h1 :id="content[0].title" class="text-2xl pt-10 font-bold text-center">EVALUACION FINAL DEL PROCESO PSICOTERAPÉUTICO</h1>
    <form @submit.prevent="confirmData" :style="{ opacity: opacity }" v-if="!isLoading.data">
        <h1 class="pt-5"><span class="font-bold">Paciente:</span> {{ patient.Apellidos }} {{ patient.Nombres }}</h1>
        <TableObjectives
            :content="content[0].options"
            :data="dataGuideEight.tableOne"
        />
        <h1 class="text-2xl mb-4 font-bold text-center">
            TÉCNICAS EMPLEADAS Y GRADO DE EFICACIA
            <PopOver variant="info" text-info="Toda la tabla tiene que ser llenada" />
        </h1>
        <div v-for="(item, key) in dataTechniques">
            <div :id="key" v-if="dataCopy.dataGuideFive[item] !== undefined">
                <RadioBox 
                    :techniques="true"
                    :title-table="key"
                    :content="dataCopy.dataGuideFive[item]"
                    :data="dataGuideEight.techniques[key]"
                />
            </div>
        </div>
        <h1 :id="content[4].title" class="mt-10 text-2xl font-bold text-center">Interrogantes al finalizar el proceso</h1>
        <TableInterrogations
            :content="content[4].options"
            :data="dataGuideEight.interrogations"
        />
        <div class="flex justify-end">
            <ButtonVue class="my-10 p-2" type="submit" variant="info">
                Enviar
            </ButtonVue>
        </div>
    </form>
    <div v-else class="flex justify-center">
        <Spinner class="text-4xl py-20"/>
    </div>
</template>

<script setup>
import TableObjectives from '@/guide_components/TableObjectives.vue'
import { reactive, ref, onBeforeMount } from 'vue';
import ButtonVue from '@/general_components/ButtonVue.vue';
import TableInterrogations from '@/guide_components/TableInterrogations.vue';
import RadioBox from '@/guide_components/RadioBox.vue';
import SideBar from '@/guide_components/SideBar.vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import { onBeforeRouteLeave } from 'vue-router';
import { router } from '../../routes';
import { fetchGuide } from '@/composables/fetchGuides';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '@/main.js';
import Spinner from '../../general_components/Spinner.vue';
import { formatDate } from '@/composables/formatDate';
import PopOver from '@/general_components/PopOver.vue';

const { opacity, modalAlert, showModalAlert } = useModal();
const content = [
    {
        title: 'EVALUACION FINAL DEL PROCESO PSICOTERAPÉUTICO',
        options: [
            {
                title: 'PROCESO',
                options: ['Asesoramiento', 'Psicoterapia']
            },
            {
                title: 'OBJETIVOS ESTABLECIDOS',
                options: ['Asesoramiento', 'Sintomáticos', 'De personalidad']
            },
            {
                title: 'CUMPLIMIENTO DE OBJETIVOS',
                options: ['Paciente', 'Familiares', 'Terapeuta']
            },
        ]
    },
    {
        title: 'Asesoramiento'
    },
    {
        title: 'Sintomáticas'
    },
    {
        title: 'De personalidad'
    },
    {
        title: 'Interrogantes al finalizar el proceso',
        options: [
            {
                subtitle: 'Finalización del proceso',
                options: []
            },
            {
                subtitle: 'Cumplimiento de expectativas',
                options: ['Paciente', 'Familiares', 'Instituciones', 'Otros', 'Terapeuta']
            },
            {
                subtitle: 'Tratamiento mixto',
                options: []
            },
            {
                subtitle: 'Derivación del paciente a otro profesional',
                options: []
            },
            {
                subtitle: 'Deserción del paciente',
                options: []
            },
        ]
    }
]
const dataTechniques = {
    'Asesoramiento': 'Diagnóstico descriptivo y formulación dinámica del problema',
    'Sintomáticas': 'Diagnóstico descriptivo y formulación dinámica del trastorno',
    'De personalidad': 'Diagnóstico descriptivo y formulación dinámica de la personalidad'
}
const dataGuideEight = reactive({
    tableOne: {
        'PROCESO': '',
        'OBJETIVOS ESTABLECIDOS': [],
        'Paciente': {
            rate: '',
            observations: ''
        }, 
        'Familiares': {
            rate: '',
            observations: ''
        }, 
        'Terapeuta': {
            rate: '',
            observations: ''
        }
    },
    interrogations: {
        'Finalización del proceso': {
            option: '',
            why: ''
        },
        'Paciente': {
            option: '',
            why: ''
        },
        'Familiares': {
            option: '',
            why: ''
        },
        'Instituciones': {
            option: '',
            why: ''
        },
        'Otros': {
            option: '',
            why: ''
        },
        'Terapeuta': {
            option: '',
            why: ''
        },
        'Tratamiento mixto': {
            option: '',
            why: ''
        },
        'Derivación del paciente a otro profesional': {
            option: '',
            why: ''
        },
        'Deserción del paciente': {
            option: '',
        }
    },
    techniques: {
    },
})
const isEmpty = ref(false);
const goBack = ref(false);
const modalMessage = ref('');
const dataCopy = ref({});
const patient = ref({});
const props = defineProps(['id', 'processid']);
const isSafeToLeave = ref(false);
const isLoading = reactive({
    data: false, sending: false
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
    const { data, go } = await fetchGuide('guidefive', props.id, props.processid);

    dataCopy.value = { ...data.data() };
    patient.value = docSnap.data().dataPatient;

    for (const key in dataTechniques){
        if (dataCopy.value.dataGuideFive[dataTechniques[key]] !== undefined) dataGuideEight.techniques[key] = {}
    }


    isLoading.data = false;
})

function checkValues(){
    const keysExcluded = ['PROCESO', 'OBJETIVOS ESTABLECIDOS'];
    if (dataGuideEight.tableOne.PROCESO === '' || dataGuideEight.tableOne['OBJETIVOS ESTABLECIDOS'].length === 0){
        isEmpty.value = true;
        modalMessage.value = 'El "Proceso" o los "Objetivos establecidos" están vacíos';
        return
    }

    let count = 0;
    for (const key in dataGuideEight.tableOne){
        if (!keysExcluded.some(value => value === key)){
            if (dataGuideEight.tableOne[key].rate.toString().trim() === '' && dataGuideEight.tableOne[key].observations.toString().trim() === ''){
                count++
            }

            if (count === 3){
                isEmpty.value = true;
                modalMessage.value = 'Tienes que llenar al menos un cumplimiento de objetivos';
                return
            }
        }
    }

    for (const key in dataGuideEight.techniques) {
        if (Object.keys(dataGuideEight.techniques[key]).length !== dataCopy.value.dataGuideFive[dataTechniques[key]].length){
            isEmpty.value = true;
            modalMessage.value = 'Por cada técnica debes elegir una opción';
            return
        }
    }

    const keysExcludedIntrg = ['Paciente', 'Terapeuta', 'Familiares', 'Instituciones', 'Otros', 'Deserción del paciente'];
    let countIntrg = 0;
    for (const key in dataGuideEight.interrogations){
        if (!keysExcludedIntrg.some(value => value === key) || keysExcludedIntrg.slice(0, 2).some(value => value === key)){
            for (const subkey in dataGuideEight.interrogations[key]){
                if(dataGuideEight.interrogations[key][subkey].toString().trim() === ''){
                    isEmpty.value = true;
                    modalMessage.value = `El campo "${key}" de las Interrogantes al finalizar el proceso tiene que ser llenado`;
                    return
                }
            }
        } else if (key === 'Deserción del paciente') {
            if(dataGuideEight.interrogations[key].option.toString().trim() === '' || 
                (dataGuideEight.interrogations[key].option === 'Sí' && dataGuideEight.interrogations[key].why.toString().trim() === '')){
                isEmpty.value = true;
                modalMessage.value = `El campo "${key}" de las Interrogantes al finalizar el proceso tiene que ser llenado`;
                return
            }
        } else {
            for (const subkey in dataGuideEight.interrogations[key]){
                if(dataGuideEight.interrogations[key][subkey].toString().trim() === ''){
                    countIntrg++
                }
                if (countIntrg === 6){
                    isEmpty.value = true;
                    modalMessage.value = 'Tienes que llenar al menos un cumplimiento de expectativas';
                    return
                }
            }
        }
    }
}

function confirmData(){
    isEmpty.value = false;
    modalMessage.value = '';
    checkValues();

    if (isEmpty.value) {
        showModalAlert(modalMessage.value, false, {variant: 'danger'});
    } else {
        showModalAlert('¿Estás seguro de guardar los datos?', true);
    }
}

async function sendData() {
    isLoading.sending = true;
    try {

        await addDoc(collection(db, 'guideeight'), {
            patient: props.id,
            dataGuideEight: dataGuideEight,
            date: formatDate(new Date()),
            process: props.processid
        })
        showModalAlert('¡Datos guardados! Visita la guía dando click en "Ir"', false, {variant: 'success', showRoute: true});
        goBack.value = true;
        isSafeToLeave.value = true;
    } catch (error) {
        showModalAlert(error, false, {variant: 'danger'})
    }
    isLoading.sending = false;
}
</script>