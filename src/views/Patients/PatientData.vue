<template>
    <div id="element-to-export" class="grid grid-cols-2 gap-4 items-center my-4">
        <div v-for="(item, index) in keysOrder" :key="index" v-bind:class="{ activeAttention: item === 'Lugar de atención', activeBros: item === 'Hermanos, género y edad de cada uno de ellos' }">
            <div v-if="dataCopy[item].trim() !== '' && item !== 'biography'" class="flex justify-between items-center text-sm shadow-sm shadow-light p-2"
                v-bind:class="{ activeSubAttention: item === 'Lugar de atención', activeSubBros: item === 'Hermanos, género y edad de cada uno de ellos' }">
                <h2 class="font-bold">{{ item }}:</h2>
                <p class="text-right" >{{ dataCopy[item] }}</p>
            </div>
        </div>
        <div class="flex justify-between items-center shadow-sm shadow-light p-2 text-sm">
            <h2 class="font-bold">Fecha de ingreso:</h2>
            <p class="text-right">{{ formatDate(createdAt) }}</p>
        </div>
    </div>
    <div class="py-4">
        <h2 class="text-xl font-bold">Biografía psicológica personal y familiar</h2>
        <div v-for="(item, index) in data.biography" :key="index">
            <div v-if="item.process !== null" class="flex gap-4 justify-center">
                <h2>{{ formatDate(item.date) }}</h2>
                <h2>Proceso: {{ item.process }}</h2>
            </div>
            <p class="p-4 whitespace-pre-line">{{ item.text }}</p>
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
const keysOrder = [
    'Lugar de atención',
    'Correo electrónico (opcional)',
    'Lugar de nacimiento',
    'Fecha de nacimiento',
    'Estado Civil', 'Número de hijos', 'Religión',
    'Ciudad de residencia', 'Dirección', 'Celular',
    'Instrucción', 'Profesión', 'Ocupación',
    'Grupo étnico', 'Género', 'Grupo socio-económico',
    'Nombre del padre', 'Edad (padre)', 'Ocupación (padre)',
    'Nombre de la madre', 'Edad (madre)', 'Ocupación (madre)',
    'Hermanos, género y edad de cada uno de ellos',
    'Lugar que ocupa entre sus hermanos',
    'Informante',
    'Parentesco',
    'Tipo de atención',
    'Otro tipo de atención',
]

onBeforeMount(() => {
    dataCopy.value = { ...props.data.dataPatient };
    dataCopy.value['Fecha de nacimiento'] = formatDate(props.data.dataPatient['Fecha de nacimiento']);
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