<template>
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendData"
        @go-route="router.push(`/${id}/guidefive`)"
    />
    <SideBar
        :options="content"
    />
    <div action="" class="pt-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">PLANIFICACIÓN DEL PROCESO</h1>
        <div v-for="item in content" v-if="!isLoading">
            <ListAddDelete
                v-if="dataCopy[0].sectionSix[item.title].toString().trim() !== ''"
                :title="item.title"
                :content="dataCopy[0].sectionSix[item.title]"
                :data-response="dataGuideFive[item.title]"
                @push-values="pushObjTechn"
            />
        </div>
    </div>
    <div class="flex justify-end">
        <ButtonVue class="p-2 mb-10" variant="info" @click="showModalAlert('Enviar', true)">
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
import { useFetch } from '@/composables/fetch';
import { router } from '../../routes';
import axios from 'axios';
import { onBeforeRouteLeave } from 'vue-router';

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
    'Diagnóstico descriptivo y formulación dinámica del problema': [],
    'Diagnóstico descriptivo y formulación dinámica del trastorno': [],
    'Diagnóstico descriptivo y formulación dinámica de la personalidad': []
})
const { opacity, modalAlert, showModalAlert } = useModal();
const isLoading = ref(false);
const dataCopy = ref([]);
const props = defineProps({
    id: {
        required: true,
        type: String
    }
})
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
    isLoading.value = true;
    const { data, error } = await useFetch(`guidethree?patient=${props.id}`);

    dataCopy.value = [ ...data.value ];

    console.log(dataCopy.value);

    isLoading.value = false;
})

async function sendData() {
    try {
        const res = await axios.post('http://localhost:3000/guidefive', {
            patient: props.id,
            dataGuideFive,
            date: new Date()
        })
        showModalAlert('Eureka!!', false, {variant: 'success', showRoute: true});
        isSafeToLeave.value = true;
    } catch (error) {
        showModalAlert(error, false, {variant: 'danger'})
    }
}
</script>