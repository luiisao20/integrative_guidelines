<template>
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; 
                    opacity = '1';
                    if(goBack) {router.push(`/${id}/process/${processid}/guidefour`)};"
        @send-data="sendData"
        @go-route="router.push(`/${id}/process/${processid}/guidefour`)"
        :is-loading="isLoading.sending"
    />

    <form v-if="!isLoading.data" action="" class="py-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center pb-4">ANÁLISIS DE LA PRIMER ENTREVISTA</h1>
        <h1 class="py-5"><span class="font-bold">Paciente:</span> {{ patient.Apellidos }} {{ patient.Nombres }}</h1>
        <RadioBox
            v-model:data="dataGuideFour"
            :content="content.slice(0, 1)"
            title-low="Complejo"
        />
        <table class="text-sm text-left w-full text-gray-500 rounded-xl dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                        Sí
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                        No
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="px-6 py-4 text-black dark:text-white flex flex-col">
                        {{ content[1] }} 
                        <PopOver variant="info" text-info="En caso de seleccionar 'Sí', debes llenar el apartado de texto." />
                        <input type="text" name="floating_treatment" id="floating_treatment"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder="Especificar" v-model="dataGuideFour[content[1]].descr" :disabled="dataGuideFour[content[1]].selected === 'No'" />
                    </td>
                    <td class="px-6 py-4 text-center">
                        <input v-model="dataGuideFour[content[1]].selected"
                            :id="`default-yes-no-radio-${content[1]}`" type="radio" value="Sí" :name="`default-yes-no-${content[1]}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </td>
                    <td class="px-6 py-4 text-center">
                        <input v-model="dataGuideFour[content[1]].selected" @click="dataGuideFour[content[1]].descr = ''"
                            :id="`default-yes-no-radio-${content[1]}`" type="radio" value="No" :name="`default-yes-no-${content[1]}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </td>
                </tr>
            </tbody>
        </table>
        <RadioBox
            v-model:data="dataGuideFour"
            :content-anormal="content[2]"
            :normal="false"
        />
        <div class="relative z-0 w-full mb-6 group bg-white">
            <textarea v-model="dataGuideFour['¿Qué dificultades se van a presentar en el proceso?']" type="text" name="dificulties" id="dificulties"
                class="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                rows="5" placeholder=" " ></textarea>
            <label for="dificulties"
                class="peer-focus:font-medium pl-4 absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {{ content[3] }}</label>
        </div>
        <div class="flex justify-end">
            <ButtonVue class="p-2" variant="secondary" type="button" @click="checkValues">
                Enviar
            </ButtonVue>
        </div>
    </form>
    <div v-else class="flex justify-center">
        <Spinner class="text-4xl py-20" />
    </div>
</template>

<script setup>
import RadioBox from '@/guide_components/RadioBox.vue';
import { reactive, ref, onBeforeMount } from 'vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import ButtonVue from '@/general_components/ButtonVue.vue';
import { router } from '../../routes';
import { onBeforeRouteLeave } from 'vue-router';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '@/main.js';
import Spinner from '../../general_components/Spinner.vue';
import { formatDate } from '@/composables/formatDate';
import PopOver from '@/general_components/PopOver.vue';
import { fetchGuide } from '@/composables/fetchGuides';

const dataGuideFour = reactive({
    'Paciente idóneo para tratamiento psicoterapéutico': '',
    'Requiere tratamiento mixto (psicoterapia, biológico, social) Especifique:': {
        selected: '',
        descr: ''
    },
    'Requiere intervención:': '',
    '¿Qué dificultades se van a presentar en el proceso?': ''
})
const { opacity, modalAlert, showModalAlert } = useModal();
const content = [
    'Paciente idóneo para tratamiento psicoterapéutico',
    'Requiere tratamiento mixto (psicoterapia, biológico, social) Especifique:',
    {
        title: 'Requiere intervención:',
        options: ['Individual', 'De pareja', 'Familiar', 'Grupal', 'Institucional']
    },
    '¿Qué dificultades se van a presentar en el proceso?'
]
const modalMessage = ref('');
const isEmpty = ref(false);
const goBack = ref(false);
const props = defineProps(['id', 'processid'])
const isSafeToLeave = ref(false);
const patient = ref({});
const isLoading = reactive({
    data: false, sending: false
});

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

function checkValues(){
    isEmpty.value = false;
    modalMessage.value = '';
    const keyExcluded = 'Requiere tratamiento mixto (psicoterapia, biológico, social) Especifique:';

    for (const key in dataGuideFour){
        if( key !== keyExcluded && dataGuideFour[key].toString().trim() === ''){
            isEmpty.value = true;
            modalMessage.value = `El campo "${key}" está vacío, por favor llénalo`;
            break;
        }
    }

    if (dataGuideFour['Requiere tratamiento mixto (psicoterapia, biológico, social) Especifique:'].selected.toString().trim() === '' || 
        (dataGuideFour['Requiere tratamiento mixto (psicoterapia, biológico, social) Especifique:'].descr.toString().trim() === '' && 
        dataGuideFour['Requiere tratamiento mixto (psicoterapia, biológico, social) Especifique:'].selected.toString().trim() === 'Sí')) {

        isEmpty.value = true;
        modalMessage.value = `El campo "Tratamiento mixto" está vacío, por favor llénalo`;
    }

    if (isEmpty.value) {
        showModalAlert(modalMessage.value, false, {variant: 'danger'});
    } else {
        showModalAlert('¿Estás seguro de guardar los datos?', true, {variant: 'info'});
    }
}

async function sendData() {
    isLoading.sending = true;
    try {
        await addDoc(collection(db, 'guidefour'), {
            patient: props.id,
            dataGuideFour: dataGuideFour,
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