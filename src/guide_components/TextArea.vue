<template>
    <div class="relative z-0 w-full my-6 group">
        <textarea v-model="textValue[`${item[section]}`]" rows="4" name="floating_brothers" id="floating_brothers"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
            placeholder=" "  ></textarea>
        <label for="floating_brothers"
            class="peer-focus:font-medium capitalize absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            {{ item[section] }}</label>
    </div>
    <div v-if="showBtnInfo" class="flex flex-row justify-end">
        <ButtonVue @click="showModalInfo(item)" class="p-3" variant="main" type="button">
            Más info
        </ButtonVue>
    </div>
</template>

<script setup>
import ButtonVue from '../general_components/ButtonVue.vue';

const props = defineProps({
    item: {
        required: true,
        type: Object
    },
    showBtnInfo: {
        default: true,
        type: Boolean
    },
    textValue: {
        required: true,
        type: Object
    },
    section: {
        default: 'text',
        type: String
    }
})

const emit = defineEmits(['showModalInfo']);

function showModalInfo(item){
    emit('showModalInfo', item);
}

</script>