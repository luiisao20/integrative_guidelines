<template>
    <table class="my-10 mx-auto w-[80%]">
        <thead class="text-xs text-gray-700 uppercase shadow-sm shadow-main-default">
            <tr>
                <th scope="col" class="px-6 py-3">Fecha</th>
                <th scope="col" class="px-6 py-3">Nombre / Descripción</th>
                <th scope="col" class="px-6 py-3">Estado</th>
                <th v-if="isDisabled" scope="col" class="px-6 py-3">Borrar</th>
            </tr>
        </thead>
        <tbody v-for="(item, index) in list" :key="index">
            <tr class="border-b shadow-sm shadow-light">
                <td class="px-6 py-2">{{ item.data().date }}</td>
                <td class="px-6 py-2">
                    <div class="flex flex-col gap-2 justify-center">
                        <span @click="goFile(item.data())" class="hover:underline hover:underline-offset-2 cursor-pointer">{{ item.data().fileName }}</span>
                        <span class="text-center text-sm" v-if="item.data().description !== ''">{{ item.data().description }}</span>
                    </div>
                </td>
                <td class="px-6 py-2 text-center">
                    <Spinner v-if="isChanging" />
                    <input v-else type="checkbox" @input="changeState(item.id, item.data().state)" :checked="item.data().state" :disabled="isDisabled">
                </td>
                <td v-if="isDisabled" class="px-6 py-2 text-center text-danger text-2xl">
                    <div class="cursor-pointer" @click="deletePayment(item)">
                        <font-awesome-icon class="rotate-45" icon="fa-solid fa-circle-plus"/>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import Spinner from './Spinner.vue';

const props = defineProps({
    list: { required: true, type: Array },
    isDisabled: { required: true, type: Boolean },
    isChanging: { defalut: false, type: Boolean }
})
const emit = defineEmits(['deletePayment', 'changeState']);

function deletePayment(item) {
    emit('deletePayment', item);
}

function changeState(id, state) {
    emit('changeState', id, state);
}

function goFile(file) {
    window.open(file.url, '_blank');
}
</script>