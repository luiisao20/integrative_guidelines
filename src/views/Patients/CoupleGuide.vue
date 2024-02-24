<template>
    <ModalForm
        :show-modal="showForm"
        @close-modal="showForm = false; opacity = '1'"
        :normal="true"
        @add-data="pushData"
        :title="propertie.subtitle"
    />
    <div :style="{ opacity: opacity }" >
        <h1 class="mb-2 text-xl font-semibold">Datos informativos</h1>
        <h2 class="pb-4 pl-2">Tipo de relación: {{ dataCopy.dataCouple['Tipo de relación'] }}</h2>
        <div class="flex flex-row gap-4 p-2">
            <section class="grid w-full border-2 border-indigo-300 p-2 rounded-xl">
                <div v-for="(item, index) in keysCouple" :key="index">
                    <div class="relative z-0 w-full mb-2 group">
                        <input :value="data.dataPatient[item]" type="text" :name="`floating_${item}_filled`" :id="`floating_${item}_filled`"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=" " disabled />
                        <label :for="`floating_${item}_filled`"
                            class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {{ item }}</label>
                    </div>
                </div>
            </section>
            <section class="grid w-full border-2 border-indigo-300 p-2 rounded-xl">
                <div v-for="(item, index) in keysCouple" :key="index">
                    <div class="relative z-0 w-full mb-2 group">
                        <input :value="dataCopy.dataCouple[`${item}`]" type="text" :name="`floating_${item}_filled`" :id="`floating_${item}_filled`"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=" " disabled />
                        <label :for="`floating_${item}_filled`"
                            class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {{ item }}</label>
                    </div>
                </div>
            </section>
        </div>
        <section class="my-4" v-for="(item, index) in keysOptions" :key="index">
            <h2 class="font-semibold">
                {{ item }}:
                <span class="flex pl-4 font-normal" v-for="subitem in dataCopy[item].options">- {{ subitem }}</span>
                <span class="pl-4 font-normal" v-if="dataCopy[item].other !== ''">- {{ dataCopy[item].other }}</span>
            </h2>
        </section>
        <section v-for="(section, index) in sections" :key="index" class="mt-4">
            <h2 class="font-semibold">{{ section.title }}</h2>
            <div v-for="(item, subindex) in section.options" v-if="section.type === 'text'" :key="subindex" class="odd:bg-gray-500 py-2 odd:text-white rounded-xl mx-4">
                <h2 class="pl-4 flex items-center justify-between px-4 my-2 text-sm">
                    <span class="pr-10">{{ item }}:</span>
                    <a @click="showForm = true; opacity = '0.2'; propertie.title = section.title; propertie.subtitle = item" v-if="dataCopy[section.title][item] === ''" class="hover:underline hover:underline-offset-2 cursor-pointer">Agregar / Editar</a>
                </h2>
                <p class="text-xs leading-relaxed whitespace-pre-line mx-10">{{ dataDoubled[section.title][item] }}</p>
            </div>
            <div class="grid md:grid-cols-2 gap-4 my-4" v-else>
                <div v-for="(item, subindex) in section.options" class="p-2 shadow-sm shadow-main-default rounded-xl" :key="subindex">
                    <h2 class="pl-4 text-sm flex items-center justify-between pr-4">
                        <span class="pr-10 font-semibold">{{ item }}:</span>
                        <a @click="showForm = true; opacity = '0.2'; propertie.title = section.title; propertie.subtitle = item" v-if="dataCopy[section.title][item] === ''" class="cursor-pointer hover:underline hover:underline-offset-2 text-light">Agregar / Editar</a>
                    </h2>
                    <p class="text-xs px-4 py-2 leading-relaxed whitespace-pre-line">{{ dataDoubled[section.title][item] }}</p>
                </div>
            </div>
        </section>
        <div class="text-end">
            <button @click="loadData" class="bg-light text-white py-2 px-4 rounded-xl">
                <span v-if="!isLoading">Guardar datos</span>
                <span v-else><Spinner class=""/> Cargando</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import ModalForm from '../../general_components/ModalForm.vue';
import Spinner from '../../general_components/Spinner.vue';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/main.js';

const props = defineProps({
    id: {
        required: true,
        type: String
    },
    coupleid: {
        required: true,
        type: String
    },
    dataCopy: {
        required: true,
        type: Object
    },
    data: {
        required: true,
        type: Object
    }
})
const showForm = ref(false);
const opacity = ref('');
const dataDoubled = ref({});
const propertie = reactive({
    title: '',
    subtitle: ''
});
const keysCouple = [
    'Nombres', 'Apellidos', 'Ocupación',
    'Instrucción', 'Dirección', 'Ciudad de residencia',
    'Celular', 'Estado Civil'
]
const sections = [
    {
        title: 'Tipo de demanda',
        options: [
            'Explícita Individual (paciente)',
            'Explícita Individual (pareja)',
            'Explícita de Pareja',
            'Implícita Individual (paciente)',
            'Implícita Individual (pareja)',
            'Implícita de Pareja',
            'Antecedentes Disfuncionales de la Pareja',
            'Tipo de pareja',
            'Etapa de pareja'
        ],
        type: 'text'
    },
    {
        title: 'Características de personalidad',
        options: [ 'Paciente', 'Pareja' ],
        type: 'text'
    },
    {
        title: 'Interacción Familiar Nuclear',
        options: [
            'Relación del paciente con la madre',
            'Relación de la pareja con la madre',
            'Relación del paciente con el padre',
            'Relación de la pareja con el padre',
            'Relación del paciente con los hermanos',
            'Relación de la pareja con los hermanos',
        ],
        type: 'grid'
    },
    {
        title: 'Interacción Familiar Propia',
        options: [
            'Relación conyugal (paciente)',
            'Relación conyugal (pareja)',
            'Relación con los hijos (paciente)',
            'Relación con los hijos (pareja)',
            'Observaciones (paciente)',
            'Observaciones (pareja)',
        ],
        type: 'grid'
    },
]
const keysOptions = [ 'Ámbito de consulta', 'Origen de la demanda'];
const isLoading = ref(false);

onBeforeMount(() => {
    dataDoubled.value = JSON.parse(JSON.stringify(props.dataCopy));
})

function pushData(description) {
    dataDoubled.value[propertie.title][propertie.subtitle] = description;
}

async function loadData() {
    isLoading.value = true;
    const coupleRef = doc(db, 'couples', props.coupleid);
    await updateDoc(coupleRef, {
        data: dataDoubled.value
    })
    location.reload();
    isLoading.value = false;
}
</script>