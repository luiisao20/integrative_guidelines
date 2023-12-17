<template>
    <div v-if="!isLoading">
        <button class="p-4 rounded-xl bg-light text-white my-10" @click="loadData" :disabled="isLoading">
            <span v-if="isLoading"><Spinner /> Cargando</span>
            <span v-else>Subir</span>
        </button>
        {{ uploaded }}
    </div>
</template>

<script setup>
import Spinner from '../general_components/Spinner.vue';
import { ref, onBeforeMount } from 'vue';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/main.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { router } from '@/routes';

const isLoading = ref(false);
const uploaded = ref([]);

const infoExplicit = [
    {
        type: 'h',
        subContent: 'Se relaciona con el motivo de consulta proveniente del paciente o de otros demandantes'
    },
];

const auth = getAuth();

onBeforeMount(() => {
    isLoading.value = true;
    onAuthStateChanged(auth, async(user) => {
        if (user) {
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