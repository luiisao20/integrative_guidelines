<template>
    <table class="text-sm w-full text-gray-500 rounded-xl dark:text-gray-400">
        <thead>
            <tr class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <th scope="col" colspan="3" class="px-6 py-3">
                    {{ content.title }}
                </th>
            </tr>
        </thead>            
        <tbody v-for="(item, index) in content.options" :key="index">
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colspan="3" v-if="item.options.length === 0" class="px-6 py-4 text-black dark:text-white">
                    <div class="relative z-0 w-full mb-2 group">
                        <textarea @input="showValue" v-model="data[`${item.subtitle}`]"
                            name="floating_efect_records" id="floating_efect_records"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=" "></textarea>
                        <label for="floating_efect_records"
                            class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {{ item.subtitle }}</label>
                    </div>
                </td>
            </tr>
        </tbody>
        <tbody>
            <tr class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <th scope="col" class="px-6 py-3">
                </th>
                <th scope="col" class="px-2 py-3 text-center">
                    Sí <PopOver idPop="4" variant="info" textInfo="En caso de escoger 'Sí', deberás llenar llenar al menos un apartado de los que se hayan desplegado"/>
                </th>
                <th scope="col" class="px-2 py-3 text-center">
                    No
                </th>
            </tr>
        </tbody>
        <tbody v-for="(item, index) in content.options" :key="index">
            <tr v-if="item.options.length > 0 || item.options.type === 'text'" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 text-black dark:text-white w-[70%]">
                    <h3 class="font-bold">{{ item.subtitle }}</h3>
                </td>
                <td class="px-2 py-4 text-center">
                    <input @input="showSubItems($event.target.value, index)" v-model="data[`${item.subtitle}`].selected"
                        :id="`subitems-${index}`" type="radio" value="Sí" :name="`subitems-${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
                <td class="px-2 py-4 text-center">
                    <input @input="showSubItems($event.target.value, index)" v-model="data[`${item.subtitle}`].selected"
                        :id="`subitems-${index}`" type="radio" value="No" :name="`subitems-${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
            </tr>
            <tr v-for="(subitem, subindex) in item.options" v-if="subItems && inde.some(value => value === index) && Array.isArray(item.options)" :key="subindex" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="pl-10 py-4 text-black dark:text-white">
                    {{ subitem }}
                </td>
                <td class="px-2 py-4 text-center">
                    <input @input="showValue" v-model="data[`${item.subtitle}`][`${subitem}`]"
                    :id="`subitem-${index}-${subindex}`" type="radio" value="Sí" :name="`subitem-${index}-${subindex}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
                <td class="px-2 py-4 text-center">
                    <input @input="showValue" v-model="data[`${item.subtitle}`][`${subitem}`]"
                    :id="`subitem-${index}-${subindex}`" type="radio" value="No" :name="`subitem-${index}-${subindex}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
            </tr>
            <tr v-else-if="subItems && item.options.type === 'text' && inde.some(value => value === index)" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colspan="3" class="pl-10 py-4 text-black dark:text-white">                    
                    <div class="relative z-0 w-full mb-2 group">
                        <textarea @input="showValue" v-model="data[`${item.subtitle}`][`${item.options.content}`]"
                            name="floating_efect_records" id="floating_efect_records"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=" "></textarea>
                        <label for="floating_efect_records"
                            class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {{ item.options.content }}</label>
                    </div>
                </td>
            </tr>
            <tr v-else-if="item.options.type === 'normal'" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 text-black dark:text-white">
                    <h3 class="font-bold">{{ item.subtitle }}</h3>
                </td>
                <td class="px-2 py-4 text-center">
                    <input @input="showValue" v-model="data[`${item.subtitle}`].selected"
                    :id="`subitem-${index}`" type="radio" value="Sí" :name="`subitem-${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
                <td class="px-2 py-4 text-center">
                    <input @input="showValue" v-model="data[`${item.subtitle}`].selected"
                    :id="`subitem-${index}`" type="radio" value="No" :name="`subitem-${index}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref } from 'vue';
import PopOver from '../general_components/PopOver.vue';

const props = defineProps({
    content: {
        required: true,
        type: Object
    },
    data: {
        required: true,
        type: Object
    }
})
const inde = ref([]);
const subItems = ref(false);

function showSubItems(value, index){
    if(value === 'Sí'){
        inde.value.push(index);
        subItems.value = true;
    } else if(inde.value.indexOf(index) !== -1) {
        inde.value.splice(inde.value.indexOf(index), 1);
    }
}
</script>