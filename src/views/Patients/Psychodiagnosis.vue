<template>
    <div v-if="isLoading" class="flex justify-center my-20">
        <Spinner class="text-4xl" />
    </div>
    <div v-else>
        <h1 class="font-extrabold text-2xl text-center mt-4">Psicodiagnóstico</h1>
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
                            {{ item.data().data.Consulta }}
                        </td>
                        <td class="px-3 py-4 text-center">
                            {{ item.data().createdAt }}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <button @click="router.push(`diagnosis/${item.id}`)"
                                class="font-medium text-light dark:text-blue-500 hover:underline">
                                Ir
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else>
                <h1>No existen consultas creadas para este paciente.</h1>
            </div>
        </section>
        <ButtonVue class="p-4" variant="info" @click="router.push(`/create/psychodiagnosis/${props.id}`)">
            Crear una nueva consulta
        </ButtonVue>
    </div>
</template>

<script setup>
import ButtonVue from '@/general_components/ButtonVue.vue';
import { router } from '../../routes';
import { onBeforeMount, ref } from 'vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/main.js';
import Spinner from '../../general_components/Spinner.vue';

const props = defineProps({
    id: {
        required: true,
        type: String
    },
    data: {
        required: true,
        type: Object
    },
    createdAt: {
        required: true,
        type: String
    }
});
const content = [
    'Lugar de atención', 'Unicódigo',
    'Apellidos', 'Nombres', 'Género', 'Número de cédula',
]
const dataCopy = ref([]);
const isLoading = ref(false);

onBeforeMount(async() => {
    isLoading.value = true;
    const diagnRef = collection(db, 'psychodiagnosis');
    const q = query(diagnRef, where('patient', '==', `${props.id}`));
    const querySnapshot = await getDocs(q);
    dataCopy.value = [ ...querySnapshot.docs ];
    isLoading.value = false;
})
</script>