<template>
    <button @mouseover="show = true" @mouseleave="show = false" :style="{ color: textColor }" type="button"><svg class="w-4 h-4 ml-2 hover:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg><span class="sr-only">Show information</span></button>
    <div v-if="show" id="idPop" class="absolute z-10 inline-block text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
        <div class="p-3 space-y-2">
            <h3 class="font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
            <p class="normal-case p-2 text-center">
                {{ textInfo }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { useBackgroundColor, backgroundColorProps } from '../composables/backgroundColor.js';
import { ref } from 'vue';
const textColor = useBackgroundColor(props);

const props = defineProps({
    textInfo: {
        required: true,
        type: String
    },
    title: {
        default: 'Información',
        type: String
    },
    ...backgroundColorProps
})
const show = ref(false);

</script>