<template>
    
    <div v-if="isLoading" class="flex justify-between items-center text-xl py-4">
        <h1>{{ patient['Apellidos'] }} {{ patient['Nombres'] }}</h1>
        <h1>{{ patient['Número de cédula'] }}</h1>
        <h1>{{ age }} años {{ meses }} meses</h1>
    </div>

    <SideBar
        :is-left="true"
        :navigation="sideBarContent"
        title-bar="Paciente"
    />
    <div class="">
        <RouterView v-if="isLoading" :id="id" :data="patient" :created-at="createdAt"/>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useFetch } from '@/composables/fetch';
import SideBar from '@/guide_components/SideBar.vue';

const patient = ref({});
const isLoading = ref(false);
const age = ref(0);
const meses = ref(0);
const props = defineProps({
    id: {
        required: true,
        type: String
    }
})
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
        edad--
    }
    return edad
}

onBeforeMount(async() => {
    
    const { data, error } = await useFetch(`clients/${props.id}`);    
    patient.value = data.value.dataPatient;
    createdAt.value = data.value.createdAt;

    age.value = getAge(patient.value['Fecha de nacimiento']);
    isLoading.value = true;
})

</script>

<style scoped>
.router-link-active{
    color: var(--light-color);
}
</style>