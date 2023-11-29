<template>
    <h1 class="text-2xl font-bold text-center">ANÁLISIS DE LA DEMANDA, EXPECTATIVAS Y MOTIVACIONES PREVIAS AL INICIO DEL PROCESO</h1>
    <div v-if="isEmpty">
        <CreateGuide @go-guide="$router.push(`/create/guideone/${id}/${processid}`)"/>
    </div>
    <div v-else-if="isLoading" class="flex justify-center">
        <Spinner class="text-4xl py-10"/>
    </div>
    <section v-else>
        <h2 class="my-4 text-center font-semibold text-gray-900 dark:text-white">DEMANDA PSICOLÓGICA</h2>
        <div class="grid grid-cols-2 gap-4 w-[80%] mx-auto">
            <div class="p-2 text-sm shadow-sm shadow-light rounded-xl"  v-for="item in titles.slice(0, 2)">
                <h2 class="font-bold">{{ item }}: </h2>
                <ul class="list-decimal pl-8">
                    <li v-for="subitem in dataCopy.optionsSelected[item]">{{ subitem }}</li>
                </ul>
            </div>
        </div>
        <h2 class="my-4 text-center font-semibold text-gray-900 dark:text-white">EXPECTATIVAS Y MOTIVACIONES</h2>
        <div class="grid grid-cols-2 w-[80%] mx-auto gap-4">
            <div class="p-2 text-sm shadow-sm shadow-light rounded-xl" v-for="item in titles.slice(2, 5)">
                <h2 class="font-bold">{{ item }}: </h2>
                <ul class="list-decimal pl-8">
                    <li v-for="subitem in dataCopy.optionsSelected[item]">{{ subitem }}</li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import Spinner from '../../general_components/Spinner.vue';
import CreateGuide from '../../general_components/CreateGuide.vue';
import { fetchGuide } from '@/composables/fetchGuides.js';

const props = defineProps({
    id: {
        required: true,
        type: String
    },
    processid: {
        required: true,
        type: String
    },
    data: {
        required: true,
        type: Object
    }
})
const isLoading = ref(false);
const isEmpty = ref(false);
const dataCopy = ref({});
const titles = ['Origen', 'Tipo de demanda', 'Paciente', 'Terapeuta', 'Familiares, amigos e instituciones'];

onBeforeMount(async() => {

    isLoading.value = true;

    const { data, go } = await fetchGuide('guideone', props.id, props.processid);

    if (data) dataCopy.value = { ...data.data() };
    else isEmpty.value = true

    isLoading.value = false;
})
</script>