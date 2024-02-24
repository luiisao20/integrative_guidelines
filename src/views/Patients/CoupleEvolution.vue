<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendData"
        :is-loading="isLoading.sending"
        :show-route="false"
    />
    <ModalForm
        :show-modal="form.show"
        @close-modal="form.show = false; opacity = '1'"
        @add-data="pushData"
        :array="dataCopy"
        title="Añadir evolución (pareja)"
        :place-holder="{
            evol: 'Evolución (pareja)',
            activ: 'Actividad realizada (pareja)'
        }"
    />
    <div :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">Ejecución y Aplicación Técnica (Pareja)</h1>
        <div v-if="isEmpty && dataCopy.length === 0">
            <CreateGuide text="No existen datos ¿Deseas agregar una evolución?" @show-form="form.show = true; opacity = '0.2'" :is-loading="isLoading.data"/>
        </div>
        <div v-else-if="isLoading.data" class="flex justify-center">
            <Spinner class="text-4xl py-10"/>
        </div>
        <section v-else>
            <div class="flex justify-center">
                <table class="m-4">
                    <thead class="text-sm text-gray-700 uppercase shadow-sm shadow-main-default">
                        <tr>
                            <th scope="col" class="px-3 py-3">Fecha</th>
                            <th scope="col" class="px-6 py-3">Evolución</th>
                            <th scope="col" class="px-6 py-3">Actividad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b text-sm shadow-sm shadow-light" v-for="(subitem, index) in dataCopy">
                            <td class="px-2 py-2 text-center">{{ subitem.date }}</td>
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
                <button @click="form.show = true; opacity = '0.2'" class="bg-light text-white px-4 py-2 rounded-lg">
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
import ModalForm from '../../general_components/ModalForm.vue';
import { reactive, onBeforeMount, ref } from 'vue';
import { fetchGuide } from '@/composables/fetchGuides';
import { useModal } from '@/composables/modal';
import ModalAlert from '@/general_components/ModalAlert.vue';
import Spinner from '@/general_components/Spinner.vue';
import CreateGuide from '@/general_components/CreateGuide.vue';
import { doc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { db } from '@/main.js';
import { formatDate } from '@/composables/formatDate';

const props = defineProps({
    id: {
        required: true,
        type: String
    },
    coupleid: {
        required: true,
        type: String
    },
    dataCopy: {
        required: true,
        type: Object
    },
    data: {
        required: true,
        type: Object
    }
})
const form = reactive({
    show: false
})
const dataCopy = ref([]);
const isLoading = reactive({
    data: false, sending: false
})
const oldData = reactive({
    length: 0, id: ''
})
const isEmpty = ref(false);
const { opacity, modalAlert, showModalAlert } = useModal();

onBeforeMount(async() => {
    isLoading.data = true;
    const { data, error } = await fetchGuide('coupleevolution', props.id, props.coupleid);

    if (data) {
        dataCopy.value = [ ...data.data().data ];
        oldData.length = dataCopy.value.length;
        oldData.id = data.id;
    }
    else isEmpty.value = true;
    console.log(dataCopy.value.length);
    
    isLoading.data = false;

})

async function sendData() {
    isLoading.sending = true;
    dataCopy.value.forEach((element) => {
        if (element.enabled) delete element.enabled;
    })
    if (oldData.length === 0) {
        await addDoc(collection(db, 'coupleevolution'), {
            date: formatDate(new Date()),
            patient: props.id,
            process: props.coupleid,
            data: dataCopy.value
        })
    } else {
        const evolutionRef = doc(db, 'coupleevolution', oldData.id);

        await updateDoc(evolutionRef, {
            data: dataCopy.value
        })
    }

    isLoading.sending = false;
}

function pushData(data) {
    dataCopy.value.push(data);
}
</script>