<template>
    <div v-if="!showUser">
        <h1 class="mb-4 text-3xl text-center mt-10 font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-black from-light">Listado de Usuarios</span></h1>
        <div v-if="isLoading.data" class="flex justify-center"><Spinner class="text-4xl py-20" /></div>
        <table v-else class="my-10 mx-auto w-[80%]">
            <thead class="text-xs text-gray-700 uppercase shadow-sm shadow-main-default">
                <tr>
                    <th scope="col" class="px-6 py-3">Correo</th>
                    <th scope="col" class="px-6 py-3">Nombre</th>
                    <th scope="col" class="px-6 py-3">Pacientes</th>
                </tr>
            </thead>
            <tbody v-for="(item, index) in usersList" :key="index">
                <tr class="border-b shadow-sm shadow-light text-sm">
                    <td @click="currentUser = item; showUser = true"
                        class="px-6 py-2 cursor-pointer hover:underline hover:underline-offset-2">{{ item.id }}</td>
                    <td class="px-2 py-2">{{ item.data().lastName }} {{ item.data().name }}</td>
                    <td class="px-6 py-2 text-center">{{ patientsNumber[index] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else class="">
        <button @click="showUser = false"
            class="p-4 flex my-4 items-center gap-4 border border-black rounded-xl bg-white">
            <font-awesome-icon icon="fa-solid fa-arrow-left" /> <p>Regresar</p>
        </button>
        <TherapistData :user-data="currentUser" />
    </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '@/main.js';
import Spinner from '../../general_components/Spinner.vue';
import TherapistData from './TherapistData.vue';
import { router } from '@/routes';

const props = defineProps({
    data: { type: Object }
});
const isLoading = reactive({
    data: false,
});
const usersList = ref([]);
const patientsNumber = ref([]);
const currentUser = ref({});
const showUser = ref(false);

onBeforeMount(async() => {
    isLoading.data = true;

    if(!props.data.data().admin) router.push('/');
    else {
        const q = query(collection(db, 'users'), where('admin', '==', false));
        const querySnapshot = await getDocs(q);
        querySnapshot.docs.forEach(async(user) => {
            const q1 = query(collection(db, 'patients'), where('therapist', '==', `${user.id}`));
            const querySnapshot1 = await getDocs(q1);
            patientsNumber.value.push(querySnapshot1.docs.length);
        })
        usersList.value = [ ...querySnapshot.docs ];
    }
    isLoading.data = false;

})
</script>