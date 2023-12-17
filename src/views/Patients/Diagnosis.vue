<template>
    <div v-if="isLoading.data" class="flex justify-center my-20">
        <Spinner class="text-4xl" />
    </div>
    <div v-else>
        <h1 class="font-extrabold text-2xl text-center mt-4">{{ dataCopy.data.Consulta }}</h1>
        <div v-for="(item, index) in content" :key="index" class="my-4">
            <div v-if="typeof dataCopy.data[item] === 'string' && dataCopy.data[item] !== ''" class="p-4">
                <h2 class="font-bold">{{ item }}: </h2>
                <p class="leading-relaxed px-4 pt-4 text-sm whitespace-pre-line">{{ dataCopy.data[item] }}</p>
            </div>
            <div v-else-if="item === 'Hábitos'">
                <h2 class="font-bold">{{ item }}: </h2>
                <div v-for="(item, key) in dataCopy.data[item].text" class="mx-20 text-sm my-4">
                    <p><span class="font-bold">{{ key }}:</span> {{ item }}</p>
                </div>
            </div>
            <div v-else-if="Array.isArray(dataCopy.data[item])">
                <h2 class="font-bold">{{ item }}: </h2>
                <table v-if="item === 'Evaluación Psicométrica'" class="my-10 mx-auto w-[80%]">
                    <thead class="text-xs text-gray-700 uppercase shadow-sm shadow-main-default">
                        <tr>
                            <th scope="col" class="px-6 py-3">Prueba</th>
                            <th scope="col" class="px-6 py-3">Descripción</th>
                            <th scope="col" class="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody v-for="(subitem, index) in dataCopy.data[item]" :key="index">
                        <tr class="border-b shadow-sm shadow-light text-sm">
                            <td class="px-6 py-2 text-center">{{ subitem.tag + 1 }}</td>
                            <td class="px-6 py-2">{{ subitem.description }}</td>
                            <td class="px-6 py-2 text-center"> <a class="text-light cursor-pointer hover:underline hover:underline-offset-2" @click="goFile(subitem.file)">Ir</a></td>
                        </tr>
                    </tbody>
                </table>
                <table v-else class="my-10 mx-auto w-[80%]">
                    <thead class="text-xs text-gray-700 uppercase shadow-sm shadow-main-default">
                        <tr>
                            <th scope="col" class="px-6 py-3">Descripción</th>
                            <th scope="col" class="px-3 py-3">Código CIE</th>
                            <th scope="col" class="px-3 py-3">Condición del diagnóstico</th>
                        </tr>
                    </thead>
                    <tbody v-for="(subitem, index) in dataCopy.data[item]" :key="index">
                        <tr class="border-b shadow-sm shadow-light text-sm">
                            <td class="px-6 py-2">{{ subitem.description }}</td>
                            <td class="px-3 py-2">{{ subitem.cie }}</td>
                            <td class="px-3 py-2 text-center">{{ subitem.option }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else-if="(typeof dataCopy.data[item] === 'object')" class="flex gap-10">
                <h2 class="font-bold">{{ item }}: </h2>
                <a v-if="item !== 'Tratamiento'" @click="goFile(dataCopy.data[item].content)" class="hover:underline hover:underline-offset-2 cursor-pointer text-main-default">Ver el informe</a>
                <button @click="goProcess(dataCopy.data[item].content)" v-else class="hover:underline hover:underline-offset-2 text-main-lighter">
                    <span>Ir al proceso</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, reactive } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/main.js';
import Spinner from '../../general_components/Spinner.vue';
import { router } from '@/routes';

const props = defineProps({
    id: {
        required: true,
        type: String
    },
    diagnosisid: {
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
const dataCopy = ref({});
const content = [
    'Motivos de consulta', 'Enfermedad actual', 'Antecedentes Patológicos Personales (Prenatales, Natales y Postnatales)',
    'Hábitos', 'Antecedentes Patológicos Familiares', 'Evaluación de Funciones Básicas', 'Evaluación Clínica',
    'Evaluación Psicométrica', 'Diagnósticos', 'Tratamiento', 'Emisión de Informe Psicológico'
]
const isLoading = reactive({
    data: false, process: false
});

function goFile(url) {
    window.open(url, '_blank');
}

function goProcess(process) {
    console.log(process);
    const routeData = router.resolve(`/${props.id}/process/${process}`);
    window.open(routeData.href, '_blank');
}

onBeforeMount(async() => {
    isLoading.data = true;
    const diagnosisRef = doc(db, 'psychodiagnosis', `${props.diagnosisid}`);
    const docSnap = await getDoc(diagnosisRef);
    dataCopy.value = { ...docSnap.data() };
    isLoading.data = false;
})
</script>