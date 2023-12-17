<template>
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="deletePayment"
        :is-loading="isLoading.delete"
    />
    <section :style="{ opacity: opacity }">
        <h1 class="mb-4 text-3xl text-center mt-10 font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-black from-light">Sección de pagos</span></h1>
        <p class="text-lg font-normal text-black lg:text-xl dark:text-gray-400 w-[80%] mx-auto">
            Usa este apartado del perfil para subir en imágenes el comprobante de pago, y revisar su estado, si se encuentra verificado o no.
        </p>
        <form @submit.prevent="uploadFile" class="w-3/4 mx-auto my-5 text-base flex flex-col gap-4">
            <div class="relative">
                <input type="text" v-model="description" id="floating_filled" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label for="floating_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Descripción (opcional)</label>
            </div>
            <label class="block font-medium text-gray-900 dark:text-white" for="file_input">
                Sólo se admiten archivos .jpg, .jpeg, .png, .pdf. (De tamaño máximo 5Mb)
            </label>
            <input 
                @change="applyFile" required
                accept=".jpg,.png,.jpeg"
                class="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                id="file_input" type="file">
            <div class="flex justify-end">
                <button class="px-6 py-2 bg-light rounded-xl text-white mt-4" :disabled="isLoading.sending" type="submit">
                    <span v-if="isLoading.sending"><Spinner /> Cargando</span>
                    <span v-else>Subir</span>
                </button>
            </div>
        </form>
        <div v-if="isLoading.data" class="flex justify-center">
            <Spinner class="text-4xl py-20"/>
        </div>
        <FilesList
            :list="payments"
            v-else-if="payments.length > 0"
            :is-disabled="true"
            @delete-payment="tryDelete"
        />
        <p v-else>No hay pagos subidos por el momento</p>
    </section>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from 'vue';
import { deleteObject, getDownloadURL, getStorage, ref as refStrg, uploadBytes } from "firebase/storage";
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/main.js';
import { formatDate } from '@/composables/formatDate';
import Spinner from '../../general_components/Spinner.vue';
import FilesList from '../../general_components/FilesList.vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import { fetchPayments } from '../../composables/fetchPayments';

const props = defineProps({
    data: { required: true, type: Object }
})
const { opacity, modalAlert, showModalAlert } = useModal();
const file = ref(null);
const storage = getStorage();
const description = ref('');
const urlFile = ref('');
const payments = ref([]);
const isLoading = reactive({
    sending: false, data: false, delete: false
});

function applyFile(event) {
    file.value = event.target.files[0];
}

onBeforeMount(async() => {
    isLoading.data = true;

    payments.value = await fetchPayments(props.data.id);

    isLoading.data = false;
})

function uploadFile() {

    const exists = payments.value.find((payment) => payment.fileName === file.value.name);

    if (file.value && !exists) {
        isLoading.sending = true;
        const storageRef = refStrg(storage, `${props.data.id}/payments/${file.value.name}`);
        uploadBytes(storageRef, file.value).then(async(snapshot) => {
            await saveInDb();
        }).catch((error) => showModalAlert(error.message, false, { variant: 'danger' })).finally(() => {
            isLoading.sending = false;
        })
    } else if (exists) {
        showModalAlert('El archivo ya existe, cambia el nombre y vuelve a intentarlo', false, { variant: 'danger'});
    }
}

async function saveInDb() {
    const path = `${props.data.id}/payments/${file.value.name}`;

    const url = await getDownloadURL(refStrg(storage, path))
    try {
        urlFile.value = url;
        await addDoc(collection(db, 'payments'), {
            owner: props.data.id,
            fileName: file.value.name,
            url: url,
            date: formatDate(new Date()),
            description: description.value,
            state: false
        })

        isLoading.data = true;
        payments.value = await fetchPayments(props.data.id);
        isLoading.data = false;
        showModalAlert('¡Pago subido con éxito!', false, { variant: 'success' });
    } catch (error) {
        console.log(error.message);
    }
}

function tryDelete(item) {
    showModalAlert('¿Estás seguro de borrar el pago? No podrás recuperarlo', true);
    file.value = item;
}

function deletePayment(){
    isLoading.delete = true;
    const desertRef = refStrg(storage, `${props.data.id}/payments/${file.value.data().fileName}`);

    deleteObject(desertRef).then(async() => {
        // File deleted successfully
        await deleteDoc(doc(db, 'payments', `${file.value.id}`));
        showModalAlert('Se ha borrado correctamente, recarga la página', false, { variant: 'success' });
    }).catch((error) => {
        console.log(error.message);
    }).finally(() => isLoading.delete = false);
}
</script>