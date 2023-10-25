<template>
    <section v-if="dataCopy.length > 0">
        <h1 class="text-2xl font-bold text-center p-2 mt-4">PLANIFICACIÓN DEL PROCESO</h1>
        <div v-if="!isLoading" v-for="(item, key) in dataCopy[0].dataGuideFive" :key="key">
            <div v-if="item.length > 0" class="p-2 text-sm">
                <h2 class="font-bold p-4">{{ key }}: </h2>
                <p class="p-4 text-center">{{ dataThreeCopy[key] }}</p>
                <div class="flex justify-center">
                    <table class="m-4">
                        <thead class="text-xs text-gray-700 uppercase shadow-sm shadow-main-default">
                            <tr>
                                <th scope="col" class="px-6 py-3">Objetivos</th>
                                <th scope="col" class="px-6 py-3">Técnicas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b shadow-sm shadow-light" v-for="subitem in item">
                                <td class="px-6 py-2">{{ subitem.objective }}</td>
                                <td class="px-6 py-2">{{ subitem.technique }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <div>
        <CreateGuide guide="five" :id="id" />
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
    data: {
        required: true,
        type: Object
    },
    createdAt: {
        required: true,
        type: String
    }
})
const isLoading = ref(false);
const dataCopy = ref([]);
const dataThreeCopy = ref([]);

onBeforeMount(async() => {
    isLoading.value = true;
    const { data, error } = await useFetch(`guidefive?patient=${props.id}`);
    useFetch(`guidethree?patient=${props.id}`)
        .then((res) => {
            console.log(res);
            dataThreeCopy.value = res.data.value[0].sectionSix;
        })
        .catch((error) => console.log(error))
        .finally(() => {
            dataCopy.value = [ ...data.value ];
            isLoading.value = false;
        })
})
</script>