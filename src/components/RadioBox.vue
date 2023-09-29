<template>
    <table class="text-sm text-left w-full text-gray-500 rounded-xl dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                    Alto
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                    Medio
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                    Bajo
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in content"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 text-black dark:text-white">
                    {{ item }}
                </td>
                <td class="px-6 py-4 text-center">
                    <input v-model="data[`${item}`]" @input="showData" :id="`default-radio-${index}`" type="radio" value="Alto" :name="`default-${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
                <td class="px-6 py-4 text-center">
                    <input v-model="data[`${item}`]" @input="showData" :id="`default-radio-${index}`" type="radio" value="Medio" :name="`default-${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
                <td class="px-6 py-4 text-center">
                    <input v-model="data[`${item}`]" @input="showData" :id="`default-radio-${index}`" type="radio" value="Bajo" :name="`default-${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
const props = defineProps({
    content: {
        required: true,
        type: Array
    },
    data: {
        required: true,
        type: Object
    }
})

const emit = defineEmits(['updateInfo'])

function showData(){
    emit('updateInfo');
}
</script>