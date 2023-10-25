<template>
    <section v-if="!isLoading">
        <h1 class="text-2xl font-bold text-center p-4 mt-4">FICHA INTEGRATIVA DE EVALUACIÓN PSICOLÓGICA FIEPS</h1>
        <div v-if="dataCopy.length > 0" class="px-4">
            <div v-for="(item, index) in content.slice(0, 3)" :key="index">
                <div v-if="item.toString().trim() !== ''" class="p-4">
                    <h2 class="font-bold">{{ item }}: </h2>
                    <p>{{ guideThreeData.otherSections[item] }}</p>
                </div>
            </div>
            <div>
                <div class="p-4 text-sm">
                    <h2 class="font-bold">{{ content[3] }}: </h2>
                    <p>{{ guideThreeData.sectionFour[content[3]] }}</p>
                </div>
                <div class="px-8 flex justify-center">
                    <table class="w-full">
                        <tbody>
                            <tr v-for="(subitem, key) in guideThreeData.sectionFour.table" :key="key">
                                <td class="font-bold py-2 text-left">
                                    {{ key }}
                                </td>
                                <td>
                                    {{ subitem }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <h2 class="text-xl text-center my-4 normal-case font-bold">Resultados de pruebas psicológicas</h2>
            <div class="p-4">
                <h2 class="font-bold">{{ content[4] }}: </h2>
                <p>{{ guideThreeData.otherSections[content[4]] }}</p>
            </div>
            <h2 class="text-xl text-center my-4 normal-case font-bold">Conclusiones diagnósticas</h2>
            <div v-for="(item, index) in content.slice(5, 8)" :key="index">
                <div v-if="guideThreeData.sectionSix[item].toString().trim() !== ''" class="p-4 text-sm">
                    <h2 class="font-bold">{{ item }}: </h2>
                    <p>{{ guideThreeData.sectionSix[item] }}</p>
                </div>
            </div>
            <div v-for="(item, index) in content.slice(8, 10)" :key="index">
                <div v-if="guideThreeData.otherSections[item].toString().trim() !== ''" class="p-4">
                    <h2 class="font-bold">{{ item }}: </h2>
                    <p>{{ guideThreeData.otherSections[item] }}</p>
                </div>
            </div>
        </div>
        <div>
            <CreateGuide guide="three" :id="id" />
        </div>
    </section>
</template>

<script setup>
import { useFetch } from '@/composables/fetch';
import { onBeforeMount, ref, reactive } from 'vue';
import CreateGuide from '../../general_components/CreateGuide.vue';

const isLoading = ref(false);
const props = defineProps({
    id: {
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
})
const content = [
        'Demanda explícita',
        'Demanda implícita',
        'Antecedentes disfuncionales',
        'Biografía psicológica personal y familiar',
        'Consignar los resultados de las pruebas psicológicas:',
        'Diagnóstico descriptivo y formulación dinámica del problema',
        'Diagnóstico descriptivo y formulación dinámica del trastorno',
        'Diagnóstico descriptivo y formulación dinámica de la personalidad',
        'Criterios pronósticos',
        'Recomendaciones',
]
const dataCopy = ref([]);
const guideThreeData = reactive({
    otherSections: {},
    sectionFour: {},
    sectionSix: {}
})

onBeforeMount(async() => {
    isLoading.value = true;
    const { data, error } = await useFetch(`guidethree?patient=${props.id}`);

    dataCopy.value = [ ...data.value ];

    if(dataCopy.value.length > 0){
        guideThreeData.otherSections = data.value[0].otherSections;
        guideThreeData.sectionFour = data.value[0].sectionFour;
        guideThreeData.sectionSix = data.value[0].sectionSix;
    }

    isLoading.value = false;
})
</script>