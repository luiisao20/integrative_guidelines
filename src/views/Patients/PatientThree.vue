<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
    />
    <section :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">FICHA INTEGRATIVA DE EVALUACIÓN PSICOLÓGICA FIEPS</h1>

        <div v-if="isEmpty">
            <CreateGuide @go-guide="goGuide" :is-loading="isLoading.guide"/>
        </div>
        <div v-else-if="isLoading.data" class="flex justify-center">
            <Spinner class="text-4xl py-10"/>
        </div>
        <div v-else class="px-4">
            <div v-for="(item, index) in content.slice(0, 3)" :key="index">
                <div v-if="item.toString().trim() !== ''" class="p-4">
                    <h2 class="font-bold">{{ item }}: </h2>
                    <p class="leading-relaxed px-4 pt-4 text-sm whitespace-pre-line">{{ guideThreeData.otherSections[item] }}</p>
                </div>
            </div>
            <div class="p-4">
                <h2 class="font-bold">{{ content[4] }}:</h2>
                <p class="leading-relaxed px-4 pt-4 text-sm whitespace-pre-line">{{ guideThreeData.otherSections[content[4]] }}</p>
            </div>
            <h2 class="text-xl text-center my-4 normal-case font-bold">Conclusiones diagnósticas</h2>
            <div v-for="(item, index) in content.slice(5, 8)" :key="index">
                <div v-if="guideThreeData.sectionSix[item].toString().trim() !== ''" class="p-4">
                    <h2 class="font-bold">{{ item }}: </h2>
                    <p class="leading-relaxed px-4 pt-4 text-sm whitespace-pre-line">{{ guideThreeData.sectionSix[item] }}</p>
                </div>
            </div>
            <div v-for="(item, index) in content.slice(8, 10)" :key="index">
                <div v-if="guideThreeData.otherSections[item].toString().trim() !== ''" class="p-4">
                    <h2 class="font-bold">{{ item }}: </h2>
                    <p class="leading-relaxed px-4 pt-4 text-sm whitespace-pre-line">{{ guideThreeData.otherSections[item] }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onBeforeMount, ref, reactive } from 'vue';
import { fetchGuide } from '@/composables/fetchGuides';
import { useModal } from '@/composables/modal';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { router } from '../../routes';
import CreateGuide from '../../general_components/CreateGuide.vue';
import Spinner from '../../general_components/Spinner.vue';

const isLoading = reactive({
    data: false, guide: false
});
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
        required: true,
        type: Object
    }
})
const content = [
        'Demanda explícita',
        'Demanda implícita',
        'Antecedentes disfuncionales',
        'Biografía psicológica personal y familiar',
        'Resultados de las pruebas psicológicas',
        'Diagnóstico descriptivo y formulación dinámica del problema',
        'Diagnóstico descriptivo y formulación dinámica del trastorno',
        'Diagnóstico descriptivo y formulación dinámica de la personalidad',
        'Criterios pronósticos',
        'Recomendaciones',
]
const guideThreeData = reactive({
    otherSections: {},
    sectionFour: {},
    sectionSix: {}
})
const isEmpty = ref(false);
const { opacity, modalAlert, showModalAlert } = useModal();

async function goGuide(){
    isLoading.guide = true;
    const res = await fetchGuide('guidetwo', props.id, props.processid);

    if (res.go) router.push(`/create/guidethree/${props.id}/${props.processid}`);
    else showModalAlert('Para crear la guía 3, es necesario la guía 2', false, { variant: 'danger'});
    isLoading.guide = false;
}

onBeforeMount(async() => {
    isLoading.data = true;

    const res = await fetchGuide('guidethree', props.id, props.processid);

    if (res.data) {
        guideThreeData.otherSections = res.data.data().otherSections;
        guideThreeData.sectionSix = res.data.data().sectionSix;
    } else isEmpty.value = true;

    isLoading.data = false;
})
</script>