<template>
    <Modal
        v-bind="modal"
        @close-mod="modal.showModal = false; opacity = '1'"
        :is-loading="isLoading"
    />
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendData"
        @go-route="router.push(`/${dataPatient['Número de cédula']}/data`)"
        :is-loading="isLoading"
    />
    <form @submit.prevent="showData" action="" class="pt-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">FICHA INTEGRATIVA DE EVALUACIÓN PSICOLÓGICA FIEPS</h1>
        <div id="Datos Informativos">
            <UserData
                :data-user="dataPatient"
                @update="getInfoData"
                :maxlength="maxlength"
            />
        </div>
        <div class="relative z-0 w-full my-6 group">
            <textarea v-model="biography.content" rows="10" name="floating_brothers" id="floating_brothers"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 leading-relaxed dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  ></textarea>
            <label for="floating_brothers"
                class="peer-focus:font-medium capitalize absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {{ biography.text }}</label>
        </div>
        <div class="flex flex-row justify-end">
            <ButtonVue @click="showInfo(biography)" class="p-3" variant="main" type="button">
                Más info
            </ButtonVue>
        </div>
        <ButtonVue :is-disabled="isLoading" class="p-2 my-4" variant="info" type="submit">
            <p v-if="!isLoading">Guardar paciente</p>
            <Spinner v-else class="px-6 text-2xl"/>
        </ButtonVue>
    </form>
</template>

<script setup>
import UserData from '@/guide_components/UserData.vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import { reactive, ref, onBeforeMount } from 'vue';
import ButtonVue from '@/general_components/ButtonVue.vue';
import { router } from '../../routes';
import { onBeforeRouteLeave } from 'vue-router';
import { getInfoContent } from '@/composables/infoDemands.js';
import Modal from '@/general_components/Modal.vue';
import { db } from '@/main.js';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Spinner from '../../general_components/Spinner.vue';
import { formatDate } from '@/composables/formatDate';

const dataPatient = reactive({
    'Lugar de atención': '',
    'Nombres': '',
    'Apellidos': '',
    'Número de cédula': '',
    'Correo electrónico (opcional)': '',
    'Lugar de nacimiento': '',
    'Fecha de nacimiento': '',
    'Estado Civil': '', 'Número de hijos': '', 'Religión': '',  
    'Ciudad de residencia': '', 'Dirección': '', 'Celular': '',
    'Instrucción': '', 'Profesión': '', 'Ocupación': '',
    'Grupo étnico': '', 'Género': '', 'Grupo socio-económico': '',
    'Nombre del padre': '', 'Edad (padre)': '', 'Ocupación (padre)': '',
    'Nombre de la madre': '', 'Edad (madre)': '', 'Ocupación (madre)': '',
    'Hermanos, género y edad de cada uno de ellos': '',
    'Lugar que ocupa entre sus hermanos': '',
    'Informante': '',
    'Parentesco': '',
    'Tipo de atención': 'Tipo de atención',
    'Otro tipo de atención': ''
})
const biography = reactive({
    code: '4',
    text: 'Biografía psicológica personal y familiar',
    content: ''
})
const { opacity, modal, modalAlert, showModal, showModalAlert } = useModal();
const isEmpty = ref(false);
const patientExists = ref(false);
const messageAlert = ref('');
const userEmail = ref('');
const maxlength = ref('10');
const isSafeToLeave = ref(false);
const isLoading = ref(false);
const infoContent = ref({});
const auth = getAuth();
const patientExistsInTherapist = ref(false);

function getInfoData(data){
    dataPatient = data;
}

onBeforeRouteLeave(() => {
    if (isSafeToLeave.value) return true
    else {
        if (confirm("¿Estás seguro de salir del formulario sin haberlo completado?")) {
            return true
        } else {
            return false
        }
    }
})

window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = '';
})

async function checkValues() {
    const keysExcluded = ['Otro tipo de atención', 'Correo electrónico (opcional)', 'biography'];
    // Data User
    for (const key in dataPatient) {
        if (dataPatient.hasOwnProperty(key) && !keysExcluded.some(value => value === key)) {
            if (dataPatient[key].toString().trim() === "") {
                isEmpty.value = true;
                messageAlert.value = `Existe un campo vacío en los datos informativos del paciente, por favor llénalo`;
                return;
            }
        }
    }

    if (biography.content.toString().trim() === ''){
        isEmpty.value = true;
        messageAlert.value = `La biografía del paciente debe ser llenada`;
        return;
    }

    const docRef = doc(db, 'patients', `${dataPatient['Número de cédula']}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().therapist === userEmail.value) {
        patientExistsInTherapist.value = true;
    } else if (docSnap.exists()) {
        patientExists.value = true;
        maxlength.value = '12';
    }
}

async function showData() {
    isEmpty.value = false;
    messageAlert.value = '';
    maxlength.value = '10';
    patientExists.value = false;
    patientExistsInTherapist.value = false;
    isLoading.value = true;

    if (!/^\d*$/.test(dataPatient['Número de cédula']) || dataPatient['Número de cédula'].length !== 10){
        isEmpty.value = true;
        messageAlert.value = 'El número de cédula es incorrecto, recuerda que necesita 10 dígitos y sólo contiene números.';
    } else if (dataPatient['Tipo de atención'] === 'other' && dataPatient['Otro tipo de atención'].trim() === '' || dataPatient['Tipo de atención'] === 'Tipo de atención') {
        isEmpty.value = true;
        messageAlert.value = 'Para el tipo de atención: "Otros ¿Cuál?", debes llenar casilla "Otro tipo de atención."';
    } else if(isNaN((new Date(dataPatient['Fecha de nacimiento'])).getTime()) || dataPatient['Fecha de nacimiento'].length < 10){
        isEmpty.value = true;
        messageAlert.value = 'La fecha de nacimiento no es correcta, revisa el formato por favor.';
    } else {
        await checkValues();
    }

    if (isEmpty.value) {
        showModalAlert(messageAlert.value, false, {variant: 'danger'});
    } else if (patientExists.value) {
        infoContent.value = getInfoContent('patient-exists');
        showModal(infoContent.value, 'El paciente se encuentra registrado en la base de datos');
    } else if (patientExistsInTherapist.value) {
        showModalAlert('¡Este paciente ya se encuentra registrado!', false, {variant: 'danger'});
    } else {
        showModalAlert('¿Estás seguro de guardar un nuevo paciente?', true, {variant: 'info'});
    }
    isLoading.value = false;
}

onBeforeMount(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            userEmail.value = user.email;
        } else {
            router.push('/');
        }
    })
})

async function sendData(){
    isLoading.value = true;
    try {
        await setDoc(doc(db, 'patients', `${dataPatient['Número de cédula']}`), {
            dataPatient: dataPatient,
            createdAt: formatDate(new Date()),
            biography: [
                {
                    date: formatDate(new Date()),
                    text: biography.content,
                    process: null
                }
            ],
            therapist: userEmail.value
        })
        showModalAlert('Eureka!!', false, {variant: 'success', showRoute: true});
        isSafeToLeave.value = true;
    } catch (error) {
        showModalAlert(error, false, {variant: 'danger'})
    }
    isLoading.value = false;
}

function showInfo(item){
    infoContent.value = getInfoContent(item.code);
    showModal(infoContent.value, item.text);
}
</script>