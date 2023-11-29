<template>
    <div v-if="!isLoading">
        <div class="flex justify-between items-center text-xl py-4">
            <h1>{{ patient.dataPatient['Apellidos'] }} {{ patient.dataPatient['Nombres'] }}</h1>
            <h1>{{ patient.dataPatient['Número de cédula'] }}</h1>
            <h1>{{ age }} años {{ meses }} meses</h1>
        </div>
    
        <SideBar
            :is-left="true"
            :navigation="sideBarContent"
            title-bar="Paciente"
        />
        <div class="">
            <RouterView :id="id" :data="patient" :created-at="createdAt"/>
        </div>
    </div>
    <div v-else class="flex justify-center">
        <Spinner class="text-4xl text-main-default py-20" />
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import SideBar from '@/guide_components/SideBar.vue';
import { doc, getDoc } from "firebase/firestore";
import Spinner from '../general_components/Spinner.vue';
import { db } from '@/main.js';

const patient = ref({});
const isLoading = ref(false);
const age = ref(0);
const meses = ref(0);
const props = defineProps(['id', 'processid'])
const createdAt = ref('');
const sideBarContent = [
    {
        title: 'Datos',
        link: `/${props.id}/data`
    },
    {
        title: 'Procesos',
        link: `/${props.id}/processes`
    },
]
const docRef = doc(db, 'patients', `${props.id}`);

function getAge(birthday) {
    let hoy = new Date()
    let fechaNacimiento = new Date(birthday)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    meses.value = diferenciaMeses;
    if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
        edad--;
        meses.value = 0;
    }
    return edad
}

onBeforeMount(async() => {
    isLoading.value = true;
    const docSnap = await getDoc(docRef);
    patient.value = docSnap.data();
    createdAt.value = docSnap.data().createdAt;

    age.value = getAge(patient.value.dataPatient['Fecha de nacimiento']);
    isLoading.value = false;
})

</script>

<style scoped>
.router-link-active{
    color: var(--light-color);
}
</style>