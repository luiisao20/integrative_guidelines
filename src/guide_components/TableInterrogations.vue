<template>    
    <div class="relative mt-4">
        <table class="text-sm w-full text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th colspan="2" scope="col" class="px-6 py-3 w-[30%]">
                    </th>
                    <th scope="col" class="text-center px-6 py-3">
                        Sí
                    </th>
                    <th scope="col" class="text-center px-6 py-3">
                        No
                    </th>
                    <th scope="col" class="px-6 py-3 w-full text-center">
                        ¿Por qué?
                    </th>
                </tr>
            </thead>
            <tbody v-for="(item, index) in content" :key="index" class="w-full">
                <tr v-if="item.options.length === 0" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" colspan="2" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {{ item.subtitle }}
                    </th>
                    <td class="px-6 py-4 text-center">
                        <input v-model="data[item.subtitle].option" :id="`default-radio-${item}.${index}`" type="radio" value="Sí" :name="`default-${item}.${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </td>
                    <td class="px-6 py-4 text-center">
                        <input v-model="data[item.subtitle].option" :id="`default-radio-${item}.${index}`" type="radio" value="No" :name="`default-${item}.${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </td>
                    <td class="px-6 py-4 w-[200px]">
                        <div class="relative z-0 w-full mb-2 group" v-if="item.subtitle !== 'Deserción del paciente'">
                            <textarea
                                v-model="data[item.subtitle].why" rows="2"
                                name="floating_why_interrogatives" id="floating_why_interrogatives"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                                placeholder=" "></textarea>
                        </div>
                    </td>
                </tr>
                <tr v-if="item.options.length > 0" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" rowspan="6" class="px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
                        {{ item.subtitle }} 
                    </td>
                </tr>
                <tr v-if="item.options.length > 0" v-for="(subitem, subindex) in item.options" :key="subindex" class="bg-white border-b w-full dark:bg-gray-800 dark:border-gray-700">
                    <td class="px-6 text-black">
                        {{ subitem }}
                    </td>
                    <td class="px-6 text-center">
                        <input v-model="data[subitem].option" :id="`default-radio-${subitem}.${subindex}`" :name="`default-radio-${subitem}.${subindex}`" type="radio" value="Sí" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </td>
                    <td class="px-6 text-center">
                        <input v-model="data[subitem].option" :id="`default-radio-${subitem}.${subindex}`" :name="`default-radio-${subitem}.${subindex}`" type="radio" value="No" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </td>
                    <td class="px-6">
                        <div class="relative z-0 mb-2 group w-full">
                            <textarea
                                v-model="data[subitem].why" rows="2"
                                name="floating_why_interrogatives" id="floating_why_interrogatives"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                                placeholder=" "></textarea>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { text } from '@fortawesome/fontawesome-svg-core';


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
</script>