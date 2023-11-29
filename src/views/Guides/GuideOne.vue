<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendData"
        @go-route="router.push(`/${id}/process/${processid}/guideone`)"
        :is-loading="isLoading.sending"
    />
    <SideBar
        :options="content"
    />
    <form v-if="!isLoading.data" class="py-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">ANÁLISIS DE LA DEMANDA, EXPECTATIVAS Y MOTIVACIONES PREVIAS AL INICIO DEL PROCESO</h1>
        <h1 class="pt-5"><span class="font-bold">Paciente:</span> {{ patient.Apellidos }} {{ patient.Nombres }}</h1>
        <p class="text-sm mt-5">Luego del primer contacto, telefónico o presencial, los datos iniciales de la ficha recogen datos del origen, el tipo de demanda, las demandas y expectativas en los ámbitos señalados</p>
        <p class="text-sm mt-5">Escoge por lo menos una opción en cada apartado</p>
        <h2 class="mt-10 text-center font-semibold text-gray-900 dark:text-white">DEMANDA PSICOLÓGICA</h2>
        <div class="flex flex-row gap-10 mt-2">
            <div :id="item.title" class="w-1/2" v-for="(item, index) in content.slice(0, 2)" :key="index">
                <CheckBox
                    v-model:options-selected="optionsSelected[`${item.title}`]"
                    :item="item"
                />
            </div>
        </div>
        <h2 class="mt-10 text-center font-semibold text-gray-900 dark:text-white">EXPECTATIVAS Y MOTIVACIONES</h2>
        <div class="flex flex-col gap-10 mt-2">
            <div :id="item.title" class="w-full md:w-[70%] mx-auto" v-for="(item, index) in content.slice(2)" :key="index">
                <CheckBox
                    v-model:options-selected="optionsSelected[`${item.title}`]"
                    :item="item"
                />
            </div>
        </div>
        <div class="flex justify-end">
            <ButtonVue class="mt-10 p-2" type="submit" variant="info" @click.prevent="checkValues">
                Enviar datos
            </ButtonVue>
        </div>
    </form>
    <div v-else class="flex justify-center">
        <Spinner class="text-4xl py-20"/>
    </div>
</template>

<script setup>
import CheckBox from '@/guide_components/CheckBox.vue'
import { reactive, ref, onBeforeMount } from 'vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import ButtonVue from '@/general_components/ButtonVue.vue';
import SideBar from '@/guide_components/SideBar.vue'
import { router } from '@/routes';
import { onBeforeRouteLeave } from 'vue-router';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '@/main.js';
import { formatDate } from '@/composables/formatDate';
import Spinner from '../../general_components/Spinner.vue';

const content = [
    {
        title: 'Origen',
        options: [
            'Paciente', 'Familiar', 'Profesional', 'Otros'
        ]
    },
    {
        title: 'Tipo de demanda',
        options: [
            'Asesoramiento', 'Psicoterapia'
        ]
    },
    {
        title: 'Paciente',
        options: [
            'Búsqueda de ayuda o supresión de síntomas', 
            'Complacencia a familiares y allegados',
            'Remisión de otros profesionales',
            'Exigencia de status',
            'Curiosidad',
            'Otras'
        ]
    },
    {
        title: 'Terapeuta',
        options: [
            'Vocación de ayuda', 
            'Adquisición de experiencia',
            'Fenómenos contra-transferenciales',
            'Factores económicos',
            'Obligación institucional',
            'Otras'
        ]
    },
    {
        title: 'Familiares, amigos e instituciones',
        options: [
            'Afán de ayuda de familiares', 
            'Sentimientos de ayuda de amigos',
            'Experiencias previas de familiares',
            'Exigencias familiares',
            'Engaño de familiares',
            'Exigencias o intereses institucionales',
            'Otras'
        ]
    },

]
const optionsSelected = reactive({
    'Origen': [],
    'Tipo de demanda': [],
    'Paciente': [],
    'Terapeuta': [],
    'Familiares, amigos e instituciones': [],
})
const isEmpty = ref(false);
const messageAlert = ref('');
const { opacity, modalAlert, showModalAlert } = useModal();
const props = defineProps(['id', 'processid']);
const isSafeToLeave = ref(false);
const isLoading = reactive({
    data: false,
    sending: false
});
const patient = ref({});

onBeforeMount(async() => {
    isLoading.data = true;

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

function checkValues(){
    isEmpty.value = false;
    console.log(optionsSelected);
    for (const key in optionsSelected){
        if (optionsSelected[key].length === 0){
            messageAlert.value = `Tienes que escoger al menos una opción por en el campo "${key}"`
            isEmpty.value = true;
            break;
        }
    }

    if (isEmpty.value) {
        showModalAlert(messageAlert.value, false, {variant: 'danger'});
    } else {
        showModalAlert('¿Estás seguro de enviar los datos?', true);
    }
}

async function sendData(){
    isLoading.sending = true;
    try {
        await addDoc(collection(db, 'guideone'), {
            patient: props.id,
            optionsSelected: optionsSelected,
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