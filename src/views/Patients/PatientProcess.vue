<template>
    <div v-if="!isLoading">
        <div class="flex items-center justify-between mx-20 my-4">
            <button @click="router.push(`/${id}/processes`)"
                class="p-4 flex items-center gap-4 border border-black rounded-xl bg-white">
                <font-awesome-icon icon="fa-solid fa-arrow-left" /> <p>Regresar</p>
            </button>
            <h1 class="text-2xl font-extrabold">
                {{ dataCopy.processName }}
            </h1>
        </div>
        <ul class="flex sticky top-0 bg-background flex-wrap text-sm pl-4 font-medium text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <li class="mr-2" v-for="(item, index) in links" :key="index">
                <RouterLink @click="showText = false" :to="`/${id}/process/${processid}/${item.link}`"
                    class="inline-block p-2 text-black rounded-t-lg hover:bg-gray-300">{{ item.text }}
                </RouterLink>
            </li>
        </ul>
        <div class="py-6 mb-4 px-6 border-2 border-light rounded-xl">
            <h2 v-if="showText">Escoje una guía</h2>
            <RouterView :data="data" v-else/>
        </div>
    </div>
    <div v-else class="flex justify-center">
        <Spinner class="text-4xl py-10"/>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { router } from '../../routes';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/main.js';
import Spinner from '../../general_components/Spinner.vue';

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
        type: Object
    },
    createdAt: {
        type: String
    }
})
const links = [
    {
        text: 'Guía 1',
        link: 'guideone'
    },
    {
        text: 'Guía 2',
        link: 'guidetwo'
    },
    {
        text: 'Guía 3',
        link: 'guidethree'
    },
    {
        text: 'Guía 4',
        link: 'guidefour'
    },
    {
        text: 'Guía 5',
        link: 'guidefive'
    },
    {
        text: 'Guía 6',
        link: 'guidesix'
    },
    {
        text: 'Guía 7',
        link: 'guideseven'
    },
    {
        text: 'Guía 8',
        link: 'guideeight'
    },
]
const dataCopy = ref({});
const showText = ref(true);
const isLoading = ref(false);
onBeforeMount(async() => {
    isLoading.value = true;
    const processRef = doc(db, 'processes', `${props.processid}`);

    const docSnap = await getDoc(processRef);

    dataCopy.value = { ...docSnap.data() };

    isLoading.value = false;
})
</script>

<style scoped>
.router-link-active{
    background-color: var(--light-color);
    color: white;
}
</style>