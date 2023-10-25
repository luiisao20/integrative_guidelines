<template>
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendData"
        @go-route="router.push(`/${id}/guidefour`)"
    />
    <form action="" class="py-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center pb-4">ANÁLISIS DE LA PRIMER ENTREVISTA</h1>
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
                <td class="px-6 py-4 text-black dark:text-white flex flex-col items-center">
                    {{ content[1] }}
                    <input type="text" name="floating_first_name" id="floating_first_name"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                        placeholder=" " v-model="dataGuideFour[content[1]].descr" :disabled="dataGuideFour[content[1]].selected === 'No'" />
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
            <input v-model="dataGuideFour['¿Qué dificultades se van a presentar en el proceso?']" type="text" name="floating" id="floating"
                class="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" " />
            <label for="floating_adress"
                class="peer-focus:font-medium pl-4 absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {{ content[3] }}</label>
        </div>
        <div class="flex justify-end">
            <ButtonVue class="p-2" variant="secondary" type="button" @click="checkValues">
                Enviar
            </ButtonVue>
        </div>
    </form>
</template>

<script setup>
import RadioBox from '@/guide_components/RadioBox.vue';
import { reactive, ref } from 'vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import ButtonVue from '@/general_components/ButtonVue.vue';
import { router } from '../../routes';
import axios from 'axios';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

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
    try {
        const res = await axios.post('http://localhost:3000/guidefour', {
            patient: props.id,
            dataGuideFour,
            date: new Date()
        })
        showModalAlert('Eureka!!', false, {variant: 'success', showRoute: true});
        isSafeToLeave.value = true;
    } catch (error) {
        showModalAlert(error, false, {variant: 'danger'})
    }
}
</script>