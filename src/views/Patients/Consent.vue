<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendConsent"
        :is-loading="isLoading.sending"
    />
    <div :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center mx-20 mt-4">Consentimiento / Asentimiento informado del paciente</h1>
        <h1 class="my-10 ml-10" v-if="data.consent.accept">El consentimiento ya ha sido aceptado.</h1>
        <div class="flex items-center gap-4 justify-center" :style="{ opacity: opacity }">
            <h1 class="text-lg">El paciente es:</h1>
            <select :disabled="data.consent.accept" v-model="age" id="processes" class="bg-gray-50 my-5 border border-gray-300 text-black text-sm rounded-lg focus:ring-main-default focus:border-main-default block p-2.5">
                <option selected disabled>Escoge una opción</option>
                <option value="0">Mayor de edad</option>
                <option value="1">Menor de edad</option>
            </select>
        </div>
        <form action="" @submit.prevent="checkConsent" class="mb-10">
            <div v-if="age === '0'">
                <ConsentComponent
                    :item="content.oflegalage[0]"
                    text-normal="El paciente acepta"
                    text-bold="entrar en proceso terapéutico"
                    v-model:data="form.data"
                    v-model:bool="form.accept"
                />
            </div>
            <div v-else-if="age === '1'">
                <ConsentComponent
                    :item="content.underage[0]"
                    text-normal="El padre o tutor del paciente acepta"
                    text-bold="que su hijo/a entre en proceso terapéutico"
                    :show-date="false"
                    v-model:bool="formScnd.acceptParent"
                    v-model:name="formScnd.name"
                    v-model:id="formScnd.id"
                />
                <ConsentComponent
                    :item="content.underage[1]"
                    text-normal="El paciente acepta"
                    text-bold="entrar en proceso terapéutico"
                    v-model:data="formScnd.data"
                    v-model:bool="formScnd.accept"
                />
            </div>
            <button :disabled="data.consent.accept" class="bg-light text-white p-2 rounded-xl" type="submit">Guardar</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from 'vue';
import { getInfoContent } from '@/composables/infoDemands.js';
import ConsentComponent from '../../general_components/ConsentComponent.vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/main.js';

const age = ref('Escoge una opción');
const content = ref({});
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
const form = reactive({
    accept: false,
    data: '',
})
const formScnd = reactive({
    accept: false,
    acceptParent: false,
    data: '',
    name: '', id: ''
})
const { modalAlert, showModalAlert, opacity } = useModal();
const isLoading = reactive({
    sending: false,
})

onBeforeMount(async() => {
    content.value = await getInfoContent('consent');
})

function checkConsent() {
    if(age.value === '0'){
        if (!form.accept || form.data.toString().trim() === '') showModalAlert('Hay algún error, por favor asegúrate de haber llenado todo', false, { variant: 'danger'});
        else showModalAlert('¿Estás seguro de enviar el consentimiento?', true);
    } else {
        if (!formScnd.accept || !formScnd.acceptParent || formScnd.data.toString().trim() === '') showModalAlert('Hay algún error, vuelve a revisar todo', false, { variant: 'danger' });
        else if (!/^\d*$/.test(formScnd.id) || formScnd.id.length !== 10 || formScnd.name.toString().trim() === '') showModalAlert('Los datos del padre o tutor están incorrectos', false, { variant: 'danger' });
        else showModalAlert('¿Estás seguro de enviar el consentimiento?', true);
    }
}

async function sendConsent() {
    isLoading.sending = true;
    const patientRef = doc(db, 'patients', `${props.id}`);
    try {        
        if (age.value === '0') {
            await updateDoc(patientRef, {
                consent: form
            })
        } else {
            await updateDoc(patientRef, {
                consent: formScnd
            })
        }
        showModalAlert('¡Los datos se han guardado correctamente!', false, { variant: 'success' });
    } catch (error) {
        showModalAlert(error.message, false, { variant: 'danger' });
    }
    isLoading.sending = false;
}
</script>