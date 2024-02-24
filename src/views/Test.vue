<template>
    <!-- <div>

        <div>
            <button class="p-4 rounded-xl bg-light text-white my-10" :disabled="isLoading">
                <span v-if="isLoading"><Spinner /> Cargando</span>
                <span v-else>Subir</span>
            </button>
        </div>
        <form class="flex flex-col gap-5" @submit.prevent="deletePatient">
            <input v-model="patient" type="text">
            {{ patient }}
            <button type="submit" class="bg-light rounded-xl p-2 text-white">
                <span v-if="isLoading"><Spinner /> Cargando</span>
                <span v-else>Eliminar</span>
            </button>
        </form>
    </div> -->

    <div id="card" class="static border-2 border-light p-4 my-10 rounded-3xl">
        <div class="flex items-center justify-between border-b-2 border-gray-400 pb-2 mx-5">
            <div class="">
                <img src="../../sketches/ministerio.jpg" alt="" class="h-[51px]">
                <p class="w-[70%] text-[10px] mt-1">Hospital Sagrado Corazón de Jesús, Quevedo, Los Ríos, Ecuador.</p>
            </div>
            <div class="font-bold text-xl flex flex-col gap-2 w-[35%]">
                <h1>Dra. Glenda Arriciaga Vaca</h1>
                <h1>Psicoterapeuta Integrativa</h1>
            </div>
        </div>
        <div class="my-3">
            <h1 class="font-bold pb-2">Indicaciones para la próxima semana:</h1>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right dark:text-gray-400">
                    <tbody>
                        <tr v-for="item in cards" class="odd:bg-white even:text-gray-50 odd:text-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th class="px-6 py-2">
                                Apple MacBook Pro 17"
                            </th>
                            <td class="px-6 py-2">
                                Silver
                            </td>
                            <td class="px-6 py-2">
                                Laptop
                            </td>
                            <td class="px-6 py-2">
                                $2999
                            </td>
                            <td class="px-6 py-2">
                                hola
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="flex items-center gap-4 mx-20">
            <img src="../../sketches/wsp.png" alt="" class="h-[50px]">
            <h1 class="font-bold text-xl">0998117347</h1>
        </div>
        <div class="absolute top-[115px] mx-auto left-[450px] opacity-20">
        </div>
    </div>
</template>

<script setup>
import Spinner from '../general_components/Spinner.vue';
import { ref, onBeforeMount } from 'vue';
import { setDoc, doc, getDoc, collection, query, where, getDocs, updateDoc, deleteDoc, or } from 'firebase/firestore';
import { db } from '@/main.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { router } from '@/routes';
import { useClassAlert } from '@/composables/modalProps';

const isLoading = ref(false);
const cards = ['1', '2', '3', '4', '5', '6'];
const uploaded = ref([]);
const patient = ref('');
const infoExplicit = [
    {
        type: 'h',
        subContent: 'Se relaciona con el motivo de consulta proveniente del paciente o de otros demandantes'
    },
];

const auth = getAuth();
const guides = [
    'guideone', 'guidetwo', 'guidethree',
    'guidefour', 'guidefive', 'guidesix',
    'guideseven', 'guideeight'
]

onBeforeMount(() => {
    isLoading.value = true;
    onAuthStateChanged(auth, async(user) => {
        if (user.email === 'bravo.luis.1995@gmail.com') {
            const userRef = doc(db, 'users', `${user.email}`);
            const docSnap = await getDoc(userRef);
            if (!docSnap.data().admin) router.push('/');
        } else router.push('/');
        isLoading.value = false;
    })
})

const allInfos = [
    { code: '2.1', info: infoExplicit }
]
const users = ref([]);

function deletePatient() {
    isLoading.value = true;
    guides.forEach(async(guide) => {
        const q = query(collection(db, `${guide}`), where('patient', '==', `${patient.value}`));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
            querySnapshot.forEach(async(doc) => {
                await deleteDoc(doc(db, `${guide}`, `${doc.id}`))
            })
            console.log('borrado');
        }
        console.log(guide);
    })
    isLoading.value = false;
}

async function deleteData() {
    isLoading.value = true;
    const users = ['garriciagaczs5@gmail.com', 'bravo.luis.1995@gmail.com'];
    const guides = ['guideone', 'guidetwo', 'guidethree', 'guidefour', 'guidefive', 'guidesix', 'guideseven', 'guideeight'];
    let ids = [];

    const patientRef = collection(db, 'patients');
    const q = query(patientRef, or(where('therapist', '==', `${users[0]}`), where('therapist', '==', `${users[1]}`)));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((document) => {
        ids.push(document.id);
    })

    console.log(ids);

    guides.forEach(async(guide) => {
        const guideRef = collection(db, `${guide}`);
        const q2 = await getDocs(guideRef);
        q2.docs.forEach(async(elem) => {
            if (!ids.some(value => value === elem.data().patient) && elem.id) {
                console.log(elem.data().patient);
                await deleteDoc(doc(db, `${guide}`, `${elem.id}`));
            }
        })
    })

    isLoading.value = false;
}

async function updateUsers() {
    isLoading.value = true;
    const userRef = collection(db, 'users');
    const q = query(userRef, where('admin', '==', false));
    const querySnapshot = await getDocs(q);

    querySnapshot.docs.forEach((user) => {
        users.value.push(user.id);
    })

    users.value.forEach(async(user) => {
        const userRefD = doc(db, 'users', `${user}`);
        await updateDoc(userRefD, {
            beginDate: '12/18/2023',
            finishDate: '01/18/2024',
            maxPatients: '5'
        })
        console.log('logrado');
    })
    isLoading.value = false;
    
}

function loadData() {
    isLoading.value = true;
    allInfos.forEach(async(info) => {
        await setDoc(doc(db, 'infoguides', `${info.code}`), {
            info: info.info
        })
        uploaded.value.push(info.code);
    })
    isLoading.value = false;
}

</script>