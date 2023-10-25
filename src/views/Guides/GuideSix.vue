<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendData"
        @go-route="router.push(`/${id}/guidesix`)"
    />
    <Modal 
        v-bind="modal"
        @close-mod="modal.showModal = false; opacity = '1'"
    />
    <section class="py-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">EVOLUCIÓN</h1>
        <ListAddDelete
            :title="content.title"
            :show-data-from-other-guide="false"
            :data-response="data"
            @push-values="pushObjTechn"
            title-one="Evolución"
            title-two="Actividad"
            :show-date="true"
        />
        <div class="flex flex-row justify-between items-center w-[70%] mx-auto">
            <ButtonVue class="p-2" variant="main" type="button" @click="showModalAlert('Enviar', true)">
                Enviar
            </ButtonVue>
            <ButtonVue @click="showInfo" class="p-3" variant="info" type="button">
                Más info
            </ButtonVue>
        </div>
    </section>
</template>

<script setup>
import ListAddDelete from '@/guide_components/ListAddDelete.vue';
import { ref } from 'vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import ButtonVue from '@/general_components/ButtonVue.vue';
import { getInfoContent } from '@/composables/infoDemands.js';
import Modal from '@/general_components/Modal.vue';
import { formatDate } from '@/composables/formatDate';
import { router } from '../../routes';
import axios from 'axios';
import { onBeforeRouteLeave } from 'vue-router';

const content = {
    title: 'Ejecución y aplicación técnica',
    code: 'guide-six'
}
const { opacity, modalAlert, showModalAlert, modal, showModal } = useModal();
const data = ref([]);
const infoContent = ref({});
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

function pushObjTechn(objective, technique, ubication, date){
    console.log(date);
    if(objective.toString().trim() === '' || technique.toString().trim() === '' || isNaN((new Date(date)).getTime())){
        showModalAlert('Debes llenar todos los datos, incluida la fecha.', false, {variant: 'danger'});
    } else if(data.value.some(value => JSON.stringify(value) === JSON.stringify({objective: objective, technique: technique, date: formatDate(date)}))){
        showModalAlert('No puedes volver a repetir los mismos valores', false, {variant: 'danger'});
    } else {            
        data.value.push({
            objective: objective,
            technique: technique,
            date: formatDate(date)
        })
    }
}

function showInfo(){
    infoContent.value = getInfoContent(content.code);
    showModal(infoContent.value, content.title);
}

async function sendData() {
    try {
        const res = await axios.post('http://localhost:3000/guidesix', {
            patient: props.id,
            data: data.value,
            date: new Date()
        })
        showModalAlert('Eureka!!', false, {variant: 'success', showRoute: true});
        isSafeToLeave.value = true;
    } catch (error) {
        showModalAlert(error, false, {variant: 'danger'})
    }
}
</script>