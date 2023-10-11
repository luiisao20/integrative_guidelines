<template>
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
    />
    <SideBar
        :options="content"
    />
    <div action="" class="pt-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">PLANIFICACIÓN DEL PROCESO</h1>
        <ListAddDelete
            v-for="item in content"
            :title="item.title"
            :content="dataFromGuideThree"
            :data-response="data[item]"
            @push-values="pushObjTechn"
        />
    </div>
    <div class="flex justify-end">
        <ButtonVue class="p-2 mb-10" variant="info" @click="showModalAlert('Enviar', true)">
            Enviar
        </ButtonVue>
    </div>
</template>

<script setup>
import ListAddDelete from '../guide_components/ListAddDelete.vue';
import { reactive } from 'vue';
import ModalAlert from '../general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import ButtonVue from '../general_components/ButtonVue.vue';
import SideBar from '../guide_components/SideBar.vue';

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
const dataFromGuideThree = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo soluta quas explicabo repellat laborum itaque quis corrupti debitis possimus. Dolore dolor nemo reprehenderit libero soluta blanditiis maiores odio non ut?';
const data = reactive({
    'Diagnóstico descriptivo y formulación dinámica del problema': [],
    'Diagnóstico descriptivo y formulación dinámica del trastorno': [],
    'Diagnóstico descriptivo y formulación dinámica de la personalidad': []
})
const { opacity, modalAlert, showModalAlert } = useModal();

function pushObjTechn(objective, technique, ubication){

    if(objective.toString().trim() === '' || technique.toString().trim() === ''){
        showModalAlert('Los objetivos y técnicas no pueden estar vacíos', false, {variant: 'danger'});
    } else if(data[ubication].some(value => JSON.stringify(value) === JSON.stringify({objective: objective, technique: technique}))){
        showModalAlert('No puedes volver a repetir los mismos valores', false, {variant: 'danger'});
    } else {            
        data[ubication].push({
            objective: objective,
            technique: technique
        })
    }
}
</script>