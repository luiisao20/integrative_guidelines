<template>
    <div class="flex px-10 py-4 items-center justify-between">
        <h2>No existen datos, ¿Deseas crear una nueva guía?</h2>
        <ButtonVue class="p-4" @click="router.push(`/create/guide${guide}/${id}`)" variant="info">Crear</ButtonVue>
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
    }
})
</script>