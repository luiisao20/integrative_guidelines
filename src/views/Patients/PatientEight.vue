<template>
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
    />

    <div :style="{ opacity, opacity }">
        <h1 class="text-2xl font-bold text-center">EVALUACION FINAL DEL PROCESO PSICOTERAPÉUTICO</h1>
        <div v-if="isEmpty">
            <CreateGuide @go-guide="goGuide" :is-loading="isLoading.guide"/>
        </div>
        <div v-else-if="isLoading.data" class="flex justify-center">
            <Spinner class="text-4xl py-10"/>
        </div>
        <section v-else>
            <div class="mx-10">
                <div v-for="(item, index) in keysOrder.slice(0, 5)" :key="index">
                    <div v-if="(typeof dataCopy.dataGuideEight.tableOne[item] === 'string')" class="flex gap-4 py-2">
                        <h2 class="font-bold">{{ item }}: </h2>
                        <h2>{{ dataCopy.dataGuideEight.tableOne[item] }}</h2>
                    </div>
                    <div v-else-if="(Array.isArray(dataCopy.dataGuideEight.tableOne[item]))" class="flex gap-4 py-2">
                        <h2 class="font-bold">{{ item }}: </h2>
                        <h2 class="flex gap-4">
                            <span v-for="(subitem, index) in dataCopy.dataGuideEight.tableOne[item]">{{ index + 1 }}: {{ subitem }}</span>
                        </h2>
                    </div>
                    <div v-else class="my-2">
                        <h2 class="font-bold mr-10">{{ item }}: </h2>
                        <div class="pl-10">
                            <p class="text-sm whitespace-pre-line leading-relaxed"><span class="font-bold">Nivel de satisfacción:</span> {{ dataCopy.dataGuideEight.tableOne[item].rate }}</p>
                            <p class="text-sm whitespace-pre-line leading-relaxed"><span class="font-bold">Observaciones:</span> {{ dataCopy.dataGuideEight.tableOne[item].observations }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <h1 class="text-xl mt-10 font-bold text-center">TÉCNICAS EMPLEADAS Y GRADO DE EFICACIA</h1>
            <div v-for="(item, index) in keysOrder.slice(5, 8)" :key="index">
                <table v-if="dataCopy.dataGuideEight.techniques[item] !== undefined" class="my-4 mx-auto w-[80%]">
                    <thead class="text-base text-gray-700 uppercase shadow-sm shadow-main-default">
                        <tr>
                            <th scope="col" colspan="2" class="px-6 py-3">{{ item }}</th>
                        </tr>
                    </thead>
                    <tbody v-for="(subitem, index) in dataFiveCopy[dataTechniques[item]]">
                        <tr class="border-b shadow-sm text-sm shadow-light">
                            <td class="px-6 py-2">{{ subitem.technique }}</td>
                            <td class="px-6 py-2">{{ dataCopy.dataGuideEight.techniques[item][`${item}.${index}`] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h1 class="mt-10 mb-4 text-2xl font-bold text-center">Interrogantes al finalizar el proceso</h1>
            <div class="shadow-sm shadow-light p-2 rounded-xl w-3/4 mx-auto text-sm">
                <div class="my-2">
                    <h2 class="mr-10 my-2"><span class="font-bold">{{ keysOrder[8] }}:</span>  {{ dataCopy.dataGuideEight.interrogations[keysOrder[8]].option }}</h2>
                    <p><span class="font-bold pl-4">¿Por qué?:</span> {{ dataCopy.dataGuideEight.interrogations[keysOrder[8]].why }}</p>
                </div>
            </div>
            <h1 class="mt-10 mb-4 font-bold pl-10">Cumplimiento de expectativas</h1>
            <div class="mx-10 grid grid-cols-2 gap-2 text-sm">
                <div v-for="(item, index) in keysIntrg" :key="index" class="shadow-sm shadow-light p-2 rounded-xl">
                    <div class="my-2">
                        <h2 class="font-bold mr-10 my-2">{{ item }}: </h2>
                        <div class="pl-4">
                            <p><span class="font-bold">Cumplimiento:</span> {{ dataCopy.dataGuideEight.interrogations[item].option }}</p>
                            <p v-if="dataCopy.dataGuideEight.interrogations[item].why !== undefined"><span class="font-bold">¿Por qué?:</span> {{ dataCopy.dataGuideEight.interrogations[item].why }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mx-10 grid grid-cols-2 gap-2 text-sm my-10">
                <div v-for="(item, index) in keysOrder.slice(14, 17)" :key="index" class="shadow-sm shadow-light p-2 rounded-xl">
                    <div class="my-2">
                        <h2 class="mr-10 my-2"><span class="font-bold">{{ item }}:</span> {{ dataCopy.dataGuideEight.interrogations[item].option }}</h2>
                        <p v-if="dataCopy.dataGuideEight.interrogations[item].why !== ''" class="pl-4"><span class="font-bold">¿Por qué?:</span> {{ dataCopy.dataGuideEight.interrogations[item].why }}</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, reactive } from 'vue';
import { fetchGuide } from '@/composables/fetchGuides';
import { router } from '@/routes';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import CreateGuide from '../../general_components/CreateGuide.vue';
import Spinner from '../../general_components/Spinner.vue';

const props = defineProps({
    id: {
        required: true,
        type: String
    },
    processid: {
        required: true,
        type: String
    },
    data: {
        type: Object
    }
})
const isLoading = reactive({
    data: false, guide: false
});
const isEmpty = ref(false);
const dataCopy = ref([]);
const dataFiveCopy = ref({});
const dataTechniques = {
    'Asesoramiento': 'Diagnóstico descriptivo y formulación dinámica del problema',
    'Sintomáticas': 'Diagnóstico descriptivo y formulación dinámica del trastorno',
    'De personalidad': 'Diagnóstico descriptivo y formulación dinámica de la personalidad'
}
const { opacity, modalAlert, showModalAlert } = useModal();
const keysOrder = [
    'PROCESO', 'OBJETIVOS ESTABLECIDOS', 'Paciente', 'Familiares', 'Terapeuta',
    'Asesoramiento', 'Sintomáticas', 'De personalidad',
    'Finalización del proceso', 'Paciente', 'Familiares', 'Instituciones', 'Otros', 'Terapeuta',
    'Tratamiento mixto', 'Derivación del paciente a otro profesional', 'Deserción del paciente'
]
const keysIntrg = ref([]);
async function goGuide() {
    isLoading.guide = true;
    const res = await fetchGuide('guideseven', props.id, props.processid);

    if (res.go) router.push(`/create/guideeight/${props.id}/${props.processid}`);
    else showModalAlert('Para crear la guía 8, es necesaria la guía 7', false, {variant: 'danger'});
    isLoading.guide = false;
}

onBeforeMount(async() => {
    isLoading.data = true;
    const { data, go } = await fetchGuide('guideeight', props.id, props.processid);
    const res  = await fetchGuide('guidefive', props.id, props.processid);

    if (data) {
        dataFiveCopy.value = res.data.data().dataGuideFive;
        dataCopy.value = data.data();
        keysOrder.slice(9, 14).forEach((key) => {
            if (dataCopy.value.dataGuideEight.interrogations[key].option !== '') keysIntrg.value.push(key);
        })
    } else isEmpty.value = true;

    isLoading.data = false;
})
</script>