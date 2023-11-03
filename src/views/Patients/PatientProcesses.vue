<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendData"
    />
    <div>
        <div v-if="!isLoading" class="flex justify-center">
            <table class="w-[70%] text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-3 py-3 w-1/4 text-center">
                            Proceso N°
                        </th>
                        <th scope="col" class="px-3 py-3 text-center">
                            Nombre
                        </th>
                        <th scope="col" class="px-3 py-3 text-center">
                            Fecha de creación
                        </th>
                        <th scope="col" class="px-3 py-3">
                        </th>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in dataCopy" :key="index">
                    <tr v-bind:class="{ isActiveProcess: process.id === item.id }" class="bg-white text-black border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-3 py-4 font-bold text-center dark:text-white">
                            {{ index + 1 }}
                        </th>
                        <td class="px-3 py-4 text-center">
                            {{ item.processName }}
                        </td>
                        <td class="px-3 py-4 text-center">
                            {{ formatDate(item.date) }}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <button v-bind:class="{ isActiveProcess: process.id === item.id }" @click="isShowingProcess = true; process = item; showText = true"
                                class="font-medium text-light dark:text-blue-500 hover:underline">
                                Ir
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <CreateGuide @show-form="showForm = true" guide="five" :id="id" :text="text"/>
        </div>
        <div v-if="showForm">
            <form>
                <div class="relative z-0 w-full mb-6 group">
                    <input v-model="processName" type="text" name="floating_name" id="floating_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Escribe un nombre para el nuevo proceso
                    </label>
                </div>
                <ButtonVue @click.prevent="createProcess" type="submit" class="p-4" variant="info">
                    Crear un nuevo proceso
                </ButtonVue>
            </form>
        </div>
        <PatientProcess
            v-if="isShowingProcess"
            :process="process"
            :id="id"
            :show-text="true"
        />
    </div>
</template>

<script setup>
import CreateGuide from '../../general_components/CreateGuide.vue';
import { ref, onBeforeMount } from 'vue';
import ButtonVue from '@/general_components/ButtonVue.vue';
import axios from 'axios';
import { useModal } from '@/composables/modal';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useFetch } from '@/composables/fetch';
import { formatDate } from '@/composables/formatDate';
import PatientProcess from './PatientProcess.vue';

const props = defineProps({
    id: {
        required: true,
        type: String
    },
    createdAt: {
        required: true,
        type: String
    },
    data: {
        required: true,
        type: Object
    }
})
const { opacity, modalAlert, showModalAlert } = useModal();
const showForm = ref(false);
const isLoading = ref(true);
const isShowingProcess = ref(false);
const showText = ref(true);
const processName = ref('');
const text = ref('');
const dataCopy = ref([]);
const process = ref({});

onBeforeMount(async() => {
    isLoading.value = true;
    const { data, error } = await useFetch(`processes?patient=${props.id}`);

    dataCopy.value = [...data.value];

    dataCopy.value.sort((a, b) => {
        const nameA = new Date(a.date);
        const nameB = new Date(b.date);
        if (nameA < nameB) {
            return 1;
        }
        if (nameA > nameB) {
            return -1;
        }
        // names must be equal
        return 0;
    })
    if (dataCopy.value.length > 0) text.value = '¿Crear un nuevo proceso?'
    else text.value = 'No existen datos, ¿Deseas crear un nuevo proceso?'
    isLoading.value = false;
})

async function createProcess() {
    const { data, error } = await useFetch(`processes?patient=${props.id}&processName=${processName.value}`);
    console.log(data.value);
    console.log(processName.value);
    if (processName.value.toString().trim() === '') {
        showModalAlert('Debes escribir un nombre para el proceso', false, {variant: 'danger'})
    } else if (data.value.length > 0 ) {
        showModalAlert(`El proceso ${processName.value} ya existe!, escoge otro nombre`, false, {variant: 'danger'})
    } else {
        showModalAlert(`¿Deseas crear un nuevo proceso para el paciente ${props.data.Nombres} ${props.data.Apellidos}?`, true)
    }
}

async function sendData() {
    try {
        const res = await axios.post('http://localhost:3000/processes', {
            patient: props.id,
            processName: processName.value,
            date: new Date()
        })
        showModalAlert('Eureka!!', false, {variant: 'success', showRoute: true});
    } catch (error) {
        showModalAlert(error, false, {variant: 'danger'})
    }
}
</script>

<style scoped>
.isActiveProcess {
    background-color: var(--light-color);
    color: white;
}
</style>