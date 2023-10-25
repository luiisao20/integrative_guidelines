<template>
    <table v-if="normal" class="text-sm text-left w-full text-gray-500 rounded-xl dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr v-if="!radioYesOrNo">
                <th scope="col" class="px-6 py-3">
                    {{ titleTable }}
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                    {{ titleHigh }}
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                    {{ titleMedium }}
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                    {{ titleLow }}
                </th>
            </tr>
            <tr v-else>
                <th scope="col" class="px-6 py-3">
                    {{ titleTable }}
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                    Sí
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                    No
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in content" v-if="!radioYesOrNo && !techniques"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 text-black dark:text-white">
                    {{ item }}
                </td>
                <td class="px-6 py-4 text-center">
                    <input v-model="data[`${item}`]" @input="showData(item, $event.target.value)" :id="`default-radio-${titleTable}.${index}`" type="radio" :value="`${titleHigh}`" :name="`default-${item}.${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
                <td class="px-6 py-4 text-center">
                    <input v-model="data[`${item}`]" @input="showData(item, $event.target.value)" :id="`default-radio-${titleTable}.${index}`" type="radio" :value="`${titleMedium}`" :name="`default-${item}.${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
                <td class="px-6 py-4 text-center">
                    <input v-model="data[`${item}`]" @input="showData(item, $event.target.value)" :id="`default-radio-${titleTable}.${index}`" type="radio" :value="`${titleLow}`" :name="`default-${item}.${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
            </tr>
            <tr v-for="(item, index) in content" v-if="techniques"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 text-black dark:text-white">
                    {{ item.technique }}
                </td>
                <td class="px-6 py-4 text-center">
                    <input v-model="data[`${titleTable}.${index}`]" @input="showData(item, $event.target.value)" :id="`default-radio-${titleTable}.${index}`" type="radio" :value="`${titleHigh}`" :name="`default-${titleTable}.${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
                <td class="px-6 py-4 text-center">
                    <input v-model="data[`${titleTable}.${index}`]" @input="showData(item, $event.target.value)" :id="`default-radio-${titleTable}.${index}`" type="radio" :value="`${titleMedium}`" :name="`default-${titleTable}.${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
                <td class="px-6 py-4 text-center">
                    <input v-model="data[`${titleTable}.${index}`]" @input="showData(item, $event.target.value)" :id="`default-radio-${titleTable}.${index}`" type="radio" :value="`${titleLow}`" :name="`default-${titleTable}.${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
            </tr>
            <tr v-for="(item, index) in contentYesOrNo" v-else
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 text-black dark:text-white flex flex-row gap-4 items-center">
                    {{ item }}
                    <div v-if="item === 'Otros'" class="w-full flex items-center">
                        <PopOver id-pop="5" variant="info" text-info="Tendrás que escribir qué otros indicadores has identificado" />
                        <input v-model="data[`${item}`].content" type="text" name="floating_first_name" id="floating_first_name"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=" " :disabled="data[`${item}`].selected === 'No'" />
                    </div>
                </td>
                <td class="px-6 py-4 text-center">
                    <input v-if="item !== 'Otros'" v-model="data[`${item}`]" @input="showData" :id="`default-yes-no-radio-${item}-${index}`" type="radio" value="Sí" :name="`default-yes-no-${item}-${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <input v-else v-model="data[`${item}`].selected" @input="showData(item, $event.target.value)" :id="`default-yes-no-radio-${item}-${index}`" type="radio" value="Sí" :name="`default-yes-no-${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
                <td class="px-6 py-4 text-center">
                    <input v-if="item !== 'Otros'" v-model="data[`${item}`]" @input="showData" :id="`default-yes-no-radio-${item}-${index}`" type="radio" value="No" :name="`default-yes-no-${item}-${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <input v-else v-model="data[`${item}`].selected" @input="showData(item, $event.target.value)" :id="`default-yes-no-radio-${item}-${index}`" type="radio" value="No" :name="`default-yes-no-${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
            </tr>
        </tbody>
    </table>
    <table v-else class="text-sm text-left w-full text-gray-500 rounded-xl dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    
                </th>
                <th v-for="(item, index) in contentAnormal.options" :key="index" scope="col" class="text-center w-[100px] p-2">
                    {{ item }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 text-black dark:text-white">
                    {{ contentAnormal.title }}
                </td>
                <td v-for="(item, index) in contentAnormal.options" :key="index" class="px-6 py-4 text-center w-[50px]">
                    <input v-model="data[`${contentAnormal.title}`]" @input="showData" :id="`default-anormal-radio-${index}`" type="radio" :value="`${item}`" :name="`default-anormal-${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import PopOver from '../general_components/PopOver.vue';

const props = defineProps({
    content: {
        default: [],
        type: Array
    },
    contentYesOrNo: {
        default: [],
        type: Array
    },
    contentAnormal: {
        default: {},
        type: Object
    },
    data: {
        required: true,
        type: Object
    },
    titleHigh: {
        default: 'Alto',
        type: String
    },
    titleMedium: {
        default: 'Medio',
        type: String
    },
    titleLow: {
        default: 'Bajo',
        type: String
    },
    titleTable: {
        default: '',
        type: String
    },
    radioYesOrNo: {
        default: false,
        type: Boolean
    },
    techniques: {
        default: false,
        type: Boolean
    },
    normal: {
        default: true,
        type: Boolean
    }
})

function showData(item, value){
    if (item === 'Otros' && value === 'No'){
        props.data[`${item}`].content = '';
    }
}
</script>