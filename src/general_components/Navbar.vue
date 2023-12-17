<template>
<nav class="bg-main-lighter dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <p class="rtl:space-x-reverse">
            <span class="self-center text-2xl bg-danger p-2 rounded-xl font-semibold whitespace-nowrap text-white">labch 2023</span>
        </p>
        <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button @click="show = ! show" type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 dark:focus:ring-gray-600" id="user-menu-button">
                <span class="sr-only">Open user menu</span>
                <img v-if="!main.isLoading" class="w-10 h-10 rounded-full" :src="main.sourceImg" alt="user photo">
                <Spinner v-else class="text-white text-2xl" />
            </button>
            <!-- Dropdown menu -->
            <div v-if="show" class="z-50 right-2 top-12 absolute my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                <div class="px-4 py-3 cursor-pointer">
                    <span class="block text-sm text-gray-900 dark:text-white">{{ main.name }}</span>
                    <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{ main.email }}</span>
                </div>
                <ul class="py-2" aria-labelledby="user-menu-button">
                <li>
                    <a @click="router.push('/profile/info')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                        Perfil
                    </a>
                </li>
                <li>
                    <a @click="router.push('/profile/password')" class="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Contraseña
                    </a>
                </li>
                <li>
                    <a @click="router.push('/profile/payments')" class="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Pagos
                    </a>
                </li>
                <li>
                    <a @click="router.push('/profile/mail')" class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Correo Interno
                    </a>
                </li>
                <li>
                    <a @click="signOut(auth).then(() => router.push('/')).catch((error) => console.log(error))"
                        class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Cerrar sesión
                    </a>
                </li>
                </ul>
            </div>
            <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <RouterLink to="/home" class="block router text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-light md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                        Inicio
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/create/patient" class="block router text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-light md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                        Nuevo paciente
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/patientslist" class="block router text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-light md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                        Pacientes
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from 'vue';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../main';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Spinner from './Spinner.vue';
import { router } from '@/routes';

const show = ref(false);
const auth = getAuth();
const main = reactive({
    name: '',
    email: '',
    isLoading: false,
    sourceImg: ''
});

onBeforeMount(() => {
    onAuthStateChanged(auth, async(user) => {
        main.isLoading = true;
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const docRef = doc(db, 'users', `${user.email}`);
            const docSnap = await getDoc(docRef);

            main.email = user.email;
            main.name = docSnap.data().name.split(' ')[0] + ' ' + docSnap.data().lastName.split(' ')[0];

            if (!docSnap.data().profilePic) main.sourceImg = 'https://firebasestorage.googleapis.com/v0/b/integrative-guidelines.appspot.com/o/profile.webp?alt=media&token=b12d3276-179c-4493-a950-8634cea37175';
            else main.sourceImg = docSnap.data().profilePic;

        } else {
            router.push('/');
        }
        main.isLoading = false;
    });
})
</script>

<style scoped>
.router-link-active{
    background-color: var(--light-color);
}

.router-link-active:hover {
    color: white;
}

.router {
    padding: 5px;
}
</style>