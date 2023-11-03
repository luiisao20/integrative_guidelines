<template>
    <section v-if="dataCopy.length > 0">
        <h1 class="text-2xl font-bold text-center">FENÓMENOS DEL VÍNCULO TERAPÉUTICO</h1>
        <div>
            <h2 class="my-4 text-center font-bold text-black dark:text-white">CONDICIONES AMBIENTALES EXTERNAS</h2>
            <div class="my-4 flex flex-col gap-2 pl-10">
                <h2 class="font-bold">{{ content[0] }}</h2>
                <div class="w-1/2 mx-auto flex justify-between">
                    <div class="flex gap-4" v-for="(item, key) in dataCopy[0].dataGuideSeven.dataTable[content[0]]">
                        <h2>{{ key }}: </h2>
                        <h2>{{ item }}</h2>
                    </div>
                </div>
            </div>
            <div class="my-4 flex flex-col gap-2">
                <h2 class="text-center"><span class="font-bold">{{ content[1] }}:</span> {{ dataCopy[0].dataGuideSeven.dataTable[content[1]] }}</h2>
                <div v-if="dataCopy[0].dataGuideSeven.dataTable[content[1]] === 'Sí'" class="pl-10">
                    <div class="flex gap-4 py-2" v-for="(item, index) in content.slice(2, 4)" :key="index">
                        <h2 class="font-bold">{{ item }}:</h2>
                        <h2>{{ dataCopy[0].dataGuideSeven.dataTable[item] }}</h2>
                    </div>
                </div>
            </div>
            <h2 class="text-center my-4"><span class="font-bold">{{ content[4] }}:</span> 
                <span class="pl-6" v-if="dataCopy[0].dataGuideSeven.dataTable[content[4]].selected !== ''">
                    {{ dataCopy[0].dataGuideSeven.dataTable[content[4]].selected }}
                </span>
                <span class="pl-6" v-else>
                    {{ dataCopy[0].dataGuideSeven.dataTable[content[4]].other }}
                </span>
            </h2>
            <div class="flex gap-4 py-2 pl-10">
                <h2 class="font-bold">{{ content[5] }}:</h2>
                <h2>{{ dataCopy[0].dataGuideSeven.dataTable[`${content[5]} ${content[4]}`] }}</h2>
            </div>
        </div>
        <div>
            <div v-for="(item, key) in dataCopy[0].dataGuideSeven" class="text-sm">
                <h2 v-if="titles[key] !== undefined" class="my-4 text-center text-xl font-semibold text-gray-900 dark:text-white">
                    {{ titles[key] }}
                </h2>
                <table v-if="!keysExcluded.some(value => value === key)" class="my-10 mx-auto w-[80%]">
                    <thead class="text-xs text-gray-700 uppercase shadow-sm shadow-main-default">
                        <tr>
                            <th scope="col" colspan="2" class="px-6 py-3">{{ key }}</th>
                        </tr>
                    </thead>
                    <tbody v-for="(subitem, subkey) in item">
                        <tr v-if="(typeof subitem === 'string')" class="border-b shadow-sm shadow-light">
                            <td class="px-6 py-2">{{ subkey }}</td>
                            <td class="px-6 py-2">{{ subitem }}</td>
                        </tr>
                        <tr v-else class="border-b shadow-sm shadow-light">
                            <td class="px-6 py-2">
                                <span class="font-bold pr-5">{{ subkey }}</span>
                                <span class="border border-b-light">{{ subitem.content }}</span>
                            </td>
                            <td class="px-6 py-2">{{ subitem.selected }}</td>
                        </tr>
                    </tbody>
                </table>
                <table v-else-if="key !== 'dataTable'" class="my-10 mx-auto w-[80%]">
                    <thead class="text-xs text-gray-700 uppercase shadow-sm shadow-main-default">
                        <tr v-if="key !== 'dropDown'">
                            <th scope="col" colspan="2" class="px-6 py-3">{{ key }}</th>
                        </tr>
                        <tr v-else>
                            <th scope="col" colspan="2" class="px-6 py-3">RESISTENCIA</th>
                        </tr>
                    </thead>
                    <tbody v-for="(subitem, subkey) in item">
                        <tr v-if="(typeof subitem === 'string')" class="border-b shadow-sm shadow-light">
                            <td class="px-6 py-2">{{ subkey }}</td>
                            <td class="px-6 py-2 text-center">{{ subitem }}</td>
                        </tr>
                        <tr v-else class="border-b shadow-sm shadow-light">
                            <td class="px-6 py-2 font-bold">{{ subkey }}</td>
                            <td class="px-6 py-2 font-bold text-center">{{ subitem.selected }}</td>
                        </tr>
                        <tr v-if="(typeof subitem === 'object') && subitem.selected !== 'No'" v-for="(itemThree, keyThree) in subitem" 
                            class="border-b shadow-sm shadow-light">
                            <td v-if="keyThree !== 'selected' && itemThree !== ''" class="px-10 py-2">{{ keyThree }}</td>
                            <td v-if="keyThree !== 'selected' && itemThree !== ''" class="px-6 py-2 text-center">{{ itemThree }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <div>
        <CreateGuide guide="seven" :id="id" />
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useFetch } from '@/composables/fetch';
import CreateGuide from '../../general_components/CreateGuide.vue';

const props = defineProps({
    id: {
        required: true,
        type: String
    },
    processid: {
        required: true,
        type: String
    }
})
const isLoading = ref(false);
const dataCopy = ref([]);
const content = [
    'Características del consultorio',
    'Grabación de las sesiones',
    'Tipo de grabación',
    'Efecto Tipo de grabación',
    'POSICIÓN ENTRE PACIENTE Y TERAPEURA',
    'Efecto'
]
const titles = {
    'ASPECTOS COGNITIVOS': 'CARACTERÍSTICAS DEL TERAPEUTA O ASESOR ',
    'RAPPORT': 'FENÓMENOS AFECTIVOS DURANTE EL PROCESO',
    'NO VERBALES': 'INDICADORES DE TRANSFERENCIA',
    'EXPRESIONES DE CONTRATRANSFERENCIA': 'CONTRATRANSFERENCIA',
}
const keysExcluded = ['dataTable', 'dropDown', 'MANEJO DE LA TRANSFERENCIA'];

onBeforeMount(async() => {
    isLoading.value = true;
    const { data, error } = await useFetch(`guideseven?patient=${props.id}&process=${props.processid}`);

    dataCopy.value = [ ...data.value ];

    isLoading.value = false;
})
</script>