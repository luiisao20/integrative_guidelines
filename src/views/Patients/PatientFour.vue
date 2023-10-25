<template>
    <section v-if="dataCopy.length > 0">
        <h1 class="text-2xl font-bold text-center p-2 mt-4">DECISIONES SOBRE EL TRATAMIENTO PSICOTERAPÉUTICO</h1>
        <div class="w-[80%] mx-auto">
            <div v-for="(item, key) in dataCopy[0].dataGuideFour" class="flex justify-between pl-10 gap-4 my-4 text-sm items-center">
                <p class="font-semibold text-gray-900 dark:text-white w-1/2">
                    {{ key }}
                </p>        
                <p v-if="typeof item === 'string'" class="w-1/2 text-gray-900 text-right dark:text-white">
                    {{ item }}
                </p>
                <p v-else class="w-1/2 text-gray-900 flex flex-col text-right dark:text-white">
                    <p>{{ item.selected }}</p> <p v-if="item.decr !== ''">{{ item.descr }}</p>
                </p>
            </div>
        </div>
    </section>
    <div>
        <CreateGuide guide="four" :id="id" />
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
    createdAt : {
        required: true,
        type: String
    }
})
const isLoading = ref(false);
const dataCopy = ref([]);

onBeforeMount(async() => {
    isLoading.value = true;
    const { data, error } = await useFetch(`guidefour?patient=${props.id}`);

    dataCopy.value = [ ...data.value ];

    isLoading.value = false;
})
</script>