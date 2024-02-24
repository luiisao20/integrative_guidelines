<template>
    <SideBar
        :options="sideBarContent"
        title="text"
    />
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false;
                    opacity = '1';
                    if(goBack) router.push(`/${id}/couple`);"
        @send-data="sendData"
        @go-route="router.push(`/${id}/couple`)"
        :is-loading="isLoading.sending"
    />
    <div v-if="isLoading.data" class="flex justify-center my-20">
        <Spinner class="text-4xl" />
    </div>
    <form action="" v-else :style="{ opacity: opacity }" @submit.prevent="checkValues">
        <div class="sticky top-2 bg-background">
            <h1 class="my-5 text-2xl text-center font-bold">{{ data.Proceso }}</h1>
        </div>
        <h1 class="mb-2 font-semibold">Datos informativos</h1>
        <div class="flex flex-row gap-4" id="Datos informativos">
            <div class="grid w-full border-2 border-indigo-300 p-2 rounded-xl">
                <h1 class="text-center mb-2 font-semibold">Paciente</h1>
                <div v-for="(item, key) in data.dataCouple" :key="key">
                    <div class="relative z-0 w-full mb-2 group" v-if="key !== 'Tipo de relación'">
                        <input v-model="dataCopy[key]" type="text" :name="`floating_${key}_filled`" :id="`floating_${key}_filled`"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=" " disabled />
                        <label :for="`floating_${key}_filled`"
                            class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {{ key }}</label>
                    </div>
                </div>
                <div class="relative z-0 w-full mb-2 group">
                    <input v-model="data.dataCouple['Tipo de relación']" type="text" name="floating_relationship_patient_filled" id="floating_relationship_patient_filled"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                        placeholder=" " disabled />
                    <label for="floatinrelationship_patient_filled"
                        class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Tipo de relación</label>
                </div>
            </div>
            <div class="grid w-full border-2 border-indigo-300 p-2 rounded-xl">
                <h1 class="text-center mb-2 font-semibold">Pareja</h1>
                <div class="relative z-0 w-full mb-2 group" v-for="(item, key) in data.dataCouple" :key="key">
                    <input v-model="data.dataCouple[key]" type="text" :name="`floating_${key}`" :id="`floating_${key}`"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                        placeholder=" "  />
                    <label :for="`floating_${key}`"
                        class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {{ key }}</label>
                </div>
            </div>
        </div>
        <div v-for="(item, key) in options" :key="key" class="my-10" :id="key">
            <h1 class="mb-2 font-semibold">{{ key }}</h1>
            <div class="flex items-center px-10">
                <div v-for="(subitem, index) in item" :key="index" class="flex items-center me-4 w-3/4">
                    <input :id="`inline-checkbox-${subitem}`" type="checkbox" :value="subitem" @change="updateOptions(key, subitem, $event.target.checked)"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label :for="`inline-checkbox-${subitem}`" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ subitem }}</label>
                </div>
                <div class="relative z-0 w-full mb-2 group">
                    <input type="text" name="floating_other_consult" id="floating_other_consult"
                        class="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                        placeholder=" " v-model="data[key].other" />
                    <label for="floating_other_consult"
                        class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Otros</label>
                </div>
            </div>
        </div>
        <h1 class="mb-2 font-semibold">Tipo de demanda</h1>
        <div class="grid md:grid-cols-2">
            <div v-for="(item, key) in data['Tipo de demanda']" class="p-2 last:col-span-2" :class="{ 'col-span-2': key === 'Explícita de Pareja' || key === 'Implícita de Pareja' }" :key="key" :id="key">
                <div class="relative z-0 mb-6 group">
                    <textarea v-model="data['Tipo de demanda'][key]" type="text" :name="`floating_${key}`" :id="`floating_${key}`" rows="4"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                        placeholder=" "  ></textarea>
                    <label :for="`floating_${key}`"
                        class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {{ key }}</label>
                </div>
            </div>
        </div>
        <h1 class="mb-2 font-semibold" id="Características de personalidad">Características de personalidad</h1>
        <div class="grid md:grid-cols-2">
            <div v-for="(item, key) in data['Características de personalidad']" class="p-2" :key="key">
                <div class="relative z-0 mb-6 group">
                    <textarea  v-model="data['Características de personalidad'][key]" type="text" :name="`floating_${key}`" :id="`floating_${key}`" rows="4"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                        placeholder=" "  ></textarea>
                    <label :for="`floating_${key}`"
                        class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {{ key }}</label>
                </div>
            </div>
        </div>
        <div class="mb-10">
            <h1 class="mb-2 font-semibold" id="Interacción Familiar Nuclear">Interacción Familiar Nuclear</h1>
            <div class="grid md:grid-cols-2 gap-2">
                <div v-for="(item, key) in data['Interacción Familiar Nuclear']" class="p-2 shadow-sm shadow-main-default rounded-xl" :key="key">
                    <div class="relative z-0 group">
                        <textarea  v-model="data['Interacción Familiar Nuclear'][key]" type="text" :name="`floating_${key}`" :id="`floating_${key}`" rows="4"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=" "  ></textarea>
                        <label :for="`floating_${key}`"
                            class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {{ key }}</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-10 mb-4">
            <h1 class="mb-2 font-semibold" id="Interacción Familiar Propia">Interacción Familiar Propia</h1>
            <div class="grid md:grid-cols-2 gap-2">
                <div v-for="(item, key) in data['Interacción Familiar Propia']" class="p-2 shadow-sm shadow-main-default rounded-xl" :key="key">
                    <div class="relative z-0 group">
                        <textarea  v-model="data['Interacción Familiar Propia'][key]" type="text" :name="`floating_${key}`" :id="`floating_${key}`" rows="4"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=" "  ></textarea>
                        <label :for="`floating_${key}`"
                            class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {{ key }}</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-end">
            <button type="submit" class="bg-light mb-10 text-white px-4 py-2 rounded-xl">
                Enviar
            </button>
        </div>
    </form>
</template>

<script setup>
import { onBeforeMount, reactive, ref, onBeforeUnmount } from 'vue';
import { doc, getDoc, query, collection, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/main.js';
import SideBar from '@/guide_components/SideBar.vue';
import { useModal } from '@/composables/modal';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { formatDate } from '@/composables/formatDate';
import { router } from '@/routes';
import Spinner from '../../general_components/Spinner.vue';

const props = defineProps(['id']);
const { opacity, modalAlert, showModalAlert } = useModal();
const isLoading = reactive({
    data: false, sending: false
})
const dataCopy = ref({});
const sideBarContent = [
    {
        code: '2.1',
        text: 'Datos informativos'
    },
    {
        code: '2.2',
        text: 'Ámbito de consulta'
    },
    {
        code: '3',
        text: 'Origen de la demanda'
    },
    {
        code: '4',
        text: 'Explícita Individual (paciente)'
    },
    {
        code: 'as',
        text: 'Explícita Individual (pareja)'
    },
    {
        code: '5',
        text: 'Explícita de Pareja'
    },
    {
        code: '6.1',
        text: 'Implícita Individual (paciente)'
    },
    {
        code: '6.1',
        text: 'Implícita Individual (pareja)'
    },
    {
        code: '6.2',
        text: 'Implícita de Pareja'
    },
    {
        code: '6.3',
        text: 'Antecedentes Disfuncionales de la Pareja'
    },
    {
        code: '7',
        text: 'Tipo de pareja'
    },
    {
        code: '8',
        text: 'Etapa de pareja'
    },
    {
        code: '6.3',
        text: 'Características de personalidad'
    },
    {
        code: '7',
        text: 'Interacción Familiar Nuclear'
    },
    {
        code: '8',
        text: 'Interacción Familiar Propia'
    },
]
const data = reactive({
    'Proceso': '',
    dataCouple: {
        'Nombres': '',
        'Apellidos': '',
        'Ocupación': '',
        'Instrucción': '',
        'Dirección': '',
        'Ciudad de residencia': '',
        'Celular': '',
        'Estado Civil': '',
        'Tipo de relación': ''
    },
    'Ámbito de consulta': {
        options: [],
        other: ''
    },
    'Origen de la demanda': {
        options: [],
        other: ''
    },
    'Tipo de demanda': {
        'Explícita Individual (paciente)': '',
        'Explícita Individual (pareja)': '',
        'Explícita de Pareja': '',
        'Implícita Individual (paciente)': '',
        'Implícita Individual (pareja)': '',
        'Implícita de Pareja': '',
        'Antecedentes Disfuncionales de la Pareja': '',
        'Tipo de pareja': '',
        'Etapa de pareja': ''
    },
    'Características de personalidad': {
        'Paciente': '',
        'Pareja': ''
    },
    'Interacción Familiar Nuclear': {
        'Relación del paciente con la madre': '',
        'Relación de la pareja con la madre': '',
        'Relación del paciente con el padre': '',
        'Relación de la pareja con el padre': '',
        'Relación del paciente con los hermanos': '',
        'Relación de la pareja con los hermanos': '',
    },
    'Interacción Familiar Propia': {
        'Relación conyugal (paciente)': '',
        'Relación conyugal (pareja)': '',
        'Relación con los hijos (paciente)': '',
        'Relación con los hijos (pareja)': '',
        'Observaciones (paciente)': '',
        'Observaciones (pareja)': '',
    }
})
const options = {
    'Ámbito de consulta': [
        'Institucional', 'Consulta Privada'
    ],
    'Origen de la demanda': [
        'Pareja', 'Un miembro', 'Familiar'
    ],
}
const isEmpty = ref(false);
const goBack = ref(false);

onBeforeMount(async() => {
    isLoading.data = true;

    const patientRef = doc(db, 'patients', props.id);
    const docSnap = await getDoc(patientRef);
    dataCopy.value = { ...docSnap.data().dataPatient };

    const q = query(collection(db, 'couples'), where('patient', '==', props.id));
    const querySnapshot = await getDocs(q);
    data.Proceso = `Proceso de pareja ${querySnapshot.docs.length + 1}`;

    // window.addEventListener('beforeunload', stopLoad, true);

    isLoading.data = false;
})

onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', stopLoad, true);
})

function stopLoad(event) {
    event.preventDefault();
    event.returnValue = '';
}

function updateOptions(item, subitem, isChecked) {
    if (isChecked) data[item].options.push(subitem);
    else {
        const index = data[item].options.indexOf(subitem);
        if (index !== -1) data[item].options.splice(index, 1);
    }
}

function checkValues() {
    const keysExcluded = ['Ámbito de consulta', 'Origen de la demanda', 'Proceso'];
    isEmpty.value = false;

    for (const key in data.dataCouple) {
        if(data.dataCouple[key].toString().trim()=== '') {
            console.log(subkey);
            isEmpty.value = true;
            showModalAlert(`El campo "${subkey}" se encuentra vacío`, false, { variant: 'danger' });
            return
        }
    }

    for (const key of keysExcluded) {
        if(key !== 'Proceso') {
            if (data[key].options.length === 0 && data[key].other.toString().trim() === '') {
                isEmpty.value = true;
                showModalAlert(`En el campo "${key}" necesitas elegir al menos una opción`, false, { variant: 'danger' });
                return
            }
        }
    }

    if (!isEmpty.value) {
        showModalAlert('¿Estás seguro de enviar los datos?', true);
    }
}

async function sendData() {
    isLoading.sending = true;

    try {
        await addDoc(collection(db, 'couples'), {
            patient: props.id,
            data: data,
            date: formatDate(new Date())
        })
        showModalAlert('¡Datos guardados! Visita la guía dando click en "Ir"', false, { variant: 'success', showRoute: true });
        goBack.value = true;
    } catch (error) {
        showModalAlert(error.message, false, { variant: 'danger' });
    }
    isLoading.sending = false;
}

</script>