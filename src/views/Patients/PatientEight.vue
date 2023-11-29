<template>
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
    />

    <div :style="{ opacity, opacity }">
        <h1 class="text-2xl font-bold text-center">EVALUACION FINAL DEL PROCESO PSICOTERAPÉUTICO</h1>
        <div v-if="isEmpty">
            <CreateGuide @go-guide="goGuide"/>
        </div>
        <div v-else-if="isLoading" class="flex justify-center">
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
                <table v-if="Object.keys(dataCopy.dataGuideEight.techniques[item]).length > 0" class="my-4 mx-auto w-[80%]">
                    <thead class="text-base text-gray-700 uppercase shadow-sm shadow-main-default">
                        <tr>
                            <th scope="col" colspan="2" class="px-6 py-3">{{ item }}</th>
                        </tr>
                    </thead>
                    <tbody v-for="(subitem, subkey, index) in dataCopy.dataGuideEight.techniques[item]">
                        <tr class="border-b shadow-sm text-sm shadow-light">
                            <td class="px-6 py-2">{{ dataFiveCopy[dataTechniques[item]][index].technique }}</td>
                            <td class="px-6 py-2">{{ subitem }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h1 class="mt-10 text-2xl font-bold text-center">Interrogantes al finalizar el proceso</h1>
            <div class="mx-10 grid grid-cols-2 gap-2 text-sm">
                <div v-for="(item, index) in keysOrder.slice(8, 17)" :key="index" class="shadow-sm shadow-light p-2 rounded-xl">
                    <div class="my-2">
                        <h2 class="font-bold mr-10 my-2">{{ item }}: </h2>
                        <div class="pl-4">
                            <p><span class="font-bold">Cumplimiento:</span> {{ dataCopy.dataGuideEight.interrogations[item].option }}</p>
                            <p v-if="dataCopy.dataGuideEight.interrogations[item].why !== undefined"><span class="font-bold">¿Por qué?:</span> {{ dataCopy.dataGuideEight.interrogations[item].why }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
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
const isLoading = ref(false);
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

async function goGuide() {
    const res = await fetchGuide('guideseven', props.id, props.processid);

    if (res.go) router.push(`/create/guideeight/${props.id}/${props.processid}`);
    else showModalAlert('Para crear la guía 8, es necesaria la guía 7', false, {variant: 'danger'});
}

onBeforeMount(async() => {
    isLoading.value = true;
    const { data, go } = await fetchGuide('guideeight', props.id, props.processid);
    const res  = await fetchGuide('guidefive', props.id, props.processid);

    if (data) {
        dataFiveCopy.value = res.data.data().dataGuideFive;
        dataCopy.value = data.data();
    } else isEmpty.value = true;

    isLoading.value = false;
})
</script>