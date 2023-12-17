<template>
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="createUser"
        :is-loading="isLoading"
    />
    <section class="dark:bg-gray-900" :style="{ opacity: opacity }">
        <div class="flex flex-col items-center px-6 py-8 mx-auto">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Crear un usuario
                    </h1>
                    <form @submit.prevent="checkValues" class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombres</label>
                            <input v-model="dataUser.name" type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                        </div>
                        <div>
                            <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                            <input v-model="dataUser.lastName" type="text" name="last-name" id="last-name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                            <input v-model="dataUser.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña (debe contener al menos un caracter especial, un número, una letra mayúscula y una minúscula y al menos 8 caracteres)</label>
                            <PasswordInput v-model:password="dataUser.password" name="password" />
                        </div>
                        <div>
                            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar contraseña</label>
                            <PasswordInput name="confirm-password" v-model:password="dataUser.confirmPassword" />
                        </div>
                        <button type="submit" :disabled="isLoading" class="w-full text-white bg-main-default hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <p v-if="!isLoading">Create an account</p>
                            <Spinner v-else class="text-white text-2xl" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import PasswordInput from '../../general_components/PasswordInput.vue';
import { reactive, ref, onBeforeMount } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useModal } from '@/composables/modal';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { db } from '@/main.js';
import { doc, setDoc } from "firebase/firestore"; 
import Spinner from '../../general_components/Spinner.vue';
import { router } from '@/routes';

const dataUser = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    lastName: ''
})
const isLoading = ref(false);
const { opacity, modalAlert, showModalAlert } = useModal();
const auth = getAuth();
const props = defineProps({
    data: { type: Object }
});

onBeforeMount(() => {
    if (!props.data.data().admin) router.push('/');
})

function checkValues() {
    const checkEmail = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
    const checkPassword = "^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[= >?:;'{}]).{8,}$";

    if (dataUser.password !== dataUser.confirmPassword || dataUser.name.toString().trim() === '' || dataUser.lastName.toString().trim() === ''
        || ! new RegExp(checkEmail).test(dataUser.email) || ! new RegExp(checkPassword).test(dataUser.password)) {
            showModalAlert('Existe un error en los datos del usuario.', false, { variant: 'danger' });
        }
    else showModalAlert('¿Guardar usuario?', true);
}

function createUser() {
    isLoading.value = true;
    createUserWithEmailAndPassword(auth, dataUser.email, dataUser.password)
        .then(async(userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            await setDoc(doc(db, 'users', `${dataUser.email}`), {
                name: dataUser.name,
                lastName: dataUser.lastName,
                createdAt: new Date(),
                description: null,
                profilePic: null,
                admin: false,
                maxPatients: 0,
                beginDate: null,
                finishDate: null
            });

            showModalAlert('Usuario registrado', false, { variant: 'success' });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorMessage);
        })
        .finally(() =>{
            isLoading.value = false;
        })
}
</script>