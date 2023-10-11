<template>
    <TextArea
        v-model:text-value="dataSectionFour[content.text]"
        :item="content"
        :show-btn-info="false"
    />
    <h2 class="text-xl normal-case mt-10 font-bold">En las primeras etapas investigar las experiencias más importantes y los significados de las mismas</h2>
    <div class="border border-main-default rounded-xl px-4 w-[80%] mx-auto mt-4">
        <table class="w-full">
            <tr v-for="(item, index) in tableContent" :key="index">
                <td class="w-1/3 text-center font-bold">{{ item.title }}</td>
                <td class="w-1/2">
                    <div class="relative z-0 w-full group mb-4">
                        <input @input="update(dataSectionFour)" v-model="dataSectionFour.table[item.title]" type="text" name="floating_last_name" id="floating_last_name"
                            class="block py-5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=" "  />
                        <label for="floating_last_name"
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
import TextArea from './TextArea.vue';
import { reactive } from 'vue';
import ButtonVue from '../general_components/ButtonVue.vue';

const props = defineProps({
    item: {
        required: true,
        type: Object
    }
})
const content = {
    code: '4',
    text: 'Biografía psicológica personal y familiar'
}
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
const dataSectionFour = reactive({
    'Biografía psicológica personal y familiar': '',
    table: {
        'Estilos disciplinarios': '',
        'Tipo de apego': '',
        'Sociabilidad': '',
        'Pérdidas afectivas': '',
        'Experiencias de aprendizaje': '',
        'Sobrestimulación': '',
        'Concienciación': '',
    }
})
const emit = defineEmits(['showInfo', 'update']);

function showInfo(item){
    emit('showInfo', item);
}

function update(data){
    emit('update', data);
}
</script>