<template>
    <div class="grid grid-cols-2 gap-4 my-10 items-center justify-center">
        <h1><span class="font-bold">Nombres:</span> {{ userData.data().lastName }} {{ userData.data().name }}</h1>
        <h1><span class="font-bold">Correo electrónico:</span> {{ userData.id }}</h1>
        <h1><span class="font-bold pr-2">Fecha de inicio:</span> 
            <span v-if="userData.data().beginDate">
                {{ formatDate(userData.data().beginDate) }}
            </span>
            <span v-else>
                No asignado
            </span>
        </h1>
        <h1><span class="font-bold pr-2">Fecha de fin:</span> 
            <span v-if="userData.data().finishDate">
                {{ formatDate(userData.data().finishDate) }}
            </span>
            <span v-else>
                No asignado
            </span>
        </h1>
        <h1><span class="font-bold">Máximo actual de pacientes:</span> {{ userData.data().maxPatients }}</h1>
        <h1><span class="font-bold">Número actual de pacientes:</span> {{ actualPatients }}</h1>
    </div>
    <h1 class="font-bold text-2xl text-center">Actualizar / Modificar valores</h1>
    <form @submit.prevent="updateUser" class="mb-10 p-4 grid grid-cols-2 gap-4">
        <div class="relative z-0">
            <DatePretty
                title="Fecha de fin"
                @updateDate="updateEnd"
            />
        </div>
        <div class="relative z-0">
            <DatePretty
                title="Fecha de inicio"
                @updateDate="updateBegin"
            />
        </div>
        <div class="relative z-0">
            <input type="text" id="floating_standard" required v-model="dataForm.maxPatients" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="floating_standard" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Máximo de pacientes</label>
        </div>
        <div class="flex justify-end">
            <button class="bg-light px-4 py-2 rounded-xl text-white w-1/2" type="submit" :disabled="isLoading.sending">
                <span v-if="isLoading.sending" class="flex items-center gap-2"><Spinner />Cargando</span>
                <span v-else>Actualizar</span>
            </button>
        </div>
    </form>
    <FilesList
        :list="userPayments"
        :isDisabled="false"
        :is-changing="isLoading.change"
        @change-state="updateState"
    />
</template>

<script setup>
import { onBeforeMount, ref, reactive } from 'vue';
import DatePretty from '@/general_components/DatePretty.vue';
import { formatDate } from '@/composables/formatDate';
import { fetchPayments } from '../../composables/fetchPayments';
import FilesList from '../../general_components/FilesList.vue';
import { doc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '@/main.js';
import Spinner from '../../general_components/Spinner.vue';

const props = defineProps({
    userData: { required: true, type: Object }
})
const dataForm = ref({});
const userPayments = ref([]);
const isLoading = reactive({
    change: false, sending: false
})
const actualPatients = ref(0);

async function updateUser() {
    isLoading.sending = true;
    const userRef = doc(db, 'users', `${props.userData.id}`);

    await updateDoc(userRef, {
        beginDate: dataForm.value.beginDate,
        finishDate: dataForm.value.finishDate,
        maxPatients: dataForm.value.maxPatients
    })
    isLoading.sending = false;
}

onBeforeMount(async() => {
    dataForm.value = { ...props.userData.data() }

    userPayments.value = await fetchPayments(props.userData.id);

    const patientsRef = query(collection(db, 'patients'), where('therapist', '==', `${props.userData.id}`));
    const querySnapshot = await getDocs(patientsRef);

    actualPatients.value = querySnapshot.docs.length;
})

async function updateState(id, state) {
    isLoading.change = true;
    const paymentRef = doc(db, 'payments', `${id}`);
    let newState = false;

    if (!state) newState = true;

    await updateDoc(paymentRef, { state: newState });
    userPayments.value = await fetchPayments(props.userData.id);
    isLoading.change = false;
}

function updateBegin(date) {
    dataForm.value.beginDate = date;
}

function updateEnd(date) {
    dataForm.value.finishDate = date;
}
</script>