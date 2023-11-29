<template>
    <h2 class="">Biografía psicológica personal y familiar</h2>
    <div v-for="item in biography" class="line-clamp-5" v-bind:class="{ hiddenText: text.show }">
        <div v-for="subitem in item.text.split('\n')">
            <p class="text-sm px-4 py-2 leading-normal indent-8">{{ subitem }}</p>
        </div>
    </div>
    <button type="button" class="pb-4 hover:underline hover:underline-offset-2" @click="showHideText">{{ text.content }}...</button>

    <div class="relative z-0 w-full group">
        <textarea v-model="data['Biografía psicológica personal y familiar']" rows="4" name="floating_biography" id="floating_biography"
            class="block py-2.5 leading-relaxed px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
            placeholder=" "  ></textarea>
        <label for="floating_biography"
        class="peer-focus:font-medium capitalize absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Agregar biografía del proceso "{{ processid }}"</label>
    </div>
    <h2 class="text-xl normal-case mt-10 font-bold">En las primeras etapas investigar las experiencias más importantes y los significados de las mismas</h2>
    <div class="border border-main-default rounded-xl px-4 w-[80%] mx-auto mt-4">
        <table class="w-full">
            <tr v-for="(item, index) in tableContent" :key="index">
                <td class="w-1/3 text-center font-bold">{{ item.title }}</td>
                <td class="w-1/2">
                    <div class="relative z-0 w-full group mb-4">
                        <textarea v-model="data.table[item.title]" type="text" :name="`floating_${item.title}`" :id="`floating_${item.title}`"
                            class="block py-5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=" "  ></textarea>
                        <label :for="`floating_${item.title}`"
                            class="pl-2 peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {{ item.input }}</label>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="flex flex-row justify-end mt-4">
        <ButtonVue @click="showInfo(item)" class="p-3" variant="main" type="button">
            Más info
        </ButtonVue>
    </div>
</template>

<script setup>
import ButtonVue from '../general_components/ButtonVue.vue';
import {  reactive } from 'vue';

const props = defineProps({
    item: {
        required: true,
        type: Object
    },
    data: {
        required: true,
        type: Object
    },
    biography: {
        required: true,
        type: Array
    },
    processid: {
        required: true,
        type: String
    }
})
const tableContent = [
    {
        title: 'Estilos disciplinarios',
        input: 'Estructura familiar, estilos de crianza, fases psicosexuales'
    },
    {
        title: 'Tipo de apego',
        input: 'Seguro, ansioso, ambivalente, evitativo, desorganizado'
    },
    {
        title: 'Sociabilidad',
        input: 'Restringida o abierta'
    },
    {
        title: 'Pérdidas afectivas',
        input: 'Separación, muerte, abandono'
    },
    {
        title: 'Experiencias de aprendizaje',
        input: 'Experiencias traumáticas'
    },
    {
        title: 'Sobrestimulación',
        input: 'Sobrestimulación cognitiva, afectiva o comportamental'
    },
    {
        title: 'Concienciación',
        input: 'Valores familiares, religiosos y culturales'
    },
]
const text = reactive({
    show: false,
    content: 'Ver más'
});
const emit = defineEmits(['showInfo', 'update']);

function showHideText() {
    if(text.show){
        text.show = false;
        text.content = 'Ver más';
    } else {
        text.show = true;
        text.content = 'Ver menos';
    }
}

function showInfo(item){
    emit('showInfo', item);
}
</script>

<style scoped>
.hiddenText {
    overflow: visible;
display: block;
-webkit-box-orient: horizontal;
-webkit-line-clamp: none;
}
</style>