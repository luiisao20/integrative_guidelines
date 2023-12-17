<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
    />
    <div :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">DECISIONES SOBRE EL TRATAMIENTO PSICOTERAPÉUTICO</h1>
        <div v-if="isLoading.data" class="flex justify-center">
            <Spinner class="text-4xl py-10"/>
        </div>
        <div v-else-if="isEmpty">
            <CreateGuide @go-guide="goGuide" :is-loading="isLoading.guide"/>
        </div>
        <section v-else>
            <div v-for="(item, key) in dataCopy.dataGuideFour" class="w-[80%] mx-auto">
                <div v-if="key !== '¿Qué dificultades se van a presentar en el proceso?'" class="flex justify-between pl-10 gap-4 my-4 text-sm items-center">
                    <p class="font-semibold text-gray-900 dark:text-white w-1/2">
                        {{ key }}
                    </p>        
                    <p v-if="typeof item === 'string'" class="w-1/2 text-gray-900 text-right dark:text-white">
                        {{ item }}
                    </p>
                    <p v-else class="w-1/2 text-gray-900 flex flex-col text-right dark:text-white">
                        <p>{{ item.selected }}</p> <p v-if="item.decr !== ''">{{ item.descr }}</p>
                    </p>
                </div>
            </div>
            <div class="p-4">
                <h2 class="font-bold">¿Qué dificultades se van a presentar en el proceso?</h2>
                <p class="leading-relaxed px-4 pt-4 text-sm whitespace-pre-line">{{ dataCopy.dataGuideFour['¿Qué dificultades se van a presentar en el proceso?'] }}</p>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, reactive } from 'vue';
import { fetchGuide } from '@/composables/fetchGuides';
import { router } from '@/routes';
import { useModal } from '@/composables/modal';
import ModalAlert from '@/general_components/ModalAlert.vue';
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
const dataCopy = ref({});
const isEmpty = ref(false);
const { opacity, modalAlert, showModalAlert } = useModal();

async function goGuide() {
    isLoading.guide = true;
    const { data, go } = await fetchGuide('guidethree', props.id, props.processid);

    if (go) router.push(`/create/guidefour/${props.id}/${props.processid}`);
    else showModalAlert('Para crear la guía 4, es necesaria la guía 3', false, {variant: 'danger'});
    isLoading.guide = false;
}

onBeforeMount(async() => {
    isLoading.data = true;
    const { data, go } = await fetchGuide('guidefour', props.id, props.processid);

    if (data) {
        dataCopy.value = data.data();
    } else isEmpty.value = true;

    isLoading.data = false;
})
</script>