<template>
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
    />
    <div class="mb-10" :style="{ opacity: opacity }">
        <h1 class="mb-4 text-3xl text-center mt-10 font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-black from-light">Acuerdo de confidencialidad</span></h1>
        <hr class="h-px my-8 bg-black border-0 dark:bg-gray-700">
        <h1 class="font-bold mb-4">REGLAMENTO DE INFORMACIÓN CONFIDENCIAL EN EL SISTEMA NACIONAL DE SALUD</h1>
        <p class="pl-4 text-sm">Acuerdo ministerial 5216</p>
        <p class="pl-4 text-sm">Oficial Suplemento 427 de 29-ene-2015</p>
        <p class="pl-4 text-sm">Estado: Vigente</p>
        <p class="my-4 text-justify text-sm leading-relaxed"><span class="font-bold">Art. 9 .-</span> El personal operativo y administrativo de los establecimientos del Sistema Nacional de Salud que tenga acceso a información 
            de los/las usuarios/as durante el ejercicio de sus funciones, deberá guardar reserva de manera indefinida respecto a dicha información 
            y no podrá divulgar la información contenida en la historia clínica, ni aquella constante en todo documento donde reposan datos confidenciales de los/las usuarios/as.</p>
        <p class="my-4 text-justify text-sm leading-relaxed"><span class="font-bold">Art. 10.-</span> Los documentos que contengan información confidencial se mantendrán abiertos a (tanto en formato físico como digital) únicamente mientras estén utilizando en la prestación del servicio al que correspondan, como parte de un estudio epidemiológico, una auditoría de calidad de la atención en salud u otros debidamente justificados y que se enmarquen en los casos establecidos en el presente reglamento.</p>
        <p class="my-4 text-justify text-sm leading-relaxed"><span class="font-bold">Art. 61.-</span> Las instituciones públicas y privadas coma los profesionales de salud y población en general, reportarán en forma oportuna la existencia de casos sospechosos, probables, compatibles y confirmados de enfermedades declaradas por la autoridad sanitaria nacional como de notificación obligatoria y aquellas de reporte internacional. Las instituciones y profesionales de salud garantizan la confidencialidad de la información entregada y recibida.</p>
        <h1 class="font-bold mb-4">LEY ESTADÍSTICA</h1>
        <p class="pl-4 text-sm">Registro oficial</p>
        <p class="pl-4 text-sm">Órgano del gobierno del Ecuador</p>
        <p class="pl-4 text-sm">El Ecuador ha sido, es y será país amazónico</p>
        <p class="pl-4 text-sm">Quito, viernes 7 de mayo de 1976 - Número 82</p>
        <p class="pl-4 text-sm">N° 323</p>
        <p class="my-4 text-justify text-sm leading-relaxed"><span class="font-bold">Art. 25.- </span>Las personas que, de cualquier modo, intervengan en la ejecución de investigaciones que realicen las entidades sujetas al Sistema Estadístico Nacional, no podrán requerir información distinta de la que haya sido autorizada. De contravenir a esta prohibición, se les impondrá las sanciones establecidas en la Ley de Servicio Civil y Carrera Administrativa.</p>
        <div class="flex items-center gap-10 mx-10">
            <Spinner v-if="isLoading" class="text-3xl"/>
            <input v-else :checked="data.data().confidentiality" :disabled="data.data().confidentiality" @change="updateConfidentiality($event.target.checked)" id="confidentiality" type="checkbox" @input="$emit('update:bool', $event.target.checked)" value="" class="w-8 h-8 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800">

            <label for="confidentiality" class="font-bold text-justify">De acuerdo al reglamento de información confidencial en el sistema de salud y ley estadística acepto el cumplimiento de los artículos descritos.</label>
        </div>
    </div>
</template>

<script setup>
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/main.js';
import { ref } from 'vue';
import Spinner from '../../general_components/Spinner.vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';

const props = defineProps({
    data: { required: true, type: Object }
})
const isLoading = ref(false);
const { modalAlert, showModalAlert, opacity } = useModal();

async function updateConfidentiality(value) {
    isLoading.value = true;
    console.log(value);
    if(value) {
        const userRef = doc(db, 'users', `${props.data.id}`);
        try {
            await updateDoc(userRef, {
                confidentiality: value
            })
            showModalAlert('¡El acuerdo ha sido firmado!', false, { variant: 'success' });
        } catch (error) {
            showModalAlert(error.message, false, { variant: 'danger' });
        }
    } else {
        showModalAlert('El acuerdo ya está firmado, no lo puedes modificar', false, { variant: 'danger' });
    }
    isLoading.value = false;
}

</script>