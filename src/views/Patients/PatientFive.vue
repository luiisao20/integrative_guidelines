<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
    />
    <div :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">PLANIFICACIÓN DEL PROCESO</h1>
        <div v-if="isEmpty">
            <CreateGuide @go-guide="goGuide" :is-loading="isLoading.guide"/>
        </div>
        <div v-else-if="isLoading.data" class="flex justify-center">
            <Spinner class="text-4xl py-10"/>
        </div>
        <section v-else>
            <div v-for="(item, index) in content" :key="index">
                <div v-if="dataThreeCopy[item].length > 0" class="p-2 text-sm">
                    <h2 class="font-bold text-base p-4">{{ item }}</h2>
                    <p class="text-left whitespace-pre-line leading-relaxed px-8">{{ dataThreeCopy[item] }}</p>
                    <div class="flex justify-center">
                        <table class="m-4">
                            <thead class="text-xs text-gray-700 uppercase shadow-sm shadow-main-default">
                                <tr>
                                    <th scope="col" class="px-6 py-3">Objetivos</th>
                                    <th scope="col" class="px-6 py-3">Técnicas</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b shadow-sm shadow-light" v-for="subitem in dataCopy.dataGuideFive[item]">
                                    <td class="px-6 py-2">{{ subitem.objective }}</td>
                                    <td class="px-6 py-2">{{ subitem.technique }}</td>
                                </tr>
                            </tbody>
                        </table>
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
const content = [
    'Diagnóstico descriptivo y formulación dinámica del problema',
    'Diagnóstico descriptivo y formulación dinámica de la personalidad',
    'Diagnóstico descriptivo y formulación dinámica del trastorno'
]
const isEmpty = ref(false);
const dataCopy = ref([]);
const dataThreeCopy = ref([]);
const { opacity, modalAlert, showModalAlert } = useModal();

async function goGuide() {
    isLoading.guide = true;
    const { data, go } = await fetchGuide('guidefour', props.id, props.processid);

    if (go) router.push(`/create/guidefive/${props.id}/${props.processid}`);
    else showModalAlert('Para crear la guía 5, es necesaria la guía 4', false, {variant: 'danger'});
    isLoading.guide = false;
}

onBeforeMount(async() => {
    isLoading.data = true;

    const { data, error } = await fetchGuide('guidefive', props.id, props.processid);
    const res = await fetchGuide('guidethree', props.id, props.processid)

    if (data) {
        dataThreeCopy.value = res.data.data().sectionSix;
        dataCopy.value = data.data();
    } else isEmpty.value = true;

    isLoading.data = false;

})
</script>