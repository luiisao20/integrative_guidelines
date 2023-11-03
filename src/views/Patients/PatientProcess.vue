<template>
    <h1 class="text-center text-2xl font-extrabold mb-4">
        {{ process.processName }}
    </h1>
    <ul class="flex flex-wrap text-sm pl-4 font-medium text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <li class="mr-2" v-for="(item, index) in links" :key="index">
            <RouterLink @click="showText = false" :to="`/${id}/processes/${process.id}/${item.link}`"
            class="inline-block p-2 text-black rounded-t-lg hover:bg-gray-300">{{ item.text }}
            </RouterLink>
        </li>
    </ul>
    <div class="py-6 mb-4 px-6 border-2 border-light rounded-xl">
        <h2 v-if="showText">Escoje una guía</h2>
        <RouterView v-else/>
    </div>
</template>

<script setup>
const props = defineProps({
    process: {
        required: true,
        type: Object
    },
    id: {
        required: true,
        type: String
    },
    showText: {
        required: true,
        type: Boolean
    }
})
const links = [
    {
        text: 'Guía 1',
        link: 'guideone'
    },
    {
        text: 'Guía 2',
        link: 'guidetwo'
    },
    {
        text: 'Guía 3',
        link: 'guidethree'
    },
    {
        text: 'Guía 4',
        link: 'guidefour'
    },
    {
        text: 'Guía 5',
        link: 'guidefive'
    },
    {
        text: 'Guía 6',
        link: 'guidesix'
    },
    {
        text: 'Guía 7',
        link: 'guideseven'
    },
    {
        text: 'Guía 8',
        link: 'guideeight'
    },
]
</script>

<style scoped>
.router-link-active{
    background-color: var(--light-color);
    color: white;
}
</style>