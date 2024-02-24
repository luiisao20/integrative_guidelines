<template>
    <div class="flex items-center gap-10 mx-auto justify-center">
        <h1 class="font-bold">
            {{ title }}
            <PopOver v-if="title === 'Evaluación Psicométrica'" text-info="Este campo no es obligatorio" variant="info"/>
        </h1>
        <button type="button" class="text-success" @click="addElement">
            <font-awesome-icon icon="fa-solid fa-circle-plus" class="text-2xl"/>
        </button>
    </div>
    <TransitionGroup tag="div">
        <div v-for="(item, index) in array" class="flex flex-row gap-10 my-4" :key="index">
            <div v-if="showFile" class="flex items-center gap-10 w-full">
                <div class="flex items-center justify-center w-1/4">
                    <label :for="`dropzone-file-${index}`" class="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center p-2">
                            <p class="mb-2 text-xs text-center text-gray-500 dark:text-gray-400"><span class="font-semibold">Haz clic aquí para subir tu archivo</span></p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">PDF, WORD</p>
                        </div>
                        <input accept=".pdf,.docx,.doc" :id="`dropzone-file-${index}`" type="file" @change="emit('updateFile', $event.target.files[0], index)" class="hidden" />
                    </label>
                </div> 
                <div class="w-full">
                    <div class="relative z-0 group">
                        <textarea name="name" id="name" rows="2" @input="emit('updateDescr', $event.target.value, index)"
                            class="block py-2.5 px-0 w-full leading-relaxed text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=""></textarea>
                        <label for="name"
                            class="peer-focus:font-medium capitalize absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Descripción {{ item.tag + 1 }}</label>
                    </div>
                    <div class="py-2" v-if="item.file">
                        <h2>Archivo: {{ item.file.name }}</h2>
                    </div>
                </div>
            </div>
            <div v-else class="flex w-full gap-10">
                <div class="relative z-0 w-full mb-5 group">
                    <input type="text" :name="`floating_description-${index}`" @input="emit('updateDescr', $event.target.value, index)" :id="`floating_description-${index}`" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label :for="`floating_description-${index}`" class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Descripción {{ item.tag + 1 }}
                    </label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <input type="text" :name="`floating_cie-${index}`" @input="emit('updateCie', $event.target.value, index)" :id="`floating_cie-${index}`" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label :for="`floating_cie-${index}`" class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        CIE
                    </label>
                </div>
                <div class="flex justify-center items-center gap-4">
                    <div class="flex flex-col items-center justify-center">
                        <input :id="`default-radio-${index}`" type="radio" value="PRE" @input="emit('updateOpt', $event.target.value, index)" :name="`default-radio-${index}`" class="w-4 h-4 mb-2 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label :for="`default-radio-${index}`" class="text-sm font-medium text-gray-900 dark:text-gray-300">PRE</label>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <input :id="`default-radio-${index}`" type="radio" value="DEF" @input="emit('updateOpt', $event.target.value, index)" :name="`default-radio-${index}`" class="w-4 h-4 mb-2 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label :for="`default-radio-${index}`" class="text-sm font-medium text-gray-900 dark:text-gray-300">DEF</label>
                    </div>
                </div>
            </div>
            <button type="button" @click="array.splice(index, 1)">
                <font-awesome-icon icon="fa-solid fa-circle-plus" class="text-2xl text-danger rotate-45"/>
            </button>
        </div>
    </TransitionGroup>
</template>

<script setup>
import PopOver from '@/general_components/PopOver.vue';

const props = defineProps({
    array: {
        required: true, type: Array
    },
    title: {
        required: true, type: String
    },
    showFile: {
        default: true, type: Boolean
    }
})
const emit = defineEmits(['updateDescr', 'updateFile', 'updateCie', 'updateOpt']);

function addElement() {
    const index = props.array.length;
    let obj = null;
    if (props.showFile) {
        obj = {
            tag: index,
            file: null,
            description: ''
        }
    } else {
        obj = {
            tag: index,
            description: '',
            cie: '',
            option: ''
        }
    }
    props.array.push(obj)
}
</script>

<style scoped>
.v-enter-active, .v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from, .v-leave-to {
    opacity: 0;
}
</style>