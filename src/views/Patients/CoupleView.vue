<template>
    <div v-if="!isLoading.data" :style="{ opacity: opacity }">
        <div class="flex items-center justify-between mx-20 my-4">
            <button @click="router.push(`/${id}/couple`)"
                class="p-4 flex items-center gap-4 border border-black rounded-xl bg-white">
                <font-awesome-icon icon="fa-solid fa-arrow-left" /> <p>Regresar</p>
            </button>
            <h1 class="text-center font-semibold text-xl my-4">{{ dataCopy.Proceso }}</h1>
        </div>
        <ul class="flex sticky top-0 bg-background flex-wrap text-sm pl-4 font-medium text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <li class="mr-2" v-for="(item, index) in links" :key="index">
                <RouterLink @click="showText = false" :to="`/${id}/coupleview/${coupleid}/${item.link}`"
                    class="inline-block p-2 text-black rounded-t-lg hover:bg-gray-300">{{ item.text }}
                </RouterLink>
            </li>
        </ul>
        <div class="py-6 mb-4 px-6 border-2 border-light rounded-xl">
            <h2 v-if="showText">Escoje una guía</h2>
            <RouterView :data-copy="dataCopy" :data="data" v-else/>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/main.js';
import { router } from '../../routes';

const props = defineProps({
    id: {
        required: true,
        type: String
    },
    coupleid: {
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
const isLoading = reactive({
    data: false,
})
const dataCopy = ref({});
const opacity = ref('');
const links = [
    {
        text: 'Guía de pareja',
        link: 'coupleguide'
    },
    {
        text: 'Evolución',
        link: 'coupleevolution'
    }
]
const showText = ref(true);

onBeforeMount(async() => {
    isLoading.data = true;
    const coupleRef = doc(db, 'couples', `${props.coupleid}`);
    const docSnap = await getDoc(coupleRef);
    dataCopy.value = { ...docSnap.data().data };
    isLoading.data = false;
})
</script>

<style scoped>
.router-link-active {
    background-color: var(--light-color);
    color: white;
}
</style>