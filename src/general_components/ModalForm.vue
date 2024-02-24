<template>

<div v-if="showModal" id="crud-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full mx-auto my-auto max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ title }}
                </h3>
                <button @click="emit('closeModal')" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div v-if="showAlert" class="flex justify-center gap-4 mt-4 text-danger items-baseline">
                <font-awesome-icon icon="fa-solid fa-triangle-exclamation"/>
                <h2 class="text-base">{{ alertText }}</h2>
            </div>
            <form v-if="!normal" class="p-5" @submit.prevent="submitData">
                <div class="mb-4">
                    <h1>Fecha</h1>
                    <DatePretty @update-date="updateDate" :show-label="false"/>
                </div>
                <div class="flex flex-col gap-4 my-2">
                    <div>
                        <label for="evolve" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Evolución</label>
                        <textarea v-model="data.objective" id="evolve" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="placeHolder.evol"></textarea>                    
                    </div>
                    <div>
                        <label for="activity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Actividad</label>
                        <textarea v-model="data.technique" id="activity" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="placeHolder.activ"></textarea>                    
                    </div>
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Agregar evolución
                </button>
            </form>
            <form v-else class="p-5" @submit.prevent="addDescr">
                <div class="flex flex-col gap-4 my-2">
                    <div>
                        <label for="activity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agrega una descripción</label>
                        <textarea v-model="data.descr" id="activity" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escribe aquí..."></textarea>
                    </div>
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Agregar descripción
                </button>
            </form>
        </div>
    </div>
</div> 
</template>

<script setup>
import { ref, reactive } from 'vue';
import DatePretty from '@/general_components/DatePretty.vue';
import { formatDate } from '@/composables/formatDate';

const alertText  = ref('');
const showAlert = ref(false);
const data = reactive({
    date: '', objective: '', technique: '', descr: ''
})
const props = defineProps({
    showModal: {
        type: Boolean, required: true
    },
    array: {
        type: Array, required: false
    },
    normal: {
        type: Boolean, default: false
    },
    title: {
        type: String, default: 'Añadir evolución del paciente'
    },
    placeHolder: {
        type: Object,
        default: {
            evol: 'Escribe la evolución del paciente',
            activ: 'Escribe la actividad realizada'
        }
    }
})

function updateDate(date) {
    data.date = date;
}

function submitData() {
    const evol = {
        objective: data.objective, 
        technique: data.technique, 
        date: formatDate(data.date),
        enabled: true
    }
    if (isNaN((new Date(data.date)).getTime()) || data.date.length < 10) {
        showAlert.value = true;
        alertText.value = 'La fecha está incorrecta';
    } else if (data.objective.toString().trim() === '' || data.technique.toString().trim() === '') {
        showAlert.value = true;
        alertText.value = 'Hay campos vacíos';
    } else if (props.array.some(value => JSON.stringify(value) === JSON.stringify(evol))) {
        showAlert.value = true;
        alertText.value = 'No puedes repetir los mismos valores';
    } else {
        emit('addData', evol);
        emit('closeModal');
        data.date = '';
        data.objective = '';
        data.technique = '';
    }
}

function addDescr() {

    if (data.descr.trim().toString() === '') {
        showAlert.value = true;
        alertText.value = 'La descripción no puede estar vacía'
    } else {
        emit('addData', data.descr);
        emit('closeModal');
        data.descr = '';
    }
}

const emit = defineEmits(['addData', 'closeModal']);
</script>