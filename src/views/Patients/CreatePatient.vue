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
    <div v-if="isLoading" class="flex justify-center"><Spinner class="text-4xl py-20"/></div>
    <form v-else @submit.prevent="showData" action="" class="pt-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">FICHA INTEGRATIVA DE EVALUACIÓN PSICOLÓGICA FIEPS</h1>
        <p>Número de pacientes registrados: {{ actualPatients }}</p>
        <p>Número máximo de pacientes: {{ maxPatients }}</p>
        <div id="Datos Informativos">
            <UserData
                :data-user="dataPatient"
                :maxlength="maxlength"
            />
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
import { reactive, ref, onBeforeMount, onBeforeUnmount } from 'vue';
import ButtonVue from '@/general_components/ButtonVue.vue';
import { router } from '../../routes';
import { onBeforeRouteLeave } from 'vue-router';
import { getInfoContent } from '@/composables/infoDemands.js';
import Modal from '@/general_components/Modal.vue';
import { db } from '@/main.js';
import { doc, setDoc, getDoc, query, collection, where, getDocs } from 'firebase/firestore'; 
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Spinner from '../../general_components/Spinner.vue';
import { formatDate } from '@/composables/formatDate';

const dataPatient = reactive({
    'Lugar de atención': '',
    'Unicódigo': '',
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
const { opacity, modal, modalAlert, showModal, showModalAlert } = useModal();
const isEmpty = ref(false);
const patientExists = ref(false);
const maxPatients = ref(0);
const actualPatients = ref(0);
const messageAlert = ref('');
const userEmail = ref('');
const maxlength = ref('10');
const isSafeToLeave = ref(false);
const isLoading = ref(false);
const infoContent = ref({});
const auth = getAuth();
const patientExistsInTherapist = ref(false);

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

async function checkValues() {
    const keysExcluded = ['Otro tipo de atención', 'Correo electrónico (opcional)', 'Unicódigo'];
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
        infoContent.value = await getInfoContent('patient-exists');
        showModal(infoContent.value, 'El paciente se encuentra registrado en la base de datos');
    } else if (patientExistsInTherapist.value) {
        showModalAlert('¡Este paciente ya se encuentra registrado!', false, {variant: 'danger'});
    } else {
        showModalAlert('¿Estás seguro de guardar un nuevo paciente?', true, {variant: 'info'});
    }
    isLoading.value = false;
}

onBeforeMount(() => {
    isLoading.value = true;
    onAuthStateChanged(auth, async(user) => {
        if (user) {
            userEmail.value = user.email;

            const userRef = doc(db, 'users', `${userEmail.value}`);
            const docSnap = await getDoc(userRef);

            if(!docSnap.data().confidentiality) {
                showModalAlert('Para continuar, primero debes aceptar el acuerdo de confidencialidad. Ve a tu perfil y en la sección "Acuerdo de confidencialidad" acepta los términos.', false, { variant: 'danger' });
                isSafeToLeave.value = true;
                return
            }

            window.addEventListener('beforeunload', (event) => {
                event.preventDefault();
                event.returnValue = '';
            })

            const patientsRef = query(collection(db, 'patients'), where('therapist', '==', `${userEmail.value}`));
            const querySnapshot = await getDocs(patientsRef);

            maxPatients.value = docSnap.data().maxPatients;
            actualPatients.value = querySnapshot.docs.length;

            if (!(actualPatients.value < maxPatients.value)) showModalAlert('¡Ya no puedes seguir registrando más pacientes! Contáctate con el administrador', false, { variant: 'danger'});
        } else {
            isSafeToLeave.value = true;
            router.push('/');
        }
        isLoading.value = false;
    })
})

async function sendData(){
    isLoading.value = true;
    try {
        if (!(actualPatients.value < maxPatients.value)) throw new Error('¡Número máximo de pacientes alcanzado! No puedes registrar más pacientes');
        await setDoc(doc(db, 'patients', `${dataPatient['Número de cédula']}`), {
            dataPatient: dataPatient,
            createdAt: formatDate(new Date()),
            biography: null,
            therapist: userEmail.value,
            consent: {
                accept: false
            }
        })
        showModalAlert('¡Datos guardados! Visita la guía dando click en "Ir"', false, {variant: 'success', showRoute: true});
        isSafeToLeave.value = true;
    } catch (error) {
        showModalAlert(error, false, {variant: 'danger'})
    }
    isLoading.value = false;
}
</script>