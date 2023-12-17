<template>

<form class="flex justify-between gap-4 m-4">
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input @input="filterData" v-model="search.word" type="search" id="default-search-id" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Busca por apellidos y nombres">
    </div>
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input @input="filterData" v-model="search.id" type="search" id="default-search-id" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Busca por número de cédula">
    </div>
</form>
<div v-if="isLoading" class="flex justify-center">
    <Spinner class="text-4xl py-20"/>
</div>
<div v-else>
<PageNavigation
    :list-length="patientsList.length"
    :current-step="currentStep"
    :packs="packs"
    :step-to="stepTo"
    @go-step="goStep"
    @next="currentStep++"
    @previous="currentStep--"
/>
<div v-for="(items, step) in packs" class="relative overflow-x-auto shadow-md sm:rounded-xl">
    <table v-if="currentStep === step" class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-3 py-3">
                    Número de cédula
                </th>
                <th scope="col" class="px-3 py-3">
                    Apellidos
                </th>
                <th scope="col" class="px-3 py-3">
                    Nombres
                </th>
                <th scope="col" class="px-3 py-3">
                    Fecha de nacimiento
                </th>
                <th scope="col" class="px-3 py-3">
                </th>
            </tr>
        </thead>
        <tbody v-for="(item, index) in items" :key="index" v-if="search.id === '' && search.word === ''">
            <div>
                <div class="text-xl py-2 font-bold text-black pl-4"
                    v-if="items[index - 1] !== undefined &&  items[index].data().dataPatient.Apellidos.trim()[0] !== items[index - 1].data().dataPatient.Apellidos.trim()[0]">
                    {{ items[index].data().dataPatient.Apellidos.trim()[0] }}
                </div>
                <div class="text-xl py-2 font-bold text-black pl-4" v-else-if="items[index - 1] === undefined">
                    {{ items[index].data().dataPatient.Apellidos.trim()[0] }}
                </div>
            </div>
            <tr class="bg-white text-black border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-3 py-4 font-bold text-center dark:text-white">
                    {{ item.id }}
                </th>
                <td class="px-3 py-4">
                    {{ item.data().dataPatient.Apellidos }}
                </td>
                <td class="px-3 py-4">
                    {{ item.data().dataPatient.Nombres }}
                </td>
                <td class="px-3 py-4">
                    {{ formatDate(item.data().dataPatient['Fecha de nacimiento']) }}
                </td>
                <td class="px-6 py-4 text-right">
                    <router-link :to="`/${item.id}/data`"
                        class="font-medium text-light dark:text-blue-500 hover:underline">
                        Ir
                    </router-link>
                </td>
            </tr>
        </tbody>
        <tbody v-for="(item, index) in patientsList" v-else>
            <tr v-if="!indexesToShow.includes(index)" class="bg-white text-black border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-3 py-4 font-bold text-center dark:text-white">
                    {{ item.id }}
                </th>
                <td class="px-3 py-4">
                    {{ item.data().dataPatient.Apellidos }}
                </td>
                <td class="px-3 py-4">
                    {{ item.data().dataPatient.Nombres }}
                </td>
                <td class="px-3 py-4">
                    {{ formatDate(item.data().dataPatient['Fecha de nacimiento']) }}
                </td>
                <td class="px-6 py-4 text-right">
                    <router-link :to="`/${item.id}/data`"
                        class="font-medium text-light dark:text-blue-500 hover:underline">
                        Ir
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<PageNavigation
    :list-length="patientsList.length"
    :current-step="currentStep"
    :packs="packs"
    :step-to="stepTo"
    @go-step="goStep"
    @next="currentStep++"
    @previous="currentStep--"
/>
</div>

</template>

<script setup>
import { onBeforeMount, ref, reactive } from 'vue';
import { formatDate } from '@/composables/formatDate';
import removeAccents from 'remove-accents';
import PageNavigation from '../general_components/PageNavigation.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '@/main.js';
import { router } from '@/routes';
import Spinner from '../general_components/Spinner.vue';

const auth = getAuth();
const isLoading = ref(false);
const patientsList = ref([]);
const packs = ref([]);
const search = reactive({
    word: '',
    id: ''
});
const previous = ref('');
const email = ref('');
const indexesToShow = ref([]);
const currentStep = ref(0);
const stepTo = 5;

function goStep(step){
    currentStep.value = step;
}

function filterData() {
    if (previous.value.length >= search.word.length) {
        indexesToShow.value.length = 0;
    }

    patientsList.value.forEach((patient, index) => {
        const name = removeAccents(patient.data().dataPatient.Apellidos.toLowerCase() + patient.data().dataPatient.Nombres.toLowerCase())
        if (((!(new RegExp(search.word, 'i')).test(name)) ||
            !(new RegExp(search.id, 'i')).test(patient.id))
            && !indexesToShow.value.includes(index)) {
            indexesToShow.value.push(index);
        }
    })

    previous.value = search.word;
}

onBeforeMount(() => {
    isLoading.value = true;

    onAuthStateChanged(auth, async(user) => {
        if (user) {
            email.value = user.email;
            await loadData()
        } else router.push('/');
        isLoading.value = false
    })
})

async function loadData() {
    try {        
        const q = query(collection(db, 'patients'), where('therapist', '==', `${email.value}`));
        const querySnapshot = await getDocs(q);
        patientsList.value = querySnapshot.docs;
        
        patientsList.value.sort((a, b) => {    
            const nameA = a.data().dataPatient.Apellidos.toUpperCase() + a.data().dataPatient.Nombres.toUpperCase();
            const nameB = b.data().dataPatient.Apellidos.toUpperCase() + b.data().dataPatient.Nombres.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
    
        });

        for (let i = 0; i < patientsList.value.length; i += stepTo) {
            const pack = patientsList.value.slice(i, i + stepTo);
            packs.value.push(pack);
        }
    } catch (error) {
        console.log(error);
    }
}

</script>
