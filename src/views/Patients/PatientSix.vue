<template>
    <section v-if="dataCopy.length > 0">
        <h1 class="text-2xl my-4 font-bold text-center">EJECUCIÓN Y APLICACIÓN TÉCNICA</h1>
        <div class="flex justify-center">
            <table class="m-4">
                <thead class="text-xs text-gray-700 uppercase shadow-sm shadow-main-default">
                    <tr>
                        <th scope="col" class="px-6 py-3">Fecha</th>
                        <th scope="col" class="px-6 py-3">Evolución</th>
                        <th scope="col" class="px-6 py-3">Actividad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b shadow-sm shadow-light" v-for="subitem in dataCopy[0].data">
                        <td class="px-6 py-2">{{ subitem.date }}</td>
                        <td class="px-6 py-2">{{ subitem.objective }}</td>
                        <td class="px-6 py-2">{{ subitem.technique }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <div>
        <CreateGuide guide="six" :id="id" />
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

onBeforeMount(async() => {
    isLoading.value = true;
    const { data, error } = await useFetch(`guidesix?patient=${props.id}`);

    dataCopy.value = [ ...data.value ];

    isLoading.value = false;
})
</script>