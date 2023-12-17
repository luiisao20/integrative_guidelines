<template>
    <div class="flex px-10 py-4 items-center justify-between">
        <h2>{{ text }}</h2>
        <ButtonVue class="p-4" @click="goRoute" variant="info" :disabled="isLoading">
            <span v-if="isLoading"><Spinner /> Cargando</span>
            <span v-else>Crear</span>
        </ButtonVue>
    </div>
</template>

<script setup>
import ButtonVue from '@/general_components/ButtonVue.vue';
import Spinner from './Spinner.vue';

const props = defineProps({
    text: {
        default: 'No existen datos, ¿Deseas crear una nueva guía?',
        type: String
    },
    isLoading: {
        default: false, type: Boolean
    }
})
const emit = defineEmits(['showForm', 'goGuide']);

function goRoute(){
    if (props.text === 'No existen datos, ¿Deseas crear una nueva guía?') {
        emit('goGuide');
    } else {
        emit('showForm');
    }
}
</script>