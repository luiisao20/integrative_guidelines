<template>
    <div v-if="isLoading" class="flex justify-center">
        <Spinner class="text-4xl py-20"/>
    </div>
    <div v-else>
        <SideBar 
            :is-left="true"
            :navigation="sideBar"
            title-bar="Perfil"
            :admin="isAdmin"
        />
        <RouterView :data="data" />
    </div>
</template>

<script setup>
import SideBar from '@/guide_components/SideBar.vue';
import { onBeforeMount, ref, watchEffect, onBeforeUnmount } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/main.js';
import { router } from '@/routes';
import Spinner from '../general_components/Spinner.vue';

const sideBarContent = [
    {
        title: 'Perfil',
        link: '/profile/info'
    },
    {
        title: 'Contraseña',
        link: '/profile/password'
    },
    {
        title: 'Pagos',
        link: '/profile/payments'
    },
    {
        title: 'Acuerdo de confidencialidad',
        link: '/profile/confidentiality'
    },
    // {
    //     title: 'Correo interno',
    //     link: `/profile/mail`
    // }
]
const adminSideBar = [
    {
        title: 'Registrar nuevo usuario',
        link: '/profile/register'
    },
    {
        title: 'Listado de usuarios',
        link: '/profile/users'
    },
]
const sideBar = ref([]);
const auth = getAuth();
const data = ref({});
const isLoading = ref(false);
const isAdmin = ref(false);
const unsuscribe = ref(null);

onBeforeMount(() => {
    isLoading.value = true;
    onAuthStateChanged(auth, async(user) => {
        if (user) {
            const docRef = doc(db, 'users', `${user.email}`);
            const docSnap = await getDoc(docRef);

            isAdmin.value = docSnap.data().admin;
            if (isAdmin.value) sideBar.value = sideBarContent.concat(adminSideBar);
            else sideBar.value = sideBarContent;

            data.value = docSnap;
        } else router.push('/')
        isLoading.value = false;
    })
})

watchEffect(async() => {
    if(data.value.id !== undefined){
        const docRef = doc(db, 'users', `${data.value.id}`);
        unsuscribe.value = onSnapshot(docRef, (doc) => {
            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                data.value = doc;
        });
    }
})

onBeforeUnmount(() => {
    unsuscribe.value();
})
</script>