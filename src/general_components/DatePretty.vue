<template>
    <input @input="inputDate()" v-model="date" type="text" maxlength="10" name="floating_birth_place" id="floating_birth_place"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
        />
        <span class="text-sm absolute pointer-events-none -translate-y-[160%]">{{ formatDateNew }}</span>
    <label for="floating_birth_place" id="hola"
        class="peer-focus:font-medium absolute peer-focus:visible text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        {{ title }}</label>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: {
        default: 'Fecha de nacimiento',
        type: String
    }
})

const formatDate = ref('mm/dd/aaaa');
const formatDateNew = ref('mm/dd/aaaa');
const previous = ref(0);
const date = ref('');
const emit = defineEmits(['updateDate']);

function updateDate(date){
    emit('updateDate', date);
}

function inputDate(){
    formatDateNew.value = date.value + formatDate.value.substring(date.value.length);
    if ((date.value.length === 2 || date.value.length === 5) && date.value.length > previous.value){
        date.value += '/';
    }
    previous.value = date.value.length;
    updateDate(date.value);
}
</script>