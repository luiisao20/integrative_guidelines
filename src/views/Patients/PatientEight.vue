<template>
    <section v-if="dataCopy.length > 0">
        <h1 class="text-2xl font-bold text-center">EVALUACION FINAL DEL PROCESO PSICOTERAPÉUTICO</h1>
        <div class="mx-10">
            <div v-for="(item, key) in dataCopy[0].dataGuideEight.tableOne">
                <div v-if="(typeof item === 'string')" class="flex gap-4 py-2">
                    <h2 class="font-bold">{{ key }}: </h2>
                    <h2>{{ item }}</h2>
                </div>
                <div v-else-if="(Array.isArray(item))" class="flex gap-4 py-2">
                    <h2 class="font-bold">{{ key }}: </h2>
                    <h2 class="flex gap-4">
                        <span v-for="(subitem, index) in item">{{ index + 1 }}: {{ subitem }}</span>
                    </h2>
                </div>
                <div v-else class="my-2">
                    <h2 class="font-bold mr-10">{{ key }}: </h2>
                    <div class="pl-10">
                        <p><span class="font-bold">Nivel de satisfacción:</span> {{ item.rate }}</p>
                        <p><span class="font-bold">Observaciones:</span> {{ item.observations }}</p>
                    </div>
                </div>
            </div>
        </div>
        <h1 class="text-xl mt-10 font-bold text-center">TÉCNICAS EMPLEADAS Y GRADO DE EFICACIA</h1>
        <div v-for="(item, key) in dataCopy[0].dataGuideEight.techniques">
            <table v-if="Object.keys(item).length > 0" class="my-4 mx-auto w-[80%]">
                <thead class="text-xs text-gray-700 uppercase shadow-sm shadow-main-default">
                    <tr>
                        <th scope="col" colspan="2" class="px-6 py-3">{{ key }}</th>
                    </tr>
                </thead>
                <tbody v-for="(subitem, subkey, index) in item">
                    <tr class="border-b shadow-sm shadow-light">
                        <td class="px-6 py-2">{{ dataThreeCopy[dataTechniques[key]][index].technique }}</td>
                        <td class="px-6 py-2">{{ subitem }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h1 class="mt-10 text-2xl font-bold text-center">Interrogantes al finalizar el proceso</h1>

        <div class="mx-10 grid grid-cols-2 gap-2 text-sm">
            <div v-for="(item, key) in dataCopy[0].dataGuideEight.interrogations" class="shadow-sm shadow-light p-2 rounded-xl">
                <div class="my-2">
                    <h2 class="font-bold mr-10 my-2">{{ key }}: </h2>
                    <div class="pl-4">
                        <p><span class="font-bold">Cumplimiento:</span> {{ item.option }}</p>
                        <p v-if="item.why !== undefined"><span class="font-bold">¿Por qué?:</span> {{ item.why }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div>
        <CreateGuide guide="eight" :id="id" />
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
const dataThreeCopy = ref([]);
const dataTechniques = {
    'Asesoramiento': 'Diagnóstico descriptivo y formulación dinámica del problema',
    'Sintomáticas': 'Diagnóstico descriptivo y formulación dinámica del trastorno',
    'De personalidad': 'Diagnóstico descriptivo y formulación dinámica de la personalidad'
}

onBeforeMount(async() => {
    isLoading.value = true;
    const { data, error } = await useFetch(`guideeight?patient=${props.id}&process=${props.processid}`);

    useFetch(`guidefive?patient=${props.id}&process=${props.processid}`)
        .then((res) => {
            console.log(res);
            dataThreeCopy.value = res.data.value[0].dataGuideFive;
        })
        .catch((error) => console.log(error))
        .finally(() => {
            dataCopy.value = [ ...data.value ];
            isLoading.value = false;
        })
})
</script>