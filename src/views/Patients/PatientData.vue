<template>

    <div id="element-to-export" class="grid grid-cols-2 gap-4 items-center p-4">
        <div v-for="(item, key) in dataCopy" :key="key" v-bind:class="{ activeAttention: key === 'Lugar de atención', activeBros: key === 'Hermanos, género y edad de cada uno de ellos' }">
            <div v-if="item.toString().trim() !== ''" class="flex justify-between items-center text-sm shadow-sm shadow-light p-2"
                v-bind:class="{ activeSubAttention: key === 'Lugar de atención', activeSubBros: key === 'Hermanos, género y edad de cada uno de ellos' }">
                <h2 class="font-bold">{{ key }}:</h2>
                <p class="text-right" >{{ item }}</p>
            </div>
        </div>
        <div class="flex justify-between items-center shadow-sm shadow-light p-2 text-sm">
            <h2 class="font-bold">Fecha de ingreso:</h2>
            <p class="text-right">{{ formatDate(createdAt) }}</p>
        </div>
    </div>

    <ButtonVue class="p-4 m-4" @click="exportPDF" >Exportar</ButtonVue>

</template>

<script setup>
import { formatDate } from '@/composables/formatDate';
import { onBeforeMount, ref } from 'vue';
import ButtonVue from '@/general_components/ButtonVue.vue';
import html2pdf from 'html2pdf.js';

const keysToDelete = ['Nombres', 'Apellidos', 'Número de cédula'];
const dataCopy = ref({});
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
});

onBeforeMount(() => {
    dataCopy.value = { ...props.data }

    keysToDelete.forEach(element => {
        delete dataCopy.value[element]
    });
    dataCopy.value['Fecha de nacimiento'] = formatDate(props.data['Fecha de nacimiento']);
})

function exportPDF(){
    const source = document.getElementById('element-to-export');

    var opt = {
        margin:       20,
        filename:     'myfile.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'A4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(source).save();
}
</script>

<style scoped>
.activeAttention {
    grid-column: span 2/ span 2;
}

.activeBros {
    grid-column: span 2/ span 2;
}

.activeSubAttention {
    justify-content: center;
    gap: 20px
}

.activeSubBros {
    grid-column: span 2/ span 2;
    justify-content: left;
    gap: 20px;
}
</style>