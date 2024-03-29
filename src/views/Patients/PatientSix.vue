<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendData"
        :is-loading="isLoading.sending"
        :show-route="false"
    />
    <ModalForm
        :show-modal="showForm"
        @close-modal="showForm = false; opacity = '1'"
        :array="dataCopy"
        @add-data="pushData"
    />
    <div :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">EJECUCIÓN Y APLICACIÓN TÉCNICA</h1>
        <div v-if="isEmpty && dataCopy.length === 0">
            <CreateGuide text="No existen datos ¿Deseas agregar una evolución?" @show-form="showForm = true; opacity = '0.2'" :is-loading="isLoading.guide"/>
        </div>
        <div v-else-if="isLoading.data" class="flex justify-center">
            <Spinner class="text-4xl py-10"/>
        </div>
        <section v-else>
            <div class="flex justify-center">
                <table class="m-4">
                    <thead class="text-sm text-gray-700 uppercase shadow-sm shadow-main-default">
                        <tr>
                            <th scope="col" class="px-2 py-3">Fecha</th>
                            <th scope="col" class="px-6 py-3 w-[40%]">Evolución</th>
                            <th scope="col" class="px-6 py-3 w-[40%]">Actividad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b text-sm shadow-sm shadow-light" v-for="(subitem, index) in dataCopy">
                            <td class="px-2 py-2">{{ subitem.date }}</td>
                            <td class="px-6 py-2 whitespace-pre-line leading-relaxed">{{ subitem.objective }}</td>
                            <td class="px-6 py-2 whitespace-pre-line leading-relaxed">{{ subitem.technique }}</td>
                            <td class="text-center px-2" v-if="subitem.enabled">
                                <button @click="dataCopy.splice(index, 1)" class="text-2xl text-danger">
                                    <font-awesome-icon class="rotate-45" icon="fa-solid fa-circle-plus" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-between px-10">
                <button @click="showForm = true; opacity = '0.2'" class="bg-light text-white px-4 py-2 rounded-lg">
                    <p>Añadir</p>
                </button>
                <button v-if="oldData.length < dataCopy.length" @click="showModalAlert('¿Estás seguro de enviar los datos?', true)"
                    class="bg-light text-white px-4 py-2 rounded-lg">
                    Guardar datos
                </button>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, reactive } from 'vue';
import { fetchGuide } from '@/composables/fetchGuides';
import { useModal } from '@/composables/modal';
import ModalAlert from '@/general_components/ModalAlert.vue';
import CreateGuide from '../../general_components/CreateGuide.vue';
import Spinner from '../../general_components/Spinner.vue';
import ModalForm from '../../general_components/ModalForm.vue';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '@/main.js';
import { formatDate } from '@/composables/formatDate';

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
    data: false, guide: false, sending: false
});
const isEmpty = ref(false);
const dataCopy = ref([]);
const { opacity, modalAlert, showModalAlert } = useModal();
const showForm = ref(false);
const oldData = reactive({
    length: 0, id: ''
});

async function sendData() {
    isLoading.sending = true;

    dataCopy.value.forEach((element) => {
        if (element.enabled) delete element.enabled;
    })

    try {
        if (oldData.id !== '') {
            console.log('update');
            const guideRef = doc(db, 'guidesix', oldData.id);
            await updateDoc(guideRef, {
                data: dataCopy.value
            })
        } else {
            await addDoc(collection(db, 'guidesix'), {
                patient: props.id,
                data: dataCopy.value,
                date: formatDate(new Date()),
                process: props.processid
            })
        }
        showModalAlert('¡Datos guardados!', false, {variant: 'success', showRoute: true});
    } catch (error) {
        console.log(error);
    }
    isLoading.sending = false;
}

function pushData(data) {
    dataCopy.value.push(data);
}

onBeforeMount(async() => {
    isLoading.data = true;
    const { data, error } = await fetchGuide('guidesix', props.id, props.processid);

    if (data) {
        dataCopy.value = [ ...data.data().data ];
        oldData.length = dataCopy.value.length;
        oldData.id = data.id;
    }
    else isEmpty.value = true;

    isLoading.data = false;
})
</script>