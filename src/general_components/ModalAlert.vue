<template>
    <div v-if="showModal" id="popup-modal" 
        tabindex="-1" class="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <div class="relative w-full max-w-md max-h-full mx-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button @click="closeMod" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-6 text-center">
                    <svg :style="{ color }" class="mx-auto mb-4 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <p class="mb-5 text-sm font-normal dark:text-gray-400">{{ title }}</p>
                    <div v-if="showButtons" class="flex justify-center items-center">
                        <button @click="sendData" type="button" :disabled="isLoading" :style="{ backgroundColor: color }" class="text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            <span v-if="!isLoading">Sí, estoy seguro</span>
                            <span v-else class="flex items-center gap-2"><Spinner />Cargando</span>
                        </button>
                        <button @click="closeMod" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            No, cancelar</button>
                    </div>
                    <div v-else-if="showRoute">
                        <button @click="goRoute" type="button" :style="{ backgroundColor: color }" class="text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Ir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useClassAlert, colorProps } from '@/composables/modalProps';
import Spinner from './Spinner.vue';

const props = defineProps({
    showModal: {
        required: true,
        type: Boolean
    },
    title: {
        required: true,
        type: String
    },
    showButtons: {
        required: true,
        type: Boolean
    },
    textColor: {
        type: String
    },
    showRoute: {
        default: false,
        type: Boolean
    },
    ...colorProps,
    isLoading: {
        default: false,
        type: Boolean
    }
})

const emit = defineEmits(['closeMod', 'sendData', 'goRoute']);

const color = useClassAlert(props);

function closeMod(){
    emit('closeMod');
}

function sendData(){
    emit('sendData');
}

function goRoute(){
    emit('goRoute');
}
</script>