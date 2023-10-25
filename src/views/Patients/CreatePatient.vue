<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
        @send-data="sendData"
        @go-route="router.push(`/${dataPatient['Número de cédula']}/data`)"
    />
    <form action="" class="pt-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center">FICHA INTEGRATIVA DE EVALUACIÓN PSICOLÓGICA FIEPS</h1>
        <div id="Datos Informativos">
            <UserData
                :data-user="dataPatient"
                @update="getInfoData"
            />
        </div>
        <ButtonVue class="p-2 my-4" variant="info" type="submit" @click.prevent="showData">
            Guardar paciente
        </ButtonVue>
        <button @click="router.push(`/${dataPatient['Número de cédula']}/data`)">Hola</button>
    </form>
</template>

<script setup>
import UserData from '@/guide_components/UserData.vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import { reactive, ref } from 'vue';
import ButtonVue from '@/general_components/ButtonVue.vue';
import { router } from '../../routes';
import axios from 'axios';
import { onBeforeRouteLeave } from 'vue-router';

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
const { opacity, modalAlert, showModalAlert } = useModal();
const isEmpty = ref(false);
const messageAlert = ref('');

function getInfoData(data){
    dataPatient = data;
}
const isSafeToLeave = ref(false);

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

function checkValues() {
    const keysExcluded = ['Otro tipo de atención', 'Correo electrónico (opcional)'];
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
}

function showData() {
    isEmpty.value = false;
    messageAlert.value = '';

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
        checkValues();
    } 

    if (isEmpty.value) {
        showModalAlert(messageAlert.value, false, {variant: 'danger'});
    } else {
        showModalAlert('¿Estás seguro de guardar un nuevo paciente?', true, {variant: 'info'});
    }
}

async function sendData(){
    try {
        const res = await axios.post('http://localhost:3000/clients', {
            id: dataPatient['Número de cédula'],
            dataPatient,
            createdAt: new Date()
        })
        showModalAlert('Eureka!!', false, {variant: 'success', showRoute: true});
        isSafeToLeave.value = true;
    } catch (error) {
        showModalAlert(error, false, {variant: 'danger'})
    }
}
</script>