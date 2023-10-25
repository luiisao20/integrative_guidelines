<template>
    
    <div v-if="isLoading" class="flex justify-between items-center text-xl py-4">
        <h1>{{ patient['Apellidos'] }} {{ patient['Nombres'] }}</h1>
        <h1>{{ patient['Número de cédula'] }}</h1>
        <h1>{{ age }} años {{ meses }} meses</h1>
    </div>
    
    <ul class="flex flex-wrap text-sm pl-4 font-medium text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <li class="mr-2">
            <router-link :to="`/${id}/data`" class="inline-block p-2 text-black rounded-t-lg hover:bg-gray-300">
                Datos
            </router-link>
        </li>
        <li class="mr-2" v-for="(item, index) in links" :key="index">
            <router-link :to="`/${id}/${item.link}`"
                class="inline-block p-2 text-black rounded-t-lg hover:bg-gray-300">{{ item.text }}
            </router-link>
        </li>
    </ul>
    <div class="border-2 border-light rounded-xl">
        <RouterView v-if="isLoading" :id="id" :data="patient" :created-at="createdAt"/>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useFetch } from '@/composables/fetch';

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
const links = [
    {
        text: 'Guía 1',
        link: 'guideone'
    },
    {
        text: 'Guía 2',
        link: 'guidetwo'
    },
    {
        text: 'Guía 3',
        link: 'guidethree'
    },
    {
        text: 'Guía 4',
        link: 'guidefour'
    },
    {
        text: 'Guía 5',
        link: 'guidefive'
    },
    {
        text: 'Guía 6',
        link: 'guidesix'
    },
    {
        text: 'Guía 7',
        link: 'guideseven'
    },
    {
        text: 'Guía 8',
        link: 'guideeight'
    },
]
const createdAt = ref('');

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
    background-color: var(--light-color);
    color: white;
}
</style>