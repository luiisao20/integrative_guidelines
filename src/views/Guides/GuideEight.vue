<template>
    <SideBar
        :options="content"
    />
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendData"
        @go-route="router.push(`/${id}/guideeight`)"
    />
    <form class="py-10" :style="{ opacity: opacity }" v-if="!isLoading">
        <h1 :id="content[0].title" class="text-2xl font-bold bg-light p-4 text-center">EVALUACION FINAL DEL PROCESO PSICOTERAPÉUTICO</h1>
        <TableObjectives
            :content="content[0].options"
            :data="dataGuideEight.tableOne"
        />
        <h1 class="text-2xl mb-4 font-bold text-center">TÉCNICAS EMPLEADAS Y GRADO DE EFICACIA</h1>
        <div v-for="(item, key) in dataTechniques">
            <div :id="key" v-if="dataCopy[0].dataGuideFive[item].length > 0">
                <RadioBox 
                    :techniques="true"
                    :title-table="key"
                    :content="dataCopy[0].dataGuideFive[item]"
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
            <ButtonVue class="mt-10 p-2" type="submit" variant="info" @click.prevent="confirmData">
                Enviar
            </ButtonVue>
        </div>
    </form>
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
import { useFetch } from '@/composables/fetch';
import { router } from '../../routes';
import axios from 'axios';

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
        'Asesoramiento': {},
        'Sintomáticas': {},
        'De personalidad': {}
    },
})
const isEmpty = ref(false);
const modalMessage = ref('');
const isLoading = ref(false);
const dataCopy = ref([]);
const props = defineProps(['id']);
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

onBeforeMount(async() => {

    isLoading.value = true;

    const { data, error } = await useFetch(`guidefive?patient=${props.id}`);

    dataCopy.value = [ ...data.value ];

    isLoading.value = false;
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
        console.log(key);
        console.log(dataCopy.value[0].dataGuideFive[dataTechniques[key]]);
        if (Object.keys(dataGuideEight.techniques[key]).length !== dataCopy.value[0].dataGuideFive[dataTechniques[key]].length ){
            isEmpty.value = true;
            modalMessage.value = 'Por cada técnica debes elegir una opción';
            return
        }
    }

    for (const key in dataGuideEight.interrogations){
        for (const subkey in dataGuideEight.interrogations[key]){
            if(dataGuideEight.interrogations[key][subkey].toString().trim() === ''){
                isEmpty.value = true;
                modalMessage.value = `El campo "${key}" de las Interrogantes al finalizar el proceso tiene que ser llenado`;
                return
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
        showModalAlert('Eureka', true);
    }
}

async function sendData() {
    try {
        const res = await axios.post('http://localhost:3000/guideeight', {
            patient: props.id,
            dataGuideEight,
            date: new Date()
        })
        showModalAlert('Eureka!!', false, {variant: 'success', showRoute: true});
        isSafeToLeave.value = true;
    } catch (error) {
        showModalAlert(error, false, {variant: 'danger'})
    }
}
</script>