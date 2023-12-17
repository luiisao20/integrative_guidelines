<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
    />
    <div :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">EJECUCIÓN Y APLICACIÓN TÉCNICA</h1>
        <div v-if="isEmpty">
            <CreateGuide @go-guide="goGuide" :is-loading="isLoading.guide"/>
        </div>
        <div v-else-if="isLoading.data" class="flex justify-center">
            <Spinner class="text-4xl py-10"/>
        </div>
        <section v-else>
            <div class="flex justify-center">
                <table class="m-4">
                    <thead class="text-sm text-gray-700 uppercase shadow-sm shadow-main-default">
                        <tr>
                            <th scope="col" class="px-6 py-3">Fecha</th>
                            <th scope="col" class="px-6 py-3 w-[40%]">Evolución</th>
                            <th scope="col" class="px-6 py-3 w-[40%]">Actividad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b text-sm shadow-sm shadow-light" v-for="subitem in dataCopy.data">
                            <td class="px-6 py-2">{{ subitem.date }}</td>
                            <td class="px-6 py-2 whitespace-pre-line leading-relaxed">{{ subitem.objective }}</td>
                            <td class="px-6 py-2 whitespace-pre-line leading-relaxed">{{ subitem.technique }}</td>
                        </tr>
                    </tbody>
                </table>
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
const isEmpty = ref(false);
const dataCopy = ref({});
const { opacity, modalAlert, showModalAlert } = useModal();

async function goGuide() {
    isLoading.guide = true;
    const res = await fetchGuide('guidefive', props.id, props.processid);

    if (res.go) router.push(`/create/guidesix/${props.id}/${props.processid}`);
    else showModalAlert('Para crear la guía 6, es necesaria la guía 5', false, { variant: 'danger'});
    isLoading.guide = false;
}

onBeforeMount(async() => {
    isLoading.data = true;
    const { data, error } = await fetchGuide('guidesix', props.id, props.processid);

    if (data) dataCopy.value = { ...data.data() };
    else isEmpty.value = true;

    isLoading.data = false;
})
</script>