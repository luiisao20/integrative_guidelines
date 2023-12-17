<template>
    <Modal 
        v-bind="modal"
        @close-mod="modal.showModal = false; opacity = '1'"
    />
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false;
                    opacity = '1';
                    if(ifReload) router.go();"
        @send-data="sendData"
        :is-loading="isLoading.sending"
    />
    <div v-if="isLoading.data" class="my-20 flex justify-center" :style="{ opacity: opacity }" >
        <Spinner class="text-4xl" />
    </div>
    <div :style="{ opacity: opacity }" v-else>
        <div v-if="data.biography" class="py-4">
            <h2 class="text-xl font-bold text-center">Biografía psicológica personal y familiar</h2>
            <div class="flex gap-4 justify-center mt-4 font-bold">
                <h2>{{ data.biography[0].date }}</h2>
                <h2>Proceso: {{ data.biography[0].process }}</h2>
            </div>
            <p class="p-4 whitespace-pre-line text-sm leading-relaxed">{{ data.biography[0].text }}</p>
            <div class="px-8 flex justify-center">
                <table class="w-full">
                    <tbody>
                        <tr v-for="(item, key) in data.table" :key="key">
                            <td class="font-bold py-4 text-left">
                                {{ key }}
                            </td>
                            <td class="pl-8 text-sm">
                                {{ item }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-for="(item, index) in data.biography.slice(1)" :key="index">
                <div class="flex gap-4 justify-center mt-4 font-bold">
                    <h2>{{ item.date }}</h2>
                    <h2>Proceso: {{ item.process }}</h2>
                </div>
                <p class="p-4 whitespace-pre-line text-sm leading-relaxed">{{ item.text }}</p>
            </div>
        </div>
        <div v-else>
            <h1 class="font-bold text-center text-xl">No existe biografía para este paciente, empieza a crearla:</h1>
        </div>
        <h1 v-if="biographyExists" class="mx-20 font-bold">¿Quieres agregar biografía? Primero escoge un proceso y procede a llenar el cuadro de texto</h1>
        <select v-model="processSelected" id="processes" class="bg-gray-50 my-5 border border-gray-300 text-black text-sm rounded-lg focus:ring-main-default focus:border-main-default block p-2.5">
            <option selected disabled>Primero escoge un proceso</option>
            <option :value="item.data().processName" v-for="(item, index) in dataCopy" :key="index">{{ item.data().processName }}</option>
        </select>
        <form v-if="processSelected !== 'Primero escoge un proceso'" @submit.prevent="checkValues">
            <SectionFour
                :item="content"
                :data="dataBiography"
                :processid="processSelected"
                :is-loading="isLoading.info"
                :show-table="!biographyExists"
            />
            <div class="flex flex-row justify-between mx-20 my-10">
                <button @click="showInfo" :is-disabled="isLoading.info" v-bind:class="{ cursorPointer: isLoading.info }" class="p-2 text-white bg-main-default rounded-xl" type="button">
                    Más info
                </button>
                <button type="submit" class="bg-light p-2 text-white rounded-xl" :disabled="isLoading.sending">
                    <span v-if="isLoading.sending"><Spinner /> Cargando</span>
                    <span v-else>Guardar Biografía</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, reactive } from 'vue';
import SectionFour from '@/guide_components/SectionFour.vue';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/main.js';
import { getInfoContent } from '@/composables/infoDemands.js';
import { useModal } from '@/composables/modal';
import Modal from '@/general_components/Modal.vue';
import Spinner from '../../general_components/Spinner.vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { formatDate } from '@/composables/formatDate';
import { router } from '@/routes';

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
const content = {
    code: '4',
    text: 'Biografía psicológica personal y familiar'
}
const dataBiography = reactive({
    'Biografía psicológica personal y familiar': '',
    table:{
        'Estilos disciplinarios': '',
        'Tipo de apego': '',
        'Sociabilidad': '',
        'Pérdidas afectivas': '',
        'Experiencias de aprendizaje': '',
        'Sobrestimulación': '',
        'Concienciación': '',
    }
})
const dataCopy = ref([]);
const processSelected = ref('Primero escoge un proceso');
const isLoading = reactive({
    info: false, sending: false, data: false
})
const { opacity, modal, showModal, modalAlert, showModalAlert } = useModal();
const infoContent = ref({});
const biographyExists = ref(false);
const ifReload = ref(false);
const modalContent = reactive({
    isEmpty: false, message: ''
})

onBeforeMount(async() => {
    isLoading.data = true;

    if(!props.data.consent.accept) {
        showModalAlert('Necesitas llenar el consentimiento informado del paciente para entrar aquí. Cierra este cuadro de diálogo y ve a la pestaña "consentimiento informado"', false, { variant: 'danger' });
        return
    }

    const processRef = collection(db, 'processes');
    const q = query(processRef, where('patient', '==', `${props.id}`));
    const querySnapshot = await getDocs(q);
    dataCopy.value = [ ...querySnapshot.docs ];
    if (props.data.biography) biographyExists.value = true;
    isLoading.data = false;
})

async function showInfo() {
    isLoading.info = true;
    infoContent.value = await getInfoContent(content.code);
    showModal(infoContent.value, content.text);
    isLoading.info = false;
}

function checkValues() {
    modalContent.isEmpty = false;
    modalContent.message = '';
    // Section 4
    if (processSelected.value === 'Primero escoge un proceso') {
        modalContent.isEmpty = true;
        modalContent.message = 'Tienes que escoger un proceso.';
    } else if (dataBiography['Biografía psicológica personal y familiar'].toString().trim() === ''){
        modalContent.isEmpty = true;
        modalContent.message = 'La biografía psicológica debe estar completada';
    } else if (!biographyExists.value) {
        for (const key in dataBiography.table) {
            if (dataBiography.table.hasOwnProperty(key)) {
                if (dataBiography.table[key].toString().trim() === "") {
                    modalContent.isEmpty = true;
                    modalContent.message = `El campo "${key}" de la biografia psicológica se encuentra vacío, por favor llénalo`;
                    break;
                }
            }
        }
    }

    if (modalContent.isEmpty) {
        showModalAlert(modalContent.message, false, { variant: 'danger' });
    } else {
        showModalAlert('¿Estás seguro de guardar los datos?', true, { variant: 'info' });
    }
}

async function sendData() {
    isLoading.sending = true;
    const patientRef = doc(db, 'patients', `${props.id}`);
    const newBiography = {
        date: formatDate(new Date()),
        text: dataBiography['Biografía psicológica personal y familiar'],
        process: processSelected.value
    }
    try {
        
        if (biographyExists.value) {
            const biography = [ ...props.data.biography ];
            biography.push(newBiography);
            await updateDoc(patientRef, {
                biography: biography,
            })
        } else {
            await updateDoc(patientRef, {
                biography: [ newBiography ],
                table: dataBiography.table
            })
        }
        showModalAlert('La biografía se ha actualizado correctamente, por favor cierra esta ventana y espera mientras se recarga la página.', false, { variant: 'success' });
        ifReload.value = true;
    } catch (error) {
        showModalAlert(error.message, false, { variant: 'danger' });
    }
    isLoading.sending = false;
}
</script>

<style scoped>
.cursorPointer {
    cursor: progress;
}
</style>