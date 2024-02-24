<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendData"
        :is-loading="isLoading"
    />
    <div :style="{ opacity: opacity }">
        <section v-if="!isLoading">
            <h1 class="font-extrabold text-2xl text-center my-4">Psicoterapia</h1>
            <div class="flex justify-center">
                <table class="w-[70%] text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-3 py-3 w-1/4 text-center">
                                Proceso N°
                            </th>
                            <th scope="col" class="px-3 py-3 text-center">
                                Nombre
                            </th>
                            <th scope="col" class="px-3 py-3 text-center">
                                Fecha de creación
                            </th>
                            <th scope="col" class="px-3 py-3">
                            </th>
                            <th scope="col" class="px-3 py-3">
                                Eliminar
                            </th>
                        </tr>
                    </thead>
                    <tbody v-for="(item, index) in dataCopy" :key="index">
                        <tr class="bg-white text-black border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-3 py-4 font-bold text-center dark:text-white">
                                {{ index + 1 }}
                            </th>
                            <td class="px-3 py-4 text-center">
                                {{ item.data().processName }}
                            </td>
                            <td class="px-3 py-4 text-center">
                                {{ item.data().date }}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <button @click="router.push(`process/${item.id}`)"
                                    class="font-medium text-light dark:text-blue-500 hover:underline">
                                    Ir
                                </button>
                            </td>
                            <td class="px-3 py-4 text-center">
                                <button :disabled="isDeleting" v-bind:class="{ loading: isDeleting }" class="text-danger text-2xl cursor-pointer" @click="deleteProcess(item.id)">
                                    <font-awesome-icon class="rotate-45" icon="fa-solid fa-circle-plus"/>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <CreateGuide @show-form="showForm = true" guide="five" :id="id" :text="text"/>
            </div>
            <div v-if="showForm">
                <form @submit.prevent="createProcess">
                    <div class="relative z-0 w-full mb-6 group">
                        <input v-model="processName" type="text" name="floating_name" id="floating_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Escribe un nombre para el nuevo proceso
                        </label>
                    </div>
                    <ButtonVue type="submit" class="p-4" variant="info">
                        Crear un nuevo proceso
                    </ButtonVue>
                </form>
            </div>
        </section>
        <div v-else class="flex justify-center">
            <Spinner class="text-4xl py-10"/>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import ButtonVue from '@/general_components/ButtonVue.vue';
import { useModal } from '@/composables/modal';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { formatDate } from '@/composables/formatDate';
import { router } from '../../routes';
import { addDoc, collection, getDocs, query, where, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/main.js';
import Spinner from '../../general_components/Spinner.vue';
import CreateGuide from '../../general_components/CreateGuide.vue';

const props = defineProps({
    id: {
        required: true,
        type: String
    },
    createdAt: {
        required: true,
        type: String
    },
    data: {
        required: true,
        type: Object
    }
})
const { opacity, modalAlert, showModalAlert } = useModal();
const showForm = ref(false);
const isLoading = ref(true);
const isDeleting = ref(false);
const processName = ref('');
const text = ref('');
const dataCopy = ref([]);

async function fecthProcesses() {
    const q = query(collection(db, 'processes'), where('patient', '==', `${props.id}`));

    const querySnapshot = await getDocs(q);

    dataCopy.value = [...querySnapshot.docs];

    dataCopy.value.sort((a, b) => {
        const nameA = new Date(a.data().date);
        const nameB = new Date(b.data().date);
        if (nameA < nameB) {
            return 1;
        }
        if (nameA > nameB) {
            return -1;
        }
        // names must be equal
        return 0;
    })
}

onBeforeMount(async() => {
    isLoading.value = true;
    if(!props.data.consent.accept) {
        showModalAlert('Necesitas llenar el consentimiento informado del paciente para entrar aquí. Cierra este cuadro de diálogo y ve a la pestaña "consentimiento informado"', false, { variant: 'danger' });
        return
    }
    await fecthProcesses();
    if (dataCopy.value.length > 0) text.value = '¿Crear un nuevo proceso?'
    else text.value = 'No existen datos, ¿Deseas crear un nuevo proceso?'
    isLoading.value = false;
})

async function createProcess() {

    if (processName.value.toString().trim() === '') {
        showModalAlert('Debes escribir un nombre para el proceso', false, {variant: 'danger'})
    } else if (dataCopy.value.some(value => value.data().processName === processName.value)) {
        showModalAlert(`El proceso "${processName.value}" ya existe!, escoge otro nombre`, false, {variant: 'danger'})
    } else {
        showModalAlert(`¿Deseas crear un nuevo proceso para el paciente ${props.data.dataPatient.Nombres} ${props.data.dataPatient.Apellidos}?`, true)
    }
}

async function sendData() {
    isLoading.value = true;
    try {
        await addDoc(collection(db, 'processes'), {
            patient: props.id,
            processName: processName.value,
            date: formatDate(new Date())
        })

        await fecthProcesses();
        
        showModalAlert('¡Proceso creado!', false, {variant: 'success', showRoute: true});
    } catch (error) {
        showModalAlert(error, false, {variant: 'danger'})
    }
    isLoading.value = false;
}

async function deleteProcess(id) {
    isDeleting.value = true;
    const q = query(collection(db, 'guideone'), where('process', '==', id));
    const docSnapshot = await getDocs(q);
    if(docSnapshot.docs.length > 0) {
        showModalAlert('Sólo es posible eliminar procesos sin datos creados', false, { variant: 'danger' });
    } else {
        await deleteDoc(doc(db, 'processes', id));
        showModalAlert('¡El proceso se ha eliminado correctamente!', false, { variant: 'success' });
        await fecthProcesses();
    }
    isDeleting.value = false;
}
</script>

<style scoped>
.loading {
    cursor: progress;
}
</style>