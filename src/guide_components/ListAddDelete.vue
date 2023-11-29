<template>
    <h2 :id="title" class="my-4 text-left font-semibold text-gray-900 dark:text-white">{{ title }}</h2>
    <!-- Aqui va lo que se llene en la guia 3, ojo hay que reemplazar -->
    <p v-if="showDataFromOtherGuide" class="p-4 text-sm border whitespace-pre-line leading-relaxed border-blue-400 rounded-xl w-[80%] mx-auto">{{ content }}</p>
    <div class="flex flex-row gap-4 items-center">
        <div v-if="showDate" class="relative z-0 w-1/2">
            <DatePretty
                title="Fecha"
                @update-date="updateDate"
            />
        </div>
        <div class="relative z-0 w-full my-6">
            <textarea v-model="data.objective" rows="4" name="floating_objectives" id="floating_objectives"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  ></textarea>
            <label for="floating_brothers"
                class="peer-focus:font-medium capitalize absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {{ titleOne }}</label>
        </div>
        <div class="relative z-0 w-full my-6 group">
            <textarea v-model="data.technique" rows="4" name="floating_techiques" id="floating_techiques"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  ></textarea>
            <label for="floating_brothers"
                class="peer-focus:font-medium capitalize absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {{ titleTwo }}</label>
        </div>
        <button @click="pushValues(data.objective, data.technique, title, data.date); data.objective = ''; data.technique = ''" class="text-4xl text-success">
            <font-awesome-icon icon="fa-solid fa-circle-plus" />
        </button>
    </div>
    <div v-for="(item, index) in dataResponse" :key="index" class="flex flex-row gap-4 items-center">
        <div v-if="showDate" class="relative z-0 w-1/2 my-6">
            <p rows="2" name="floating_objectives_filled" id="floating_objectives_filled"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                disabled >{{ item.date }}</p>
            <label for="floating_brothers"
                class="peer-focus:font-medium capitalize absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Fecha</label>
        </div>
        <div class="relative z-0 w-full my-6">
            <p rows="2" name="floating_objectives_filled" id="floating_objectives_filled"
                class="block py-2.5 px-0 w-full text-sm whitespace-pre-line text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                disabled >{{ item.objective }}</p>
            <label for="floating_brothers"
                class="peer-focus:font-medium capitalize absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {{ titleOne }}</label>
        </div>
        <div class="relative z-0 w-full my-6 group">
            <p rows="2" name="floating_techiques" id="floating_techiques"
                class="block py-2.5 px-0 w-full text-sm whitespace-pre-line text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                disabled >{{ item.technique }}</p>
            <label for="floating_techiques"
                class="peer-focus:font-medium capitalize absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {{ titleTwo }}</label>
        </div>
        <button @click="dataResponse.splice(index, 1)" class="text-4xl text-danger">
            <font-awesome-icon class="rotate-45" icon="fa-solid fa-circle-plus" />
        </button>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import DatePretty from '@/general_components/DatePretty.vue';

const props = defineProps({
    content: {
        required: false,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    dataResponse: {
        required: true,
        type: Array
    },
    showDataFromOtherGuide: {
        default: true,
        type: Boolean
    },
    showDate: {
        default: false,
        type: Boolean
    },
    titleOne: {
        default: 'Objetivos',
        type: String
    },
    titleTwo: {
        default: 'Técnicas',
        type: String
    }
})
const data = reactive({
    objective: '',
    technique: '',
    date: ''
})
const emit = defineEmits(['pushValues'])

function pushValues(objective, technique, ubication, date){
    emit('pushValues', objective, technique, ubication, date);
}

function updateDate(date){
    data.date = date;
}
</script>