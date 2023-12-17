<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; 
                    opacity = '1';
                    if(goBack) {router.push(`/${id}/process/${processid}/guidesix`)};"
        @send-data="sendData"
        @go-route="router.push(`/${id}/process/${processid}/guidesix`)"
        :is-loading="isLoading.sending"
    />
    <Modal 
        v-bind="modal"
        @close-mod="modal.showModal = false; opacity = '1'"
    />
    <div v-if="isLoading.data" class="flex justify-center">
        <Spinner class="text-4xl py-20"/>
    </div>
    <section v-else class="py-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">
            EVOLUCIÓN
            <PopOver variant="info" text-info="Para agregar cada evolución, escribe en los cuadros de texto y da clic en el botón verde. No puedes agregar campos vacíos ni repetidos y debes seguir el formato de la fecha" />
        </h1>
        <h1 class="pt-5"><span class="font-bold">Paciente:</span> {{ patient.Apellidos }} {{ patient.Nombres }}</h1>
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
            <ButtonVue class="p-2" variant="main" type="button" @click="checkValues">
                Enviar
            </ButtonVue>
            <ButtonVue :is-disabled="isLoading.info" v-bind:class="{ cursorPointer: isLoading.info }" @click="showInfo" class="p-3" variant="info" type="button">
                Más info
            </ButtonVue>
        </div>
    </section>
</template>

<script setup>
import ListAddDelete from '@/guide_components/ListAddDelete.vue';
import { ref, onBeforeMount, reactive } from 'vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import ButtonVue from '@/general_components/ButtonVue.vue';
import { getInfoContent } from '@/composables/infoDemands.js';
import Modal from '@/general_components/Modal.vue';
import { formatDate } from '@/composables/formatDate';
import { router } from '../../routes';
import { onBeforeRouteLeave } from 'vue-router';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '@/main.js';
import Spinner from '../../general_components/Spinner.vue';
import PopOver from '@/general_components/PopOver.vue';
import { fetchGuide } from '@/composables/fetchGuides';

const content = {
    title: 'Ejecución y aplicación técnica',
    code: 'guide-six'
}
const { opacity, modalAlert, showModalAlert, modal, showModal } = useModal();
const data = ref([]);
const infoContent = ref({});
const props = defineProps(['id', 'processid']);
const isSafeToLeave = ref(false);
const goBack = ref(false);
const patient = ref({});
const isLoading = reactive({
    data: false, sending: false, info: false
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
    patient.value = { ...docSnap.data().dataPatient };

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

function pushObjTechn(objective, technique, ubication, date){
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

async function showInfo(){
    isLoading.info = true;
    infoContent.value = await getInfoContent(content.code);
    showModal(infoContent.value, content.title);
    isLoading.info = false;
}

function checkValues() {
    if (data.value.length === 0) showModalAlert('No puedes guardar la guia vacía', false, {variant: 'danger'});
    else showModalAlert('¿Estás seguro de guardar los datos?', true, {variant: 'info'});
}

async function sendData() {
    isLoading.sending = true;
    try {
        await addDoc(collection(db, 'guidesix'), {
            patient: props.id,
            data: data.value,
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

<style scoped>
.cursorPointer {
    cursor: progress;
}
</style>