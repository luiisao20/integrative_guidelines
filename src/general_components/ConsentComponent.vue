<template>
    <p class="mb-3 text-black text-justify leading-relaxed text-sm dark:text-gray-400">
        {{ item.p }}
    </p>
    <blockquote class="text-sm mx-10 text-justify italic font-semibold text-gray-900 dark:text-white">
        <p class="leading-relaxed">"{{ item.q }}"</p>
    </blockquote>
    <div class="flex items-center my-6">
        <div class="flex items-center h-5">
            <input :id="`remember-${item.q}`" type="checkbox" @input="$emit('update:bool', $event.target.checked)" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required>
        </div>
        <label :for="`remember-${item.q}`" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ textNormal }} <span href="#" class="text-blue-600 dark:text-blue-500">{{ textBold }}</span>.</label>
    </div>
    <div v-if="showDate" class="relative z-0 mb-6 group w-1/2 justify-center mx-auto">
        <input @input="$emit('update:data', $event.target.value)" type="text" name="accept" id="accept"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
            placeholder=" "  />
        <label for="accept"
            class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Lugar y fecha</label>
    </div>
    <div v-else class="flex gap-4 mx-10">
        <div class="relative z-0 mb-6 group w-1/2 justify-center mx-auto">
            <input @input="$emit('update:name', $event.target.value)" type="text" name="parent" id="parent"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  />
            <label for="parent"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Apellidos y nombres del padre o tutor</label>
        </div>
        <div class="relative z-0 mb-6 group w-1/2 justify-center mx-auto">
            <input @input="$emit('update:id', $event.target.value)" type="text" name="ci" id="ci"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  />
            <label for="ci"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Número de cédula del padre o tutor</label>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    item: { required: true, type: Object },
    textNormal: { required: true, type: String },
    textBold: { required: true, type: String },
    showDate: { default: true, type: Boolean },
    data: { type: String },
    name: { type: String },
    id: { type: String },
    bool: { required: true, type: Boolean },
})
const emit = defineEmits(['update:data', 'update:bool', 'update:name', 'update:id'])
</script>