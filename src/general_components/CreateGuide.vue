<template>
    <div class="flex px-10 py-4 items-center justify-between">
        <h2>{{ text }}</h2>
        <ButtonVue class="p-4" @click="goRoute" variant="info">Crear</ButtonVue>
    </div>
</template>

<script setup>
import { router } from '../routes';
import ButtonVue from '@/general_components/ButtonVue.vue';

const props = defineProps({
    guide: {
        required: true,
        type: String
    },
    id: {
        required: true,
        type: String
    },
    processId: {
        default: '',
        type: String
    },
    text: {
        default: 'No existen datos, ¿Deseas crear una nueva guía?',
        type: String
    }
})
const emit = defineEmits(['showForm']);

function goRoute(){
    if (props.text === 'No existen datos, ¿Deseas crear una nueva guía?') {
        router.push(`/create/guide${props.guide}/${props.id}/${props.processId}`);
    } else {
        emit('showForm');
    }
}
</script>