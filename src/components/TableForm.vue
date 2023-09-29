<template>
    <div class="relative shadow-md rounded-xl">
        <table class="text-sm text-left text-gray-500 rounded-xl dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr class="w-[80%]">
                    <th scope="col" class="px-6 py-3 w-[40%]">
                        
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Sí
                    </th>
                    <th scope="col" class="px-6 py-3">
                        No
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Observaciones
                    </th>
                </tr>
            </thead>
            <tbody class="text-xs">
                <tr v-for="(item, index) in content"
                    class="bg-white border-b w-1/2 dark:bg-gray-800 dark:border-gray-700">
                    <td class="px-6 py-4 text-black dark:text-white">
                        <h3 class="font-bold">{{ item.title }}</h3>
                        <p>{{ item.subtitle }}</p>
                    </td>
                    <td class="px-6 py-4 text-center">
                        <input @input="showData" v-model="data[`${item.title}${index}.option`]" 
                            :id="`default-radio-${index}`" type="radio" value="Sí" :name="`default-${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </td>
                    <td class="px-6 py-4 text-center">
                        <input @input="showData" v-model="data[`${item.title}${index}.option`]" 
                            :id="`default-radio-${index}`" type="radio" value="No" :name="`default-${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </td>
                    <td class="px-6 py-4">
                        <textarea @input="showData" v-model="data[`${item.title}${index}.observation`]" rows="2" name="floating_brothers" id="floating_brothers"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=" "  ></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
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

const emit = defineEmits(['updateInfo']);

function showData(){
    emit('updateInfo');
}
</script>