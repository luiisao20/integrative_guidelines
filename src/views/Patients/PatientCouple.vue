<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        :is-loading="false"
    />
    <div v-if="isLoading" class="flex justify-center my-20">
        <Spinner class="text-4xl" />
    </div>
    <div v-else :style="{ opacity: opacity }">
        <h1 class="font-extrabold text-2xl text-center mt-4">Terapia de pareja</h1>
        <div class="grid grid-cols-2 gap-4 items-center my-4">
            <div v-for="(item, index) in content" :key="index">
                <div class="flex justify-between items-center shadow-sm shadow-light p-2 text-sm">
                    <h2 class="font-bold">{{ item }}:</h2>
                    <p class="text-right">{{ data.dataPatient[item] }}</p>
                </div>
            </div>
        </div>
        <section class="flex justify-center my-10">
            <table v-if="dataCopy.length > 0" class="w-3/4 text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-3 py-3 w-1/4 text-center">
                            Consulta
                        </th>
                        <th scope="col" class="px-3 py-3 text-center">
                            Fecha de creación
                        </th>
                        <th scope="col" class="px-3 py-3">
                        </th>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in dataCopy" :key="index">
                    <tr class="bg-white text-black border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-3 py-4 text-center">
                            {{ item.data().data.Proceso }}
                        </td>
                        <td class="px-3 py-4 text-center">
                            {{ item.data().date }}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <button @click="router.push(`coupleview/${item.id}`)"
                                class="font-medium text-light dark:text-blue-500 hover:underline">
                                Ir
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        <button class="bg-light text-white p-4 rounded-xl" @click="createConsult">
            Crear una nueva consulta
        </button>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/main.js';
import { router } from '@/routes';
import { useModal } from '@/composables/modal';
import ModalAlert from '@/general_components/ModalAlert.vue';
import Spinner from '../../general_components/Spinner.vue';

const props = defineProps({
    id: {
        required: true, type: String
    },
    data: {
        required: true, type: Object
    },
    createdAt: {
        required: true, type: String
    }
})
const content = [
    'Ocupación', 'Instrucción',
    'Ciudad de residencia', 'Dirección', 
    'Celular', 'Estado Civil', 'Número de hijos'
]
const isLoading = ref(false);
const dataCopy = ref([]);
const { opacity, showModalAlert, modalAlert } = useModal();

onBeforeMount(async() => {
    isLoading.value = true;
    const coupleRef = collection(db, 'couples');
    const q = query(coupleRef, where('patient', '==', props.id));
    const querySnapshot = await getDocs(q);
    dataCopy.value = [ ...querySnapshot.docs ];
    isLoading.value = false;
})

function createConsult() {
    if (props.data.consent.accept) router.push(`/create/couple/${props.id}`);
    else {
        showModalAlert('Para crear una nueva consulta necesitas llenar el consentimiento informado del paciente', false, { variant: 'danger' })
    }
}
</script>