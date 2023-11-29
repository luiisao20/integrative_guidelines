<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
    />
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Entrar a tu cuenta
                    </h1>
                    <form @submit.prevent="logIn" class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                            <input type="email" v-model="user.email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                            <PasswordInput v-model:password="user.password" />
                        </div>
                        <div class="flex items-center justify-between">
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste tu contraseña?</a>
                        </div>
                        <button type="submit" class="w-full text-white bg-main-default hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <p v-if="!isLoading">Ingresar</p>
                            <Spinner v-else class="text-white text-2xl" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { router } from '../routes';
import PasswordInput from '../general_components/PasswordInput.vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Spinner from '../general_components/Spinner.vue';
import { useModal } from '@/composables/modal';
import ModalAlert from '@/general_components/ModalAlert.vue';

const auth = getAuth();
const user = reactive({
    email: '',
    password: ''
})
const isLoading = ref(false);
const { opacity, modalAlert, showModalAlert } = useModal();

function logIn() {
    isLoading.value = true;

    if (user.email.toString().trim() === '' || user.password.toString().trim() === '') console.log('error');
    else {  
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                router.push('/patientslist');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                showModalAlert(errorMessage, false, { variant: 'danger' });
            })
            .finally(() => {
                isLoading.value = false;
            })
    }
}
</script>