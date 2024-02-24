<template>
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="changePassword"
        :is-loading="isLoading"
    />
    <div :style="{ opacity: opacity }">
        <h1 class="mb-4 text-3xl text-center mt-10 font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-black from-light">Cambio de contraseña</span></h1>
        <div class="flex flex-col gap-4 w-[80%] mx-auto my-4">
            <p class="text-lg font-normal text-black lg:text-xl dark:text-gray-400">
                Mantén tu cuenta segura y protegida mediante la gestión de tu contraseña. Cambia tu contraseña regularmente para garantizar la seguridad de tus datos.
            </p>
            <p class="text-lg font-normal text-black lg:text-xl dark:text-gray-400">
                La contraseña debe tener mínimo 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial (= >?:;'{}).
            </p>
        </div>
        <form @submit.prevent="checkPass" class="space-y-4 md:space-y-6 w-1/2 mx-auto" action="#">
            <div>
                <label for="password" class="block mb-2 font-medium text-gray-900 dark:text-white">Contraseña</label>
                <PasswordInput v-model:password="data.password" name="password" />
            </div>
            <div>
                <label for="confirm-password" class="block mb-2 font-medium text-gray-900 dark:text-white">Repetir contraseña</label>
                <PasswordInput name="confirm-password" v-model:password="data.confirmPassword" />
            </div>
            <button type="submit" :disabled="isLoading" class="w-1/2 text-white bg-light hover:bg-main-default focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Cambiar contraseña
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import PasswordInput from '../../general_components/PasswordInput.vue';
import { getAuth, onAuthStateChanged, updatePassword } from 'firebase/auth';
import { router } from '@/routes';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';

const props = defineProps({
    data: { required: true, type: Object }
})
const isLoading = ref(false);
const currentUser = ref(null);
const data = reactive({password: '', confirmPassword: '', email: ''});
const checkPassword = "^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[= >?:;'{}]).{8,}$";
const auth = getAuth();
const { opacity, modalAlert, showModalAlert } = useModal();

onBeforeMount(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            data.email = user.email;
            currentUser.value = user;
        }
        else router.push('/');
    })
})

function checkPass() {
    if (! new RegExp(checkPassword).test(data.password) || data.password !== data.confirmPassword) {
        showModalAlert('La contraseña no cumple con los parámetros establecidos', false, { variant: 'danger' });
    } else {
        showModalAlert('¿Estás seguro de cambiar la contraseña?', true);
    }
}

function changePassword() {
    isLoading.value = true;
    updatePassword(currentUser.value, data.password).then(() => {
        showModalAlert('¡Contraseña cambiada con éxito!', false, { variant: 'success' });
    }).catch((error) => {
        showModalAlert(`${error.message}`, false, { variant: 'danger' })
    }).finally(() => isLoading.value = false);
}
</script>